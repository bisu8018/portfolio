import lnbClose from '@/assets/lnb-close.svg'
import lnbMinimize from '@/assets/lnb-minimize.svg'
import lnbMaximize from '@/assets/lnb-maximize.svg'
import lnbRestoreDown from '@/assets/lnb-restore_down.svg'
import { useLnbStore } from '@/stores/lnbStore'
import { useTranslation } from 'react-i18next'

export default function LnbButtons() {
  const { t } = useTranslation()
  const setClosed = useLnbStore((s) => s.setClosed)
  const setMinimized = useLnbStore((s) => s.setMinimized)
  const setMaximized = useLnbStore((s) => s.setMaximized)
  const isMaximized = useLnbStore((s) => s.isMaximized)

  return (
    <div className="absolute left-6 top-6 flex gap-2 group">
      {/* Close */}
      <span
        className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow flex items-center justify-center"
        title={t('lnb.close')}
        onClick={() => setClosed(true)}
      >
        <img
          src={lnbClose}
          alt="close"
          className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </span>
      {/* Minimize */}
      <span
        className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow flex items-center justify-center"
        title={t('lnb.minimize')}
        onClick={() => setMinimized(true)}
      >
        <img
          src={lnbMinimize}
          alt="minimize"
          className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </span>
      {/* Maximize / Restore */}
      <span
        className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#13a10e] shadow flex items-center justify-center"
        title={isMaximized ? t('lnb.restore') : t('lnb.maximize')}
        onClick={() => setMaximized((v) => !v)}
      >
        <img
          src={isMaximized ? lnbRestoreDown : lnbMaximize}
          alt={isMaximized ? 'restore' : 'maximize'}
          className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </span>
    </div>
  )
}
