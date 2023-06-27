import {StyleFunctionProps, extendTheme} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';
import {Button} from './ButtonStyles';
import {Input} from './InputStyles';

export const theme = extendTheme({
  colors: {
    dark: '#333333',
    darkHover: '#ebebeb',
    light: '#FDFBF5',
    lightHover: '',

    primary: {
      500: '#333333',
    },
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
    Input,
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
