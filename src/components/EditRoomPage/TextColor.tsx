import { CompactPicker } from 'react-color'
import { useEdit } from './useEdit'

const TextColor = () => {
  const { presentColor, setPresentColor } = useEdit()

  return (
    <div className="text-center text-white">
      <p className="font-bold">Text Color</p>
      <CompactPicker
        color={presentColor}
        onChangeComplete={color => {
          setPresentColor(color.hex)
          localStorage.setItem('textColor', color.hex)
        }}
      />
    </div>
  )
}

export default TextColor
