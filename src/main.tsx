import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import './i18n'

// 개발자 콘솔용 이력/소개 메시지 (다크/라이트 테마 대응)
if (typeof window !== 'undefined' && window.console) {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const titleStyle = `font-size:2.2em;font-weight:bold;color:${isDark ? '#60a5fa' : '#2563eb'};padding:8px 0 2px 0;`
  const nameStyle = `font-size:1.3em;font-weight:bold;color:${isDark ? '#38bdf8' : '#0ea5e9'};`
  const infoStyle = `font-size:1em;color:${isDark ? '#cbd5e1' : '#334155'};`
  const linkStyle = `color:${isDark ? '#38bdf8' : '#0ea5e9'};text-decoration:underline;`
  const stackStyle = `color:${isDark ? '#94a3b8' : '#64748b'};font-size:0.95em;`

  console.log('%c👋 Welcome, Developer!', titleStyle)
  console.log('%cDean Huiyong Park (박희용)', nameStyle)
  console.log(
    '%cFrontend Engineer | React, TypeScript, Vite, Zustand, TanStack Query, TailwindCSS',
    stackStyle,
  )
  console.log('%cEmail: %cdean.huiyongPark@gmail.com', infoStyle, linkStyle)
  console.log('%cGitHub: %chttps://github.com/bisu8018', infoStyle, linkStyle)
  console.log(
    '%cPortfolio: %chttps://bisu8018.github.io/dean-huiyongpark.github.io/',
    infoStyle,
    linkStyle,
  )
  console.log('%cBlog: %chttps://velog.io/@bisu8018/posts', infoStyle, linkStyle)
  console.log(
    '%c\nIf you are reading this, feel free to contact me for collaboration, job offers, or just to say hi!\n',
    infoStyle,
  )
}

createRoot(document.getElementById('root')!).render(<App />)
