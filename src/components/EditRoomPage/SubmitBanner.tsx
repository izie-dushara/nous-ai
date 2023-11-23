import { CompactPicker } from "react-color"
import { useEdit } from "./useEdit"


const SubmitBanner = () => {
  const {colors } = useEdit()
  
  return (
    <div className="text-center text-white">
      <p className="font-bold">Submit Color</p>
      <CompactPicker
        color={colors.submitBanner}
        onChangeComplete={color => {
          colors.setSubmitBanner(color.hex)
          localStorage.setItem('submitColor', color.hex)
        }}
      />
    </div>
  )
}

export default SubmitBanner