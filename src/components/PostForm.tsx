import {Post, User} from '../types';
import {useFetchData} from '../hooks/useFetchData';
import {getUsersRoute} from '../api/apiRoutes';
import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Icon,
  Input,
  Select,
  Spinner,
  Stack,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {ReactNode, useEffect, useRef} from 'react';
import {BsChevronDown} from 'react-icons/bs';

interface PostFormProps extends ButtonProps {
  children: ReactNode;
  title: string;
  post?: Post;
  onPostAdd?: (post: Omit<Post, 'id'>) => void;
  onPostEdit?: (post: Post) => void;
}

function PostForm({post, onPostAdd, onPostEdit, children, title, ...props}: PostFormProps) {
  const color = useColorModeValue('light', 'dark');

  const {isOpen, onOpen, onClose} = useDisclosure();

  const toast = useToast();

  const [{data: users, loading}, fetchUsers] = useFetchData<User[]>(getUsersRoute());

  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const userRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen, fetchUsers]);

  const findUser = (userId: number) => users?.find((user) => user.id === userId);

  const getValueFromRef = (
    ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => (ref.current?.value ? ref.current.value : '');

  const onSavePost = () => {
    if (!users) {
      toast({
        title: `Failed to fetch users`,
        position: 'bottom-left',
        status: 'error',
      });
      return;
    }

    const userId = Number(getValueFromRef(userRef));

    const newPost = {
      title: getValueFromRef(titleRef),
      body: getValueFromRef(bodyRef),
      user: findUser(userId) ?? users[0],
      userId: userId ?? 1,
    };

    if (onPostEdit && post) {
      onPostEdit({...post, ...newPost});
    }

    if (onPostAdd) {
      onPostAdd(newPost);
    }
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} {...props}>
        {children}
      </Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent bgColor={color}>
          <DrawerCloseButton />
          <DrawerHeader fontFamily={'Prosto One'} fontSize={30}>
            {title}
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing={4}>
              <Box>
                <FormLabel htmlFor='author'>Author</FormLabel>

                <Select
                  disabled={loading}
                  icon={loading ? <Spinner /> : <Icon as={BsChevronDown} />}
                  ref={userRef}
                  defaultValue={post ? post.userId : ''}
                >
                  {users
                    ? users?.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))
                    : null}
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input
                  variant={'outline'}
                  id='name'
                  placeholder='Please enter post name'
                  ref={titleRef}
                  defaultValue={post ? post.title : ''}
                />
              </Box>
              <Box>
                <FormLabel htmlFor='text'>Text</FormLabel>
                <Textarea
                  variant={'outline'}
                  id='text'
                  rows={6}
                  placeholder='Please enter post text'
                  ref={bodyRef}
                  defaultValue={post ? post.body : ''}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter justifyContent={'flex-start'}>
            <ButtonGroup spacing={4}>
              <Button onClick={onSavePost} size={'md'}>
                Save
              </Button>
              <Button variant={'outline'} onClick={onClose} size={'md'}>
                Cancel
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default PostForm;
