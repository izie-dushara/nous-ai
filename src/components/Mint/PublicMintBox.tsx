import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import RPC from 'utils/ethers'
import { useAccount } from 'wagmi'
import useMinting from './hooks'
import GenericButton from 'components/Button/GenericButton'
import TypographyNormal from 'components/Typography/Normal'

const contractABI = [
  {
    inputs: [],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
]

interface Props {
  isCompleted: boolean
}
const PublicMintBox = (prop: Props) => {
  const [price, setPrice] = useState('')
  const [isDisabled, setDisabled] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAbleToMint, setIsAbleToMint] = useState(false)
  const { address } = useAccount()

  const { canMint } = useMinting()

  useEffect(() => {
    const checkEligible = async () => {
      const nos = (await canMint()) || 0
      setIsAbleToMint(nos > 0 ? false : true)
      setDisabled(nos > 0 ? true : false)
    }

    if (address) {
      checkEligible().catch(console.log)
    }
  }, [canMint, address])

  const handleOnMintClicked = async () => {
    if (isDisabled) {
      return
    }

    const rpc = new RPC(window?.ethereum as any)

    try {
      await rpc.callContractMethod({
        contractABI,
        contractAddress: import.meta.env.VITE_NOUS_AI_NFT,
        method: 'mint',
        data: [],
        options: {
          value: '0',
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const isPaused = async () => {
      const rpc = new RPC(window?.ethereum as any)

      const flag: boolean = await rpc.readContractData({
        contractABI,
        contractAddress: import.meta.env.VITE_NOUS_AI_NFT,
        method: 'paused',
        data: [],
      })

      setDisabled(flag)
    }

    if (!isLoaded) {
      isPaused().catch(console.log)
      setIsLoaded(true)
    }
  }, [isLoaded])

  return (
    <>
      <div className="border-black border-2 rounded-lg p-6 flex items-center justify-between mt-4 mb-4 bg-white/40">
        <div>
          <div className="text-lg font-semibold">Public Sale</div>
          {prop.isCompleted ? (
            <div className="text-xs">SOLD OUT</div>
          ) : (
            <div className="text-xs">Minting is LIVE from {<b className="font-bold">{showDate()}</b>}</div>
          )}
        </div>
        {isLoaded && !isDisabled && address && !prop.isCompleted && (
          <button
            className={`group relative inline-block text-sm font-medium text-black focus:outline-none focus:ring active:text-gray-500 ${
              !price || isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={e => handleOnMintClicked()}
          >
            <span className="absolute rounded-md inset-0 translate-x-0.5 translate-y-0.5 bg-black transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="flex rounded-md items-center relative border border-current bg-white px-8 py-3">
              {price && <span>Mint for {ethers.formatEther(price)}</span>}E
            </span>
          </button>
        )}
      
        {isLoaded && (isDisabled || prop.isCompleted) && (
          <button
            className={`group relative inline-block text-sm font-medium text-black focus:outline-none focus:ring active:text-gray-500 ${
              isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={e => handleOnMintClicked()}
          >
            <span className="absolute rounded-md inset-0 translate-x-0.5 translate-y-0.5 bg-gray-500 transition-transform"></span>
            <span className="flex rounded-md items-center relative border border-gray-800 bg-white px-8 py-3">
              {'Mint Disabled'}
            </span>
          </button>
        )}
        {!address && <TypographyNormal classNames="text-md text-white">Connect to your wallet</TypographyNormal>}
      </div>
    </>
  )
}

export default PublicMintBox
