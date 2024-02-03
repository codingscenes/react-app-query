import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Person } from './Person';

const initialApiUrl = 'https://swapi.dev/api/people/';

const fetchApiUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const StarWars = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchApiUrl(initialApiUrl).then((res) => {
      console.log(res);
      setData(res);
    });
  }, []);

  const loadMoreHandler = () => {
    fetchApiUrl(data.next).then((res) => {
      setData({ ...res, results: [...data.results, ...res.results] });
    });
  };

  return (
    <div className='container mx-auto my-10'>
      <h1 className='text-2xl text-center'>Listing StartWars!</h1>
      {data && data.results.map((item) => <Person basicInfo={item} />)}
      <div className='w-full text-center'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={loadMoreHandler}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default StarWars;
