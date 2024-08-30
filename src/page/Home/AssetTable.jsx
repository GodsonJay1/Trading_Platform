import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AssetTable = () => {

    const navigate=useNavigate()

  return (
    <Table>
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
            <TableHead className="text-right">
                Price
            </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {[1,1,1,1,1,1,1,1,1].map((item, index) => 
            <TableRow key={index}>
            <TableCell 
            onClick={()=>navigate(`/market/bitcoin`)}
            className="font-medium flex items-center gap-2">
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

  )
}

export default AssetTable