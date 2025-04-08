import React from 'react';
import Header from '../../CoreFile/Header';
import Footer from '../../CoreFile/Footer';
import { TermsHeroSection } from './TermsHeroSection';

export const Terms = () => {
  return (
    <>
      <Header />
      <TermsHeroSection />
      <div className="px-4 text-black bg-white">
        <div className="py-8 mx-auto max-w-7xl">
          
          
          <div className="p-5 mb-6 border-2 shadow-md shadow-gray-200">
            <h2 className="font-bold text-green-600">Trading & Transactions </h2>
            <ul className="mt-3 space-y-2">
              <li>✅ All trades and transactions are final and cannot be reversed.</li>
              <li>✅ Market conditions affect profits, and past results do not guarantee future returns.</li>
              <li>✅ Users are responsible for ensuring sufficient funds before making transactions.</li>
              <li>✅ Teirrax is not liable for any trading losses or unexpected market fluctuations.</li>
            </ul>
          </div>

          <div className="p-5 mb-6 border-2 shadow-md shadow-gray-200">
            <h2 className="font-bold text-green-600">Account Security</h2>
            <ul className="mt-3 space-y-2">
              <li>✅ Users must keep their login details private and secure.</li>
              <li>✅ Teirrax is not responsible for any unauthorized access due to negligence.</li>
              <li>✅ Suspicious activity may lead to temporary or permanent account suspension.</li>
              <li>✅ Regularly update your password to protect your account.</li>
            </ul>
          </div>

          <div className="p-5 border-2 shadow-md shadow-gray-200">
            <h2 className="font-bold text-green-600">Limitation of Liability</h2>
            <ul className="mt-3 space-y-2">
              <li>✅ Teirrax provides trading services "as is" and does not guarantee profits.</li>
              <li>✅ We are not responsible for technical issues, market changes, or user mistakes.</li>
              <li>✅ Any financial decision is at the user's own risk.</li>
              <li>✅ Teirrax reserves the right to modify or discontinue services at any time.</li>
            </ul>
          </div>

          {/* <p className="pt-7 text-base text-center">
            We encourage all users to stay informed about market conditions and carefully monitor their trading activities.
          </p> */}
        </div>
      </div>
      <Footer />
    </>
  );
};