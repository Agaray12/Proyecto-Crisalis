import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../global/Header";
import { useTheme } from "@mui/material";
import UserActions from '../Clients/userActions';
import { useLocalState } from "../../../util/useLocalStorage";
import { useEffect, useState } from 'react';
import axios from 'axios';


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
   

  const columns = [

    {
      field: "name",
      headerName: "Nombre",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Descripción",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Precio",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
        field: "goodType",
        headerName: "Tipo de bien",
    },
    {
      field: "userActions",
      headerName: "Actions",
      type: "actions",
      renderCell: (values) => (
        <UserActions  {...values}/>
      ),
    }
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
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
          columns={columns}
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
