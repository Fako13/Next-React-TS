import styles from './Advantages.module.css';
import { AdvantagesProps } from './Advantages.props';
import cn from 'classnames';
import { Card } from '..';
import OkeyIcon from './okey.svg';


export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<>
			{advantages.map(a => (
				<div key={a._id} className={styles.advantage}>
					<OkeyIcon className={styles.icon} />
					<div className={styles.title}>{a.title}</div>
					{a.description && <hr className={styles.vline}></hr>}
					{a.description && <div className={styles.description}>{a.description}</div>}
				</div>
			))}
		</>
	);
};