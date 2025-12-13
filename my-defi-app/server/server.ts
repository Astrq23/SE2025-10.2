// D:\cnpm\my-defi-app/server/server.ts (KHÔNG CÓ IMPORT GLOBAL.D.TS)

import 'dotenv/config'; 
import express, { Request, Response } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import { SiweMessage, generateNonce } from 'siwe';

const app = express();
const port = process.env.PORT || 4000;

// Cấu hình Session (Quan trọng cho SIWE)
app.use(session({
    name: 'defi-session',
    secret: process.env.SESSION_SECRET || 'my_super_secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
    }
}));

// Cấu hình Middleware
app.use(bodyParser.json());

// Cấu hình CORS để Frontend có thể truy cập
app.use(cors({
    origin: 'http://localhost:5173', // Địa chỉ của Frontend
    credentials: true, // Cho phép truyền cookie/session
}));

// --- Các API Endpoint cho SIWE ---

// 1. API: Tạo Nonce (được gọi đầu tiên)
app.get('/api/nonce', (req: Request, res: Response) => {
    const nonce = generateNonce();
    req.session.nonce = nonce; 
    console.log(`Nonce created: ${nonce}`);
    res.status(200).send({ nonce });
});

// 2. API: Xác thực Chữ ký (Đăng nhập)
app.post('/api/verify', async (req: Request, res: Response) => {
    try {
        const { message, signature } = req.body;
        const siweMessage = new SiweMessage(message);

        // BƯỚC 1: Xác minh chữ ký và nonce
        const { success, data } = await siweMessage.verify({ 
            signature: signature,
            nonce: req.session.nonce 
        });

        if (success) {
            // BƯỚC 2: Nếu xác minh thành công, lưu địa chỉ vào session
            req.session.siwe = data; 
            req.session.userId = data.address; // Lưu ID người dùng (địa chỉ ví)
            console.log(`User logged in: ${data.address}`);
            res.status(200).send({
                address: data.address,
                isLoggedIn: true,
                message: "Đăng nhập thành công!"
            });
        } else {
            res.status(401).send({ isLoggedIn: false, message: "Xác minh chữ ký thất bại." });
        }
    } catch (error) {
        console.error("Lỗi xác minh SIWE:", error);
        res.status(500).send({ isLoggedIn: false, message: "Lỗi Server nội bộ." });
    }
});

// 3. API: Kiểm tra trạng thái đăng nhập
app.get('/api/status', (req: Request, res: Response) => {
    if (req.session.userId) { 
        res.status(200).send({ 
            isLoggedIn: true, 
            address: req.session.userId 
        });
    } else {
        res.status(200).send({ 
            isLoggedIn: false 
        });
    }
});

// 4. API: Đăng xuất
app.post('/api/logout', (req: Request, res: Response) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({ success: false, message: "Lỗi đăng xuất server." });
        }
        res.clearCookie('defi-session'); // Xóa cookie session
        res.status(200).send({ success: true, message: "Đã đăng xuất." });
    });
});


app.listen(port, () => {
    console.log(`Backend API đang chạy tại http://localhost:${port}`);
});