export const Web3Connect = () => {
  const steps = [
    {
      id: 1,
      title: "Install a Web3 Wallet ",
      description:
        "Use MetaMask, Trust Wallet, or any Web3-compatible wallet.",
    },
    {
      id: 2,
      title: "Connect to Teirrax ",
      description:
        "Click Connect Wallet and approve the connection.",
    },
    {
      id: 3,
      title: "Start Trading ",
      description:
        "Access AI-powered and decentralized trading instantly.",
    },
    // {
    //   id: 4,
    //   title: "Step 4",
    //   description:
    //     "If one examines precultural libertarianism, one is faced with a choice: either accept rationalism or conclude that context is a product.",
    // },
  ];

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl   ">
      <div className="max-w-3xl mb-10 md:mx-auto sm:text-center  md:mb-12">
        <p className="inline-block px-3 py-px mb-2 bg-blue-100  text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
          Web3
        </p>
        <h2 className="mb-2 text-4xl font-semibold leading-none tracking-tight text-gray-900 md:mx-auto">
        How to Connect Web3 to Teirrax
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
        Easily link your Web3 wallet to start secure and decentralized trading in just a few steps.
        </p>
      </div>
      <div className="grid gap-6 row-gap-10 lg:grid-cols-2">
        <div className="lg:py-6 lg:pr-16">
          {steps.map((step, index) => (
            <div key={step.id} className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                  <svg
                    className="w-4 text-gray-600"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <line
                      fill="none"
                      strokeMiterlimit="10"
                      x1="12"
                      y1="2"
                      x2="12"
                      y2="22"
                    />
                    <polyline
                      fill="none"
                      strokeMiterlimit="10"
                      points="19,15 12,22 5,15"
                    />
                  </svg>
                </div>
                {index !== steps.length - 1 && (
                  <div className="w-px h-full bg-gray-300" />
                )}
              </div>
              <div className="pt-1 pb-8">
                <p className="mb-2 text-lg font-bold">{step.title}</p>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
          {/* Success Step */}
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                <svg
                  className="w-6 text-gray-600"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <polyline
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    points="6,12 10,16 18,8"
                  />
                </svg>
              </div>
            </div>
            <div className="pt-1">
              <p className="mb-2 text-lg font-bold">Success</p>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="relative">
          <img
            className="inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
            src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
