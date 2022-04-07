import { Contract } from 'ethers'
import { useWeb3React } from '@web3-react/core'

import { PARKS_ADDR } from '../utils'
import { Parks } from '../abis/abis'
import { Button, Flex } from '@chakra-ui/react'

import { useState, useRef } from 'react'

import { PaidButtons } from './paidButtons'

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
  
    const ParksContract = new Contract(PARKS_ADDR, Parks, library.getSigner())

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()
  
    return (
      <>
      <Flex paddingTop="1rem" flexDirection="column">
        <PaidButtons />   
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
              No More Parks :(
            </AlertDialogHeader>

            <AlertDialogBody >
              Max Parks Have Been Minted
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