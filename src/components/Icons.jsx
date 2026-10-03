// All icons are decorative: they inherit currentColor and are hidden from assistive tech.
// Surrounding text always carries the meaning.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

export const Arrow = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Check = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <path d="m4.5 10.4 3.2 3.1 7.8-7.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronDown = ({ className }) => (
  <svg className={className} {...base} strokeWidth={2}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const MenuIcon = ({ className }) => (
  <svg className={className} {...base} strokeWidth={2}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = ({ className }) => (
  <svg className={className} {...base} strokeWidth={2}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const GraphIcon = ({ className }) => (
  <svg className={className} {...base}>
    <path d="M4 19V5m0 14h16M7 15c2-5 4-7 6-5s3 4 7-3" />
  </svg>
);

export const BookIcon = ({ className }) => (
  <svg className={className} {...base}>
    <path d="M5 4.5h9a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3V4.5Zm3 2h6m-6 4h6m-6 4h4" />
  </svg>
);

export const ProgressIcon = ({ className }) => (
  <svg className={className} {...base}>
    <path d="M5 18V9m5 9V5m5 13v-6m4 6H3" />
  </svg>
);

export const StepsIcon = ({ className }) => (
  <svg className={className} {...base}>
    <circle cx="6" cy="6" r="2" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="6" cy="18" r="2" />
    <path d="M9 6h4a4 4 0 0 1 4 4v4m0 0-2-2m2 2 2-2M9 12h3M9 18h5" />
  </svg>
);

export const ShuffleIcon = ({ className }) => (
  <svg className={className} {...base}>
    <path d="M4 7h3.2a4 4 0 0 1 3.2 1.6l3.2 4.8a4 4 0 0 0 3.2 1.6H20M4 17h3.2a4 4 0 0 0 3.2-1.6M13.6 8.6A4 4 0 0 1 16.8 7H20m-2.5-2.5L20 7l-2.5 2.5m0 5L20 17l-2.5 2.5" />
  </svg>
);

export const UsersIcon = ({ className }) => (
  <svg className={className} {...base}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0M15.5 5.2a3.2 3.2 0 0 1 0 5.6M17.5 14.2a5.5 5.5 0 0 1 3 4.8" />
  </svg>
);

export const ClipboardIcon = ({ className }) => (
  <svg className={className} {...base}>
    <rect x="5" y="4.5" width="14" height="16" rx="2.5" />
    <path d="M9 4.5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.5M8.5 10h7M8.5 14h7M8.5 17.2h4" />
  </svg>
);

export const ChartIcon = ({ className }) => (
  <svg className={className} {...base}>
    <path d="M4 4v15.5a.5.5 0 0 0 .5.5H20" />
    <path d="m7.5 15 3.5-4.5 3 2.5 4.5-6" />
  </svg>
);

export const SlidersIcon = ({ className }) => (
  <svg className={className} {...base}>
    <path d="M4 7h9m4 0h3M4 17h3m4 0h9" />
    <circle cx="15" cy="7" r="2" />
    <circle cx="9" cy="17" r="2" />
  </svg>
);

export const GlobeIcon = ({ className }) => (
  <svg className={className} {...base}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5S9.6 5.9 12 3.5Z" />
  </svg>
);

export const AndroidIcon = ({ className }) => (
  <svg className={className} {...base}>
    <path d="M6.5 10.5h11V17a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-6.5Zm0 0a5.5 5.5 0 0 1 11 0M9 5.5 7.8 3.8M15 5.5l1.2-1.7M5 11v5M19 11v5" />
    <circle cx="9.6" cy="8.2" r=".6" fill="currentColor" stroke="none" />
    <circle cx="14.4" cy="8.2" r=".6" fill="currentColor" stroke="none" />
  </svg>
);

export const ShareIcon = ({ className }) => (
  <svg className={className} {...base}>
    <path d="M12 15V4m0 0L8.5 7.5M12 4l3.5 3.5M6 11H5.5A1.5 1.5 0 0 0 4 12.5v6A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5H18" />
  </svg>
);

export const LayersIcon = ({ className }) => (
  <svg className={className} {...base}>
    <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Zm-8.5 8.8 8.5 4.5 8.5-4.5M3.5 16.3 12 20.8l8.5-4.5" />
  </svg>
);

export const ShieldIcon = ({ className }) => (
  <svg className={className} {...base}>
    <path d="M12 3.5 5 6v5.5c0 4.2 2.8 7.6 7 9 4.2-1.4 7-4.8 7-9V6l-7-2.5Z" />
    <path d="m9 12 2.2 2.2L15.2 10" />
  </svg>
);

export const PlusIcon = ({ className }) => (
  <svg className={className} {...base} strokeWidth={2}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

// The brand's integral sign is the real STIX Two Math glyph (U+222B), embedded as an outline so it
// renders identically on every platform (STIX Two Text on Google Fonts / Fontsource ships no U+222B,
// so the previous text glyph silently fell back to a different system font per device).
const INTEGRAL_PATH =
  'M578 671L578 677Q578 677 570.5 680Q563 683 544 683Q516 683 496 659.5Q476 636 461 595.5Q446 555 434.5 504.5Q423 454 413.5 399Q404 344 395 292Q375 182 350 87.5Q325 -7 293 -77.5Q261 -148 220.5 -187Q180 -226 129 -226Q76 -226 53 -199Q30 -172 30 -141Q30 -106 47.5 -87.5Q65 -69 88 -69Q108 -69 117.5 -80.5Q127 -92 127 -111Q127 -132 120.5 -146Q114 -160 104 -174L104 -181Q104 -181 109.5 -184Q115 -187 128 -187Q161 -187 184 -150.5Q207 -114 223 -52Q239 10 253 87.5Q267 165 282 246Q294 310 309.5 378Q325 446 346.5 508Q368 570 397.5 619.5Q427 669 467.5 698Q508 727 562 727Q599 727 626.5 706Q654 685 654 642Q654 604 632 585Q610 566 587 566Q548 566 548 610Q548 644 578 671Z';

export const IntegralGlyph = ({ className }) => (
  <svg className={className} viewBox="30 -727 624 953" aria-hidden="true" focusable="false">
    <path
      transform="scale(1 -1)"
      d={INTEGRAL_PATH}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="14"
      strokeLinejoin="round"
    />
  </svg>
);
