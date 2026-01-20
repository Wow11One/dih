import { SVGAttributes } from 'react';

export default function LandingNetworkIcon({ ...props }: LandingNetworkIconProps) {
  return (
    <svg width='84' height='84' viewBox='0 0 84 84' fill='none' {...props}>
      <path
        d='M32.9 7H12.6C11.4402 7 10.5 7.9402 10.5 9.1V22.4C10.5 23.5598 11.4402 24.5 12.6 24.5H32.9C34.0598 24.5 35 23.5598 35 22.4V9.1C35 7.9402 34.0598 7 32.9 7Z'
        stroke='white'
        stroke-width='5'
      />
      <path
        d='M52.15 59.5H31.85C30.6902 59.5 29.75 60.4402 29.75 61.6V74.9C29.75 76.0598 30.6902 77 31.85 77H52.15C53.3098 77 54.25 76.0598 54.25 74.9V61.6C54.25 60.4402 53.3098 59.5 52.15 59.5Z'
        stroke='white'
        stroke-width='5'
      />
      <path
        d='M71.4 7H51.1C49.9402 7 49 7.9402 49 9.1V22.4C49 23.5598 49.9402 24.5 51.1 24.5H71.4C72.5598 24.5 73.5 23.5598 73.5 22.4V9.1C73.5 7.9402 72.5598 7 71.4 7Z'
        stroke='white'
        stroke-width='5'
      />
      <path
        d='M22.75 24.5V36.75C22.75 38.6065 23.4875 40.387 24.8003 41.6997C26.113 43.0125 27.8935 43.75 29.75 43.75H54.25C56.1065 43.75 57.887 43.0125 59.1998 41.6997C60.5125 40.387 61.25 38.6065 61.25 36.75V24.5M42 43.75V59.5'
        stroke='white'
        stroke-width='5'
      />
    </svg>
  );
}

export interface LandingNetworkIconProps extends SVGAttributes<SVGElement> {}
