import {StyleFunctionProps, extendTheme} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';
import {Button} from './ButtonStyles';

export const theme = extendTheme({
  colors: {
    dark: '#333333',
    darkHover: '#ebebeb',
    light: '#FDFBF5',
    lightHover: '',
  },
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Prosto One, serif',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  components: {
    Button,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode('dark', 'light')(props),
        bg: mode('light', 'dark')(props),
      },
    }),
  },
});
