import { CompactPicker } from 'react-color'
import { useEdit } from './useEdit'

const ChatText = () => {
  const { colors } = useEdit()

  return (
    <div className="text-center text-white">
      <p className="font-bold">Text Color</p>
      <CompactPicker
        color={colors.chatText}
        onChangeComplete={color => {
          colors.setChatText(color.hex)
          localStorage.setItem('chTxt', color.hex)
        }}
      />
    </div>
  )
}

export default ChatText
