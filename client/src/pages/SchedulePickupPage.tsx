import PickupForm from "@/components/PickupForm";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const SchedulePickupPage = () => {
  return (
    <main>
      <section className="bg-gradient-to-b from-neutral-custom to-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Schedule a Pickup</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Fill out the form below to arrange a convenient pickup time for your scrap materials. Our team will contact you to confirm the details.
          </p>
        </div>
      </section>
      
      <section id="schedule-pickup" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-2/5">
              <h2 className="text-3xl font-bold font-heading mb-6">Schedule Your Pickup</h2>
              <p className="text-gray-700 mb-6">
                Fill out the form with your details, and we'll arrange a convenient pickup time for your scrap materials. Our team will contact you to confirm.
              </p>
              
              <div className="bg-neutral-custom p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="material-icons text-primary mr-2">tips_and_updates</span>
                  Why Choose ScrapWala?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="material-icons text-primary mr-2 mt-0.5">check_circle</span>
                    <span>Best market rates updated daily</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-primary mr-2 mt-0.5">check_circle</span>
                    <span>Professional and punctual pickup service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-primary mr-2 mt-0.5">check_circle</span>
                    <span>Digital weighing for accurate measurement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-primary mr-2 mt-0.5">check_circle</span>
                    <span>Immediate cash payment on pickup</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-primary mr-2 mt-0.5">check_circle</span>
                    <span>Environmentally responsible recycling</span>
                  </li>
                </ul>
              </div>
              
              {/* Image for larger screens */}
              <img 
                src="https://pixabay.com/get/gd3484ee985c134ddc2a329c32b064cb307f189084931349316697e337d2e88cba049f7310514013c1d10c8a567f7c14962c7e0b9fd2e90567d93627e1a8ffd84_1280.jpg" 
                alt="Professional scrap collection service" 
                className="rounded-lg shadow-md w-full h-auto hidden lg:block"
              />
            </div>
            
            <div className="lg:w-3/5 bg-white rounded-xl shadow-lg p-8">
              <PickupForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-neutral-custom">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">What Happens After You Submit?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-primary rounded-full text-white flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Confirmation Call</h3>
              <p className="text-gray-700">We'll call you within 2 hours to confirm your pickup details</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-primary rounded-full text-white flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pickup Visit</h3>
              <p className="text-gray-700">Our team arrives at your location at the scheduled time</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-primary rounded-full text-white flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Payment</h3>
              <p className="text-gray-700">Receive immediate payment based on material weight</p>
            </div>
          </div>
          
          <div className="mt-8">
            <Button asChild variant="outline" className="bg-white border-2 border-primary hover:bg-neutral-custom text-primary">
              <Link href="/rates">
                <span className="material-icons mr-2">monetization_on</span>
                Check Current Rates
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SchedulePickupPage;
