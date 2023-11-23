import { BackgroundImageIcon, DesktopEditIcon, PencilIcon, ChatEditIcon, TextboxIcon } from 'components/Icons/icons'
import { useRef } from 'react'
import { useEdit } from './useEdit'
import ColorPickers from './ColorPickers'

const EditPanel = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { setBgImage, isShow } = useEdit()

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = (event: any) => {
        const imageDataURL = event.target?.result as string
        setBgImage(imageDataURL)
        localStorage.setItem('bgImage', imageDataURL)
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
    isShow.setChatText(colorType === 'text-chat')
    isShow.setInputBox(colorType === 'box-input')
    isShow.setInputText(colorType === 'text-input')
    isShow.setSubmitBanner(colorType === 'instruction')
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
              title="Select Background Image"
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
                handleSettingsToggle('text-chat')
              }}
              className="sm:border p-2 rounded-md text-slate-400  hover:bg-slate-500 hover:text-white flex justify-center items-center gap-2"
              title="The Color of Chat Text"
            >
              <span className="text-slate-700">
                <ChatEditIcon />
              </span>
              <label htmlFor="button" className="cursor-pointer hidden sm:inline-block whitespace-nowrap">
                Chat Text
              </label>
            </button>

            <button
              onClick={() => {
                handleSettingsToggle('box-input')
              }}
              className="sm:border p-2 rounded-md text-slate-400  hover:bg-slate-500 hover:text-white flex justify-center items-center gap-2"
              title="The Background Color of Input Area"
            >
              <span className="text-slate-700">
                <DesktopEditIcon />
              </span>
              <label htmlFor="button" className="cursor-pointer hidden sm:inline-block whitespace-nowrap">
                Input Box
              </label>
            </button>

            <button
              onClick={() => {
                handleSettingsToggle('text-input')
              }}
              className="sm:border p-2 rounded-md text-slate-400  hover:bg-slate-500 hover:text-white flex justify-center items-center gap-2"
              title="The Color of Text in Input Area"
            >
              <span className="text-slate-700">
                <PencilIcon />
              </span>
              <label htmlFor="button" className="cursor-pointer hidden sm:inline-block whitespace-nowrap">
                Input Text
              </label>
            </button>

            <button
              onClick={() => {
                handleSettingsToggle('instruction')
              }}
              className="sm:border p-2 rounded-md text-slate-400  hover:bg-slate-500 hover:text-white flex justify-center items-center gap-2"
              title="The Background Color of Instruction"
            >
              <span className="text-slate-700">
                <TextboxIcon />
              </span>
              <label htmlFor="button" className="cursor-pointer hidden sm:inline-block whitespace-nowrap">
                Instruction
              </label>
            </button>
          </div>
        </div>
      </div>
      <ColorPickers />
    </>
  )
}

export default EditPanel
