import Head from 'next/head';
import { getAllPostsForHome } from '../lib/api';
import { CMS_NAME } from '../lib/constants';

import { Container } from '@components/core';
import { Hero, Slider } from '@components/layout';

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);
  return (
    <>
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>

      <Slider />
      <Hero />
      {/*{morePosts.length > 0 && <MoreStories posts={morePosts} />}*/}
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
  };
}
