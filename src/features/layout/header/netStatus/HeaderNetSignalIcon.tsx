import React from 'react'

type SignalLevel = 0 | 1 | 2 | 3 | 4

type SignalColor = '#fff' | '#d1d5db' | '#1a1a1a'

interface SignalIconProps extends React.HTMLAttributes<SVGElement> {
  level: SignalLevel
  color: SignalColor
}

const HeaderNetSignalIcon: React.FC<SignalIconProps> = ({ level, color, ...props }) => {
  return (
    <svg
      width="21"
      height="17"
      viewBox="0 0 21 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="13" width="3" height="4" rx="1" fill={level >= 1 ? color : '#d1d5db'} />
      <rect x="7" y="9" width="3" height="8" rx="1" fill={level >= 2 ? color : '#d1d5db'} />
      <rect x="12" y="5" width="3" height="12" rx="1" fill={level >= 3 ? color : '#d1d5db'} />
      <rect x="17" y="1" width="3" height="16" rx="1" fill={level >= 4 ? color : '#d1d5db'} />
    </svg>
  )
}

export default HeaderNetSignalIcon
