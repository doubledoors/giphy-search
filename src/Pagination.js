import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ page, pageCount, onPageClick }) => {
  // Show total page count as 1 instead of 0 when we only have 1 page returned in our results.
  pageCount = pageCount === 0 ? 1 : pageCount;

  return (
    <div className="Pagination">
      <div className="Pagination__button Pagination__button--prev" onClick={() => onPageClick()}>
        <i className="fa fa-chevron-left fa-2x" aria-hidden="true"></i>
      </div>
      <span className="Pagination__display">Page {page} of {pageCount}</span>
      <div className=" Pagination__button Pagination__button--next" onClick={() => onPageClick(true)}>
        <i className="fa fa-chevron-right fa-2x" aria-hidden="true"></i>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired
};

export default Pagination;
