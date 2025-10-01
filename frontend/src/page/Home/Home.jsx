import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import AssetTable from './AssetTable'
import StockChart from './StockChart'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { DotIcon } from '@radix-ui/react-icons'
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
import Chatbot from '../Chatbox/Chatbot'
  

const Home = () => {
    const [category, setCategory] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const {coin, totalPages} = useSelector(store=>store)
    const {coinDetails} = useSelector((store)=>store.coin)

    const dispatch = useDispatch()

    const handleCategory = (value) => {
        setCategory(value)
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
        <div  className='flex items-center gap-4'>
            <Chatbot/>
        </div>
    </div>
  )
}

export default Home