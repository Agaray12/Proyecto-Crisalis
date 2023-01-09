import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Box, Fab, useTheme, MenuItem } from '@mui/material';
import { tokens } from "../../../theme";

const UserActions = (values) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
  return (
    <Box 
    sx={{
        m:1,
        position:'relative'
    }}
    >
        <Fab
            sx={{
                width:40,
                height:40,
                bgcolor: colors.primary[400],
                color: colors.grey[100],
                ":hover": {
                    bgcolor: colors.grey[100],
                    color: colors.grey[900],}
            }}
            
            onClick={()=> {
                console.log(values);
               // window.location.href=`http://localhost:3000/edit/${values.row.email}`
                //<Link to={`http://localhost:3000/edit/${values.row.email}`}/>
            }}
        >
            <EditIcon />
        </Fab>
    </Box>
  )
}

export default UserActions