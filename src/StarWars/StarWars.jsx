import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Person } from './Person';

const initialApiUrl = 'https://swapi.dev/api/people/';

const fetchApiUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const StarWars = () => {
  const [data, setData] = useState(null);
  // isLoading means we are fetching and we do not have cached data
  const {
    data: queryData = {},
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['starwars', initialApiUrl],
    queryFn: ({ pageParam = initialApiUrl }) => fetchApiUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  // useEffect(() => {
  //   fetchApiUrl(initialApiUrl).then((res) => {
  //     setData(res);
  //   });
  // }, []);

  const loadMoreHandler = () => {
    fetchApiUrl(data.next).then((res) => {
      setData({ ...res, results: [...data.results, ...res.results] });
    });
  };

  const hasMore = () => {
    return !!(data && data?.next);
  };

  if (isLoading) return <div className='text-center w-full'>Loading...</div>;
  console.log(queryData);
  if (!queryData && !isLoading)
    return <div className='text-center w-full'>No data</div>;

  if (isError) return <div className='text-center w-full'>{error.message}</div>;

  return (
    <div className='container mx-auto my-10'>
      <h1 className='text-2xl text-center'>Listing StartWars!</h1>
      {data &&
        data.results.map((item, index) => (
          <Person key={index} basicInfo={item} />
        ))}
      <div className='w-full text-center'>
        {hasMore() && (
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={loadMoreHandler}
          >
            Load More
          </button>
        )}
      </div>
      {/* <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreHandler}
        hasMore={hasMore()}
      >
        {data ? (
          data.results.map((item, index) => (
            <Person key={index} basicInfo={item} />
          ))
        ) : (
          <></>
        )}
      </InfiniteScroll> */}

      <InfiniteScroll
        loadMore={() => {
          if (!isFetching) fetchNextPage();
        }}
        hasMore={hasNextPage}
      >
        {queryData.pages.map((page, index) => (
          <div key={index}>
            {page.results.map((item, index) => (
              <Person key={index} basicInfo={item} />
            ))}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default StarWars;
