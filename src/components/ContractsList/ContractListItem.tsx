import { useCallback, useMemo } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Text, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';

import { RichContract } from '../../models';
import { removeContract } from '../../store';
import { formatNumber, randomColor, randomEmoji } from '../../utils';

interface ContractListItemProps {
  contract: RichContract;
  onClick: () => void;
  valueInUsd?: number;
}

export const ContractListItem: React.FC<ContractListItemProps> = ({
  contract,
  onClick,
}) => {
  const dispatch = useDispatch();
  const formattedValue = useMemo(() => {
    if (contract.valueInUsd !== undefined) {
      return formatNumber(contract.valueInUsd, { precision: 0 });
    }
    return '...';
  }, [contract.valueInUsd]);

  const onDelete = useCallback(() => {
    dispatch(removeContract(contract));
  }, [dispatch, contract]);

  const contractColor = useMemo(
    () => randomColor(contract.address),
    [contract.address]
  );
  const contractEmoji = useMemo(
    () => randomEmoji(contract.address),
    [contract.address]
  );

  const renderDeleteButton = useCallback(
    (p: Animated.AnimatedInterpolation, d: Animated.AnimatedInterpolation) => {
      const width = 80;
      const padding = 16;
      const offset = d.interpolate({
        inputRange: [-(81 + padding), -(80 + padding), 0, 1],
        outputRange: [0, 0, width + padding, width + padding],
      });
      return (
        <Animated.View
          style={{
            transform: [{ translateX: offset }],
            width: width + padding,
            flexDirection: 'column',
          }}
        >
          <TouchableOpacity
            onPress={onDelete}
            style={{
              flex: 1,
              width,
              justifyContent: 'center',
            }}
          >
            <Text body medium red center>
              Delete
            </Text>
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [onDelete]
  );

  return (
    <Swipeable renderRightActions={renderDeleteButton}>
      <TouchableOpacity
        onPress={onClick}
        activeOpacity={0.75}
        style={styles.container}
      >
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: contractColor,
            },
          ]}
          marginR-16
        >
          {contract.label && (
            <View
              style={[
                styles.labelContainer,
                {
                  backgroundColor: contract.label.color,
                },
              ]}
            >
              <View style={styles.label}>
                <Text smallCaption bold numberOfLines={1}>
                  {contract.label.text}
                </Text>
              </View>
            </View>
          )}
          <Text style={styles.avatarEmoji}>{contractEmoji}</Text>
        </View>
        <View flex-1 marginR-16>
          <Text numberOfLines={1} ellipsizeMode="tail" body>
            {contract.name ?? contract.address}
          </Text>
          {contract.name && (
            <Text numberOfLines={1} ellipsizeMode="tail" body disabled>
              {contract.address}
            </Text>
          )}
        </View>
        <Text subtitle>$ {formattedValue}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 48,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  labelContainer: {
    alignItems: 'center',
    position: 'absolute',
    width: 48,
    top: 2,
    left: '-50%',
  },
  label: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
});
