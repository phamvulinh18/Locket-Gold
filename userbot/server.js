import { TelegramClient, Api } from "telegram";
import { StoreSession } from "telegram/sessions/index.js";
import pkg from "telegram/events/index.js";
const { NewMessage, EditedMessage } = pkg;
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import input from "input";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Phục vụ các file đã tải về
const downloadDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);
app.use('/downloads', express.static(downloadDir));

// === CẤU HÌNH ===
const apiId = 38250559; 
const apiHash = "df0aa6c70531d23c5f97dbe5cdb8ae4d"; 
const botToAsk = "Yuicsa_bot"; 

// Sử dụng StoreSession để lưu vào file cục bộ
const storeSession = new StoreSession("locket_gold_session");
let client;
let targetBotId = null;
let latestResponses = [];

async function initTelegram() {
  client = new TelegramClient(storeSession, apiId, apiHash, { 
    connectionRetries: 5,
    useWSS: false 
  });
  
  await client.start({
    phoneNumber: async () => await input.text("📱 Nhập số điện thoại (VD: +84...): "),
    password: async () => await input.text("🔐 Nhập mật khẩu 2 lớp (nếu có): "),
    phoneCode: async () => await input.text("📩 Nhập mã OTP từ Telegram: "),
    onError: (err) => console.log("❌ Lỗi đăng nhập:", err.message),
  });

  console.log("✅ Đã đăng nhập thành công và lưu session!");
  
  // Hàm làm sạch văn bản của Bot
  const cleanBotText = (text) => {
    if (!text) return "";
    // Nếu là menu chính hoặc menu chức năng, trả về tiêu đề ngắn
    if (text.includes('Chọn chức năng') || text.includes('HỒ SƠ') || text.includes('Chọn đường kích hoạt')) {
      return "Vui lòng chọn chức năng bên dưới:";
    }
    
    return text
      .split('\n')
      .filter(line => {
        const l = line.trim();
        if (l.startsWith('——') || l.startsWith('──')) return false;
        if (l.includes('TRUNG TÂM') || l.includes('DỊCH VỤ')) return false;
        if (l.includes('Mua tại') || l.includes('Gõ chữ')) return false;
        if (l.includes('Locket Gold là') || l.includes('Hạng:') || l.includes('Check-in')) return false;
        if (l.includes('Bot Make By') || l.includes('Tham gia nhóm')) return false;
        return true;
      })
      .join('\n')
      .trim();
  };

  const processMessage = async (message) => {
    if (!message) return;
    const senderId = message.senderId ? message.senderId.toString() : null;
    
    if (senderId === targetBotId) {
      let rawText = message.text || message.message || "";
      let text = cleanBotText(rawText);
      let fileUrl = null;
      let fileName = null;

      // Xử lý nếu Bot gửi File (Document)
      if (message.media && message.media instanceof Api.MessageMediaDocument) {
        try {
          const buffer = await client.downloadMedia(message.media);
          // Lấy tên file gốc
          const attr = message.media.document.attributes.find(a => a instanceof Api.DocumentAttributeFilename);
          fileName = attr ? attr.fileName : `file_${message.id}`;
          
          const filePath = path.join(downloadDir, fileName);
          fs.writeFileSync(filePath, buffer);
          
          // Tạo link tải cho Frontend
          fileUrl = `http://localhost:3001/downloads/${encodeURIComponent(fileName)}`;
          console.log(`📂 Đã tải file: ${fileName}`);
        } catch (err) {
          console.error("Lỗi tải file:", err);
        }
      }

      // Bắt các link cài đặt (DNS, Profile...)
      // Trích xuất các link (URL) từ tin nhắn (Bao gồm cả link ẩn)
      let detectedLinks = [];
      if (message.entities) {
        message.entities.forEach(ent => {
          let url = "";
          if (ent instanceof Api.MessageEntityTextUrl) {
            url = ent.url;
          } else if (ent instanceof Api.MessageEntityUrl) {
            url = rawText.substring(ent.offset, ent.offset + ent.length);
          }
          
          // LỌC: Chỉ lấy link cài đặt, bỏ qua link YouTube/hướng dẫn
          if (url && !url.includes('youtube.com') && !url.includes('youtu.be')) {
            detectedLinks.push(url);
          }
        });
      }

      // Bắt thêm các link text nếu có (vẫn lọc youtube)
      if (rawText.includes('nextdns.io') || rawText.includes('apple.nextdns.io')) {
        const dnsMatch = rawText.match(/https?:\/\/[^\s]+/g);
        if (dnsMatch) {
          dnsMatch.forEach(l => {
            if (!l.includes('youtube.com') && !l.includes('youtu.be')) {
              detectedLinks.push(l);
            }
          });
        }
      }

      const msgInfo = {
        id: message.id,
        type: 'bot',
        sender: 'Hệ thống YuiChy',
        text: text,
        buttons: parseButtons(message),
        detectedLinks: [...new Set(detectedLinks)],
        fileUrl: fileUrl,
        fileName: fileName,
        msgId: message.id,
        timestamp: Date.now()
      };

      // XÓA BƯỚC CŨ: Chỉ giữ lại duy nhất tin nhắn mới nhất từ Bot
      latestResponses = [msgInfo];
    }
  };

  await client.start();
  console.log("✅ UserBot đã sẵn sàng!");

  try {
    const entity = await client.getEntity(botToAsk);
    targetBotId = entity.id.toString();
    console.log(`🎯 Đã xác định ID của Bot: ${targetBotId}`);
  } catch (err) {}

  // Đăng ký nhận mọi loại update (Tin mới, Chỉnh sửa, v.v.)
  client.addEventHandler((update) => {
    // Nếu là tin nhắn mới
    if (update instanceof Api.UpdateNewMessage || update instanceof Api.UpdateShortMessage) {
        processMessage(update.message);
    }
    // Nếu là tin nhắn bị chỉnh sửa
    else if (update instanceof Api.UpdateEditMessage || update instanceof Api.UpdateEditChannelMessage) {
        processMessage(update.message);
    }
  });
}

function parseButtons(msg) {
  if (!msg.replyMarkup || !msg.replyMarkup.rows) return null;
  return msg.replyMarkup.rows.map(row => 
    row.buttons
      .map(btn => ({
        text: btn.text,
        data: btn.data ? btn.data.toString('base64') : null,
        url: btn.url || null
      }))
      // Lọc nút bấm thông minh
      .filter(btn => {
        const t = btn.text.toLowerCase();
        
        // 1. Cho phép nút Locket Gold ở menu chính để bắt đầu
        if (t === 'locket gold' || t.includes('locket gold')) return true;

        // 2. Loại bỏ các nút VIP rườm rà ở menu chọn gói (VIP 2, VIP 3...)
        if (t.includes('vip') && (t.includes('huy hiệu') || t.includes('proxy'))) return false;
        
        // 4. Loại bỏ các nút quảng cáo không cần thiết
        if (t.includes('tham gia nhóm')) return false;

        // 3. Giữ lại các nút quan trọng trong quy trình kích hoạt
        const allowKeywords = ['gold cơ bản', 'bước', '✅', 'xác nhận', 'tiếp tục', 'làm xong', 'cài đặt', 'ấn để', 'tham gia', 'hàng chờ', 'hoàn thành'];
        return allowKeywords.some(key => t.includes(key));
      })
  ).filter(row => row.length > 0); // Loại bỏ các hàng trống sau khi lọc
}

app.post("/ask-bot", async (req, res) => {
  const { message, replyTo } = req.body;
  try {
    await client.sendMessage(botToAsk, { message, replyTo: replyTo ? parseInt(replyTo) : undefined });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/click-button", async (req, res) => {
  const { msgId, data } = req.body;
  try {
    await client.invoke(new Api.messages.GetBotCallbackAnswer({
      peer: botToAsk,
      msgId: parseInt(msgId),
      data: Buffer.from(data, 'base64')
    }));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/messages", (req, res) => {
  res.json({ success: true, messages: latestResponses });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  initTelegram();
});
