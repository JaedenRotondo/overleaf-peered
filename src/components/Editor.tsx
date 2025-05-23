import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { markdown } from '@codemirror/lang-markdown';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { yCollab } from 'y-codemirror.next';
import { useParams } from 'react-router-dom';

export function Editor() {
const { roomId } = useParams();

const ydocRef = useRef<Y.Doc>(new Y.Doc());
const providerRef = useRef<WebrtcProvider | null>(null);
const viewRef = useRef<EditorView | null>(null);
const editorRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
  ydocRef.current = new Y.Doc();
  const ytext = ydocRef.current.getText('codemirror');

  providerRef.current = new WebrtcProvider(roomId!, ydocRef.current, {
    signaling: ['wss://localhost:4444'],
  });

  if (!editorRef.current) return;

  viewRef.current = new EditorView({
    parent: editorRef.current,
    extensions: [
      basicSetup,
      markdown(),
      yCollab(ytext, providerRef.current.awareness),
    ],
  });

  return () => {
    providerRef.current?.destroy();
    viewRef.current?.destroy();
    ydocRef.current?.destroy();
  };
}, [roomId]);


    // Share button handler
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch {
      alert('Failed to copy link.');
    }
  };

  return <div>
    <h1>Collaborative Markdown Editor</h1>
    <p>Type your markdown here. Changes will be synced with other users in real-time.</p>
      <button onClick={handleShare}>🔗 Share</button>
    <p>Powered by Yjs and CodeMirror.</p>
    <div ref={editorRef} style={{ height: '80vh', border: '1px solid #ccc' }}></div>
  </div>;
}
