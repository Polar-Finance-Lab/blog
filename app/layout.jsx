import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './style.css'
export const metadata = { title: { default: 'Polar Finance Lab · 금융 실험실', template: '%s · Polar Finance Lab' }, description: '작은 은행부터 시작하는 금융 시스템 실험. 계좌와 원장, 동시성, 은행 간 송금과 장애 복구를 기록합니다.' }
export default async function RootLayout({ children }) {
 return <html lang="ko" dir="ltr" suppressHydrationWarning><Head color={{hue:170,saturation:65}} /><body><Layout pageMap={await getPageMap()} navbar={<Navbar logo={<span className="brand"><span className="brand-mark">P/</span> Polar Finance Lab</span>} />} footer={<Footer><span>© 2026 Polar · 끊임없이 고민하는 엔지니어</span></Footer>} editLink={null} feedback={{content:null}} toc={{title:'이 글에서'}}>{children}</Layout></body></html>
}
