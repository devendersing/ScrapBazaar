const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-heading text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-custom rounded-lg p-6 text-center transition hover:shadow-lg">
            <div className="bg-primary inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
              <span className="material-icons text-white text-3xl">phone_in_talk</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">1. Schedule a Pickup</h3>
            <p className="text-gray-700">Fill out our simple form with your details and preferred pickup time.</p>
          </div>
          
          <div className="bg-neutral-custom rounded-lg p-6 text-center transition hover:shadow-lg">
            <div className="bg-primary inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
              <span className="material-icons text-white text-3xl">camera_alt</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">2. Upload Image (Optional)</h3>
            <p className="text-gray-700">Share a photo of your scrap to get a more accurate price estimate.</p>
          </div>
          
          <div className="bg-neutral-custom rounded-lg p-6 text-center transition hover:shadow-lg">
            <div className="bg-primary inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
              <span className="material-icons text-white text-3xl">paid</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">3. Get Paid on Pickup</h3>
            <p className="text-gray-700">Our team arrives at your location, weighs the materials, and pays you instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
