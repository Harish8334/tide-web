// src/app/admin/live-classes/[id]/host/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { liveClassApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { Mic, MicOff, Video, VideoOff, Monitor, Zap, VolumeX, Hand, X, User } from 'lucide-react';
import styles from './page.module.css';

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  handRaised: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
}

export default function AdminLiveHostStudioPage() {
  const params = useParams();
  const classId = params?.id as string;
  const router = useRouter();
  const { showToast } = useToast();

  const [activeSideTab, setActiveSideTab] = useState<'chat' | 'students' | 'quiz'>('students');
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [quizTriggered, setQuizTriggered] = useState(false);

  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'Arjun Verma (IIT Bombay)', isMuted: true, handRaised: false },
    { id: '2', name: 'Priya Sharma (DU)', isMuted: true, handRaised: true },
    { id: '3', name: 'Rohan Mehra (IISc)', isMuted: false, handRaised: false },
    { id: '4', name: 'Ananya Roy (JNU)', isMuted: true, handRaised: false },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'Arjun Verma', text: 'Sir, what happens to degeneracy in a cubic perturbation?', time: '18:04' },
    { id: '2', sender: 'Priya Sharma', text: 'Clear audio and crystal board view here!', time: '18:05' },
    { id: '3', sender: 'Rohan Mehra', text: 'Got it, H\' matrix eigenvalues give first-order shifts.', time: '18:08' },
  ]);

  const handleMuteAll = () => {
    setParticipants(participants.map((p) => ({ ...p, isMuted: true })));
    showToast('All student microphones have been muted.', 'info');
  };

  const handleKick = (id: string, name: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
    showToast(`${name} was removed from the live room.`, 'warning');
  };

  const handleDeleteMessage = (id: string) => {
    setChatMessages(chatMessages.filter((m) => m.id !== id));
    showToast('Message deleted by moderator', 'info');
  };

  const handleEndClass = async () => {
    if (!confirm('Are you sure you want to end this live broadcast for all participants?')) return;
    try {
      await liveClassApi.end(classId);
    } catch {}
    showToast('Broadcast completed and archived.', 'success');
    router.push('/admin/live-classes');
  };

  const handleTriggerQuiz = () => {
    setQuizTriggered(true);
    showToast('Instant MCQ Question pushed to student screens!', 'success');
  };

  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className={styles.liveIndicator}>
            <span className={styles.pulse} />
            ON AIR STUDIO
          </div>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>
            Perturbation Theory & Zeeman Effect Live Masterclass
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600 }}>
            ● {participants.length} Active Attendees
          </span>
          <button onClick={handleEndClass} className={`${styles.toolBtn} ${styles.toolBtnDanger}`}>
            End Broadcast ⏹️
          </button>
        </div>
      </div>

      {/* Studio Grid */}
      <div className={styles.studioGrid}>
        {/* Main Stage */}
        <div className={styles.mainStage}>
          <div className={styles.whiteboardCanvas}>
            <div style={{ textAlign: 'center', color: '#94A3B8' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(0,86,210,0.15)', borderRadius: '50%', marginBottom: '0.5rem' }}>
                <User size={40} color="#60A5FA" />
              </div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1.1rem' }}>
                Host Camera &amp; Interactive Physics Board Active
              </div>
              <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                Ĥ |ψ⟩ = E |ψ⟩ — Broadcasting 1080p 60fps to students
              </div>
            </div>
          </div>

          {/* Host Controls */}
          <div className={styles.hostToolbar}>
            <button
              onClick={() => setMicActive(!micActive)}
              className={styles.toolBtn}
              style={{ background: micActive ? 'var(--color-surface-hover)' : '#EF4444', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              {micActive ? <><Mic size={15} /> Mic On</> : <><MicOff size={15} /> Mic Muted</>}
            </button>

            <button
              onClick={() => setCamActive(!camActive)}
              className={styles.toolBtn}
              style={{ background: camActive ? 'var(--color-surface-hover)' : '#EF4444', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              {camActive ? <><Video size={15} /> Cam On</> : <><VideoOff size={15} /> Cam Off</>}
            </button>

            <button
              onClick={() => setScreenSharing(!screenSharing)}
              className={styles.toolBtn}
              style={{ background: screenSharing ? '#0056D2' : 'var(--color-surface-hover)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Monitor size={15} /> {screenSharing ? 'Sharing Screen' : 'Share Screen'}
            </button>

            <button onClick={handleMuteAll} className={styles.toolBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <VolumeX size={15} /> Mute All Students
            </button>

            <button onClick={handleTriggerQuiz} className={styles.toolBtn} style={{ background: '#F59E0B', color: '#000', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Zap size={15} /> Launch Quick Quiz
            </button>
          </div>
        </div>

        {/* Side Panel: Students / Moderated Chat / Live Quiz */}
        <div className={styles.sidePanel}>
          <div className={styles.panelTabs}>
            <button
              onClick={() => setActiveSideTab('students')}
              className={`${styles.tab} ${activeSideTab === 'students' ? styles.tabActive : ''}`}
            >
              Attendees ({participants.length})
            </button>
            <button
              onClick={() => setActiveSideTab('chat')}
              className={`${styles.tab} ${activeSideTab === 'chat' ? styles.tabActive : ''}`}
            >
              Moderated Chat ({chatMessages.length})
            </button>
          </div>

          <div className={styles.panelBody}>
            {activeSideTab === 'students' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>CONNECTED PARTICIPANTS</span>
                  <button onClick={handleMuteAll} style={{ background: 'none', border: 'none', color: '#38BDF8', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
                    Mute All
                  </button>
                </div>
                {participants.map((p) => (
                  <div key={p.id} className={styles.participantRow}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{p.name}</div>
                      <div style={{ fontSize: '0.75rem', color: p.isMuted ? 'var(--color-text-muted)' : '#10B981' }}>
                        {p.isMuted ? 'Muted' : 'Mic Live'} {p.handRaised ? '(Hand Raised)' : ''}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button
                        onClick={() => handleKick(p.id, p.name)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        Kick
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeSideTab === 'chat' && (
              <>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>LIVE CHAT STREAM</span>
                {chatMessages.map((m) => (
                  <div key={m.id} className={styles.chatMsg}>
                    <div>
                      <span style={{ fontWeight: 700, color: '#38BDF8', marginRight: '0.4rem' }}>{m.sender}:</span>
                      <span>{m.text}</span>
                    </div>
                    <button onClick={() => handleDeleteMessage(m.id)} className={styles.delMsgBtn} title="Delete message">
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
