import React, { createContext, useContext, useState } from 'react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  addMoney: (amount: number) => void;
  deductMoney: (amount: number, description: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(250.00);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'credit',
      amount: 100.00,
      description: 'Added money to wallet',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      type: 'debit',
      amount: 25.00,
      description: 'Ride payment - Downtown to Airport',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: '3',
      type: 'credit',
      amount: 175.00,
      description: 'Ride earnings - City Center',
      date: '2024-01-13',
      status: 'completed'
    }
  ]);

  const addMoney = (amount: number) => {
    setBalance(prev => prev + amount);
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'credit',
      amount,
      description: 'Added money to wallet',
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deductMoney = (amount: number, description: string) => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'debit',
        amount,
        description,
        date: new Date().toISOString().split('T')[0],
        status: 'completed'
      };
      setTransactions(prev => [newTransaction, ...prev]);
    }
  };

  return (
    <WalletContext.Provider value={{
      balance,
      transactions,
      addMoney,
      deductMoney
    }}>
      {children}
    </WalletContext.Provider>
  );
};