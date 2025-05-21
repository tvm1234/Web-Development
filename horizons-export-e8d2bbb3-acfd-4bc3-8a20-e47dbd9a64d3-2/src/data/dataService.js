
import { supabase } from '@/lib/supabaseClient';

const mapArticleFromSupabase = (article) => ({
  id: article.id,
  title: article.title,
  excerpt: article.excerpt,
  content: article.content,
  category: article.category_slug,
  categoryName: article.categories?.name,
  date: article.published_at ? new Date(article.published_at).toLocaleDateString('mr-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A',
  readTime: article.read_time,
  author: article.author,
  tags: article.tags || [],
  featured: article.featured,
  isBreaking: article.is_breaking,
  imageUrl: article.image_url || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjAzNTV8MHwxfHNlYXJjaHwxfHxuZXdzfGVufDB8fHx8MTcxMDIyNzA4MHww&ixlib=rb-4.0.3&q=80&w=1080'
});

const mapCategoryFromSupabase = (category) => ({
  id: category.id,
  slug: category.slug,
  name: category.name,
  description: category.description,
  color: category.color,
});

export const getAllArticles = async () => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories (
        name
      )
    `)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
  return data.map(mapArticleFromSupabase);
};

export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });


  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data.map(mapCategoryFromSupabase);
};

export const getArticlesByCategory = async (categorySlug, limit = 10) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq('category_slug', categorySlug)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error(`Error fetching articles for category ${categorySlug}:`, error);
    return [];
  }
  return data.map(mapArticleFromSupabase);
};

export const getFeaturedArticles = async () => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
  return data.map(mapArticleFromSupabase);
};

export const getBreakingNewsArticles = async (count = 5) => {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, category_slug')
    .eq('is_breaking', true)
    .order('published_at', { ascending: false })
    .limit(count);
  
  if (error) {
    console.error('Error fetching breaking news articles:', error);
    return [];
  }
  return data; // No need to map fully, just title and link info
};

export const getLatestArticles = async (count = 6) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories (
        name
      )
    `)
    .order('published_at', { ascending: false })
    .limit(count);

  if (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }
  return data.map(mapArticleFromSupabase);
};

export const getPopularArticles = async (count = 4) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories (
        name
      )
    `)
    .order('read_time', { ascending: false }) // Example: use read_time for popularity
    .limit(count);

  if (error) {
    console.error('Error fetching popular articles:', error);
    return [];
  }
  return data.map(mapArticleFromSupabase);
};

export const getArticleById = async (id) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq('id', parseInt(id))
    .single();

  if (error) {
    console.error(`Error fetching article with id ${id}:`, error);
    return null;
  }
  return data ? mapArticleFromSupabase(data) : null;
};

export const getRelatedArticles = async (articleId, categorySlug, count = 3) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq('category_slug', categorySlug)
    .neq('id', parseInt(articleId))
    .order('published_at', { ascending: false })
    .limit(count);

  if (error) {
    console.error(`Error fetching related articles for ${categorySlug}:`, error);
    return [];
  }
  return data.map(mapArticleFromSupabase);
};

export const getCategoryBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }
  return data ? mapCategoryFromSupabase(data) : null;
};

export const getSiteConfigurations = async () => {
  const { data, error } = await supabase
    .from('site_configurations')
    .select('config_key, config_value');

  if (error) {
    console.error('Error fetching site configurations:', error);
    return {};
  }

  const config = {};
  data.forEach(item => {
    config[item.config_key] = item.config_value;
  });
  return config;
};
