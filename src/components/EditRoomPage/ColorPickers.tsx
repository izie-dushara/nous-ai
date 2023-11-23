import { useEdit } from './useEdit'
import { useEffect } from 'react'
import BoxColor from './InputBox'
import SubmitColor from './SubmitBanner'
import BoxTextColor from './InputText'
import ChatText from './ChatText'

const ColorPickers = () => {
  const {
    setBgImage,
    colors: {setChatText, setInputBox, setInputText, setSubmitBanner},
    isShow
  } = useEdit()


  useEffect(() => {
    const storedImage = localStorage.getItem('bgImage')
    const storedChatText = localStorage.getItem('chTxt')
    const storedInputText = localStorage.getItem('inpTxt')
    const storedSubmitBanner = localStorage.getItem('sBanner')
    const storedInputBox = localStorage.getItem('inpBox')

    if (storedImage) {
      setBgImage(storedImage)
    }
    if (storedChatText) {
      setChatText(storedChatText)
    }
    if (storedInputText) {
      setInputText(storedInputText)
    }
    if (storedSubmitBanner) {
      setSubmitBanner(storedSubmitBanner)
    }
    if (storedInputBox) {
      setInputBox(storedInputBox)
    }
  }, [setBgImage, setChatText, setInputBox, setInputText, setSubmitBanner])
  return (
    <div>
      {isShow.chatText && <ChatText />}

      {isShow.inputBox && <BoxColor />}

      {isShow.submitBanner && <SubmitColor />}

      {isShow.inputText && <BoxTextColor />}

    </div>
  )
}

export default ColorPickers
