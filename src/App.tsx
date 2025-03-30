import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsList from './components/NewsList';
import SourceFilter from './components/SourceFilter';
import { NewsArticle } from './types/NewsArticle';
import { fetchNews } from './utils/fetchNews';

const App: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlesPerPage = 5;

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const newsData = await fetchNews();
        setArticles(newsData);
        setLastUpdated(new Date().toLocaleString());
      } catch (error) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    getNews();
    const interval = setInterval(getNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const newsData = await fetchNews();
      setArticles(newsData);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const keywords = [
    'Hamas',
    'Palestinian Islamic Jihad',
    'Israel Defense Forces (IDF)',
    'United Nations Relief and Works Agency (UNRWA)',
    'Palestine Liberation Organization (PLO)',
    'Hezbollah',
    'Operation Protective Edge',
    'Operation Cast Lead',
    'Operation Guardian of the Walls',
    'First Intifada',
    'Second Intifada',
    'Oslo Accords',
    'Six-Day War',
    'Yom Kippur War',
    'Gaza City',
    'Shejaiya',
    'Khan Younis',
    'Rafah',
    'Sderot',
    'Ashkelon',
    'West Bank',
    'East Jerusalem',
    'Civilian casualties',
    'Human shields',
    'War crimes',
    'Ceasefire violations',
    'Blockade',
    'Humanitarian aid',
    'Displacement',
    'Refugee camps',
    'Rocket attacks',
    'Airstrikes',
    'Tunnel networks',
    'Iron Dome',
    'Hostage situations',
    'Settlement expansion',
    'Annexation',
    'Green Line',
    'UN Resolution 242',
    'Two-state solution',
    'Right of return',
    'Settlement building',
    'Annexation',
    'BDS (Boycott, Divestment, Sanctions)',
    'Ceasefire agreements',
    'Peace process',
    '#FreePalestine',
    '#StandWithIsrael',
    '#GazaUnderAttack',
    '#PrayForGaza',
    '#IsraelUnderFire',
    '#StopTheOccupation',
    '#EndTheSiege',
    '#PeaceInTheMiddleEast'
  ];

  const filteredArticles = articles.filter((article) => {
    const isSourceMatch = selectedSource ? article.source === selectedSource : true;
    const isKeywordMatch = keywords.some(keyword =>
      article.title.toLowerCase().includes(keyword.toLowerCase()) ||
      article.summary.toLowerCase().includes(keyword.toLowerCase())
    );
    return isSourceMatch && isKeywordMatch;
  });

  const sources = Array.from(new Set(articles.map((article) => article.source)));

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Latest News</h2>
          <div className="flex space-x-4">
            <button onClick={handleRefresh} className="text-blue-500 hover:underline">
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
        {lastUpdated && <p className="text-gray-500">Last updated: {lastUpdated}</p>}
        <SourceFilter
          sources={sources}
          selectedSource={selectedSource}
          onSelectSource={setSelectedSource}
        />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredArticles.length > 0 ? (
          <>
            <NewsList articles={filteredArticles} translated={false} currentPage={currentPage} articlesPerPage={articlesPerPage} />
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(filteredArticles.length / articlesPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p>No news available</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
