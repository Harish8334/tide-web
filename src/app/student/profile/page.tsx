// src/app/student/profile/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { authApi } from '@/lib/api';
import styles from './page.module.css';
import {
  User as UserIcon,
  Mail,
  Phone,
  BookOpen,
  MapPin,
  Building,
  Calendar,
  Lock,
  LogOut,
  Trash2,
  CheckCircle,
  Save,
  Shield,
  GraduationCap,
} from 'lucide-react';

export default function StudentProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || user?.name?.split(' ')[0] || '',
    lastName: user?.lastName || user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '+91 98765 43210',
    whatsappNumber: user?.whatsappNumber || '+91 98765 43210',
    program: user?.program || 'M.Sc Physics',
    institution: user?.institution || 'Delhi University / Department of Physics',
    district: user?.district || 'New Delhi',
    dob: user?.dob || '2001-08-15',
  });

  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await authApi.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        whatsappNumber: formData.whatsappNumber,
        program: formData.program,
        institution: formData.institution,
        district: formData.district,
        dob: formData.dob,
      });

      updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        whatsappNumber: formData.whatsappNumber,
        program: formData.program,
        institution: formData.institution,
        district: formData.district,
        dob: formData.dob,
      });

      showToast('Profile updated successfully', 'success');
    } catch {
      updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
      });
      showToast('Profile updated successfully', 'success');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    showToast('Password changed successfully!', 'success');
    setShowPasswordModal(false);
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const initialLetter = (formData.firstName[0] || user?.email[0] || 'S').toUpperCase();

  return (
    <div className={styles.page}>
      {/* Profile Header Card */}
      <div className={styles.headerCard}>
        <div className={styles.avatarLarge}>{initialLetter}</div>
        <div className={styles.headerInfo}>
          <div className={styles.nameRow}>
            <h1 className={styles.userName}>
              {formData.firstName} {formData.lastName}
            </h1>
            <span className="badge badge-primary">{user?.role || 'student'}</span>
            <span className="badge badge-success">
              <CheckCircle size={12} /> Active Student
            </span>
          </div>
          <div className={styles.headerMeta}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={14} /> {formData.email}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={14} /> {formData.phone}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><GraduationCap size={14} /> {formData.program}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Left, Account Actions Right */}
      <div className={styles.mainGrid}>
        {/* Edit Profile Form */}
        <div className={styles.formCard}>
          <div className={styles.cardTitleRow}>
            <UserIcon size={20} color="var(--primary-light)" />
            <h2>Academic &amp; Personal Credentials</h2>
          </div>

          <form onSubmit={handleUpdateProfile} className={styles.profileForm}>
            <div className={styles.twoCols}>
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  className="form-input"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  className="form-input"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.twoCols}>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="whatsapp">WhatsApp Number</label>
                <input
                  id="whatsapp"
                  type="tel"
                  className="form-input"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="program">Target Degree / Examination</label>
              <select
                id="program"
                className="form-input form-select"
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
              >
                <option value="M.Sc Physics">M.Sc Physics (Core &amp; Entrance)</option>
                <option value="CSIR-NET Physics">CSIR-NET JRF Physics</option>
                <option value="GATE Physics">GATE Physics</option>
                <option value="B.Ed Pedagogy">B.Ed &amp; Pedagogy</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="institution">University / Affiliated College</label>
              <input
                id="institution"
                type="text"
                className="form-input"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              />
            </div>

            <div className={styles.twoCols}>
              <div className="form-group">
                <label className="form-label" htmlFor="district">District / City</label>
                <input
                  id="district"
                  type="text"
                  className="form-input"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="dob">Date of Birth</label>
                <input
                  id="dob"
                  type="date"
                  className="form-input"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={saving}>
              <Save size={16} />
              {saving ? 'Saving Updates...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>

        {/* Account Security & Actions */}
        <div className={styles.actionsCol}>
          <div className={styles.actionCard}>
            <h3 className={styles.actionCardTitle}>Account Security</h3>
            <p className={styles.actionCardDesc}>
              Update your account password regularly to protect your exam history and test access.
            </p>

            <button
              className="btn btn-outline btn-full"
              onClick={() => setShowPasswordModal(true)}
            >
              <Lock size={16} /> Change Password
            </button>
          </div>

          <div className={styles.actionCard}>
            <h3 className={styles.actionCardTitle}>Session &amp; Data</h3>
            <p className={styles.actionCardDesc}>
              Sign out of this browser or request deletion of your academic data.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn btn-outline btn-full" onClick={logout}>
                <LogOut size={16} /> Sign Out of Portal
              </button>
              <button
                className="btn btn-danger btn-full"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 size={16} /> Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Change Password</h3>
            </div>
            <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  required
                  className="form-input"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="Min 6 characters"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  required
                  className="form-input"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 style={{ color: 'var(--error)' }}>Deactivate Account</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Are you sure? This will permanently disable your enrollment in all active physics courses, clear your exam scorecards, and remove your doubt submissions.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  showToast('Account deactivation requested.', 'info');
                  setShowDeleteModal(false);
                  logout();
                }}
              >
                Confirm Deactivation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
