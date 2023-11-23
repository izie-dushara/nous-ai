import { useEdit } from './useEdit'
import { CompactPicker } from 'react-color'

const InputText = () => {
  const { colors } = useEdit()

  return (
    <div className="text-center text-white">
      <p className="font-bold">Box Text Color</p>
      <CompactPicker
        color={colors.inputText}
        onChangeComplete={color => {
          colors.setInputText(color.hex)
          localStorage.setItem('inpTxt', color.hex)
        }}
      />
    </div>
  )
}

export default InputText
