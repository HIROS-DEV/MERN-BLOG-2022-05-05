import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

import './Pagination.css';

const Pagination = ({ page, pages, changePage }) => {
	let middlePagination;

	if (pages <= 3) {
		middlePagination = [...Array(pages)].map((_, idx) => (
			<button
				key={idx + 1}
				onClick={() => changePage(idx + 1)}
				disabled={page === idx + 1}
			>
				{idx + 1}
			</button>
		));
	} else {
		const startValue = Math.floor((page - 1) / 3) * 3;

		middlePagination = (
			<>
				{[...Array(3)].map((_, idx) => (
					<button
						key={startValue + idx + 1}
						disabled={page === startValue + idx + 1}
						onClick={() => changePage(startValue + idx + 1)}
					>
						{startValue + idx + 1}
					</button>
				))}

				<button>...</button>
				<button onClick={() => changePage(pages)}>{pages}</button>
			</>
		);

		if (page > 3) {
			if (pages - page >= 3) {
				middlePagination = (
					<>
						<button onClick={() => changePage(1)}>1</button>
						<button>...</button>
						<button onClick={() => changePage(startValue)}>
							{startValue}
						</button>
						{[...Array(3)].map((_, idx) => (
							<button
								key={startValue + idx + 1}
								disabled={page === startValue + idx + 1}
								onClick={() => changePage(startValue + idx + 1)}
							>
								{startValue + idx + 1}
							</button>
						))}

						<button>...</button>
						<button onClick={() => changePage(pages)}>{pages}</button>
					</>
				);
			} else {
				let amountLeft = pages - page + 3;
				middlePagination = (
					<>
						<button onClick={() => changePage(1)}>1</button>
						<button>...</button>
						<button onClick={() => changePage(startValue)}>
							{startValue}
						</button>
						{[...Array(amountLeft)].map((_, idx) => (
							<button
								key={startValue + idx + 1}
								disabled={page === startValue + idx + 1}
								style={
									pages < startValue + idx + 1
										? { display: 'none' }
										: null
								}
								onClick={() => changePage(startValue + idx + 1)}
							>
								{startValue + idx + 1}
							</button>
						))}
					</>
				);
			}
		}
	}
	return (
		pages > 1 && (
			<div className='pagination'>
				<button
					onClick={() => changePage((page) => page - 1)}
					disabled={page === 1}
					className='pagenation__prev'
				>
					<MdOutlineKeyboardArrowLeft />
				</button>
				{middlePagination}
				<button
					onClick={() => changePage((page) => page + 1)}
					className='pagenation__next'
					disabled={page === pages}
				>
					<MdOutlineKeyboardArrowRight />
				</button>
			</div>
		)
	);
};
export default Pagination;
