import useEtherSWR from "ether-swr"
import { useWeb3React } from "@web3-react/core"

import { PARKS_ADDR } from "../utils"
import { formatUnits } from "ethers/lib/utils"

export const Minted = () => {
    const { account } = useWeb3React()
    const { data: minted } = useEtherSWR([PARKS_ADDR, 'totalSupply'])
  
    if (!minted) {
      return <div>...</div>
    }
    return <div>{minted.toNumber()}/10000</div>
}