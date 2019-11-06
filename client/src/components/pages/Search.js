import React, { useContext, useEffect } from 'react';
import queryString from 'query-string';
import uuid from 'uuid';
import ProductContext from '../../context/product/productContext';
import SearchItem from './SearchItem';
const Search = ({ location }) => {
  const { searchProductByName, products, loading } = useContext(ProductContext);

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    console.log(name);
    searchProductByName(name);
    // eslint-disable-next-line
  }, [location.search]);

  if (loading) {
    return <h4>Loading</h4>;
  }

  if (products.length === 0) {
    return <h4>No match was found</h4>;
  }

  return (
    <div>
      <h4>Search Results</h4>

      <h5>Products</h5>

      <ul>
        {products.map(product => (
          <SearchItem product={product} key={uuid.v4()} />
        ))}
      </ul>
    </div>
  );
};

export default Search;
