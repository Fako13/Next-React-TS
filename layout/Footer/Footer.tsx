import styles from './Footer.module.css';
import { FooterProps } from './Footer.props';
import cn from 'classnames';
import { format } from 'date-fns';

export const Footer = ({className, ...props }: FooterProps): JSX.Element => {

	return (
		<footer {...props} className={cn(className, styles.footer)}>
			<div>
				OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены
			</div>
			<a href="" className={styles.document} target="_blank">Пользовательское соглашение</a>
			<a href="" className={styles.document} target="_blank">Политика конфиденциальности</a>
		</footer>
	);
};