const FramerMotionSvg = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-[50px] w-[50px] md:h-[100px] md:w-[100px] lg:h-[150px] lg:w-[150px] xl:h-[200px] xl:w-[200px]"
      >
        <defs>
          <linearGradient id="fm-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF0080" />
            <stop offset="50%" stopColor="#7928CA" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>
        </defs>
        <g
          fill="none"
          stroke="url(#fm-gradient)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M12 12L4 4v16L20 4v16l-4-4" />
          <path d="m20 12l-8 8l-4-4" />
        </g>
      </svg>
    </div>
  );
};

export default FramerMotionSvg;
