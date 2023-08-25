// noinspection ExceptionCaughtLocallyJS

import bcrypt from "bcryptjs";
import userRepository from "./user.repository";
import * as utils from "../../../../utils/helpers";
import { SignInDto, SignUpDto, UserDto } from "./user.dto";
import { BadRequestError, ForbiddenError } from "../../../../utils/api-errors";
import { signAccessToken } from "../../../middlewares/auth";

export = {
  async signup(signUpDto: SignUpDto) {
    let {email, password, ...rest} = signUpDto;
    try {
      const user = await userRepository.findByEmail(email);
      if (user) throw new BadRequestError("user already exists");
      password = await bcrypt.hash(password, 12);
      await userRepository.signup({ ...rest, email, password});
    } catch (err: any) {
      console.log({ err });
      throw new BadRequestError(err.message);
    }
    return utils.responseData({
      status: 201,
      message: "Registration successful",
    });
  },

  async signin({email, password}: SignInDto) {
    let user: UserDto, isPasswordValid: boolean, accessToken: string;
    try {
      user = await userRepository.findByEmail(email);
      if (!user) throw new ForbiddenError(`you're not yet a user, please signup`);

      isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new BadRequestError("invalid credentials");

      accessToken= await signAccessToken({ userId: user.id });
    } catch (err: any) {
      console.log({ err });
      throw new BadRequestError(err.message);
    }
    return utils.responseData({
      data: { user, accessToken },
      message: "Logged in",
    });
  },

  async getUsers() {
    try {
      const users = await userRepository.getUsers();
      return utils.responseData({ data: { users }, message: "Users retrieved" });
    } catch (err: any) {
      console.log({ err });
      throw new BadRequestError(err.message);
    }
  },

  async getTopUsers() {
    try {
      const users = await userRepository.getTopUsers();
      return utils.responseData({ data: { users }, message: "Top users retrieved" });
    } catch (err: any) {
      console.log({ err });
      throw new BadRequestError(err.message);
    }
  }
};
