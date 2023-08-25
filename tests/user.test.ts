import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import userController from "../src/api/v1/components/user/user.controller";
import { Request, Response } from 'express';
import { SignInDto, SignUpDto } from "../src/api/v1/components/user/user.dto";
import userService from "../src/api/v1/components/user/user.service";
import postService from "../src/api/v1/components/post/post.service";
import { CreatePostDto } from "../src/api/v1/components/post/post.dto";

chai.use(sinonChai);
const expect = chai.expect;

describe('User Controller', () => {
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

  it('should signup a user', async () => {
    const signUpDto: SignUpDto = { 
      email: 'test@gmail.com',
      password: '123456',
      name: 'test',
     };
    req.body = signUpDto;

    const userServiceStub = sinon.stub(userService, 'signup').resolves({ status: 200, message: 'User created successfully', success: true });

    await userController.signup(req as Request, res as Response, next);

    expect(userServiceStub).to.have.been.calledOnceWith(signUpDto);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sinon.match.object);
  });

  it('should handle signup error', async () => {
    const signUpDto = {
      email: 'test@gmail.com',
      password: '123456',
      name: 'test',
    };
    req.body = signUpDto;

    const errorMessage = 'Failed to create user';
    const userServiceStub = sinon.stub(userService, 'signup').throws(new Error(errorMessage));

    await userController.signup(req as Request, res as Response, next);

    expect(userServiceStub).to.have.been.calledOnceWith(signUpDto);
    expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
  });

  it('should signin a user', async () => {
    const signInDto: SignInDto = { 
        email: 'test@gmail.com',
        password: '123456',
    };

    req.body = signInDto;

    const userServiceStub = sinon.stub(userService, 'signin').resolves({ status: 200, message: 'Login successfully', success: true });

    await userController.signin(req as Request, res as Response, next);

    expect(userServiceStub).to.have.been.calledOnceWith(signInDto);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sinon.match.object);
  });

  it('should handle signin error', async () => {
    const signInDto = {
      email: 'test@gmail.com',
      password: '123456',
    };

    req.body = signInDto;

    const errorMessage = 'Failed to sign in';
    const userServiceStub = sinon.stub(userService, 'signin').throws(new Error(errorMessage));

    await userController.signin(req as Request, res as Response, next);

    expect(userServiceStub).to.have.been.calledOnceWith(signInDto);
    expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
  });

  it('should get users', async () => {
    const usersData = { /* mock user data */ };
    const userServiceStub = sinon.stub(userService, 'getUsers').resolves({ status: 200, message: 'Users', success: true });

    await userController.getUsers(req as Request, res as Response, next);

    expect(userServiceStub).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({message: 'Users', success: true});
  });

  it('should handle getUsers error', async () => {
    const errorMessage = 'Failed to retrieve users';
    const userServiceStub = sinon.stub(userService, 'getUsers').throws(new Error(errorMessage));

    await userController.getUsers(req as Request, res as Response, next);

    expect(userServiceStub).to.have.been.calledOnce;
    expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
  });


  it('should create a post', async () => {
    const createPostDto: Partial<CreatePostDto> = { 
      title: 'test',
      content: 'test',
     };
    const postServiceStub = sinon.stub(postService, 'createPost').resolves({ status: 201, message: 'Post created successfully', success: true });
    req.body = createPostDto;
    req.params.id = 'user-id';

    await userController.createPost(req as Request, res as Response, next);

    expect(postServiceStub).to.have.been.calledOnceWith(createPostDto);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(sinon.match.object);
  });


it('should handle createPost error', async () => {
    const createPostDto = {
      title: 'test',
      content: 'test',
    };
    const errorMessage = 'Failed to create post';
    const postServiceStub = sinon.stub(postService, 'createPost').throws(new Error(errorMessage));

    req.body = createPostDto;
    req.params.id = 'user-id';

    await userController.createPost(req as Request, res as Response, next);

    expect(postServiceStub).to.have.been.calledOnceWith(createPostDto);
    expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
  });

  it('should get posts by user id', async () => {
    const userId = 'user-id';
    const postServiceStub = sinon.stub(postService, 'getPostsByUserId').resolves({ status: 200, message: 'Posts retrieved', success: true });
    req.params.id = userId;

    await userController.getPostsByUserId(req as Request, res as Response, next);

    expect(postServiceStub).to.have.been.calledOnceWith({ userId });
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({message: 'Posts retrieved', success: true});
  });

  it('should handle getPostsByUserId error', async () => {
    const userId = 'user-id';
    const errorMessage = 'Failed to retrieve posts';
    const postServiceStub = sinon.stub(postService, 'getPostsByUserId').throws(new Error(errorMessage));

    req.params.id = userId;

    await userController.getPostsByUserId(req as Request, res as Response, next);

    expect(postServiceStub).to.have.been.calledOnceWith({ userId });
    expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
  });

  it('should get top users', async () => {
    const userServiceStub = sinon.stub(userService, 'getTopUsers').resolves({ status: 200, message: 'Top users', success: true});

    await userController.getTopUsers(req as Request, res as Response, next);

    expect(userServiceStub).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({message: 'Top users', success: true});
  });

  it('should handle getTopUsers error', async () => {
    const errorMessage = 'Failed to retrieve top users';
    const userServiceStub = sinon.stub(userService, 'getTopUsers').throws(new Error(errorMessage));

    await userController.getTopUsers(req as Request, res as Response, next);

    expect(userServiceStub).to.have.been.calledOnce;
    expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
  });
});

