import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import styles from './Menu.module.css';
import CoursesIcon from './Icons/courses.svg';
import BooksIcon from './Icons/books.svg';
import ProductsIcon from './Icons/products.svg';
import ServicesIcon from './Icons/services.svg';
import { TopLevelCategory } from '../../interfaces/toppage.interface';
import cn from 'classnames';

const firstLevelMenu: FirstLevelMenuItem[] = [
	{
		route: 'courses',
		name: 'Курсы', 
		icon: <CoursesIcon />,
		id: TopLevelCategory.Courses
	},
	{
		route: 'services',
		name: 'Сервисы', 
		icon: <ServicesIcon />,
		id: TopLevelCategory.Services
	},
	{
		route: 'products',
		name: 'Продукты', 
		icon: <ProductsIcon />,
		id: TopLevelCategory.Products
	},
	{
		route: 'books',
		name: 'Книги', 
		icon: <BooksIcon />,
		id: TopLevelCategory.Books
	}
];


export const Menu = (): JSX.Element => {
	//Извлекаем контекст
	const {menu, setMenu, firstCategory} = useContext(AppContext);

	const buildFirstLevel = (): JSX.Element => {
		return (
			<>
				{firstLevelMenu.map(m => (
					<div key={m.route}>
						<a href={`/${m.route}`}>
							<div className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: m.id == firstCategory,

							})}>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</a>
						{m.id == firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		);
	};
	
	const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
		return (
			<div className={styles.secondBlock}>
				{menu.map(m => (
					<div key={m._id.secondCategory}>
						<div className={styles.secondLevel}>{m._id.secondCategory}</div>
						<div className={cn(styles.secondLevelBlock, {
							[styles.secondLevelBlockOpened]: m.isOpened
						})}>
							{buildThirdLevel(m.pages, menuItem.route)}
						</div>
					</div>
				))}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string): JSX.Element[] => {
		return (
			pages.map(p => (
				<a key={p._id} href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
					[styles.thirdLevelActive]: false
				})}>
					{p.category}
				</a>
				
			))
		);
	};


	return (
		<div className={styles.menu}>
			<ul>
				{buildFirstLevel()}
			</ul>
		</div>
	);
};