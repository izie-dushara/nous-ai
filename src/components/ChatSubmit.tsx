import { useRef, useEffect, useState } from 'react'
import { SubmitChat } from './Icons/icons'
import { useEdit } from './EditRoomPage/useEdit'

interface ChatSubmitProp {
  onSendChat: (message: string) => void
  disable: boolean
}

const ChatSubmit = (prop: ChatSubmitProp) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [message, setMessage] = useState('')
  const { boxColor, boxTextColor, submitColor } = useEdit()

  const handleResize = () => {
    const textArea = textAreaRef.current
    if (textArea) {
      textArea.style.height = 'auto'
      textArea.style.height = textArea.scrollHeight + 'px'
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        setMessage(prevMessage => prevMessage + '\n')
      } else {
        onSubmit()
      }
    }
  }

  useEffect(() => {
    handleResize()
  }, [])

  const onSubmit = () => {
    prop.onSendChat(message)
    setMessage('')
    const textArea = textAreaRef.current
    if (textArea) {
      textArea.style.height = 'auto'
    }
  }

  return (
    <div className="relative py-6">
      <div className="relative sm:w-full md:w-3/4 lg:w-1/2 mx-auto px-4">
        <div className="bg-blue-800 text-white p-1 text-xs border-blue-600 border">Press ENTER to submit</div>
        <textarea
          id="message"
          ref={textAreaRef}
          value={message}
          onChange={e => {
            setMessage(e.target.value)
            handleResize()
          }}
          onKeyUp={handleKeyUp}
          placeholder={prop.disable ? 'Processing...' : 'Type a message'}
          className={`w-full py-3 px-3 text-black rounded-md border-gray-200  shadow-sm text-xs sm:text-sm bg-white placeholder:${boxColor === "#ffffff" ? "text-slate-700" : "text-white"}`}
          style={{ color: `${boxTextColor}`, backgroundColor: `${boxColor}` }}
          rows={2}
          disabled={prop.disable}
        />
        <span className="absolute inset-y-0 end-0 grid w-20 place-content-center">
          {/* <button
            type="button"
            className="rounded-full border border-indigo-600 bg-indigo-600 p-3 text-white hover:bg-indigo-300 hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            style={{ backgroundColor: `${submitColor}`, border: `${submitColor}` }}
            onClick={onSubmit}
            disabled={prop.disable}
          >
            <SubmitChat />
          </button> */}
        </span>
      </div>
    </div>
  )
}

export default ChatSubmit
