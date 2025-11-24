export class CreateBlogViewDto {
  BlogPostId: string;
  ViewerUserId?: string;
  SessionId?: string;
}

export class UpdateBlogViewDto {
  id: string;
  BlogPostId?: string;
  ViewerUserId?: string;
  SessionId?: string;
}
