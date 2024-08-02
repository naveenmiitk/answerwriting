import AskForum from '@/components/ask/AskForum'
import AskForumCombined from '@/components/ask/AskForumCombined'
import React from 'react'

const AskQuestionPage = () => {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold'>Ask a public Question</h1>
      {/* <AskForum/> */}
      <AskForumCombined/>
    </div>
  )
}

export default AskQuestionPage
