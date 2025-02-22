import { useLocation } from 'react-router-dom'
import { AnswerIcon, StackIcon } from 'components/Icons/icons'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { chatWithNous } from 'services/nous'
import ChatSubmit from 'components/ChatSubmit'
import Typewriter from 'components/Typewriter'
import TypographyNormal from 'components/Typography/Normal'

interface FAQ {
  question: string
  answers: string[]
}

export const DisplayAnswer = (prop: { answers: string[] }) => {
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0)

  if (prop.answers.length <= 0) {
    return (
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <span className="sr-only">Loading...</span>
      </div>
    )
  } else {
    return (
      <div className="text-md pb-4 text-md">
        {prop.answers.slice(0, currentAnswerIndex + 1).map((answer, idx) => (
          <p className="mb-5" key={idx}>
            {idx === currentAnswerIndex ? (
              <Typewriter
                text={answer}
                onComplete={() => {
                  if (currentAnswerIndex < prop.answers.length - 1) {
                    setCurrentAnswerIndex(prevIdx => prevIdx + 1)
                  }
                }}
              />
            ) : (
              answer
            )}
          </p>
        ))}
      </div>
    )
  }
}

const PageSearch = () => {
  const [links, setLinks] = useState<String[]>([])
  const [faqs, setFAQs] = useState<FAQ[]>([])
  const [session, setSession] = useState('')
  const [disableChat, setDisableChat] = useState(false)
  const [nousId, setNousId] = useState('354')

  const location = useLocation()
  const { initialQ } = location.state || {}

  const chatQuestion = (question: string) => {
    if (!question || !session) return

    setDisableChat(true)

    const newFAQ = {
      question,
      answers: [],
    }
    setFAQs(prev => [...prev, newFAQ])
  }

  // Ask nous
  const askBot = async (question: string) => {
    try {
      const res = await chatWithNous(nousId, session, question)
      if (res.data.length <= 0) {
        return
      }

      const newAnswers: string[] = []
      let chatContext = ''

      for (const d of res.data) {
        if (d.recipient_id === session) {
          const strings = d.text.split('\n')
          for (const s of strings) {
            newAnswers.push(s as string)
            chatContext += s
          }
        }
      }

      getRelatedQuestions(chatContext).catch(console.log)

      setFAQs(prev =>
        prev.map(faq => {
          if (faq.question === question && faq.answers.length === 0) {
            return { ...faq, answers: newAnswers }
          }
          return faq
        })
      )

      setDisableChat(false)
    } catch (e) {
      console.log(e)
      setDisableChat(false)
    }
  }

  const getRelatedQuestions = async (chatContext: string) => {
    try {
      const query = 'Derivate 3 questions in the context of Nous Psyche from from the text after this. ' + chatContext
      const res = await chatWithNous(nousId, session, query)

      const questions: string[] = []

      for (const d of res.data) {
        if (d.recipient_id === session) {
          const strings = d.text.split('\n')
          for (const s of strings) {
            questions.push(s.replace(/^\d+\.\s/, '') as string)
          }
        }
      }

      setLinks(questions)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const chatbotInHook = (question: string) => {
      if (!question || !session) return

      const newFAQ = {
        question,
        answers: [],
      }
      setFAQs(prev => [...prev, newFAQ])
    }

    if (!session) setSession(v4())
    if (initialQ && faqs.length <= 0 && nousId && session) {
      chatbotInHook(initialQ as string)
    }
  }, [faqs.length, initialQ, nousId, session])

  useEffect(() => {
    faqs.forEach(faq => {
      if (faq.answers.length <= 0) {
        askBot(faq.question).catch(console.log)
      }
    })
  }, [faqs])

  return (
    <>
      <div className="flex mx-auto w-4/5 md:w-3/4 justify-center bg-green-800/40 backdrop-blur pb-40">
        <main className="w-full">
          {faqs.map((faq, index) => (
            <div key={index}>
              <div className="">
                <h1 className="text-3xl bg-blue-600 p-4">
                  <TypographyNormal>{faq.question}</TypographyNormal>
                </h1>
                <div className="px-4">
                  <h3 className="font-semibold text-xl items-center flex gap-2 rounded-md py-3">
                    <AnswerIcon />
                    <TypographyNormal classNames="text-yellow-400">Answers</TypographyNormal>
                  </h3>
                  <DisplayAnswer answers={faq.answers} />
                </div>
              </div>
              <hr className="h-px bg-gray-400 border-0" />
            </div>
          ))}

          <section className="p-4 bg-white/10 backdrop-blur">
            <div className="">
              <h3 className="font-semibold text-xl items-center flex gap-2 rounded-md py-3 text-yellow-400">
                <StackIcon />
                <TypographyNormal>Related</TypographyNormal>
              </h3>
              <div className="text-md pb-4">
                {links.map((link, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      chatQuestion(link as string)
                    }}
                    className="text-md border-b border-b-gray-700 py-2 hover:text-yellow-400 cursor-pointer"
                  >
                    <TypographyNormal>{link}</TypographyNormal>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <div className="fixed bottom-0 left-0 w-full ">
        <div className="py-6">
          <ChatSubmit onSendChat={msg => chatQuestion(msg)} disable={disableChat} />
        </div>
      </div>
    </>
  )
}
export default PageSearch
