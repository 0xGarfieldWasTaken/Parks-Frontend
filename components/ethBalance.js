import  useEtherSWR  from 'ether-swr'
import { useWeb3React } from '@web3-react/core'

import { formatEther } from 'ethers/lib/utils'

export const EthBalance = () => {
    const { account } = useWeb3React()
    const { data: balance } = useEtherSWR(['getBalance', account, 'latest'])
  
    if (!balance) {
      return <div>...</div>
    }
    return <div>{parseFloat(formatEther(balance)).toPrecision(4)} Ξ</div>
}