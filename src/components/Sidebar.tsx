import { ChevronDown, History, ChevronUp, Clapperboard, Clock, Home, Library, PlaySquare, ListVideo, Repeat } from 'lucide-react'
import * as React from 'react'
import { ElementType, ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button, { buttonStyles } from './Button'
import {  subscriptions, playlists } from '../data/Data'



type SmallSidebarItemProps = {
    IconOrImgUrl: ElementType | string,
    title: string,
    url: string 

}

type LargeSidebarItemProps = {
    IconOrImgUrl: ElementType | string,
    title: string,
    url: string,
    isActive?: boolean
}

type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function SmallSidebarItems({ IconOrImgUrl, title, url }: SmallSidebarItemProps){
    return (
        <a 
            href={url} 
            className={twMerge(buttonStyles({ variant: "ghost" }), "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
            <IconOrImgUrl className="w-6 h-6"/>
            <div className='text-sm'>{title}</div>
        </a>
    )
}

function LargeSidebarSection({ 
    children, 
    title, 
    visibleItemCount = Number.POSITIVE_INFINITY,
 }: LargeSidebarSectionProps){
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = React.Children.toArray(children).flat()
    const showExpandedButton = childrenArray.length > visibleItemCount 
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown

    return <div>
        {title && <div className='ml-4 mt-2 text-lg mb-1'>{title}</div>}
        {visibleChildren}
        {showExpandedButton && 
            <Button 
            onClick={() => setIsExpanded(e => !e)}
            variant="ghost" className='w-full flex items-center rounded-lg gap-4 p-3'>
            <ButtonIcon className='w-6 h-6'/>
            <div>{isExpanded ? "Show less" : "Show More"}</div>
            </Button>
        }
    </div>
}

function LargeSidebarItem( { IconOrImgUrl, title, url, isActive }: LargeSidebarItemProps ){
    return(
        <a 
          href={url} 
          className={twMerge(
            buttonStyles({ variant: "ghost"}),
            `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? 'font-bold bg-neutral-100 hover:bg-secondary': undefined}`)}>
            
            {typeof IconOrImgUrl === "string" ? (
                <img src={IconOrImgUrl} className='w-6 h-6 rounded-full'/>
            ): (
                <div className={`whitespace-nowrap overflow-hidden text-ellipsis `}>
                {title}
            </div>
            
            )}
            <IconOrImgUrl className='w-6 h-6'/>

           
        </a>
    )
}


const Sidebar = () => {
  return (
    <>
        <aside className=' sticky top-0 overflow-y-auto  scrollbar-hidden pb-4 flex flex-col ml-1  lg:hidden'>
            <SmallSidebarItems IconOrImgUrl={Home} title="Home" url="/" />
            <SmallSidebarItems IconOrImgUrl={Repeat} title="Shorts" url="/" />
            <SmallSidebarItems IconOrImgUrl={Clapperboard} title="Subscriptions" url="/" />
            <SmallSidebarItems IconOrImgUrl={Library} title="Library" url="/" />
        </aside>

        <aside className='hidden lg:block w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col gap-2 px-2'>
            <LargeSidebarSection visibleItemCount={1}  >
                <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/"  />
                <LargeSidebarItem isActive IconOrImgUrl={Clapperboard} title="Home" url="/"  />
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection visibleItemCount={5}>
                <LargeSidebarItem 
                    IconOrImgUrl={Library}
                    title='Library'
                    url='/library'
                />
                <LargeSidebarItem 
                    IconOrImgUrl={History}
                    title='History'
                    url='/library'
                />
                <LargeSidebarItem 
                    IconOrImgUrl={PlaySquare}
                    title='Your Videos'
                    url='/library'
                />
                <LargeSidebarItem 
                    IconOrImgUrl={Clock}
                    title='Watch Later?'
                    url='/playlist?list-WL'
                />
                {playlists.map(playlist => (
                    <LargeSidebarItem 
                        key={playlist.id}
                        IconOrImgUrl={ListVideo}
                        title={playlist.name}
                        url={`/playlist?list-${playlist.id}`}
                    />
                ))}
            </LargeSidebarSection>
            <hr />
             <LargeSidebarSection 
                title='Subscriptions' 
            >
                {subscriptions.map(sub => 
                    (   
                        // <LargeSidebarItem 
                        //     key={sub.id}
                        //     IconOrImgUrl={sub.imgUrl}
                        //     title={sub.channelName}
                        //     url={`/@${sub.id}`}
                        // />
                    )
                )}
            </LargeSidebarSection>
        </aside>
    </>
  )
}

export default Sidebar