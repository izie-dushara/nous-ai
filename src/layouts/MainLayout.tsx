import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import { Web3Wrapper } from 'App'
import bg from '/public/img/bg.png'
import AlertBox from 'components/AlertBox'

interface BackgroundImages {
  [key: string]: string
}
const backgroundImages: BackgroundImages = {
  '/mint': '/img/minting.png',
  '/perks': '/img/workshop.png',
  '/search': '',
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  let backgroundImage = ''

  if (backgroundImages[location.pathname] === 'none') {
    backgroundImage = ''
  } else {
    backgroundImage = backgroundImages[location.pathname] || '/img/bg.png'
  }

  return (
    <Web3Wrapper>
      <img src={backgroundImage} className="fixed object-cover overflow-hidden w-full h-screen -z-10 mx-auto" />
      <Header />
      <hr className="h-px mb-8 bg-white border-0 dark:bg-gray-700" />
      <div className="container mx-auto text-white">
        <Outlet />
      </div>
    </Web3Wrapper> 
  )
}

export default MainLayout
