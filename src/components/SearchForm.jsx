// SearchForm.jsx
import React from "react";

const SearchForm = ({ search, setSearch, handleSubmit }) => (
  <div className='search-bar1'>
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Serie...'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button type='submit'>
        <i className='fas fa-search'></i>
      </button>
    </form>
  </div>
);

export default SearchForm;
