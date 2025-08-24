import React from 'react'
import { useCurrentWeather } from '@/hooks/apis/useCurrentWeather'
import { useTranslation } from 'react-i18next'

// 날씨 코드별 배경색 매핑 (예시)
// 시간대(주간/야간) + 날씨별 배경색 매핑
const weatherBgMap: Record<'day' | 'night', Record<string, string>> = {
  day: {
    clear: 'bg-gradient-to-b from-[#4fc3f7] to-[#1976d2]', // 맑은 낮
    cloudy: 'bg-gradient-to-b from-[#90a4ae] to-[#607d8b]', // 흐린 낮
    rain: 'bg-gradient-to-b from-[#78909c] to-[#455a64]', // 비오는 낮
    snow: 'bg-gradient-to-b from-[#e3f2fd] to-[#90caf9]', // 눈오는 낮
    etc: 'bg-gradient-to-b from-[#b0bec5] to-[#78909c]', // 기타 낮
  },
  night: {
    clear: 'bg-gradient-to-b from-[#23243a] to-[#1e2235]', // 맑은 밤
    cloudy: 'bg-gradient-to-b from-[#4e536b] to-[#23243a]', // 흐린 밤
    rain: 'bg-gradient-to-b from-[#3a4a5d] to-[#23243a]', // 비오는 밤
    snow: 'bg-gradient-to-b from-[#b3c6e4] to-[#6e7fa3]', // 눈오는 밤
    etc: 'bg-gradient-to-b from-[#23243a] to-[#23243a]', // 기타 밤
  },
}

// 날씨 코드 → 상태 텍스트/아이콘/배경색 매핑 함수 (Open-Meteo 기준)
function getWeatherInfo(weathercode: number, isDay: number, t: (k: string) => string) {
  const timeKey = isDay === 1 ? 'day' : 'night'
  if ([0, 1].includes(weathercode))
    return {
      label: t('weather.clear'),
      bg: weatherBgMap[timeKey].clear,
      icon: isDay === 1 ? '☀️' : '🌙',
    }
  if ([2, 3, 45, 48].includes(weathercode))
    return { label: t('weather.cloudy'), bg: weatherBgMap[timeKey].cloudy, icon: '☁️' }
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weathercode))
    return { label: t('weather.rain'), bg: weatherBgMap[timeKey].rain, icon: '🌧️' }
  if ([71, 73, 75, 77, 85, 86].includes(weathercode))
    return { label: t('weather.snow'), bg: weatherBgMap[timeKey].snow, icon: '❄️' }
  return { label: t('weather.unknown'), bg: weatherBgMap[timeKey].etc, icon: '❔' }
}

interface RnbWeatherWidgetProps {
  countryCode?: string // ISO 2자리 (예: 'kr', 'us', 'jp')
  cityKeyMap?: Record<string, string> // 언어코드별 도시 i18n 키 매핑
}

const defaultCityKeyMap: Record<string, string> = {
  ko: 'weather.seoul',
  en: 'weather.newyork',
  // 예시: 'ja': 'weather.tokyo', 'fr': 'weather.paris' 등 추가 가능
}

const RnbWeatherWidget: React.FC<RnbWeatherWidgetProps> = ({
  countryCode = 'kr',
  cityKeyMap = defaultCityKeyMap,
}) => {
  // countryCode를 WeatherCountryCode('KR' | 'US')로 변환 (기본값 'KR')
  const weatherCountry: 'KR' | 'US' = countryCode?.toUpperCase?.() === 'US' ? 'US' : 'KR'
  const { data: weather, loading } = useCurrentWeather(weatherCountry)
  const { t, i18n } = useTranslation()

  if (loading || !weather) {
    return (
      <div className="w-[170px] h-[170px] rounded-2xl flex items-center justify-center text-neutral-800 bg-[rgba(120,120,130,0.18)] backdrop-blur-md shadow">
        <span>{t('weather.loading')}</span>
      </div>
    )
  }

  const { label, bg, icon } = getWeatherInfo(weather.weathercode, weather.is_day, t)

  // 언어코드 추출 (ko, en 등)
  const lang = i18n.language.split('-')[0]
  const mergedCityKeyMap = cityKeyMap

  // countryCode가 있으면 우선적으로 해당 국가 도시명(i18n 키) 사용, 없으면 언어코드 기준
  const countryCityKeyMap: Record<string, string> = {
    kr: 'weather.seoul',
    us: 'weather.newyork',
    // 예시: jp: 'weather.tokyo', fr: 'weather.paris' 등 추가 가능
  }
  const cityKey =
    countryCode && countryCityKeyMap[countryCode]
      ? countryCityKeyMap[countryCode]
      : mergedCityKeyMap[lang] || defaultCityKeyMap['ko']

  // 도시별 대표 날씨 사이트 URL 매핑
  const cityWeatherUrlMap: Record<string, string> = {
    'weather.seoul': 'https://www.weather.go.kr/w/weather/forecast/short-term.do?stnCd=108', // 기상청 서울
    'weather.newyork': 'https://weather.com/weather/today/l/USNY0996:1:US', // weather.com 뉴욕
    // 필요시 추가 도시
  }
  const handleWidgetClick = () => {
    const url = cityWeatherUrlMap[cityKey]
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className={`w-[170px] h-[170px] rounded-2xl p-4 flex flex-col cursor-pointer justify-between text-white shadow-xl ${bg}`}
      style={{ fontFamily: 'SF Pro Display, sans-serif' }}
      onClick={handleWidgetClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleWidgetClick()
      }}
      title={t(cityKey) + ' ' + label}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">{t(cityKey)}</span>
        <span className="text-5xl font-semibold leading-tight">
          {Math.round(weather.temperature)}°
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-lg">{icon}</span>
        <span className="text-xs">{label}</span>
        {/* 최고/최저 온도는 weatherStore에 추가 필요 */}
        {/* <span className="text-xs">{t('weather.high')}:34° {t('weather.low')}:26°</span> */}
      </div>
    </div>
  )
}

export default RnbWeatherWidget
