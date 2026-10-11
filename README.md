# Polar Finance Lab · 금융 실험실

Nextra 4 + Next.js 기반 한국어 금융 시스템 실험 블로그.

## 로컬 실행

Node.js 22에서 `npm ci`, `npm run dev`를 실행하세요.
정적 배포 파일은 `npm run build`로 `out/`에 생성됩니다. 검색 인덱스도 생성됩니다.

## GitHub Pages 배포

저장소: https://github.com/Polar-Finance-Lab/blog

1. 저장소 Settings → Pages → Source를 GitHub Actions로 선택합니다.
2. main에 푸시하면 Deploy Nextra to GitHub Pages가 자동 실행됩니다.
3. 배포 주소: https://polar-finance-lab.github.io/blog/

일반 프로젝트 저장소에도 배포 가능합니다. 워크플로에서 basePath를 자동 설정합니다.

## 글 작성

`app/posts/<slug>/page.mdx`를 만들고 frontmatter와 본문을 작성합니다.
`app/posts/_meta.js`와 `app/posts/page.mdx`에 글을 추가합니다.
홈의 최근 글은 `app/page.mdx`에서 수정합니다.

실험을 수행하지 않은 초안은 결과처럼 게시하지 않습니다. 현재 첫 글은 프로젝트 소개와 계획입니다.

## 의존성 메모

Nextra 4.6.1 테마 설정 검증과의 호환성을 위해 Zod를 overrides에서 4.1.12로 고정했습니다. 업그레이드 시 정적 빌드를 다시 확인하세요.
