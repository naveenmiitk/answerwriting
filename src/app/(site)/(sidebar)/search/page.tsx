import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react'

const SearchPage = () => {

  return (
    <div className='space-y-8 flex items-center justify-center flex-col min-h-screen'>
      <h1 className='text-3xl'> Peer-Review</h1>
      <Input className='focus-visible:ring-0 rounded-full w-3/4'/>
      <Button>Search</Button>
    </div>
  );
}

export default SearchPage
