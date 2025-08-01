import lnbClose from '@/assets/lnb-close.svg'
import lnbMinimize from '@/assets/lnb-minimize.svg'
import lnbMaximize from '@/assets/lnb-maximize.svg'
import { useLnbStore } from '@/stores/lnbStore'

export default function LnbButtons() {
  const setClosed = useLnbStore((s) => s.setClosed)
  const setMinimized = useLnbStore((s) => s.setMinimized)
  const setMaximized = useLnbStore((s) => s.setMaximized)

  return (
    <div className="absolute left-6 top-6 flex gap-2 group">
      {/* Close */}
      <span
        className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow flex items-center justify-center cursor-pointer"
        title="Close"
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
        className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow flex items-center justify-center cursor-pointer"
        title="Minimize"
        onClick={() => setMinimized(true)}
      >
        <img
          src={lnbMinimize}
          alt="minimize"
          className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </span>
      {/* Maximize */}
      <span
        className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#13a10e] shadow flex items-center justify-center cursor-pointer"
        title="Maximize"
        onClick={() => setMaximized((v) => !v)}
      >
        <img
          src={lnbMaximize}
          alt="maximize"
          className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </span>
    </div>
  )
}
