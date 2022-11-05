import styles from './Rating.module.css';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import StarIcon from './star.svg';
import React, { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from 'react';

export const Rating = forwardRef(({isEditable = false, rating, setRating, children, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		constructRating(rating);
	}, [rating]);

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<span 
					key={i} 
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
						[styles.editable]: isEditable
					})} 
					onMouseEnter={(): void => changeDisplay(i + 1)} 
					onMouseLeave={(): void => changeDisplay(rating)}
					onClick={(): void => onclick(i + 1)}
					>
					<StarIcon 
						tabIndex={isEditable ? 0 : -1}
						onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleSpace(i + 1, e)}
					/>
				</span>
			);
		});
		setRatingArray(updatedArray);
	};

	//перестраиваем рейтинг
	const changeDisplay = (i: number):void => {
		if(!isEditable) return;
		constructRating(i);
	};

	//при клике прокидываем i в pages/index.ts
	const onclick = (i: number): void => {
		if(!isEditable || !setRating) return;
		setRating(i);
	};

	//при использовании навигации и нажатии пробел прокидываем i в pages/index.ts 
	const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
		if(e.code != 'Space' || !setRating) return;
		setRating(i);
	};

	return (
		<div {...props} ref={ref}>
			{ratingArray.map((r, i) => <span key={i}>{r}</span>)}
		</div>
	);
});

Rating.displayName = 'Rating';