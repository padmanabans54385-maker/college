import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 24): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
});

/** Filled academic silhouettes matching the img5 icon language. */
export const GraduationCapIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M12 3.2 1.8 8.1c-.4.2-.4.7 0 .9L7 11.3v4.4c0 .9 2.2 2.8 5 2.8s5-1.9 5-2.8v-4.4l2.6-1.2v3.6c-.6.2-1 .8-1 1.4 0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6c0-.6-.4-1.2-1-1.4V10l.4-.2c.4-.2.4-.7 0-.9L12 3.2z" />
  </svg>
);

export const BooksIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M3 4.5h5.2c.9 0 1.6.7 1.6 1.6v13.2H4.6A1.6 1.6 0 0 1 3 17.7V4.5zm7.2 0h5.2c.9 0 1.6.7 1.6 1.6v13.2h-5.2c-.9 0-1.6-.7-1.6-1.6V4.5zm7.2 1.2 3.1 12.4c.2.8-.3 1.6-1.1 1.8l-2.8.7V6.8c0-.6.5-1.1 1.1-1.1h-.3z" />
  </svg>
);

export const GlobeIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 1.8c.8 0 2.4 2.7 2.8 7.2H9.2C9.6 6.5 11.2 3.8 12 3.8zm-3.9.9C6.4 6 5 8.8 4.6 11H8.1C8.4 7.8 9.3 5.5 8.1 4.7zm7.8 0c-1.2.8-.3 3.1 0 6.3h3.5c-.4-2.2-1.8-5-3.5-6.3zM4.6 13c.4 2.2 1.8 5 3.5 6.3 1.2-.8.3-3.1 0-6.3H4.6zm4.6 0c.4 4.5 2 7.2 2.8 7.2s2.4-2.7 2.8-7.2H9.2zm5.7 0c-.3 3.2.6 5.5 0 6.3 1.7-1.3 3.1-4.1 3.5-6.3h-3.5z" />
  </svg>
);

export const CalculatorIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M6.2 2.5h11.6A1.7 1.7 0 0 1 19.5 4.2v15.6a1.7 1.7 0 0 1-1.7 1.7H6.2a1.7 1.7 0 0 1-1.7-1.7V4.2A1.7 1.7 0 0 1 6.2 2.5zm1.6 2.2v3.6h8.4V4.7H7.8zM8 11.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM8 15.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
  </svg>
);

export const MicroscopeIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M9.2 2.2h3.1v2.2H9.2zm.6 2.8h1.9l.3 3.2 1.6.9a4.4 4.4 0 1 1-4.3 7.4H2.8v-2.1h5.2a4.4 4.4 0 0 1 4.5-4.6c.4 0 .8.1 1.2.2l-1.5-2.6-2.4-.3V5zm8.8 8.7a2.3 2.3 0 1 0-2.3 2.3 2.3 2.3 0 0 0 2.3-2.3zM3 19.5h18V22H3z" />
  </svg>
);

export const FlaskIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M9 3h6v2h-1.2l.2 5.2 4.8 8.2A1.8 1.8 0 0 1 17.2 21H6.8a1.8 1.8 0 0 1-1.6-2.6l4.8-8.2L10.2 5H9V3zm2.2 7.4-.4 1.6h2.4l-.4-1.6h-1.6z" />
  </svg>
);

export const BusIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M5 4.2A2.2 2.2 0 0 1 7.2 2h9.6A2.2 2.2 0 0 1 19 4.2V16H5V4.2zM7 6h4v3H7V6zm6 0h4v3h-4V6zM4.5 16.8h15v2.4h-1.1a2.2 2.2 0 0 1-4.2 0H9.8a2.2 2.2 0 0 1-4.2 0H4.5v-2.4zM7.2 20.2a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8zm9.6 0a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8z" />
  </svg>
);

export const ChalkboardIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M3 4.2A1.7 1.7 0 0 1 4.7 2.5h14.6A1.7 1.7 0 0 1 21 4.2v11.1a1.7 1.7 0 0 1-1.7 1.7h-5.1v1.5h3.3V20H6.5v-1.5h3.3v-1.5H4.7A1.7 1.7 0 0 1 3 15.3V4.2zm2.2 1.6v8.4h13.6V5.8H5.2z" />
  </svg>
);

export const AwardIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M12 2.2a6.2 6.2 0 0 1 3.3 11.4l1.2 8-4.5-2.4-4.5 2.4 1.2-8A6.2 6.2 0 0 1 12 2.2zm0 2.3a3.9 3.9 0 1 0 0 7.8 3.9 3.9 0 0 0 0-7.8z" />
  </svg>
);

export const LightbulbIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M12 2.2A6.8 6.8 0 0 1 18.8 9c0 2.4-1.2 4.1-2.5 5.4-.6.6-1.1 1.4-1.3 2.2h-6c-.2-.8-.7-1.6-1.3-2.2C6.4 13.1 5.2 11.4 5.2 9A6.8 6.8 0 0 1 12 2.2zM9.4 18.2h5.2v1.2H9.4zm.6 2.1h4v1.5h-4z" />
  </svg>
);

export const ClockIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm.8 4.5h-1.8v6.1l4.6 2.7.9-1.5-3.7-2.2V6.5z" />
  </svg>
);

export const AppleIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M14.6 3.2c-.6 1.4-1.8 2.4-3.4 2.7.2-1.4 1.3-2.6 2.8-3.1.2 0 .6.2.6.4zm4.3 6.1c-.4-2.2-2.2-3.6-4.2-3.6-1.1 0-2 .4-2.7.4s-1.5-.5-2.8-.5c-2.2 0-4.2 1.8-4.2 5.1 0 3.9 3.3 9.1 5.8 9.1.9 0 1.5-.6 2.6-.6s1.6.6 2.7.6c2.2 0 4.3-3.9 4.8-5.6-2.8-1.1-3.3-5.1-2-5.5z" />
  </svg>
);

export const GrowthArrowIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M14.2 4.2h6.4v6.4h-2.1V7.8l-7 7-3.2-3.2-5.1 5.1-1.6-1.6 6.7-6.7 3.2 3.2 5.5-5.5h-2.8V4.2z" />
  </svg>
);

export const UniversityIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M12 2.2 2.5 7.2v1.8H4v9.3H2.2V20h19.6v-1.7h-1.8V9h1.5V7.2L12 2.2zM7.2 9v9.3h2.2V9H7.2zm3.8 0v9.3h2V9h-2zm3.8 0v9.3h2.2V9h-2.2z" />
  </svg>
);

export const PaletteIcon = ({ size = 24, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M12 2.2a9.8 9.8 0 0 0-1.2 19.5c1.2.1 1.7-1.1 1.2-2.1-.5-.9.1-1.4.8-1.6 3.3-.8 5.7-3.2 5.7-6.6A9.2 9.2 0 0 0 12 2.2zM8 8.2a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zm3.2-2.2a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zm4.2 1.6a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zM8.2 12.4a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z" />
  </svg>
);

export const IconBadge = ({
  children,
  accent = false,
  className = "",
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) => (
  <span
    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
      accent ? "bg-[#168FD0] text-white" : "bg-[#F0F8FD] text-[#075B63]"
    } ${className}`}
  >
    {children}
  </span>
);
