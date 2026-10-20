'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function PostFilter({ posts }) {
  const [selected, setSelected] = useState('전체')
  const tags = useMemo(() => ['전체', ...new Set(posts.flatMap(post => post.tags))], [posts])
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
        <article key={post.route} style={{marginBottom:28}}>
          <h3 style={{marginBottom:6}}><Link href={post.route}>{post.title}</Link></h3>
          <p style={{fontSize:14, opacity:0.7, margin:'4px 0 8px'}}>{post.date}{post.author && ` · ${post.author}`}</p>
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
