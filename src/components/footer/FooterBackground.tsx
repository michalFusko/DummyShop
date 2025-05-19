const FooterBackground = () => {
  return (
    <div className="fixed bottom-0 left-0 -z-10 flex h-[60vh] w-full items-center justify-center overflow-hidden font-semibold text-gray-700">
      <div className="">
        <video
          src="/video/bg-video.mp4"
          className="absolute top-0 right-0 -z-10 h-full w-full object-cover"
          autoPlay
          loop
          muted
        />
      </div>
      {/* STYLED IN INDEX.CSS */}
      <div className="relative flex items-center justify-center text-center tracking-widest">
        <div className="gradientText absolute flex items-center justify-center">
          <span className="text-[40px] sm:text-[68px] md:text-[84px] lg:text-[112px]">
            D
          </span>
          <span className="text-[42px] sm:text-[72px] md:text-[92px] lg:text-[120px]">
            UM
          </span>
          <span className="text-[44px] sm:text-[78px] md:text-[98px] lg:text-[128px]">
            MYS{" "}
          </span>
          <span className="text-[42px] sm:text-[72px] md:text-[92px] lg:text-[120px]">
            HO
          </span>
          <span className="text-[40px] sm:text-[68px] md:text-[84px] lg:text-[112px]">
            P
          </span>
        </div>
        <span className="textShadow3DLeft text-[40px] sm:text-[68px] md:text-[84px] lg:text-[112px]">
          D
        </span>
        <span className="textShadow3DLeftHalf text-[42px] sm:text-[72px] md:text-[92px] lg:text-[120px]">
          UM
        </span>
        <span className="textShadow3D text-[44px] sm:text-[78px] md:text-[98px] lg:text-[128px]">
          MYS{" "}
        </span>
        <span className="textShadow3DRightHalf text-[42px] sm:text-[72px] md:text-[92px] lg:text-[120px]">
          HO
        </span>
        <span className="textShadow3DRight text-[40px] sm:text-[68px] md:text-[84px] lg:text-[112px]">
          P
        </span>
      </div>
    </div>
  );
};

export default FooterBackground;
