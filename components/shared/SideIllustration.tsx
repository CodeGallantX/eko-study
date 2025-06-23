const SideIll = () => {
    return (
      <div className="hidden md:block h-full relative font-onest">
        <div className="w-full h-full">
          <img
            src="/images/illustration.jpg"
            alt="grainy background - EkoStudy"
            className="object-cover w-full h-full"
          />
        </div>
  
        <div className="w-4/5 lg:w-3/4 absolute flex flex-col items-start justify-center top-10 lg:top-20 gap-10 lg:gap-20 left-10 lg:left-12">
          {/* Logo */}
          <div>
            <img src="/images/yellow-logo.png" alt="EkoStudy logo" className="w-28 lg:w-36" />
          </div>
  
          {/* Hero Text */}
          <div className="flex flex-col items-start justify-center space-y-7 text-white">
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
              Your Academic Companion — Anytime, Anywhere
            </h1>
            <p className="text-base lg:text-lg leading-relaxed">
              Access streamlined study groups, course materials, past questions, and smart tools
              tailored to your academic journey.
            </p>
          </div>
  
          {/* Testimonial Box */}
          <div className="bg-[#ffca0d] text-black p-4 lg:p-6 rounded-xl space-y-2 lg:space-y-3 max-w-md shadow-md">
            <p className="text-sm lg:text-base leading-snug">
              EkoStudy gave me clarity. I stopped struggling with disorganized notes and finally
              had a single place for everything I needed.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://ik.imagekit.io/mshcgnjju/penguin_avatar"
                alt="Student avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-bold">Emeka Ojo</h4>
                <p className="text-xs text-black/70">Mechanical Engineering, 300L</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SideIll;  