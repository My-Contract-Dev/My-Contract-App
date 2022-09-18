import { BarCodeScanner, BarCodeScannedCallback } from 'expo-barcode-scanner';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

interface ScanQrProps {
  onDetected: (data: string) => void;
}

export const ScanQr: React.FC<ScanQrProps> = ({ onDetected }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = ({ data }) => {
    if (data.startsWith('0x') && data.length === 42) {
      setScanned(true);
      onDetected(data.toLocaleLowerCase());
    }
  };

  const renderContent = useCallback(() => {
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    );
  }, [handleBarCodeScanned, hasPermission, scanned]);

  return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -24,
  },
});
