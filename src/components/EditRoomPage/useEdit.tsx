import {create} from "zustand";

export const useEdit = create<{
  displayImage: string
  setDisplayImage: (value: string) => void
  presentColor: string
  setPresentColor: (value: string) => void
  boxColor: string
  setBoxColor: (value: string) => void
  submitColor: string
  setSubmitColor: (value: string) => void
  boxTextColor: string
  setBoxTextColor: (value: string) => void
  isShowTextColor: boolean
  isShowBoxColor: boolean
  isShowSubmitColor: boolean
  isShowBoxTextColor: boolean
  toggleColorPickerText: (value:boolean) => void
  toggleColorPickerBox: (value:boolean) => void
  toggleColorPickerSubmit: (value:boolean) => void
  toggleColorPickerBoxText: (value: boolean) => void
}>((set) => ({
  displayImage: localStorage.getItem('uploadedImage') || "",
  presentColor:  localStorage.getItem('textColor') || "",
  boxColor: localStorage.getItem('boxColor') || "",
  submitColor: localStorage.getItem('submitColor') || "",
  boxTextColor: localStorage.getItem('boxText') || "",
  isShowTextColor: false,
  isShowBoxColor: false,
  isShowSubmitColor: false,
  isShowBoxTextColor: false,
  setDisplayImage: (displayImage) => set({displayImage}),
  setPresentColor: (presentColor) => set({presentColor}),
  setBoxColor: (boxColor) => set({boxColor}),
  setSubmitColor: (submitColor) => set({submitColor}),
  setBoxTextColor: (boxTextColor) => set({boxTextColor}),
  toggleColorPickerText: (isShowTextColor) => set({isShowTextColor}),
  toggleColorPickerBox: (isShowBoxColor) => set({isShowBoxColor}),
  toggleColorPickerSubmit: (isShowSubmitColor) => set({isShowSubmitColor}),
  toggleColorPickerBoxText: (isShowBoxTextColor) => set({isShowBoxTextColor}),
}))