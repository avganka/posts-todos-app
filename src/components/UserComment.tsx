import {Comment} from '../types';
import {Box, Flex, Text, useColorModeValue} from '@chakra-ui/react';

function UserComment({comment}: {comment: Comment}) {
  const color = useColorModeValue('blackAlpha.600', 'whiteAlpha.600');
  return (
    <Box
      pb={4}
      _notLast={{
        borderBottom: '1px solid',
      }}
    >
      <Flex columnGap={4} alignItems={'baseline'} mb={2} flexWrap={'wrap'}>
        <Text fontWeight='semibold' letterSpacing='wide' fontSize='md' fontFamily={'Prosto One'}>
          {comment.name}
        </Text>
        <Text color={color} textTransform='lowercase'>
          {comment.email}
        </Text>
      </Flex>
      <Box pl={4} fontStyle={'italic'}>
        {comment.body}
      </Box>
    </Box>
  );
}

export default UserComment;
