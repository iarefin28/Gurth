import * as React from 'react';
import { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DateTime from './DateTime.js'
import PlayerStatus from './PlayerStatus.js';
import PlayerSkills from './PlayerSkills.js';
import AuthContext from '../auth/index.js';
import { GlobalStoreContext } from '../store'

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BackpackIcon from '@mui/icons-material/Backpack';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WorkIcon from '@mui/icons-material/Work';
import CheckIcon from '@mui/icons-material/Check';
import LockIcon from '@mui/icons-material/Lock';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';

import { useHistory } from 'react-router-dom';

const drawerWidth = 450;

export default function ToDoList() {
	const history = useHistory();
	const {auth} = useContext(AuthContext);
  	const {store} = useContext(GlobalStoreContext);

    /**Technically player skills only change on completion or deletion of a quest. 
	 * So setting the store.QUESTS to the dependency value for the useEffect does the job. Although, 
	 * not sure why putting store.SKILLS causes an infinite loop. 
	 */
	useEffect( () => {store.retrieveAllUserEvents()}, []) 

  return (
    <Box sx={{ display: 'flex' }}>
      hi
    </Box>
  );
}