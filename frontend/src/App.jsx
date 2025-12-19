import { useState } from 'react';
import { ethers } from 'ethers';
import TokenABI from './abis/ZenithToken.json';
import NFTABI from './abis/ZenithNFT.json';

function App() {
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState("");
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

  async function transferToken() {
    if (!recipient || !amount) {
      setStatus("Vui lòng nhập địa chỉ và số lượng token.");
      return;
    }

    try {
      setStatus("Đang xử lý...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, TokenABI.abi, signer);
      const parsedAmount = ethers.parseUnits(amount, 18);
      const tx = await tokenContract.transfer(recipient, parsedAmount);
      
      console.log("Đang gửi tới ví:", recipient);
      await tx.wait();

      setStatus(`Thành công! Đã gửi ${amount} Token tới ${recipient}`);
      setAmount(""); 
    } catch (error) {
      setStatus("Lỗi: " + (error.reason || error.message));
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px'
    }}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={{ margin: 0, fontSize: '2.5rem', color: '#fff', textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
            💎 Zenith Portal
          </h1>
          <p style={{ margin: '10px 0 0 0', color: 'rgba(255,255,255,0.8)' }}>Your Gateway to Web3</p>
        </div>
      
        {!account ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <button onClick={connectWallet} style={connectBtnStyle}>
              <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>🦊</span>
              Kết nối ví MetaMask
            </button>
          </div>
        ) : (
          <div>
            <div style={walletInfoStyle}>
              <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>👤</span>
              <div>
                <small style={{ color: '#999', display: 'block', marginBottom: '5px' }}>Ví của bạn</small>
                <code style={{ color: '#00d4ff', fontWeight: 'bold', wordBreak: 'break-all' }}>{account}</code>
              </div>
            </div>

            <div style={sectionStyle}>
              <div style={sectionHeaderStyle}>
                <span style={{ fontSize: '2rem' }}>🎨</span>
                <div>
                  <h3 style={{ margin: 0, color: '#fff' }}>Mint NFT</h3>
                  <p style={{ margin: '5px 0 0 0', color: '#aaa', fontSize: '0.9rem' }}>Tạo và sở hữu Zenith NFT độc quyền</p>
                </div>
              </div>
              <button onClick={mintNFT} style={primaryBtnStyle}>
                Mint NFT Ngay
              </button>
            </div>

            <div style={sectionStyle}>
              <div style={sectionHeaderStyle}>
                <span style={{ fontSize: '2rem' }}>🚀</span>
                <div>
                  <h3 style={{ margin: 0, color: '#fff' }}>Chuyển Token</h3>
                  <p style={{ margin: '5px 0 0 0', color: '#aaa', fontSize: '0.9rem' }}>Gửi Zenith Token đến địa chỉ khác</p>
                </div>
              </div>
              <input 
                placeholder="Địa chỉ ví nhận (0x...)" 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                style={modernInputStyle}
              />
              <input 
                type="number" 
                placeholder="Số lượng token" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={modernInputStyle}
              />
              <button onClick={transferToken} style={secondaryBtnStyle}>
                Gửi Token
              </button>
            </div>

            {status && (
              <div style={{
                ...statusStyle,
                backgroundColor: status.includes("Lỗi") ? '#fee' : status.includes("Thành công") ? '#efe' : '#e3f2fd',
                color: status.includes("Lỗi") ? '#c33' : status.includes("Thành công") ? '#2e7d32' : '#1976d2',
                border: `1px solid ${status.includes("Lỗi") ? '#fcc' : status.includes("Thành công") ? '#c8e6c9' : '#90caf9'}`
              }}>
                {status}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  backgroundColor: 'white',
  borderRadius: '20px',
  maxWidth: '600px',
  width: '100%',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  overflow: 'hidden'
};

const headerStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '40px 30px',
  textAlign: 'center'
};

const walletInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  padding: '20px 30px',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #e9ecef'
};

const sectionStyle = {
  padding: '30px',
  borderBottom: '1px solid #e9ecef'
};

const sectionHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  marginBottom: '20px'
};

const connectBtnStyle = {
  padding: '16px 40px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  borderRadius: '50px',
  border: 'none',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  fontWeight: 'bold',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  transition: 'all 0.3s ease',
  display: 'inline-flex',
  alignItems: 'center'
};

const primaryBtnStyle = {
  padding: '14px 30px',
  fontSize: '1rem',
  cursor: 'pointer',
  borderRadius: '10px',
  border: 'none',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  fontWeight: 'bold',
  width: '100%',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease'
};

const secondaryBtnStyle = {
  padding: '14px 30px',
  fontSize: '1rem',
  cursor: 'pointer',
  borderRadius: '10px',
  border: 'none',
  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  color: 'white',
  fontWeight: 'bold',
  width: '100%',
  boxShadow: '0 4px 15px rgba(17, 153, 142, 0.3)',
  transition: 'all 0.3s ease'
};

const modernInputStyle = {
  padding: '14px 18px',
  width: '100%',
  marginBottom: '15px',
  borderRadius: '10px',
  border: '2px solid #e9ecef',
  fontSize: '1rem',
  boxSizing: 'border-box',
  transition: 'border 0.3s ease',
  outline: 'none'
};

const statusStyle = {
  margin: '20px 30px',
  padding: '15px 20px',
  borderRadius: '10px',
  fontWeight: '500',
  textAlign: 'center'
};

export default App;