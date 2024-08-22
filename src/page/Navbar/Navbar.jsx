import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { DragHandleHorizontalIcon } from '@radix-ui/react-icons'
import React from 'react'

const Navbar = () => {
  return (
    <div className='px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky 
    top-0 left-0 right-0 flex justify-between items-center'>

        <div className='flex items-center gap-3'>
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
                    <DragHandleHorizontalIcon className='h-7 w-7'/>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-72 border-r-0 flex flex-col justify-center" 
            side="left" >
                <SheetHeader>
                <SheetTitle>
                    <div className='text-3xl flex justify-center items-center gap-1'>
                        <Avatar>
                            <AvatarImage className='rounded' src='https://cdn.pixabay.com/photo/2018/05/20/06/14/cryptocurrency-3415066_1280.jpg'/>
                        </Avatar>
                        <div>
                            <span className='font-bold text-yellow-700'>Trust</span>
                            <span>Trading</span>
                        </div>
                    </div>
                </SheetTitle>
                </SheetHeader>
            </SheetContent>
        </Sheet>

        </div>

    </div>
  )
}

export default Navbar