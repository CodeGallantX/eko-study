import GetStartedBtn from './GetStartedBtn';

export default function FooterBanner () {
  return (
    <section className="relative top-32 pb-16 mt-16 px-10 xl:px-24 -bottom-24 ">
      
      <div
        className="absolute inset-0 mx-10 lg:mx-10 xl:mx-24 h-56 bg-cover bg-fixed object-cover"
        style={{ backgroundImage: "url('https://ik.imagekit.io/mshcgnjju/EkoStudy/FooterBannerBG.bmp')" }}
      ></div>
      
      
      <div className="relative">
        <div className="relative -top-32">
          <div
            className="absolute inset-0 top-0 w-full bg-black h-56 bg-opacity-60 flex items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center text-center lg:text-left lg:flex-row lg:justify-between w-full px-5 sm:px-6 py-4 lg:px-8 lg:py-8 xl:px-20 xl:py-20">
              <h2 className="text-[28px] sm:text-[38px] lg:text-[48px] xl:text-[64px] text-white font-bold leading-none">
                Discover, Learn, Achieve
              </h2>
              <GetStartedBtn />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}