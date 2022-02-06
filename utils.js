import { CrazyCallum, Uniswap } from './abis/abis'

export const UNISWAP_ADDR = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
export const CRAZY_ADDR = "0xF371a307bE9a8BdB5427e0d8568366f13036455c"

export const loader = ({src}) => {
    src = src.slice(5, src.length)
    return `https://ipfs.io/ipfs/${src}`
  
}

export const ABIs = [
    [UNISWAP_ADDR, Uniswap],
    [CRAZY_ADDR, CrazyCallum]
]
  