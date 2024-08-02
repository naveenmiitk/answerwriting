import React from 'react'

const BaseLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='h-screen w-screen'>
      {children}
    </div>
  )
}

export default BaseLayout
