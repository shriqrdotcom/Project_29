import "@/App.css";
import { useLenis } from "@/hooks/useLenis";
import { HeroScrollScene } from "@/components/hero/HeroScrollScene";
import { AutoScrollCarouselSection } from "@/components/sections/AutoScrollCarouselSection";
import { NarrativeThreadSection } from "@/components/sections/NarrativeThreadSection";
import { MarketplaceSection } from "@/components/sections/MarketplaceSection";
import { DualCardSection } from "@/components/sections/DualCardSection";

const MARQUEE_ITEMS = [
  "A place to display your masterpiece",
  "Mint · Showcase · Sell",
  "One of one",
  "For independent artists",
];

const MarqueeFooter = () => (
  <footer
    data-testid="marquee-footer"
    className="relative overflow-hidden border-t border-neutral-200 bg-neutral-50 py-8"
  >
    <div className="marquee flex w-max whitespace-nowrap">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={`${dup}-${i}`} className="flex items-center">
              <span className="font-display text-[clamp(1.6rem,4vw,3rem)] font-medium tracking-tight text-neutral-900">
                {item}
              </span>
              <span className="mx-8 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </footer>
);

function App() {
  useLenis();

  return (
    <div className="App min-h-screen bg-[#e7e7ea]">
      <HeroScrollScene />
      <AutoScrollCarouselSection />
      <NarrativeThreadSection />
      <MarketplaceSection />
      <DualCardSection />
      <MarqueeFooter />
    </div>
  );
}

export default App;
