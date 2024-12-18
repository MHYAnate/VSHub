import React, { useState } from 'react'
import NextSvg from "./nextSvg";
import PrevSvg from "./prevSvg";
import NextPageSvg from "./nextPageSvg";
import PrevPageSvg from "./prevPageSvg";

interface PaginationProps {
  postsPerPage: number
  totalPosts: number
  paginate: (pageNumber: number) => void
  currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers: number[] = [];

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const [pageRange, setPageRange] = useState(1);

  const visibleRangeSize = 5;
  

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfFirstPageInRange = (pageRange - 1) * visibleRangeSize + 1;
  const indexOfLastPageInRange = Math.min(pageRange * visibleRangeSize, totalPages);

  const visiblePageNumbers = pageNumbers.slice(indexOfFirstPageInRange - 1, indexOfLastPageInRange);

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
    }
  };

  const handleNextRange = () => {
    if (indexOfLastPageInRange < totalPages) {
      setPageRange(pageRange + 1);
    }
  };

  const handlePrevRange = () => {
    if (pageRange > 1) {
      setPageRange(pageRange - 1);
    }
  };

  return (
    <nav className="flex justify-center items-center mt-8" aria-label="Pagination">
    <div  className="flex items-center space-x-2">
      {pageRange > 1 && (<div className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous page range"
          onClick={()=>handlePrevRange()}> <PrevPageSvg/></div>)}
      <div className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous page" onClick={()=>handlePrevious()}><PrevSvg/></div>
      {visiblePageNumbers.map(number => (
        <div key={number} className="flex items-center space-x-2">
          <div onClick={() => paginate(number)}  className={currentPage === number ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'}>
            {number}
          </div>
        </div>
      ))}
      <div className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next page" onClick={()=>handleNext()}><NextSvg/></div>
      {indexOfLastPageInRange < totalPages && (<div className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next page range" onClick={()=>{handleNextRange()}}><NextPageSvg/></div>)}
    </div>
  </nav>
  )
}

export default Pagination