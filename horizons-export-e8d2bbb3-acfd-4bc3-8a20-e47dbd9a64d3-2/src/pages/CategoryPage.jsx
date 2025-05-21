
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import NewsCard from "@/components/NewsCard";
import SidebarNewsList from "@/components/SidebarNewsList";
import { getArticlesByCategory, getPopularArticles, getCategoryBySlug } from "@/data/dataService";

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState(null);
  const [popularArticles, setPopularArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoryData, categoryArticles, popular] = await Promise.all([
          getCategoryBySlug(categorySlug),
          getArticlesByCategory(categorySlug),
          getPopularArticles()
        ]);
        
        setCategory(categoryData);
        setArticles(categoryArticles);
        setPopularArticles(popular);
      } catch (error) {
        console.error(`Failed to fetch data for category ${categorySlug}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">बातम्या लोड होत आहेत...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">श्रेणी सापडली नाही</h2>
          <p className="text-gray-600">आपण शोधत असलेली श्रेणी अस्तित्वात नाही.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${category.color || 'bg-brand-red'} text-white p-6 rounded-lg mb-8`}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
        <p className="text-white/90">{category.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {articles[0] && (
                <NewsCard article={articles[0]} featured={true} />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.slice(1).map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">या श्रेणीमध्ये सध्या कोणत्याही बातम्या उपलब्ध नाहीत</h2>
              <p className="text-gray-600">कृपया नंतर पुन्हा तपासा.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <SidebarNewsList 
            title="लोकप्रिय बातम्या" 
            articles={popularArticles} 
          />
          <div className="bg-gradient-to-r from-brand-red to-brand-orange text-white p-6 rounded-lg mb-6 text-center">
            <p className="text-xs mb-2">जाहिरात</p>
            <h3 className="text-xl font-bold mb-2">आमच्यासोबत जाहिरात द्या</h3>
            <p className="text-sm mb-4">आपल्या व्यवसायाची पोहोच वाढवा</p>
            <button className="bg-white text-brand-red font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
              अधिक माहिती
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3">न्यूजलेटर सदस्यता</h3>
            <p className="text-sm text-gray-600 mb-4">
              ताज्या बातम्या आणि अपडेट्स मिळवण्यासाठी आमच्या न्यूजलेटरची सदस्यता घ्या
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="आपला ईमेल पत्ता"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
                required
              />
              <button
                type="submit"
                className="w-full bg-brand-red text-white font-semibold py-2 rounded-md hover:bg-brand-red/90 transition-colors"
              >
                सदस्यता घ्या
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
