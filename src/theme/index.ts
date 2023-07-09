import {Button} from './ButtonStyles';
import {Input} from './InputStyles';
import {Select} from './SelectStyles';
import {Textarea} from './TextareaStyles';
import {StyleFunctionProps, extendTheme} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';

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
    Textarea,
    Select,
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
