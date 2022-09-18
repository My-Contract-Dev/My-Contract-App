import { BigNumber } from 'ethers';
import { StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Text, View } from 'react-native-ui-lib';
import { formatNumber, randomColor } from '../../utils';

type TokenListItemProps = {
  amount: BigNumber;
  amountInUsd: number;
  decimals: number;
  color?: string;
  name?: string;
  address: string;
  symbol?: string;
  icon?: string;
};

export const TokenListItem: React.FC<TokenListItemProps> = ({
  amount,
  amountInUsd,
  name,
  address,
  symbol,
  icon,
  color,
  decimals,
}) => {
  return (
    <View paddingH-24 paddingV-8 style={styles.container}>
      <View
        style={[
          styles.avatar,
          {
            backgroundColor: color ?? randomColor(address),
          },
        ]}
      >
        {/* {icon && <Image source={{ uri: icon }} />} */}
        {icon && <SvgUri uri={icon} width="100%" height="100%" />}
      </View>
      <View marginH-16 style={styles.nameContainer}>
        <Text body>{name ?? address}</Text>
        <Text body disabled>
          {formatNumber(amount, { decimals })} {symbol}
        </Text>
      </View>
      <Text body medium>
        {formatNumber(amountInUsd)} $
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    padding: 4,
  },

  nameContainer: {
    flex: 1,
  },
});
