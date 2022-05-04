## Parks (For Enthusiasts) Front-End

A Front End for the Fully On-Chain Parks (For Enthusiasts) NFT Project.

Written in Next.js

I wrote this project in a couple days to play around with fully on-chain NFTs. The inspiration of which came from @dhof's original LOOT Project and @ExistentialEnso's TransLoot Project. The Front-End was adapted from my Crazy Callum Frontend which was made earlier this year to learn Next.js. The design is rushed and much more pratical over user friendly or nice looking.

The main focus for me doing this project was the Solidity and using the random values generated by the NFT to correctly generate the traits which you can see on the OpenSea page. The project is live on Polygon Mainnet with more information in it's repo.

# Current Features

 - Connecting using @web3-react
 - Updating information from the Chain using EtherSWR
 - Ether Balance and Wallet Address
 - Mint Buttons (Including Mass Mint option as using ERC721A)

# How to Run

Under `utils.js` input the address of the Parks Contract. Update the ABI in `abis/abi.js` if necessary.

Run `yarn dev`

By 0xGarfield