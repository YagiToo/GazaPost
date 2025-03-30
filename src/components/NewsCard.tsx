import React from 'react';
import { NewsArticle } from '../types/NewsArticle';

interface NewsCardProps {
  article: NewsArticle;
  translated: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, translated }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md transition-transform hover:-translate-y-1">
      <h3 className="text-xl font-bold mb-2 text-white">{article.title}</h3>
      <p className="text-gray-400">{article.summary}</p>
      <div className="flex justify-between items-center mt-2">
        <a href={article.url} className="text-blue-500 hover:underline">
          Read more
        </a>
        <p className="text-gray-400">{article.date}</p>
      </div>
    </div>
  );
};

export default NewsCard;
