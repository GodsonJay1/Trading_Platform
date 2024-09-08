import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import AssetTable from './AssetTable'
import StockChart from './StockChart'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Cross1Icon, DotIcon } from '@radix-ui/react-icons'
import { MessageCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { getCoinList, getTop50CoinList } from '@/State/Coin/Action'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from '@/components/ui/pagination'
  

const Home = () => {
    const [category, setCategory] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [inputValue, setInputValue] = useState("")
    const [isBotReleased, setIsBotReleased] = useState(false)
    const {coin, totalPages} = useSelector(store=>store)
    const {coinDetails} = useSelector((store)=>store.coin)

    const dispatch = useDispatch()

    const handleBotRelease = () => setIsBotReleased(!isBotReleased)

    const handleCategory = (value) => {
        setCategory(value)
    }

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleKeyPress = (event) => {
        if(event.key == "Enter"){
            console.log(inputValue)
        }
        setInputValue("")
    }

    useEffect(() => {
        dispatch(getTop50CoinList())
    },[category])

    useEffect(() => {
        dispatch(getCoinList(currentPage))
    },[currentPage])

    const handlePageChange = (newPage) => {
        if (newPage >= 1){
            setCurrentPage(newPage)
        }
    }


  return (
    <div className='relative'>
        <div className='lg:flex'>
            <div className='lg:w-[50%] lg:border-r'>
                <div className='p-1 flex items-center gap-4'>
                    <Button onClick={() => handleCategory("all")} 
                    variant={category == "all" ? "default" : "outline"} 
                    className="rounded-full">
                        All
                    </Button>

                    <Button onClick={() => handleCategory("top50")} 
                    variant={category == "top50" ? "default" : "outline"} 
                    className="rounded-full">
                        Top 50
                    </Button>

                    <Button onClick={() => handleCategory("topGainers")} 
                    variant={category == "topGainers" ? "default" : "outline"} 
                    className="rounded-full">
                        Top Gainers
                    </Button>

                    <Button onClick={() => handleCategory("topLosers")} 
                    variant={category=="topLosers"?"default":"outline"} 
                    className="rounded-full">
                        Top Losers
                    </Button>
                </div>
                <AssetTable coin={category=="all"?coin.coinList:coin.top50} category={category}/>
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                            <PaginationPrevious 
                            href="#" 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            />
                            </PaginationItem>
                            {currentPage > 1 && (
                                <PaginationItem>
                                <PaginationLink 
                                href="#"
                                onClick={() => handlePageChange(currentPage -1)}> 
                                    {currentPage - 1}
                                </PaginationLink>
                                </PaginationItem>
                            )}
                            <PaginationItem>
                            <PaginationLink 
                            href="#"
                            className='active'> 
                                {currentPage}
                            </PaginationLink>
                            </PaginationItem>
                            {currentPage < totalPages && (
                                <PaginationItem>
                                <PaginationLink 
                                href="#"
                                onClick={handlePageChange(currentPage + 1)}> 
                                    {currentPage + 1}
                                </PaginationLink>
                                </PaginationItem>
                            )}
                            {currentPage < totalPages -1 && (
                                <PaginationItem>
                                <PaginationEllipsis />
                                </PaginationItem>
                            )}
                            <PaginationItem>
                            <PaginationNext href="#"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                             />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                </div>
            </div>
            <div className='hidden lg:block lg:w-[50%] p-2'>
                <StockChart coinId={"bitcoin"}/>
                <div className='flex gap-5 items-center'>
                    <div>
                        <Avatar>
                            <AvatarImage src={coinDetails?.image.large}/>
                        </Avatar>
                    </div>
                    <div>
                        <div className='flex items-center gap-2'>
                            <p>{coinDetails?.symbol.toUpperCase()}</p>
                            <DotIcon className='text-gray-400'/>
                            <p className='text-gray-400'>{coinDetails?.name}</p>
                        </div>
                        <div className='flex items-end gap-2'>
                            <p className='text-xl font-bold'>
                                ${coinDetails?.market_data.current_price.usd}
                            </p>
                            <p className='text-red-600'>
                                <span>{coinDetails?.market_data.market_cap_change_24h}</span>
                                <span>({coinDetails?.market_data.market_cap_change_percentage_24h}%)</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section className='absolute bottom-5 right-5 z-40 flex flex-col 
        justify-end items-end gap-2'>
            {isBotReleased && 
            <div className='rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] 
            h-[70vh] bg-slate-800'>
                <div className='flex justify-between items-center border-b px-6 h-[12%]'>
                    <p>Chat Bot</p>
                    <Button 
                    onClick={handleBotRelease}
                    variant="ghost" size="icon">
                        <Cross1Icon/>
                    </Button>
                </div>

                <div className='h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container scrollbar-hide'>
                    <div className='self-start pb-5 w-auto'>
                    <div className='justify-end self-end px-5 py-2 rounded-md bg-slate-600 w-auto'>
                        <p>Hi, Jay</p>
                        <p>You can ask crypto related questions</p>
                        <p>like, price, market cap extra...</p>
                    </div>
                    </div>

                    {
                        [1,1,1,1].map((item, i)=> (
                            <div
                            key={i} 
                            className={`${
                            i%2==0 ? "self-start": "self-end"} "pb-5 w-auto'`}>
                            {i%2==0?
                            <div className='justify-end self-end px-5 py-2 rounded-md bg-slate-600 w-auto'>
                                <p>prompt who are you?</p>
                            </div> :
                            <div className='justify-end self-end px-5 py-2 rounded-md bg-slate-600 w-auto'>
                                <p>ans Hi, I'm Jay</p>
                            </div>}
                            </div>
                        ))
                    }      
                </div>
                <div className='h-[12%] border-t'>
                    <Input className="w-full h-full order-none outline-none"
                    placeholder="write prompt"
                    onChange={handleChange}
                    value={inputValue}
                    onKeyPress={handleKeyPress} />
                </div>
            
            </div>
            }
            <div className='relative w-[10rem] cursor-pointer group:'>
            <Button 
            className="w-full h-[3rem] gap-2 items-center align-bottom"
            onClick={handleBotRelease}>
                <MessageCircle 
                size={80}
                className='fill-[#eeeef0] -rotate-90 stroke-none 
                group-hover:fill-[#3e1270]'/>
                <span className='text-2xl'>
                    Chat Box
                </span>
            </Button>
            </div>
        </section>
    </div>
  )
}

export default Home