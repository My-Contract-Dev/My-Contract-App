import { useCallback, useMemo } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Card, SkeletonView, Text, View } from 'react-native-ui-lib';
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
      return '$ ' + formatNumber(contract.valueInUsd, { precision: 0 });
    }
    return '';
  }, [contract.valueInUsd]);

  const formattedCallsValue = useMemo(() => {
    if (contract.calls !== undefined) {
      return formatNumber(contract.calls, { precision: 0, compact: true });
    }
    return '';
  }, [contract.calls]);

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

  const showSkeleton =
    contract.valueInUsd === undefined || contract.calls === undefined;

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
    <Swipeable
      containerStyle={{ overflow: 'visible' }}
      renderRightActions={renderDeleteButton}
    >
      <Card style={styles.container}>
        <TouchableOpacity onPress={onClick} activeOpacity={0.75}>
          <View style={styles.content}>
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
          </View>
          <View style={styles.hr} />
          <View style={styles.footer}>
            <View marginR-16 style={styles.metricItem}>
              <Text disabled body medium>
                {formattedCallsValue}
              </Text>
              {showSkeleton && (
                <SkeletonView height={16} marginR-6 width={32} />
              )}
              <Text disabled body>
                {' '}
                calls
              </Text>
            </View>
            <View style={styles.metricItem}>
              {showSkeleton && (
                <SkeletonView height={16} marginR-6 width={40} />
              )}
              <Text disabled body medium>
                {formattedValue}
              </Text>
              <Text disabled body>
                {' '}
                balance
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    elevation: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hr: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  metric: {
    marginLeft: 16,
  },
  metricItem: {
    flexDirection: 'row',
  },
});
