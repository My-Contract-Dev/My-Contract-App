interface FormatNumberOptions {
  compact?: boolean;
}

export const formatNumber = (
  value: number,
  options: FormatNumberOptions = {}
) => {
  return value.toLocaleString(undefined, {
    notation: options.compact ? 'compact' : 'standard',
  });
};
