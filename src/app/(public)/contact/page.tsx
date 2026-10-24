// src/app/(public)/contact/page.tsx
'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Please enter your full name';
    if (!form.email.trim()) {
      errs.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!form.message.trim() || form.message.length < 10) {
      errs.message = 'Please enter a message (at least 10 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Thank you! Your message has been received.', 'success');
    }, 900);
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="container">
          <div className="section-tag">Get in Touch</div>
          <h1 className={styles.heroTitle}>We&apos;re Here to Help Your Physics Journey</h1>
          <p className={styles.heroSubtitle}>
            Have a question about course syllabi, fee structures, or batch schedules? Send us a message or reach out directly.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '3.5rem 1.5rem 5rem' }}>
        <div className={styles.grid}>
          {/* Left Column: Contact Details */}
          <div className={styles.infoCol}>
            <div className={styles.infoCard}>
              <h2 className={styles.cardHeading}>Institute Contact Headquarters</h2>
              <p className={styles.cardDesc}>
                Our academic counselors and student support staff are available Monday through Saturday.
              </p>

              <div className={styles.contactItems}>
                <div className={styles.item}>
                  <div className={styles.iconCircle}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className={styles.itemLabel}>Email Support</div>
                    <a href="mailto:contact@physicscoachpro.com" className={styles.itemLink}>
                      contact@physicscoachpro.com
                    </a>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.iconCircle}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className={styles.itemLabel}>Counseling Helpline</div>
                    <a href="tel:+919876543210" className={styles.itemLink}>
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.iconCircle}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className={styles.itemLabel}>Physical Center</div>
                    <span className={styles.itemText}>
                      Physics Tower, Education Hub, Near Metro Gate 3, New Delhi, 110001
                    </span>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.iconCircle}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className={styles.itemLabel}>Operating Hours</div>
                    <span className={styles.itemText}>
                      Mon – Sat: 9:00 AM – 7:00 PM IST (Sundays by appointment)
                    </span>
                  </div>
                </div>
              </div>

              {/* Map embed placeholder */}
              <div className={styles.mapContainer}>
                <iframe
                  title="Institute Location Map"
                  src="https://maps.google.com/maps?q=Connaught%20Place,%20New%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className={styles.mapIframe}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              {isSubmitted ? (
                <div className={styles.successState}>
                  <CheckCircle2 size={64} className={styles.successIcon} />
                  <h2 className={styles.successTitle}>Message Dispatched!</h2>
                  <p className={styles.successDesc}>
                    Thank you, <strong>{form.name}</strong>. An academic counselor will review your inquiry and get back to you within 24 hours at <strong>{form.email}</strong>.
                  </p>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      setIsSubmitted(false);
                      setForm({ name: '', email: '', subject: 'General Enquiry', message: '' });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formHeader}>
                    <MessageSquare size={24} color="var(--primary-light)" />
                    <h2 className={styles.formTitle}>Send an Academic Inquiry</h2>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      Your Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="e.g. Aryan Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="e.g. aryan@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">
                      Subject / Topic
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      aria-label="Subject / Topic"
                      className="form-input form-select"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    >
                      <option value="General Enquiry">General Academic Enquiry</option>
                      <option value="Course Information">Course Syllabus & Schedule</option>
                      <option value="Admission & Fee">Admission & Fee Structure</option>
                      <option value="Technical Support">Platform / Portal Access Issue</option>
                      <option value="Partnership">Institutional Partnership</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">
                      Your Message or Questions *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`form-input ${errors.message ? 'error' : ''}`}
                      placeholder="Please specify your target exam (CSIR-NET, GATE, M.Sc), academic background, or question..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ marginTop: '0.75rem' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending Message...'
                    ) : (
                      <>
                        <Send size={18} />
                        Transmit Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
