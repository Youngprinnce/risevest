import postController from "./post.controller";
import router from '../../../config/router.config';
import { validate } from "../../../../utils/helpers";
import { authorize } from "../../../middlewares/auth";
import commentValidator from "../comment/comment.validator";

router.post('/:postId/comments', authorize(), validate(commentValidator.createComment), postController.addComment);

export {router};
