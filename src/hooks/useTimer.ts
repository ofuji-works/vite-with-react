import {useEffect, useCallback, useState} from "react"
import { getCurrentTime, Dayjs } from "../utils"

type Return = {
    time: number
    start: (startTime: Dayjs) => void
    pause: () => void
    unpause: (startTime: Dayjs) => void
  }
  
  export const useTimer = (duration: number): Return => {
    const [time, setTime] = useState<number>(0)
    const [timerId, setTimerId] = useState<number>()
    const [intervalId, setIntervalId] = useState<number>(duration)
  
    useEffect(() => {
      setTime(_getTime(duration))
    }, [duration])
  
    const _getTime = (duration: number, startTime?: Dayjs): number => {
      if (startTime == null) {
        return duration
      }
      return Math.max(duration + startTime.diff(getCurrentTime()), 0)
    }
  
    const _countTime = useCallback((startTime: Dayjs, time: number) => {
      const id = setInterval(() => {
        setTime(_getTime(time, startTime))
      }, 1000)
      setIntervalId(id)
  
      setTimerId(
        setTimeout(() => {
          clearInterval(id)
        }, time)
      )
    }, [])
  
    const start = useCallback(
      (startTime: Dayjs) => {
        _countTime(startTime, duration)
      },
      [duration, _countTime]
    )
  
    const unpause = useCallback(
      (startTime: Dayjs) => {
        _countTime(startTime, time)
      },
      [time, _countTime]
    )
  
    const pause = useCallback(() => {
      if (timerId !== undefined) {
        clearInterval(intervalId)
        clearTimeout(timerId)
      }
    }, [timerId, intervalId])
  
    return { time, start, pause, unpause }
  }
  
  export const format = (number: number): string => {
    const second = Math.round(number / 1000)
    return (
      `${Math.floor(second / 60)}`.padStart(2, '0') +
      ':' +
      `${second % 60}`.padStart(2, '0')
    )
  }
  