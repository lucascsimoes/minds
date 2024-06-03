import { useEffect, useState } from 'react';
import { fetchBalance } from '../services/balance';

export default function useBalance() {
  const [balance, setBalance] = useState(0);

  async function getBalance() {
    setBalance(await fetchBalance());
  }

  useEffect(() => {
    getBalance();
  }, [balance]);

  return [balance.toFixed(2), setBalance];
}
