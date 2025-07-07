import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, Calendar, CreditCard, DollarSign } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import toast from 'react-hot-toast';

interface AddMoneyForm {
  amount: number;
  paymentMethod: string;
}

const Wallet: React.FC = () => {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const { balance, transactions, addMoney } = useWallet();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddMoneyForm>();

  const onSubmit = (data: AddMoneyForm) => {
    addMoney(data.amount);
    toast.success(`₹${data.amount} added to your wallet successfully!`);
    setShowAddMoney(false);
    reset();
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedPeriod === 'all') return true;
    const transactionDate = new Date(transaction.date);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));
    
    switch (selectedPeriod) {
      case 'week':
        return daysDiff <= 7;
      case 'month':
        return daysDiff <= 30;
      case 'year':
        return daysDiff <= 365;
      default:
        return true;
    }
  });

  const totalCredit = filteredTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebit = filteredTransactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Wallet</h1>
          <p className="text-xl text-gray-600">Manage your payments and transactions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance Card */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <WalletIcon className="h-6 w-6" />
                    <span className="text-lg font-medium">Available Balance</span>
                  </div>
                  <div className="text-4xl font-bold mb-2">₹{balance.toFixed(2)}</div>
                  <div className="text-indigo-200">Last updated: {new Date().toLocaleDateString()}</div>
                </div>
                <button
                  onClick={() => setShowAddMoney(true)}
                  className="bg-white text-gray-800 bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center space-x-2 transition-all"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Money</span>
                </button>
              </div>
            </div>

            {/* Transaction Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Total Earned</span>
                  <ArrowUpRight className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600">₹{totalCredit.toFixed(2)}</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Total Spent</span>
                  <ArrowDownLeft className="h-5 w-5 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-red-600">₹{totalDebit.toFixed(2)}</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Transactions</span>
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{filteredTransactions.length}</div>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="all">All Time</option>
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="year">Last Year</option>
                  </select>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <ArrowUpRight className="h-5 w-5 text-green-600" />
                          ) : (
                            <ArrowDownLeft className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{transaction.description}</div>
                          <div className="text-sm text-gray-500">{transaction.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <button
                  onClick={() => setShowAddMoney(true)}
                  className="w-full flex items-center space-x-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
                >
                  <Plus className="h-5 w-5 text-indigo-600" />
                  <span className="font-medium text-indigo-600">Add Money</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-600">Withdraw</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-600">Payment Methods</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Two-Factor Auth</span>
                  <div className="w-10 h-6 bg-green-500 rounded-full flex items-center justify-end p-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Transaction Alerts</span>
                  <div className="w-10 h-6 bg-green-500 rounded-full flex items-center justify-end p-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Auto-reload</span>
                  <div className="w-10 h-6 bg-gray-300 rounded-full flex items-center justify-start p-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Add Money to Wallet</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register('amount', { 
                      required: 'Amount is required',
                      min: { value: 10, message: 'Minimum amount is ₹10' },
                      max: { value: 1000, message: 'Maximum amount is ₹1000' }
                    })}
                    type="number"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  {...register('paymentMethod', { required: 'Payment method is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select payment method</option>
                  <option value="credit">Credit Card</option>
                  <option value="debit">Debit Card</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                </select>
                {errors.paymentMethod && <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddMoney(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Add Money
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;