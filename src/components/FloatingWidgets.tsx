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
        href="https://wa.me/919994854604?text=Hi%20Tide%20Physics%20Academy,%20I%20want%20information%20regarding%20TRB%20Physics%20and%20competitive%20batches."
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappFloat}
        aria-label="WhatsApp Support"
      >
        <MessageCircle size={20} className={styles.whatsappIcon} />
        <span className={styles.whatsappText}>WhatsApp Helpdesk</span>
      </a>

      {/* Direct Call Button */}
      <a
        href="tel:9994854604"
        className={styles.callFloat}
        aria-label="Helpline: 9994854604"
      >
        <Phone size={18} />
        <span className={styles.callText}>Helpline: 9994854604</span>
      </a>
    </>
  );
}
