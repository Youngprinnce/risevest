import userService from "./user.service";
import postService from "../post/post.service";
import { CreatePostDto } from "../post/post.dto";
import { SignInDto, SignUpDto } from "./user.dto";
import { Request, Response, NextFunction } from 'express';

export = {
  async signup(req:Request, res:Response, next:NextFunction) {
    const signUpDto = req.body as SignUpDto;
    try {
      const {status, ...rest} = await userService.signup(signUpDto);
      return res.status(status).json(rest);
    } catch (err) {
      return next(err);
    }
  },

  async signin(req:Request, res:Response, next:NextFunction) {
    const signInDto = req.body as SignInDto;
    try {
      const {status, ...rest} = await userService.signin(signInDto);
      return res.status(status).json(rest);
    } catch (err) {
      return next(err);
    }
  },

  async getUsers(req:Request, res:Response, next:NextFunction) {
    try {
      const {status, ...rest} = await userService.getUsers();
      console.log({rest});
      return res.status(status).json(rest);
    } catch (err) {
      return next(err);
    }
  },

  async createPost(req:Request, res:Response, next:NextFunction) {
    const createPostDto = req.body as CreatePostDto;
    createPostDto.userId = req.params?.id;
    try {
      const {status, ...rest} = await postService.createPost(createPostDto);
      return res.status(status).json(rest);
    } catch (err) {
      return next(err);
    }
  },

  async getPostsByUserId(req:Request, res:Response, next:NextFunction) {
    const userId = req.params.id;
    try {
      const {status, ...rest} = await postService.getPostsByUserId({userId});
      return res.status(status).json(rest);
    } catch (err) {
      return next(err);
    }
  },

  async getTopUsers(req:Request, res:Response, next:NextFunction) {
    try {
      const {status, ...rest} = await userService.getTopUsers();
      return res.status(status).json(rest);
    } catch (err) {
      return next(err);
    }
  }
}