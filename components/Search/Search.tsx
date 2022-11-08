import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useState, KeyboardEvent } from 'react';
import SearchIcon from './search.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [ search, setSearch ] = useState<string>('');
	const router = useRouter();

	const goToSearch = ():void => {
		router.push({
			pathname: '/search',
			query: {
				q: search
			}
		});
	};

	const handleKeyDown = (e: KeyboardEvent):void => {
		if(e.key == 'Enter') goToSearch();
	};

	return (
		<div className={cn(className, styles.search)} {...props}>
			<Input 
				placeholder='Поиск ...' 
				value={search} 
				className={styles.input}
				onChange={(e):void => setSearch(e.target.value)} 
				onKeyDown={handleKeyDown}
			/>
			<Button
				apperrance='primary'
				className={styles.button}
				onClick={ goToSearch }
				name='Search'
			>
				<SearchIcon />
			</Button>
		</div>
	);
};