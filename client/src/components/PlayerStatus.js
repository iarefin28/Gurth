import { React, useState, useEffect } from 'react'

/** Player status, includes the players name, job, title, hp, willpower, and energy... 
 * hp component corresponds to the users mood 
 * willpower corresponds to the users willingness to start an activity
 * energy corresponds to the users energy levels 
 */


var PlayerStatus = () =>
{
    const todaysDate = new Date(); 
    const diff = 3339460800000 - todaysDate.getTime();
    const diffInDays = Math.ceil(diff / (1000*3600*24));

    return(
        <div id="player-info">
            Name: Ishan Arefin <br/>
            Job: Student <br/>
            Title: The Quadfather <br/><br/>
            HP: 100 <br/>
            Energy: 100 <br/>
            Willpower: 100 <br/><br/>
            Time remaining: {diffInDays} days<br/>
        </div>

        
    )
}

export default PlayerStatus;