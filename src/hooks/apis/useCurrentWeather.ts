import { useEffect, useState, useRef } from 'react'
import { getCurrentWeather } from '@/apis/weather/getCurrentWeather'
import { WEATHER_LOCATIONS } from '@/constants/weatherLocations'
import type { WeatherCountryCode } from '@/types/weather'
import { CurrentWeather } from '@/models/weather/CurrentWeather'
import { ApiError } from '@/apis/ApiError'

interface UseCurrentWeatherResult {
  data: CurrentWeather | null
  loading: boolean
  error: ApiError | null
  refetch: () => void
}

/**
 * 주어진 국가 코드(WeatherCountryCode)에 대한 현재 날씨 정보를 주기적으로 가져오는 커스텀 훅
 * @param country {WeatherCountryCode} - 조회할 국가 코드(예: 'KR', 'US')
 * @param intervalMs {number} - 갱신 주기(ms), 기본 15분
 * @returns { data, loading, error, refetch } - 날씨 데이터, 로딩/에러 상태, 수동 갱신 함수
 */
export function useCurrentWeather(
  country: WeatherCountryCode,
  intervalMs: number = 15 * 60 * 1000, // 기본 15분
): UseCurrentWeatherResult {
  const [data, setData] = useState<CurrentWeather | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)
  const timer = useRef<NodeJS.Timeout | null>(null)

  const fetchWeather = async () => {
    setLoading(true)
    setError(null)
    try {
      const location = WEATHER_LOCATIONS[country]
      const result = await getCurrentWeather(location)
      setData(result)
    } catch (e) {
      setError(e as ApiError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(fetchWeather, intervalMs)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, intervalMs])

  return { data, loading, error, refetch: fetchWeather }
}
