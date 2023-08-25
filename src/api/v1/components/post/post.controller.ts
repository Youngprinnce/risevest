import { Request, Response, NextFunction } from 'express';
import { CreateCommentDto } from '../comment/comment.dto';
import postService from './post.service';

export = {
    async addComment(req:Request, res:Response, next:NextFunction) {
        const createCommentDto = req.body as CreateCommentDto;
        createCommentDto.userId = req.authUser?.id;
        createCommentDto.postId = req.params?.postId;
        try {
            const {status, ...rest} = await postService.addComment(createCommentDto);
            return res.status(status).json(rest);
        } catch (err) {
            return next(err);
        }
    }
}