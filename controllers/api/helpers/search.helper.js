const query = ({
  category,
  color,
  manufacturer,
  maximum = 1000000,
  maxRating = 5,
  minimum = 0,
  minRating = 0,
  name,
}) => ({
  $and: [
    // if a name is passed as a query param it will be used for search
    // if not the query will just check for name availability in the document
    name ? { $text: { $search: name } } : { name: { $exists: true } },
    { color: color ? color : { $exists: true } },
    { manufacturer: manufacturer ? manufacturer : { $exists: true } },
    { category: category ? category : { $exists: true } },
    {
      price: {
        $gte: parseFloat(minimum),
        $lte: parseFloat(maximum),
      },
    },
    {
      $or: [
        {
          score: {
            $gte: parseFloat(minRating),
            $lte: parseFloat(maxRating),
          },
        },
        {
          score: null,
        },
      ],
    },
  ],
});

module.exports = {
  query,
};
