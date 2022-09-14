import { useCallback, useMemo } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Text, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';

import { ContractInterface } from '../../models';
import { removeContract } from '../../store';
import { formatNumber, randomColor, randomEmoji } from '../../utils';
import { formatHash } from '../../utils/formatHash';

interface ContractListItemProps {
  contract: ContractInterface;
}

export const ContractListItem: React.FC<ContractListItemProps> = ({
  contract,
}) => {
  const dispatch = useDispatch();
  const address = useMemo(
    () => formatHash(contract.address),
    [contract.address]
  );
  const value = useMemo(() => {
    return formatNumber(6342);
  }, []);

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
      <TouchableOpacity activeOpacity={0.75} style={styles.container}>
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: contractColor,
            },
          ]}
          marginR-24
        >
          <View style={styles.labelContainer}>
            <View style={styles.label}>
              <Text smallCaption bold numberOfLines={1}>
                NFT
              </Text>
            </View>
          </View>
          <Text style={styles.avatarEmoji}>{contractEmoji}</Text>
        </View>
        <View flex-1>
          <Text body>{contract.name ?? address}</Text>
          {contract.name && (
            <Text body disabled>
              {address}
            </Text>
          )}
        </View>
        <Text subtitle>$ {value}</Text>
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
    shadowRadius: 6,
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
    backgroundColor: '#E4ACFF',
    borderRadius: 6,
  },
});
