import { Toaster } from "@/components/ui/sonner";
import Community from "./components/Community";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HowToBuy from "./components/HowToBuy";
import HypeTicker from "./components/HypeTicker";
import LiveChart from "./components/LiveChart";
import Navbar from "./components/Navbar";
import PFPGenerator from "./components/PFPGenerator";
import Roadmap from "./components/Roadmap";
import StickyBuyButton from "./components/StickyBuyButton";

export default function App() {
  return (
    <div className="min-h-screen font-body">
      <Toaster />
      <Navbar />
      <HeroSection />
      <LiveChart />
      <PFPGenerator />
      <HypeTicker />
      <HowToBuy />
      <Community />
      <Roadmap />
      <Footer />
      <StickyBuyButton />
    </div>
  );
}
