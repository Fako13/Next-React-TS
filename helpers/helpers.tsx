import CoursesIcon from '../layout/Menu/Icons/courses.svg';
import BooksIcon from '../layout/Menu/Icons/books.svg';
import ProductsIcon from '../layout/Menu/Icons/products.svg';
import ServicesIcon from '../layout/Menu/Icons/services.svg';
import { TopLevelCategory } from '../interfaces/toppage.interface';
import { FirstLevelMenuItem } from '../interfaces/menu.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
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
