import {
  Flex,
  Stack,
  Box,
  Icon,
  Heading,
  Text,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FiMonitor, FiShoppingBag } from 'react-icons/fi'

import { useCart } from '../hooks/useCart'

export function Header() {
  const { cart } = useCart()
  const cartSize = cart.length

  const textSize = useBreakpointValue({ base: 'sm', sm: 'md' })

  const cartAmount = cart.reduce((sumAmount, product) => {
    sumAmount += product.price * product.amount

    return sumAmount
  }, 0)

  return (
    <Flex
      justify="space-between"
      align="center"
      maxW="container.xl"
      mx="auto"
      p={5}
    >
      <Stack direction="row" align="center">
        <Link href="/">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
            bgColor="gray.100"
            w={12}
            h={12}
            borderRadius="full"
            cursor="pointer"
            as="a"
          >
            <Icon as={FiMonitor} w={6} h={6} color="purple.500" />
          </Box>
        </Link>

        <Heading size={textSize} letterSpacing="widest" as="a">
          CORETECH
          <Text as="span" color="purple.500">
            .
          </Text>
        </Heading>
      </Stack>

      <Link href="/cart">
        <Button
          variant="link"
          colorScheme="purple"
          leftIcon={<Icon as={FiShoppingBag} w={5} h={5} />}
          as="a"
        >
          {cartSize === 1 ? `${cartSize} produto` : `${cartSize} produtos`}
        </Button>
      </Link>
    </Flex>
  )
}
