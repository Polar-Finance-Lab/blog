# Polar Finance Lab

Nextra 기본 블로그 테마로 시작하는 금융 실험실.

- 사이트: https://polar-finance-lab.github.io/blog/
- 기술: Nextra 4, nextra-theme-blog, Next.js, MDX
- 작성 규칙: [writing-tone.md](writing-tone.md)

## 실행

Node.js 22에서 `npm ci`, `npm run dev`를 실행합니다.
GitHub Pages 빌드: `NEXT_PUBLIC_BASE_PATH=/blog npm run build`.
main에 푸시하면 GitHub Actions로 배포합니다.

## 글 추가

`app/posts/<slug>/page.mdx`를 만들고 frontmatter에 title, date, description을 적습니다.
발행일은 실제 발행일로 기록합니다. 홈의 글 목록에 Next.js Link로 링크를 추가합니다.
글 작성 전 `writing-tone.md`를 읽습니다. 로드맵이나 예정 글을 임의로 추가하지 않습니다.

## 대표 이미지

`public/images/polar-finance-lab.webp`: Polar 북극곰이 작은 은행·원장·서버를 연구하는 일러스트.
홈 및 Open Graph/Twitter 공유 이미지로 사용합니다. 생성 도구로 제작했으며 실제 구조도가 아닙니다.

## 의존성

Nextra 4.6.1과 호환되도록 Zod를 4.1.12로 고정했습니다.
