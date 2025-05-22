import { Editor } from './components/Editor';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './yjs/provider';
import Home from './home';

function App() {
  return (
        <div style={{ padding: '2rem' }}>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/doc/:roomId" element={<Editor />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
