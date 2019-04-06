function* range(start, end)
{
    while (1)
    {
        if(start >= end) start = -1
        yield ++start
    }
}

export default function() {
    let date = new Date;

    let hour = date.getHours()%12;
    let min = date.getMinutes();
    let sec = date.getSeconds();
    document.getElementsByClassName("clock")[0].innerHTML = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

    const secGen = range(sec, 59)
    const minGen = range(min, 59)
    const hourGen = range(hour, 11)



    setInterval(() => {
        if(sec == 59) 
        {
            if(min == 59) hour = hourGen.next().value

            min = minGen.next().value
        }
        sec = secGen.next().value


        document.getElementsByClassName("clock")[0].innerHTML = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }, 1000)
};