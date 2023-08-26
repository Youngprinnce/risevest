import { body, param, check } from "express-validator";

const createPost = [
  check('content', 'content is required').notEmpty().isString().withMessage('content must be a string.'),
  body('title', 'title is required').notEmpty().isString().withMessage('title cannot be empty.'),
  param('id', 'id is required').isString().not().isEmpty().withMessage('Provide the id.')
];

const getPostsByUserId = [
  param('id').isString().not().withMessage('provide the userId.'),
];

export = {createPost, getPostsByUserId}