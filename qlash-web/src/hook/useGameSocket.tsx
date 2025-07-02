import { socket } from '@/utils/socket'
import { useEffect } from 'react'

const useGameSocket = (event: string, callback: (data: any) => void) => {
    useEffect(() => {
        socket.on(event, callback)

        return () => {
            socket.off(event, callback)
        }
    }, [event, callback])
}

export default useGameSocket