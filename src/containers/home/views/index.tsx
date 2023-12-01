'use client';

import { Input } from 'antd';
import { Blog } from '../sections';
import { Popular, Subscribe } from '@/components';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  posts: any;
};

const { Search } = Input;

export const Home: React.FC<Props> = ({ posts }) => {
  const [value, setValue] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams?.get('keyword') || '';

  useEffect(() => {
    setValue(keyword);
  }, [keyword]);

  return (
    <div className='mt-[108px] mb-[10px]'>
      <div className='container'>
        <h1 className='text-primary text-5xl font-black mb-0 text-center'>
          My Blog
        </h1>
        <p className='text-xl font-normal text-center mb-[32px]'>
          Just a personal blog.
        </p>
        <div className='flex justify-center p-4'>
          <Search
            placeholder='Search for articles'
            style={{ width: '430px' }}
            size='large'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onSearch={(value) => {
              router.push(`/?keyword=${value}`);
            }}
          />
        </div>
        <Blog posts={posts} />
        <div className='flex gap-20'>
          <Subscribe />
          <Popular />
        </div>
      </div>
    </div>
  );
};
