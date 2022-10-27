import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import ArrowIcon from './arrow.svg';
import cn from 'classnames';

export const Button = ({ apperrance, arrow = 'none', children, className, ...props }: ButtonProps): JSX.Element => {
	return (
		<button  className={cn(styles.button, className, {
			[styles.primary]: apperrance == 'primary',
			[styles.ghost]: apperrance == 'ghost',
		})}
		{...props}
		>
			{children}
			{arrow != 'none' && <span className={cn(styles.arrow, {
				[styles.down]: arrow == 'down'
			})}>
					<ArrowIcon></ArrowIcon>
				</span>}
		</button>
	);
};