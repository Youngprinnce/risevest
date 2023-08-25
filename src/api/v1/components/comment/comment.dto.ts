export interface CommentDto {
    id: string;
    postId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCommentDto extends Omit<CommentDto, 'id' | 'createdAt' | 'updatedAt'> {}