import { BadRequestError } from "../../../../utils/api-errors";
import userRepository from "../user/user.repository";
import { CreatePostDto } from "./post.dto";
import postRepository from "./post.repository";
import * as utils from "../../../../utils/helpers";
import { CreateCommentDto } from "../comment/comment.dto";
import commentRepository from "../comment/comment.repository";

export = {
  async createPost(createPostDto: CreatePostDto) {
    const {userId, ...rest} = createPostDto;
      try {
      const user = await userRepository.getUserById({userId});
      if (!user) throw new BadRequestError("User not found");
      const post = await postRepository.createPost({userId, ...rest});
      return utils.responseData({
        status: 201,
        message: "Post created successfully",
        data: {post},
      });
    } catch (err: any) {
      console.log({ err });
      throw new BadRequestError(err.message);
    }
  },

  async getPostsByUserId({userId}: {userId: string}) {
    try {
      const posts = await postRepository.getPostsByUserId({userId});
      return utils.responseData({ data: { posts }, message: "Posts retrieved" });
    } catch (err: any) {
      console.log({ err });
      throw new BadRequestError(err.message);
    }
  },

  async addComment(createCommentDto: CreateCommentDto) {
    const {postId, ...rest} = createCommentDto;
    try {
      console.log({postId});
      const post = await postRepository.getPostById({postId});
      if (!post) throw new BadRequestError("Post not found");
      const comment = await commentRepository.addComment({postId, ...rest});
      return utils.responseData({
        status: 201,
        message: "Comment added successfully",
        data: {comment},
      });
    } catch (err: any) {
      console.log({ err });
      throw new BadRequestError(err.message);
    }
  }
}