import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Collapse,
  Flex,
  Icon,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {BsChat, BsChatText, BsBookmark, BsFillTrashFill, BsPencilSquare} from 'react-icons/bs';
import {Post, Comment, User} from '../types';
import {useState} from 'react';
import {API_ROUTES} from '../api/apiRoutes';
import {api, fetcher} from '../api/apiConfig';
import {Link} from 'react-router-dom';
import PostHeading from './PostHeading';
import UserComment from './UserComment';
import PostEdit from './PostEdit';
import Toast from './Toast';
import useSWR from 'swr';
import {errorHandler} from '../helpers/errorHandler';
import ConfirmationModal from './ConfirmationModal';

interface PostCardProps {
  post: Post;
  onPostDelete: (postId: number) => void;
}

function PostCard({post: initialPost, onPostDelete}: PostCardProps) {
  const color = useColorModeValue('blackAlpha.600', 'whiteAlpha.600');
  const toast = useToast();
  const {
    isOpen: isPostEditigOpen,
    onOpen: onPostEditigOpen,
    onClose: onPostEditigClose,
  } = useDisclosure();
  const {isOpen: isOpenCommentsList, onToggle: onToggleCommentsList} = useDisclosure();
  const {
    isOpen: isConfirmationModalOpen,
    onOpen: onConfirmationModalOpen,
    onClose: onConfirmationModalClose,
  } = useDisclosure();

  const [post, setPosts] = useState<Post>(initialPost);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommensLoading, setIsCommentsLoading] = useState(false);

  const {data: user} = useSWR<User>(`${API_ROUTES.users}/${post.userId}`, fetcher, {
    onError: (error) => {
      toast({
        position: 'bottom-left',
        render: () => <Toast>Failed to load. {errorHandler(error)}</Toast>,
      });
    },
  });

  const {data: users} = useSWR<User[]>(`${API_ROUTES.users}`, fetcher, {
    onError: (error) => {
      toast({
        position: 'bottom-left',
        render: () => <Toast>Failed to load. {errorHandler(error)}</Toast>,
      });
    },
  });

  const onToggleComments = async () => {
    if (comments.length > 0) {
      onToggleCommentsList();
      return;
    }
    try {
      setIsCommentsLoading(true);
      const {data} = await api.get<Comment[]>(`${API_ROUTES.posts}/${post.id}/comments`);
      setIsCommentsLoading(false);
      setComments(data);
    } catch (error) {
      toast({
        position: 'bottom-left',
        render: () => <Toast>Failed to load. {errorHandler(error)}</Toast>,
      });
      setIsCommentsLoading(false);
    }

    onToggleCommentsList();
  };

  const onPostEditingSubmit = async (newPost: Post) => {
    try {
      const {data: updatedPost} = await api.put<Post>(`${API_ROUTES.posts}/${post.id}`, newPost);
      setPosts(updatedPost);
    } catch (error) {
      toast({
        position: 'bottom-left',
        render: () => <Toast>Failed to update. {errorHandler(error)}</Toast>,
      });
    }
  };

  return (
    <>
      <Box w={'full'} border={'1px solid'}>
        <Box p='6'>
          <Flex alignItems='center' justifyContent={'space-between'} gap={2} flexWrap={'wrap'}>
            <Text
              color={color}
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
            >
              {user && user.name}
            </Text>

            <Checkbox value={post.id.toString()} colorScheme='primary' px={'12px'}></Checkbox>
          </Flex>

          <PostHeading
            as='h2'
            mt='2'
            mb='4'
            fontSize={{base: 24, md: 30}}
            _firstLetter={{
              textTransform: 'uppercase',
            }}
          >
            <Link to={`${post.id}`}>{post.title}</Link>
          </PostHeading>

          <Text
            mb={4}
            _firstLetter={{
              textTransform: 'uppercase',
            }}
          >
            {post.body}
          </Text>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            pt={2}
            borderTop={'1px solid'}
          >
            <ButtonGroup spacing={{base: 1, md: 3}}>
              <Button
                onClick={onToggleComments}
                isLoading={isCommensLoading}
                variant={'ghost'}
                color={isOpenCommentsList ? 'yellow.500' : ''}
              >
                {isOpenCommentsList ? (
                  <Icon as={BsChatText} boxSize={4} />
                ) : (
                  <Icon as={BsChat} boxSize={4} />
                )}
              </Button>
              <Button variant={'ghost'}>
                <Icon as={BsBookmark} boxSize={4} />
              </Button>
            </ButtonGroup>
            <ButtonGroup spacing={{base: 1, md: 3}}>
              <Button variant={'ghost'} onClick={onPostEditigOpen}>
                <Icon as={BsPencilSquare} boxSize={4} />
              </Button>
              <Button variant={'ghost'} onClick={onConfirmationModalOpen}>
                <Icon as={BsFillTrashFill} cursor={'pointer'} />
              </Button>
            </ButtonGroup>
          </Flex>
          <Collapse in={isOpenCommentsList} animateOpacity>
            <VStack spacing={6} mt={6}>
              {comments?.map((comment) => (
                <UserComment key={comment.id} comment={comment} />
              ))}
            </VStack>
          </Collapse>
        </Box>
      </Box>

      <PostEdit
        users={users}
        post={post}
        isOpen={isPostEditigOpen}
        onClose={onPostEditigClose}
        onSubmit={onPostEditingSubmit}
      />

      <ConfirmationModal
        title='Confirm Delete'
        message='Are you sure you want to delete this post?'
        isOpen={isConfirmationModalOpen}
        onClose={onConfirmationModalClose}
        onConfirm={() => onPostDelete(post.id)}
      />
    </>
  );
}

export default PostCard;
