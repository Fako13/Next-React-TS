import styles from './Textarea.module.css';
import { TextareaProps } from './Textarea.props';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Textarea = forwardRef(({ className, error, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	return (
		<div className={cn(className, styles.textareaWrapper)}>
			<textarea 
				ref={ref} 
				className={cn(styles.textarea, {
					[styles.error]: error
				})} 
				{...props}></textarea>
			{error && <span className={styles.errorMessage}>{error.message}</span>}
		</div>
	);
});

Textarea.displayName = 'Textarea';