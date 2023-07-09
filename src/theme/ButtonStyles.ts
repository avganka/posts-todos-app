import {StyleFunctionProps, defineStyleConfig} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 100,
    letterSpacing: 1,
    textTransform: 'uppercase',
    borderRadius: 'base',
    border: '1px solid',
    _active: {
      bg: 'darkHover',
      color: 'dark',
    },
  },
  variants: {
    solid: (props: StyleFunctionProps) => ({
      color: mode('light', 'dark')(props),
      bg: mode('dark', 'light')(props),
      borderColor: mode('dark', 'light')(props),
      _hover: {
        bg: mode('light', 'dark')(props),
        color: mode('dark', 'light')(props),
      },
      _active: {
        bg: 'darkHover',
        color: 'dark',
      },
    }),
    outline: (props: StyleFunctionProps) => ({
      borderColor: mode('dark', 'light')(props),
      _hover: {
        bg: mode('dark', 'light')(props),
        color: mode('light', 'dark')(props),
      },
      _active: {
        bg: 'darkHover',
        color: 'dark',
      },
    }),
    ghost: (props: StyleFunctionProps) => ({
      border: 'none',
      _hover: {
        bg: mode('darkHover', 'light')(props),
        color: 'dark',
      },
      _active: {
        bg: 'darkHover',
        color: 'dark',
      },
    }),
  },
  defaultProps: {
    size: 'sm',
    variant: 'solid',
  },
});
