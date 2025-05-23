import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

export default function Home() {
  const navigate = useNavigate();

  async function createNewDoc() {
    const newRoomId = nanoid();

    // Notify ghost node (fire-and-forget)
    fetch("http://localhost:8080/register-room", {
      method: "POST",
      body: JSON.stringify({ roomId: newRoomId }),
      headers: { "Content-Type": "application/json" }
    }).catch(() => { /* Optionally handle failure */ });

    navigate(`/doc/${newRoomId}`);
  }

  return (
    <div>
      <h1>Welcome to OverleafPeer</h1>
      <button onClick={createNewDoc}>Create New Document</button>
    </div>
  );
}