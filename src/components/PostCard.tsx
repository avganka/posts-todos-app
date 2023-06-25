import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Divider,
  Flex,
  Icon,
  ScaleFade,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import {BsChat, BsChatText, BsBookmark, BsFillTrashFill, BsPencilSquare} from 'react-icons/bs';
import {PostWithComments, User} from '../types';
import {MouseEvent, useEffect, useState} from 'react';
import {API_ROUTES} from '../api/apiRoutes';
import {api} from '../api/apiConfig';
import {Link} from 'react-router-dom';
import PostHeading from './PostHeading';
import {firstLetterToUppercase} from '../helpers/firstLetterToUppercase';
import UserComment from './UserComment';

function PostCard({post}: {post: PostWithComments}) {
  const color = useColorModeValue('blackAlpha.600', 'whiteAlpha.600');

  const [user, setUser] = useState<User>();

  const {isOpen: isOpenIcons, onToggle: onToggleIcons} = useDisclosure();
  const {isOpen: isOpenComments, onToggle: onToggleComments} = useDisclosure();

  useEffect(() => {
    const fetchUser = async () => {
      const {data} = await api.get<User>(`${API_ROUTES.users}/${post.userId}`);
      setUser(data);
    };
    fetchUser();
  }, [post]);

  const toggleIcons = (evt: MouseEvent) => {
    evt.stopPropagation();
    onToggleIcons();
  };

  return (
    <Box border={'1px'} height={'full'} onMouseEnter={toggleIcons} onMouseLeave={toggleIcons}>
      <Flex direction={'column'} p='6' pb='2' height={'full'}>
        <Flex alignItems='center' justifyContent={'space-between'} gap={2} flexWrap={'wrap'}>
          <Text
            color={color}
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
          >
            {user?.name}
          </Text>

          <ScaleFade initialScale={0.5} in={isOpenIcons}>
            <ButtonGroup spacing={{base: 1, md: 3}}>
              <Button variant={'ghost'}>
                <Icon as={BsPencilSquare} boxSize={4} />
              </Button>
              <Button variant={'ghost'}>
                <Icon as={BsFillTrashFill} cursor={'pointer'} />
              </Button>
            </ButtonGroup>
          </ScaleFade>
        </Flex>

        <PostHeading as='h2' mt='2' mb='4' fontSize={{base: 24, md: 30}}>
          <Link to={`${post.id}`}>{firstLetterToUppercase(post.title)}</Link>
        </PostHeading>

        <Text mb={4}>{firstLetterToUppercase(post.body)}</Text>

        <Divider borderColor={'color'} mt={'auto'} />
        <ButtonGroup spacing={{base: 1, md: 3}} my={2}>
          <Button
            onClick={onToggleComments}
            variant={'ghost'}
            color={isOpenComments ? 'yellow.500' : ''}
            leftIcon={
              isOpenComments ? (
                <Icon as={BsChatText} boxSize={4} />
              ) : (
                <Icon as={BsChat} boxSize={4} />
              )
            }
          >
            {post.comments.length}
          </Button>
          <Button variant={'ghost'}>
            <Icon as={BsBookmark} boxSize={4} />
          </Button>
        </ButtonGroup>

        <Collapse in={isOpenComments} animateOpacity>
          <VStack spacing={6}>
            {post.comments.map((comment) => (
              <UserComment key={comment.id} comment={comment} />
            ))}
          </VStack>
        </Collapse>
      </Flex>
    </Box>
  );
}

export default PostCard;
