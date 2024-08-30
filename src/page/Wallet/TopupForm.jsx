import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DotFilledIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'

const TopupForm = () => {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("PAYSTACK")

  const handleChange = (e) => {
    setAmount(e.target.value)
  }

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
  }

  const handleSubmit = () => {
    console.log(amount, paymentMethod)
  }

  return (
    <div className='pt-10 space-y-5'>
      <div>
        <h1 className='pb-1'>
          Enter Amount
        </h1>
        <Input 
        onChange={handleChange} 
        value={amount}
        className="py-7 text-lg"
        placeholder="$0.00"/>
      </div>
      <div>
        <h1 className='pb-1'>
          Select payment method
        </h1>
        <RadioGroup
        onValueChange={(value) => handlePaymentMethodChange(value)} 
        className="flex"
        defaultValue="PAYSTACK">
          <div className='flex items-center space-x-2 border p-3 px-5 rounded-md'>
            <RadioGroupItem
            icon={DotFilledIcon}
            className="h-9 w-9"
            value="PAYSTACK"
            id="r1"/>
            <Label htmlFor="r1">
              <div className='bg-white rounded-md px-5 py-2 w-32'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Paystack_Logo.png' alt=''/>
              </div>
            </Label>
          </div>

          <div className='flex items-center space-x-2 border p-3 px-5 rounded-md'>
            <RadioGroupItem
            icon={DotFilledIcon}
            className="h-9 w-9"
            value="STRIPE"
            id="r2"/>
            <Label htmlFor="r2">
              <div className='bg-white rounded-md px-9 py-1 w-32'>
                <img 
                className='h-6'
                src='https://seeklogo.com/images/S/stripe-logo-C409DC9652-seeklogo.com.png' alt=''/>
              </div>
            </Label>
          </div>
        </RadioGroup>
        <Button
        onClick={handleSubmit}
        className='w-full py-7 mt-5'>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default TopupForm