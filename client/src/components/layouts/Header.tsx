import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path ? "text-primary" : "text-gray-700 hover:text-primary";
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="material-icons text-primary text-3xl mr-2">recycling</span>
          <Link href="/">
            <h1 className="text-2xl font-heading font-bold text-primary">
              Scrap<span className="text-secondary">Bekko</span>
            </h1>
          </Link>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className={`font-medium transition ${isActive("/")}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/schedule-pickup" className={`font-medium transition ${isActive("/schedule-pickup")}`}>
                Schedule Pickup
              </Link>
            </li>
            <li>
              <Link href="/rates" className={`font-medium transition ${isActive("/rates")}`}>
                Current Rates
              </Link>
            </li>
            <li>
              <Link href="/about" className={`font-medium transition ${isActive("/about")}`}>
                About Us
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="hidden md:block">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/schedule-pickup">Schedule Pickup</Link>
          </Button>
        </div>
        
        <button className="md:hidden text-gray-700" onClick={toggleMobileMenu}>
          <Menu />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <ul className="space-y-3">
            <li>
              <Link href="/" className="block font-medium text-gray-700 hover:text-primary transition" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/schedule-pickup" className="block font-medium text-gray-700 hover:text-primary transition" onClick={closeMenu}>
                Schedule Pickup
              </Link>
            </li>
            <li>
              <Link href="/rates" className="block font-medium text-gray-700 hover:text-primary transition" onClick={closeMenu}>
                Current Rates
              </Link>
            </li>
            <li>
              <Link href="/about" className="block font-medium text-gray-700 hover:text-primary transition" onClick={closeMenu}>
                About Us
              </Link>
            </li>
            <li className="pt-2">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                <Link href="/schedule-pickup" onClick={closeMenu}>Schedule Pickup</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
