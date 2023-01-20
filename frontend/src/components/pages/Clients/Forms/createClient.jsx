import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";
import { Button, Container } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { addDays, addHours, addMinutes, addSeconds, format, parseISO } from "date-fns";
import axios from 'axios';
import { useLocalState } from "../../../../util/useLocalStorage";

function ClientCreate() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [jwt, setJwt] = useLocalState("", "jwt");

  const [clientType, setClientType] = useState("");
  const [cuit, setCuit] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [startOfActivities, setStartOfActivities] = useState(null);
  const [dni, setDni] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);


  const handleDateFormat = (event) => {
    let selectedDate = new Date(event.target.value);
    let utcDate = addMinutes(selectedDate, selectedDate.getTimezoneOffset());
    setStartOfActivities(format(utcDate, "dd-MM-yyyy"));
  }

  const handleFormSubmit = (values) => {
    const reqBody = {
      hasActiveService: false,
      clientType: clientType,
      cuit: cuit,
      companyName: companyName,
      startOfActivities: startOfActivities,
      dni: dni,
      firstName: firstName,
      lastName: lastName,
    };

    console.log(reqBody);
    
    axios
      .post("/api/client/create", JSON.stringify(reqBody), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        if(response.status === 201){
          window.location.href="/clients";
        }
        else
          return Promise.reject();
        })
        .catch((message) => {
          alert("Could not create a client");
      });
  };

  const handleChange = (event) => {
    setClientType(event.target.value);
  };

  return (
    <Container disableGutters>
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
            <MenuItem value={"Company"}>Empresa</MenuItem>
            <MenuItem value={"Person"}>Persona Física</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {clientType === "Company" ? (
        <>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              onChange={(event) => setCompanyName(event.target.value)}
              variant="filled"
              type="text"
              label="Company Name"
              color="info"
              name="firstName"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              onChange={(event) => setCuit(event.target.value)}
              variant="filled"
              type="text"
              label="CUIT"
              color="info"
              name="lastName"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              onChange={(event) => handleDateFormat(event)}
              variant="filled"
              type="date"
              label="Start of Activities"
              color="info"
              name="startOfActivities"
              InputLabelProps={{shrink: true, style:{fontSize:'18px'}}}
              sx={{ gridColumn: "span 4"}}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              onClick={() => handleFormSubmit()}
              color="secondary"
              variant="contained"
            >
              Crear nueva empresa
            </Button>
          </Box>
        </>
      ) : clientType === "Person" ? (
        <>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              onChange={(e) => setFirstName(e.target.value)}
              variant="filled"
              type="text"
              label="First Name"
              color="info"
              name="firstName"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              onChange={(e) => setLastName(e.target.value)}
              variant="filled"
              type="text"
              label="Last Name"
              color="info"
              name="lastName"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              onChange={(e) => setDni(e.target.value)}
              variant="filled"
              type="text"
              label="DNI"
              color="info"
              name="dni"
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button onClick={() => handleFormSubmit()} color="secondary" variant="contained">
              Crear nueva persona
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default ClientCreate;