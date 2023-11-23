import {create} from "zustand";

export const useEdit = create<{
  bgImage: string
  setBgImage: (value: string) => void
  colors: {
    chatText: string
    setChatText: (value: string) => void
    inputText: string
    setInputText: (value: string) => void
    submitBanner: string
    setSubmitBanner: (value: string) => void
    inputBox: string
    setInputBox: (value:string) => void
  }

  isShow: {
    chatText: boolean
    setChatText: (value: boolean) => void
    inputText: boolean
    setInputText: (value: boolean) => void
    submitBanner: boolean
    setSubmitBanner: (value: boolean) => void
    inputBox: boolean
    setInputBox: (value: boolean) => void
  }
  
}>((set) => ({
  bgImage: localStorage.getItem('bgImage') || "",
  setBgImage: (bgImage) => set({bgImage}),
  colors: {
    chatText: localStorage.getItem('chTxt') || "",
    setChatText:(chatText) => set((state) => ({ colors: { ...state.colors, chatText: chatText } })),
    inputText: localStorage.getItem('inpTxt') || "",
    setInputText: (inputText) => set((state) => ({ colors: { ...state.colors, inputText: inputText } })),
    submitBanner: localStorage.getItem('sBanner') || "",
    setSubmitBanner:(submitBanner) => set((state) => ({ colors: { ...state.colors, submitBanner: submitBanner } })),
    inputBox: localStorage.getItem('inpBox') || "",
    setInputBox: (inputBox) => set((state) => ({ colors: { ...state.colors, inputBox: inputBox } })),
  },

  isShow: {
    chatText: false,
    setChatText: (chatText) => set((state) => ({isShow: {...state.isShow, chatText: chatText}})),
    inputText: false,
    setInputText: (inputText) => set((state) => ({isShow: {...state.isShow, inputText: inputText}})),
    submitBanner: false,
    setSubmitBanner:(submitBanner) => set((state) => ({isShow: {...state.isShow, submitBanner: submitBanner}})),
    inputBox: false,
    setInputBox: (inputBox) => set((state) => ({isShow: {...state.isShow, inputBox: inputBox}}))
  }
}))