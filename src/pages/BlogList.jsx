import React from 'react'
import { Link } from 'react-router'
import Container from '../components/layout/Container'
import { useSEO } from '../hooks/useSEO'
import { FaCalendarAlt, FaCommentAlt, FaRegClock } from 'react-icons/fa'
import { blogs } from '../data/blogs'

const BlogList = () => {
  useSEO({
    title: 'Blog',
    description:
      'Buying guides, setup tips and everyday tech advice from FunGearBD — helping you get the most out of your gadgets.',
  })

  return (
    <Container className="py-12 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-pop text-2xl sm:text-3xl font-bold mb-3">FunGearBD Blog</h1>
        <p className="font-pop text-gray-500 text-sm">
          Buying guides, setup tips and everyday tech advice to help you shop smarter.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <Link to={`/blog/${blog.id}`} className="block relative overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                loading="lazy"
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-accent text-primary text-[11px] font-pop font-semibold px-3 py-1 rounded-full">
                {blog.category}
              </span>
            </Link>

            <div className="p-5 flex flex-col flex-1">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500 text-xs font-pop mb-3">
                <span className="flex items-center gap-1.5">
                  <FaCalendarAlt size={10} /> {blog.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <FaRegClock size={10} /> {blog.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <FaCommentAlt size={10} /> {blog.comments}
                </span>
              </div>

              <Link to={`/blog/${blog.id}`}>
                <h2 className="font-pop font-semibold text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h2>
              </Link>

              <p className="font-pop text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
                {blog.description}
              </p>

              <Link
                to={`/blog/${blog.id}`}
                className="mt-auto inline-flex items-center gap-1 text-primary text-sm font-pop font-semibold hover:gap-2 transition-all"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Container>
  )
}

export default BlogList
