import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const Portfolio = () => {
  return (
    <div className='p-5 lg:p-20'>
        <h1 className='font-bold text-3xl pb-5'>Portfolio</h1>
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="py-5">
                Asset
            </TableHead>
            <TableHead>
                Price
            </TableHead>
            <TableHead>
                Unit
            </TableHead>
            <TableHead>
                Change
            </TableHead>
            <TableHead>
                Change %
            </TableHead>
            <TableHead className="text-right">
                Volume
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
            <TableCell className="text-right">$61304.00</TableCell>
            </TableRow>)}
        </TableBody>
    </Table>
    </div>
  )
}

export default Portfolio