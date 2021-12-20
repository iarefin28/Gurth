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
    var displayTime;
    

    if(showDate.getHours() > 12){
        displayTime = (showDate.getHours()-12)+':'+showDate.getMinutes() + "PM " + showDate.getSeconds();
        if(showDate.getMinutes() < 10){
            displayTime = (showDate.getHours()-12)+':0'+showDate.getMinutes() + "PM " + showDate.getSeconds();
        }
    }
    else if(showDate.getHours() == 0){
        displayTime = (12)+':'+showDate.getMinutes() + "AM " + showDate.getSeconds();
        if(showDate.getMinutes() < 10){
            displayTime = (12)+':0'+showDate.getMinutes() + "AM " + showDate.getSeconds();
        }
    }
    else{
        displayTime = showDate.getHours()+':'+showDate.getMinutes() + "AM " + showDate.getSeconds();
        if(showDate.getMinutes() < 10){
            displayTime = (showDate.getHours()-12)+':0'+showDate.getMinutes() + "PM " + showDate.getSeconds();
        }
    }

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