import React from 'react'

/**
 * RNB(우측 내비게이션 바)용 SVG 그라디언트 배경 컴포넌트
 */
const RnbGradient: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    width="100%"
    height="100%"
    viewBox="0 0 340 1000"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="rnb-bg-grad" x1="0" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#000" stopOpacity="0" />
        <stop offset="22%" stopColor="#fff" stopOpacity="0.04" />
        <stop offset="38%" stopColor="#fff" stopOpacity="0.10" />
        <stop offset="54%" stopColor="#fff" stopOpacity="0.18" />
        <stop offset="70%" stopColor="#fff" stopOpacity="0.32" />
        <stop offset="85%" stopColor="#fff" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="340" height="1000" fill="url(#rnb-bg-grad)" />
  </svg>
)

export default RnbGradient
