import ChatBubble from 'components/ChatBubble'
import ChatSubmit from 'components/ChatSubmit'
import { Chat } from 'lib'
import { useEffect, useRef, useState } from 'react'
import { chatWithNous } from 'services/nous'
import { useGetLineageNftToken, useGetLineageNousMetadata, useGetSingleNousMetadata } from 'repositories/rpc.repository'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { v4 } from 'uuid'
import useCheckAccess from 'hooks/useCheckRoomAccess'
import { useConnectedWallet } from 'hooks/use-connected-wallet'
import { useEdit } from 'components/EditRoomPage/useEdit'

const PageRoom = () => {
  const { key } = useParams()
  const navigate = useNavigate()
  const { address } = useConnectedWallet()

  useEffect(() => {}, [])
  const [chats, setChats] = useState<Chat[]>([])
  const [disableChat, setDisableChat] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const [name, setName] = useState('')
  const [bgColor, setBgColor] = useState('')

  const { data: nft } = useGetSingleNousMetadata(key as string)

  const { data: metadata } = useGetLineageNftToken(key as string)
  const { hasAccess } = useCheckAccess({
    dataKey: key as string,
    tokenId: metadata?.token ? metadata.token.id : '',
    walletAddress: address.full,
  })

  const { data: nous_id } = useGetLineageNousMetadata(
    key as string,
    'nous_id',
    import.meta.env.VITE_NOUS_DATA_PK as string,
    ''
  )

  const onSendChat = async (message: string) => {
    setDisableChat(true)

    if (message.length <= 0) {
      return
    }

    const newChat = {
      avatar: '',
      text: message,
      name: 'Me',
      bgColor,
    }

    setChats(prevChats => [...prevChats, newChat])

    try {
      const res = await chatWithNous(nous_id?.content as string, name, message)
      if (res.data.length <= 0) {
        return
      }

      let allText = ''

      for (const d of res.data) {
        if (res.data[0].recipient_id === name) {
          allText += `${d.text} <br />`
        }
      }

      const resChat = {
        avatar: nft?.metadata.image as String,
        text: allText,
        name: nft?.metadata.attributes.find((e: { trait_type: string }) => e.trait_type === 'name')?.value as String,
        className: 'bg-[#1C1C1C] rounded-md border-[1px] border-[#333335]',
      }

      setChats(prevChats => [...prevChats, resChat])
      setDisableChat(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!name) setName(v4())

    // if (!hasAccess) {
    //   navigate('/')
    // }
  }, [hasAccess, name, navigate])

  useEffect(() => {
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      setBgColor(color)
    }

    if (!bgColor) {
      getRandomColor()
    }
  }, [bgColor])

  const {displayImage, presentColor} = useEdit()

  return (
    <div
      className="flex justify-center w-full h-screen"
      style={{ backgroundImage: `url(${displayImage})`, color: `${presentColor}`, backgroundSize: 'contain' }}
    >
      <div className="flex flex-col w-full h-screen">
        <div>
          {/*   <header className="bg-white/10">
            <div className="px-4 py-2">
              <div className="">
                <div className="flex justify-between">
                  <div className="relative flex items-center"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-10">
        <div className="py-6">
          <ChatSubmit onSendChat={msg => onSendChat(msg)} disable={disableChat} />
        </div>
      </div>
    </div>
  )
}

export default PageRoom
