import { KeyboardEvent, useContext, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { PageItem, FirstLevelMenuItem } from '../../interfaces/menu.interface';
import styles from './Menu.module.css';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion, useReducedMotion } from 'framer-motion';




export const Menu = (): JSX.Element => {
	//Извлекаем контекст
	const {menu, setMenu, firstCategory} = useContext(AppContext);
	const [ announce, setAnnounce ] = useState<'closed' | 'opened' | undefined>();
	const router = useRouter();
	const shouldReducerMotion = useReducedMotion();

	const variants = {
		visible: {
			marginBottom: 10,
			transition: shouldReducerMotion ? {} : {
				staggerChildren: 0.04,
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
					duration: 0.25,
				},
				opacity: {
					duration: 0.15,
					delay: 0.1,
				},
			},
		},
		hidden: {
			opacity: shouldReducerMotion ? 1 : 0,
			height: 0,
			transition: {
				height: {
					duration: 0.25,
				},
				opacity: {
					duration: 0.1,
				},
			},
		}
	};

	const openSecondLevel = (secondCategory: string): void => {
		setMenu && setMenu(menu.map(m => {
			if(m._id.secondCategory == secondCategory) {
				setAnnounce(m.isOpened ? 'closed' : 'opened');
				m.isOpened = !m.isOpened;
			}
			return m;
		}));
	};

	const openSecondLevelKey = (secondCategory: string, key: KeyboardEvent): void => {
		if(key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			openSecondLevel(secondCategory);
		} 
	};

	const buildFirstLevel = (): JSX.Element => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map(m => (
					// eslint-disable-next-line jsx-a11y/role-supports-aria-props
					<li key={m.route} aria-expanded={m.id == firstCategory}>
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
					</li>
				))}
			</ul>
		);
	};
	
	const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map(m => {
					if(m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}
					return (
						<li  key={m._id.secondCategory}>
							<button 
								onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(m._id.secondCategory, key)} 
								className={styles.secondLevel} 
								onClick={(): void => openSecondLevel(m._id.secondCategory)}
								aria-expanded={m.isOpened}
							>
								{m._id.secondCategory}
							</button>
							<motion.ul 
								layout
								className={cn(styles.secondLevelBlock)}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								variants={variants}
								
								>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return (
			pages.map(p => (
				<motion.li 
					key={p._id}
					variants={variantsChildren}
					>
					<Link  href={`/${route}/${p.alias}`}>
						<a 
							tabIndex={isOpened ? 0 : -1} 
							className={cn(styles.thirdLevel, {
								[styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
							})}
							aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}
						>
							{p.category}
						</a>
					</Link>
				</motion.li>
			))
		);
	};


	return (
		<nav className={styles.menu} role='navigation'>
			{announce && <span role='log' className='viualyHidden'>{announce == 'opened' ? 'развернуто' : 'свернуто'}</span>}
			{buildFirstLevel()}
		</nav>
	);
};