const LEADING_ZERO_FORMATTER = new Intl.NumberFormat(
    undefined, {
        minimumIntegerDigits: 2
    
    })


export function formatDuration(duration: number){
    //Converting seconds into hours 
    const hours = Math.floor(duration / 60 / 60)
    //converting hours back into seconds to subtract from the entirityof the duration...then div by 60 again to convert into minutes 
    const minutes = Math.floor((duration - hours * 60 * 60) / 60)
    //gives us the remainder of how many seconds there are left after moduling 
    const seconds = duration % 60

    if(hours > 0){
        return `${hours}:${LEADING_ZERO_FORMATTER.format(minutes)}:${LEADING_ZERO_FORMATTER.format(seconds)}`

    }
    return `${minutes}:${LEADING_ZERO_FORMATTER.format(seconds )}`

}   