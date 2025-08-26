/**
 * WindowLnbFooter 컴포넌트
 * 내비게이션 바의 하단 푸터 영역을 렌더링합니다.
 * @component
 * @returns {JSX.Element} 푸터 영역
 */
import { useTranslation } from 'react-i18next'

export default function WindowLnbFooter() {
  const { t } = useTranslation()
  return (
    <footer className="w-full text-xs text-center mt-auto text-gray-800">
      {t('footer.copyright', 'Copyright © 2025 Huiyong Park Inc. 모든 권리 보유.')}
    </footer>
  )
}
