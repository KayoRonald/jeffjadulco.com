import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Layout from "./layout"
import SEO from "./seo"
import { BlogTitle, BlogTitleInfo, ExtLink } from "./atoms"
import Newsletter from "./newsletter"
import TOC from "./toc"

const shortcodes = {
  ExtLink,
  Link,
}

const PostLayout = ({ data: { mdx } }) => {
  return (
    <Layout>
      <SEO blog title={mdx.frontmatter.title} description={mdx.excerpt} />
      <div className="flex justify-between mt-12 mb-12">
        <article className="prose prose-sm sm:prose md:prose-lg min-w-0 max-w-none col-span-3">
          <div className="">
            <BlogTitleInfo
              date={mdx.frontmatter.date}
              datetime={mdx.frontmatter.datetime}
              timeToRead={mdx.timeToRead}
            />
            <BlogTitle>{mdx.frontmatter.title}</BlogTitle>
          </div>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </article>
        {mdx.tableOfContents && (
          <aside className="sticky top-0 hidden lg:block max-w-xs ml-6 bg-secondary">
            <TOC items={mdx.tableOfContents.items} />
          </aside>
        )}
      </div>
      <Newsletter />
    </Layout>
  )
}

export const pageQuery = graphql`
  query blogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM Do YYYY")
        datetime: date
        description
      }
      excerpt(pruneLength: 140)
      tableOfContents
      timeToRead
    }
  }
`

export default PostLayout
