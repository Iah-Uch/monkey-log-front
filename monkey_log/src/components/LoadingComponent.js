import React from 'react'
import { Spinner, Heading, HStack, Center } from 'native-base'

const LoadingComponent = () => {
  return (
    <Center flex={1} px={3}>
      <HStack space={2} justifyContent="center">
        <Spinner color="black"/>
      </HStack>
    </Center>
  )
}

export default LoadingComponent