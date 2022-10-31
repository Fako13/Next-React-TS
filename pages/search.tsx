import { GetStaticProps } from 'next';
import { useState } from 'react';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

function Search({ menu }: SearchProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
    </>
  );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/find', {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface SearchProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}