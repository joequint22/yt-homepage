import { useState } from 'react'
import logo from '../assets/yt-logo.png'
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react"
import Button from './Button'


const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false)
 
  return (
    <div className='flex gap-10 lg:gap-20 pt-2 mb-6 mx-4 justify-between'>
        <div className= {`${ showFullWidthSearch ? 'hidden': 'flex'} gap-4 items-center flex-shrink-0`}>
            <Button size="icon">
                <Menu />
            </Button>
            <a href="/">
                <img src={logo} alt="logo" className='h-8'/> 
            </a>
        </div>
        <form className={`md:flex gap-4 flex-grow justify-center ${showFullWidthSearch ? "flex": 'hidden'}`} action="">

         {showFullWidthSearch && <Button onClick={() => setShowFullWidthSearch(false)} type="button" variant='ghost' size="icon" className='flex-shrink-0'>
            <ArrowLeft />
          </Button>}
          
          <div className='flex flex-grow max-w-[600px]'>
              <input type="search" placeholder="Search..." className=" rounded-l-full border border-secondary-border shadow-inner focus:border-blue-500 outline-none shadow-secondary py-1 text-lg w-full px-4"/>
              
            <Button className='py-2 px-4 rounded-r-full border-secondary-border border border-1-0 flex-shrink '>
              <Search />
            </Button>
          </div>
       
          <Button type="button" size="icon" className='flex-shrink-0'>
            <Mic />
          </Button>
        </form>
        <div className={`${ showFullWidthSearch ? 'hidden': 'flex'} flex-shrink-0 gap-2 md:gap-2`}>
          <Button onClick={ () => setShowFullWidthSearch(true)} size="icon" className="md:hidden" variant="ghost">
            <Search />
          </Button>
          <Button type='button' size="icon" className="md:hidden" variant="ghost">
            <Mic />
          </Button>
          <Button size="icon" variant="ghost">
            <Upload />
          </Button>
          <Button size="icon" variant="ghost">
            <Bell />
          </Button>
          <Button size="icon" variant="ghost">
            <User />
          </Button>
        </div>
    </div>
  )
}

export default PageHeader