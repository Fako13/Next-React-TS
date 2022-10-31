import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	color?: 'white' | 'blue';
	children: ReactNode;
}