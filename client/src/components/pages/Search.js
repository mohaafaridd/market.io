import React, { useContext, useEffect } from 'react';
import queryString from 'query-string';
import ProductContext from '../../context/product/productContext';

const Search = ({ location }) => {
  const { searchProductByName, products, loading } = useContext(ProductContext);

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    console.log(name);
    searchProductByName(name);
  }, [location.search]);

  if (loading) {
    return <h4>Loading</h4>;
  }

  return (
    <div>
      <h4>Search Results</h4>

      <h5>Products</h5>

      <ul>
        {products.map(product => (
          <li>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
