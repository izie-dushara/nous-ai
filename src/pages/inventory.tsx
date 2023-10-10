import { useNavigate } from 'react-router-dom'
import { useGetNousNfts } from 'repositories/rpc.repository'

const PageInventory = () => {
  const navigate = useNavigate()

  const { data: nfts } = useGetNousNfts('mumbai')

  return (
    <div className="flex justify-center">
      <div className="block w-3/4">
        <div className="bg-[#181818] rounded p-4">
          <div className="bg-[#181818] rounded p-4">
            <div className="text-2xl font-semibold mb-4">My Nous</div>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4">
              {nfts?.map((nft, index) => (
                <div
                  key={index}
                  className="text-sm border border-transparent hover:bg-gray-100 hover:text-black p-2 rounded-lg cursor-pointer"
                  onClick={() => navigate(`/nft`, { state: { nft } })}
                >
                  <img
                    className="rounded-lg w-full bg-white object-cover h-48 hover:scale-105 transition duration-500"
                    src={(nft.metadata as any).image}
                    alt={(nft.metadata as any).name}
                  />
                  <div className="font-semibold mt-2 truncate">{(nft.metadata as any).name}</div>
                  <div className="">Ethereum</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageInventory
