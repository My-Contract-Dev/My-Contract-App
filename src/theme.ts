import { TextStyle } from 'react-native';
import { Colors, Typography } from 'react-native-ui-lib';

enum FontFamilies {
  regular = 'Rubik-Regular',
  bold = 'Rubik-Bold',
  medium = 'Rubik-Medium',
}

Colors.loadColors({
  primary: '#4E2F75',
  primaryLight: '#8265A7',
  disabled: '#808080',
  red: '#FF0000',
});

const defaultTextStyles: TextStyle = {
  color: '#4E2F75',
};

Typography.loadTypographies({
  h1: {
    ...defaultTextStyles,
    fontSize: 64,
  },
  h2: {
    ...defaultTextStyles,
    fontSize: 40,
  },
  subtitle: {
    ...defaultTextStyles,
    fontSize: 20,
  },
  body: {
    ...defaultTextStyles,
    fontFamily: FontFamilies.regular,
    fontSize: 16,
  },
  caption: {
    ...defaultTextStyles,
    fontSize: 14,
  },
  smallCaption: {
    ...defaultTextStyles,
    fontSize: 8,
  },
  bold: {
    ...defaultTextStyles,
    fontFamily: FontFamilies.bold,
  },
  medium: {
    ...defaultTextStyles,
    fontFamily: FontFamilies.medium,
  },
} as Record<string, TextStyle>);
