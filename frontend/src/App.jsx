// import { useState } from 'react';
// import { ethers } from 'ethers';
// import TokenABI from './abis/ZenithToken.json';
// import NFTABI from './abis/ZenithNFT.json';

// function App() {
//   const [account, setAccount] = useState("");
//   const [status, setStatus] = useState("");

//   const tokenAddress = import.meta.env.VITE_TOKEN_ADDRESS;
//   const nftAddress = import.meta.env.VITE_NFT_ADDRESS;

//   async function connectWallet() {
//     if (window.ethereum) {
//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       setAccount(accounts[0]);
//     }
//   }

//   async function mintNFT() {
//     try {
//       setStatus("Đang xử lý Mint...");
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const nftContract = new ethers.Contract(nftAddress, NFTABI.abi, signer);

//       // Metadata mẫu cho NFT
//       const tx = await nftContract.safeMint(account, "https://gateway.pinata.cloud/ipfs/example");
//       await tx.wait();
//       setStatus("Chúc mừng! Bạn đã mint thành công 1 Zenith NFT.");
//     } catch (error) {
//       console.error(error);
//       setStatus("Lỗi: " + error.reason);
//     }
//   }

//   return (
//     <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial' }}>
//       <h1>💎 Zenith Portal</h1>
//       {!account ? (
//         <button onClick={connectWallet} style={btnStyle}>Kết nối ví MetaMask</button>
//       ) : (
//         <div>
//           <p>Ví: <b>{account}</b></p>
//           <div style={{ marginTop: '20px' }}>
//             <button onClick={mintNFT} style={btnStyle}>🎨 Mint Zenith NFT</button>
//           </div>
//           <p style={{ color: 'blue' }}>{status}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// const btnStyle = { padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '8px', border: 'none', backgroundColor: '#007bff', color: 'white' };

// export default App;

import { useState } from 'react';
import { ethers } from 'ethers';
import TokenABI from './abis/ZenithToken.json';
import NFTABI from './abis/ZenithNFT.json';

function App() {
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState("");
  // Thêm state để quản lý việc chuyển Token
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const tokenAddress = import.meta.env.VITE_TOKEN_ADDRESS;
  const nftAddress = import.meta.env.VITE_NFT_ADDRESS;

  async function connectWallet() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    }
  }

  // --- Chức năng Mint NFT (Giữ nguyên) ---
  async function mintNFT() {
    try {
      setStatus("Đang xử lý Mint...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const nftContract = new ethers.Contract(nftAddress, NFTABI.abi, signer);

      const tx = await nftContract.safeMint(account, "https://gateway.pinata.cloud/ipfs/example");
      await tx.wait();
      setStatus("Chúc mừng! Bạn đã mint thành công 1 Zenith NFT.");
    } catch (error) {
      console.error(error);
      setStatus("Lỗi Mint: " + (error.reason || error.message));
    }
  }

  // --- Chức năng Chuyển Token (Mới) ---
  async function transferToken() {
  if (!recipient || !amount) {
    setStatus("Vui lòng nhập địa chỉ và số lượng token.");
    return;
  }

  try {
    setStatus("Đang xử lý...");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    // ĐỊA CHỈ NÀY LÀ CỦA CONTRACT (NGÂN HÀNG)
    const tokenContract = new ethers.Contract(tokenAddress, TokenABI.abi, signer);

    const parsedAmount = ethers.parseUnits(amount, 18);

    // LỆNH NÀY MỚI LÀ GỬI TỚI NGƯỜI NHẬN (recipient)
    const tx = await tokenContract.transfer(recipient, parsedAmount);
    
    console.log("Đang gửi tới ví:", recipient); // Kiểm tra xem recipient có đúng là ví bạn nhập không
    await tx.wait();

    setStatus(`Thành công! Đã gửi ${amount} Token tới ${recipient}`);
    setAmount(""); 
  } catch (error) {
    setStatus("Lỗi: " + (error.reason || error.message));
  }
}

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h1>💎 Zenith Portal</h1>
      
      {!account ? (
        <button onClick={connectWallet} style={btnStyle}>Kết nối ví MetaMask</button>
      ) : (
        <div style={cardStyle}>
          <p>Ví hiện tại: <br/><code style={{color: '#2c3e50'}}>{account}</code></p>
          
          <hr style={{margin: '20px 0'}} />

          {/* Section: Mint NFT */}
          <div style={{ marginBottom: '30px' }}>
            <h3>Sở hữu NFT</h3>
            <button onClick={mintNFT} style={btnStyle}>🎨 Mint Zenith NFT</button>
          </div>

          <hr style={{margin: '20px 0'}} />

          {/* Section: Transfer Token */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Chuyển Zenith Token</h3>
            <input 
              placeholder="Địa chỉ ví nhận (0x...)" 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              style={inputStyle}
            />
            <br />
            <input 
              type="number" 
              placeholder="Số lượng (e.g. 10.5)" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputStyle}
            />
            <br />
            <button onClick={transferToken} style={{...btnStyle, backgroundColor: '#28a745'}}>
              🚀 Gửi Token
            </button>
          </div>

          <p style={{ color: status.includes("Lỗi") ? "red" : "blue", fontWeight: 'bold' }}>{status}</p>
        </div>
      )}
    </div>
  );
}

// --- Styles ---
const btnStyle = { 
  padding: '12px 24px', 
  fontSize: '16px', 
  cursor: 'pointer', 
  borderRadius: '8px', 
  border: 'none', 
  backgroundColor: '#007bff', 
  color: 'white',
  fontWeight: 'bold',
  transition: '0.3s'
};

const inputStyle = {
  padding: '10px',
  width: '300px',
  marginBottom: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '15px',
  display: 'inline-block',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

export default App;