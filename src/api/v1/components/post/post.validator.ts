import { body, param, check } from "express-validator";

const createPost = [
  check('content').exists().withMessage('Content is required.').isString().not().isEmpty().withMessage('Content cannot be empty.'),
  body('title').isString().not().isEmpty().withMessage('Title cannot be empty.'),
  param('id').isString().not().isEmpty().withMessage('Provide the id.')
];

const getPostsByUserId = [
    param('id').isString().not().withMessage('provide the userId.'),
];

export = {createPost, getPostsByUserId}
