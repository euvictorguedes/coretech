import { Flex, Heading, Text } from '@chakra-ui/react'

export function Footer() {
  return (
    <Flex justify="flex-end" align="center" maxW="container.xl" mx="auto" p={5}>
      <Heading size="md" letterSpacing="widest">
        CORETECH
        <Text as="span" color="purple.500">
          ©
        </Text>
      </Heading>
    </Flex>
  )
}
