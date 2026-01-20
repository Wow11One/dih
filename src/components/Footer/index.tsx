import LinkedInIcon from '../icons/LinkedIn';
import MailIcon from '../icons/Mail';
import TwitterIcon from '../icons/Twitter';

export default function Footer() {
  return (
    <footer className='bg-blue-primary text-white'>
      <div className='relative py-5 lg:py-10 flex flex-col items-center gap-5 mx-2'>
        <div className='font-raleway font-bold text-xl lg:text-4xl'>
          CONTACT US:
        </div>

        <div className='flex items-center gap-2'>
          <MailIcon />
          <div>
            <a
              className='text-lg lg:text-xl underline underline-offset-2'
              href='mailto:a.kushnir@kau.edu.ua'
            >
              a.kushnir@kau.edu.ua
            </a>
          </div>
        </div>

        <div className='flex items-center gap-6 lg:gap-8'>
          <a
            href='https://www.linkedin.com/company/nosc-ua-dih'
            target='_blank'
          >
            <LinkedInIcon />
          </a>
          <TwitterIcon />
        </div>

        <div className='hidden lg:block absolute right-10 bottom-10 text-lg'>
          Copyright. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
