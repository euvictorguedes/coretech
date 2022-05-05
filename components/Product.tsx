import {
  GridItem,
  Stack,
  Flex,
  Image,
  Box,
  Text,
  IconButton,
  Icon,
  Badge,
} from '@chakra-ui/react'
import { FiShoppingBag } from 'react-icons/fi'

import { ProductFormatted } from '../types'

type ProductProps = {
  product: ProductFormatted
  onClick: (id: number) => void
}

export function Product({ product, onClick }: ProductProps) {
  return (
    <GridItem key={product.id}>
      <Stack spacing={5} border="1px" borderColor="gray.100" borderRadius={4}>
        <Flex
          align="center"
          justify="center"
          borderBottom="1px"
          borderColor="gray.100"
          w="full"
          position="relative"
        >
          {product.promoPrice && (
            <Badge
              colorScheme="red"
              fontSize="lg"
              position="absolute"
              top={0}
              right={0}
            >
              PROMOÇÃO DO DIA
            </Badge>
          )}
          <Image
            src={product.image}
            alt={product.title}
            draggable="false"
            w={40}
          />
        </Flex>
        <Box pb={4} px={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.300">
            Código: {product.id}
          </Text>
          <Text fontWeight="medium" color="gray.700" h={12}>
            {product.title}
          </Text>
          <Stack justify="space-between" align="center" direction="row" mt={3}>
            <Flex direction="column">
              <Stack direction="row" textAlign="center">
                {product.promoPrice ? (
                  <>
                    <Text fontWeight="bold" fontSize="xl">
                      {product.promoPriceFormatted}
                    </Text>
                    <Text
                      fontWeight="bold"
                      textDecoration="line-through"
                      color="gray.400"
                    >
                      {product.priceFormatted}
                    </Text>
                  </>
                ) : (
                  <Text fontWeight="bold" fontSize="xl">
                    {product.priceFormatted}
                  </Text>
                )}
              </Stack>
            </Flex>
            <IconButton
              aria-label="Adiconar ao carrinho"
              icon={<Icon as={FiShoppingBag} w={5} h={5} color="white" />}
              colorScheme="purple"
              rounded="full"
              size="lg"
              onClick={() => onClick(product.id)}
            />
          </Stack>
        </Box>
      </Stack>
    </GridItem>
  )
}
