import { ExclamationIcon } from 'components/Icons/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import botFaq from '/public/img/botfaq.svg'

const quickLinks = [
  'What is Nous Psyche?',
  'Tell me about Nous Psyche NFT',
  'Share me your roadmap?',
  'Benefits of holding Nous Psyche',
  'How to mint',
]

const PageIndex = () => {
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState<string>('')

  const handleKeyUp = (e: { key: string }) => {
    if (e.key === 'Enter') {
      goToSearch(inputValue)
    }
  }

  const goToSearch = (text: string) => {
    navigate(`/search`, { state: { initialQ: text } })
  }

  return (
    <div className="h-full w-4/5 mx-auto flex flex-col justify-center items-center">
      <section className="">
        <h3 className=" w-full p-5 text-center font-semibold text-2xl md:text-4xl">
          <TypographyNormal>
            Welcome to <span className="text-yellow-500">Nous Psyche</span>
          </TypographyNormal>
        </h3>
      </section>
      <div className="w-full h-full">
        {/* Search Section */}
        <section className="flex flex-col justify-center items-center h-1/4 py-4">
          <div className="w-full flex justify-center items-center">
            <input
              type="text"
              placeholder="Ask anything..."
              className="border border-gray-300 bg-[#181818] placeholder:text-gray-300 placeholder:italic md:w-3/4 lg:w-1/2 rounded-md p-2 outline-none focus:outline-white focus:border-none"
              onKeyUp={handleKeyUp}
              onChange={e => setInputValue(e.target.value)}
            />
          </div>
        </section>
        {/* FAQ Section */}
        <section className=" flex flex-col items-center justify-center">
          <p className="flex gap-2 justify-center px-1 py-5 w-3/4 font-medium">
            <ExclamationIcon />
            Don't know what to ask? Try asking this:
          </p>

          <div className={`grid grid-cols-2 gap-1 sm:flex sm:gap-2 sm:flex-wrap px-7 md:p-3 justify-center `}>
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSearch(link)
                }}
                className={`text-sm hover:bg-[#181818] hover:text-white text-gray-400 rounded-md p-2 ${quickLinks.length % 2 !== 0 && " last:col-span-2"}`}
              >
                {link}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default PageIndex
