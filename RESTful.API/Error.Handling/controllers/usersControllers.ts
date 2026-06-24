import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { AppError } from '../utils/errorHandler';
import { catchAsync } from '../utils/catchAsync';

export const getUsers = catchAsync(async (request: Request, response: Response): Promise<void> => {
  const users = await User.findAll();
  response.status(200).json(users);
});

export const getUserById = catchAsync(
  async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const user = await User.findById(request.params.id);
    if (!user) {
      next(new AppError(404, 'User not found'));
      return;
    }
    response.status(200).json(user);
  }
);

export const createUser = catchAsync(async (request: Request, response: Response): Promise<void> => {
  const user = await User.create(request.body);
  response.status(201).json(user);
});

export const updateUser = catchAsync(
  async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const user = await User.update(request.params.id, request.body);
    if (!user) {
      next(new AppError(404, 'User not found'));
      return;
    }
    response.status(200).json(user);
  }
);

export const deleteUser = catchAsync(
  async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const user = await User.delete(request.params.id);
    if (!user) {
      next(new AppError(404, 'User not found'));
      return;
    }
    response.status(200).json({ message: 'User deleted successfully', user });
  }
);

export default { getUsers, getUserById, createUser, updateUser, deleteUser };
module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
