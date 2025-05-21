
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import NewsCard from "@/components/NewsCard";
import { getArticleById, getRelatedArticles, getCategoryBySlug } from "@/data/dataService";

const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryColor, setCategoryColor] = useState('bg-brand-red');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setLoading(true);
      try {
        const articleData = await getArticleById(articleId);
        setArticle(articleData);
        
        if (articleData) {
          const [related, categoryData] = await Promise.all([
             getRelatedArticles(articleId, articleData.category),
             getCategoryBySlug(articleData.category)
          ]);
          setRelatedArticles(related);
          if (categoryData) {
            setCategoryColor(categoryData.color || 'bg-brand-red');
          }
        }
      } catch (error) {
        console.error(`Failed to fetch article ${articleId}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [articleId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">बातमी लोड होत आहे...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">बातमी सापडली नाही</h2>
          <p className="text-gray-600">आपण शोधत असलेली बातमी अस्तित्वात नाही.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to={`/category/${article.category}`}
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${categoryColor} text-white`}
          >
            {article.categoryName || article.category}
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-500 mb-6 text-sm md:text-base">
            <span className="flex items-center mr-3 mb-1 md:mb-0">
              <Calendar size={16} className="mr-1" />
              {article.date}
            </span>
            <span className="hidden md:inline mx-2">•</span>
            <span className="flex items-center mr-3 mb-1 md:mb-0">
              <Clock size={16} className="mr-1" />
              {article.readTime} मिनिटे
            </span>
            <span className="hidden md:inline mx-2">•</span>
            <span className="mr-3 mb-1 md:mb-0">{article.author}</span>
          </div>
        </motion.div>

        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <span className="text-gray-600 flex items-center">
            <Share2 size={16} className="mr-1" />
            शेअर करा:
          </span>
          <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-sky-500 hover:text-sky-700 transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
            <Linkedin size={20} />
          </a>
        </div>

        <div className="prose max-w-none mb-8 text-gray-800 leading-relaxed">
          <p className="text-lg font-medium mb-6 text-gray-900">{article.excerpt}</p>
          
          {article.content && typeof article.content === 'string' && article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">टॅग्स:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Link 
                  key={index}
                  to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-8 mb-12">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <MessageCircle size={20} className="mr-2 text-brand-red" />
            प्रतिक्रिया द्या
          </h3>
          
          <form className="space-y-4">
            <div>
              <textarea
                placeholder="आपली प्रतिक्रिया लिहा..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
                rows={4}
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="नाव"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
              />
              <input
                type="email"
                placeholder="ईमेल"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-red text-white font-semibold px-6 py-2 rounded-md hover:bg-brand-red/90 transition-colors"
            >
              प्रतिक्रिया पाठवा
            </button>
          </form>
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 relative pl-4 border-l-4 border-brand-red">
            संबंधित बातम्या
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <NewsCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
