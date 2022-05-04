import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { api } from '../services/api'
import { formatPrice } from '../util/format'

type Product = {
  id: number
  title: string
  price: number
  images: string[]
}

interface ProductFormatted extends Product {
  priceFormatted: string
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<ProductFormatted[]>([])

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Product[]>('/products')

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }))

      setProducts(data)
    }

    loadProducts()
  }, [])

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
