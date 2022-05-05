import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Container, SimpleGrid, Heading, Spinner, Flex } from '@chakra-ui/react'

import { Product } from '../components/Product'
import { useCart } from '../hooks/useCart'

import { api } from '../services/api'
import { formatPrice } from '../util/format'
import { Product as ProductType, ProductFormatted } from '../types'

const Home: NextPage = () => {
  const { addProduct } = useCart()
  const [products, setProducts] = useState<ProductFormatted[]>([])

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<ProductType[]>('/products')

      const data = response.data
        .map((product) => ({
          ...product,
          priceFormatted: formatPrice(product.price),
          promoPriceFormatted: product.promoPrice
            ? formatPrice(product.promoPrice)
            : undefined,
        }))
        .splice(0, 8) // Apenas os 8 primeiros items

      setProducts(data)
    }

    loadProducts()
  }, [])

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  return (
    <>
      <Head>
        <title>Página Inicial | coretech</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="container.xl" my={8}>
        {products.length ? (
          <>
            <Heading size="xl">Catálogo</Heading>
            <SimpleGrid columns={[1, null, 2, null, 4]} spacing={6} mt={6}>
              {products.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  onClick={handleAddProduct}
                />
              ))}
            </SimpleGrid>
          </>
        ) : (
          <Flex align="center" justify="center" w="full" minH="60vh" mb="30vh">
            <Spinner size="xl" color="purple.500" />
          </Flex>
        )}
      </Container>
    </>
  )
}

export default Home
