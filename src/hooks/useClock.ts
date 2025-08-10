import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function useClock() {
  const { t } = useTranslation()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const week = t(`date.week.${date.getDay()}`)
    let hour = date.getHours()
    const min = date.getMinutes().toString().padStart(2, '0')
    const isPM = hour >= 12
    const ampm = t(isPM ? 'date.pm' : 'date.am')
    hour = hour % 12

    if (hour === 0) hour = 12
    
    return t('date.format', { month, day, week, ampm, hour, min })
  }
  return { now, formatDate }
}
