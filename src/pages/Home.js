import React, { useEffect, useState} from 'react'
import Headline from '../components/Headline'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

const Home = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currcat, setCurrcat] = useState('all');
  const [totalNews, setTotalNews] = useState(0);
  const [currTotal, setCurrTotal] = useState(0);
  const [currPage, setCurrPage] = useState(1);  // Start with page 1
  const api_key = process.env.REACT_APP_API_KEY
  
  useEffect(() => {
    fetchResults(currcat, 1); // Fetch results for the default category when the component loads
  }, []);

  const fetchResults = async (category, page) => {
    try {
      setError("");
      setLoading(true);
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_key}&pageSize=5&page=${page}`;
      if (category !== 'all') {
        url += `&category=${category}`;
      }
      console.log(url);
      const results = await axios.get(url);
      setLoading(false);
      if (results.data.status !== 'ok') {
        setError('The URL you are trying to visit is not available.');
      } else {
        // Append new articles when fetching more pages
        setNews((prevNews) => page === 1 ? results.data.articles : [...prevNews, ...results.data.articles]);
        setTotalNews(results.data.totalResults);
        setCurrTotal((prevTotal) => prevTotal + results.data.articles.length);
        setCurrPage(page);
      }
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  const handleCategoryClick = (category) => {
    setCurrcat(category);
    setNews([]); // Clear previous news
    setCurrTotal(0); // Reset total for the new category
    setCurrPage(1); // Start from the first page again
    fetchResults(category, 1); // Fetch results for the selected category
  };

  const fetchMoreData = async () => {
    console.log('curr total',currTotal)
    fetchResults(currcat, currPage + 1); // Fetch next page
  };

  return (
    <div className='p-10 sm:p-16 md:p-20 lg:p-24 md:gap-16 lg:gap-28 lg:pb-0 sm:pb-0 md:pb-0 md:flex'>
      <div className="space-y-8 md:w-1/4">
        <h1 className="text-6xl md:text-4xl lg:text-6xl font-extrabold">Latest News</h1>
        <h2 className="font-bold text-lg">Infinite Scroll Enabled</h2>
        <p className="md:text-sm lg:text-base sm:max-md:max-w-md">Be the first to get to know verified and latest headlines of all categories using the digital NewsPaper.</p>
        <div className="relative cursor-pointer max-w-[200px]">
          <div className="w-20 h-20 bg-gradient-to-b from-[#FF8719] to-white rounded-full"></div>
          <p className='absolute top-[25px] left-10 font-bold'>View All Headlines</p>
        </div>
      </div>
      <div id='scrollableDiv' className="w-full md:w-3/4 md:h-[470px] max-md:mt-11 overflow-y-auto space-y-10 pr-10">
        <div className="flex gap-3 mb-3 flex-wrap">
          <button className={`bg-transparent border px-7 rounded-2xl py-1 ${currcat === 'all' ? 'border border-[#FF8719] text-[#FF8719]' : 'border-gray-600'}`} onClick={() => handleCategoryClick('all')}>All</button>
          <button className={`bg-transparent border px-7 rounded-2xl py-1 ${currcat === 'business' ? 'border border-[#FF8719] text-[#FF8719]' : 'border-gray-600'}`} onClick={() => handleCategoryClick('business')}>business</button>
          <button className={`bg-transparent border px-7 rounded-2xl py-1 ${currcat === 'entertainment' ? 'border border-[#FF8719] text-[#FF8719]' : 'border-gray-600'}`} onClick={() => handleCategoryClick('entertainment')}>entertainment</button>
          <button className={`bg-transparent border px-7 rounded-2xl py-1 ${currcat === 'general' ? 'border border-[#FF8719] text-[#FF8719]' : 'border-gray-600'}`} onClick={() => handleCategoryClick('general')}>general</button>
          <button className={`bg-transparent border px-7 rounded-2xl py-1 ${currcat === 'health' ? 'border border-[#FF8719] text-[#FF8719]' : 'border-gray-600'}`} onClick={() => handleCategoryClick('health')}>health</button>
        </div>
        {loading && (<div>Loading...</div>)}
        {error && (<div>{error}</div>)}
        <InfiniteScroll
          dataLength={news.length} // Corrected dataLength
          next={fetchMoreData}
          hasMore={currTotal < totalNews} // Fetch more if there are remaining articles
          loader={<h4>Loading more...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {news?.map((newsone, index) => (
            <Headline key={index} img={newsone.urlToImage} title={newsone.title} author={newsone.author} date={newsone.publishedAt} url={newsone.url} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
