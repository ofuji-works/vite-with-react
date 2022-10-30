import dayjs, {Dayjs} from "dayjs"

export type {Dayjs}

const getCurrentTime = () => {
    return dayjs()
}

export {dayjs, getCurrentTime}