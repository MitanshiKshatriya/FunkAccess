import React, { useState, useEffect } from 'react'

const Pagination = ({ data, RenderComponent, pageLimit, dataLimit }) => {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
  
    const goToNextPage = () => {
        setCurrentPage((page) => page + 1);
    }
  
    const goToPreviousPage = () => {
        setCurrentPage((page) => page - 1);
    }
  
    const changePage = (event) => {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }
  
    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };
  
    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };
  
    return (
      <>
          {/* show the posts, 10 posts at a time */}
        <div className="mx-10 grid grid-flow-row grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
    
      {getPaginatedData().map((prod, idx) => (
        <RenderComponent key={idx} name={prod.name} price={prod.price} imgLink={prod.urlPhoto} product={prod} />
      ))}
    </div>

    {/* show the pagiantion
        it consists of next and previous buttons
        along with page numbers, in our case, 5 page
        numbers at a time
    */}
    <div className="flex justify-center align-center my-5">
      {/* previous button */}
      <button
        onClick={goToPreviousPage}
        className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
      >
        {"<"}
      </button>

      {/* show page numbers */}
      {getPaginationGroup().map((item, index) => (
        <button
          key={index}
          onClick={changePage}
          className={`paginationItem ${currentPage === item ? 'active' : null}`}
        >
          <span>{item}</span>
        </button>
      ))}

      {/* next button */}
      <button
        onClick={goToNextPage}
        className={`next ${currentPage === pages ? 'disabled' : ''}`}
      >
        {">"}
      </button>
    </div>
      </>
    );
  }

export default Pagination
