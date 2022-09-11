import { StyleProp, StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { useDimensions } from '../hooks/useDimensions';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import {
  AnimateStyle,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

  const animatedStyles = useAnimatedStyle(() => {
    return {
      paddingTop: animationPosition.value * safeArea.top,
    };
  }, [safeArea.top]);

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
        // animatedPosition={animationPosition}
        animatedIndex={animationPosition}
        {...bottomSheetProps}
        ref={(current) => (bsRef.current = current ?? undefined)}
        handleComponent={() => <View />}
        snapPoints={[initialSnapPoint, '100%']}
        backgroundComponent={({ style }) => (
          <View style={[styles.bottomSheet, style]} />
        )}
      >
        {bottomSheetChildren(animatedStyles)}
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
    backgroundColor: '#fff',
  },
});
