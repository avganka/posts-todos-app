import {StyleFunctionProps, defineStyleConfig} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';

export const Input = defineStyleConfig({
  // The styles all button have in common
  //baseStyle: {
  //  fontWeight: 100,
  //  letterSpacing: 1,
  //  textTransform: 'uppercase',
  //  borderRadius: 'base',
  //},
  variants: {
    outline: (props: StyleFunctionProps) => ({
      borderColor: mode('dark', 'light')(props),
      //bg: mode('dark', 'light')(props),
      //border: '1px solid',

      //_hover: {
      //  bg: mode('light', 'dark')(props),
      //  color: mode('dark', 'light')(props),
      //},
    }),
  },

  defaultProps: {
    variant: 'outline',
  },
});
