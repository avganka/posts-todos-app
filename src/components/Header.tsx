import {Box, Button, Flex, Icon, Link, useColorMode} from '@chakra-ui/react';
import {BsMoonFill, BsSunFill} from 'react-icons/bs';
import {NavLink as ReactRouterLink} from 'react-router-dom';

const MENU = [
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Albums',
    url: '/albums',
  },
  {
    name: 'Todos',
    url: '/todos',
  },
];

function Header() {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Box as='header' borderBottom={'1px'} py={{base: '4', sm: '6'}}>
      <Flex columnGap={4}>
        <Flex
          ml={14}
          flexGrow={1}
          alignItems={'center'}
          justifyContent={'center'}
          rowGap={{base: '4', sm: '12'}}
          flexWrap={'wrap'}
        >
          {MENU.map(({name, url}) => (
            <Link
              px={6}
              key={url}
              as={ReactRouterLink}
              to={url}
              width={{base: 'full', sm: 'auto'}}
              textAlign={'center'}
              textTransform={'uppercase'}
              textUnderlineOffset={4}
              _activeLink={{fontWeight: 700, textDecoration: 'underline'}}
              borderRight={{base: 'none', sm: '1px solid'}}
              _last={{
                border: 'none',
              }}
            >
              {name}
            </Link>
          ))}
        </Flex>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <Icon as={BsMoonFill} /> : <Icon as={BsSunFill} />}
        </Button>
      </Flex>
    </Box>
  );
}

export default Header;
