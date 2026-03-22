import Image from 'next/image';
import './inlineScroll.css'

import icon1 from '../../public/icons/Soup.svg'
import icon2 from '../../public/icons/Cocktail.svg';
import icon3 from '../../public/icons/Fish.svg';
import icon4 from '../../public/icons/Milkshake.svg';
import icon5 from '../../public/icons/Shots.svg';
import icon6 from '../../public/icons/Steak.svg';

const InlineInfiniteScroll = () => {
  return (
    <div className="scroll-container w-[70%] md:w-[65%] overflow-hidden whitespace-nowrap relative flex items-center pt-5 pb-8">
      <div className="scroll-content flex items-center gap-5">

        <div className="logo-item inline-flex items-center justify-center gap-2">
          <div className="logo-content flex items-center justify-center">
            <Image src={icon1} alt="inline-scroll-svg" width={10} height={10} className='logo-icon' />
          </div>
          <p className='text-sm font-medium text-[#fafafa]'>Soup</p>
        </div>
        <div className="logo-item inline-flex items-center justify-center gap-2">
          <div className="logo-content flex items-center justify-center">
            <Image src={icon2} alt="inline-scroll-svg" width={10} height={10} className='logo-icon' />
          </div>
          <p className='text-sm font-medium text-[#fafafa]'>Cocktail</p>
        </div>
        <div className="logo-item inline-flex items-center justify-center gap-2">
          <div className="logo-content flex items-center justify-center">
            <Image src={icon3} alt="inline-scroll-svg" width={10} height={10} className='logo-icon' />
          </div>
          <p className='text-sm font-medium text-[#fafafa]'>Fish</p>
        </div>
        <div className="logo-item inline-flex items-center justify-center gap-2">
          <div className="logo-content flex items-center justify-center">
            <Image src={icon4} alt="inline-scroll-svg" width={10} height={10} className='logo-icon' />
          </div>
          <p className='text-sm font-medium text-[#fafafa]'>Milkshake</p>
        </div>
        <div className="logo-item inline-flex items-center justify-center gap-2">
          <div className="logo-content flex items-center justify-center">
            <Image src={icon5} alt="inline-scroll-svg" width={10} height={10} className='logo-icon' />
          </div>
          <p className='text-sm font-medium text-[#fafafa]'>Shots</p>
        </div>
        <div className="logo-item inline-flex items-center justify-center gap-2">
          <div className="logo-content flex items-center justify-center">
            <Image src={icon6} alt="inline-scroll-svg" width={10} height={10} className='logo-icon' />
          </div>
          <p className='text-sm font-medium text-[#fafafa]'>Steak</p>
        </div>

        {/* duplicates for seamless loops */}
        <div className="logo-item inline-flex items-center justify-center gap-2">
          <div className="logo-content flex items-center justify-center">
            <Image src={icon1} alt="inline-scroll-svg" width={10} height={10} className='logo-icon' />
          </div>
          <p className='text-sm font-medium text-[#fafafa]'>Soup</p>
        </div>
        <div className="logo-item inline-flex items-center justify-center gap-2">
          <div className="logo-content flex items-center justify-center">
            <Image src={icon2} alt="inline-scroll-svg" width={10} height={10} className='logo-icon' />
          </div>
          <p className='text-sm font-medium text-[#fafafa]'>Cocktail</p>
        </div>
        <div className="logo-item inline-flex items-center justify-center gap-2">
          <div className="logo-content flex items-center justify-center">
            <Image src={icon3} alt="inline-scroll-svg" width={10} height={10} className='logo-icon' />
          </div>
          <p className='text-sm font-medium text-[#fafafa]'>Fish</p>
        </div>
        <div className="logo-item inline-flex items-center justify-center gap-2">
          <div className="logo-content flex items-center justify-center">
            <Image src={icon4} alt="inline-scroll-svg" width={10} height={10} className='logo-icon' />
          </div>
          <p className='text-sm font-medium text-[#fafafa]'>Milkshake</p>
        </div>
        <div className="logo-item inline-flex items-center justify-center gap-2">
          <div className="logo-content flex items-center justify-center">
            <Image src={icon5} alt="inline-scroll-svg" width={10} height={10} className='logo-icon' />
          </div>
          <p className='text-sm font-medium text-[#fafafa]'>Shots</p>
        </div>
        <div className="logo-item inline-flex items-center justify-center gap-2">
          <div className="logo-content flex items-center justify-center">
            <Image src={icon6} alt="inline-scroll-svg" width={10} height={10} className='logo-icon' />
          </div>
          <p className='text-sm font-medium text-[#fafafa]'>Steak</p>
        </div>

      </div>
    </div>
  )
};

export default InlineInfiniteScroll