import {StarIcon} from '@chakra-ui/icons';
import {Badge, Box, Button} from '@chakra-ui/react';
import axios from 'axios';
import {useEffect, useState} from 'react';

function PostCard() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      const {data} = await axios('');
    };
  });

  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {'dddd'}
          </Box>
        </Box>

        <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
          'title'
        </Box>

        <Box>
          '123123'
          <Box as='span' color='gray.600' fontSize='sm'>
            / wk
          </Box>
        </Box>

        <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon key={i} />
            ))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            20 reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PostCard;
