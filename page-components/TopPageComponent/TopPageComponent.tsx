import { TopPageComponentProps } from './TopPageComponentProps';

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
	return (
		<>
			{products && products.length}
		</>
	);
};