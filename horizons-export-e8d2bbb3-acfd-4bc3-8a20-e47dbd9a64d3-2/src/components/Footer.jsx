
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { getAllCategories, getSiteConfigurations } from "@/data/dataService";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [categories, setCategories] = useState([]);
  const [siteConfig, setSiteConfig] = useState({
    email: "loading...",
    facebook_url: "#",
    twitter_url: "#",
    instagram_url: "#",
    youtube_url: "#",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();

    const fetchSiteConfig = async () => {
      const config = await getSiteConfigurations();
      if (config) {
        setSiteConfig(prevConfig => ({
          ...prevConfig,
          email: config.email || "info@example.com",
          facebook_url: config.facebook_url || "#",
          twitter_url: config.twitter_url || "#",
          instagram_url: config.instagram_url || "#",
          youtube_url: config.youtube_url || "#",
        }));
      }
    };
    fetchSiteConfig();

  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
               <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/e8d2bbb3-acfd-4bc3-8a20-e47dbd9a64d3/8827955109d9f4d158ce8272726fd9f8.jpg" alt="Vision Marathi News Logo" className="h-10 w-auto mr-2" />
              <span className="font-bold text-xl">Vision Marathi News</span>
            </div>
            <p className="text-gray-400 text-sm">
              आम्ही सत्य, निष्पक्ष आणि विश्वसनीय बातम्या देण्यासाठी वचनबद्ध आहोत.
            </p>
            <div className="flex space-x-4">
              <a href={siteConfig.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href={siteConfig.twitter_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href={siteConfig.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href={siteConfig.youtube_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-lg mb-4">श्रेणी</p>
            <ul className="space-y-2">
              {categories.slice(0,5).map(category => (
                <li key={category.slug}>
                  <Link to={`/category/${category.slug}`} className="text-gray-400 hover:text-white transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-lg mb-4">उपयुक्त लिंक्स</p>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  आमच्याबद्दल
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  संपर्क
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  गोपनीयता धोरण
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  नियम आणि अटी
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="text-gray-400 hover:text-white transition-colors">
                  जाहिरात द्या
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-lg mb-4">संपर्क</p>
            <address className="not-italic text-gray-400">
              <p>ठाणे, महाराष्ट्र, भारत</p>
              <p className="mt-2">
                <Mail size={16} className="inline mr-2" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </p>
            </address>
            <div className="mt-4">
              <p className="text-sm text-gray-400">
                बातम्यांसाठी सदस्यता घ्या
              </p>
              <form className="mt-2 flex">
                <input
                  type="email"
                  placeholder="ईमेल पत्ता"
                  className="px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-brand-red text-sm"
                />
                <button
                  type="submit"
                  className="bg-brand-red px-4 py-2 rounded-r-md hover:bg-brand-red/90 transition-colors text-sm"
                >
                  सदस्यता
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} Vision Marathi News. सर्व हक्क राखीव.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;