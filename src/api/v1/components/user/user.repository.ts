import { SignUpDto, UserDto } from "./user.dto";
import { client } from "../../../../db/conn";

export = {
  async signup(signUpDto: SignUpDto): Promise<UserDto> {
    try {
      const { email, name, password } = signUpDto;
      const sql = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
      const values = [name, email, password];
      const { rows } = await client.query(sql, values);
      return rows[0];
    } catch (error: any) {
      console.error('Error creating user:', error?.message);
      throw new Error(error?.message);
    }
  },

  async getUsers(): Promise<UserDto[]> {
    try {
      const sql = `SELECT * FROM users`;
      const { rows } = await client.query(sql);
      return rows;
    } catch (error: any) {
      console.error('Error getting users:', error?.message);
      throw new Error(error?.message);
    }
  },

  async findByEmail(email: string): Promise<UserDto> {
    try {
      const sql = `SELECT * FROM users WHERE email = $1`;
      const values = [email];
      const { rows } = await client.query(sql, values);
      return rows[0];
    } catch (error: any) {
      console.error('Error getting user:', error?.message);
      throw new Error(error?.message);
    }
  },

  async getUserById({ userId }: { userId: string }): Promise<UserDto> {
    try {
      const sql = `SELECT * FROM users WHERE id = $1`;
      const values = [userId];
      const { rows } = await client.query(sql, values);
      return rows[0];
    } catch (error: any) {
      console.error('Error getting user:', error?.message);
      throw new Error(error?.message);
    }
  },

  async getTopUsers(): Promise<any> {
    try {
      const sql = `
        SELECT
          u.id AS id,
          u.name AS name,
          p.title AS title,
          c.content AS comment
        FROM
          users u
        JOIN posts p ON u.id = p.userId
        LEFT JOIN comments c ON p.id = c.postId
        JOIN (
          SELECT userId, COUNT(*) AS postCount
          FROM posts
          GROUP BY userId
          ORDER BY postCount DESC
          LIMIT 3
        ) top_users ON u.id = top_users.userId
        WHERE
          c.id = (
            SELECT id
            FROM comments
            WHERE postId = p.id
            ORDER BY createdAt DESC
            LIMIT 1
          )
        ORDER BY top_users.postCount DESC;
      `;
      const { rows } = await client.query(sql);
      return rows;
    } catch (error: any) {
      console.error('Error getting top users:', error?.message);
      throw new Error(error?.message);
    }
  }
};

      // const sql = `
      //   SELECT
      //     u.id AS userId,
      //     u.name AS username,
      //     p.id AS postId,
      //     p.title AS postTitle,
      //     c.id AS commentId,
      //     c.content AS commentContent
      //   FROM
      //     users u
      //   JOIN posts p ON u.id = p.userId
      //   LEFT JOIN comments c ON p.id = c.postId
      //   JOIN (
      //     SELECT userId, COUNT(*) AS postCount
      //     FROM posts
      //     GROUP BY userId
      //     ORDER BY postCount DESC
      //     LIMIT 3
      //   ) top_users ON u.id = top_users.userId
      //   WHERE
      //     c.id = (
      //       SELECT id
      //       FROM comments
      //       WHERE postId = p.id
      //       ORDER BY createdAt DESC
      //       LIMIT 1
      //     )
      //   ORDER BY top_users.postCount DESC;
      // `;