import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getArtProjectsByYear, getStickyPostByYear } from "../../services/api"
import BlogPost from "./BlogPost"
import he from "he"

function extractParagraphText(html) {
  if (!html) return []
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const paragraphs = doc.querySelectorAll("p")
  return Array.from(paragraphs)
    .map((p) => p.textContent.trim())
    .filter(Boolean)
    .filter((text) => {
      if (
        text.startsWith("#gallery") ||
        text.startsWith(".") ||
        text.includes("{") ||
        text.includes("}") ||
        text.includes("gallery_shortcode") ||
        text.match(/^[\s\S]*\{[\s\S]*\}[\s\S]*$/)
      ) {
        return false
      }
      return true
    })
}

const extractAllImages = (html) => {
  if (!html) return []
  const imgRegex = /<img[^>]+src="([^">]+)"/g
  const matches = [...html.matchAll(imgRegex)]
  return matches.map((match) => match[1])
}

function SingleProject() {
  const { year } = useParams()
  const [stickyPost, setStickyPost] = useState(null)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    let fetchedStickyPost = null

    getStickyPostByYear(year)
      .then((sticky) => {
        setStickyPost(sticky)
        fetchedStickyPost = sticky
        return getArtProjectsByYear(year)
      })
      .then(({ data }) => {
        const filtered = fetchedStickyPost
          ? data.filter((post) => post.id !== fetchedStickyPost.id)
          : data
        setPosts(filtered)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("API Error:", error)
        setIsLoading(false)
      })
  }, [year])

  return (
    <section className="p-4 mt-12 md:p-16 min-h-[70vh]">
      {isLoading ? (
        <div>
          <div className="h-20 w-2xl bg-gray-200 animate-pulse mb-8 rounded"></div>
          <div className="h-60 w-2xl bg-gray-200 animate-pulse mb-8 rounded"></div>
        </div>
      ) : posts.length === 0 ? (
        <div>No posts found for {year}.</div>
      ) : (
        <>
          <h2 className="text-7xl mb-6">{year}</h2>
          {stickyPost && (
            <div className="sticky-post-container mb-12">
              <BlogPost
                key={stickyPost.id}
                date={stickyPost.date}
                title={he.decode(stickyPost.title?.rendered)}
                paragraphs={extractParagraphText(stickyPost.content?.rendered)}
                imageUrls={extractAllImages(stickyPost.content?.rendered)}
              />
            </div>
          )}
          {posts.map((post) => (
            <BlogPost
              key={post.id}
              date={post.date}
              title={he.decode(post.title?.rendered)}
              paragraphs={extractParagraphText(post.content?.rendered)}
              imageUrls={extractAllImages(post.content?.rendered)}
            />
          ))}
        </>
      )}
    </section>
  )
}

export default SingleProject
