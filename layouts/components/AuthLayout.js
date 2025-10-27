import Image from "next/image"

const AuthLayout = ({children}) => {
  return (
      <div className="w-full grid grid-cols-2 gap-0 mt-5  p-10">
          <div className="p-16 flex flex-col items-center justify-center">
            <div className="relative w-full h-[552px] rounded-lg flex items-center justify-center">
              <Image
                src="/images/about/01.jpg"
                alt="image"
                className="rounded-lg object-cover"
                fill
                fetchPriority=""
              />
            </div>
            <div className="text-center mt-8">
              <h1 className="text-2xl font-bold text-orange-500 mb-4">
                Find Your Dream Job Today
              </h1>
              <p className="text-gray-600 text-lg">
                Join thousands of professionals who found their perfect career match
                through our platform
              </p>
            </div>
          </div>
          <div className="bg-orange-100 p-16 flex flex-col items-center justify-center">
          {children}
            
          </div>
        </div>
  )
}

export default AuthLayout