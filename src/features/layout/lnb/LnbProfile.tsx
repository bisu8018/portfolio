/**
 * LnbProfile 컴포넌트
 * 내비게이션 바의 프로필 영역을 렌더링합니다.
 * @component
 * @returns {JSX.Element} 프로필 영역
 */

import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export default function LnbProfile({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { t } = useTranslation()
  return (
    <>
      <div
        className={clsx(
          'w-24 h-24 rounded-full mb-2 flex items-center justify-center text-4xl font-bold',
          className,
        )}
        style={{
          background: 'linear-gradient(135deg, rgb(207 232 253) 0%, rgb(162 152 252) 100%)',
        }}
        {...props}
      >
        <span role="img" aria-label="profile" className="text-6xl">
          😊
        </span>
      </div>
      <div className="text-md font-bold">{t('profile.name', '박희용')}</div>
      <div className="text-sm mb-2">dean.huiyongPark@gmail.com</div>
    </>
  )
  //
}
