import Header from "../../CoreFile/Header";
import Footer from "../../CoreFile/Footer";
import { PrivacyHeroSection } from "./PrivacyHeroSection";

const privacySections = [
  {
    id: 1,
    title: "Information We Collect",
    description: "We collect different types of data, including:",
    points: [
      { label: "Personal Information", details: "Name, email, phone number, and payment details when you sign up." },
      { label: "Usage Data", details: "Your activity on our website, including logins and transactions." },
      { label: "Device Information", details: "IP address, browser type, and operating system for security purposes." }
    ]
  },
  {
    id: 2,
    title: "How We Use Your Information",
    description: "We use your data to:",
    points: [
      { details: "✅ Provide and improve our trading services." },
      { details: "✅ Process transactions securely." },
      { details: "✅ Communicate updates and important notices." },
      { details: "✅ Ensure security and prevent fraud." }
    ]
  },
  {
    id: 3,
    title: "How We Protect Your Data",
    description: "",
    points: [
      { details: "🔒 We use encryption and secure servers to keep your data safe." },
      { details: "🔒 Your personal details are never shared without your consent." },
      { details: "🔒 Only authorized staff have access to sensitive information." }
    ]
  },
  {
    id: 4,
    title: "Third-Party Sharing",
    description: "We do not sell your data. However, we may share it with:",
    points: [
      { details: "Payment providers to process transactions securely." },
      { details: "Legal authorities if required by law." },
      { details: "Service providers who help us improve our platform." }
    ]
  },
  {
    id: 5,
    title: "Policy Updates",
    description: "We may update this Privacy Policy from time to time. Any changes will be posted here, so please check regularly."
  }
];

export default function Privacy() {
  return (
    <>
      <Header />
      <PrivacyHeroSection />

      <div className="px-4 py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Privacy Policy
          </h2>

          {privacySections.map((section) => (
            <div
              key={section.id}
              className="p-6 bg-white rounded-lg shadow-md mb-6"
            >
              <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-3">
                <span className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-[#0089bd] rounded-full">
                  {section.id}
                </span>
                {section.title}
              </h2>
              <p className="text-gray-600 mb-3">{section.description}</p>
              {section.points && (
                <ul className="space-y-2 text-gray-600 list-disc pl-5">
                  {section.points.map((point, index) => (
                    <li key={index}>
                      {point.label && <strong>{point.label}: </strong>}
                      {point.details}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
