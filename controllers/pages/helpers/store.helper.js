const dashboardQuery = store => {
  return [
    { $match: { store: store._id, ordered: true } },
    {
      $group: {
        _id: '$product',
        sold: { $sum: '$amount' },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: '$product' },
    {
      $project: {
        product: '$product',
        revenue: { $multiply: ['$product.price', '$sold'] },
        sold: '$sold',
        price: '$product.price',
      },
    },
    { $sort: { sold: -1 } },
  ];
};

module.exports = {
  dashboardQuery,
};
