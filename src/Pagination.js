import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ page, pageCount, onPageClick }) => {
  return (
    <div className="Pagination">
      <span onClick={() => onPageClick()}>
        <i className="fa fa-chevron-left fa-2x Pagination__button Pagination__button--prev" aria-hidden="true"></i>
      </span>
      <span className="Pagination__display">Page {page} of {pageCount}</span>
      <span onClick={() => onPageClick(true)}>
        <i className="fa fa-chevron-right fa-2x Pagination__button Pagination__button--next" aria-hidden="true"></i>
      </span>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired
};

export default Pagination;
