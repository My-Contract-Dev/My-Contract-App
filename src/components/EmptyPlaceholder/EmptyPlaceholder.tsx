import AnimatedLottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

interface EmptyPlaceholderProps {
  label: string;
}

export const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({
  label,
}) => (
  <View style={styles.container} marginT-24>
    <Text h3 marginB-16>
      {label}
    </Text>
    <AnimatedLottieView
      autoPlay
      style={styles.animation}
      source={require('./animation.json')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  animation: {
    width: '50%',
  },
});
