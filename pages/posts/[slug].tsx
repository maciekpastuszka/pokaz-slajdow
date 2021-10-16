import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { css } from '@emotion/react';
import format from 'date-fns/format';
import pl from 'date-fns/locale/pl';
import { CMS_NAME } from '../../lib/constants';
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api';

import Container from '../../components/core/Container';
import Layout from '../../components/layout/Layout';

export default function Post({ post, posts, preview }) {
  const router = useRouter();
  const morePosts = posts?.edges;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const date = post && format(new Date(post.date), 'dd MMMM, yyyy', { locale: pl });

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <div>title</div>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={post.featuredImage?.node?.sourceUrl} />
              </Head>

              <div
                css={css`
                  width: calc(100% + 60px);
                  margin: 0 -30px 20px;
                  height: 60vh;
                  max-height: 800px;
                  background-image: url(${post.featuredImage?.node?.sourceUrl});
                  background-size: cover;
                  background-position: center;
                `}
              />

              <h1
                css={css`
                  font-size: 4rem;
                  margin: 0;
                `}
              >
                {post.title}
              </h1>
              <span
                css={css`
                  display: block;
                  margin-top: 10px;
                  color: #939393;
                `}
              >
                {date}
              </span>
              <div
                className="post-excerpt"
                dangerouslySetInnerHTML={{ __html: post.customFields.postExcerpt }}
              />
              <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

              {/*<PostHeader*/}
              {/*  title={post.title}*/}
              {/*  coverImage={post.featuredImage?.node}*/}
              {/*  date={post.date}*/}
              {/*  author={post.author?.node}*/}
              {/*  categories={post.categories}*/}
              {/*/>*/}
              {/*<PostBody content={post.content} />*/}
              {/*<footer>{post.tags.edges.length > 0 && <Tags tags={post.tags} />}</footer>*/}
            </article>

            {/*{morePosts.length > 0 && <MoreStories posts={morePosts} />}*/}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getPostAndMorePosts(params.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
    fallback: true,
  };
}
