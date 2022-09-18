import { RefreshControl, StyleProp, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useDerivedValue,
} from 'react-native-reanimated';
import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { debounce } from 'lodash';
import CustomRefreshControl from '../CustomRefreshControl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, startRefreshing, stopRefreshing } from '../../store';

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
  const dispatch = useDispatch();
  const isRefreshing = useSelector(
    (state: RootState) => state.refreshing.refreshing
  );
  const animationPosition = useSharedValue(0);
  const [headerSize, setHeaderSize] = useState(0);
  const [initialSnapPoint, setInitialSnapPoint] = useState(1);
  const bsRef = useRef<BottomSheetMethods | null>();
  const dimensions = useDimensions();
  const safeArea = useSafeAreaInsets();
  const roundedHeaderSize = useMemo(
    () => Math.round(headerSize / 10) * 10,
    [headerSize]
  );

  const runRefresh = useCallback(() => {
    dispatch(startRefreshing());
    setTimeout(() => dispatch(stopRefreshing()), 2000);
  }, [dispatch]);

  useDerivedValue(() => {
    if (animationPosition.value === -1) {
      return;
    }
    if (!isRefreshing && animationPosition.value <= -0.05) {
      runOnJS(runRefresh)();
    }
  }, [animationPosition.value, dispatch, isRefreshing]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateBottomSheet = useCallback(
    debounce(
      (value: number) => {
        setInitialSnapPoint(value);
      },
      50,
      { maxWait: 500 }
    ),
    [setInitialSnapPoint]
  );

  useEffect(() => {
    updateBottomSheet(dimensions.screen.height - headerSize - 20);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundedHeaderSize, dimensions.screen.height, updateBottomSheet]);

  const containerStyle = useAnimatedStyle(() => {
    return {
      paddingTop: 16 + animationPosition.value * safeArea.top,
    };
  }, [safeArea.top]);

  const refreshControlStyle = useAnimatedStyle(() => {
    const offset = interpolate(
      animationPosition.value,
      [-0.1, -0.04, 0, 1],
      [safeArea.top + 10, safeArea.top, -20, -20]
    );
    return {
      transform: [
        {
          translateY: offset,
        },
      ],
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
      <CustomRefreshControl
        refreshing
        style={[styles.refreshControl, refreshControlStyle]}
      />
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
  refreshControl: {
    position: 'absolute',
    top: 0,
  },
  container: {
    flex: 1,
  },
  bottomSheet: {
    borderRadius: 0,
    marginTop: 18,
    backgroundColor: '#fff',
  },
});
