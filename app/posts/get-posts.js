import { normalizePages } from 'nextra/normalize-pages'
import { getPageMap } from 'nextra/page-map'

export async function getPosts() {
  const { directories } = normalizePages({
    list: await getPageMap('/posts'),
    route: '/posts'
  })
  return directories
    .filter(post => post.name !== 'index' && post.frontMatter)
    .sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date))
}

export async function getTags() {
  const posts = await getPosts()
  return [...new Set(posts.flatMap(post => post.frontMatter.tags || []))]
}
