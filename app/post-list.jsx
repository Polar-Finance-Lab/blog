import PostFilter from './post-filter'
import { getPosts } from './posts/get-posts'

export default async function PostList() {
  const posts = (await getPosts()).map(({ route, frontMatter }) => ({
    route,
    title: frontMatter.title,
    date: frontMatter.date,
    author: frontMatter.author || '',
    description: frontMatter.description || '',
    tags: frontMatter.tags || [],
  }))

  return <PostFilter posts={posts} />
}
