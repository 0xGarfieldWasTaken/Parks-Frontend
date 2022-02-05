import { CrazyCallum, Uniswap } from './abis/abis'

export const UNISWAP_ADDR = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
export const CRAZY_ADDR = "0xb0a7329b1279df986d6213ac32bd4aa17b7d5725"

export const loader = ({src}) => {
    src = src.slice(5, src.length)
    return `https://ipfs.io/ipfs/${src}`
  
}

export const ABIs = [
    [UNISWAP_ADDR, Uniswap],
    [CRAZY_ADDR, CrazyCallum]
]
  