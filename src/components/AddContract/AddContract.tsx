import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View } from 'react-native-ui-lib';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {
  addContract,
  hideAddContract,
  RootState,
  showAddContract,
} from '../../store';
import { formatHash } from '../../utils/formatHash';
import { ScanQr } from './ScanQr';

interface AddContractProps {
  onAdded: (address: string) => void;
}

const AddContract: React.FC<AddContractProps> = ({ onAdded }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [qrVisible, setQrVisible] = useState(false);

  const isValid = useMemo(() => {
    return text.startsWith('0x') && text.length === 42;
  }, [text]);

  const contractsList = useSelector(
    (state: RootState) => state.contractsList.contracts
  );
  const canCancel = contractsList.length > 0;
  const addContractState = useSelector((state: RootState) => state.addContract);

  useEffect(() => {
    if (contractsList.length === 0) {
      dispatch(showAddContract());
    }
  }, [dispatch, contractsList.length]);

  const onCancel = useCallback(() => {
    if (qrVisible) {
      setQrVisible(false);
    } else {
      dispatch(hideAddContract());
    }
  }, [dispatch, qrVisible]);

  const onScan = useCallback(() => {
    setQrVisible(true);
  }, [setQrVisible]);

  const addAddress = useCallback(
    (address: string) => {
      dispatch(
        addContract({
          address,
          chainId: 9001,
        })
      );
      onAdded(address);
      dispatch(hideAddContract());
    },
    [dispatch, onAdded]
  );

  const onAddExample = useCallback(() => {
    addAddress('0xb5b9e3fefb86255e6a7e04fd8e2fc98757a4aa4f');
  }, [addAddress]);

  const onQrDetected = useCallback(
    (data: string) => {
      addAddress(data);
    },
    [addAddress]
  );

  if (!addContractState.visible) {
    return <View />;
  }

  return (
    <BottomSheet
      keyboardBehavior="extend"
      snapPoints={['90%']}
      backdropComponent={({ style, ...props }) => (
        <View {...props} style={[style, styles.backdrop]} />
      )}
      footerComponent={() => (
        <SafeAreaView style={[styles.footer, {}]}>
          {text.length > 0 && (
            <Button
              disabled={!isValid}
              onPress={onCancel}
              label={isValid ? 'Add' : 'Please enter valid address'}
            />
          )}
          {text.length === 0 && !qrVisible && (
            <React.Fragment>
              <Button onPress={onAddExample} link label="Add example address" />
              <Button marginT-16 onPress={onScan} label="Scan QR" />
            </React.Fragment>
          )}
          {(canCancel || qrVisible) && (
            <Button marginT-8 outline onPress={onCancel} label="Cancel" />
          )}
        </SafeAreaView>
      )}
    >
      <View style={styles.container}>
        <Text h3 center marginT-16>
          Add new address
        </Text>
        <View marginT-16 style={{ flex: 1 }}>
          {!qrVisible && (
            <BottomSheetTextInput
              autoFocus
              onChangeText={setText}
              value={text}
              textAlign="center"
              placeholder='Address, e.g. "0x1234..."'
              multiline
              style={{
                fontSize: 18,
              }}
            />
          )}
          {qrVisible && <ScanQr onDetected={onQrDetected} />}
        </View>
      </View>
    </BottomSheet>
  );
};

export const AddContractContainer = () => {
  const onAdded = useCallback((address: string) => {
    Toast.show({
      autoHide: true,
      text1: 'Contract added',
      text2: `Contract with address ${formatHash(address)} added`,
      type: 'success',
      position: 'top',
    });
    ReactNativeHapticFeedback.trigger('impactHeavy');
  }, []);

  return (
    <React.Fragment>
      <AddContract onAdded={onAdded} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'black',
    opacity: 0.7,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  footer: {
    paddingHorizontal: 24,
  },
  toast: {
    padding: 40,
    marginTop: 20,
  },
  toastContainer: {
    backgroundColor: 'white',
    paddingTop: 20,
  },
  toastMessageStyle: {
    padding: 30,
  },
});
