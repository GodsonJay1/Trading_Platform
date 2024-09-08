import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAllOrdersForUser } from '@/State/Order/Action'
import { calculateProfit } from '@/utils/calculateProfit'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Activity = () => {
    const dispatch = useDispatch()
    const {order} = useSelector(store=>store)

    useEffect(() => {
        dispatch(getAllOrdersForUser({jwt:localStorage.getItem("jwt")}))
    },[])

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        const formattedDate = date.toLocaleDateString('en-NG', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            timeZone: 'Africa/Lagos'
        })

        const formattedTime = date.toLocaleTimeString('en-NG', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Africa/Lagos'
        })
        return {formattedDate, formattedTime}
    }

  return (
    <div className='p-5 lg:p-20'>
        <h1 className='font-bold text-3xl pb-5'>Activity</h1>
        <Table className="border">
        <TableHeader>
            <TableRow>
            <TableHead className="py-5">
                Date & Time
            </TableHead>
            <TableHead>
                Trading Pair
            </TableHead>
            <TableHead>
                Buy Price
            </TableHead>
            <TableHead>
                Sell Price
            </TableHead>
            <TableHead>
                Order Type
            </TableHead>
            <TableHead>
                Profit/Loss
            </TableHead>
            <TableHead className="text-right">
                Value
            </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {order.orders.map((item, index) => {
            const {formattedDate, formattedTime} = formatTimestamp(item.timestamp)
            return (
                <TableRow key={index}>
                <TableCell>
                <p>{formattedDate}</p>
                <p className='text-gray-400'>{formattedTime}</p>
                </TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                    <Avatar className="-z-50">
                        <AvatarImage src={item.orderItem.coin.image}/>
                    </Avatar>
                    <span>{item.orderItem.coin.name}</span>
                </TableCell>
                <TableCell>${item.orderItem.buyPrice}</TableCell>
                <TableCell>${item.orderItem.sellPrice}</TableCell>
                <TableCell>{item.orderType}</TableCell>
                <TableCell>{calculateProfit(item)}</TableCell>
                <TableCell className="text-right">{item.price}</TableCell>
                </TableRow>
            )})}
        </TableBody>
        </Table>

    </div>
  )
}

export default Activity