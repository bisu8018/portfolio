import GlassLayeredBox from '@/features/commons/GlassLayeredBox'
import { useWindowStore } from '@/stores/windowStore'
import { useShowOnMouseBottom } from '@/hooks/useShowOnMouseBottom'
import { AnimatePresence, motion } from 'framer-motion'
import PortfolioIcon from './footerIcons/PortfolioIcon'

/**
 * Footer 컴포넌트
 * 하단 푸터 영역을 담당합니다.
 * @component
 * @returns {JSX.Element} 푸터 영역
 */
export default function Footer() {
  const isMaximized = useWindowStore((s) => s.isMaximized)
  const show = useShowOnMouseBottom(100)

  // 최대화가 아니면 항상 보임, 최대화면 show일 때만 보임
  const shouldShow = !isMaximized || show

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.footer
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="fixed left-1/2 -translate-x-1/2 z-40"
          style={{ bottom: 8, pointerEvents: 'none' }}
        >
          <GlassLayeredBox width={680} height={78}>
            <div className="w-full p-3">
              <PortfolioIcon />
            </div>
          </GlassLayeredBox>
        </motion.footer>
      )}
    </AnimatePresence>
  )
}
