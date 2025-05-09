import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import HowItWorks from "@/components/HowItWorks";
import ScrapRates from "@/components/ScrapRates";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";

const HomePage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-b from-neutral-custom to-white pt-10 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
                Turn Your <span className="text-primary">Scrap</span> Into <span className="text-secondary">Cash</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Schedule a hassle-free pickup for your household, office, or industrial scrap materials. We offer competitive rates and prompt service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Link href="/schedule-pickup">
                    <span className="material-icons mr-2">schedule</span>
                    Schedule a Pickup
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white border-2 border-primary hover:bg-neutral-custom text-primary">
                  <Link href="/rates">
                    <span className="material-icons mr-2">monetization_on</span>
                    Check Current Rates
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Collection of sorted recyclable materials" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Rates Section */}
      <ScrapRates />

      {/* Testimonials Section */}
      <Testimonials />

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Our recycling facility" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold font-heading mb-6">About ScrapWala</h2>
              <p className="text-gray-700 mb-4">
                ScrapWala is a leading scrap collection and recycling service committed to promoting sustainable waste management practices. We make it easy for households and businesses to responsibly dispose of their recyclable materials while earning money.
              </p>
              <p className="text-gray-700 mb-4">
                Our mission is to reduce landfill waste by efficiently collecting and recycling scrap materials, contributing to a cleaner environment for future generations.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="material-icons text-primary text-3xl mr-2">eco</span>
                  <div>
                    <h4 className="font-semibold">Eco-Friendly</h4>
                    <p className="text-sm text-gray-600">Sustainable practices</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="material-icons text-primary text-3xl mr-2">verified</span>
                  <div>
                    <h4 className="font-semibold">Trusted Service</h4>
                    <p className="text-sm text-gray-600">5000+ happy customers</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="material-icons text-primary text-3xl mr-2">location_on</span>
                  <div>
                    <h4 className="font-semibold">Wide Coverage</h4>
                    <p className="text-sm text-gray-600">Serving major cities</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="material-icons text-primary text-3xl mr-2">payments</span>
                  <div>
                    <h4 className="font-semibold">Fair Pricing</h4>
                    <p className="text-sm text-gray-600">Competitive market rates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <CallToAction />
    </main>
  );
};

export default HomePage;
