import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { withdrawalRequest } from '@/State/Withdrawal/Action'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const WithdrawalForm = () => {
  const [amount, setAmount] = useState("")
  const dispatch = useDispatch()
  const {wallet, withdrawal} = useSelector(store=>store)

  const handleChange = (e) => {
    setAmount(e.target.value)
  }

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
  }

  const handleSubmit = (e) => {
    dispatch(withdrawalRequest({amount,jwt:localStorage.getItem("jwt")}))
    console.log(amount)
  }

  const formatAccountNumber = (accountNumber) => {
    if (accountNumber && accountNumber.length > 4) {
      const maskedPart = '*'.repeat(accountNumber.length - 4)
      const visiblePart = accountNumber.slice(-4)
      return `${maskedPart}${visiblePart}`
    }
    return accountNumber;
  }

  return (
    <div className='pt-10 space-y-5'>
      <div className='flex justify-between items-center 
      rounded-md bg-slate-900 text-xl font-bold px-5 py-4'>
        <p>Available Balance</p>
        <p>${wallet.userWallet.balance}</p>
      </div>
      <div className='flex flex-col items-center'>
        <h1>Enter Withdrawal Amount</h1>
        <div className='flex items-center justify-center'>
          <Input
          onChange={handleChange}
          value={amount}
          className=" py-7 border-none outline-none 
          focus:outline-none px-0 text-2xl text-center"
          placeholder="$0.00"
          type="number"
          />
        </div>
      </div>
      <div className='pb-2'>
        <p>Transfer to</p>
        <div className='flex items-center gap-5 border px-5 py-2 rounded-md'>
          <img
          className='h-8 w-8'
          src='https://png.pngtree.com/png-vector/20190302/ourmid/pngtree-vector-bank-icon-png-image_735750.jpg' alt=''/>
          <div>
            <p className='text-xl font-bold'>{withdrawal.paymentDetails?.bankName}</p>
            <p className='text-xs'>{withdrawal.paymentDetails ? formatAccountNumber(withdrawal.paymentDetails?.accountNumber) : ''}</p>
          </div>
        </div>
      </div>
      <DialogClose className='w-full'>
      <Button
      onClick={handleSubmit}
      className="w-full py-7 text-xl">
        Withdraw
      </Button>
      </DialogClose>
    </div>
  )
}

export default WithdrawalForm