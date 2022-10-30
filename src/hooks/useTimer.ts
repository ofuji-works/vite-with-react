import {useEffect, useCallback, useState} from "react"
import { getCurrentTime, Dayjs } from "../utils"

export const useTimer = (duration: number) => {
    const [time, setTime] = useState<number>(0);
    const [timerId, setTimerId] = useState<number>()
    const [intervalId, setIntervalId] = useState<number>(duration);

    useEffect(() => {
        setTime(_getTime(duration))
    }, [duration])

    const start = useCallback((startTime: Dayjs) => {
        _countTime(startTime, duration)
    }, [duration])

    const unpause = useCallback((startTime: Dayjs) => {
        _countTime(startTime, time)
    }, [time])

    const pause = useCallback(() => {
        if (timerId) {
            clearInterval(intervalId);
            clearTimeout(timerId)
        }
    }, [timerId])

    const _countTime = (startTime: Dayjs, time: number) => {
        const id = setInterval(() => {
            setTime(_getTime(time, startTime))
        }, 1000);
        setIntervalId(id)

        setTimerId(setTimeout(() => {
            clearInterval(id)
        }, time))
    }

    const _getTime= (duration: number, startTime?: Dayjs) => {
        if (!startTime) {
            return duration
        }
        return Math.max(duration + (startTime.diff(getCurrentTime())), 0)
    }

    return {time, start, pause, unpause}
}

export const format = (number: number) => {
    const second = Math.round(number / 1000)
    return `${Math.floor(second / 60)}`.padStart(2, "0") + ":" + `${second % 60}`.padStart(2, "0")
}