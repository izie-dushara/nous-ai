import { BackgroundImageIcon, CheckIcon, ClipboardIcon, PencilIcon, SubmissionIcon, TextboxIcon } from 'components/Icons/icons'
import { useEffect, useRef } from 'react'
import { CompactPicker } from 'react-color'
import { Link, useParams } from 'react-router-dom'
import { useEdit } from './useEdit'
import ColorPickers from './ColorPickers'



const EditPanel = () => {
  const { key } = useParams()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const {
    setDisplayImage,
    toggleColorPickerText,
    toggleColorPickerBox,
    toggleColorPickerSubmit,
    toggleColorPickerBoxText
  } = useEdit()

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = (event: any) => {
        const imageDataURL = event.target?.result as string
        setDisplayImage(imageDataURL)
        localStorage.setItem('uploadedImage', imageDataURL)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleFileClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

 
  const handleSettingsToggle = (colorType: string) => {
    toggleColorPickerText(colorType === 'text')
    toggleColorPickerBox(colorType === 'box')
    toggleColorPickerSubmit(colorType === 'submit')
    toggleColorPickerBoxText(colorType === "boxText")
  }
  return (
    <>
      <div className="w-full flex justify-center p-1 text-black mt-3 md:mt-6">
        <div className="bg-white w-2/3 rounded-md flex flex-col">
          <p className="text-center font-bold text-slate-500">Editing Panel</p>
          <div className="flex justify-center gap-2 p-1 flex-wrap">
            
            <input type="file" accept="image/*" ref={inputRef} onChange={handleFileChange} className="sr-only" />
            <button
              onClick={handleFileClick}
              className="sm:border p-2 rounded-md text-slate-400  hover:bg-slate-500 hover:text-white flex justify-center items-center gap-2"
              title="Background"
            >
              <span className="text-slate-700 ">
                <BackgroundImageIcon />
              </span>
              <label htmlFor="button" className="cursor-pointer hidden sm:inline-block">
                Background
              </label>
            </button>

            <button
              onClick={() => {
                handleSettingsToggle('text')
              }}
              className="sm:border p-2 rounded-md text-slate-400  hover:bg-slate-500 hover:text-white flex justify-center items-center gap-2"
              title="Chat Text Color"
            >
              <span className="text-slate-700">
                <PencilIcon />
              </span>
              <label htmlFor="button" className="cursor-pointer hidden sm:inline-block whitespace-nowrap">
                Chat
              </label>
            </button>

            <button
              onClick={() => {
                handleSettingsToggle('box')
              }}
              className="sm:border p-2 rounded-md text-slate-400  hover:bg-slate-500 hover:text-white flex justify-center items-center gap-2"
              title="Text Input Appearance"
            >
              <span className="text-slate-700">
                <TextboxIcon />
              </span>
              <label htmlFor="button" className="cursor-pointer hidden sm:inline-block whitespace-nowrap">
                Input 
              </label>
            </button>

            <button
              onClick={() => {
                handleSettingsToggle('submit')
              }}
              className="sm:border p-2 rounded-md text-slate-400  hover:bg-slate-500 hover:text-white flex justify-center items-center gap-2"
              title="Submit Buttom Appearance"
            >
              <span className="text-slate-700">
                <SubmissionIcon />
              </span>
              <label htmlFor="button" className="cursor-pointer hidden sm:inline-block whitespace-nowrap">
                Submit Button
              </label>
            </button>

            <button
              onClick={() => {
                handleSettingsToggle('boxText')
              }}
              className="sm:border p-2 rounded-md text-slate-400  hover:bg-slate-500 hover:text-white flex justify-center items-center gap-2"
              title="Input Text Appearance"
            >
              <span className="text-slate-700">
                <ClipboardIcon />
              </span>
              <label htmlFor="button" className="cursor-pointer hidden sm:inline-block whitespace-nowrap">
                Input Text
              </label>
            </button>

            <Link
              to={`/room/${key}`}
              className="sm:border p-2 rounded-md text-slate-400  hover:bg-slate-500 hover:text-white flex justify-center items-center gap-2"
              title="Back to The Room"
            >
              <span className="text-slate-700 ">
                <CheckIcon />
              </span>
              <label htmlFor="button" className="cursor-pointer hidden sm:inline-block">
                Finish
              </label>
            </Link>
          </div>
        </div>
      </div>
      <ColorPickers />
      
    </>
  )
}

export default EditPanel
