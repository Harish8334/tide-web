// src/app/student/leaderboard/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import { Trophy, Award, Flame, Search, Medal, TrendingUp, Crown, User, GraduationCap } from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatarLetter: string;
  avatarColor: string;
  score: number;
  examsTaken: number;
  streak: number;
  isCurrentUser?: boolean;
}

const LEADERBOARD_DATA: LeaderboardUser[] = [
  { rank: 1, name: 'Sneha Reddy', avatarLetter: 'S', avatarColor: '#0056D2', score: 984, examsTaken: 24, streak: 18 },
  { rank: 2, name: 'Aditya Verma', avatarLetter: 'A', avatarColor: '#7C3AED', score: 962, examsTaken: 22, streak: 14 },
  { rank: 3, name: 'Pooja Iyer', avatarLetter: 'P', avatarColor: '#0EA5E9', score: 948, examsTaken: 20, streak: 12 },
  { rank: 4, name: 'Manav Patel', avatarLetter: 'M', avatarColor: '#22C55E', score: 915, examsTaken: 19, streak: 9 },
  { rank: 5, name: 'Anurag Kashyap', avatarLetter: 'A', avatarColor: '#E11D48', score: 890, examsTaken: 18, streak: 11 },
  { rank: 6, name: 'Kavita Joshi', avatarLetter: 'K', avatarColor: '#D97706', score: 875, examsTaken: 17, streak: 7 },
  { rank: 7, name: 'Devendra Meena', avatarLetter: 'D', avatarColor: '#2563EB', score: 860, examsTaken: 16, streak: 5 },
  { rank: 8, name: 'Rohan Deshmukh', avatarLetter: 'R', avatarColor: '#9333EA', score: 845, examsTaken: 16, streak: 6 },
  { rank: 9, name: 'Megha Roy', avatarLetter: 'M', avatarColor: '#059669', score: 830, examsTaken: 15, streak: 8 },
  { rank: 10, name: 'You (Student Account)', avatarLetter: 'P', avatarColor: '#0056D2', score: 815, examsTaken: 14, streak: 4, isCurrentUser: true },
];

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'monthly' | 'weekly'>('all');
  const [search, setSearch] = useState('');

  const filteredData = LEADERBOARD_DATA.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const top3 = LEADERBOARD_DATA.slice(0, 3);
  const rest = filteredData;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>All-India Aspirant Leaderboard</h1>
          <p className={styles.subtitle}>
            Benchmark your test performance against top aspirants preparing for CSIR-NET &amp; GATE Physics.
          </p>
        </div>

        <div className={styles.periodTabs}>
          {(['all', 'monthly', 'weekly'] as const).map((period) => (
            <button
              key={period}
              className={`${styles.periodBtn} ${filterPeriod === period ? styles.periodBtnActive : ''}`}
              onClick={() => setFilterPeriod(period)}
            >
              {period === 'all' ? 'All-Time' : period === 'monthly' ? 'This Month' : 'This Week'}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <section className={styles.podiumSection} aria-label="Top 3 Aspirants">
        {/* 2nd place */}
        <div className={`${styles.podiumCol} ${styles.secondCol}`}>
          <div className={styles.podiumAvatar}>
            <div 
              style={{ 
                width: 52, 
                height: 52, 
                borderRadius: '50%', 
                background: top3[1].avatarColor, 
                color: '#fff', 
                fontWeight: 700, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.25rem'
              }}
            >
              {top3[1].avatarLetter}
            </div>
            <div className={`${styles.podiumBadge} ${styles.silverBadge}`}>2</div>
          </div>
          <span className={styles.podiumName}>{top3[1].name}</span>
          <span className={styles.podiumScore}>{top3[1].score} pts</span>
          <div className={`${styles.podiumPillar} ${styles.pillar2}`}>
            <span className={styles.pillarRank}>2nd Place</span>
          </div>
        </div>

        {/* 1st place */}
        <div className={`${styles.podiumCol} ${styles.firstCol}`}>
          <div className={styles.crown}>
            <Crown size={28} color="#FFD700" fill="#FFD700" />
          </div>
          <div className={styles.podiumAvatar}>
            <div 
              style={{ 
                width: 60, 
                height: 60, 
                borderRadius: '50%', 
                background: top3[0].avatarColor, 
                color: '#fff', 
                fontWeight: 700, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.4rem'
              }}
            >
              {top3[0].avatarLetter}
            </div>
            <div className={`${styles.podiumBadge} ${styles.goldBadge}`}>1</div>
          </div>
          <span className={styles.podiumName}>{top3[0].name}</span>
          <span className={styles.podiumScore}>{top3[0].score} pts</span>
          <div className={`${styles.podiumPillar} ${styles.pillar1}`}>
            <span className={styles.pillarRank}>Champion</span>
          </div>
        </div>

        {/* 3rd place */}
        <div className={`${styles.podiumCol} ${styles.thirdCol}`}>
          <div className={styles.podiumAvatar}>
            <div 
              style={{ 
                width: 52, 
                height: 52, 
                borderRadius: '50%', 
                background: top3[2].avatarColor, 
                color: '#fff', 
                fontWeight: 700, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.25rem'
              }}
            >
              {top3[2].avatarLetter}
            </div>
            <div className={`${styles.podiumBadge} ${styles.bronzeBadge}`}>3</div>
          </div>
          <span className={styles.podiumName}>{top3[2].name}</span>
          <span className={styles.podiumScore}>{top3[2].score} pts</span>
          <div className={`${styles.podiumPillar} ${styles.pillar3}`}>
            <span className={styles.pillarRank}>3rd Place</span>
          </div>
        </div>
      </section>

      {/* Search & Rankings Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div className={styles.searchBox}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search aspirant name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <span className={styles.totalAspirants}>Rankings updated every 24 hours</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Aspirant</th>
                <th>Total Score</th>
                <th>Tests Completed</th>
                <th>Daily Streak</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((r) => {
                const isMe = r.isCurrentUser;
                return (
                  <tr key={r.rank} className={isMe ? styles.myRow : ''}>
                    <td>
                      <span className={styles.rankPill}>
                        {r.rank === 1 ? (
                          <Medal size={16} color="#FFD700" />
                        ) : r.rank === 2 ? (
                          <Medal size={16} color="#94A3B8" />
                        ) : r.rank === 3 ? (
                          <Medal size={16} color="#B45309" />
                        ) : (
                          `#${r.rank}`
                        )}
                      </span>
                    </td>
                    <td>
                      <div className={styles.aspirantCell}>
                        <div 
                          style={{ 
                            width: 32, 
                            height: 32, 
                            borderRadius: '50%', 
                            background: r.avatarColor, 
                            color: '#fff', 
                            fontWeight: 700, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontSize: '0.85rem'
                          }}
                        >
                          {r.avatarLetter}
                        </div>
                        <div>
                          <span className={styles.rowName}>
                            {r.name} {isMe && <span className={styles.meTag}>You</span>}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <strong className={styles.scoreText}>{r.score}</strong>
                    </td>
                    <td>{r.examsTaken} Tests</td>
                    <td>
                      <span className={styles.streakBadge}>
                        <Flame size={14} color="#f59e0b" /> {r.streak} Days
                      </span>
                    </td>
                    <td>
                      <span className={styles.trendUp}>
                        <TrendingUp size={14} /> +{12 - (r.rank % 6)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
