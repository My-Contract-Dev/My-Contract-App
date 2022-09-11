import { StyleProp, StyleSheet, View } from 'react-native';
import Animated, { interpolateColor } from 'react-native-reanimated';
import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { useDimensions } from '../../hooks/useDimensions';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import {
  AnimateStyle,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import divider from './divider.svg';
import { SvgXml } from 'react-native-svg';

type SuperScrollProps = {
  children: React.ReactNode;
  bottomSheetChildren: (
    style: StyleProp<AnimateStyle<unknown>>
  ) => React.ReactElement;
  bottomSheetProps?: Omit<BottomSheetProps, 'snapPoints' | 'children'>;
};

export const SuperScroll: React.FC<SuperScrollProps> = ({
  children,
  bottomSheetChildren,
  bottomSheetProps,
}) => {
  const animationPosition = useSharedValue(0);
  const [headerSize, setHeaderSize] = useState(0);
  const [initialSnapPoint, setInitialSnapPoint] = useState(1);
  const bsRef = useRef<BottomSheetMethods | null>();
  const dimensions = useDimensions();
  const safeArea = useSafeAreaInsets();

  useEffect(() => {
    setInitialSnapPoint(dimensions.screen.height - headerSize - 20);
  }, [headerSize, dimensions]);

  const containerStyle = useAnimatedStyle(() => {
    return {
      paddingTop: 16 + animationPosition.value * safeArea.top,
    };
  }, [safeArea.top]);

  const handlerStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animationPosition.value,
      [0, 1],
      ['#FFFFFF00', '#FFFFFF']
    ),
  }));

  return (
    <View style={styles.container}>
      <View
        onLayout={(event) => {
          setHeaderSize(event.nativeEvent.layout.height);
        }}
      >
        {children}
      </View>
      <BottomSheet
        animatedIndex={animationPosition}
        {...bottomSheetProps}
        ref={(current) => (bsRef.current = current ?? undefined)}
        handleComponent={() => (
          <Animated.View style={[handlerStyles]}>
            <SvgXml xml={divider} />
          </Animated.View>
        )}
        snapPoints={[initialSnapPoint, '100%']}
        backgroundComponent={({ style }) => (
          <View style={[styles.bottomSheet, style]} />
        )}
      >
        {bottomSheetChildren(containerStyle)}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    borderRadius: 0,
    marginTop: 18,
    backgroundColor: '#fff',
  },
});
