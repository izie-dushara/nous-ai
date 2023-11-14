import { BackgroundImageIcon, CheckIcon, PencilIcon } from 'components/Icons/icons'
import { useEffect, useRef, useState } from 'react'
import { CompactPicker } from 'react-color'
import { Link, useParams } from 'react-router-dom'

interface Props {
  displayImage: string
  setDisplayImage: (value: string) => void
  presentColor: string
  setPresentColor: (value: string) => void
}


const EditPanel = (prop: Props) => {
  const { key } = useParams()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isShow, setIsShow] = useState(false)
  const editingData = {
    imageURL: prop.displayImage || localStorage.getItem('uploadedImage'),
    presentColor: prop.presentColor || localStorage.getItem('textColor') || '#181818',
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = (event: any) => {
        const imageDataURL = event.target?.result as string
        prop.setDisplayImage(imageDataURL)
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

  const handleColorPickerClick = () => {
    setIsShow(!isShow)
  }

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage')
    const storedColor = localStorage.getItem('textColor')
    if (storedImage) {
      prop.setDisplayImage(storedImage)
    }
    if (storedColor) {
      prop.setPresentColor(storedColor)
    }
  }, [prop])


  
  return (
    <>
      <div className="w-full flex justify-center p-1 text-black mt-3 md:mt-6">
        <div className="bg-white w-min rounded-md flex flex-col">
          <p className="text-center font-bold text-slate-500">Editing Panel</p>
          <div className="flex justify-center gap-2 p-1">
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
                handleColorPickerClick()
              }}
              className="sm:border p-2 rounded-md text-slate-400  hover:bg-slate-500 hover:text-white flex justify-center items-center gap-2"
           
              title="Text Color, Click Again to Close"
            >
              <span className="text-slate-700">
                <PencilIcon />
              </span>
              <label htmlFor="button" className="cursor-pointer hidden sm:inline-block whitespace-nowrap">
                Text Color
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
      {isShow && (
        <div className='absolute left-16 bottom-1/4 md:top-44 md:left-96 lg:left-1/2 lg:top-1/4'>
          <CompactPicker
            color={editingData.presentColor}
            onChangeComplete={color => {
              prop.setPresentColor(color.hex)
              localStorage.setItem('textColor', color.hex)
            }}
          />
        </div>
      )}
    </>
  )
}

export default EditPanel
