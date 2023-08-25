import { client } from "../../../../db/conn";
import { CommentDto, CreateCommentDto } from "./comment.dto";

export = {
  async addComment(createCommentDto: CreateCommentDto): Promise<CommentDto> {
    const {postId, userId, content} = createCommentDto;
    try {
      const sql = `INSERT INTO comments (postId, userId, content) VALUES ($1, $2, $3) RETURNING *`;
      const values = [postId, userId, content];
      const { rows } = await client.query(sql, values);
      return rows[0];
    } catch (error: any) {
      console.error('Error adding comment:', error?.message);
      throw new Error(error?.message);
    }
  },
}
