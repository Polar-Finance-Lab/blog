import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

const root = path.resolve(import.meta.dirname, '..')
const postsRoot = path.join(root, 'app/posts')
const files = (await readdir(postsRoot, { recursive: true }))
  .filter(file => /(^|\/)page\.mdx?$/.test(file))

// Read the repository's scalar/list frontmatter convention independently of
// the application index, so a missing entry in that index fails the test.
const posts = await Promise.all(files.map(async file => {
  const source = await readFile(path.join(postsRoot, file), 'utf8')
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1]
  assert.ok(frontmatter, `${file}: missing frontmatter`)
  const scalar = key => {
    const value = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim() || ''
    return value.replace(/^["']|["']$/g, '')
  }
  const tagBlock = frontmatter.match(/^tags:\s*\r?\n((?:[ \t]+-[^\n]*(?:\n|$))+)/m)?.[1] || ''
  const tags = [...tagBlock.matchAll(/^[ \t]+-\s*["']?(.+?)["']?\s*$/gm)].map(match => match[1])
  return {
    route: `/posts/${path.dirname(file)}`,
    title: scalar('title'),
    description: scalar('description'),
    date: scalar('date'),
    tags,
  }
}))

const home = await readFile(path.join(root, 'out/index.html'), 'utf8')
const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;')
const hrefs = html => [...html.matchAll(/href="([^"]+)"/g)].map(match =>
  decodeURIComponent(match[1]).replace(/^\/blog(?=\/)/, '').replace(/\/$/, ''))

test('every source post is linked on the homepage with its current metadata', () => {
  assert.ok(posts.length > 0)
  const links = hrefs(home)
  for (const post of posts) {
    assert.ok(links.includes(post.route), `missing homepage link: ${post.route}`)
    assert.ok(home.includes(escapeHtml(post.title)), `missing title: ${post.route}`)
    assert.ok(home.includes(escapeHtml(post.description)), `stale description: ${post.route}`)
  }
})

test('homepage posts are ordered newest first', () => {
  const links = hrefs(home)
  const ordered = posts.toSorted((a, b) => new Date(b.date) - new Date(a.date))
  for (const post of ordered) assert.ok(links.includes(post.route), `missing post: ${post.route}`)
  for (let i = 1; i < ordered.length; i++) {
    if (ordered[i - 1].date !== ordered[i].date) {
      assert.ok(links.indexOf(ordered[i - 1].route) < links.indexOf(ordered[i].route))
    }
  }
})

test('all source tags are available in the homepage filter', () => {
  for (const tag of new Set(posts.flatMap(post => post.tags))) {
    assert.ok(home.includes(escapeHtml(tag)), `missing homepage tag: ${tag}`)
  }
})

test('each generated tag page includes exactly the matching source posts', async () => {
  for (const tag of new Set(posts.flatMap(post => post.tags))) {
    const html = await readFile(path.join(root, 'out/tags', tag, 'index.html'), 'utf8')
    const links = hrefs(html)
    for (const post of posts) {
      assert.equal(links.includes(post.route), post.tags.includes(tag), `${tag}: ${post.route}`)
    }
  }
})
