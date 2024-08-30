import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const timeSeries = [
    {
        keyword: "DIGITAL_CURRENCY_DAILY",
        key: "Time Series (Daily)",
        label: "1 Day",
        value: 1
    },
    {
        keyword: "DIGITAL_CURRENCY_WEEKLY",
        key: "Weekly Time Series",
        label: "1 Week",
        value: 7
    },
    {
        keyword: "DIGITAL_CURRENCY_MONTHLY",
        key: "Monthly Time Series",
        label: "1 Month",
        value: 30
    },
] 

const StockChart = () => {
    const [activeLabel, setActiveLabel] = useState("1 Day")
    const series = [
        {
            data:[
            [1721817229151, 66396.0486972638],
            [1721820694766, 66467.5423812481],
            [1721823505633, 66438.9552541241],
            [1721827020022, 66476.1027649272],
            [1721831064388, 66795.0972939723],
            [1721834932865, 66190.2010907012],
            [1721839127475, 66348.1297190039],
            [1721842093989, 66549.4764342713],
            [1721846256061, 66154.4474437184],
            [1721849755149, 66061.7345866184],
            [1721852792907, 65945.5876284475],
            [1721857053113, 65418.7974059695],
            [1721859099814, 65507.312779842],
            [1721862198379, 65266.9851640871],
            [1721865655709, 65403.5351302253],
            [1721871441631, 64333.6299565311],
            [1721873178524, 64288.058929939],
            [1721876734795, 64247.2130973403],
            [1721880162081, 64047.1759582433],
            [1721884369518, 64281.4399900673],
            [1721889437278, 64119.1981185294],
            [1721893109490, 64303.8781696307],
            [1721894729814, 64148.4727423302],
            [1721898943133, 64337.6091452305],
            [1721903292889, 64022.6655456513],
            [1721906857211, 64229.6289570364],
            [1721911127903, 64256.4412085477],
            [1721913467270, 64064.1929594326],
            [1721918168876, 64321.9065146895],
            [1721920860374, 64989.8651202757],
            [1721924034270, 64671.9825824998],
            [1721927634564, 65016.8566110603],
            [1721932693239, 64929.345488137],
            [1721936263185, 64980.2509222104]
        ],
        },
    ]

    const options = {
        chart:{
            id:"area-datetime",
            type:"area",
            height:350,
            zoom:{
                autoScaleYaxis:true
            },
        },
        dataLabels:{
            enabled:false
        },
        xaxis:{
            type:"datetime",
            tickAmount:6
        },
        colors:["#758AA2"],
        markers:{
            colors:["#fff"],
            strokeColor:"#fff",
            size:0,
            strokeWidth:1,
            style:"hollow",
        },
        tooltip:{
            theme:"dark",
        },
        fill:{
            type:"gradient",
            gradient:{
                shadeIntensity:1,
                opacityFrom:0.7,
                opacityTo:0.9,
                stops:[0,100]
            },
        },
        grid:{
            borderColor:"#47535E",
            strokeDashArray:4,
            show:true,
        },

    }

    const handleActiveLabel=(value) =>{
        setActiveLabel(value)
    }

  return (
    <div>
        <div className='space-x-2'>
            {timeSeries.map((item)=>
            <Button 
            variant={activeLabel==item.label?"":"outline"}
            onClick={()=>handleActiveLabel(item.label)}
            key={item.label}>
                {item.label}
            </Button>
            )}
        </div>
        <div id='chart-timelines'>
            <ReactApexChart
            options={options}
            series={series}
            height={450}
            type='area'
            />
        </div>
    </div>
  )
}

export default StockChart