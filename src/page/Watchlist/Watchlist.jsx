import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import React from 'react'

const Watchlist = () => {
    const handleRemoveFromWatchlist = (value) => {
        console.log(value)
    }

  return (
    <div className='p-5 lg:p-20'>
        <h1 className='font-bold text-3xl pb-5'>Watchlist</h1>
        <Table className="border">
        <TableHeader>
            <TableRow>
            <TableHead className="py-5">
                Coin
            </TableHead>
            <TableHead>
                Symbol
            </TableHead>
            <TableHead>
                Volume
            </TableHead>
            <TableHead>
                Market Cap
            </TableHead>
            <TableHead>
                24h
            </TableHead>
            <TableHead>
                Price
            </TableHead>
            <TableHead className="text-right text-red-600">
                Remove
            </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {[1,1,1,1,1,1,1,1,1].map((item, index) => 
            <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                    <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"/>
                </Avatar>
                <span>Bitcoin</span>
            </TableCell>
            <TableCell>BTC</TableCell>
            <TableCell>23727860515</TableCell>
            <TableCell>1210450425291</TableCell>
            <TableCell>0.60153</TableCell>
            <TableCell>$61304.00</TableCell>
            <TableCell className="text-right">
                <Button variant="ghost" onClick={()=>handleRemoveFromWatchlist(item.id)} size="icon" className="h-10 w-10">
                    <BookmarkFilledIcon className='w-6 h-6'/>
                </Button>
            </TableCell>
            </TableRow>)}
        </TableBody>
        </Table>

    </div>
  )
}

export default Watchlist