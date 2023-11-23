
import { useEdit } from './useEdit'
import { CompactPicker } from 'react-color'

const InputBox = () => {
  const { colors} = useEdit()

  return (
    <div className="text-center text-white">
      <p className="font-bold">Box Color</p>
      <CompactPicker
        color={colors.inputBox}
        onChangeComplete={color => {
          colors.setInputBox(color.hex)
          localStorage.setItem('inpBox', color.hex)
        }}
      />
    </div>
  )
}

export default InputBox
