import { useRainControlStore } from '@/stores/rainControlStore'
import HeaderControlBtnWrapper from './HeaderControlBtnWrapper'
import { useTranslation } from 'react-i18next'

/**
 * HeaderControlRainToggleBtn 컴포넌트는 Rain(비) 효과의 활성화/비활성화를 토글하는 버튼입니다.
 *
 * - Rain 상태(`enabled`)에 따라 버튼의 색상과 스타일이 동적으로 변경됩니다.
 * - 버튼 클릭 시 `useRainControlStore`의 `setEnabled`를 호출하여 Rain 효과를 토글합니다.
 * - SVG 아이콘은 Rain 상태에 따라 시각적으로 구분됩니다.
 *
 * @component
 */
export default function HeaderControlRainToggleBtn() {
  const enabled = useRainControlStore((s) => s.enabled)
  const setEnabled = useRainControlStore((s) => s.setEnabled)
  const { t } = useTranslation()

  // Parallax 버튼과 동일한 색상 규칙 적용
  const iconStroke = enabled ? '#f87171' : '#fff'

  return (
    <HeaderControlBtnWrapper
      enabled={enabled}
      onClick={() => setEnabled(!enabled)}
      title={enabled ? t('rnb.rainOff') : t('rnb.rainOn')}
    >
      <svg
        className="svg-icon"
        width="28"
        height="28"
        viewBox="0 0 1024 1024"
        fill="none"
        style={{ verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M486.99392 831.36512c135.51616 0 245.76-106.25024 245.76-236.83072 0-43.29472-12.26752-85.68832-35.81952-123.12576L503.78752 185.0368a20.48 20.48 0 0 0-33.95584 0l-193.24928 287.08864a229.96992 229.96992 0 0 0-35.34848 122.38848c0 130.60096 110.24384 236.8512 245.76 236.8512z m-176.08704-336.896l175.9232-261.3248 175.80032 260.62848a188.96896 188.96896 0 0 1 29.184 100.7616c0 108.01152-91.87328 195.87072-204.8 195.87072s-204.8-87.87968-204.8-195.87072a188.60032 188.60032 0 0 1 28.69248-100.06528z"
          fill={iconStroke}
        />
      </svg>
    </HeaderControlBtnWrapper>
  )
}
