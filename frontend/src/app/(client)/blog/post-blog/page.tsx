/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import slugify from "slugify";

import BasicDetailsSection from "@/components/ui/client/blog/post-blog/BasicDetailsSection";
import BlogContentSection from "@/components/ui/client/blog/post-blog/BlogContentSection";
import TagsSection from "@/components/ui/client/blog/post-blog/TagsSection";
import RightSidebarPanel from "@/components/ui/client/blog/post-blog/SidebarPanel";

import { CreateBlogPostSchema } from "@/api/BlogPosts/schema";
import { CreateBlogPostFormData } from "@/api/BlogPosts/type";
import { CircularProgress } from "@mui/material";

import { useBlogCategories } from "@/api/BlogCategory/query";
import { useGetBlogTagsQuery } from "@/api/BlogTags/query";
import { useCreateBlogPostMutation } from "@/api/BlogPosts/query";
import { toast } from "sonner";

type Option = { id: string; name: string };

export default function PostBlogPage() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<CreateBlogPostFormData>({
    resolver: zodResolver(CreateBlogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      coverImageUrl: "",
      authorId: "jsadfkdhlkasd", // TODO: Get from auth context
      categoryId: undefined,
      isPublished: false,
      tagIds: [],
      shortDescription: "",
      requirements: "",
      benefits: "",
    },
  });

  const formData = watch();

  // Auto-generate slug from title
  useEffect(() => {
    const title = watch("title");
    if (title) {
      const generatedSlug = slugify(title, { lower: true, strict: true });
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [watch("title"), setValue]);

  // Debug form
  useEffect(() => {
    console.log("Form Data:", formData);
    console.log("Errors:", errors);
    console.log("Is Valid:", isValid);
  }, [formData, errors, isValid]);

  // ===== fetch categories & tags =====
  const { data: categoriesData, isLoading: categoriesLoading } =
    useBlogCategories();
  const { data: tagsData, isLoading: tagsLoading } = useGetBlogTagsQuery();

  const categories: Option[] = useMemo(
    () => (categoriesData ?? []).map((c) => ({ id: c.id, name: c.name })),
    [categoriesData]
  );
  const suggestedTags: Option[] = useMemo(
    () => (tagsData ?? []).map((t) => ({ id: t.id, name: t.name })),
    [tagsData]
  );

  const { mutateAsync: createBlogPost, isPending } =
    useCreateBlogPostMutation();
  const anyLoading = categoriesLoading || tagsLoading;
  const onSubmit = (draft: boolean) => (data: CreateBlogPostFormData) => {
    const payload = {
      ...data,
      isPublished: draft ? false : data.isPublished,
    };

    createBlogPost(payload);
    toast.success(draft ? "Lưu nháp thành công!" : "Đăng bài viết thành công!");
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Đăng Bài Viết</h1>

        {anyLoading ? (
          <div className="flex justify-center py-16">
            <CircularProgress />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit(false))}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <BasicDetailsSection
                  control={control}
                  errors={errors}
                  categories={categories}
                />

                <BlogContentSection control={control} errors={errors} />

                <TagsSection
                  tags={formData.tagIds || []}
                  onTagsChange={(tags: string[]) =>
                    setValue("tagIds", tags, { shouldValidate: true })
                  }
                  errors={errors}
                  suggestedTags={suggestedTags}
                />
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <RightSidebarPanel
                    form={formData}
                    isValid={isValid}
                    onSaveDraft={handleSubmit(onSubmit(true))}
                    onPublish={handleSubmit(onSubmit(false))}
                    categories={categories}
                    suggestedTags={suggestedTags}
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
