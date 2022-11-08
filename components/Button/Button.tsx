import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import ArrowIcon from './arrow.svg';
import cn from 'classnames';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

export const Button = ({ apperrance, arrow = 'none', children, className, ...props }: ButtonProps): JSX.Element => {
	const scale = useMotionValue(1);

	// useEffect(() => {
	// 	scale.onChange(s => console.log(s));
	// }, []);

	return (
		<motion.button
			whileHover={{scale: 1.05}}
			className={cn(styles.button, className, {
			[styles.primary]: apperrance == 'primary',
			[styles.ghost]: apperrance == 'ghost',
		})}
		style={{scale}}
		{...props}
		>
			{children}
			{arrow != 'none' && <span className={cn(styles.arrow, {
				[styles.down]: arrow == 'down'
			})}>
					<ArrowIcon></ArrowIcon>
				</span>}
		</motion.button>
	);
};