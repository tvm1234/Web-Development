import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NewsCard from "@/components/NewsCard";
import CategorySection from "@/components/CategorySection";

const MainContent = ({ latestArticlesOverall, categoryBasedArticles, homepageMainContentCategorySlugs }) => {
  return (
    <div className="lg:col-span-2">
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <motion.h2 
            className="text-2xl font-bold relative pl-4 border-l-4 border-brand-red"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            ताज्या बातम्या (एकूण)
          </motion.h2>
          <Link 
            to="/category/latest-news"
            className="text-brand-red hover:text-brand-orange transition-colors"
          >
            सर्व पहा
          </Link>
        </div>

        {latestArticlesOverall.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestArticlesOverall.slice(0, 2).map((article) => (
                <NewsCard key={article.id} article={article} featured={true} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {latestArticlesOverall.slice(2, 5).map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </>
        ) : <p className="text-gray-500">ताज्या बातम्या उपलब्ध नाहीत.</p>}
      </section>

      {homepageMainContentCategorySlugs.map(slug => {
        const categoryData = categoryBasedArticles[slug];
        if (categoryData && categoryData.articles.length > 0) {
          return (
            <CategorySection 
              key={slug}
              title={categoryData.name} 
              slug={slug}
              articles={categoryData.articles.slice(0, 3)} 
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default MainContent;