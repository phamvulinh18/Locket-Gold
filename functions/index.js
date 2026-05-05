/**
 * Firebase Cloud Function - Webhook nhận thông báo giao dịch từ SePay/Casso
 * 
 * === HƯỚNG DẪN CÀI ĐẶT ===
 * 
 * 1. Cài Firebase CLI:
 *    npm install -g firebase-tools
 * 
 * 2. Đăng nhập:
 *    firebase login
 * 
 * 3. Khởi tạo Functions (chọn JavaScript):
 *    firebase init functions
 * 
 * 4. Copy file này vào functions/index.js
 * 
 * 5. Deploy:
 *    firebase deploy --only functions
 * 
 * 6. Sau khi deploy, bạn sẽ nhận được URL webhook:
 *    https://us-central1-locket-d2825.cloudfunctions.net/sepayWebhook
 * 
 * 7. Đăng ký tài khoản tại https://my.sepay.vn
 *    - Kết nối tài khoản MB Bank (STK: 0373374624)
 *    - Vào Cài đặt → Webhook → Dán URL webhook ở trên
 *    - Thêm API Key (tự đặt, ví dụ: "LOCKETGOLD_SECRET_2024")
 * 
 * === FLOW ===
 * SePay phát hiện giao dịch mới → Gửi POST đến webhook → 
 * Function khớp nội dung CK với đơn hàng pending → Cập nhật status = "completed"
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// API Key bảo mật webhook - phải khớp với key đặt trên SePay
const SEPAY_API_KEY = "LOCKETGOLD_SECRET_2024"; // ← ĐỔI KEY NÀY

exports.sepayWebhook = functions.https.onRequest(async (req, res) => {
  // Chỉ chấp nhận POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Xác thực API Key
  const authHeader = req.headers["authorization"];
  if (!authHeader || authHeader !== `Apikey ${SEPAY_API_KEY}`) {
    console.warn("Webhook: Unauthorized request");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const data = req.body;
    console.log("Webhook received:", JSON.stringify(data));

    // SePay gửi data dạng:
    // {
    //   "id": 123,
    //   "transferType": "in",
    //   "transferAmount": 99000,
    //   "content": "VIP1 nguyenvana",
    //   "accountNumber": "0373374624",
    //   ...
    // }

    // Chỉ xử lý giao dịch tiền VÀO
    if (data.transferType !== "in") {
      return res.status(200).json({ success: true, message: "Ignored: not incoming transfer" });
    }

    const content = (data.content || "").trim();
    const amount = data.transferAmount || 0;

    if (!content) {
      return res.status(200).json({ success: true, message: "Ignored: empty content" });
    }

    // Tìm đơn hàng pending có nội dung CK khớp
    const ordersRef = db.collection("orders");
    const snapshot = await ordersRef
      .where("status", "==", "pending")
      .where("transferContent", "==", content)
      .limit(1)
      .get();

    if (snapshot.empty) {
      console.log(`Không tìm thấy đơn hàng cho nội dung: "${content}"`);
      return res.status(200).json({ success: true, message: "No matching order found" });
    }

    // Cập nhật đơn hàng thành completed
    const orderDoc = snapshot.docs[0];
    const orderData = orderDoc.data();

    // Kiểm tra số tiền khớp
    if (amount < orderData.amount) {
      console.warn(`Số tiền không khớp: nhận ${amount}, cần ${orderData.amount}`);
      await orderDoc.ref.update({
        status: "amount_mismatch",
        receivedAmount: amount,
        sepayTransactionId: data.id,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return res.status(200).json({ success: true, message: "Amount mismatch" });
    }

    // ✅ Thanh toán thành công
    await orderDoc.ref.update({
      status: "completed",
      receivedAmount: amount,
      sepayTransactionId: data.id,
      completedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`✅ Đơn hàng ${orderDoc.id} đã được thanh toán thành công!`);
    console.log(`   User: ${orderData.username}, Plan: ${orderData.planName}, Amount: ${amount}`);

    return res.status(200).json({ 
      success: true, 
      message: "Payment confirmed",
      orderId: orderDoc.id 
    });

  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
