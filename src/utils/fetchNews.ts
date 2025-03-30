import { formatDistanceToNow } from 'date-fns';
import { NewsArticle } from '../types/NewsArticle';

interface RSSFeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author?: string;
}

interface RSSFeed {
  rss: {
    channel: {
      item: RSSFeedItem[];
    };
  };
}

const parseRSS = async (url: string): Promise<RSSFeed> => {
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, 'text/xml');
  const items = Array.from(xmlDoc.querySelectorAll('item')).map(item => ({
    title: item.querySelector('title')?.textContent || '',
    link: item.querySelector('link')?.textContent || '',
    description: item.querySelector('description')?.textContent || '',
    pubDate: item.querySelector('pubDate')?.textContent || '',
    author: item.querySelector('author')?.textContent || '',
  }));
  return { rss: { channel: { item: items } } };
};

const extractArticles = (items: RSSFeedItem[], source: string): NewsArticle[] => {
  return items.map((item) => ({
    title: item.title || 'No title',
    summary: item.description?.replace(/<[^>]*>?/gm, '') || 'No summary available',
    url: item.link || '',
    date: formatDistanceToNow(new Date(item.pubDate || ''), { addSuffix: true }),
    source: source,
    pubDate: item.pubDate || '',
  }));
};

const fetchNewsFromSource = async (url: string, source: string): Promise<NewsArticle[]> => {
  try {
    const { rss: { channel: { item } } } = await parseRSS(url);
    return extractArticles(item, source);
  } catch (error) {
    console.error(`Error fetching news from ${source}:`, error);
    return [];
  }
};

const fetchAllNews = async (sources: { url: string; source: string }[]): Promise<NewsArticle[]> => {
  const newsPromises = sources.map(({ url, source }) => fetchNewsFromSource(url, source));
  const newsResults = await Promise.all(newsPromises);
  return newsResults.flat();
};

export const fetchNews = async (): Promise<NewsArticle[]> => {
  const sources = [
    {
      url: 'https://api.allorigins.win/raw?url=https://www.reuters.com/news/rss',
      source: 'Reuters',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.timesofisrael.com/feed/',
      source: 'The Times of Israel',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.jpost.com/Rss/RssFeedsHeadlines.aspx',
      source: 'The Jerusalem Post',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.haaretz.co.il/rss/1.1',
      source: 'Haaretz',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.ynetnews.com/RSS/news.xml',
      source: 'Ynetnews',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.i24news.tv/en/rss',
      source: 'i24NEWS',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.aljazeera.com/xml/rss/all.xml',
      source: 'Al Jazeera',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.cnn.com/rss',
      source: 'CNN',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.ap.org/rss',
      source: 'Associated Press (AP)',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.bbc.com/news/rss.xml',
      source: 'BBC News',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.theguardian.com/world/rss',
      source: 'The Guardian',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
      source: 'The New York Times',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://feeds.washingtonpost.com/rss/world',
      source: 'The Washington Post',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.lemonde.fr/rss/une.xml',
      source: 'Le Monde',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://feeds.elpais.com/mrss-s/pages/elpais/portada/',
      source: 'El País',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://972mag.com/feed/',
      source: '+972 Magazine',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.palestinechronicle.com/feed/',
      source: 'Palestine Chronicle',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.allisrael.com/rss',
      source: 'All Israel News',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.middleeasteye.net/rss',
      source: 'Middle East Eye',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.independent.co.uk/rss',
      source: 'The Independent',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.google.com/alerts/feeds/1234567890/news',
      source: 'Google News',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.maariv.co.il/rss',
      source: 'Maariv',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.israelhayom.co.il/rss',
      source: 'Israel Hayom',
    },
    {
      url: 'https://api.allorigins.win/raw?url=https://www.walla.co.il/rss',
      source: 'Walla!',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.timesofisrael.com/feed/',
        source: 'The Times of Israel',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.jpost.com/Rss/RssFeedsHeadlines.aspx',
        source: 'The Jerusalem Post',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.haaretz.com/rss',
        source: 'Haaretz (English)',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.israelnationalnews.com/rss',
        source: 'Israel National News (Arutz Sheva)',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.i24news.tv/en/rss',
        source: 'i24NEWS',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.israelhayom.com/feed/',
        source: 'Israel Hayom',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.allisrael.com/rss',
        source: 'All Israel News',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.ynetnews.com/category/3082',
        source: 'Ynetnews',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.walla.co.il/feed',
        source: 'Walla! News',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.maariv.co.il/Rss/RssFeedsHeadlines.aspx',
        source: 'Maariv (English)',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.makorrishon.co.il/feed/',
        source: 'Makor Rishon',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.globes.co.il/webservice/rss/rssfeeder.asp',
        source: 'Globes',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.themarker.com/cmlink/1.1459119',
        source: 'TheMarker',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.jfeed.com/feed/',
        source: 'JFeed',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.debka.com/feed/',
        source: 'DEBKAfile',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.hamodia.com/feed/',
        source: 'Hamodia',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.jta.org/feed',
        source: 'Jewish Telegraphic Agency (JTA)',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.jewishpress.com/feed/',
        source: 'The Jewish Press',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.israel21c.org/feed/',
        source: 'ISRAEL21c',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.jewishjournal.com/feed/',
        source: 'Jewish Journal',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.algemeiner.com/feed/',
        source: 'The Algemeiner',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.chabad.org/tools/rss.htm',
        source: 'Chabad.org',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.jewishfeeds.com/rss',
        source: 'Jewish Feeds',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://israelnow.news/feed/',
        source: 'Israel Now',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://www.albawaba.com/rss',
        source: 'Al Bawaba',
    },
    {
        url: 'https://api.allorigins.win/raw?url=https://tps.co.il/tpsnews-rss/',
        source: 'Tazpit Press Service (TPS)',
    }
  ];

  const newsData = await fetchAllNews(sources);

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  return newsData.filter(article => new Date(article.pubDate) > twoDaysAgo);
};
