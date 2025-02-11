import { useState, useEffect } from 'react';

export function useInfiniteScroll(items, itemsPerPage = 6) {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const start = 0;
    const end = page * itemsPerPage;
    setDisplayedItems(items.slice(start, end));
    setHasMore(end < items.length);
  }, [items, page, itemsPerPage]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return { displayedItems, hasMore, loadMore };
} 