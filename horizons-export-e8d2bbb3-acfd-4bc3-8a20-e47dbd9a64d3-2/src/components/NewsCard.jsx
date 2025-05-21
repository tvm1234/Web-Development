
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";

const NewsCard = ({ article, featured = false }) => {
  if (!article) {
    return null;
  }

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" },
  };

  const defaultImageUrl = "https://images.unsplash.com/photo-1495020689067-958852a7765e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjAzNTV8MHwxfHNlYXJjaHwxfHxuZXdzJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3MTAyMjY4MTd8MA&ixlib=rb-4.0.3&q=80&w=1080";


  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <Link to={`/article/${article.id}`} className={`block ${featured ? "md:w-1/2" : "w-full h-48 md:h-56"}`}>
        <img
          src={article.imageUrl || defaultImageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className={`p-4 sm:p-5 flex flex-col justify-between flex-1 ${featured ? "md:w-1/2" : ""}`}>
        <div>
          <Link 
            to={`/category/${article.category}`}
            className={`inline-block text-xs font-semibold mb-2 px-2 py-0.5 rounded-full category-${article.category}`}
          >
            {article.categoryName || article.category}
          </Link>
          <Link to={`/article/${article.id}`} className="group">
            <h3
              className={`font-bold text-gray-800 group-hover:text-brand-red transition-colors duration-300 ${
                featured ? "text-xl lg:text-2xl mb-2" : "text-lg mb-1"
              } leading-tight line-clamp-2`}
            >
              {article.title}
            </h3>
          </Link>
          {featured && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {article.excerpt}
            </p>
          )}
        </div>
        <div className="mt-auto pt-2">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>{article.date}</span>
            <span className="mx-1.5">•</span>
            <Clock size={14} className="mr-1" />
            <span>{article.readTime} मिनिटे</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
