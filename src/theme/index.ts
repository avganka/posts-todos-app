import {StyleFunctionProps, extendTheme} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';

export const theme = extendTheme({
  colors: {
    black: '#000000',
    white: '#FDFBF5',
  },
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Prosto One, serif',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode('#000000', '#FDFBF5')(props),
        //bg: mode('#FDFBF5', props.theme.semanticTokens.colors['chakra-body-bg'].dark)(props),
        bg: mode('#FDFBF5', '#333333')(props),
      },
    }),
  },
});
