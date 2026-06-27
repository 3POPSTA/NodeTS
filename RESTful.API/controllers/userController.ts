import { Request, Response } from 'express';
import User from '../models/User';

export const getUsers = async (request: Request, response: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    response.status(200).json(users);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    response.status(500).json({ message: 'Error retrieving users', error: msg });
  }
};

export const getUserById = async (request: Request, response: Response): Promise<void> => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      response.status(404).json({ message: 'User not found' });
      return;
    }
    response.status(200).json(user);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    response.status(500).json({ message: 'Error retrieving user', error: msg });
  }
};

export const createUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    response.status(400).json({ message: 'Error creating user', error: msg });
  }
};

export const updateUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const user = await User.update(request.params.id, request.body);
    if (!user) {
      response.status(404).json({ message: 'User not found' });
      return;
    }
    response.status(200).json(user);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    response.status(400).json({ message: 'Error updating user', error: msg });
  }
};

export const deleteUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const user = await User.delete(request.params.id);
    if (!user) {
      response.status(404).json({ message: 'User not found' });
      return;
    }
    response.status(200).json({ message: 'User deleted successfully', user });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    response.status(500).json({ message: 'Error deleting user', error: msg });
  }
};

export default { getUsers, getUserById, createUser, updateUser, deleteUser };
