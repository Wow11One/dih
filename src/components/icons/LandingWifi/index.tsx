import { SVGAttributes } from 'react';

export default function LandingWifiIcon({ ...props }: LandingWifiIconProps) {
  return (
    <svg width='84' height='84' viewBox='0 0 84 84' fill='none' {...props}>
      <path
        d='M29.0395 49.6439C30.7408 47.9407 32.7612 46.5896 34.985 45.6677C37.2089 44.7459 39.5926 44.2714 42 44.2714C44.4073 44.2714 46.7911 44.7459 49.0149 45.6677C51.2388 46.5896 53.2591 47.9407 54.9605 49.6439M19.334 39.9349C25.3461 33.9248 33.499 30.5486 42 30.5486C50.5009 30.5486 58.6539 33.9248 64.666 39.9349M46.578 62.6009C46.578 63.8151 46.0957 64.9795 45.2371 65.838C44.3786 66.6966 43.2141 67.1789 42 67.1789C40.7858 67.1789 39.6214 66.6966 38.7628 65.838C37.9043 64.9795 37.422 63.8151 37.422 62.6009C37.422 61.3867 37.9043 60.2223 38.7628 59.3638C39.6214 58.5052 40.7858 58.0229 42 58.0229C43.2141 58.0229 44.3786 58.5052 45.2371 59.3638C46.0957 60.2223 46.578 61.3867 46.578 62.6009Z'
        stroke='white'
        stroke-width='5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M9.625 30.2259C18.2121 21.6409 29.8575 16.818 42 16.818C54.1425 16.818 65.7879 21.6409 74.375 30.2259'
        stroke='white'
        stroke-width='5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}

export interface LandingWifiIconProps extends SVGAttributes<SVGElement> {}
