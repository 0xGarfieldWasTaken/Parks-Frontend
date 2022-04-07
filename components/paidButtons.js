import { Contract } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import useEtherSWR from 'ether-swr'

import { PARKS_ADDR } from '../utils'
import { Parks } from '../abis/abis'
import { Button, Center, Flex, Input, Spacer, Text } from '@chakra-ui/react'

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
  
    const ParksContract = new Contract(PARKS_ADDR, Parks, library.getSigner())

    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState()
    const [mintNumber, setMintNumber] = useState(1)

    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const price = 0.001

    const handleChange = (e) => {
      const value = e.target.value.replace(/\D/g, "");
      if (value < 0){
        value = 1;
      }
      setMintNumber(value);
    };

    const mint = async () => {
        try{
          const tx = await ParksContract.connect(library.getSigner()).mintPark(mintNumber, {value: parseEther(String(mintNumber*price))})
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
            <Input maxWidth="30rem" value={mintNumber} onChange={handleChange} type="number" placeholder='1' />
          </Center>
          <Center>
            <Text>
              Minting {mintNumber} Parks
            </Text>
          </Center>
          <Center padding="0.5rem">
            <Button minWidth="30rem" type="button" onClick={mint} backgroundColor="#5E6CE8" >
              Mint Park(s)!
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