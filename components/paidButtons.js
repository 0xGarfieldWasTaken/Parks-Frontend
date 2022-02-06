import { Contract } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import useEtherSWR from 'ether-swr'

import { CRAZY_ADDR } from '../utils'
import { CrazyCallum } from '../abis/abis'
import { Button, Center, Flex } from '@chakra-ui/react'

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

export const PaidButtons = () => {
    const { account, library } = useWeb3React()
  
    const CrazyContract = new Contract(CRAZY_ADDR, CrazyCallum, library.getSigner())

    const { data: freeMintUsed } = useEtherSWR([CRAZY_ADDR, 'getFreeMintUsed', account])

    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState()
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const mint = async () => {
        try{
          const tx = await CrazyContract.connect(library.getSigner()).mintCallum({value: parseEther("0.005")})
        } catch (err){
            console.log(err)
            let errorMessage = err.message
            if(errorMessage.includes("denied")){
                setError("denied")
            }else if (errorMessage.includes("MAX")) {
                setError("maxxed")
            } else {
                setError("unknown")
            }
            setIsOpen(true)
        }
      }
    
    const mint2 = async () => {
        try{
          const tx = await CrazyContract.connect(library.getSigner()).mint2Callums({value: parseEther("0.010")})
        } catch (err){
            console.log(err)
            let errorMessage = err.message
            if(errorMessage.includes("denied")){
                setError("denied")
            }else if (errorMessage.includes("MAX")) {
                setError("maxxed")
            } else {
                setError("unknown")
            }
            setIsOpen(true)
        }
      }

    const mint4 = async () => {
        try{
          const tx = await CrazyContract.connect(library.getSigner()).mint4Callums({value: parseEther("0.020")})
        } catch (err){
            console.log(err)
            let errorMessage = err.message
            if(errorMessage.includes("denied")){
                setError("denied")
            }else if (errorMessage.includes("MAX")) {
                setError("maxxed")
            } else {
                setError("unknown")
            }
            setIsOpen(true)
        }
    }

    const buildString = () => {
        if (error == "denied") {
            return "User Denied Transaction"
        } else if (error == "maxxed"){
            return "No More Callums"
        } else {
            return "I don't know what happened. Sorry!"
        }
    }
    
  
    return (
      <>
      <Flex flexDirection="column">
          <Center padding="0.5rem">
            <Button minWidth="30rem" type="button" onClick={mint} backgroundColor="#5E6CE8" >
              Mint 1 Callum!
            </Button>
          </Center>

          <Center padding="0.5rem">
            <Button minWidth="30rem"  type="button" onClick={mint2} backgroundColor="#5E6CE8" >
              Mint 2 Callums!
            </Button>
          </Center>

          <Center padding="0.5rem">
            <Button minWidth="30rem" type="button" onClick={mint4} backgroundColor="#5E6CE8" >
              Mint 4 Callums!
            </Button>
          </Center>
          
      </Flex>

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
              Error!
            </AlertDialogHeader>

            <AlertDialogBody >
              {buildString()}
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