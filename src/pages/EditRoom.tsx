import { Link, /*useParams*/ } from 'react-router-dom'
import { useEdit } from 'components/EditRoomPage/useEdit'
import EditPanel from 'components/EditRoomPage/EditPanel'

const EditRoom = () => {
  // const { key } = useParams()

  const { bgImage, colors } = useEdit()

  return (
    <>
      <div
        className="z-0 pb-72 bg-no-repeat bg-cover h-screen w-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          overflow: 'hidden',
          backgroundPosition: 'center',
          color: `${colors.chatText}`,
        }}
      >
        <div className="relative h-screen z-10 pb-[230px]">
          <div className="w-full mt-4 pl-2">
            {/* <Link to={`/room/${key}`}>{`< < `}Go to Room</Link> */}
            <Link to="/inventory">To Inventory!</Link>
          </div>
          <EditPanel />
          <div className="flex flex-col w-full h-screen">
            <div className="w-full p-5 flex md:pl-44">
              <div className="bg-white w-8 h-8 md:h-10 md:w-10 rounded-md"></div>
              <div className="ml-4 mr-2 text-sm">
                <h5 className="capitalize font-bold text-sm md:pb-1">Sample Text</h5>
                <div>This is just a sample text</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-10">
        <div className="py-6">
          <div className="relative py-6">
            <div className="relative sm:w-full md:w-3/4 lg:w-1/2 mx-auto px-4">
              <div
                className="bg-blue-800 text-white p-1 text-xs border-blue-600 border"
                style={{
                  backgroundColor: `${colors.submitBanner}`,
                  border: `${colors.submitBanner}`,
                  color: `${colors.inputText}`,
                }}
              >
                Press ENTER to submit
              </div>
              <textarea
                id="message"
                defaultValue="This how text look like"
                placeholder={'Type a message'}
                className={`w-full py-3 px-3 text-black rounded-md border-gray-200  shadow-sm text-xs sm:text-sm bg-white placeholder:text-white  placeholder:${
                  colors.inputBox === '#ffffff' ? 'text-slate-700' : 'text-white'
                }`}
                style={{ backgroundColor: `${colors.inputBox}`, color: `${colors.inputText}` }}
                rows={2}
              />
              <span className="absolute inset-y-0 end-0 grid w-20 place-content-center"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditRoom
