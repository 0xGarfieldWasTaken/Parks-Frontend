import { EthSWRConfig } from 'ether-swr'
import { useWeb3React } from '@web3-react/core'

import { injected } from '../connectors/injectedConnector'

import { CrazyMint } from '../components/crazyMint'
import { EthBalance } from '../components/ethBalance'
import { Minted } from '../components/minted'

import { ABIs } from '../utils'
import { Button, Center, Flex, Heading, Spacer, Text, Image, Link } from '@chakra-ui/react'


export default function Home() {
  const { chainId, account, library, activate, active } = useWeb3React()

  const onClick = () => {
    activate(injected)
  }

  return (
    <div>
      <Flex flexDirection="row" minHeight="4rem" backgroundColor="#3D518C">
          <Center paddingLeft="1rem">
            <Heading textColor="#091540">Parks (For Enthusiasts)</Heading>
          </Center>
          <Spacer />
          <Center paddingRight="1rem">
            {active && chainId && (
              <Heading size="m">
                <EthSWRConfig
                  value={{ web3Provider: library, ABIs: new Map(ABIs), refreshInterval: 30000 }}
                >
                  <Flex flexDirection="column">
                    <Center>
                      <EthBalance></EthBalance>
                    </Center>
                  </Flex>
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
            <Center padding="0.2rem"><Heading>10000 Fully Randomised On-Chain Theme Parks</Heading></Center>
            <Center padding="0.2rem"><Text>By: 0xGarfield</Text></Center>
            <Center padding="0.2rem"><Text>Derivative of a Derivative</Text></Center>
            <Center padding="0.2rem"><Text>This is a demo of a fully randomised on-chain theme park. It is not a real theme park, and is not intended to be used as such.</Text></Center>
            <Center padding="0.2rem"><Image src="example.png"></Image></Center>
            <Center padding="0.2rem"><Text>1 MATIC Per Park. 100 Mintable at once</Text></Center>
            <CrazyMint></CrazyMint>
            <Center padding="0.2rem"><Text><Minted></Minted></Text></Center> 
            <Center padding="0.2rem"><Text>With thanks to <Link href="https://twitter.com/existentialenso">ExistentialEnso</Link> and <Link href="https://twitter.com/dhof">dhof</Link> for inspiration and contracts!</Text></Center>
          </EthSWRConfig>
        )}
      </Flex>
    </div>
  )
}
