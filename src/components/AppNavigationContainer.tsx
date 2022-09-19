import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useRef } from 'react';
import metrics from '../utils/metrics';

interface AppNavigationContainerProps {
  children: React.ReactNode;
}

const AppNavigationContainer: React.FC<AppNavigationContainerProps> = ({
  children,
}) => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK
          await metrics.setCurrentScreen(currentRouteName ?? 'UNKNOWN');
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
    >
      {children}
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
