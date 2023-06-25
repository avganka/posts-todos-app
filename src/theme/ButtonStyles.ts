import {StyleFunctionProps, defineStyleConfig} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';

export const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    //fontFamily: 'Prosto One',
    fontWeight: 100,
    letterSpacing: 1,
    textTransform: 'uppercase',
    borderRadius: 'base',
  },
  variants: {
    solid: (props: StyleFunctionProps) => ({
      color: mode('light', 'dark')(props),
      bg: mode('dark', 'light')(props),
      border: '1px solid',
      borderColor: mode('dark', 'light')(props),
      _hover: {
        bg: mode('light', 'dark')(props),
        color: mode('dark', 'light')(props),
      },
    }),

    //outline: (props: StyleFunctionProps) => ({
    //  color: 'light',
    //  bg: mode('dark', 'transparent')(props),
    //  border: '1px solid',
    //  borderColor: mode('dark', 'light')(props),
    //  _hover: {
    //    bg: mode('transparent', 'light')(props),
    //    color: 'dark',
    //  },
    //}),
  },

  defaultProps: {
    size: 'sm',
    variant: 'solid',
  },
});
