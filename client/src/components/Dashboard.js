import * as React from 'react';
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

import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BackpackIcon from '@mui/icons-material/Backpack';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WorkIcon from '@mui/icons-material/Work';
import CheckIcon from '@mui/icons-material/Check';
import LockIcon from '@mui/icons-material/Lock';
import MenuBookIcon from '@mui/icons-material/MenuBook';


import { useHistory } from 'react-router-dom';

const drawerWidth = 450;

export default function Dashboard() {
  const history = useHistory();

    function handleLoadQuests(event) {
        history.push("/quests");
    }

    function handleLoadHome(event) {
      history.push("/");
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundImage: "linear-gradient(#d07a82, #dcae6d)", 
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <DateTime/>
        <Divider/>
        <PlayerStatus/>
        <Divider/>
        <PlayerSkills/>
        <Divider />

        <IconButton color="secondary" onClick={handleLoadHome}>
            <HomeIcon></HomeIcon>
        </IconButton>
        <IconButton color="secondary" onClick={handleLoadQuests}>
            <AssignmentIcon></AssignmentIcon>
        </IconButton>
        <IconButton color="secondary" disabled="true">
            <BackpackIcon></BackpackIcon>
        </IconButton>
        <IconButton color="secondary" disabled="true">
            <FitnessCenterIcon></FitnessCenterIcon>
        </IconButton>
        <IconButton color="secondary" disabled="true">
            <WorkIcon></WorkIcon>
        </IconButton>
        <IconButton color="secondary" disabled="true">
            <CheckIcon></CheckIcon>
        </IconButton>
        <IconButton color="secondary" disabled="true">
            <LockIcon></LockIcon>
        </IconButton>
      </Drawer>
    </Box>
  );
}