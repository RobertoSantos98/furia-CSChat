import ChatBox from './components/ChatBox.tsx';
import './index.css';

function App() {
  return (
    <>
      <div className="background" />
      <div className="overlay" />
      <div className="app-container">
        <img src="./Furia_Esports_logo.png" alt="logo-furia" style={{ width: '120px', marginBottom: '16px' }} />
        <h1 className="title">FURIA Chat</h1>
        <ChatBox />
      </div>
    </>
  );
}

export default App;
