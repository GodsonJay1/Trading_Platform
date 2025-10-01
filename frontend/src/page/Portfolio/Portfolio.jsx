import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getUserAssets } from '@/State/Asset/Action'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Portfolio = () => {
    const dispatch = useDispatch()
    const {asset} = useSelector(store=>store)

    useEffect(() => {
        dispatch(getUserAssets(localStorage.getItem("jwt")))
    },[])
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
            {asset.userAssets.map((item, index) => 
            <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                    <AvatarImage src={item.coin.image}/>
                </Avatar>
                <span>{item.coin.name}</span>
            </TableCell>
            <TableCell>{item.coin.symbol.toUpperCase()}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.coin.price_change_24h}</TableCell>
            <TableCell>{item.coin.price_change_percentage_24h}</TableCell>
            <TableCell className="text-right">{item.coin.total_volume}</TableCell>
            </TableRow>)}
        </TableBody>
    </Table>
    </div>
  )
}

export default Portfolio