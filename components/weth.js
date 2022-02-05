import useEtherSWR from "ether-swr"
import { useWeb3React } from "@web3-react/core"

import { UNISWAP_ADDR } from "../utils"

export const WETH = () => {
    const { account } = useWeb3React()
    const { data: weth } = useEtherSWR([UNISWAP_ADDR, 'factory'])
  
    if (!weth) {
      return <div>...</div>
    }
    return <div>{weth}</div>
}