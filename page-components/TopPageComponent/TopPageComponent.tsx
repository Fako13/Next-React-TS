import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components';
import { TopPageComponentProps } from './TopPageComponentProps';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '../../interfaces/toppage.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';
import { useReducedMotion } from 'framer-motion';

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });

	const shouldReducerMotion = useReducedMotion();
	
	useEffect(() => {
		dispatchSort({ type: 'reset', initialState: products });
	}, [products]);

	const setSort = (sort: SortEnum):void => {
		dispatchSort({ type: sort });
	};

	return (
		<div className={styles.wrapper}>

			<div className={styles.title}>
				<Htag tag='h1'>{page.title}</Htag>
				{products && <Tag color='gray' size='m' aria-label={products.length + 'элементов'}>{products.length}</Tag>}
				<Sort sort={sort} setSort={setSort}/>
			</div>
			<div role='list'>
				{sortedProducts && sortedProducts.map(p => (<Product role='listitem' layout={shouldReducerMotion ? false : true} product={p} key={p._id}></Product>))}
			</div>

			<div className={styles.hhTitle}>
				<Htag tag='h2'>Вакансии - {page.category}</Htag>
				<Tag color='red' size='m'>hh.ru</Tag>
			</div>

			{firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh}/>}
			{page.advantages && page.advantages.length > 0 && <>
				<Htag tag='h2'>Преимущества</Htag>
				<Advantages advantages={page.advantages}></Advantages>
			</>}
			{page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText }} />}
			<Htag tag='h2'>Получаемые навыки</Htag>
			{page.tags.map(t => <Tag color='primary' className={styles.tag} key={t}>{t}</Tag>)}
		</div>
	);
};