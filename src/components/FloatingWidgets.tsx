// src/components/FloatingWidgets.tsx
'use client';

import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import styles from './FloatingWidgets.module.css';

export default function FloatingWidgets() {
  return (
    <>
      {/* WhatsApp Support Button */}
      <a
        href="https://wa.me/919876543210?text=Hi%20PhysicsCoach%20Pro,%20I%20want%20information%20regarding%20CSIR-NET%20and%20GATE%20Physics%20batches."
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappFloat}
        aria-label="WhatsApp Support"
      >
        <MessageCircle size={20} className={styles.whatsappIcon} />
        <span className={styles.whatsappText}>WhatsApp Support</span>
      </a>

      {/* Direct Call Button */}
      <a
        href="tel:+919876543210"
        className={styles.callFloat}
        aria-label="Faculty Desk: +91 98765 43210"
      >
        <Phone size={18} />
        <span className={styles.callText}>Faculty Desk: +91 98765 43210</span>
      </a>
    </>
  );
}
