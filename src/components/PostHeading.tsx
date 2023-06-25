import {Heading, HeadingProps, useColorModeValue} from '@chakra-ui/react';
import {useState} from 'react';

function PostHeading({children, ...props}: HeadingProps) {
  const [isHovering, setIsHovering] = useState(false);
  const color = useColorModeValue('yellow.300', 'yellow.500');

  return (
    <Heading
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      position={'relative'}
      _before={{
        content: "''",
        backgroundColor: color,
        width: isHovering ? '100%' : '0',
        height: '100%',
        position: 'absolute',
        zIndex: '-1',
        filter: `url(#marker-shape)`,
        left: '-0.25em',
        top: '0.1em',
        transition: 'width 0.5s',
        transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      }}
      {...props}
    >
      {children}
    </Heading>
  );
}

export default PostHeading;
