
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NewsCard from "@/components/NewsCard";

const SidebarNewsList = ({ title, articles, viewAllLink }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        {viewAllLink && (
          <Link to={viewAllLink} className="text-sm text-brand-red hover:underline">
            सर्व पहा
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NewsCard article={article} compact={true} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SidebarNewsList;
