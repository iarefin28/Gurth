import { React, useState, useEffect } from 'react'

/**This DateTime component returns a date and time which
 * updates in real time every half minute. 
 */


var DateTime = () =>
{
    const [showDate, setShowDate] = useState(new Date());
    useEffect(() => {
        setInterval(() => setShowDate(new Date()), 1000);
    }, []);


    //var showDate = new Date();
    //var displayTodaysDate = (showDate.getMonth()+1)+'/'+showDate.getDate()+'/'+showDate.getFullYear();
    var displayTodaysDate = showDate.toDateString();
    var displayTime = showDate.getHours()+':'+showDate.getMinutes()+':'+showDate.getSeconds();
    return(
        <div id="clock">
            <div id="clock-contents">
                {displayTodaysDate} <br/>
                {displayTime}
            </div>
        </div>
    )
}

export default DateTime;