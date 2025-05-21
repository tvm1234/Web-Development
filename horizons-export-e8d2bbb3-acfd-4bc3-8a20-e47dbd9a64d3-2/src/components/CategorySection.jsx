
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import NewsCard from "@/components/NewsCard";

const CategorySection = ({ title, slug, articles }) => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <motion.h2 
          className="text-2xl font-bold relative pl-4 border-l-4 border-brand-red"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <Link 
          to={`/category/${slug}`} 
          className="flex items-center text-brand-red hover:text-brand-orange transition-colors"
        >
          <span className="mr-1">अधिक पहा</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
