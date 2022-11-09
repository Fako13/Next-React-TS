import styles from './Sort.module.css';
import { SortProps, SortEnum } from './Sort.props';
import cn from 'classnames';
import SortIcon from './sort.svg';
import { KeyboardEvent } from 'react';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<div className={styles.sortName} id='sort'>Сортировка</div>
			<span 
				onClick={():void => setSort(SortEnum.Rating)} 
				className={cn({
					[styles.active]: sort == SortEnum.Rating
				})}
				tabIndex={0}
				onKeyDown={(e: KeyboardEvent) => {
					if(e.code == 'Space' || e.code == 'Enter') {	
						e.preventDefault();
						setSort(SortEnum.Rating);
					}
				}}
				id='rating'
				aria-selected={sort == SortEnum.Rating}
				aria-labelledby='sort rating'
			>
				<SortIcon className={styles.sortIcon} /> 
				По рейтингу
			</span>
			<span 
				onClick={():void => setSort(SortEnum.Price)} 
				className={cn({
					[styles.active]: sort == SortEnum.Price
				})}
				tabIndex={0}
				onKeyDown={(e: KeyboardEvent) => {
					if(e.code == 'Space' || e.code == 'Enter') {
						e.preventDefault();
						setSort(SortEnum.Price);
					} 
				}}
				id='price'
				aria-selected={sort == SortEnum.Price}
				aria-labelledby='sort price'
			>
				<SortIcon className={styles.sortIcon}/> 
				По цене 
			</span>
		</div>
	);
};