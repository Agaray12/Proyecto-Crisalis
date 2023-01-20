import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../global/Header";
import Fab from "@mui/material/Fab";
import { useTheme } from "@mui/material";
import UserActions from '../Clients/userActions';
import { useLocalState } from "../../../util/useLocalStorage";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { productColumns } from "../Clients/columns";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Goods = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [goods, setGoods] = useState([]);

  const [jwt, setJwt] = useLocalState("", "jwt");

    useEffect(() => {
        axios.get("api/goods/get-all", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        })
        .then((res) => {
            if(res.status === 200){
                setGoods(res.data)
            }
            else
                return Promise.reject("Invalid");
        })
        .catch((err) => {
            console.log(err);
        })
    }, [jwt]);
   

  return (
    <Box m="20px">
      <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        BIENES
      </Typography>
      </Box>
      <Fab onClick={()=>{window.location.href="/goods/create"}}>
          <AddCircleIcon/>
        </Fab>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },

        }}
      >
        <DataGrid
          key={goods.map((good) => good.id)}
          pageSize={10}
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          rows={goods}
          columns={productColumns}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 250 },
            },
          }}
        />
      </Box>
    </Box>

  );
};

export default Goods;
