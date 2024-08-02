import { api } from '@/lib/trpc/api';
import React from 'react'

const QuestionsPage = async () => {
  // const data  = await api.public.getNewQuestionsTrpc.query();
  return (
    <main className='min-h-screen'>
    <section>
    <div>
      <h1>Questions</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
    </section>
    </main>
  )
}

export default QuestionsPage;

