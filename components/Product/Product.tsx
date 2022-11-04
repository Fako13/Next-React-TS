import styles from './Product.module.css';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { devlOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';

export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
	return (
		<Card  className={styles.product}>
			<div className={styles.logo}>
				<Image 
					src={process.env.NEXT_PUBLIC_DOMAIN_IMAGE + product.image}
					alt={product.title}
					width={70}
					height={70}
					layout='responsive' />
			</div>
			<div className={styles.title}>
				{product.title}
			</div>
			<div className={styles.price}>
				{priceRu(product.price)}
				{product.oldPrice && <Tag size='s' className={styles.oldPrice} color='green'>{priceRu(product.price - product.oldPrice)}</Tag>}
			</div>
			<div className={styles.credit}>
				{priceRu(product.credit)}/<span className={styles.month}>мес.</span>
			</div>
			<div className={styles.rating}>
				<Rating rating={product.reviewAvg ?? product.initialRating} />
			</div>
			<div className={styles.tags}>
				{product.categories.map(c => <Tag key={c} className={styles.category} color='ghost'>{c}</Tag>)}
			</div>
			<div className={styles.priceTitle}>
				цена
			</div>
			<div className={styles.creditTitle}>
				кредит
			</div>
			<div className={styles.rateTitle}>
				{product.reviewCount} {devlOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
			</div>
			<Divider className={styles.hr} />
			<div className={styles.description}>
				{product.description} 
			</div>
			<div className={styles.feature}>
				{product.characteristics.map(c => (
					<div key={c.name} className={styles.characteristics}>
						<span className={styles.characteristicsName}>{c.name}</span>
						<span className={styles.characteristicsDots}></span>
						<span className={styles.characteristicsValue}>{c.value}</span>
					</div>
				))}
			</div>
			<div className={styles.advBlock}>
				{product.advantages && <div className={styles.advantages}>
					<div className={styles.advTitle}>Преимущества</div>
					<div>{product.advantages}</div>
				</div>}
				{product.disAdvantages && <div className={styles.disAdvantages}>
					<div className={styles.advTitle}>Недостатки</div>
					<div>{product.disAdvantages}</div>
				</div>}
			</div>
			<Divider className={styles.hr} />
			<div className={styles.actions}>
				<Button apperrance='primary'>Узнать подробнее</Button>
				<Button apperrance='ghost' className={styles.reviewButton} arrow='right'>Читать отзывы</Button>
			</div>

		</Card>
	);
};