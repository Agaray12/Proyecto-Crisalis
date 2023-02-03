import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";
import { Button, Container } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { useLocalState } from "../../../../util/useLocalStorage";

const CreateOrder = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [jwt, setJwt] = useLocalState("", "jwt");

  const [clientType, setClientType] = useState("");
  const [personList, setPersonList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [personId, setPersonId] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    axios
      .get("/api/client/get-all", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          clientType: `Empresa`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCompanyList(res.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = "/login";
        }
      });

    axios
      .get("/api/client/get-all", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          clientType: `Persona`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPersonList(res.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = "/login";
        }
      });
  }, []);

  const handleFormSubmit = (values) => {
    const reqBody = {
      personId: personId,
      companyId: companyId,
    };

    axios
      .post("/api/order/create", JSON.stringify(reqBody), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          window.location.href = `/orders/${response.data.id}`;
        } else return Promise.reject();
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
            <MenuItem value={"Empresa"}>Empresa</MenuItem>
            <MenuItem value={"Persona"}>Persona Física</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {clientType === "Empresa" ? (
        <>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={companyList}
              getOptionLabel={(company) => company.companyName || ""}
              clearOnBlur={false}
              onChange={(event, newValue) => {
                newValue === null ? setCompanyId(null) : setCompanyId(newValue.id);
              }}
              sx={{ gridColumn: "span 2" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  type="text"
                  label="Empresa"
                  color="info"
                  name="firstName"
                  fullWidth
                />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={personList}
              getOptionLabel={(person) => person.fullName || ""}
              onChange={(event, newValue) => {
                newValue === null ? setPersonId(null) : setPersonId(newValue.id)
              }}
              clearOnBlur={false}
              sx={{ gridColumn: "span 1" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Persona a cargo"
                  color="info"
                  name="firstName"
                />
              )}
            />
            <Button
              onClick={() => handleFormSubmit()}
              color="secondary"
              variant="contained"
            >
              Iniciar nuevo pedido
            </Button>
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            
          </Box>
        </>
      ) : clientType === "Persona" ? (
        <>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={personList}
              getOptionLabel={(person) => person.fullName}
              sx={{ gridColumn: "span 3" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  onChange={(event) => console.log(event)}
                  variant="filled"
                  type="text"
                  label="Persona física"
                  color="info"
                  name="firstName"
                />
              )}
            />
            <Button
              onClick={() => handleFormSubmit()}
              color="secondary"
              variant="contained"
            >
              Iniciar nuevo pedido
            </Button>
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            
          </Box>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CreateOrder;
