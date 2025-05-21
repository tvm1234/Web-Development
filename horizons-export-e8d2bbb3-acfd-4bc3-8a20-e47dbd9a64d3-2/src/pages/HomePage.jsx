import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FeaturedSlider from "@/components/FeaturedSlider";
import NewsCard from "@/components/NewsCard";
import CategorySection from "@/components/CategorySection";
import Sidebar from "@/components/homepage/Sidebar";
import MainContent from "@/components/homepage/MainContent";
import { 
  getFeaturedArticles, 
  getLatestArticles, 
  getPopularArticles, 
  getArticlesByCategory,
  getAllCategories
} from "@/data/dataService";

const HomePage = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [latestArticlesOverall, setLatestArticlesOverall] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [categoryBasedArticles, setCategoryBasedArticles] = useState({});
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const homepageMainContentCategorySlugs = ['maharashtra', 'sports', 'entertainment', 'politics'];
  const homepageSidebarCategorySlugs = ['thane', 'crime', 'astrology'];


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          fetchedCategories,
          featured, 
          latest, 
          popular, 
        ] = await Promise.all([
          getAllCategories(),
          getFeaturedArticles(),
          getLatestArticles(6), 
          getPopularArticles(),
        ]);

        setAllCategories(fetchedCategories);
        setFeaturedArticles(featured);
        setLatestArticlesOverall(latest);
        setPopularArticles(popular);

        const allHomepageCategorySlugs = [...homepageMainContentCategorySlugs, ...homepageSidebarCategorySlugs];
        const categoryArticlesPromises = fetchedCategories
          .filter(cat => allHomepageCategorySlugs.includes(cat.slug))
          .map(cat => getArticlesByCategory(cat.slug, 4).then(articles => ({slug: cat.slug, name: cat.name, articles}))); // Fetch up to 4 for each
        
        const resolvedCategoryArticles = await Promise.all(categoryArticlesPromises);
        const articlesByCat = {};
        resolvedCategoryArticles.forEach(data => {
          articlesByCat[data.slug] = {name: data.name, articles: data.articles};
        });
        setCategoryBasedArticles(articlesByCat);

      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">मुख्यपृष्ठ लोड होत आहे...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <section className="mb-10">
        {featuredArticles.length > 0 ? <FeaturedSlider articles={featuredArticles} /> : <p className="text-center text-gray-500">मुख्य बातम्या उपलब्ध नाहीत.</p>}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MainContent
          latestArticlesOverall={latestArticlesOverall}
          categoryBasedArticles={categoryBasedArticles}
          homepageMainContentCategorySlugs={homepageMainContentCategorySlugs}
        />
        <Sidebar
          latestArticlesOverall={latestArticlesOverall}
          popularArticles={popularArticles}
          categoryBasedArticles={categoryBasedArticles}
          homepageSidebarCategorySlugs={homepageSidebarCategorySlugs}
          allCategories={allCategories}
        />
      </div>
    </div>
  );
};

export default HomePage;