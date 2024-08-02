import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const NavBarSite = () => {
  return (
    <aside className="fixed left-0 top-0 right-0 w-full z-10 bg-neutral-100 opacity-80">
      <div className="flex items-center justify-between p-4">
        <div>Peer</div>
        <div className="space-x-4 flex">
          <h1>About</h1>
          <h1>Products</h1>
          <h1>Overflow AI</h1>
        </div>
        <div className='flex space-x-4'>
          <div>
            <Input
              className="focus-visible:ring-0 rounded-full w-full flex-1 flex min-w-[10rem]"
              placeholder="Search..."
            />
          </div>
          <div className="space-x-4">
            <Button variant={"secondary"}>Login</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default NavBarSite
