import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getWithdrawalHistory } from '@/State/Withdrawal/Action'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Withdrawal = () => {
  const dispatch = useDispatch()
  const {wallet, withdrawal} = useSelector(store=>store)

  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")))
  },[])

  return (
    <div className='p-5 lg:p-20'>
      <h1 className='font-bold text-3xl pb-5'>Withdrawals</h1>
      <Table className="border">
      <TableHeader>
          <TableRow>
          <TableHead className="py-5">
              Date
          </TableHead>
          <TableHead>
              Method
          </TableHead>
          <TableHead>
              Amount
          </TableHead>
          <TableHead className="text-right">
              Status
          </TableHead>
          </TableRow>
      </TableHeader>
      <TableBody>
          {withdrawal.history.map((item, index) => 
          <TableRow key={index}>
          <TableCell>
            <p>{item.date.toString()}</p>
          </TableCell>
          <TableCell>Bank</TableCell>
          <TableCell>${item.amount}</TableCell>
          <TableCell className="text-right">{item.status}</TableCell>
          </TableRow>)}
      </TableBody>
      </Table>

    </div>
  )
}

export default Withdrawal