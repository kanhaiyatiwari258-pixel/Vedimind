export default function VediLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <defs>
        <linearGradient id="vg" x1="0" y1="0" x2="72" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A5B4FC"/>
          <stop offset="1" stopColor="#7C3AED"/>
        </linearGradient>
      </defs>
      <line x1="18" y1="12" x2="36" y2="50" stroke="url(#vg)" strokeWidth="7" strokeLinecap="round"/>
      <line x1="54" y1="12" x2="36" y2="50" stroke="url(#vg)" strokeWidth="7" strokeLinecap="round"/>
      <line x1="24" y1="31" x2="48" y2="31" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <circle cx="36" cy="51" r="4" fill="#A5B4FC"/>
    </svg>
  )
}