import UserComment from './UserComment';
import ButtonWithConfirm from './ButtonWithConfirm';
import PostForm from './PostForm';
import {Post, Comment} from '../types';
import {getPostCommentsRoute} from '../api/apiRoutes';
import {useFetchData} from '../hooks/useFetchData';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Collapse,
  Flex,
  Heading,
  Highlight,
  Icon,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  BsChat,
  BsChatText,
  BsBookmark,
  BsBookmarkFill,
  BsFillTrashFill,
  BsPencilSquare,
} from 'react-icons/bs';

interface PostCardProps {
  post: Post;
  search: string;
  onPostDelete: (postId: number) => void;
  onPostEdit: (post: Post) => void;
  onPostFavorite: (postId: number) => void;
  isFavorite: boolean;
}

function PostCard({
  post,
  search,
  onPostDelete,
  onPostEdit,
  isFavorite,
  onPostFavorite,
}: PostCardProps) {
  const color = useColorModeValue('blackAlpha.600', 'whiteAlpha.600');
  const hightlight = useColorModeValue('yellow.300', 'yellow.500');

  const {isOpen: isOpenCommentsList, onToggle: onToggleCommentsList} = useDisclosure();

  const [{data: comments, loading: isCommensLoading}, fetchComments] = useFetchData<Comment[]>(
    getPostCommentsRoute(post.id)
  );

  const onToggleComments = async () => {
    if (comments && comments.length > 0) {
      onToggleCommentsList();
      return;
    }
    await fetchComments();
    onToggleCommentsList();
  };

  return (
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
            {post.user.name}
          </Text>

          <Checkbox
            value={post.id.toString()}
            borderColor={'darkHover'}
            colorScheme='primary'
            px={'12px'}
          ></Checkbox>
        </Flex>
        <Heading
          as='h2'
          mt='2'
          mb='4'
          fontSize={{base: 24, md: 30}}
          _firstLetter={{
            textTransform: 'uppercase',
          }}
        >
          <Highlight
            query={search}
            styles={{
              bg: hightlight,
              clipPath: 'polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)',
              px: '2',
              rounded: 'md',
            }}
          >
            {post.title}
          </Highlight>
        </Heading>
        <Text
          mb={4}
          _firstLetter={{
            textTransform: 'uppercase',
          }}
        >
          <Highlight
            query={search}
            styles={{
              bg: hightlight,
              clipPath: 'polygon(4% 0, 100% 0%, 96% 100%, 0% 100%)',
              px: '2',
              rounded: 'md',
            }}
          >
            {post.body}
          </Highlight>
        </Text>
        <Flex alignItems={'center'} justifyContent={'space-between'} pt={2} borderTop={'1px solid'}>
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
            <Button
              variant={'ghost'}
              color={isFavorite ? 'yellow.500' : ''}
              onClick={() => onPostFavorite(post.id)}
            >
              {isFavorite ? (
                <Icon as={BsBookmarkFill} boxSize={4} />
              ) : (
                <Icon as={BsBookmark} boxSize={4} />
              )}
            </Button>
          </ButtonGroup>
          <ButtonGroup spacing={{base: 1, md: 3}}>
            <PostForm onPostEdit={onPostEdit} post={post} title={'Edit post'} variant={'ghost'}>
              <Icon as={BsPencilSquare} boxSize={4} />
            </PostForm>
            <ButtonWithConfirm
              variant={'ghost'}
              title='Confirm deleting'
              message='Are you sure you want to delete this post?'
              confirmButtonText='Delete'
              onConfirm={() => onPostDelete(post.id)}
            >
              <Icon as={BsFillTrashFill} />
            </ButtonWithConfirm>
          </ButtonGroup>
        </Flex>
        <Collapse in={isOpenCommentsList} animateOpacity>
          <VStack spacing={6} mt={6}>
            {comments &&
              comments.map((comment) => <UserComment key={comment.id} comment={comment} />)}
          </VStack>
        </Collapse>
      </Box>
    </Box>
  );
}

export default PostCard;
