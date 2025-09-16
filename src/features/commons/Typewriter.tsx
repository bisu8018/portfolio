import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface TypewriterProps extends React.HTMLProps<HTMLSpanElement> {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pause?: number
}

/**
 * Typewriter effect for text animation
 * @param param0 - Props for the Typewriter component
 * @returns Typewriter component
 */
export default function Typewriter({
  texts,
  typingSpeed = 200,
  deletingSpeed = 60,
  pause = 2200,
  className,
  ...props
}: TypewriterProps) {
  const [index, setIndex] = React.useState(0)
  const [display, setDisplay] = React.useState('')
  const [isDeleting, setIsDeleting] = React.useState(false)
  const { i18n } = useTranslation()

  React.useEffect(() => {
    setIndex(0)
    setDisplay('')
    setIsDeleting(false)
  }, [i18n.language])

  React.useEffect(() => {
    let timeout: number
    const currentText = texts[index]

    if (!isDeleting && display.length < currentText.length) {
      timeout = window.setTimeout(() => {
        setDisplay((current) => current + currentText.charAt(display.length))
      }, typingSpeed)
    } else if (isDeleting && display.length > 0) {
      timeout = window.setTimeout(() => {
        setDisplay((current) => current.slice(0, -1))
      }, deletingSpeed)
    } else {
      if (!isDeleting) {
        timeout = window.setTimeout(() => setIsDeleting(true), pause)
      } else {
        timeout = window.setTimeout(() => {
          setIsDeleting(false)
          setIndex((i) => (i + 1) % texts.length)
        }, 200)
      }
    }

    return () => clearTimeout(timeout)
  }, [display, isDeleting, index, texts, typingSpeed, deletingSpeed, pause])

  const chars = display.split('')
  const isTyping =
    (!isDeleting && display.length < texts[index].length) || (isDeleting && display.length > 0)

  return (
    <span
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`inline-block whitespace-nowrap ${className ?? ''}`}
      {...props}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{
            duration: Math.max(0.04, typingSpeed / 1000),
            delay: i * Math.max(0.01, typingSpeed / 1000),
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}

      <motion.span
        className="ml-1 inline-block w-[1px] h-6 bg-current align-bottom"
        aria-hidden
        animate={isTyping ? { opacity: 1 } : { opacity: [1, 0, 1] }}
        transition={isTyping ? { duration: 0 } : { duration: 1, repeat: Infinity }}
      />
    </span>
  )
}
