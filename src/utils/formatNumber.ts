interface FormatNumberOptions {
  compact?: boolean;
  precision?: number;
}

export const formatNumber = (
  value: number,
  options: FormatNumberOptions = {}
) => {
  let convertedValue = value;
  const { precision = 2 } = options;
  convertedValue = convertedValue * Math.pow(10, precision);
  convertedValue = Math.round(convertedValue) / Math.pow(10, precision);
  return convertedValue.toLocaleString(undefined, {
    notation: options.compact ? 'compact' : 'standard',
  });
};
