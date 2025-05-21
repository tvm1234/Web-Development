import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FeaturedSlider = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const defaultImageUrl = "https://images.unsplash.com/photo-1495020689067-958852a7765e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjAzNTV8MHwxfHNlYXJjaHwxfHxuZXdzJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3MTAyMjY4MTd8MA&ixlib=rb-4.0.3&q=80&w=1080";

  useEffect(() => {
    if (!articles || articles.length === 0) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles]);

  if (!articles || articles.length === 0) {
    return (
      <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">मुख्य बातम्या लोड होत आहेत किंवा उपलब्ध नाहीत.</p>
      </div>
    );
  }

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: "0%",
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const currentArticle = articles[currentIndex];

  const categoryClasses = {
    'latest-news': 'bg-red-600 text-white',
    'maharashtra': 'bg-orange-500 text-white',
    'thane': 'bg-yellow-500 text-black',
    'entertainment': 'bg-purple-600 text-white',
    'astrology': 'bg-indigo-500 text-white',
    'sports': 'bg-green-500 text-white',
    'crime': 'bg-gray-700 text-white',
    'politics': 'bg-blue-700 text-white',
  };
  
  const categorySpecificClass = categoryClasses[currentArticle.category] || 'bg-gray-500 text-white';


  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="absolute w-full h-full"
        >
          <div className="relative w-full h-full">
            <img
              className="w-full h-full object-cover"
              alt={currentArticle.title}
              src={currentArticle.imageUrl || defaultImageUrl} 
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
              <span className={cn(
                "inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3",
                categorySpecificClass
              )}>
                {currentArticle.categoryName || currentArticle.category}
              </span>
              
              <Link to={`/article/${currentArticle.id}`}>
                <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-tight hover:underline">
                  {currentArticle.title}
                </h2>
              </Link>
              
              <p className="text-sm md:text-base text-gray-200 mb-4 max-w-3xl line-clamp-2 md:line-clamp-3">
                {currentArticle.excerpt}
              </p>
              
              <div className="flex items-center text-sm text-gray-300">
                <span>{currentArticle.date}</span>
                <span className="mx-2">•</span>
                <span>{currentArticle.readTime} मिनिटे</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-10 rounded-full"
        onClick={handlePrevious}
      >
        <ChevronLeft size={24} />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-10 rounded-full"
        onClick={handleNext}
      >
        <ChevronRight size={24} />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {articles.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out ${
              index === currentIndex ? "bg-white scale-125 w-4" : "bg-white/60 hover:bg-white"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSlider;