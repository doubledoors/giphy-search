import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageClick }) => {
  // Show total page count as 1 instead of 0 when we only have 1 page returned in our results.
  totalPages = totalPages === 0 ? 1 : totalPages;

  return (
    <div className="Pagination">
      <div className="Pagination__button Pagination__button--prev" onClick={() => onPageClick()}>
        <i className="fa fa-chevron-left fa-2x" aria-hidden="true"></i>
      </div>
      <span className="Pagination__display">Page {currentPage} of {totalPages}</span>
      <div className=" Pagination__button Pagination__button--next" onClick={() => onPageClick(true)}>
        <i className="fa fa-chevron-right fa-2x" aria-hidden="true"></i>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired
};

export default Pagination;
