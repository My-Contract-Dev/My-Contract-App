import { useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { formatNumber } from '../utils';

interface MetricViewProps {
  size: 'big' | 'medium' | 'small';
  value?: number;
  caption: string;
  units?: string;
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
  round?: boolean;
}

const MetricView: React.FC<MetricViewProps> = ({
  value,
  caption,
  units,
  size,
  style,
  compact = true,
  round = true,
}) => {
  const formattedValue = useMemo(() => {
    if (value === undefined) {
      return '...';
    }
    let preparedValue = value;
    if (round) {
      preparedValue = Math.round(preparedValue);
    }
    return formatNumber(preparedValue, { compact });
  }, [value, compact, round]);
  return (
    <View style={[style, styles.container]}>
      <Text
        {...{
          h1: size === 'big',
          h3: size === 'medium',
          body: size === 'small',
          bold: size === 'big',
          medium: size === 'medium',
        }}
        primary
      >
        {[units, formattedValue].filter(Boolean).join(' ')}
      </Text>
      <Text
        primaryLight
        {...{
          caption: size === 'medium',
          body: size === 'big',
        }}
      >
        {caption}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
});

export default MetricView;
