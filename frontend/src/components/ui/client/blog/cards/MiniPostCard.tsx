import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image"; 

interface MiniPostCardProps {
  post: {
    id: string;
    title: string;
    image: string | StaticImageData;
    publishDate: string;
  };
  locale?: string;
  isClient?: boolean;
  href?: string;
}

const formatDateLocale = (d: string, locale: string) =>
  new Date(d).toLocaleDateString(locale, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const MiniPostCard: React.FC<MiniPostCardProps> = ({
  post,
  locale = "en-US",
  isClient = false,
  href,
}) => {
  const formattedDate = isClient
    ? formatDateLocale(post.publishDate, locale)
    : formatDateLocale(post.publishDate, "en-US");

  const link = href ?? `/blog/read-more?id=${post.id}`;

  return (
    <Link href={link} className="flex gap-3 group">
      <div className="h-12 w-16 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={post.image}
          alt={post.title}
          width={96}
          height={72}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 group-hover:text-orange-600 line-clamp-2">
          {post.title}
        </p>
        <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
      </div>
    </Link>
  );
};

export default MiniPostCard;
