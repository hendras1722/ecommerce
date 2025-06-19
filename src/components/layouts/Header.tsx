import { Button, Flex } from '@chakra-ui/react'

export default function Header() {
  return (
    <Flex
      justify="space-between"
      p={4}
      bg="white"
      color="black"
      paddingTop={'20px'}
      paddingBottom={'20px'}
      paddingRight={'40px'}
      paddingLeft={'40px'}
      alignItems={'center'}
      className="border-b border-slate-200"
      shadow={'sm'}
    >
      <div className="font-bold">ecommerce</div>
    </Flex>
  )
}
