// src/components/AcademyLogo.tsx
import React from 'react';
import Image from 'next/image';

interface AcademyLogoProps {
  size?: number;
  variant?: 'icon' | 'full';
  className?: string;
  style?: React.CSSProperties;
}

export default function AcademyLogo({
  size = 42,
  variant = 'icon',
  className,
  style,
}: AcademyLogoProps) {
  if (variant === 'full') {
    return (
      <Image
        src="/logo.png"
        alt="Tide Physics Academy — TRB ACADEMY for PHYSICS"
        width={Math.round(size * 4.63)}
        height={size}
        priority
        className={className}
        style={{
          objectFit: 'contain',
          height: size,
          width: 'auto',
          flexShrink: 0,
          ...style,
        }}
      />
    );
  }

  return (
    <Image
      src="/icon.png"
      alt="Tide Physics Academy Logo"
      width={size}
      height={size}
      priority
      className={className}
      style={{
        objectFit: 'contain',
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: 8,
        ...style,
      }}
    />
  );
}

