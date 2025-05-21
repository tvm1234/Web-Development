import React from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SidebarNewsList from "@/components/SidebarNewsList";

const Sidebar = ({ latestArticlesOverall, popularArticles, categoryBasedArticles, homepageSidebarCategorySlugs, allCategories }) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <Tabs defaultValue="latest" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 bg-gray-100">
            <TabsTrigger value="latest" className="data-[state=active]:bg-brand-red data-[state=active]:text-white">
              नवीनतम
            </TabsTrigger>
            <TabsTrigger value="popular" className="data-[state=active]:bg-brand-red data-[state=active]:text-white">
              लोकप्रिय
            </TabsTrigger>
          </TabsList>
          <TabsContent value="latest" className="space-y-4">
            {latestArticlesOverall.slice(0, 5).map((article) => (
              <div key={article.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <Link to={`/article/${article.id}`} className="hover:text-brand-red transition-colors">
                  <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                </Link>
                <p className="text-xs text-gray-500 mt-1">{article.date}</p>
              </div>
            ))}
            {latestArticlesOverall.length === 0 && <p className="text-gray-500 text-sm">नवीनतम बातम्या उपलब्ध नाहीत.</p>}
          </TabsContent>
          <TabsContent value="popular" className="space-y-4">
            {popularArticles.map((article) => (
              <div key={article.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <Link to={`/article/${article.id}`} className="hover:text-brand-red transition-colors">
                  <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                </Link>
                <p className="text-xs text-gray-500 mt-1">{article.date}</p>
              </div>
            ))}
            {popularArticles.length === 0 && <p className="text-gray-500 text-sm">लोकप्रिय बातम्या उपलब्ध नाहीत.</p>}
          </TabsContent>
        </Tabs>
      </div>
      
      {homepageSidebarCategorySlugs.map(slug => {
        const categoryData = categoryBasedArticles[slug];
        const categoryInfo = allCategories.find(cat => cat.slug === slug);
        if (categoryInfo && categoryData && categoryData.articles.length > 0) {
          return (
            <SidebarNewsList 
              key={slug}
              title={categoryInfo.name} 
              articles={categoryData.articles.slice(0, 4)} 
              viewAllLink={`/category/${slug}`} 
            />
          );
        }
        return null;
      })}

      <div className="bg-gradient-to-r from-brand-red to-brand-orange text-white p-6 rounded-lg mb-6 text-center">
        <p className="text-xs mb-2">जाहिरात</p>
        <h3 className="text-xl font-bold mb-2">आमच्यासोबत जाहिरात द्या</h3>
        <p className="text-sm mb-4">आपल्या व्यवसायाची पोहोच वाढवा</p>
        <Link 
          to="/advertise" 
          className="inline-block bg-white text-brand-red font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          अधिक माहिती
        </Link>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
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

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-3">आम्हाला फॉलो करा</h3>
        <div className="flex space-x-4">
          <a
            href="#"
            className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            f
          </a>
          <a
            href="#"
            className="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
          >
            t
          </a>
          <a
            href="#"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
          >
            i
          </a>
          <a
            href="#"
            className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
          >
            y
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;