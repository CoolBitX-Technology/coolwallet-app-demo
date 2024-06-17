import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NFCScanView } from '@src/features/nfcScan/NFCScanView';
import { useCreateNfcTransportUseCase } from '@src/features/nfcScan/hooks/useCreateNfcTransportUseCase';

const NFCScanContainer = () => {
  const { connect, log, loading } = useCreateNfcTransportUseCase();

  const goBack = useNavigation().goBack;

  return <NFCScanView log={log} loading={loading} onRequestPressed={connect} onGoBcakPressed={goBack} />;
};

export default NFCScanContainer;
