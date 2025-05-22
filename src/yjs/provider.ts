import { WebrtcProvider } from 'y-webrtc';
import { ydoc } from './ydoc';

const roomName = `overleaf-per-room-${crypto.randomUUID()}`;
export const provider = new WebrtcProvider(roomName, ydoc);
