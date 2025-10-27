// import config from "@config/config.json";
// import GSAPWrapper from "@layouts/components/GSAPWrapper";
// import PostSingle from "@layouts/PostSingle";
// import { getSinglePage } from "@lib/contentParser";
// import { sortByDate } from "@lib/utils/sortFunctions";
// const { blog_folder } = config.settings;

// // post single layout
// const Article = async ({ params }) => {
//   const { single } = params;
//   const posts = await getSinglePage(`content/${blog_folder}`);
//   const post = posts.filter((p) => p.slug == single);
//   const recentPosts = sortByDate(posts).filter((post) => post.slug !== single);
//   const { frontmatter, content } = post[0];

//   return (
//     <GSAPWrapper>
//       <PostSingle
//         frontmatter={frontmatter}
//         content={content}
//         recentPosts={recentPosts}
//       />
//     </GSAPWrapper>
//   );
// };

// // get post single slug
// export async function generateStaticParams() {
//   const allSlug = await getSinglePage(`content/${blog_folder}`);
//   return allSlug.map((item) => ({
//     single: item.slug,
//   }));
// }

// export default Article;


// layouts/PostSingle.jsx
// app/blog/[single]/page.js
"use client";

import { usePost, useRecentPosts } from '@hooks/useBlog';
import config from "@config/config.json";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import PostSingle from "@layouts/PostSingle";
import { useParams } from 'next/navigation';

const { blog_folder } = config.settings;

const Article = () => {
  const params = useParams();
  const { single } = params;
  
  const { data: post, isLoading: postLoading, error: postError } = usePost(single);
  const { data: recentPosts = [], isLoading: recentLoading } = useRecentPosts();

  if (postLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Post not found</h2>
          <p className="text-gray-600 mt-2">The post you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  // Transform API response to match your PostSingle component expectations
  const frontmatter = {
    title: post.title,
    description: post.description,
    date: post.date,
    image: post.image,
    author: post.author
  };

  return (
    <GSAPWrapper>
      <PostSingle
        frontmatter={frontmatter}
        content={post.content}
        recentPosts={recentPosts}
      />
    </GSAPWrapper>
  );
};

export default Article;