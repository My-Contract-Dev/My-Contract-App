import { ReactElement, useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, View } from 'react-native';

interface WithFontsProps {
  children: ReactElement;
}

const WithFonts: React.FC<WithFontsProps> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    'Rubik-Black': require('../../assets/fonts/rubik/Rubik-Black.ttf'),
    'Rubik-BlackItalic': require('../../assets/fonts/rubik/Rubik-BlackItalic.ttf'),
    'Rubik-Bold': require('../../assets/fonts/rubik/Rubik-Bold.ttf'),
    'Rubik-BoldItalic': require('../../assets/fonts/rubik/Rubik-BoldItalic.ttf'),
    'Rubik-ExtraBold': require('../../assets/fonts/rubik/Rubik-ExtraBold.ttf'),
    'Rubik-ExtraBoldItalic': require('../../assets/fonts/rubik/Rubik-ExtraBoldItalic.ttf'),
    'Rubik-Italic': require('../../assets/fonts/rubik/Rubik-Italic.ttf'),
    'Rubik-Light': require('../../assets/fonts/rubik/Rubik-Light.ttf'),
    'Rubik-LightItalic': require('../../assets/fonts/rubik/Rubik-LightItalic.ttf'),
    'Rubik-Medium': require('../../assets/fonts/rubik/Rubik-Medium.ttf'),
    'Rubik-MediumItalic': require('../../assets/fonts/rubik/Rubik-MediumItalic.ttf'),
    'Rubik-Regular': require('../../assets/fonts/rubik/Rubik-Regular.ttf'),
    'Rubik-SemiBold': require('../../assets/fonts/rubik/Rubik-SemiBold.ttf'),
    'Rubik-SemiBoldItalic': require('../../assets/fonts/rubik/Rubik-Black.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WithFonts;
