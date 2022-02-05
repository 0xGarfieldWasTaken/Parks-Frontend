import { Contract } from 'ethers'
import { useWeb3React } from '@web3-react/core'

import { CRAZY_ADDR } from '../utils'
import { CrazyCallum, Uniswap } from '../abis/abis'
import { Button } from '@chakra-ui/react'

import { parseEther } from 'ethers/lib/utils'

import { useState, useRef } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'

export const CrazyMint = () => {
    const { account, library } = useWeb3React()
  
    const CrazyContract = new Contract(CRAZY_ADDR, CrazyCallum, library.getSigner())

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()
  
    const onClick = async () => {
      try{
        const tx = await CrazyContract.connect(library.getSigner()).mintCallum({value: parseEther("0.005")})
      } catch (err){
        console.log("Max Reached")
        setIsOpen(true)
      }
    }
  
    return (
      <>
        <Button type="button" onClick={onClick} backgroundColor="#5E6CE8" >
          Mint
        </Button>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
          size="2xl"
          colorScheme="blue"
        >
        <AlertDialogOverlay >
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              No More Callums :(
            </AlertDialogHeader>

            <AlertDialogBody >
              Max Crazy Callum's Have Been Minted
            </AlertDialogBody>

            <Button ref={cancelRef} onClick={onClose} padding="1rem" variant="ghost">
                OK!
            </Button>
          </AlertDialogContent>
        </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
}