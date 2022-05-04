import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>coretech</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold font-montserrat">
        coretech<span className="text-red-500">.</span>
      </h1>
    </>
  )
}

export default Home
