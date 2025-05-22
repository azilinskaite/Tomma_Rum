import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCategories, getArtProjectsByYear } from "../../services/api"
import logoLoader from "../../../src/assets/tommarum-logo_TR-BLACK.png"
import Project from "../../components/sharedComponents/project/project"

function getFirstImageFromPostContent(html) {
  if (!html) return null
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")
  const img = doc.querySelector("img")
  return img ? img.src : null
}

const EXCLUDED_CATEGORIES = ["osynlig", "uncategorized", "utbyta", "nordingrå"]

const filterAndSortCategories = (categories) => {
  return categories
    .filter(
      (cat) => !EXCLUDED_CATEGORIES.includes(cat.name.trim().toLowerCase())
    )
    .sort((a, b) => {
      const yearA = Number(a.description)
      const yearB = Number(b.description)
      if (!isNaN(yearA) && !isNaN(yearB)) return yearB - yearA
      if (!isNaN(yearA)) return -1
      if (!isNaN(yearB)) return 1
      return a.name.localeCompare(b.name)
    })
}

function Projects() {
  const [categoryImages, setCategoryImages] = useState({})
  const { year } = useParams()
  const storedCategories = localStorage.getItem("categories")
  const initialCategories = storedCategories ? JSON.parse(storedCategories) : []
  const [categories, setCategories] = useState(initialCategories)
  const [categoriesLoading, setCategoriesLoading] = useState(
    initialCategories.length === 0
  )

  function getFirstImageFromPosts(posts) {
    for (const post of posts) {
      const imageUrl = getFirstImageFromPostContent(post.content?.rendered)
      if (imageUrl) return imageUrl
    }
    return null
  }

  useEffect(() => {
    if (categories.length > 0) return

    setCategoriesLoading(true)
    getCategories()
      .then((data) => {
        const filtered = filterAndSortCategories(data)
        setCategories(filtered)
        localStorage.setItem("categories", JSON.stringify(filtered))
      })
      .catch((error) => console.error("Categories API Error:", error))
      .finally(() => setCategoriesLoading(false))
  }, [])

  useEffect(() => {
    if (categories.length === 0) return

    categories.forEach((category) => {
      const year = category.description
      const cachedImage = localStorage.getItem(`categoryImage_${year}`)
      if (cachedImage) {
        setCategoryImages((prev) => ({
          ...prev,
          [year]: cachedImage,
        }))
      } else {
        getArtProjectsByYear(year, 1, 10)
          .then(({ data }) => {
            const imageUrl = getFirstImageFromPosts(data)
            if (imageUrl) {
              localStorage.setItem(`categoryImage_${year}`, imageUrl)
            }
            setCategoryImages((prev) => ({
              ...prev,
              [year]: imageUrl,
            }))
          })
          .catch(() => {
            setCategoryImages((prev) => ({
              ...prev,
              [year]: null,
            }))
          })
      }
    })
  }, [categories])

  if (categoriesLoading) {
    return (
      <div className="flex flex-wrap align-middle justify-center items-center h-screen">
        <img
          src={logoLoader}
          alt="Loading..."
          className="w-60 h-auto"
          style={{ objectFit: "contain" }}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="mt-24 grid grid-cols-1 p-4 gap-6 md:grid-cols-2 md:p-6 md:gap-6 lg:grid-cols-3 lg:p-10 2xl:mx-16 2xl:mt-16 mb-8 md:mb-16">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`transition-all duration-200 ${
              year === category.description ? "scale-105" : ""
            }`}
          >
            <Project
              title={{ rendered: category.name }}
              date={category.description}
              id={category.id}
              year={category.description}
              imageUrl={categoryImages[category.description]}
              logo={logoLoader}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
