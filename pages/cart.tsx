import { NextPage } from 'next'
import Head from 'next/head'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

import { useCart } from '../hooks/useCart'
import { formatPrice } from '../util/format'
import { Product } from '../types'
import { FiTrash } from 'react-icons/fi'

const Cart: NextPage = () => {
  const { cart, removeProduct, updateProductAmount } = useCart()

  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount),
  }))

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return sumTotal + product.price * product.amount
    }, 0)
  )

  function handleProductIncrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount + 1 })
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount - 1 })
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId)
  }

  return (
    <>
      <Head>
        <title>Carrinho | coretech</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box py={6} minH="100vh">
        <Container maxW="container.lg" mx="auto">
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th w={8}></Th>
                  <Th>Produto</Th>
                  <Th>Subtotal</Th>
                  <Th>Quantidade</Th>
                  <Th w={8}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartFormatted.map((product) => (
                  <Tr key={product.id}>
                    <Td>
                      <Box boxSize={24}>
                        <Image src={product.image} alt={product.title} />
                      </Box>
                    </Td>
                    <Td>{product.title}</Td>
                    <Td>{product.subTotal}</Td>
                    <Td>
                      <NumberInput
                        size="sm"
                        maxW={20}
                        defaultValue={product.amount}
                        min={1}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper
                            onClick={() => handleProductIncrement(product)}
                          />
                          <NumberDecrementStepper
                            onClick={() => handleProductDecrement(product)}
                          />
                        </NumberInputStepper>
                      </NumberInput>
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="Excluir"
                        icon={<Icon as={FiTrash} w={4} h={4} />}
                        colorScheme="red"
                        rounded="full"
                        onClick={() => handleRemoveProduct(product.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Flex
            align={['initial', 'center']}
            justify="space-between"
            direction={['column', 'row']}
            mt={4}
          >
            <Box>
              <Text color="gray.500" fontWeight="medium">
                TOTAL
              </Text>
              <Heading>{total}</Heading>
            </Box>
            <Button size="lg" colorScheme="purple" mt={[2, 0]}>
              Finalizar compra
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export default Cart
