import Link  from 'next/link';

const GetStartedBtn:React.FC = () => {
  return (
    <Link href={'/auth/signup'}>
      <button className="mt-4 lg:mt-0 text-lg xl:text-xl font-bold px-8 py-4 bg-[#FFCA0D] leading-none hover:bg-[#92B76D] transition-all duration-300 ease-in-out">
        GET STARTED
      </button>
    </Link>
  )
}

export default GetStartedBtn;