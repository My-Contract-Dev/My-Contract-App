import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ScreenWrapperProps {
  children: React.ReactNode;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
  return (
    <LinearGradient
      start={{
        x: 0.2,
        y: 0.4,
      }}
      end={{
        x: 0.8,
        y: 0.6,
      }}
      style={styles.container}
      colors={['#FDDED5', '#FFF5E8']}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
