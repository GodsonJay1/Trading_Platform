import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Cross1Icon } from '@radix-ui/react-icons'
import { MessageCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PromptMessage from './PromptMessage'
import ResponseMessage from './ResponseMessage'
import { API_BASE_URL } from '@/config/api'
import axios from 'axios'

const Chatbot = () => {
    const [isBotReleased, setIsBotReleased] = useState(false)
    const [responses, setResponses] = useState([]); 
    const [loading, setLoading] = useState(false)
    const {auth} = useSelector(store=>store)

    const handleFetchCoinDetails = async(prompt) => {
        setLoading(true)
        try{
            const {data} = await axios.post(`${API_BASE_URL}/ai/chat`,{prompt})
            const response = {message:data.message, role:"model"}
            
            setResponses((prev)=>[...prev, response])
            console.log("Success", data)
        } catch(error) {
            console.log("error", error)
        }
       setLoading(false)
    }

    const handleBotRelease = () => setIsBotReleased(!isBotReleased)

    const handleKeyPress = (e) => {
        if(e.key === "Enter"){
            const data = {message:e.target.value, role:"user"}
            setResponses((prev)=>[...prev, data])
            handleFetchCoinDetails(e.target.value)
        }
        
    }

  return (
    <>
        <section className='absolute bottom-5 right-5 z-40 flex flex-col 
        justify-end items-end gap-2'>
            {isBotReleased && 
            <div className='rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] 
            h-[70vh] bg-slate-800'>
                <div className='h-[13%] pl-3 border-b border-gray-700 flex gap-x-4 items-center'>
                    <img 
                    className='rounded-full w-12 h-12'
                    src='https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-1500x1000.jpg'
                    alt='' 
                    />
                    <div>
                    <h1 className='text-lg font-semibold'>Ai Chat Bot</h1>
                    
                    </div>
                    <Button 
                    className="ml-auto flex "
                    onClick={handleBotRelease}
                    variant="ghost" size="icon">
                        <Cross1Icon/>
                    </Button>
                </div>

                <div className='h-[76%]'>
                    {responses.length ? <div className='flex flex-col py-5 px-5 overflow-y-auto h-full scrollbar-hide'>
                        {
                            responses.map((item, index)=> 
                                item.role=="user" ?
                                <div className='self-end' key={index}>
                                    <PromptMessage message={item.message}/>
                                </div>
                            :<div className='self-start' key={index}>
                                <ResponseMessage message={item.message}/>
                            </div>
                            )
                        }
                        {loading && <p>fetching data from server...</p>}      
                    </div> : 
                    <div className='p-10 gap-5 h-full flex flex-col justify-center items-center'>
                        <p className='text-2xl font-bold'>Hi, {auth.user?.fullName}</p>
                        <p className='text-gray-500'>inquire about market data</p>
                    </div>}
                </div>
                <div className='h-[10%] border-t'>
                    <Input className="w-full h-full order-none outline-none"
                    placeholder="write prompt"
                    // onChange={(e)=>console.log(e.target.value)}
                    onKeyPress={handleKeyPress} />
                </div>
            
            </div>
            }
            <div className='relative w-[10rem] cursor-pointer group:'>
            <Button
            className="w-full h-[3rem] gap-2 items-center align-bottom"
            onClick={handleBotRelease}>
                <MessageCircle 
                size={80}
                className='fill-[#eeeef0] -rotate-90 stroke-none 
                group-hover:fill-[#3e1270]'/>
                <span className='text-2xl'>
                    Chat Box
                </span>
            </Button>
            </div>
        </section>
    </>
  )
}

export default Chatbot