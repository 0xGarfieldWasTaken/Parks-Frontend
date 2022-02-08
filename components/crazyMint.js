import { Contract } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import useEtherSWR from 'ether-swr'

import { CRAZY_ADDR } from '../utils'
import { CrazyCallum } from '../abis/abis'
import { Button, Flex } from '@chakra-ui/react'

import { useState, useRef } from 'react'

import { PaidButtons } from './paidButtons'
import { FreeButtons } from './freeButtons'

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

    const { data: freeMintUsed } = useEtherSWR([CRAZY_ADDR, 'getFreeMintUsed', account])

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()
  
    return (
      <>
      <Flex paddingTop="1rem" flexDirection="column">
        {!freeMintUsed ? <FreeButtons /> : <PaidButtons />}        
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
              No More Callums :(
            </AlertDialogHeader>

            <AlertDialogBody >
              Max Crazy Callum&apos;s Have Been Minted
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