const BASE_URL = "https://tommarum.se/wp-json/wp/v2"

export async function getArtProjects({ page, pageSize }) {
  try {
    const res = await fetch(
      `${BASE_URL}/posts?page=${page}&per_page=${pageSize}`
    )

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }

    const data = await res.json()
    return { data }
  } catch (error) {
    console.error("Fetch Error:", error.message || error)
    throw error
  }
}

export async function getCategories() {
  let allCategories = []
  let page = 1
  let totalPages = 1

  do {
    const res = await fetch(`${BASE_URL}/categories?per_page=100&page=${page}`)
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }
    const data = await res.json()

    allCategories = allCategories.concat(data)
    page++
  } while (page <= totalPages)

  return allCategories
}

export async function getArtProjectsByYear(year) {
  let url = `${BASE_URL}/posts?after=${year}-01-01T00:00:00&before=${year}-12-31T23:59:59&per_page=100`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`)
  }
  const data = await res.json()
  return { data }
}

export async function getLatestNewsPosts(perPage = 3) {
  try {
    const res = await fetch(
      `${BASE_URL}/posts?per_page=${perPage}&_embed=wp:featuredmedia`
    )
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
    return await res.json()
  } catch (error) {
    console.error("Posts Fetch Error:", error)
    throw error
  }
}

export async function getLatestStickyPost() {
  const response = await fetch(
    `${BASE_URL}/posts?sticky=true&per_page=1&_embed`
  )
  if (!response.ok) throw new Error("Failed to fetch sticky post")
  const posts = await response.json()
  return posts[0] || null
}

export async function getStickyPostByYear(year) {
  const response = await fetch(
    `${BASE_URL}/posts?sticky=true&after=${year}-01-01T00:00:00&before=${year}-12-31T23:59:59&_embed`
  )
  if (!response.ok) throw new Error("Failed to fetch sticky post")
  const posts = await response.json()
  return posts.length > 0 ? posts[0] : null
}
