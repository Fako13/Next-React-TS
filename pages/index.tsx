import { useEffect, useState } from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';

export default function Home(): JSX.Element {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log(counter);
  });

  return (
    <>
      <Htag tag='h1'>{counter}</Htag>
      <Htag tag='h2'>Текст</Htag>
      <Htag  tag='h3'>Текст</Htag>
      <Button apperrance='primary' arrow='right' className='aa' onClick={():void => setCounter(counter + 1)}>Кнопка</Button>
      <Button apperrance='ghost' arrow='right'>Кнопка</Button>
      <P size='l'>123</P>
      <Tag color='green' href='123' size='m'>123</Tag>
      <Tag color='ghost' size='s'>123</Tag>
      <Tag color='red' size='s'>123</Tag>
      <Tag color='primary' size='s'>123</Tag>
      <Tag color='gray' size='s'>123</Tag>
      <Rating rating={4}></Rating>
    </>
  );
}
