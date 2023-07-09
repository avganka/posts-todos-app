import {useState} from 'react';

export const usePagination = (initailPage = 1, initailItemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(initailPage);
  const [itemsPerPage, setItemsPerPage] = useState(initailItemsPerPage);

  const goToNextPage = () => setCurrentPage((prev) => prev + 1);
  const goToPreviousPage = () => setCurrentPage((prev) => prev - 1);
  const goToPage = (page: number) => setCurrentPage(page);
  const setItemsCountPerPage = (count: number) => setItemsPerPage(count);

  return {
    currentPage,
    itemsPerPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    setItemsCountPerPage,
  };
};
