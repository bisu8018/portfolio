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
