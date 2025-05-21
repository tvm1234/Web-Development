
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getBreakingNewsArticles } from "@/data/dataService";

const BreakingNewsTicker = () => {
  const [breakingNews, setBreakingNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const newsItems = await getBreakingNewsArticles(7); // Fetch 7 breaking news items
      setBreakingNews(newsItems);
      setLoading(false);
    };
    fetchNews();
  }, []);

  if (loading || breakingNews.length === 0) {
    return (
      <div className="bg-brand-red text-white py-2 overflow-hidden">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-white text-brand-red font-bold px-3 py-1 mx-4 rounded">
            ब्रेकिंग न्यूज
          </div>
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <span className="mx-8 text-sm md:text-base">ब्रेकिंग न्यूज लोड होत आहे...</span>
          </div>
        </div>
      </div>
    );
  }

  const tickerContent = breakingNews.map((news) => (
    <Link 
      to={`/article/${news.id}`} 
      key={news.id} 
      className="mx-6 md:mx-8 text-sm md:text-base hover:underline"
    >
      {news.title}
    </Link>
  ));
  
  // Calculate duration based on content length to maintain consistent speed
  const estimatedContentWidth = breakingNews.reduce((acc, item) => acc + item.title.length * 10, 0); // Approximate width
  const duration = Math.max(20, estimatedContentWidth / 50) ; // Adjust 50 for speed factor

  return (
    <div className="bg-brand-red text-white py-2 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-white text-brand-red font-bold px-3 py-1 mx-4 rounded">
          ब्रेकिंग न्यूज
        </div>
        <div className="overflow-hidden whitespace-nowrap flex-1">
          <motion.div
            className="inline-block"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              ease: "linear",
              duration: duration,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {tickerContent}
          </motion.div>
          <motion.div
            className="inline-block"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              ease: "linear",
              duration: duration,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {tickerContent}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;