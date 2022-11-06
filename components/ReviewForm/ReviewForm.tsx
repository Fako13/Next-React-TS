import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isError, setIsError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSendResponse>(API.review.createDemo, {...formData, productId});
			if(data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setIsError('Упс, неполадки с сервером');
			}
		} catch (e) {
			if(e instanceof TypeError) {
				setIsError(e.message);
			} else if (e instanceof RangeError) {
			// обработка исключения RangeError
				setIsError(e.message);
			} else if (e instanceof EvalError) {
				// обработка исключения EvalError
				setIsError(e.message);
			} else {
				// обработка остальных исключений
				console.log(e); // передать обработчику ошибок
				setIsError('Что то пошло не так');
			}
		}

	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} 
				{...props}
			>
				<Input 
					{...register('name', {required: { value: true, message: 'Заполните имя' }})} 
					placeholder='Имя' 
					error={errors.name}
					/>
				<Input  
					{...register('title', {required: { value: true, message: 'Заполните заголовок' }})} 
					placeholder='Заголовок отзыва' 
					className={styles.title}
					error={errors.title} />
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller 
						control={control} 
						name='rating' 
						rules={{required: { value: true, message: 'Выберите оценку' }}}
						render={({field}) => (
						<Rating 
							error={errors.rating} 
							isEditable 
							rating={field.value} 
							ref={field.ref} 
							setRating={field.onChange} />
					)} />
				</div>
				<Textarea 
					{...register('description', {required: { value: true, message: 'Заполните отзыв' }})} 
					placeholder='Текст отзыва' 
					className={styles.textarea} 
					error={errors.description} />
				<div className={styles.submit}>
					<Button apperrance='primary' type='submit'>Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{isSuccess &&
				<div className={styles.success}>
					<div className={styles.successTitle}>Ваш отзыв отправлен</div>
					<div>Спасибо, ваш отзыва будет опубликован после проверки</div>
					<CloseIcon className={styles.close} onClick={() => setIsSuccess(false)} />
				</div>
			}
			{isError &&
				<div className={styles.error}>
					<div className={styles.errorTitle}>
						Что то пошло не так, обновите страницу <br />
						{isError}
					</div>
					<CloseIcon className={styles.errorClose} onClick={() => setIsError(undefined)}/>
				</div>
			}
		</form>
	);
};