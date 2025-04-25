
import { ShieldCheck } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-trustshield-blue text-white p-4 shadow-md">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShieldCheck size={30} className="text-white" />
          <h1 className="text-xl font-bold">TrustShield | AI Fraud Detection</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block px-4 py-2 bg-trustshield-blue-lighter rounded-full text-sm">
            Last updated: {new Date().toLocaleString()}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
