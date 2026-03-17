

export const toPercent = (count: number, total:number) =>{
    if(total === 0) 
        return "0%"
    const percent= Math.round(count/ total * 100);
    return `${percent}%`

}