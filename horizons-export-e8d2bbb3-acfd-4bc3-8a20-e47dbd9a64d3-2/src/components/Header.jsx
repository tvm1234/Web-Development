import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllCategories } from "@/data/dataService";

const Header = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/e8d2bbb3-acfd-4bc3-8a20-e47dbd9a64d3/8827955109d9f4d158ce8272726fd9f8.jpg";

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getAllCategories();
      // Sort categories to ensure 'latest-news' is first, then others alphabetically or by a defined order
      const sortedCategories = fetchedCategories.sort((a, b) => {
        if (a.slug === 'latest-news') return -1;
        if (b.slug === 'latest-news') return 1;
        if (a.slug === 'politics' && b.slug !== 'latest-news') return -1; // Example: politics after latest
        if (b.slug === 'politics' && a.slug !== 'latest-news') return 1;
        return a.name.localeCompare(b.name); // Default sort
      });
      setCategories(sortedCategories);
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality, e.g., navigate to a search results page
      // navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      console.log(`Searching for: ${searchQuery}`);
      setSearchQuery("");
      if (isMenuOpen) setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-gradient-to-r from-brand-red to-brand-orange py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={logoUrl} alt="Vision Marathi News Logo" className="h-12 md:h-14 w-auto" />
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {categories.slice(0, 8).map((category) => ( // Show up to 8 categories in desktop view
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className={cn(
                  "font-medium hover:text-brand-orange transition-colors text-xs lg:text-sm",
                  isScrolled ? "text-gray-700" : "text-white"
                )}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <input
                type="text"
                placeholder="शोध..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red text-sm w-32 lg:w-40"
              />
              <Button
                type="submit"
                size="sm"
                className="rounded-l-none bg-brand-red hover:bg-brand-red/90 px-3"
              >
                <Search size={18} />
              </Button>
            </form>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className={cn(
                "md:hidden",
                isScrolled ? "text-brand-red" : "text-white"
              )}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white shadow-lg rounded-b-md"
            >
              <div className="p-4 space-y-4">
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder="शोध..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                  <Button
                    type="submit"
                    className="rounded-l-none bg-brand-red hover:bg-brand-red/90"
                  >
                    <Search size={18} />
                  </Button>
                </form>

                <nav className="space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/category/${category.slug}`}
                      className="block py-2.5 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;