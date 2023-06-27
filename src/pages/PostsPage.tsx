import {
  Button,
  CheckboxGroup,
  Flex,
  Heading,
  ScaleFade,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import {useEffect, useState} from 'react';
import {api, fetcher} from '../api/apiConfig';
import {API_ROUTES} from '../api/apiRoutes';
import {Post} from '../types';
import useSWR from 'swr';
import {errorHandler} from '../helpers/errorHandler';
import Toast from '../components/Toast';

import ConfirmationModal from '../components/ConfirmationModal';

function PostsPage() {
  const toast = useToast();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [checkedPosts, setCheckedPosts] = useState<(string | number)[]>([]);
  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(() => {
    if (checkedPosts.length > 0) {
      onOpen();
    }
    if (checkedPosts.length == 0) {
      onClose();
    }
  }, [checkedPosts]);

  const {
    data: posts,
    isLoading: isPostsLoading,
    mutate,
  } = useSWR<Post[]>(`${API_ROUTES.posts}?_limit=${limit}&_page=${page}`, fetcher, {
    onError: (error) =>
      toast({
        position: 'bottom-left',
        render: () => <Toast>Failed to load. {errorHandler(error)}</Toast>,
      }),
  });

  const onPostDelete = async (postIds: (number | string) | (number | string)[]) => {
    const idsArray = Array.isArray(postIds) ? postIds : [postIds];

    for (const postId of idsArray) {
      try {
        await api.delete(`${API_ROUTES.posts}/${postId}`);
      } catch (error) {
        toast({
          position: 'bottom-left',
          render: () => <Toast>Failed to delete. {errorHandler(error)}</Toast>,
        });
      }
    }
    if (posts) {
      const newPosts = posts.filter((post) => {
        if (typeof idsArray[0] === 'string') return !idsArray.includes(post.id.toString());
        return !idsArray.includes(post.id);
      });
      mutate(newPosts, false);
      if (checkedPosts.length > 0) {
        setCheckedPosts([]);
      }
    }
  };

  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();

  return (
    <>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Heading as={'h1'} py={{base: 4, md: 8}}>
          Posts
        </Heading>
        <ScaleFade in={isOpen}>
          <Button onClick={onConfirmationModalOpen}>Delete all</Button>
        </ScaleFade>
      </Flex>
      <VStack spacing={10}>
        <CheckboxGroup
          value={checkedPosts}
          onChange={(value) => {
            console.log(value);
            setCheckedPosts(value);
          }}
        >
          {posts &&
            posts.map((post) => <PostCard key={post.id} post={post} onPostDelete={onPostDelete} />)}
        </CheckboxGroup>
      </VStack>
      <ConfirmationModal
        title='Confirm Delete'
        message='Are you sure you want to delete this post?'
        isOpen={isConfirmationModalOpen}
        onClose={onConfirmationModalClose}
        onConfirm={() => onPostDelete(checkedPosts)}
      />
    </>
  );
}

export default PostsPage;
