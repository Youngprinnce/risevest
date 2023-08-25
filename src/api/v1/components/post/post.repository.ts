import { client } from "../../../../db/conn";
import { CreatePostDto, PostDto } from "./post.dto";

export = {
  async createPost(createPostDto: CreatePostDto): Promise<PostDto> {
    let {userId, title, content} = createPostDto;
    try {
      const sql = `INSERT INTO posts (userId, title, content) VALUES ($1, $2, $3) RETURNING *`;
      const values = [userId, title, content];
      const { rows } = await client.query(sql, values);
      return rows[0];
    } catch (error: any) {
      console.error('Error creating post:', error.message);
      throw new Error(error?.message);
    }
  },

  async getPostsByUserId({userId}: {userId: string}): Promise<PostDto[]> {
    try {
      const sql = `SELECT * FROM posts WHERE userId = $1`;
      const values = [userId];
      const { rows } = await client.query(sql, values);
      return rows;
    } catch (error: any) {
      console.error('Error retrieving posts:', error?.message);
      throw new Error(error?.message);
    }
  },

  async getPostById({ postId }: { postId: string }): Promise<PostDto> {
    try {
      const sql = `SELECT * FROM posts WHERE id = $1`;
      const values = [postId];
      const { rows } = await client.query(sql, values);
      return rows[0];
    } catch (error: any) {
      console.error('Error getting user:', error?.message);
      throw new Error(error?.message);
    }
  }
}
