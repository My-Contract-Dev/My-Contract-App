import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export const useDimensions = () => {
  const window = Dimensions.get('window');
  const screen = Dimensions.get('screen');
  const [dimensions, setDimensions] = useState({ window, screen });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  return dimensions;
};
