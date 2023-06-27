import axios from 'axios';
import {Id, Post, User} from '../types';
import {API_ROUTES} from './apiRoutes';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const getPosts = (page: number, limit = 10) =>
  api.get(`${API_ROUTES.posts}/?_page=${page}?_limit=${limit}`).then((res) => res.data);

export const getPostComments = (postId: Id) =>
  api.get(`${API_ROUTES.posts}/${postId}/comments`).then((res) => res.data);

export const getUserById = (userId: Id) =>
  api.get(`${API_ROUTES.users}/${userId}`).then((res) => res.data);

export const getUsers = () => api.get(`${API_ROUTES.users}`).then((res) => res.data);

export const updatePost = (postId: Id, post: Post) =>
  api.put(`${API_ROUTES.posts}/${postId}`, post).then((res) => res.data);

export const updateUser = (userId: Id, user: User) =>
  api.put(`${API_ROUTES.users}/${userId}`, user).then((res) => res.data);
