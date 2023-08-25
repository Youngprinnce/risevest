export interface PostDto {
    id: string;
    userId: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatePostDto extends Omit<PostDto, 'id' | 'createdAt' | 'updatedAt'> {}