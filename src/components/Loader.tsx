// src/components/Loader.tsx
'use client';

import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullPage?: boolean;
}

export default function Loader({ size = 'md', text, fullPage = false }: LoaderProps) {
  const content = (
    <div className={`${styles.loaderContainer} ${styles[size]}`}>
      <div className={styles.spinner} />
      {text && <p className={styles.loaderText}>{text}</p>}
    </div>
  );

  if (fullPage) {
    return <div className={styles.fullPageOverlay}>{content}</div>;
  }

  return content;
}
