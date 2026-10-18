import Link from 'next/link'
import { PostCard } from 'nextra-theme-blog'
import { getPosts, getTags } from '../../posts/get-posts'

export async function generateStaticParams() {
  const tags = await getTags()
  return tags.map(tag => ({ tag }))
}

export async function generateMetadata({ params }) {
  const { tag } = await params
  return { title: `#${decodeURIComponent(tag)} 글 모아보기` }
}

export default async function TagPage({ params }) {
  const { tag } = await params
  const selected = decodeURIComponent(tag)
  const posts = (await getPosts()).filter(post => (post.frontMatter.tags || []).includes(selected))

  return (
    <section>
      <p><Link href="/">← 전체 게시글</Link></p>
      <h1>#{selected}</h1>
      <p>{posts.length}개의 게시글</p>
      {posts.map(post => <PostCard key={post.route} post={post} />)}
    </section>
  )
}
