import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";
import { Calendar, Clock, Eye, MessageSquare, User } from "lucide-react";
import type { StaticImageData } from "next/image"; // Add this import if needed

interface PostCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    image: string | StaticImageData;
    tags: string[];
    publishDate: string;
    views?: number;
    comments?: number;
    featured?: boolean;
  };
  variant?: "featured" | "default";
  locale?: string;
  isClient?: boolean;
}

const formatDateLocale = (d: string, locale: string) =>
  new Date(d).toLocaleDateString(locale, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const readMinutes = (text: string) =>
  Math.max(4, Math.min(12, Math.round(text.length / 120)));

const PostCard: React.FC<PostCardProps> = ({
  post,
  variant = "default",
  locale = "en-US",
  isClient = false,
}) => {
  const dateStr = isClient
    ? formatDateLocale(post.publishDate, locale)
    : formatDateLocale(post.publishDate, "en-US");

  const readingTime = readMinutes(post.excerpt);

  return (
    <article className="rounded-xl border bg-white shadow-sm hover:shadow-md transition h-full flex flex-col">
      <div
        className={
          variant === "featured"
            ? "grid grid-cols-1 md:[grid-template-columns:260px_1fr]"
            : "flex flex-col h-full"
        }
      >
        <div
          className={
            variant === "featured"
              ? "relative h-44 md:h-[176px]"
              : "relative h-44 w-full overflow-hidden rounded-t-xl"
          }
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl"
            priority
          />
          <span className="absolute left-3 top-3 text-[11px] font-semibold text-white/90 bg-green-600 px-2 py-1 rounded">
            {post.tags[0] ?? "Tag"}
          </span>
          {variant === "featured" && (
            <span className="absolute right-3 top-3 text-[11px] font-semibold text-white bg-orange-500 px-2 py-0.5 rounded">
              Featured
            </span>
          )}
        </div>

        <div className={variant === "featured" ? "p-4 md:p-5" : "p-5 flex-1 flex flex-col"}>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {dateStr}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.views ?? 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {post.comments ?? 0}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <div className="leading-tight">
                <div className="font-medium">Biên tập viên CVKING</div>
                <div className="text-xs text-gray-500">Huấn luyện viên CVKING</div>
              </div>
            </div>
            <Button
              variant="text"
              color="warning"
              component={Link}
              href={`/blog/read-more?id=${post.id}`}
            >
              Đọc thêm →
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
