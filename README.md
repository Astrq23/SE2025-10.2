# REPORT: DECENTRALIZED EXCHANGE (DEX) DEVELOPMENT
**Project Name:** Zenith Portal (Ricoin Platform)
**Student Name:** Nguyễn Hoàng Việt, Nguyễn Thừa Tuân, Trương Đan Vi, Ngô Khánh Trượng
**Group Name:** SE2025-10.2

---

## 1. Project Overview 
**Zenith Portal** là một nền tảng tài chính phi tập trung (DeFi) toàn diện, kết hợp sức mạnh của công nghệ Blockchain (EVM) với trải nghiệm người dùng hiện đại.

Dự án không chỉ dừng lại ở việc viết Smart Contract, mà còn tập trung giải quyết bài toán khó nhất của Web3 hiện nay: **Rào cản giao diện**. Hệ thống cung cấp một Frontend trực quan, mượt mà, giúp người dùng dễ dàng tiếp cận các tính năng phức tạp như Swap, Staking và NFT Marketplace.

---

## 2. Goals & Objectives 

### 2.1. Goals
1.  **Seamless User Experience (UX):** Xây dựng giao diện hiện đại, loại bỏ cảm giác khô khan của các dApp truyền thống, giúp người dùng thao tác dễ dàng như Web2.
2.  **Robust DeFi Ecosystem:** Tạo ra một vòng tròn kinh tế khép kín: Kiếm token từ Staking -> Dùng token để Swap/Trade -> Sử dụng lợi nhuận để sưu tầm NFT.
3.  **Secure & Transparent:** Đảm bảo tính minh bạch tuyệt đối thông qua Smart Contract, đồng thời giao diện Frontend phải phản hồi chính xác trạng thái On-chain.

### 2.2. Objectives

#### A. Frontend Development
* **Kiến trúc SPA:** Xây dựng ứng dụng Single Page Application với **React (Vite)** và **React Router v6** để chuyển trang tức thì không độ trễ.
* **Component System:** Thiết kế bộ thư viện Component tái sử dụng (`MintingBox`, `TokenSelector`, `Header/Footer`) để đảm bảo tính nhất quán.
* **Visual Engineering:** Xử lý các kỹ thuật giao diện phức tạp như **Video Background**, **Z-index Layering** (xử lý xung đột giữa các lớp phủ và nội dung nền), và **Responsive Design**.
* **Web3 Integration:** Tích hợp **Wagmi/Viem** để xử lý kết nối ví đa chuỗi, hiển thị số dư real-time và phản hồi trạng thái giao dịch (Toast Notification).

#### B. Backend/Smart Contract
* **AMM DEX:** Triển khai cơ chế tạo lập thị trường tự động ($x*y=k$) cho phép Swap token liên tục.
* **Staking Logic:** Xây dựng cơ chế gửi tiết kiệm (Stake) nhận lãi suất APY 12%.
* **NFT Standard:** Triển khai NFT Marketplace với đầy đủ tính năng Listing, Buying, và thu phí sàn tự động.

---

## 3. Technical Architecture

### 3.1. Frontend Implementation
Giao diện được xây dựng dựa trên tư duy **Component-Driven**, chia tách rõ ràng giữa UI và Logic:

* **Core Libraries:**
    * `React 18 + TypeScript`: Nền tảng chính, đảm bảo Type Safety.
    * `Vite`: Build tool thế hệ mới, tối ưu tốc độ HMR (Hot Module Replacement).
    * `Wagmi + RainbowKit`: Module quản lý kết nối ví (Wallet Connect/MetaMask).
    * `React Query`: Quản lý Server State (đồng bộ dữ liệu từ Blockchain).

* **Key Views:**
    * **Hero Section:** Tích hợp Video Background (`bg-video.mp4`) >100MB được tối ưu hóa, kết hợp hiệu ứng overlay mờ để làm nổi bật nội dung.
    * **MintView:** Giao diện Mint NFT chuyên biệt với hình nền `fixed` riêng, xử lý logic `z-index` để không che khuất Footer.
    * **TokenManagement:** Dashboard quản lý tài sản cá nhân, tích hợp chức năng chuyển tiền (Transfer) với thông báo trạng thái `React Toastify` (Success/Error).
    * **Global Navigation:** Header và Footer được đồng bộ hóa liên kết (Sitemap), tự động highlight trang đang truy cập.

### 3.2. Backend Implementation
Hệ thống Smart Contract viết bằng **Solidity 0.8.20**, bao gồm 3 contracts chính tương tác chặt chẽ với nhau:

1.  **ZenithToken (ZEN):** Token quản trị chuẩn ERC-20, tích hợp quyền `operationAddress` cho các tác vụ hệ thống.

3.  **TokenStaking:** Contract quản lý tiền gửi.
    * *Logic:* Tính toán lãi suất dựa trên từng giây (`block.timestamp`), chính xác tuyệt đối.
4.  **ZenithNFT:** Hệ sinh thái vật phẩm số.

---

## 4. Key Challenges & Solutions

Đây là phần thể hiện năng lực giải quyết vấn đề kỹ thuật (Technical Problem Solving):

### Về Frontend
* **Vấn đề 1: Xung đột hiển thị (Z-Index Hell)**
    * *Mô tả:* Footer và Dropdown menu bị các thành phần hình nền `fixed` hoặc video background đè lên che khuất.
    * *Giải pháp:* Thiết lập lại hệ thống **Stacking Context**. Đưa Background về `z-index: -1` hoặc `0`, và bọc các thành phần tương tác (Header, Footer, Modal) trong container có `z-index` cao (`relative`, `z-50`).
* **Vấn đề 2: Quản lý tài nguyên tĩnh (Static Assets)**
    * *Mô tả:* Vite không load được ảnh khi dùng đường dẫn chuỗi (`/assets/...`) sau khi build.
    * *Giải pháp:* Chuyển đổi toàn bộ sang cơ chế **ES Module Import**, giúp Bundler định danh và tối ưu hóa file ảnh/video.

### Về Backend
* **Vấn đề 3: Bảo mật giao dịch tài chính**
    * *Mô tả:* Nguy cơ bị tấn công Reentrancy khi Smart Contract thực hiện chuyển tiền (Withdraw/Swap).
    * *Giải pháp:* Áp dụng `ReentrancyGuard` (nonReentrant modifier) cho tất cả các hàm thay đổi số dư người dùng.
* **Vấn đề 4: Tính toán số học**
    * *Mô tả:* Rủi ro sai số khi tính lãi suất Staking hoặc tỷ giá Swap.
    * *Giải pháp:* Sử dụng đơn vị `wei` (18 số thập phân) và cơ chế tính toán nhân trước chia sau để giảm thiểu sai số làm tròn.

---

## 5. Conclusion
Dự án **Zenith Portal** đã hoàn thành xuất sắc mục tiêu đề ra:
1.  **Frontend:** Một giao diện DEX hoàn chỉnh, đẹp mắt, xử lý tốt các tác vụ Web3 phức tạp và tối ưu trải nghiệm người dùng.
2.  **Backend:** Một hệ thống Smart Contract an toàn, chuẩn mực, đáp ứng đầy đủ nghiệp vụ tài chính (Swap, Stake, NFT).

Sự kết hợp chặt chẽ này tạo nên một sản phẩm có tính thực tiễn cao, sẵn sàng để triển khai và mở rộng trong tương lai.