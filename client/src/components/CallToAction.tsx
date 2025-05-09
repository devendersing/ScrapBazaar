import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-heading mb-6">Ready to Turn Your Scrap Into Cash?</h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Schedule a pickup today and experience our hassle-free service. Get paid instantly for your recyclable materials!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="secondary" className="bg-white text-primary hover:bg-neutral-custom">
            <Link href="/schedule-pickup">
              <span className="material-icons mr-2">schedule</span>
              Schedule a Pickup
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-2 border-white hover:bg-white/10 text-white">
            <Link href="/rates">
              <span className="material-icons mr-2">monetization_on</span>
              Check Current Rates
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
