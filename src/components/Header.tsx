import {Box, Center, Divider, Flex, Link, Text} from '@chakra-ui/react';
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
  return (
    <Box as='header' borderBottom={'1px'} py={{base: '4', sm: '6'}}>
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        gap={{base: '4', sm: '12'}}
        flexWrap={'wrap'}
      >
        {MENU.map(({name, url}, index, arr) => (
          <>
            <Link
              key={url}
              as={ReactRouterLink}
              to={url}
              width={{base: 'full', sm: 'auto'}}
              textAlign={'center'}
              textTransform={'uppercase'}
              textUnderlineOffset={4}
              _activeLink={{fontWeight: 700, textDecoration: 'underline'}}
            >
              {name}
            </Link>
            {index !== arr.length - 1 && (
              <Center height={6} display={{base: 'none', sm: 'block'}}>
                <Divider orientation='vertical' borderColor={'text'} />
              </Center>
            )}
          </>
        ))}
      </Flex>
    </Box>
  );
}

export default Header;
