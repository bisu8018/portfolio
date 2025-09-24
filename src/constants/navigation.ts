import { ROUTE_PATHS } from './routePaths'

type NavigationLabel = string | { id: string; default: string }

type NavigationItem = {
  key: string
  icon: string
  path: string
  label: NavigationLabel
}

type NavigationSection = {
  items: NavigationItem[]
}

type NavigationMap = {
  [group: string]: NavigationSection[]
}

export const navigation: NavigationMap = {
  PORTFOLIO: [
    {
      items: [
        {
          key: 'home',
          icon: '🏠',
          path: ROUTE_PATHS.PORTFOLIO.MAIN_PAGE,
          label: { id: 'lnb.home', default: '홈' },
        },
      ],
    },
    {
      items: [
        {
          key: 'about',
          icon: '👤',
          path: ROUTE_PATHS.PORTFOLIO.ABOUT,
          label: { id: 'lnb.about', default: '소개' },
        },
        {
          key: 'career',
          icon: '💼',
          path: ROUTE_PATHS.PORTFOLIO.CAREER,
          label: { id: 'lnb.career', default: '경력' },
        },
        {
          key: 'contact',
          icon: '✉️',
          path: ROUTE_PATHS.PORTFOLIO.CONTACT,
          label: { id: 'lnb.contact', default: '연락처' },
        },
      ],
    },
  ],
}

export const getTopLevelGroupFromPath = (pathname: string): string | undefined => {
  const firstSegment = pathname.split('/').filter(Boolean)[0]
  if (!firstSegment) return undefined

  const routeRecord = ROUTE_PATHS as Record<string, unknown>
  for (const key of Object.keys(routeRecord)) {
    const val = routeRecord[key]
    if (typeof val === 'string') {
      continue
    }

    const somePath = Object.values(val as Record<string, string | undefined>)[0] as
      | string
      | undefined
    if (!somePath) continue
    const segment = somePath.split('/').filter(Boolean)[0]
    if (segment === firstSegment) return key
  }

  return undefined
}

export const getNavigationForPath = (pathname: string): NavigationSection[] => {
  const group = getTopLevelGroupFromPath(pathname)
  if (!group) return []
  return navigation[group] ?? []
}

export const getBreadcrumbsFromPath = (
  pathname: string,
): Array<{ label: string; i18nKey?: string; fallback?: string; path?: string }> => {
  const group = getTopLevelGroupFromPath(pathname)
  if (!group) return []

  const breadcrumbs: Array<{ label: string; i18nKey?: string; fallback?: string; path?: string }> =
    []

  // 최상위 그룹 추가 (포트폴리오) - i18n 키와 fallback 추가
  const groupI18nKey = `lnb.${group.toLowerCase()}`
  const groupFallback = group.charAt(0).toUpperCase() + group.slice(1)
  breadcrumbs.push({
    label: group,
    i18nKey: groupI18nKey,
    fallback: groupFallback,
  })

  // 현재 경로에 해당하는 항목 찾기
  const sections = navigation[group] ?? []
  for (const section of sections) {
    for (const item of section.items) {
      if (item.path === pathname) {
        // 라벨이 객체인 경우 i18n 정보 사용
        if (typeof item.label === 'object') {
          breadcrumbs.push({
            label: item.label.default,
            i18nKey: item.label.id,
            fallback: item.label.default,
            path: item.path,
          })
        } else {
          breadcrumbs.push({
            label: item.label,
            path: item.path,
          })
        }
        break
      }
    }
  }

  return breadcrumbs
}
