import Image from 'next/image'
import './surrounding.css'
import surrounding1 from "@/public/images/environment1.jpg"
import surrounding2 from "@/public/images/environment2.jpg"
import surrounding3 from "@/public/images/environment3.jpg"
import surrounding4 from "@/public/images/environment4.jpg"

const Surroundings = () => {
  return (
    <section className="bg-background py-12 px-[8%]" id="portfolio">
        <div className="flex justify-between items-center gap-5 mb-20 px-7">
            <span className="text-4xl"><h1>our Environment</h1></span>
            <span className="max-w-3xl inline-block text-lg pr-20 pb-12">
                <p>All our projects are unique and designed to last. Take a look at our recent works to find it out for yourself.</p>
            </span>
        </div>

        <div className="grid md:grid-cols-2 auto-rows-auto gap-7">
            <div className="portfolio-carousel">
                <Image 
                    className="w-full h-auto"
                    alt='surroundings'
                    src={surrounding1}
                />
                <div><h2 className='text-foreground text-xl mt-5 mb-2'>swanson entertainment center</h2></div>
                <p className='text-base text-foreground'>2021, commercial, seattle</p>
            </div>
        
            <div className="portfolio-carousel">
                <Image 
                    className="w-full h-auto"
                    alt='surroundings'
                    src={surrounding2}
                />
                <div><h2>modern loft room</h2></div>
                <p>2020, residential, new york.</p>
            </div>

            <div className="portfolio-carousel">
                <Image 
                    className="w-full h-auto"
                    alt='surroundings'
                    src={surrounding3}
                />
                <div><h2>jane McMillan's house</h2></div>
                <p>2023, residential, atlanta</p>
            </div>

            <div className="portfolio-carousel">
                <Image 
                    className="w-full h-auto"
                    alt='surroundings'
                    src={surrounding4}
                />
                <div><h2>jane Millers house</h2></div>
                <p>2023, residential, atlanta</p>
            </div>
        </div>
    </section>
  )
}

export default Surroundings