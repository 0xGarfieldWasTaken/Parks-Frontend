import { EthSWRConfig } from 'ether-swr'
import { useWeb3React } from '@web3-react/core'

import { injected } from '../connectors/injectedConnector'

import { CrazyMint } from '../components/crazyMint'
import { EthBalance } from '../components/ethBalance'
import { CrazyURI } from '../components/crazyURI'

import { ABIs} from '../utils'
import { Button, Center, Flex, Heading, Spacer, Text } from '@chakra-ui/react'


export default function Home() {
  const { chainId, account, library, activate, active } = useWeb3React()

  const onClick = () => {
    activate(injected)
  }

  return (
    <div>
      <Flex flexDirection="row" minHeight="4rem" backgroundColor="#3D518C">
          <Center paddingLeft="1rem">
            <Heading textColor="#091540">Crazy Callums!</Heading>
          </Center>
          <Spacer />
          <Center paddingRight="1rem">
            {active && chainId && (
              <Heading size="m">
                <EthSWRConfig
                  value={{ web3Provider: library, ABIs: new Map(ABIs), refreshInterval: 30000 }}
                >
                  <EthBalance></EthBalance>
                </EthSWRConfig>
              </Heading>
              )}
          </Center>
          <Center paddingRight="2rem">
            {active ? <Text>Account: {account}</Text> : <Button onClick={onClick} backgroundColor="#1B2CC1" >Connect To Wallet</Button>}
          </Center>
      </Flex>
      <Flex flexDirection="column" padding="3rem" backgroundColor="#7692FF" minHeight="calc(100vh - 4rem)">
        {active && chainId && (
          <EthSWRConfig
            value={{ web3Provider: library, ABIs: new Map(ABIs), refreshInterval: 30000 }}
          >
            <CrazyURI></CrazyURI>
            <Spacer />
            <CrazyMint></CrazyMint>
          </EthSWRConfig>
        )}
      </Flex>
    </div>
  )
}
