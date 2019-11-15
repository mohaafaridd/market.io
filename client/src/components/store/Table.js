import React, { Fragment } from 'react';
import { useTable, useSortBy } from 'react-table';

const Table = ({ columns, data }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable(
		{
			columns,
			data,
		},
		useSortBy,
	);
	return (
		<Fragment>
			<table {...getTableProps()} className=''>
				<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									<span className='select-none'>{column.render('Header')}</span>
									<span className='text-white select-none'>
										{column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr
								{...row.getRowProps()}
								className='hover:bg-gray-900 cursor-default'
							>
								{row.cells.map(cell => {
									return (
										<td {...cell.getCellProps()}>
											<span className='select-all'>{cell.render('Cell')}</span>
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</Fragment>
	);
};

export default Table;
