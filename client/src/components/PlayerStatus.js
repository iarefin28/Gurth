import { React, useState, useEffect } from 'react'

/** Player status, includes the players name, job, title, hp, willpower, and energy... 
 * hp component corresponds to the users mood 
 * willpower corresponds to the users willingness to start an activity
 * energy corresponds to the users energy levels 
 */


var PlayerStatus = () =>
{
    return(
        <div id="player-info">
            Name: Ishan Arefin <br/>
            Job: Student <br/>
            Title: The Eternal Learner <br/><br/>
            HP: 100 <br/>
            Energy: 100 <br/>
            Willpower: 100 <br/>
        </div>
    )
}

export default PlayerStatus;