import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="material-icons text-primary text-3xl mr-2">recycling</span>
              <h3 className="text-2xl font-heading font-bold">
                Scrap<span className="text-secondary">Bekko</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for scrap collection and recycling services. We make it easy to turn your scrap into cash.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="material-icons">facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="material-icons">whatsapp</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="material-icons">instagram</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/schedule-pickup" className="text-gray-400 hover:text-white">
                  Schedule Pickup
                </Link>
              </li>
              <li>
                <Link href="/rates" className="text-gray-400 hover:text-white">
                  Current Rates
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Materials We Accept</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Paper & Cardboard</li>
              <li className="text-gray-400">Metals (Iron, Copper, Aluminum)</li>
              <li className="text-gray-400">Plastic</li>
              <li className="text-gray-400">E-Waste</li>
              <li className="text-gray-400">Glass</li>
              <li className="text-gray-400">And More...</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="material-icons text-gray-400 mr-2 mt-0.5">location_on</span>
                <span className="text-gray-400"> 4/48 Veena enclave,Nangloi,Delhi India</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-gray-400 mr-2 mt-0.5">phone</span>
                <span className="text-gray-400">+91 8178810828</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-gray-400 mr-2 mt-0.5">email</span>
                <span className="text-gray-400">info@scrapbekko.com</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-gray-400 mr-2 mt-0.5">schedule</span>
                <span className="text-gray-400">Mon-Sat: 8:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} ScrapWala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
