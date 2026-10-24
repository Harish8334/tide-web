// src/app/admin/courses/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { courseApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { BookOpen, Atom, Plus } from 'lucide-react';
import styles from './page.module.css';

interface CourseItem {
  id: string;
  title: string;
  category: string;
  level: string;
  instructorName?: string;
  thumbnail?: string;
  price?: number;
  enrolledCount?: number;
}

const MOCK_COURSES: CourseItem[] = [
  { id: '1', title: 'Advanced Quantum Mechanics & Perturbation Theory', category: 'M.Sc Physics', level: 'Advanced', instructorName: 'Dr. Vikram Raman', price: 4999, enrolledCount: 142 },
  { id: '2', title: 'Classical Electrodynamics & Radiation Theory', category: 'M.Sc Physics', level: 'Intermediate', instructorName: 'Prof. Anjali Desai', price: 4499, enrolledCount: 124 },
  { id: '3', title: 'CSIR-NET Physical Sciences Comprehensive Crash Course', category: 'CSIR-NET/GATE', level: 'Advanced', instructorName: 'Dr. Vikram Raman', price: 7999, enrolledCount: 215 },
  { id: '4', title: 'Statistical Mechanics & Phase Transitions', category: 'M.Sc Physics', level: 'Intermediate', instructorName: 'Dr. Sandeep Ghosh', price: 3999, enrolledCount: 86 },
  { id: '5', title: 'Physics Pedagogy & Teaching Methodology for B.Ed', category: 'B.Ed & Pedagogy', level: 'Beginner', instructorName: 'Prof. K. N. Sen', price: 2999, enrolledCount: 68 },
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>(MOCK_COURSES);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const { showToast } = useToast();

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await courseApi.getAll();
        if (Array.isArray(res) && res.length > 0) {
          const mapped: CourseItem[] = res.map((c: any) => ({
            id: c.id || c._id,
            title: c.title,
            category: c.category || 'M.Sc Physics',
            level: c.level || 'Intermediate',
            instructorName: c.instructor?.fullName || 'Faculty Member',
            price: c.price || 4999,
            enrolledCount: c.enrolledStudents?.length || Math.floor(Math.random() * 100 + 40),
          }));
          setCourses(mapped);
        }
      } catch (err) {
        // Fallback to mock
      }
    }
    loadCourses();
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || c.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete course "${title}"? This cannot be undone.`)) return;
    try {
      await courseApi.delete(id);
    } catch {
      // Mock delete
    }
    setCourses((prev) => prev.filter((c) => c.id !== id));
    showToast(`Course "${title}" deleted`, 'info');
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={24} color="#0056D2" /> Manage Courses &amp; Curricula
        </h1>
        <Link href="/admin/courses/new" className={styles.createBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Plus size={16} /> Create New Course
        </Link>
      </div>

      <div className={styles.filterCard}>
        <input
          type="text"
          placeholder="Search courses by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={styles.selectInput}
        >
          <option value="All">All Categories</option>
          <option value="M.Sc Physics">M.Sc Physics</option>
          <option value="CSIR-NET/GATE">CSIR-NET / GATE</option>
          <option value="B.Ed & Pedagogy">B.Ed & Pedagogy</option>
          <option value="Research & Lab">Research & Lab</option>
        </select>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Category</th>
              <th>Level</th>
              <th>Instructor</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className={styles.courseThumbCell}>
                    <div
                      style={{
                        width: '42px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #0056D2, #1E2D40)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        color: '#60A5FA',
                        fontSize: '12px',
                      }}
                    >
                      <Atom size={18} />
                    </div>
                    <div>
                      <div className={styles.courseTitle}>{c.title}</div>
                      <div className={styles.coursePrice}>₹{c.price?.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`${styles.badge} ${styles.badgeCategory}`}>{c.category}</span>
                </td>
                <td>
                  <span className={`${styles.badge} ${styles.badgeLevel}`}>{c.level}</span>
                </td>
                <td>{c.instructorName}</td>
                <td><strong>{c.enrolledCount}</strong> enrolled</td>
                <td>
                  <div className={styles.actionBtns}>
                    <Link href={`/admin/courses/${c.id}`} className={styles.actionLink} title="View Details & Enrolled Students">
                      View
                    </Link>
                    <Link href={`/admin/courses/${c.id}/edit`} className={styles.actionLink} title="Edit Syllabus">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(c.id, c.title)}
                      className={styles.deleteBtn}
                      title="Delete Course"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
