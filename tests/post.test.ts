import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { Request, Response } from 'express';
import postController from "../src/api/v1/components/post/post.controller";
import postService from "../src/api/v1/components/post/post.service";
import { CreateCommentDto } from "../src/api/v1/components/comment/comment.dto";

chai.use(sinonChai);
const expect = chai.expect;

describe('Post Controller', () => {
  let req: any;
  let res: Partial<Response>;
  let next: any;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

    it('should add a comment', async () => {
    const createCommentDto: Partial<CreateCommentDto> = { 
        content: 'test',
    };
    req.body = createCommentDto;
    req.params.postId = 'post-id';

    const postServiceStub = sinon.stub(postService, 'addComment').resolves({ status: 201, message: 'Comment added successfully', success: true });

    await postController.addComment(req as Request, res as Response, next);

    expect(postServiceStub).to.have.been.calledOnceWith(createCommentDto);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(sinon.match.object);
  });

  it('should handle addComment error', async () => {
    const createCommentDto: Partial<CreateCommentDto> = { 
        content: 'test',
    };
    req.body = createCommentDto;
    req.params.postId = 'post-id';

    const errorMessage = 'Failed to add comment';
    const postServiceStub = sinon.stub(postService, 'addComment').throws(new Error(errorMessage));

    await postController.addComment(req as Request, res as Response, next);

    expect(postServiceStub).to.have.been.calledOnceWith(createCommentDto);
    expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
  });
});

