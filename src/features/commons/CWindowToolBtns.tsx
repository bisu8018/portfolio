/**
 * CWindowToolBtns 컴포넌트
 * 윈도우 툴 버튼(최소화, 최대화 등)을 렌더링합니다.
 * @component
 * @returns {JSX.Element} 툴 버튼 영역
 */
import { useWindowStore } from '@/stores/windowStore'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'

type CWindowToolBtnsProps = React.HTMLAttributes<HTMLDivElement>

export default function CWindowToolBtns({ className, ...props }: CWindowToolBtnsProps) {
  const { t } = useTranslation()
  const setClosed = useWindowStore((s) => s.setClosed)
  const setMinimized = useWindowStore((s) => s.setMinimized)
  const setMaximized = useWindowStore((s) => s.setMaximized)
  const isMaximized = useWindowStore((s) => s.isMaximized)
  const navigate = useNavigate()

  return (
    <div className={clsx('absolute flex gap-2 group', className)} {...props}>
      {/* Close */}
      <span
        className="cursor-pointer w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center"
        title={t('lnb.close')}
        onClick={() => {
          setClosed(true)
          navigate('/')
        }}
      >
        <img
          src="/lnb-close.svg"
          alt="close"
          className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </span>

      {/* Minimize */}
      <span
        className={
          isMaximized
            ? 'w-3 h-3 rounded-full bg-gray-300 border border-gray-400 flex items-center justify-center'
            : 'cursor-pointer w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center'
        }
        title={t('lnb.minimize')}
        onClick={isMaximized ? undefined : () => setMinimized(true)}
        aria-disabled={isMaximized}
      >
        <img
          src="/lnb-minimize.svg"
          alt="minimize"
          className={
            isMaximized
              ? 'w-2 h-2 opacity-0 transition-opacity'
              : 'w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity'
          }
        />
      </span>

      {/* Maximize / Restore */}
      <span
        className="cursor-pointer w-3 h-3 rounded-full bg-[#27c93f] border border-[#13a10e] flex items-center justify-center"
        title={isMaximized ? t('lnb.restore') : t('lnb.maximize')}
        onClick={() => setMaximized((v) => !v)}
      >
        <img
          src={isMaximized ? '/lnb-restore_down.svg' : '/lnb-maximize.svg'}
          alt={isMaximized ? 'restore' : 'maximize'}
          className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </span>
    </div>
  )
}
