/* eslint-disable @next/next/no-img-element */
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
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

// eslint-disable-next-line react/display-name
export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [isReviewOpened, setIsreviewOpened] = useState<boolean>(false);
	
	const reviewRef = useRef<HTMLDivElement>(null);

	const variants = {
		visible: {
			duration: 0.5,
			opacity: 1,
			overflow: 'visible',
			height: 'auto',
		},
		hidden: {
			overflow: 'hidden',
			opacity: 0,
			height: 0,
			duration: 0.5,
		}
	};
	

	const scrollToReview = ():void => {
		setIsreviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'auto',
			block: 'start'
		});
		reviewRef.current?.focus();
	};

	return (
		<div className={className} {...props} ref={ref}>
			<Card  className={styles.product}>
				<div className={styles.logo}>
					<Image 
						src={process.env.NEXT_PUBLIC_DOMAIN_IMAGE + product.image}
						alt={product.title}
						width={70}
						height={70} />
				</div>
				<div className={styles.title}>
					{product.title}
				</div>
				<div className={styles.price}>
					<span><span className='viualyHidden'>цена</span>{priceRu(product.price)}</span>
					{product.oldPrice && <Tag size='s' className={styles.oldPrice} color='green'><span className='viualyHidden'>скидка</span>{priceRu(product.price - product.oldPrice)}</Tag>}
				</div>
				<div className={styles.credit}>
					<span className='viualyHidden'>кредит</span>{priceRu(product.credit)}/<span className={styles.month}>мес.</span>
				</div>
				<div className={styles.rating}>
					<span className='viualyHidden'>{'Рейтинг' + (product.reviewAvg ?? product.initialRating)}</span>
					<Rating rating={product.reviewAvg ?? product.initialRating} />
				</div>
				<div className={styles.tags}>
					{product.categories.map(c => <Tag key={c} className={styles.category} color='ghost'>{c}</Tag>)}
				</div>
				<div className={styles.priceTitle} aria-hidden={true}>
					цена
				</div>
				<div className={styles.creditTitle}  aria-hidden={true}>
					кредит
				</div>
				<div className={styles.rateTitle}>
					<a href='#ref' onClick={scrollToReview}>{product.reviewCount} {devlOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a>
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
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions}>
					<Button apperrance='primary'>Узнать подробнее</Button>
					<Button apperrance='ghost'
						className={styles.reviewButton}
						arrow={isReviewOpened ? 'down' : 'right'}
						onClick={():void => setIsreviewOpened(!isReviewOpened)}
						aria-expanded={isReviewOpened}
					>Читать отзывы</Button>
				</div>
	
			</Card>
			<motion.div 
				layout
				className={styles.reviewsWrapper}
				initial={isReviewOpened ? 'visible' : 'hidden'}
				animate={isReviewOpened ? 'visible' : 'hidden'}
				variants={variants}		
			>
				<Card 
					color='blue' 
					className={cn(styles.reviews, styles.opened)} 
					ref={reviewRef}
					tabIndex={isReviewOpened ? 0 : -1}
				>
					{product.reviews && product.reviews.map(r => (
						<div key={r._id}>
							<Review review={r}></Review>
							<Divider />
						</div>
					))}
					<ReviewForm isOpened={isReviewOpened} productId={product._id}></ReviewForm>
				</Card>
			</motion.div>
		</div>
	);
}));



Product.displayName = 'Product';