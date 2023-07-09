import {SortType} from '../types';

interface SearchParams {
  limit?: number;
  page?: number;
  order?: SortType;
  q?: string;
}

export const getUsersRoute = () => '/users';

export const getPostsRoute = () => '/posts';

export const getPostsWithUserRoute = (searchParams: SearchParams) => {
  const {limit, page, order, q} = searchParams;
  const search = new URLSearchParams();
  search.set('_expand', 'user');
  if (!searchParams) {
    return search.toString();
  }

  if (limit && page) {
    search.set('_limit', limit.toString());
    search.set('_page', page.toString());
  }

  if (order) {
    if (order !== 'popular') {
      search.set('_sort', 'title,body');
      search.set('_order', order);
    }
  }
  if (q) {
    search.set('q', q);
  }

  return `/posts?${search.toString()}`;
};

export const getPostRoute = (postId: string | number) => `/posts/${postId}`;
export const getPostCommentsRoute = (postId: string | number) => `/posts/${postId}/comments`;
