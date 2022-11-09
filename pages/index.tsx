import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Button, Htag, Input, P, Rating, Tag } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { Textarea } from '../components/Textarea/Textarea';
import { API } from '../helpers/api';
import { Error404 } from './404';

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag='h2'>Текст</Htag>
      <Htag  tag='h3'>Текст</Htag>
      {/* <Button apperrance='primary' arrow='right' className='aa' onClick={():void => setCounter(counter + 1)}>Кнопка</Button> */}
      <Button apperrance='ghost' arrow='right'>Кнопка</Button>
      <P size='l'>123</P>
      <Tag color='green' href='123' size='m'>123</Tag>
      <Tag color='ghost' size='s'>123</Tag>
      <Tag color='red' size='s'>123</Tag>
      <Tag color='primary' size='s'>123</Tag>
      <Tag color='gray' size='s'>123</Tag>
      <Rating rating={rating} isEditable={true} setRating={setRating}></Rating>
      <Input placeholder='asd'></Input>
      <Textarea placeholder='a'></Textarea>
      
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}