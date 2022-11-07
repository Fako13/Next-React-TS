import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { PageItem, FirstLevelMenuItem } from '../../interfaces/menu.interface';
import styles from './Menu.module.css';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion } from 'framer-motion';



export const Menu = (): JSX.Element => {
	//Извлекаем контекст
	const {menu, setMenu, firstCategory} = useContext(AppContext);
	const router = useRouter();

	const variants = {
		visible: {
			marginBottom: 10,
			transition: {
				staggerChildren: 0.05,
				type: "tween",
				duration: 0.15,
			}
		},
		hidden: {
			type: "tween",
			marginBottom: 0,
			duration: 0.15,
		}
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: "auto",
			transition: {
				height: {
					duration: 0.4,
				},
				opacity: {
					duration: 0.25,
					delay: 0.15,
				},
			},
		},
		hidden: {
			opacity: 0,
			height: 0,
			transition: {
				height: {
					duration: 0.4,
				},
				opacity: {
					duration: 0.25,
				},
			},
		}
	};

	const openSecondLevel = (secondCategory: string): void => {
		setMenu && setMenu(menu.map(m => {
			if(m._id.secondCategory == secondCategory) {
				m.isOpened = !m.isOpened;
			}
			return m;
		}));
	};

	const buildFirstLevel = (): JSX.Element => {
		return (
			<>
				{firstLevelMenu.map(m => (
					<div key={m.route}>
						<Link href={`/${m.route}`}>
							<a>
								<div className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id == firstCategory,

								})}>
									{m.icon}
									<span>{m.name}</span>
								</div>
							</a>
						</Link>
						{m.id == firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		);
	};
	
	const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
		return (
			<div className={styles.secondBlock}>
				{menu.map(m => {
					if(m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}
					return (
						<div key={m._id.secondCategory}>
							<div className={styles.secondLevel} onClick={(): void => openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
							<motion.div 
								layout
								className={cn(styles.secondLevelBlock)}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								variants={variants}
								
								>
								{buildThirdLevel(m.pages, menuItem.route)}
							</motion.div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return (
			pages.map(p => (
				<motion.div 
					key={p._id}
					variants={variantsChildren}
					>
					<Link  href={`/${route}/${p.alias}`}>
						<a className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
						})}>
							{p.category}
						</a>
					</Link>
				</motion.div>
			))
		);
	};


	return (
		<div className={styles.menu}>
			<ul>
				{buildFirstLevel()}
			</ul>
		</div>
	);
};