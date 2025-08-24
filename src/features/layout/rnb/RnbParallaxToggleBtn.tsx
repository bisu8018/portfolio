import { useParallaxControlStore } from '@/stores/parallaxControlStore'
import RnbBtnWrapper from './RnbBtnWrapper'
import { useTranslation } from 'react-i18next'

/**
 * RnbParallaxToggleBtn 컴포넌트는 Parallax 효과의 활성화/비활성화를 토글하는 버튼입니다.
 *
 * - Parallax 상태(`enabled`)에 따라 버튼의 색상과 스타일이 동적으로 변경됩니다.
 * - 버튼 클릭 시 `useParallaxStore`의 `setEnabled`를 호출하여 Parallax 효과를 토글합니다.
 * - SVG 아이콘은 Parallax 상태에 따라 시각적으로 구분됩니다.
 *
 * @component
 */
export default function RnbParallaxToggleBtn() {
  const enabled = useParallaxControlStore((s) => s.enabled)
  const setEnabled = useParallaxControlStore((s) => s.setEnabled)
  const { t } = useTranslation()

  const iconMain = enabled ? '#f87171' : '#fff'
  const iconSecondary = enabled ? '#f43f5e' : '#fff'
  const borderColor = enabled ? '#f87171' : '#fff'
  const innerStroke = enabled ? '#f43f5e' : '#fff'

  return (
    <RnbBtnWrapper
      enabled={enabled}
      onClick={() => setEnabled(!enabled)}
      title={enabled ? t('rnb.parallaxOff') : t('rnb.parallaxOn')}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="12" rx="4" fill={iconMain} />
        <rect
          x="8"
          y="4"
          width="12"
          height="20"
          rx="4"
          fill={iconSecondary}
          fillOpacity={enabled ? 0.7 : 0.3}
        />
        <rect x="4" y="8" width="20" height="12" rx="4" stroke={borderColor} strokeWidth="1.5" />
        <rect x="8" y="4" width="12" height="20" rx="4" stroke={innerStroke} strokeWidth="1.5" />
        <g filter="url(#tilt-shadow)">
          <ellipse cx="14" cy="24" rx="7" ry="2" fill="#000" fillOpacity="0.10" />
        </g>
        <filter id="tilt-shadow" x="0" y="20" width="28" height="8" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </svg>
    </RnbBtnWrapper>
  )
}
