import CallToAction from "@/components/CallToAction";
import Testimonials from "@/components/Testimonials";

const AboutPage = () => {
  return (
    <main>
      <section className="bg-gradient-to-b from-neutral-custom to-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About ScrapBekko</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Learn more about our mission, values, and commitment to sustainable waste management.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
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
              <h2 className="text-3xl font-bold font-heading mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                ScrapBekko was founded in 2004 with a simple mission: to make recycling easy and rewarding for everyone. What started as a small local operation has grown into a trusted scrap collection service, serving thousands of customers across major cities.
              </p>
              <p className="text-gray-700 mb-4">
                Our team of dedicated professionals is committed to providing exceptional service while promoting environmental sustainability. We believe that proper waste management is not just good for the planet, but can also be economically beneficial for our customers.
              </p>
              <p className="text-gray-700 mb-4">
                Today, ScrapBekko continues to innovate and improve our services, making it easier than ever for households and businesses to responsibly dispose of their recyclable materials while earning money.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-custom">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary rounded-full text-white flex items-center justify-center mb-4 mx-auto">
                <span className="material-icons text-3xl">eco</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Environmental Stewardship</h3>
              <p className="text-gray-700 text-center">
                We are committed to reducing landfill waste and promoting sustainable practices in waste management.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary rounded-full text-white flex items-center justify-center mb-4 mx-auto">
                <span className="material-icons text-3xl">handshake</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Fair Dealing</h3>
              <p className="text-gray-700 text-center">
                We believe in transparent pricing and honest business practices that benefit both our customers and the environment.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary rounded-full text-white flex items-center justify-center mb-4 mx-auto">
                <span className="material-icons text-3xl">groups</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Community Impact</h3>
              <p className="text-gray-700 text-center">
                We strive to create a positive impact in the communities we serve through education and outreach programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative">
              <div className="bg-neutral-custom p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-full text-white flex items-center justify-center mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Collection</h3>
                <p className="text-gray-700">
                  We collect scrap materials directly from your location at a time that's convenient for you.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <span className="material-icons text-primary text-3xl">arrow_forward</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-neutral-custom p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-full text-white flex items-center justify-center mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Sorting</h3>
                <p className="text-gray-700">
                  Materials are carefully sorted by type and quality to ensure optimal recycling.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <span className="material-icons text-primary text-3xl">arrow_forward</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-neutral-custom p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-full text-white flex items-center justify-center mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Processing</h3>
                <p className="text-gray-700">
                  Collected materials are processed according to industry standards for maximum resource recovery.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <span className="material-icons text-primary text-3xl">arrow_forward</span>
              </div>
            </div>
            
            <div>
              <div className="bg-neutral-custom p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-full text-white flex items-center justify-center mb-4">
                  <span className="font-bold">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Recycling</h3>
                <p className="text-gray-700">
                  The processed materials are sent to manufacturing facilities where they're transformed into new products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <CallToAction />
    </main>
  );
};

export default AboutPage;
