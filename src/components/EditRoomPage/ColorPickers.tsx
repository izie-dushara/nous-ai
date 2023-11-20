import { useEdit } from './useEdit'
import { useEffect } from 'react'
import TextColor from './TextColor'
import BoxColor from './BoxColor'
import SubmitColor from './SubmitColor'
import BoxTextColor from './BoxTextColor'

const ColorPickers = () => {
  const {
    setPresentColor,
    setBoxColor,
    setSubmitColor,
    setDisplayImage,
    isShowBoxColor,
    isShowSubmitColor,
    isShowTextColor,
    setBoxTextColor,
    isShowBoxTextColor
  } = useEdit()

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage')
    const storedTextColor = localStorage.getItem('textColor')
    const storedBoxColor = localStorage.getItem('boxColor')
    const storedSubmitColor = localStorage.getItem('submitColor')
    const storedBoxTextColor = localStorage.getItem('boxText')

    if (storedImage) {
      setDisplayImage(storedImage)
    }
    if (storedTextColor) {
      setPresentColor(storedTextColor)
    }
    if (storedBoxColor) {
      setBoxColor(storedBoxColor)
    }
    if (storedSubmitColor) {
      setSubmitColor(storedSubmitColor)
    }
    if (storedBoxTextColor) {
      setBoxTextColor(storedBoxTextColor)
    }
  }, [setDisplayImage, setPresentColor, setBoxColor, setSubmitColor, setBoxTextColor])
  return (
    <div>
      {isShowTextColor && <TextColor />}

      {isShowBoxColor && <BoxColor />}

      {isShowSubmitColor && <SubmitColor />}

      {isShowBoxTextColor && <BoxTextColor />}

    </div>
  )
}

export default ColorPickers
