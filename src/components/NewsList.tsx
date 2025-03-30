import React from 'react';
import NewsCard from './NewsCard';
import { NewsArticle } from '../types/NewsArticle';

interface NewsListProps {
  articles: NewsArticle[];
  translated: boolean;
  currentPage: number;
  articlesPerPage: number;
}

const NewsList: React.FC<NewsListProps> = ({ articles, translated, currentPage, articlesPerPage }) => {
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="space-y-4">
      {currentArticles.map((article, index) => (
        <NewsCard key={index} article={article} translated={translated} />
      ))}
    </div>
  );
};

export default NewsList;
