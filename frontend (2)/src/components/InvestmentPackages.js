import React, { useState } from 'react';
import { Zap, ArrowRight, CheckCircle, Calendar, DollarSign, Percent, Lock, Unlock } from 'lucide-react';

const InvestmentPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  // Package data from SQL insert statement
  const packages = [
    {
      id: 1,
      title: 'Starter Plan',
      description: 'Good for beginners just getting into investing.',
      min_investment: 100.00,
      max_investment: 500.00,
      roi_percentage: 5.00,
      duration_in_days: 30,
      is_active: true,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      icon: <Zap size={20} className="text-green-500" />
    },
    {
      id: 2,
      title: 'Silver Plan',
      description: 'Low-risk investment plan with decent ROI.',
      min_investment: 500.00,
      max_investment: 2000.00,
      roi_percentage: 7.50,
      duration_in_days: 60,
      is_active: true,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      icon: <Zap size={20} className="text-blue-400" />
    },
    {
      id: 3,
      title: 'Gold Plan',
      description: 'Balanced plan for intermediate investors.',
      min_investment: 2000.00,
      max_investment: 10000.00,
      roi_percentage: 10.00,
      duration_in_days: 90,
      is_active: true,
      color: 'from-amber-400 to-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      icon: <Zap size={20} className="text-amber-400" />
    },
    {
      id: 4,
      title: 'Platinum Plan',
      description: 'High return long-term investment.',
      min_investment: 10000.00,
      max_investment: null,
      roi_percentage: 15.00,
      duration_in_days: 180,
      is_active: true,
      color: 'from-indigo-400 to-indigo-600',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      icon: <Zap size={20} className="text-indigo-400" />
    },
    {
      id: 5,
      title: 'VIP Custom Plan',
      description: 'Tailored investment with custom rules and ROI.',
      min_investment: 50000.00,
      max_investment: null,
      roi_percentage: 20.00,
      duration_in_days: 365,
      is_active: false,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      icon: <Zap size={20} className="text-purple-400" />
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const PackageDetails = ({ pkg }) => {
    return (
      <div className={`rounded-xl p-6 ${pkg.bgColor} border ${pkg.borderColor} shadow-lg`}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{pkg.title}</h3>
            <p className="text-gray-300 text-sm">{pkg.description}</p>
          </div>
          <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center shadow-lg`}>
            {pkg.icon}
          </div>
        </div>
        
        <div className="mb-6">
          <span className="text-gray-400 text-xs">Return on Investment</span>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-white">{pkg.roi_percentage}%</span>
            <span className="text-gray-300 ml-2 text-sm">in {pkg.duration_in_days} days</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center text-gray-400 text-xs mb-1">
              <DollarSign size={12} className="mr-1" />
              <span>Min Investment</span>
            </div>
            <div className="text-lg font-semibold text-white">
              {formatCurrency(pkg.min_investment)}
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center text-gray-400 text-xs mb-1">
              <Calendar size={12} className="mr-1" />
              <span>Duration</span>
            </div>
            <div className="text-lg font-semibold text-white">
              {pkg.duration_in_days} Days
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-300">
            <CheckCircle size={16} className="mr-2 text-green-400" />
            <span className="text-sm">Daily profit withdrawal</span>
          </div>
          <div className="flex items-center text-gray-300">
            <CheckCircle size={16} className="mr-2 text-green-400" />
            <span className="text-sm">Capital return on completion</span>
          </div>
          <div className="flex items-center text-gray-300">
            <CheckCircle size={16} className="mr-2 text-green-400" />
            <span className="text-sm">24/7 customer support</span>
          </div>
        </div>
        
        <button className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${pkg.color} text-white font-medium flex items-center justify-center ${!pkg.is_active && 'opacity-50 cursor-not-allowed'}`} 
                disabled={!pkg.is_active}>
          {pkg.is_active ? (
            <>
              <span>Invest Now</span>
              <ArrowRight size={16} className="ml-2" />
            </>
          ) : (
            <>
              <Lock size={16} className="mr-2" />
              <span>Currently Unavailable</span>
            </>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-cyan-400 mb-3">Investment Packages</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Choose the investment plan that matches your financial goals and risk appetite. We offer plans for investors at every level.</p>
        </div>
        
        {/* Package Selection Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {packages.map(pkg => (
            <button
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
                ${selectedPackage?.id === pkg.id 
                  ? `bg-gradient-to-r ${pkg.color} text-white` 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'} 
                ${!pkg.is_active && 'opacity-60'}`}
            >
              {!pkg.is_active && <Lock size={12} className="inline mr-1" />}
              {pkg.title}
            </button>
          ))}
        </div>
        
        {/* Package Display */}
        {selectedPackage ? (
          <div className="max-w-lg mx-auto">
            <PackageDetails pkg={selectedPackage} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div key={pkg.id} className={`rounded-xl p-5 ${pkg.bgColor} border ${pkg.borderColor} shadow-lg hover:shadow-xl transition-all cursor-pointer`} onClick={() => setSelectedPackage(pkg)}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white">{pkg.title}</h3>
                  {!pkg.is_active && <Lock size={16} className="text-gray-400" />}
                </div>
                
                <div className="flex items-baseline mb-3">
                  <span className="text-2xl font-bold text-white">{pkg.roi_percentage}%</span>
                  <span className="text-gray-300 ml-2 text-xs">ROI</span>
                </div>
                
                <div className="text-sm text-gray-300 mb-4">
                  {pkg.duration_in_days} days duration
                </div>
                
                <div className="text-sm text-gray-300 mb-6">
                  From {formatCurrency(pkg.min_investment)}
                  {pkg.max_investment ? ` to ${formatCurrency(pkg.max_investment)}` : '+'}
                </div>
                
                <button className={`w-full py-2 px-3 rounded-lg bg-gradient-to-r ${pkg.color} text-white text-sm font-medium flex items-center justify-center ${!pkg.is_active && 'opacity-50 cursor-not-allowed'}`} 
                        disabled={!pkg.is_active}>
                  {pkg.is_active ? (
                    <>
                      <span>View Details</span>
                      <ArrowRight size={14} className="ml-1" />
                    </>
                  ) : (
                    <span>Coming Soon</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
        
        {selectedPackage && (
          <div className="text-center mt-6">
            <button 
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
              onClick={() => setSelectedPackage(null)}
            >
              ← Back to all packages
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentPackages;