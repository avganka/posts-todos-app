export type Id = number;

export interface Post {
  userId: Id;
  id: Id;
  title: string;
  body: string;
  user: User;
}

export interface PostWithComments extends Post {
  comments: Comment[];
}

export interface Album {
  userId: Id;
  id: Id;
  title: string;
}

export interface Comment {
  postId: Id;
  id: Id;
  name: string;
  email: string;
  body: string;
}

export interface Photo {
  albumId: Id;
  id: Id;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Todo {
  userId: Id;
  id: Id;
  title: string;
  completed: boolean;
}

export interface User {
  id: Id;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type SortType = 'desc' | 'asc' | 'popular';
