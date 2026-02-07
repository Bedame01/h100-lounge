import Image from 'next/image';
import './slider.css'

import image1 from '@/public/images/slide1.png';
import image2 from '@/public/images/slide2.jpg';
import image3 from '@/public/images/slide3.jpg';
import image4 from '@/public/images/Golden Luxe Lounge.png';
// import image5 from '@/public/images/e.png';
// import image6 from '@/public/images/f.png';


const Slider = () => {
  return (
    <div className="scroll-container w-[90%] md:w-[65%] lg:w-[80%] overflow-hidden whitespace-nowrap relative flex items-center mx-auto pt-5 pb-8">
      <div className="scroll-content flex items-center sm:gap-5">

        <div className="scroll-item-container inline-flex items-center justify-center">
          <div className="scroll-item flex items-center md:size-55!"><Image src={image1} alt="image" className='item-image size-fit object-cover' /></div>
        </div>
        <div className="scroll-item-container inline-flex items-center justify-center">
          <div className="scroll-item flex items-center md:size-55!"><Image src={image2} alt="image" className='item-image size-fit object-cover' /></div>
        </div>
        <div className="scroll-item-container inline-flex items-center justify-center">
          <div className="scroll-item flex items-center w-70! md:w-90! md:size-55!"><Image src={image3} alt="image" className='item-image size-fit object-cover' /></div>
        </div>
        <div className="scroll-item-container inline-flex items-center justify-center">
          <div className="scroll-item flex items-center md:size-55!"><Image src={image4} alt="image" className='item-image size-fit object-cover' /></div>
        </div>
        <div className="scroll-item-container inline-flex items-center justify-center">
          <div className="scroll-item flex items-center md:size-55!"><Image src={image1} alt="image" className='item-image size-fit object-cover' /></div>
        </div>
        <div className="scroll-item-container inline-flex items-center justify-center">
          <div className="scroll-item flex items-center md:size-55!"><Image src={image2} alt="image" className='item-image size-fit object-cover' /></div>
        </div>
        <div className="scroll-item-container inline-flex items-center justify-center">
          <div className="scroll-item flex items-center w-70! md:w-70! md:size-55!"><Image src={image3} alt="image" className='item-image size-fit object-cover' /></div>
        </div>
        <div className="scroll-item-container inline-flex items-center justify-center">
          <div className="scroll-item flex items-center md:size-55!"><Image src={image4} alt="image" className='item-image size-fit object-cover' /></div>
        </div>
 

      </div>
    </div>
  )
};

export default Slider