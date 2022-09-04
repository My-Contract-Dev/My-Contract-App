import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useCallback } from "react";
import { Button, Text } from "react-native"

export const ConnectButton = () => {
    const connector = useWalletConnect();
    const onConnect = useCallback(() => {
        connector.connect();
    }, [connector]);

    if (!connector.connected) {
        return <Button onPress={onConnect} title="Connect" />;
    }
    return <Text>
        {connector.accounts[0]}
    </Text>
}