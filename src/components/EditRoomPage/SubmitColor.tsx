import { CompactPicker } from "react-color"
import { useEdit } from "./useEdit"


const SubmitColor = () => {
  const {submitColor, setSubmitColor } = useEdit()
  
  return (
    <div className="text-center text-white">
      <p className="font-bold">Submit Color</p>
      <CompactPicker
        color={submitColor}
        onChangeComplete={color => {
          setSubmitColor(color.hex)
          localStorage.setItem('submitColor', color.hex)
        }}
      />
    </div>
  )
}

export default SubmitColor