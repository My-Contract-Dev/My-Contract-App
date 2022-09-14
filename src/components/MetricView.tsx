import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { formatNumber } from '../utils';

interface MetricViewProps {
  size: 'big' | 'medium';
  value: number;
  caption: string;
  units?: string;
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
}

const MetricView: React.FC<MetricViewProps> = ({
  value,
  caption,
  units,
  size,
  style,
  compact = true,
}) => {
  return (
    <View style={[style, styles.container]}>
      <Text
        {...{
          h1: size === 'big',
          h2: size === 'medium',
          bold: size === 'big',
          medium: size === 'medium',
          // primaryLight: size !== 'big',
        }}
      >
        {[units, formatNumber(value, { compact })].filter(Boolean).join(' ')}
      </Text>
      <Text primaryLight caption>
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
