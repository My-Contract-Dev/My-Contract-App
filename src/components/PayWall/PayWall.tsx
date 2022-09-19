import AnimatedLottieView from 'lottie-react-native';
import { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Modal, Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { hidePaywall, RootState } from '../../store';

const PayWall: React.FC = () => {
  const dispatch = useDispatch();
  const { visible, label } = useSelector((state: RootState) => state.paywall);
  const [isLoading, setIsLoading] = useState(false);

  const onClose = useCallback(() => {
    dispatch(hidePaywall());
  }, [dispatch]);

  const onSubscribe = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 2000);
  }, [onClose, setIsLoading]);

  return (
    <Modal visible={visible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text center h3 marginT-32>
            Not yet available
          </Text>
          <Text marginT-16 body center>
            Sorry, {label} available only for premium users.
          </Text>
          <Text marginT-16 body center>
            Please, subscribe to be the first to know when the premium version
            will become available.
          </Text>
        </View>
        <View style={styles.animationContainer}>
          <AnimatedLottieView
            source={require('./animation.json')}
            style={styles.animation}
            autoPlay
            loop
          />
        </View>
        <View style={styles.footer}>
          <Button
            onPress={onSubscribe}
            style={styles.buttons}
            outline
            label="Subscribe"
            disabled={isLoading}
          />
          <Button onPress={onClose} style={styles.buttons} label="Got it" />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    // justifyContent: 'space-between',
    marginHorizontal: 32,
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 16,
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttons: {
    width: '100%',
    marginTop: 16,
  },
  animation: {
    width: '60%',
  },
  animationContainer: {
    alignItems: 'center',
  },
});

export default PayWall;
