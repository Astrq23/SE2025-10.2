## Giới Thiệu

Báo cáo này dựa trên nội dung được cung cấp, tập trung vào việc **phân tích và giải thích các khái niệm, công cụ, và mã nguồn** liên quan đến việc **tương tác với blockchain Ethereum thông qua thư viện Ethers.js** trong một dự án **Node.js**.

Dự án có tên **`ethers-v6`** nhằm mục đích thực hiện các thao tác cơ bản như:

- Đọc dữ liệu blockchain
- Gửi giao dịch
- Tương tác với hợp đồng thông minh (smart contracts)
- Theo dõi sự kiện (events)

Các **dịch vụ bên thứ ba** như **Alchemy** và **Tenderly** được sử dụng để hỗ trợ kết nối và mô phỏng môi trường thử nghiệm.

---

### Cấu Trúc Báo Cáo

Báo cáo được chia thành các phần chính:

1. **Tổng quan về các dịch vụ và công cụ hỗ trợ**
2. **Cấu trúc dự án và file chính**
3. **Các khái niệm cốt lõi trong Ethers.js**
4. **Chi tiết về hợp đồng thông minh và tiêu chuẩn ERC-20**
5. **Các file mã nguồn cụ thể và chức năng của chúng**
6. **Các thuộc tính và phương thức liên quan đến ví (wallet) và sự kiện**

> **Mục tiêu**: Cung cấp cái nhìn **toàn diện, dễ hiểu**, giúp người đọc **nắm bắt cách xây dựng và vận hành một ứng dụng tương tác với Ethereum** mà **không cần triển khai trên mạng thực tế**.

---

## Các Dịch Vụ Và Công Cụ Hỗ trợ

### Alchemy

**Alchemy** là **nhà cung cấp dịch vụ nút (node provider)** cho blockchain Ethereum. Họ cung cấp **khóa API (API key)** để kết nối với mạng Ethereum, cho phép truy cập dữ liệu blockchain mà **không cần chạy nút riêng**.

- **Ví dụ API key**: `KHHOeRb86IAZYAZ8Lrekt`
- **Hỗ trợ**: Các thao tác **đọc/ghi dữ liệu**
- **Ưu điểm**: Phát triển ứng dụng **nhanh chóng, đáng tin cậy**

---

### Tenderly

**Tenderly** là nền tảng dùng để tạo **mạng thử nghiệm ảo (virtual testnet)** hoặc **môi trường hộp cát (sandbox)** riêng.

- Cho phép sử dụng **Ether (ETH)** để thực hiện giao dịch **mà không ảnh hưởng đến blockchain thực tế**
- **URL HTTPS** (ví dụ):  
  `https://virtual.mainnet.eu.rpc.tenderly.co/b3af68e5-9243-4734-9def-100be0f977fe`
- **Hỗ trợ**: Gửi giao dịch, kiểm thử, mô phỏng trong môi trường **an toàn**
- **Lợi ích**: Tránh **rủi ro tài chính và lỗi trên mạng chính**

---

## Cấu Trúc Dự Án Và File Chính

### `package.json`

File `package.json` mô tả **thông tin và các thư viện phụ thuộc** của dự án Node.js.

```json
{
  "name": "ethers-v6",
  "version": "1.0.0",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "license": "ISC",
  "dependencies": {
    "dotenv": "16.5.0",
    "ethers": "6.13.7",
    "prompt": "^1.3.0"
  }
}
```

- **`dotenv`**: Quản lý biến môi trường từ file `.env`
- **`ethers`**: Thư viện chính để tương tác với Ethereum
- **`prompt`**: Nhập dữ liệu từ người dùng qua terminal (bảo mật khóa riêng)

---

### `.env`

File `.env` lưu trữ các **biến môi trường nhạy cảm**:

```env
ALCHEMY_API_KEY=KHHOeRb86IAZYAZ8Lrekt
TENDERLY_RPC_URL=https://virtual.mainnet.eu.rpc.tenderly.co/b3af68e5-9243-4734-9def-100be0f977fe
```

> File này được tải bởi `dotenv` để **tránh lộ thông tin nhạy cảm** trong mã nguồn.

---

## Các Khái Niệm Cốt Lõi Trong Ethers.js

| Khái niệm       | Mô tả |
|----------------|-------|
| **Provider** | Kết nối **chỉ đọc (read-only)** với blockchain. Dùng để truy vấn: tài khoản, block, giao dịch, log, hoặc gọi hàm **chỉ đọc (call)**. |
| **Signer** | Đại diện cho **tài khoản có khả năng ký giao dịch**. Sở hữu **khóa riêng (private key)**. Dùng để **ghi dữ liệu, gửi giao dịch**. |
| **Transaction** | Hành động **thay đổi trạng thái** trên blockchain (gửi tiền, gọi hàm, triển khai contract). **Tốn phí gas** dù thành công hay thất bại. |
| **Contract** | Chương trình được triển khai trên blockchain, có **code + state**. Có thể **đọc (Provider)** hoặc **ghi (Signer)**. |
| **Receipt** | Biên nhận sau khi giao dịch được **xác nhận**. Chứa: block, phí gas, sự kiện, trạng thái thành công/thất bại. |

---

## Hợp Đồng Thông Minh Và Tiêu Chuẩn ERC-20

### Định Nghĩa Hợp Đồng Thông Minh

- Chương trình chạy trên Ethereum
- Bao gồm **code (hàm)** và **state (trạng thái)**
- Lưu tại **địa chỉ cụ thể**
- Là **tài khoản Ethereum** có số dư
- **Không thể xóa hoặc đảo ngược**
- Tương tác qua **giao dịch**

---

### Giao Diện Nhị Phân Ứng Dụng (ABI)

- Định nghĩa cách **mã hóa/giải mã dữ liệu nhị phân** cho:
  - Phương thức
  - Sự kiện
  - Lỗi
- Cần **Fragment** cho mỗi yếu tố
- Có thể ở dạng:
  - **JSON** (từ Solidity)
  - **Human-readable** (chữ ký hàm)

> Các phần không cần thiết có thể **bỏ qua**.

---

### Token Và ERC-20

**Token trên Ethereum** đại diện cho: điểm, kỹ năng, tài sản, tiền, vàng, v.v.

**ERC-20** là tiêu chuẩn cho **token thay thế lẫn nhau (fungible)** – mỗi token **giống hệt nhau** (như ETH).

#### Methods

| Method | Mô tả | Kiểu trả về |
|-------|-------|-------------|
| `name()` | Tên token | `string` |
| `symbol()` | Ký hiệu | `string` |
| `decimals()` | Số chữ số thập phân | `uint8` |
| `totalSupply()` | Tổng cung | `uint256` |
| `balanceOf(address)` | Số dư | `uint256` |
| `transfer(address, uint256)` | Chuyển token | `bool` |
| `transferFrom(address, address, uint256)` | Chuyển từ tài khoản khác | `bool` |
| `approve(address, uint256)` | Phê duyệt chi tiêu | `bool` |
| `allowance(address, address)` | Số lượng được phê duyệt | `uint256` |

#### Events

| Event | Tham số |
|-------|--------|
| `Transfer` | `(address from, address to, uint256 value)` |
| `Approval` | `(address owner, address spender, uint256 value)` |

---

## Chi Tiết Các File Mã Nguồn

### `1_account.js`

- Tải `.env` → Lấy **API key Alchemy**
- Tạo **Provider**
- Lấy **số dư ví** → Chuyển từ **Wei → ETH** (`formatUnits`)
- In kết quả

---

### `prompt.js`

- Dùng thư viện `prompt`
- Schema: `privateKey` → **bắt buộc, ẩn khi nhập**
- Hàm `promptForKey()` → Trả về khóa riêng
- Xuất hàm để dùng ở file khác

---

### `2_send_signed_transaction.js`

- Tải `.env` → Lấy **Tenderly RPC URL**
- Tạo **Provider + Wallet** (từ private key)
- Lấy số dư **trước/sau**
- Gửi **1 ETH** đến địa chỉ nhận
- Chờ **receipt** → In transaction + receipt

---

### `3_read_smart_contracts.js`

- Kết nối **Alchemy Provider**
- ABI ERC-20 (chỉ đọc: `name`, `symbol`, `decimals`, `totalSupply`, `balanceOf`)
- Địa chỉ **USDC**: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
- Tạo **Contract instance**
- Gọi các hàm → In kết quả (dùng `formatUnits` cho số dư)

---

### `4_write_smart_contracts.js`

- Kết nối **Tenderly Provider**
- ABI ERC-20 (ghi: `transfer`, `decimals`, `balanceOf`)
- Tạo **Wallet**
- Lấy số dư **trước/sau**
- Gọi `transfer(1 token)` → Chờ receipt → In kết quả

---

### `5_contract_events.js`

- Kết nối **Alchemy Provider**
- ABI với **event `Transfer`**
- Lấy **block hiện tại**
- Dùng `queryFilter` → Lấy **Transfer events** trong block gần nhất
- In chi tiết **event đầu tiên**

---

## Thuộc Tính Và Phương Thức Liên Quan Đến Ví Và Sự Kiện

### Thuộc Tính Của `BaseWallet`

| Thuộc tính | Kiểu | Ghi chú |
|-----------|------|--------|
| `address` | `string` | Chỉ đọc |
| `privateKey` | `string` | Chỉ đọc |
| `signingKey` | `SigningKey` | Dùng để ký |

---

### Tạo Instances

```js
new BaseWallet(privateKey, provider?)
```

- Nếu **không có Provider** → Chỉ dùng **offline methods**

---

### Nghe Sự Kiện (Event Listener)

```js
contract.on("Transfer", (from, to, value, event) => { ... })
```

- Hỗ trợ **destructuring**
- Trả về `EventPayload` (có `filter`, `removeListener`)

---

### Truy Vấn Sự Kiện Lịch Sử

```js
contract.queryFilter("Transfer", fromBlock, toBlock)
```

> **Cảnh báo**: Với khoảng block lớn → **chậm, lỗi, hoặc bị cắt kết quả** tùy backend.

---

## Kết Luận

Dự án **`ethers-v6`** minh họa cách sử dụng **Ethers.js** để:

- **Tương tác an toàn** với Ethereum
- **Đọc dữ liệu**, **gửi giao dịch**, **theo dõi sự kiện**
- Sử dụng **Alchemy** (đọc) và **Tenderly** (ghi thử nghiệm)

Các khái niệm cốt lõi:

- **Provider / Signer**
- **Contract / ABI**
- **ERC-20**

là **nền tảng cho phát triển dApp**.

### Lưu Ý Khi Triển Khai

- **Bảo mật private key**
- **Quản lý gas fee**
- **Không lưu khóa riêng trong mã nguồn**

---

---


```

