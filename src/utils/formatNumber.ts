import { BigNumber, BigNumberish } from 'ethers';

interface FormatNumberOptions {
  compact?: boolean;
  precision?: number;
  decimals?: number;
}

export const formatNumber = (
  value: BigNumberish,
  options: FormatNumberOptions = {}
) => {
  const { precision = 2, decimals = 18 } = options;
  let numberValue = 0;

  if (BigNumber.isBigNumber(value)) {
    numberValue =
      value
        .mul(BigNumber.from(10).pow(precision))
        .div(BigNumber.from(10).pow(decimals))
        .toNumber() / Math.pow(10, precision);
  } else {
    numberValue = Number(value);
  }

  let convertedValue = numberValue;
  convertedValue = convertedValue * Math.pow(10, precision);
  convertedValue = Math.round(convertedValue) / Math.pow(10, precision);
  return convertedValue.toLocaleString(undefined, {
    notation: options.compact ? 'compact' : 'standard',
  });
};
