import {Flex, Icon, useColorModeValue} from '@chakra-ui/react';
import {PropsWithChildren} from 'react';
import {BsExclamationCircle} from 'react-icons/bs';

function Toast({children}: PropsWithChildren) {
  const bg = useColorModeValue('dark', 'light');
  const color = useColorModeValue('light', 'dark');
  return (
    <Flex alignItems={'center'} borderColor={color} bgColor={bg} color={color} p={3}>
      <Icon mr={2} as={BsExclamationCircle} />
      {children}
    </Flex>
  );
}

export default Toast;
