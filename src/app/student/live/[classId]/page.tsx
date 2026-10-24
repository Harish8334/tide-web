// src/app/student/live/[classId]/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { io, Socket } from 'socket.io-client';
import styles from './page.module.css';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Monitor,
  Hand,
  PhoneOff,
  Send,
  Users,
  MessageSquare,
  Sparkles,
  UserCheck,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe?: boolean;
}

export default function LiveRoomPage() {
  const params = useParams();
  const router = useRouter();
  const { user, token } = useAuth();
  const { showToast } = useToast();
  const classId = params?.classId as string;

  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [participantCount, setParticipantCount] = useState(38);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'Dr. Rajesh Sharma', text: 'Welcome everyone! Today we examine 1D step potentials and wave packet tunneling.', time: '10:02 AM' },
    { id: '2', sender: 'Sneha Reddy', text: 'Good morning Sir, will we derive the transmission coefficient formula today?', time: '10:03 AM' },
    { id: '3', sender: 'Dr. Rajesh Sharma', text: 'Yes Sneha, exactly. We will compare T for E > V0 and E < V0.', time: '10:04 AM' },
  ]);

  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Connect socket with fallback
  useEffect(() => {
    const SOCKET_URL = 'http://52.64.117.32:8000';
    try {
      const socket = io(SOCKET_URL, {
        auth: { token: token || '' },
        reconnectionAttempts: 2,
        timeout: 4000,
      });
      socketRef.current = socket;

      socket.emit('join:class', { classId, user: user?.name || user?.firstName || 'Student' });

      socket.on('chat:message', (data: { sender: string; text: string; time?: string }) => {
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            sender: data.sender || 'Participant',
            text: data.text,
            time: data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: false,
          },
        ]);
      });

      socket.on('participant:joined', () => setParticipantCount((c) => c + 1));
      socket.on('participant:left', () => setParticipantCount((c) => Math.max(1, c - 1)));
      socket.on('class:ended', () => {
        showToast('The instructor has concluded this live class.', 'info');
      });

      return () => {
        socket.disconnect();
      };
    } catch {
      // Graceful offline socket simulation
    }
  }, [classId, token, user, showToast]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const myName = user?.firstName || user?.name || 'You';
    const newMsg: ChatMessage = {
      id: String(Date.now()),
      sender: myName,
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    if (socketRef.current?.connected) {
      socketRef.current.emit('chat:send', { classId, message: inputText.trim() });
    }
  };

  const handleToggleHand = () => {
    const nextState = !handRaised;
    setHandRaised(nextState);
    if (nextState) {
      showToast('Hand raised! The instructor has been notified.', 'info');
      if (socketRef.current?.connected) {
        socketRef.current.emit('hand:raise', { classId });
      }
    } else {
      showToast('Hand lowered.', 'info');
    }
  };

  const handleLeave = () => {
    if (confirm('Are you sure you want to leave the live classroom?')) {
      showToast('You have exited the live classroom.', 'info');
      router.push('/student/live-classes');
    }
  };

  return (
    <div className={styles.room}>
      {/* Top bar */}
      <header className={styles.topBar}>
        <div className={styles.roomInfo}>
          <span className={styles.liveTag}>
            <span className="live-dot" /> LIVE TRANSMISSION
          </span>
          <h1 className={styles.roomTitle}>Quantum Mechanics: Wave Packets &amp; 1D Potential Barriers</h1>
        </div>
        <div className={styles.topRight}>
          <div className={styles.countBadge}>
            <Users size={15} />
            <span>{participantCount} In Class</span>
          </div>
        </div>
      </header>

      {/* Main split: 70% Video / Stream, 30% Chat */}
      <div className={styles.mainSplit}>
        {/* Stream Area */}
        <div className={styles.videoArea}>
          <div className={styles.videoCanvas}>
            {/* Whiteboard simulation canvas */}
            <div className={styles.whiteboardGraphic}>
              <div className={styles.instructorTag}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <UserCheck size={14} color="#0056D2" /> Dr. Rajesh Sharma (Lead Faculty)
                </span>
              </div>
              <div className={styles.canvasEquations}>
                <div className={styles.eqRow}>
                  <span className={styles.eqLabel}>Schrödinger Equation in 1D:</span>
                  <code>- (ℏ² / 2m) d²ψ/dx² + V(x)ψ = Eψ</code>
                </div>
                <div className={styles.eqRow}>
                  <span className={styles.eqLabel}>Transmission Coefficient (E &lt; V₀ Tunneling):</span>
                  <code>T ≈ 16 (E/V₀)(1 - E/V₀) e^(-2κa), where κ = √[2m(V₀ - E)] / ℏ</code>
                </div>
                <div className={styles.eqRow}>
                  <span className={styles.eqLabel}>Probability Current Density:</span>
                  <code>J = (ℏ / 2mi) [ψ* (dψ/dx) - ψ (dψ*/dx)]</code>
                </div>
              </div>
              <div className={styles.streamWatermark}>
                <Sparkles size={16} color="var(--primary-light)" /> PhysicsCoach Pro HD Interactive Stream
              </div>
            </div>
          </div>

          {/* Bottom Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.toolsGroup}>
              <button
                className={`${styles.toolBtn} ${micOn ? styles.toolBtnActive : styles.toolBtnMuted}`}
                onClick={() => {
                  setMicOn(!micOn);
                  showToast(micOn ? 'Microphone muted' : 'Microphone enabled', 'info');
                }}
                title={micOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>

              <button
                className={`${styles.toolBtn} ${camOn ? styles.toolBtnActive : styles.toolBtnMuted}`}
                onClick={() => {
                  setCamOn(!camOn);
                  showToast(camOn ? 'Camera turned off' : 'Camera turned on', 'info');
                }}
                title={camOn ? 'Stop Camera' : 'Start Camera'}
              >
                {camOn ? <VideoIcon size={20} /> : <VideoOff size={20} />}
              </button>

              <button
                className={`${styles.toolBtn} ${sharingScreen ? styles.toolBtnActive : ''}`}
                onClick={() => {
                  setSharingScreen(!sharingScreen);
                  showToast(sharingScreen ? 'Screen sharing stopped' : 'Screen sharing active', 'info');
                }}
                title="Share Screen"
              >
                <Monitor size={20} />
              </button>

              <button
                className={`${styles.toolBtn} ${handRaised ? styles.handActive : ''}`}
                onClick={handleToggleHand}
                title="Raise Hand to Speak"
              >
                <Hand size={20} />
              </button>
            </div>

            <button className={styles.leaveBtn} onClick={handleLeave}>
              <PhoneOff size={18} />
              <span>Leave Class</span>
            </button>
          </div>
        </div>

        {/* Right Chat Panel (30%) */}
        <aside className={styles.chatPanel} aria-label="Live Class Chat">
          <div className={styles.chatHeader}>
            <div className={styles.chatTitle}>
              <MessageSquare size={18} color="var(--primary-light)" />
              <span>Classroom Live Chat</span>
            </div>
            <span className={styles.chatHelp}>Be respectful</span>
          </div>

          <div className={styles.messagesList}>
            {messages.map((m) => (
              <div key={m.id} className={`${styles.messageItem} ${m.isMe ? styles.myMessage : ''}`}>
                <div className={styles.msgTop}>
                  <span className={styles.msgSender}>{m.sender}</span>
                  <span className={styles.msgTime}>{m.time}</span>
                </div>
                <div className={styles.msgBubble}>{m.text}</div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className={styles.chatInputForm}>
            <input
              type="text"
              placeholder="Ask a question or comment..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={styles.chatInput}
            />
            <button type="submit" className={styles.sendBtn} disabled={!inputText.trim()}>
              <Send size={16} />
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
