import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-blog'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-blog/style.css'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const title = 'Polar Finance Lab · 금융 실험실'
export const metadata = {
  metadataBase: new URL('https://polar-finance-lab.github.io'),
  title: { default: title, template: '%s · Polar Finance Lab' },
  description: '직접 만들고 확인하며 남기는 금융 백엔드 개발 기록.',
  openGraph: { title, description: '직접 만들고 확인하며 남기는 금융 백엔드 개발 기록.', url: `${basePath}/`, type:'website', images: [{url:`${basePath}/images/polar-finance-lab.webp`,width:1536,height:1024,alt:'작은 은행과 서버를 연구하는 북극곰 Polar'}] },
  twitter: {card:'summary_large_image',title,images:[`${basePath}/images/polar-finance-lab.webp`]}
}
export default async function RootLayout({children}) {
 return <html lang="ko" suppressHydrationWarning><Head /><body><Layout><Navbar pageMap={await getPageMap()}><a href="https://github.com/Polar-Finance-Lab">GitHub</a><ThemeSwitch /></Navbar>{children}<Footer>© 2026 Polar</Footer></Layout></body></html>
}
