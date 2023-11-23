import { Popover } from '@headlessui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { CommunityIcon, HamburgerIcon, InventoryIcon, MintIcon, QuestIcon } from 'components/Icons/icons'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'

const SmallScreenMenu = () => {
  const { address } = useAccount()
  return (
    <div>
      <Popover className="relative">
        <Popover.Button>
          <HamburgerIcon />
        </Popover.Button>

        <Popover.Panel className="absolute flex justify-center left-full z-10 mt-3  max-w-sm -translate-x-full">
          <div className="bg-white w-screen h-1/2">
            <div className="flex flex-col p-1">
              <div className="flex justify-center p-3">
                <ConnectButton chainStatus={'none'} />
              </div>
              <hr className="border-gray-300" />
              <Link
                to="/mint"
                className="flex items-center gap-2 px-4 h-10 py-2 hover:bg-orange-200 hover:text-orange-800"
                title="Mint"
              >
                <span className="pr-8">
                  <MintIcon />
                </span>{' '}
                <span className="">Mint</span>
              </Link>
              <hr className="border-gray-300" />
              {address && (
                <>
                  <Link
                    to="/inventory"
                    className="flex items-center gap-2 px-4 h-10 py-2 hover:bg-orange-200 hover:text-orange-800"
                    title="Inventory"
                  >
                    <span className="pr-8">
                      <InventoryIcon />
                    </span>{' '}
                    <span>Inventory</span>
                  </Link>
                  <hr className="border-gray-300" />
                </>
              )}

              <Link
                to="/explorer"
                className="flex items-center gap-2 px-4 h-10 py-2 hover:bg-orange-200 hover:text-orange-800"
                title="Explorer"
              >
                <span className="pr-8">
                  {' '}
                  <CommunityIcon />
                </span>
                <span>Explorer</span>
              </Link>
              <hr className="border-gray-300" />
              <Link
                to="/quests"
                className="flex items-center gap-2 px-4 h-10 py-2 hover:bg-orange-200 hover:text-orange-800"
                title="Quests"
              >
                <span className="pr-8">
                  <QuestIcon />
                </span>
                <span>Quests</span>
              </Link>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  )
}

export default SmallScreenMenu
