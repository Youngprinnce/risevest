import userValidator from "./user.validator";
import userController from "./user.controller";
import postValidator from "../post/post.validator";
import router from '../../../config/router.config';
import { validate } from "../../../../utils/helpers";
import { authorize } from "../../../middlewares/auth";

router.post('/signin', validate(userValidator.signin), userController.signin);
router.post('/', validate(userValidator.signup),userController.signup);
router.get('/', authorize(), userController.getUsers);
router.get('/top-users', authorize(), userController.getTopUsers);

router.post('/:id/posts', authorize(), validate(postValidator.createPost), userController.createPost);
router.get('/:id/posts', authorize(), validate(postValidator.getPostsByUserId), userController.getPostsByUserId);

export {router};
