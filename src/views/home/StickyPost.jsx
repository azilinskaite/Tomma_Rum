import React, { useEffect, useState } from "react"
import { getLatestStickyPost } from "../../services/api"

function extractParagraphText(html) {
  if (!html) return []
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const paragraphs = doc.querySelectorAll("p")
  return Array.from(paragraphs)
    .map((p) => p.textContent.trim())
    .filter(Boolean)
}

function extractFirstImage(html) {
  if (!html) return null
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const img = doc.querySelector("img")
  return img?.getAttribute("src") || null
}

function getFeaturedImage(post) {
  return (
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    extractFirstImage(post?.content?.rendered)
  )
}

export default function StickyPost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const formatDate = (date) => date?.slice(0, 4) || ""

  useEffect(() => {
    getLatestStickyPost()
      .then((data) => setPost(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>
  if (!post) return <div>No post found</div>

  const paragraphs = extractParagraphText(post.content?.rendered)
  const imageUrl = getFeaturedImage(post)

  return (
    <div className="flex flex-col justify-start space-y-8 w-full md:w-1/2 text-black">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold">
          {post.title?.rendered}
          <span className="py-2 ml-2">{formatDate(post.date)}</span>
        </h2>
        <p className="leading-relaxed max-w-60ch">
          {paragraphs.map((text, idx) => (
            <span className={`block${idx > 0 ? " mt-4" : ""}`} key={idx}>
              {text}
            </span>
          ))}
        </p>
      </div>
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt={post.title?.rendered}
            className="w-[70%] object-cover"
          />
        </div>
      )}
    </div>
  )
}
