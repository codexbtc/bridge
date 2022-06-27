import React, { useEffect } from 'react';
import { Stack } from '@nelson-ui/react';
import { useOutboundSwap } from '../../common/hooks/use-outbound-swap';
import { CenterBox } from '../center-box';
import { PendingInit } from './pending';
import { SwapInitialized } from './initialized';
import { SwapConfirmed } from './confirmed';
import { useSetTitle } from '../head';
import { SwapCanceled } from './canceled';
import { useSwapId } from '../../common/store/swaps';

export const OutboundSwap: React.FC = () => {
  const { initTx, initStatus, unspent, txId, isCanceled } = useOutboundSwap();
  useSetTitle('Swap xBTC -> BTC');
  const [_, setSwapId] = useSwapId();
  useEffect(() => {
    return () => {
      setSwapId(undefined);
    };
  }, [setSwapId]);

  if (isCanceled) {
    return <SwapCanceled />;
  }

  if (initStatus === 'pending') {
    return <PendingInit txId={txId} />;
  }
  if (initStatus === 'success') {
    if (unspent !== undefined) {
      return <SwapConfirmed />;
    }
    return <SwapInitialized />;
  }

  return (
    <Stack spacing="$row-y">
      <CenterBox>
        <pre>{JSON.stringify(initTx, null, 2)}</pre>
      </CenterBox>
    </Stack>
  );
};
