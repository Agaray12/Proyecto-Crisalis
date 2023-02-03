import { Typography, Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../global/Header";
import UserActions from "./userActions";
import { useLocalState } from "../../../util/useLocalStorage";
import Fab from "@mui/material/Fab";
import { useEffect, useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { companyColumns, personColumns } from "./columns";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Navigate } from "react-router-dom";

const Clients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [clientType, setClientType] = useState("");

  const handleChange = (event) => {
    setClientType(event.target.value);

    handleClients(event.target.value);
  };

  const [clients, setClients] = useState([]);

  const [jwt, setJwt] = useLocalState("", "jwt");

  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  const handleClients = (value) => {
    axios
      .get("api/client/get-all", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          clientType: `${value}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setClients(res.data);
        };
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href="/login";
        }
      });
  };

  return (
    <Box m="20px">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box mb="30px">
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <InputLabel focused={false}>Clientes</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={clientType}
              onChange={handleChange}
              autoWidth
              label="Clientes"
              variant="outlined"
            >
              <MenuItem value={"Empresa"}>Empresas</MenuItem>
              <MenuItem value={"Persona"}>Personas Físicas</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Fab onClick={()=>{window.location.href="/clients/create"}}>
          <AddCircleIcon/>
        </Fab>
      </div>
      <Box
        m="40px 0 0 0"
        height="70vh"
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
        {clientType === "Empresa" ? (
          <>
            <DataGrid
              key={clients.map((client) => client.id)}
              pageSize={10}
              disableColumnMenu
              disableColumnSelector
              disableDensitySelector
              rows={clients}
              columns={companyColumns}
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
          </>
        ) : clientType === "Persona" ? (
          <DataGrid
            key={clients.map((client) => client.id)}
            pageSize={10}
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            rows={clients}
            columns={personColumns}
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
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Clients;
