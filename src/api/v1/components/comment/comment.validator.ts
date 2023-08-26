import { body, check } from "express-validator";

const createComment = [
  check('postId')
    .isUUID(4)
    .withMessage('postId must be a valid UUID version 4.'),
  body('content', 'content is required.')
    .notEmpty()
    .isString()
    .withMessage('Content must be a string.')
];

export = { createComment }