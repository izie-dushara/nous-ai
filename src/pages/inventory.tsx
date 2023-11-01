import { useConnectedWallet } from 'hooks/use-connected-wallet'
import { useNavigate } from 'react-router-dom'
import { useGetOwnedNousMetadatas } from 'repositories/rpc.repository'
import { PlusIcon } from 'components/Icons/icons'

const PageInventory = () => {
  const [selectedNftIndex, setSelectedNftIndex] = useState(0)

  const navigate = useNavigate()
  const { address } = useConnectedWallet()
  const { data: owned } = useGetNftByWalletAddress({ address: address?.full, chain: 'mumbai' })
  const { data: nfts } = useGetOwnedNousMetadatas(address.full, owned?.map(el => `${el.token_id}`) ?? [])
  
  const goToMintPage = () => {
    navigate('/mint')
  }

  return (
    <div className="flex justify-center">
      <div className="block w-3/4">
        <div className="bg-[#181818] rounded p-4">
          <div className="bg-[#181818] rounded p-4">
            <div className="text-2xl font-semibold mb-4">My Nous</div>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4">
              <div className="text-sm border border-transparent hover:text-black p-2 rounded-lg cursor-pointer">
                <div
                  onClick={() => goToMintPage()}
                  className="rounded-lg w-full gap-2 md:w-48 text-white bg-black/20 border-2 border border-gray-800 text-black flex justify-center items-center h-48 hover:scale-105 transition duration-500"
                >
                  <div>
                    <PlusIcon />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                {nfts && nfts[selectedNftIndex] && (
                  <>
                    <Avatar
                      imgMain={nfts[selectedNftIndex].metadata.image}
                      imgBadge={nfts[selectedNftIndex].achievement?.badge}
                      className="h-96 w-96"
                      badgeSize="20"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageInventory
