import React, { useEffect } from 'react'
import { Disclosure } from '@headlessui/react'

import { Link, useLocation } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useNetwork } from 'wagmi'
import { useBoundStore, useNousStore } from 'store'
import { CURRENT_CHAIN } from 'store/slices/wallet.slice'
import logo from '/img/logo.png'
import { CommunityIcon, InventoryIcon, MintIcon, PerksIcon, QuestIcon } from 'components/Icons/icons'
import { useConnectedWallet } from 'hooks/use-connected-wallet'

export default function Header() {
  const { setCurrentWalletState, setWalletState, current } = useBoundStore()
  const { setSelectedNous, selectedNous } = useNousStore()
  const { address, isConnected } = useAccount()
  const wallet = useConnectedWallet()
  const { chain } = useNetwork()
  const location = useLocation()

  useEffect(() => {
    if (isConnected) {
      if (address !== wallet.address.full) {
        setCurrentWalletState({ chain: chain?.network as CURRENT_CHAIN, address, publicKey: address })
        setWalletState({ evm: { address, publicKey: address, balance: { symbol: chain?.nativeCurrency.symbol } } })
      }
    }

    if (!isConnected) setCurrentWalletState({ chain: undefined })

    if (address !== wallet.address.full) {
      wallet.refreshWallet()
      setCurrentWalletState({ chain: chain?.network as CURRENT_CHAIN, address, publicKey: address })
      setWalletState({ evm: { address, publicKey: address, balance: { symbol: chain?.nativeCurrency.symbol } } })
      setSelectedNous(undefined)
    }
  }, [
    isConnected,
    address,
    setCurrentWalletState,
    chain?.network,
    chain?.nativeCurrency.symbol,
    setWalletState,
    setSelectedNous,
    selectedNous,
    wallet.address,
  ])

  return (
    <Disclosure as="nav" className="bg-transparent">
      <div className="mx-auto max-w-[3840px]">
        <div className="relative flex h-16 items-center justify-between px-3">
          <div className="flex flex-shrink-0 items-center">
            <Link to="/">
              <img className="block h-10 w-auto lg:hidden" src={logo} alt="Nous Psyche" />
              <img className="hidden h-16 w-auto lg:block" src={logo} alt="Nous Psyche" />
            </Link>
          </div>
          <div className="flex text-white h-full">
            <Link
              to="/mint"
              className="flex items-center gap-2 px-4 h-10 py-2 hover:bg-orange-200 hover:text-orange-800 rounded-lg"
              title="Mint"
            >
              <MintIcon /> <span className="hidden sm:block">Mint</span>
            </Link>
            {address && (
              <>
                <Link
                  to="/inventory"
                  className="flex items-center gap-2 px-4 h-10 py-2 hover:bg-orange-200 hover:text-orange-800 rounded-lg"
                  title="Inventory"
                >
                  <InventoryIcon /> <span className="hidden sm:block">Inventory</span>
                </Link>
              </>
            )}

            <Link
              to="/explorer"
              className="flex items-center gap-2 px-4 h-10 py-2 hover:bg-orange-200 hover:text-orange-800 rounded-lg"
              title="Explorer"
            >
              <CommunityIcon />
              <span className="hidden sm:block">Explorer</span>
            </Link>
            <Link
              to="/quests"
              className="flex items-center gap-2 px-4 h-10 py-2 hover:bg-orange-200 hover:text-orange-800 rounded-lg"
              title="Quests"
            >
              <QuestIcon />
              <span className="hidden sm:block">Quests</span>
            </Link>
          </div>
          <ConnectButton
            chainStatus={'none'}
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'avatar',
            }}
          />
        </div>
      </div>
    </Disclosure>
  )
}
