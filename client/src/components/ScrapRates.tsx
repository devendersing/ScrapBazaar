import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ScrapRate } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const trendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <span className="material-icons text-secondary">trending_up</span>;
    case "down":
      return <span className="material-icons text-destructive">trending_down</span>;
    default:
      return <span className="material-icons text-gray-500">trending_flat</span>;
  }
};

const trendText = (trend: string) => {
  switch (trend) {
    case "up":
      return "High demand";
    case "down":
      return "Low demand";
    default:
      return "Stable price";
  }
};

const ScrapRateSkeleton = () => (
  <Card className="overflow-hidden shadow-md">
    <div className="h-3 bg-gray-200"></div>
    <CardContent className="p-6">
      <div className="flex items-center mb-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="ml-4">
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
    </CardContent>
  </Card>
);

const ScrapRateCard = ({ rate }: { rate: ScrapRate }) => (
  <div className="scrap-card bg-white rounded-lg overflow-hidden shadow-md transition duration-300">
    <div className={`h-3 bg-${rate.color}`} style={{ backgroundColor: `hsl(var(--${rate.color}))` }}></div>
    <CardContent className="p-6">
      <div className="flex items-center mb-4">
        <div className={`w-16 h-16 rounded-full bg-${rate.color}/20 flex items-center justify-center border-2 border-${rate.color}`} style={{ borderColor: `hsl(var(--${rate.color}))` }}>
          <span className="material-icons text-3xl" style={{ color: `hsl(var(--${rate.color}))` }}>{rate.icon}</span>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold">{rate.materialName}</h3>
          <div className="flex items-center">
            {trendIcon(rate.trend)}
            <span className="text-sm text-gray-500 ml-1">{trendText(rate.trend)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600 text-sm">Current Rate</p>
          <p className="text-2xl font-bold" style={{ color: `hsl(var(--${rate.color}))` }}>
            ₹{rate.rate}/kg
          </p>
        </div>
        <Button variant="ghost" asChild className="flex items-center" style={{ color: `hsl(var(--${rate.color}))` }}>
          <Link href="/schedule-pickup">
            <span className="material-icons mr-1 text-sm">schedule</span>
            Schedule Pickup
          </Link>
        </Button>
      </div>
    </CardContent>
  </div>
);

const ScrapRates = () => {
  const { data: rates, isLoading } = useQuery<ScrapRate[]>({
    queryKey: ['/api/rates'],
  });

  return (
    <section id="rates" className="py-16 bg-neutral-custom">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-heading text-center mb-4">Current Scrap Rates</h2>
        <p className="text-center text-gray-700 mb-10">Updated daily to give you the best prices for your materials</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => <ScrapRateSkeleton key={i} />)
          ) : (
            rates?.map((rate) => <ScrapRateCard key={rate.id} rate={rate} />)
          )}
        </div>

        <div className="mt-10 text-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-md">
            <Link href="/schedule-pickup">
              <span className="material-icons mr-2">assignment_turned_in</span>
              Schedule a Pickup Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ScrapRates;
