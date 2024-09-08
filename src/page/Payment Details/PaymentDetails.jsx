import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import PaymentDetailsForm from "./PaymentDetailsForm"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getPaymentDetails } from "@/State/Withdrawal/Action"

const PaymentDetails = () => {
  const {withdrawal} = useSelector(store=>store)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPaymentDetails({jwt:localStorage.getItem("jwt")}))
  },[])

  const formatAccountNumber = (accountNumber) => {
    if (accountNumber && accountNumber.length > 4) {
      const maskedPart = '*'.repeat(accountNumber.length - 4)
      const visiblePart = accountNumber.slice(-4)
      return `${maskedPart}${visiblePart}`
    }
    return accountNumber;
  }
  return (
    <div className="px-20">
      <h1 className="text-3xl font-bold py-10">
        Payment Details
      </h1>

      {withdrawal.paymentDetails ? (
      <Card>
        <CardHeader>
          <CardTitle>
          {withdrawal.paymentDetails?.bankName}
          </CardTitle>
          <CardDescription>
            A/C No :  {withdrawal.paymentDetails ? formatAccountNumber(withdrawal.paymentDetails?.accountNumber) : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <p className="w-32">A/C Holder :</p>
            <p className="text-gray-400">{withdrawal.paymentDetails?.accountHolderName}</p>
          </div>
          <div className="flex items-center">
            <p className="w-32">IFSC :</p>
            <p className="text-gray-400">{withdrawal.paymentDetails?.ifsc}</p>
          </div>
        </CardContent>
      </Card>) : (
        <Dialog>
        <DialogTrigger>
          <Button className="mt-3 py-6">Add Payment Details</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          <PaymentDetailsForm/>
        </DialogContent>
      </Dialog>)}

    </div>
  )
}

export default PaymentDetails