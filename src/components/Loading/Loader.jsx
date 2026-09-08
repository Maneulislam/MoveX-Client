
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center max-h-screen w-full p-4 mt-28">
      <div className="flex flex-col items-center justify-center rounded-3xl max-w-xl w-full">

        <div className="relative flex flex-col items-center justify-center overflow-hidden w-full">

          <svg
            className="w-[320px] h-44 animate-[truckBounce_0.4s_ease-in-out_infinite]"
            viewBox="0 0 320 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.6">
              <line x1="10" y1="50" x2="30" y2="50" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" className="animate-[speedPulse_0.6s_infinite]" />
              <line x1="5" y1="70" x2="35" y2="70" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" className="animate-[speedPulse_0.5s_infinite_0.1s]" />
              <line x1="12" y1="90" x2="28" y2="90" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" className="animate-[speedPulse_0.7s_infinite_0.2s]" />
            </g>

            <rect x="35" y="122" width="12" height="12" rx="2" fill="#71717A" />
            <rect x="282" y="122" width="16" height="15" rx="3" fill="#71717A" />
            <rect x="42" y="120" width="242" height="14" fill="#3F3F46" />

            <rect x="42" y="55" width="158" height="65" fill="#F59E0B" rx="2" />
            <rect x="42" y="55" width="158" height="65" stroke="#D97706" strokeWidth="4" fill="none" rx="2" />
            <rect x="42" y="115" width="158" height="5" fill="#B45309" />

            <text
              x="120"
              y="92"
              fill="#FFFFFF"
              fontSize="20"
              fontWeight="900"
              fontStyle="italic"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="1.5"
            >
              DELIVERY
            </text>
            <line x1="75" y1="100" x2="165" y2="100" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

            <path d="M 200 68 H 235 Q 260 68 275 92 L 282 105 V 120 H 200 Z" fill="#F59E0B" />
            <path d="M 200 115 H 282 V 120 H 200 Z" fill="#D97706" />

            <path d="M 205 72 H 233 Q 252 72 263 90 L 268 98 H 205 Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
            <path d="M 238 74 L 212 96 H 222 L 246 74 Z" fill="#FFFFFF" opacity="0.6" />

            <rect x="257" y="90" width="6" height="10" rx="1" fill="#3F3F46" />
            <rect x="207" y="103" width="10" height="3" rx="1" fill="#3F3F46" />
            <rect x="280" y="106" width="4" height="10" rx="1" fill="#38BDF8" />

            <g className="animate-[wheelSpin_0.5s_linear_infinite] origin-[90px_130px]">
              <circle cx="90" cy="130" r="17" fill="#3F3F46" />
              <circle cx="90" cy="130" r="10" fill="#9CA3AF" />
              <circle cx="90" cy="130" r="4" fill="#3F3F46" />
              <line x1="90" y1="113" x2="90" y2="147" stroke="#4B5563" strokeWidth="2" />
              <line x1="73" y1="130" x2="107" y2="130" stroke="#4B5563" strokeWidth="2" />
            </g>

            <g className="animate-[wheelSpin_0.5s_linear_infinite] origin-[250px_130px]">
              <circle cx="250" cy="130" r="17" fill="#3F3F46" />
              <circle cx="250" cy="130" r="10" fill="#9CA3AF" />
              <circle cx="250" cy="130" r="4" fill="#3F3F46" />
              <line x1="250" y1="113" x2="250" y2="147" stroke="#4B5563" strokeWidth="2" />
              <line x1="233" y1="130" x2="267" y2="130" stroke="#4B5563" strokeWidth="2" />
            </g>
          </svg>

          <div className="w-[300px] h-1.5 bg-base-300 rounded-full overflow-hidden relative -mt-4">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-warning to-transparent "></div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="loading loading-spinner loading-sm text-warning"></span>
          <span className="text-2xl font-extrabold text-base-content tracking-wide">
            Loading...
          </span>
        </div>
      </div>

      <style>{`
        @keyframes truckBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2.5px); }
        }
        @keyframes wheelSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes roadDash {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes speedPulse {
          0%, 100% { opacity: 0.2; transform: translateX(0); }
          50% { opacity: 0.9; transform: translateX(-5px); }
        }
      `}</style>
    </div>
  );
};

export default Loader;