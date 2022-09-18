import AnimatedLottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';

interface ErrorPlaceholderProps {
  title: string;
  onRetry?: () => void;
}

export const ErrorPlaceholder: React.FC<ErrorPlaceholderProps> = ({
  title,
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <Text h3 marginT-24>
        {title}
      </Text>
      <AnimatedLottieView
        source={require('./ufo.json')}
        autoPlay
        style={styles.animation}
      />
      {onRetry && (
        <Button marginT-16 outline style={styles.cta} label="Retry" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  animation: {
    width: '50%',
  },
  cta: {
    minWidth: 260,
  },
});
