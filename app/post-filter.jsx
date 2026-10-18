'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

const posts = [
  {
    slug: 'artex-ollama-first-use',
    title: 'ARTEX 사용법: 첫 작업 만들고 실행 과정과 결과 확인하기',
    date: '2026-10-18',
    description: '더미 주문 응답으로 작업을 만들고, 세션 확인과 추가 질문으로 분석 답변을 받았습니다. 복사해 사용할 입력 예시, 실제 결과 화면, 중지·재개와 보고서 확인 순서를 정리합니다.',
    tags: ['보안 실험', 'AI 도구', '백엔드'],
  },
  {
    slug: 'wonq-security-test-preparation',
    title: '금융권 보안 사고를 보며, 내가 만든 결제 서비스를 다시 점검하기로 했다',
    date: '2026-10-18',
    description: '원큐오더의 인증 경계를 살펴보고 ARTEX와 로컬 LLM을 활용할 범위, 테스트 환경과 증거 수집 기준을 정리했습니다.',
    tags: ['보안 실험', '금융 도메인', '백엔드'],
  },
  {
    slug: 'starting-the-lab',
    title: '작은 은행부터 시작하는 금융 실험실',
    date: '2026-10-11',
    description: '금융을 더 깊이 이해하기 위해 작은 사이드 프로젝트를 시작합니다. 설계와 고민, 직접 실험하고 측정한 결과를 기록하려고 합니다.',
    tags: ['금융 도메인', '백엔드', '시스템 설계'],
  },
]

export default function PostFilter() {
  const [selected, setSelected] = useState('전체')
  const tags = useMemo(() => ['전체', ...new Set(posts.flatMap(post => post.tags))], [])
  const filtered = selected === '전체' ? posts : posts.filter(post => post.tags.includes(selected))

  return (
    <section aria-label="게시글 목록">
      <div role="group" aria-label="태그별 게시글 필터" style={{display:'flex', flexWrap:'wrap', gap:8, margin:'16px 0 24px'}}>
        {tags.map(tag => {
          const active = tag === selected
          const count = tag === '전체' ? posts.length : posts.filter(post => post.tags.includes(tag)).length
          return (
            <button key={tag} type="button" onClick={() => setSelected(tag)} aria-pressed={active}
              style={{cursor:'pointer', borderRadius:999, padding:'6px 12px', border:'1px solid var(--x-color-gray-300, #a3a3a3)', background: active ? 'var(--x-color-primary-600, #374151)' : 'transparent', color: active ? '#fff' : 'inherit', fontSize:14, lineHeight:1.5}}>
              {tag} <span style={{opacity:0.75}}>{count}</span>
            </button>
          )
        })}
      </div>
      <p style={{fontSize:14, opacity:0.7, marginBottom:16}}>{selected === '전체' ? '전체 글' : '#' + selected} · {filtered.length}개</p>
      {filtered.map(post => (
        <article key={post.slug} style={{marginBottom:28}}>
          <h3 style={{marginBottom:6}}><Link href={`/posts/${post.slug}/`}>{post.title}</Link></h3>
          <p style={{fontSize:14, opacity:0.7, margin:'4px 0 8px'}}>{post.date} · Polar</p>
          <p style={{margin:'0 0 10px'}}>{post.description}</p>
          <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
            {post.tags.map(tag => <button key={tag} type="button" onClick={() => setSelected(tag)}
              aria-label={`${tag} 태그로 필터링`} style={{cursor:'pointer', padding:'3px 9px', borderRadius:6, fontSize:12, background:'var(--x-color-gray-100, rgba(128,128,128,0.12))', border:'1px solid rgba(128,128,128,0.25)', color:'inherit'}}>
              #{tag}
            </button>)}
          </div>
        </article>
      ))}
      {filtered.length === 0 && <p>해당 태그의 게시글이 없습니다.</p>}
    </section>
  )
}
