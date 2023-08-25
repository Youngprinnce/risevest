import { body, check } from "express-validator";

const createComment = [
  check('postId')
    .isUUID(4)
    .withMessage('postId must be a valid UUID version 4.'),
  body('content')
    .isString()
    .not()
    .isEmpty()
    .withMessage('Content cannot be empty.')
];

export = { createComment }