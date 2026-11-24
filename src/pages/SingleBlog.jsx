import React from 'react'
import { Link, useParams, Navigate } from 'react-router'
import Container from '../components/layout/Container'
import { useSEO } from '../hooks/useSEO'
import { FaCalendarAlt, FaCommentAlt, FaUser, FaRegClock, FaArrowLeft, FaWhatsapp } from 'react-icons/fa'
import { getBlogById, blogs } from '../data/blogs'
import { whatsappLink } from '../config/site'

const SingleBlog = () => {
  const { id } = useParams()
  const blog = getBlogById(id)

  useSEO({
    title: blog ? blog.title : 'Blog',
    description: blog?.description,
    image: blog?.image,
  })

  if (!blog) return <Navigate to="/blog" replace />

  const paragraphs = blog.content.split('\n\n')
  const others = blogs.filter((b) => b.id !== blog.id).slice(0, 3)

  return (
    <Container className="py-10 sm:py-14">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-pop font-medium text-gray-500 hover:text-primary transition-colors mb-6"
        >
          <FaArrowLeft size={11} /> Back to Blog
        </Link>

        <span className="inline-block bg-accent text-primary text-[11px] font-pop font-semibold px-3 py-1 rounded-full mb-4">
          {blog.category}
        </span>

        <h1 className="font-pop text-2xl sm:text-3xl font-bold leading-snug mb-5">{blog.title}</h1>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-gray-500 text-sm font-pop mb-6">
          <span className="flex items-center gap-2">
            <FaUser size={12} /> {blog.author}
          </span>
          <span className="flex items-center gap-2">
            <FaCalendarAlt size={12} /> {blog.date}
          </span>
          <span className="flex items-center gap-2">
            <FaRegClock size={12} /> {blog.readTime}
          </span>
          <span className="flex items-center gap-2">
            <FaCommentAlt size={12} /> {blog.comments}
          </span>
        </div>

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-8"
        />

        <article className="space-y-5">
          {paragraphs.map((para, i) => (
            <p key={i} className="font-pop text-gray-600 leading-relaxed">
              {para}
            </p>
          ))}
        </article>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 bg-gry rounded-2xl p-6">
          <p className="font-pop text-sm text-gray-600">
            Have a question about this guide? Our team is happy to help.
          </p>
          <a
            href={whatsappLink(`Hi FunGearBD, I have a question about "${blog.title}"`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-pop text-sm font-semibold rounded-full px-6 py-3 hover:brightness-95 transition"
          >
            <FaWhatsapp size={15} /> Ask on WhatsApp
          </a>
        </div>
      </div>

      {others.length > 0 && (
        <div className="mt-16">
          <h2 className="font-pop text-xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4">
                  <h3 className="font-pop font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Container>
  )
}

export default SingleBlog
