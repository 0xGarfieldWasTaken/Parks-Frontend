import useEtherSWR from "ether-swr"
import { useState, useEffect } from "react"

import { useWeb3React } from "@web3-react/core"
import { Contract } from "ethers"

import { CRAZY_ADDR } from "../utils"
import { CrazyCallum } from "../abis/abis"
import { formatUnits } from "ethers/lib/utils"

import { ParseImage } from '../components/parseImage'

import { Flex, Wrap, Center} from '@chakra-ui/react'


export const CrazyURI = () => {

    let calls = new Array()
  
    const { library } = useWeb3React()
  
    const [totalSupply, setTotalSupply] = useState()
  
    useEffect(() => {
      async function fetchData() {
        const ccContract = new Contract(CRAZY_ADDR, CrazyCallum, library.getSigner())
        const totalSupply = await ccContract.connect(library.getSigner()).totalSupply()
        const humanReadable = formatUnits(totalSupply, 0)
  
        setTotalSupply(humanReadable)
      }

      fetchData()
  
    }, [totalSupply])
  
    for (let i = 0; i < totalSupply; i++){
      calls.push([CRAZY_ADDR, 'tokenURI', i])
    }
  
    const {data : uris} = useEtherSWR(calls)
  
    if (!uris) {
      return <div>...</div>
    }
    return (
          <div>
              <Wrap flexDirection="row" justify="center">
                  <ParseImage uris={uris} totalSupply={totalSupply}></ParseImage>
              </Wrap>
          </div>
    )
  }