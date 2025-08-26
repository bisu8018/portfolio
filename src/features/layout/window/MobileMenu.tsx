import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '@/constants/routePaths'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <>
      <button
        aria-label={open ? t('menu.close', '메뉴 닫기') : t('menu.open', '메뉴 열기')}
        className="z-50 fixed top-3 right-3 w-9 h-9 flex items-center justify-center"
        onClick={() => setOpen((v) => !v)}
        style={{ transition: 'background 0.2s' }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={open ? '3.5 15, 15 3.5' : '2 12, 16 12'}
            animate={{
              points: open ? '3.5 15, 15 3.5' : '2 12, 16 12',
            }}
            transition={{ duration: 0.24, ease: [0.42, 0, 0.58, 1] }}
          />
          <motion.polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={open ? '3.5 3.5, 15 15' : '2 5, 16 5'}
            animate={{
              points: open ? '3.5 3.5, 15 15' : '2 5, 16 5',
            }}
            transition={{ duration: 0.24, ease: [0.42, 0, 0.58, 1] }}
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-white"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <nav className="flex flex-col gap-6 text-3xl font-bold text-gray-800 pt-16 pl-12 items-start">
              <button
                className="bg-transparent p-0 m-0 border-0 text-inherit text-left cursor-pointer"
                onClick={() => {
                  setOpen(false)
                  navigate(ROUTE_PATHS.PORTFOLIO.MAIN_PAGE)
                }}
              >
                {t('lnb.home', '홈')}
              </button>
              <button
                className="bg-transparent p-0 m-0 border-0 text-inherit text-left cursor-pointer"
                onClick={() => {
                  setOpen(false)
                  navigate(ROUTE_PATHS.PORTFOLIO.ABOUT)
                }}
              >
                {t('lnb.about', '소개')}
              </button>
              <button
                className="bg-transparent p-0 m-0 border-0 text-inherit text-left cursor-pointer"
                onClick={() => {
                  setOpen(false)
                  navigate(ROUTE_PATHS.PORTFOLIO.CAREER)
                }}
              >
                {t('lnb.career', '경력')}
              </button>
              <button
                className="bg-transparent p-0 m-0 border-0 text-inherit text-left cursor-pointer"
                onClick={() => {
                  setOpen(false)
                  navigate(ROUTE_PATHS.PORTFOLIO.CONTACT)
                }}
              >
                {t('lnb.contact', '연락처')}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
