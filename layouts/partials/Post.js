
"use client";

import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import Link from "next/link";

const Post = ({ post }) => {
  const { summary_length, blog_folder } = config.settings;

  // Handle both static and API post structures
  const frontmatter = post.frontmatter || post;
  const content = post.content || "";
  const slug = post.slug;
  const image = post.image;
  const title = frontmatter.title;
  const author = frontmatter.author;
  const date = frontmatter.date;
  const readingTime = post.reading_time;
  const description = post.description || frontmatter.description || "";
  const avatar = post.author?.avatar;

  console.log("Post Component:", post);
  // Calculate reading time if not provided
  const getReadingTime = () => {
    if (readingTime) return `${readingTime} min read`;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  return (
    <div className="overflow-hidden rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,.05)]">
      {image && (
        <Link href={`/${blog_folder}/${slug}`}>
          <div className="aspect-[16/9] w-full overflow-hidden">
            {/* Use aspect ratio */}
            <ImageFallback
              className="w-full h-full object-cover"
              src={image}
              alt={title}
              width={570}
              height={320}
            />
          </div>
        </Link>
      )}
      <div className="p-8">
        <h2 className="h4 mb-4">
          <Link
            href={`/${blog_folder}/${slug}`}
            className="block hover:text-primary hover:underline line-clamp-2"
          >
            {title}
          </Link>
        </h2>
        <p className="mt-2 text-gray-600 line-clamp-3">{description}...</p>
        <div className="mt-6 flex items-center">
          {author?.avatar && (
            <div className="overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_2px] shadow-primary w-[50px] h-[50px]">
              <ImageFallback
                src={avatar}
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
            <p className="text-sm text-gray-500">
              {dateFormat(date)} - {getReadingTime()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
