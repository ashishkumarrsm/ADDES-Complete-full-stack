import React from "react";
import { useSelector } from "react-redux";

const SponsorBonus= () => {
  const { auth } = useSelector((state) => state.auth);
  const referralCode = auth?.ref_code;

  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

  return (
    <div className="p-4 text-center">
      <h3 className="font-semibold mb-2">Your Referral Link</h3>
      <p className="text-sm text-gray-600 mb-4">
        Share this link with your friends and earn bonuses when they join!
      </p>

      <div className="bg-gray-100 px-4 py-2 rounded break-all text-sm text-blue-800 border border-blue-300">
        {referralLink}
      </div>
    </div>
  );
};

export default SponsorBonus
