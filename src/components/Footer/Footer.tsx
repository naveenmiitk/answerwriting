import Image from 'next/image';
import React from 'react'
import indiaflag from '../../../public/icons/indiaflag.svg'

const Footer = () => {
  return (
    <aside>
      <div className="border-neutral-100 border-t-[1px] flex justify-between bottom-0 max-w-6xl mx-auto p-[1rem] dark:border-neutral-800">
        <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-[3rem]">
          <div>
            <h1 className="text-neutral-500 text-sm">
              Copyright © 2024 Answer Writing
            </h1>
          </div>
          <div className="flex space-x-4 text-sm">
            <h1>Help Center</h1>
            <h1>Jobs</h1>
            <h1>Terms</h1>
            <h1>Privacy Policy</h1>
          </div>
        </div>
        <div className="flex space-x-2 items-center justify-center">
          <Image
            src={indiaflag}
            alt="logo"
            width={28}
            height={28}
            className=""
          />
          <h1>India</h1>
        </div>
      </div>
    </aside>
  );
}

export default Footer
