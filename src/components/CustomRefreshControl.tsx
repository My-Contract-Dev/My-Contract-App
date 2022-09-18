import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

interface CustomRefreshControlProps {
  refreshing: boolean;
  style: StyleProp<ViewStyle>;
}

const CustomRefreshControl: React.FC<CustomRefreshControlProps> = ({
  refreshing,
  style,
}) => {
  return (
    <Animated.View style={[style, styles.container]}>
      <ActivityIndicator animating={refreshing} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
});

export default CustomRefreshControl;
