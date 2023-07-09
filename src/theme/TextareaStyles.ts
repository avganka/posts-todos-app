import {StyleFunctionProps, defineStyleConfig} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';

export const Textarea = defineStyleConfig({
  baseStyle: {
    borderColor: 'dark',
  },
  variants: {
    outline: (props: StyleFunctionProps) => ({
      _placeholder: {
        color: mode('blackAlpha.600', 'whiteAlpha.600')(props),
      },
      _focusVisible: {
        borderColor: 'yellow.500',
        boxShadow: '0 0 0 2px var(--chakra-colors-yellow-500)',
      },
      _hover: {
        borderColor: mode('dark', 'light')(props),
      },
    }),
  },

  defaultProps: {
    variant: 'outline',
  },
});
