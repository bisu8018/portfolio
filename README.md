# dean-portfolio

> 최신 React, Vite, TypeScript, Zustand, TanStack Query, TailwindCSS, react-i18next, React Router 등 트렌디한 라이브러리 기반의 웹앱 프로젝트입니다.

## 주요 스택
- React 19 + Vite + TypeScript
- Zustand (상태관리)
- TanStack Query (서버 상태관리)
- TailwindCSS (스타일)
- react-i18next (국제화)
- React Router v7
- ESLint, Prettier
- feature 기반 폴더 구조 권장

## 사용법

```bash
pnpm install
pnpm dev
```

## TailwindCSS 적용
- `src/index.css`에 tailwindcss base/components/utilities가 적용되어 있습니다.
- tailwind.config.js, postcss.config.js가 프로젝트 루트에 있습니다.

## 커스텀 명령어
- `pnpm lint` : ESLint 검사
- `pnpm build` : 타입체크 + 빌드
- `pnpm preview` : 빌드 결과 미리보기

---

> 이 프로젝트는 최신 프론트엔드 트렌드를 반영하여, 확장성과 유지보수성을 고려한 구조로 설계되었습니다.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
