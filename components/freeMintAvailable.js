import  useEtherSWR  from 'ether-swr'
import { useWeb3React } from '@web3-react/core'
import { CRAZY_ADDR } from '../utils'

import { Text } from '@chakra-ui/react'

export const FreeMintUsed = () => {
    const { account } = useWeb3React()
    console.log(account)
    const { data: freeMintUsed } = useEtherSWR([CRAZY_ADDR, 'getFreeMintUsed', account])
    console.log(freeMintUsed)
  
    if (!freeMintUsed) {
      return <div><Text>Free Mint Unused! :)</Text></div>
    }
    return <div><Text>Free Mint Used! :(</Text></div>
}