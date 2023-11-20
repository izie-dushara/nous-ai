import { useEdit } from './useEdit'
import { CompactPicker } from 'react-color'

const BoxTextColor = () => {
  const { boxTextColor, setBoxTextColor } = useEdit()

  return (
    <div className="text-center text-white">
      <p className="font-bold">Box Text Color</p>
      <CompactPicker
        color={boxTextColor}
        onChangeComplete={color => {
          setBoxTextColor(color.hex)
          localStorage.setItem('boxText', color.hex)
        }}
      />
    </div>
  )
}

export default BoxTextColor
