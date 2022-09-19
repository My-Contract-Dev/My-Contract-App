import { useEffect, useMemo } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { useAccountMetricsQuery } from '../../generated/graphql';
import { RichContract } from '../../models';
import { RootState, updateContractName } from '../../store';

export const useContractsList = (): RichContract[] => {
  const dispatch = useDispatch();
  const contracts = useSelector(
    (state: RootState) => state.contractsList.contracts
  );
  const contractAddresses = useMemo(
    () => contracts.map((c) => c.address),
    [contracts]
  );
  const metricsData = useAccountMetricsQuery({
    variables: { addresses: contractAddresses },
    initialFetchPolicy: 'cache-and-network',
  });

  const isRefreshing = useSelector(
    (state: RootState) => state.refreshing.refreshing
  );

  useEffect(() => {
    if (isRefreshing && !metricsData.loading) {
      metricsData.refetch();
    }
  }, [isRefreshing, metricsData, metricsData.loading]);

  useEffect(() => {
    if (metricsData.error?.name) {
      Toast.show({
        autoHide: false,
        text1: 'Oops, failed to load data',
        text2: 'Please try again later. Or check your conneection',
        type: 'error',
        position: 'bottom',
      });
      console.error(metricsData.error);
    }
  }, [metricsData.error?.name]);

  return useMemo<RichContract[]>(() => {
    if (!metricsData.data) {
      return contracts;
    }
    return contracts.map<RichContract>((c) => {
      const enhancedContract = metricsData.data?.accountMetrics.contracts.find(
        (rc) => rc.address === c.address && rc.chainId === c.chainId
      );
      if (enhancedContract?.name && enhancedContract?.name !== c.name) {
        dispatch(
          updateContractName({
            contract: c,
            name: enhancedContract.name,
          })
        );
      }
      return {
        ...c,
        name: enhancedContract?.name || c.name,
        valueInUsd: enhancedContract?.balanceInUsd,
        calls: enhancedContract?.calls,
      };
    });
  }, [contracts, dispatch, metricsData.data]);
};
