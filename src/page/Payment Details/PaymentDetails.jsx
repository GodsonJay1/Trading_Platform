import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import PaymentDetailsForm from "./PaymentDetailsForm"
import { Button } from "@/components/ui/button"

const PaymentDetails = () => {
  return (
    <div className="px-20">
      <h1 className="text-3xl font-bold py-10">
        Payment Details
      </h1>

      {false ? (
      <Card>
        <CardHeader>
          <CardTitle>
            Trust Bank
          </CardTitle>
          <CardDescription>
            A/C No :  
            *********1654
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <p className="w-32">A/C Holder :</p>
            <p className="text-gray-400">Code with jay</p>
          </div>
          <div className="flex items-center">
            <p className="w-32">IFSC :</p>
            <p className="text-gray-400"> TRT5773473</p>
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