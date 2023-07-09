import PostCard from '../components/PostCard';
import {api} from '../api/apiConfig';
import {getPostRoute, getPostsRoute, getPostsWithUserRoute} from '../api/apiRoutes';
import {Post, SortType} from '../types';
import {useLocalStorage} from '../hooks/useLocalStorage';
import {usePagination} from '../hooks/usePagination';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import Search from '../components/Search';
import {useFetchData} from '../hooks/useFetchData';
import ButtonWithConfirm from '../components/ButtonWithConfirm';
import ItemsPerPageToggler from '../components/ItemsPerPageToggler';
import PostForm from '../components/PostForm';
import {useEffect, useState} from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  CheckboxGroup,
  Flex,
  Text,
  Heading,
  ScaleFade,
  VStack,
  useDisclosure,
  Icon,
  useToast,
  Spinner,
  Center,
} from '@chakra-ui/react';
import {BsPlus, BsX} from 'react-icons/bs';

function PostsPage() {
  const {currentPage, itemsPerPage, goToPage, setItemsCountPerPage} = usePagination(1, 10);
  const [checkedPosts, setCheckedPosts] = useState<(string | number)[]>([]);
  const [favoritePosts, setFavoritePosts] = useLocalStorage<string[]>('favorites', []);
  const [sort, setSort] = useState<SortType>('popular');
  const [searchString, setSearchString] = useState<string>('');

  const toast = useToast();

  const {
    isOpen: isTopButtonsOpen,
    onOpen: onTopButtonsOpen,
    onClose: onTopButtonsClose,
  } = useDisclosure();

  const [{data: posts, length}, fetchPosts, setPosts] = useFetchData<Post[]>(
    getPostsWithUserRoute({
      page: currentPage,
      limit: itemsPerPage,
      order: sort,
      q: searchString,
    })
  );

  const totalPages = Math.ceil(length / itemsPerPage);

  useEffect(() => {
    fetchPosts();
  }, [currentPage, itemsPerPage, sort, searchString, fetchPosts]);

  useEffect(() => {
    if (checkedPosts.length > 0) {
      onTopButtonsOpen();
    }
    if (checkedPosts.length == 0) {
      onTopButtonsClose();
    }
  }, [checkedPosts, onTopButtonsClose, onTopButtonsOpen]);

  const onPostDelete = async (postIds: (string | number)[] | number | string) => {
    const idsArray = Array.isArray(postIds) ? postIds : [postIds.toString()];
    const deletePromises = idsArray.map((postId) => api.delete(getPostRoute(postId)));
    try {
      const responses = await Promise.all(deletePromises);
      const successfulllyDeletes = responses
        .filter((res) => res.status === 200)
        .map((_, index) => idsArray[index]);
      if (successfulllyDeletes.length > 0 && posts) {
        setPosts(posts.filter((post) => !successfulllyDeletes.includes(post.id.toString())));
        setCheckedPosts([]);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: `Failed to delete post. ${error.message}!`,
          position: 'bottom-left',
          status: 'error',
        });
      }
    }
  };

  const onOnePostFavorite = (postId: string | number) => {
    if (favoritePosts.includes(postId.toString())) {
      const index = favoritePosts.findIndex((id) => id === postId.toString());
      if (index === -1) return;

      setFavoritePosts([...favoritePosts.slice(0, index), ...favoritePosts.slice(index + 1)]);
    }
    if (!favoritePosts.includes(postId.toString())) {
      setFavoritePosts([...favoritePosts, postId.toString()]);
    }
  };

  const onPostFavorite = async (postIds: (string | number)[]) => {
    const idsArray = Array.isArray(postIds) ? postIds : [postIds];

    if (idsArray.length === 0) return;

    const newFavoritePosts = [];
    for (let i = 0; i < idsArray.length; i++) {
      if (!favoritePosts.includes(idsArray[i].toString())) {
        newFavoritePosts.push(idsArray[i].toString());
      }
    }

    setFavoritePosts([...favoritePosts, ...newFavoritePosts.map((id) => id)]);
    setCheckedPosts([]);
  };

  const onPostEdit = async (newPost: Post) => {
    if (!posts) return;
    const index = posts.findIndex((post) => post.id === newPost.id);
    if (index === -1) return;
    try {
      const res = await api.put<Post>(getPostRoute(newPost.id), newPost);
      if (res.status === 200) {
        setPosts([...posts.slice(0, index), newPost, ...posts.slice(index + 1)]);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: `Failed to edit post. ${error.message}!`,
          position: 'bottom-left',
          status: 'error',
        });
      }
    }
  };

  const onPostAdd = async (newPost: Omit<Post, 'id'>) => {
    if (!posts) return;
    try {
      const res = await api.post<Post>(getPostsRoute(), newPost);
      if (res.status === 201) {
        setPosts([res.data, ...posts]);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: `Failed to add post. ${error.message}!`,
          position: 'bottom-left',
          status: 'error',
        });
      }
    }
  };

  if (!posts) {
    return (
      <Center my={6}>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Heading as={'h1'} py={{base: 4, md: 8}}>
          {searchString ? 'Search' : 'Post'}
        </Heading>

        <ScaleFade in={isTopButtonsOpen} unmountOnExit>
          <ButtonGroup spacing={{base: 1, md: 3}}>
            <Button variant={'ghost'} onClick={() => setCheckedPosts([])}>
              Clear selection
            </Button>
            <ButtonWithConfirm
              title='Confirm adding'
              message='Add all selected posts to favorites?'
              confirmButtonText='Add'
              onConfirm={() => onPostFavorite(checkedPosts)}
            >
              Favorite all
            </ButtonWithConfirm>
            <ButtonWithConfirm
              title='Confirm deleting'
              message='Are you sure you want to delete all selected posts?'
              confirmButtonText='Delete'
              onConfirm={() => onPostDelete(checkedPosts)}
            >
              Delete all
            </ButtonWithConfirm>
          </ButtonGroup>
        </ScaleFade>
      </Flex>
      <Flex
        pb={{base: 2, md: 4}}
        alignItems={'center'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}
        gap={6}
      >
        {!searchString ? (
          <>
            <Sort sort={sort} setSort={setSort} />
            <PostForm onPostAdd={onPostAdd} title={'Add new post'}>
              <span>Add</span>
              <Icon ml={2} as={BsPlus} />
            </PostForm>
          </>
        ) : (
          <Button onClick={() => setSearchString('')}>
            <span>Reset search</span>
            <Icon ml={2} as={BsX} />
          </Button>
        )}

        <Box flexBasis={'50%'} flexGrow={1}>
          <Search onSearch={setSearchString} />
        </Box>
      </Flex>
      {posts.length !== 0 ? (
        <>
          <VStack spacing={10}>
            <CheckboxGroup value={checkedPosts} onChange={(value) => setCheckedPosts(value)}>
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  search={searchString}
                  post={post}
                  onPostDelete={onPostDelete}
                  onPostEdit={onPostEdit}
                  isFavorite={favoritePosts.includes(post.id.toString()) ? true : false}
                  onPostFavorite={onOnePostFavorite}
                />
              ))}
            </CheckboxGroup>
          </VStack>
          <Flex my={6} justifyContent={'space-between'} gap={6}>
            <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={goToPage} />
            <ItemsPerPageToggler limit={itemsPerPage} onLimitChange={setItemsCountPerPage} />
          </Flex>
        </>
      ) : (
        <Box my={6} fontSize={'xl'}>
          <Text>
            Oops, no results were found for <strong>{searchString}</strong>
          </Text>
        </Box>
      )}
    </>
  );
}

export default PostsPage;
