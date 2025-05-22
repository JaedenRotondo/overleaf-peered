import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

export default function Home() {
  const navigate = useNavigate();

  function createNewDoc() {
    const newRoomId = nanoid();
    navigate(`/doc/${newRoomId}`);
  }

  return (
    <div>
      <h1>Welcome to OverleafPeer</h1>
      <button onClick={createNewDoc}>Create New Document</button>
    </div>
  );
}
