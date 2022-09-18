import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAccountMetricsQuery } from '../../generated/graphql';
import { RichContract } from '../../models';
import { RootState } from '../../store';

export const useContractsList = (): RichContract[] => {
  const contracts = useSelector(
    (state: RootState) => state.contractsList.contracts
  );
  const contractAddresses = useMemo(
    () => contracts.map((c) => c.address),
    [contracts]
  );
  const metricsData = useAccountMetricsQuery({
    variables: { addresses: contractAddresses },
  });

  return useMemo<RichContract[]>(() => {
    if (!metricsData.data) {
      return contracts;
    }
    return contracts.map<RichContract>((c) => ({
      ...c,
      valueInUsd: metricsData.data?.accountMetrics.contracts.find(
        (rc) => rc.address === c.address && rc.chainId === c.chainId
      )?.balanceInUsd,
    }));
  }, [contracts, metricsData.data]);
};
