import {
  Box,
  Button,
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
} from '@chakra-ui/react';
import {Post, User} from '../types';
import {useRef} from 'react';

import {BsChevronDown} from 'react-icons/bs';

interface PostEditProps {
  post: Post;
  users: User[] | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Post) => void;
}

function PostEdit({post, users, isOpen, onClose, onSubmit}: PostEditProps) {
  const color = useColorModeValue('light', 'dark');

  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const userRef = useRef<HTMLSelectElement>(null);

  const submitHandler = () => {
    const newPost = {
      ...post,
      title: titleRef.current?.value || post.title,
      body: bodyRef.current?.value || post.body,
      userId: Number(userRef.current?.selectedOptions[0].value) || post.userId,
    };
    onSubmit(newPost);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} size={'md'}>
      <DrawerOverlay />
      <DrawerContent bgColor={color}>
        <DrawerCloseButton />
        <DrawerHeader fontFamily={'Prosto One'} fontSize={30}>
          Post editing
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing={4}>
            <Box>
              <FormLabel htmlFor='author'>Author</FormLabel>

              <Select
                disabled={!users}
                icon={!users ? <Spinner /> : <Icon as={BsChevronDown} />}
                ref={userRef}
                defaultValue={post.userId}
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
                defaultValue={post.title}
                ref={titleRef}
              />
            </Box>
            <Box>
              <FormLabel htmlFor='text'>Text</FormLabel>
              <Textarea
                variant={'outline'}
                id='text'
                placeholder='Please enter post text'
                defaultValue={post.body}
                ref={bodyRef}
              />
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter justifyContent={'flex-start'}>
          <Button onClick={submitHandler} size={'md'}>
            Save
          </Button>
          <Button variant={'outline'} onClick={onClose} size={'md'}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default PostEdit;
