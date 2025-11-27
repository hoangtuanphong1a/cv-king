"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import MSelect from "@mui/material/Select";
import { SearchIcon } from "lucide-react";
import { useGetBlogPostsQuery } from "@/api/BlogPosts/query";

import PostCard from "@/components/ui/client/blog/cards/PostCard";
import MiniPostCard from "@/components/ui/client/blog/cards/MiniPostCard";
import CategoryFilter from "@/components/ui/client/blog/shared/CategoryFilter";
import TagList from "@/components/ui/client/blog/shared/TagList";
import EmptyState from "@/components/ui/client/blog/shared/EmptyState";

import type { SortKey } from "@/types/blog.type";
import type { BlogPost as ApiBlogPost } from "@/api/BlogPosts/type";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [isClient, setIsClient] = useState(false);
  const [locale, setLocale] = useState("en-US");

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      setLocale(navigator.language);
    }
  }, []);

  // Fetch blog posts from API
  const { data: apiBlogPosts = [] } = useGetBlogPostsQuery();

  // Transform API data to match frontend expectations
  const blogArticles = useMemo(() => {
    return apiBlogPosts.map((post: ApiBlogPost) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt || post.shortDescription || "",
      category:
        post.category &&
        typeof post.category === "object" &&
        "name" in post.category
          ? (post.category.name as string)
          : "Uncategorized",
      tags:
        post.tags && Array.isArray(post.tags)
          ? post.tags.map((tag) =>
              typeof tag === "object" && "name" in tag ? tag.name : ""
            )
          : [],
      publishDate: post.publishedAt
        ? new Date(post.publishedAt).toISOString().split("T")[0]
        : new Date(post.createdAt).toISOString().split("T")[0],
      views: 0, // API doesn't return views count in list, we'll need to fetch separately
      comments:
        post.comments && Array.isArray(post.comments)
          ? post.comments.length
          : 0,
      featured: post.isPublished && Math.random() > 0.7, // Temporary logic for featured
      image:
        post.coverImageUrl ||
        "https://via.placeholder.com/600x400?text=No+Image",
    }));
  }, [apiBlogPosts]);

  const categories = useMemo(() => {
    const categorySet = new Set(blogArticles.map((a) => a.category));
    return ["all", ...Array.from(categorySet)];
  }, [blogArticles]);

  const popularTags = useMemo(() => {
    const counts = new Map<string, number>();
    blogArticles.forEach((a) =>
      (a.tags ?? []).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1))
    );
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([t]) => t);
  }, [blogArticles]);

  const popularPosts = useMemo(
    () =>
      [...blogArticles]
        .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
        .slice(0, 4),
    [blogArticles]
  );
  const latestPosts = useMemo(
    () =>
      [...blogArticles]
        .sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate))
        .slice(0, 5),
    [blogArticles]
  );

  const filteredArticles = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return [...blogArticles]
      .filter((a) => {
        const matchesSearch =
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          (a.tags ?? []).some((t) => t.toLowerCase().includes(q));
        const matchesCategory =
          selectedCategory === "all" || a.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "popular":
            return (b.views ?? 0) - (a.views ?? 0);
          case "comments":
            return (b.comments ?? 0) - (a.comments ?? 0);
          case "oldest":
            return +new Date(a.publishDate) - +new Date(b.publishDate);
          default:
            return +new Date(b.publishDate) - +new Date(a.publishDate);
        }
      });
  }, [searchTerm, selectedCategory, sortBy, blogArticles]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-4xl font-semibold text-gray-900 mb-3">
            Hiểu biết & Mẹo nghề nghiệp
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Lời khuyên từ các chuyên gia, thông tin ngành và mẹo thực tiễn để
            thúc đẩy sự nghiệp của bạn
          </p>
        </div>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            border: 1,
            borderColor: "divider",
            p: { xs: 2.5, md: 3 },
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 auto" }, minWidth: 0 }}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon size={20} color="#9ca3af" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: 2 },
                  "& .MuiInputLabel-root": {
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                }}
              />
            </Box>
            <Box
              sx={{ flex: { xs: "1 1 100%", md: "0 0 auto" }, minWidth: 224 }}
            >
              <FormControl fullWidth>
                <InputLabel id="sort-label">Sort by</InputLabel>
                <MSelect
                  labelId="sort-label"
                  label="Sort by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  MenuProps={{
                    disableScrollLock: true,
                    keepMounted: true,
                    PaperProps: { sx: { minWidth: 224 } },
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="newest">Mới nhất đầu tiên</MenuItem>
                  <MenuItem value="popular">Phổ biến nhất</MenuItem>
                  <MenuItem value="comments">Bình luận nhiều nhất</MenuItem>
                  <MenuItem value="oldest">Cũ nhất đầu tiên</MenuItem>
                </MSelect>
              </FormControl>
            </Box>
          </Box>
        </Paper>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {selectedCategory === "all"
                  ? "Tất cả các bài viết"
                  : selectedCategory}
              </h2>
              <p className="text-gray-600">
                {filteredArticles.length} bài viết được tìm thấy
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Tất cả bài viết
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                  {filteredArticles.slice(0, 12).map((a) => (
                    <div key={a.id} className="h-full">
                      <PostCard
                        post={a}
                        variant="default"
                        locale={locale}
                        isClient={isClient}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {filteredArticles.length === 0 && (
              <EmptyState
                title="No articles found"
                description="Try adjusting your search terms or browsing different thể loại."
                onReset={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSortBy("newest");
                }}
              />
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <TagList tags={popularTags} />

            <div className="bg-white rounded-xl border shadow-sm p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Bài viết phổ biến
              </h4>
              <div className="space-y-3">
                {popularPosts.map((p) => (
                  <MiniPostCard
                    key={p.id}
                    post={p}
                    locale={locale}
                    isClient={isClient}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Bài viết mới nhất
              </h4>
              <div className="space-y-3">
                {latestPosts.map((p) => (
                  <MiniPostCard
                    key={p.id}
                    post={p}
                    locale={locale}
                    isClient={isClient}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
