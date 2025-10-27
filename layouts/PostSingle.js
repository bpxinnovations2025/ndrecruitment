
"use client";

import config from "@config/config.json";
import dateFormat from "@lib/utils/dateFormat";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Cta from "./components/Cta";
import ImageFallback from "./components/ImageFallback";
import DisqussEmbed from "./partials/DisqussEmbed";
import Post from "./partials/Post";
import SeoMeta from "./partials/SeoMeta";

const PostSingle = ({ frontmatter, content, recentPosts }) => {
  let { description, title, date, image, author } = frontmatter;
  description = description ? description : content?.slice(0, 120) || "";
  const { disqus } = config;

  console.log("", recentPosts);

  // Calculate reading time
  const readingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <>
      <SeoMeta title={title} description={description} image={image} />
      <section className="section pt-0">
        <div className="container">
          <article>
            <div className="row justify-center">
              <div className="lg:col-10 relative">
                {image && (
                  <Image
                    src={image}
                    height={700}
                    width={1120}
                    fetchPriority="high"
                    alt={title}
                    priority={true}
                    className="fade w-full rounded-lg object-cover"
                  />
                )}
              </div>
              <div className="lg:col-8">
                {markdownify(title, "h1", "h2 mt-6")}
                <div className="mt-6 flex items-center">
                  {author?.avatar && (
                    <div className="overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_2px] shadow-primary w-[50px] h-[50px]">
                      <ImageFallback
                        src={author.avatar}
                        width={50}
                        height={50}
                        alt="author"
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="pl-4">
                    <p className="font-medium text-dark">
                      {author?.name || "Unknown Author"}
                    </p>
                    <p>
                      {dateFormat(date)} - {readingTime(content)} min read
                    </p>
                  </div>
                </div>
                <div className="content mb-16 mt-16 text-left">
                  {content ? (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  ) : (
                    <p>No content available.</p>
                  )}
                </div>
              </div>
              {disqus.enable && (
                <div className="fade row justify-center">
                  <div className="lg:col-8">
                    <DisqussEmbed />
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Recent Posts Section */}
          {recentPosts.length > 0 && (
            <div className="section mt-16">
              <h2 className="section-title text-center">Recent Articles</h2>
              <div className="row justify-center">
                {recentPosts.slice(0, 2).map((post, index) => (
                  <div
                    key={`recent-${post.id}-${index}`}
                    className="animate mt-16 lg:col-5"
                  >
                    <Post post={post} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Cta />
    </>
  );
};

export default PostSingle;
