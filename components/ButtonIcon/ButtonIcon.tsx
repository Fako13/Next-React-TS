import styles from './ButtonIcon.module.css';
import { ButtonIconProps, icons } from './ButtonIcon.props';
import cn from 'classnames';

export const ButtonIcon = ({ apperrance, icon, className, ...props }: ButtonIconProps): JSX.Element => {
	const IconComp = icons[icon];
	return (
		<button  className={cn(styles.button, className, {
			[styles.primary]: apperrance == 'primary',
			[styles.white]: apperrance == 'white',
		})}
		{...props}
		>
			<IconComp />
		</button>
	);
};