
import { useEdit } from './useEdit'
import { CompactPicker } from 'react-color'

const BoxColor = () => {
  const { boxColor, setBoxColor } = useEdit()

  return (
    <div className="text-center text-white">
      <p className="font-bold">Box Color</p>
      <CompactPicker
        color={boxColor}
        onChangeComplete={color => {
          setBoxColor(color.hex)
          localStorage.setItem('boxColor', color.hex)
        }}
      />
    </div>
  )
}

export default BoxColor
