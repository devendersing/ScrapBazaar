import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ScrapRate } from "@shared/schema";
import { Button } from "@/components/ui/button";
import ScrapRates from "@/components/ScrapRates";
import CallToAction from "@/components/CallToAction";

const RatesPage = () => {
  return (
    <main>
      <section className="bg-gradient-to-b from-neutral-custom to-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Current Scrap Rates</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            We update our rates daily based on market conditions to ensure you get the best value for your scrap materials. Check our competitive prices below.
          </p>
        </div>
      </section>

      <ScrapRates />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Rate Fluctuation Factors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-neutral-custom p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="material-icons text-primary text-2xl mr-2">trending_up</span>
                <h3 className="text-xl font-semibold">Market Demand</h3>
              </div>
              <p className="text-gray-700">Current global and local demand affects scrap material prices.</p>
            </div>
            
            <div className="bg-neutral-custom p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="material-icons text-primary text-2xl mr-2">account_balance</span>
                <h3 className="text-xl font-semibold">Economic Factors</h3>
              </div>
              <p className="text-gray-700">Currency values and economic conditions influence pricing.</p>
            </div>
            
            <div className="bg-neutral-custom p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="material-icons text-primary text-2xl mr-2">category</span>
                <h3 className="text-xl font-semibold">Material Quality</h3>
              </div>
              <p className="text-gray-700">Purity and condition of scrap materials affect their value.</p>
            </div>
            
            <div className="bg-neutral-custom p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="material-icons text-primary text-2xl mr-2">inventory</span>
                <h3 className="text-xl font-semibold">Quantity</h3>
              </div>
              <p className="text-gray-700">Bulk quantities may qualify for premium rates.</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-700 mb-6">
              For large quantities or special materials not listed above, please contact us directly for a custom quote.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
              <Link href="/schedule-pickup">
                <span className="material-icons mr-2">schedule</span>
                Schedule a Pickup
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  );
};

export default RatesPage;
