import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";
import { Button, Container } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from 'axios';
import { useLocalState } from "../../../../util/useLocalStorage";

function GoodCreate() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [jwt, setJwt] = useLocalState("", "jwt");

  const [goodType, setGoodType] = useState("");
  const [goodName, setGoodName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [isSpecial, setIsSpecial] = useState(null);
  const [hasWarranty, setHasWarranty] = useState(null);
  const [warrantyYears, setWarrantyYears] = useState(null);

  const handleFormSubmit = () => {
    const reqBody = {
      name: goodName,
      description: description,
      price: price,
      goodType: goodType,
      isSpecial: isSpecial,
      hasWarranty: hasWarranty,
      warrantyYears: warrantyYears,
    };

    console.log(reqBody);
    
    axios
      .post("/api/goods/create", JSON.stringify(reqBody), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        if(response.status === 201){
          window.location.href="/goods";
        }
        else
          return Promise.reject();
        })
        .catch((message) => {
          alert("Could not create a good");
      });
  };

  return (
    <Container disableGutters>
      <Box mb="30px">
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <InputLabel focused={false}>Bienes</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={goodType}
            onChange={(e) => setGoodType(e.target.value)}
            autoWidth
            label="Bienes"
            variant="outlined"
          >
            <MenuItem value={"Product"}>Producto</MenuItem>
            <MenuItem value={"Service"}>Servicio</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {goodType === "Product" ? (
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
              onChange={(event) => setGoodName(event.target.value)}
              variant="filled"
              type="text"
              label="Good name"
              color="info"
              name="goodName"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              onChange={(event) => setDescription(event.target.value)}
              variant="filled"
              type="text"
              label="Description"
              color="info"
              name="Description"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              onChange={(event) => setPrice(event.target.value)}
              variant="filled"
              type="number"
              label="Price"
              color="info"
              name="Price"
              sx={{ gridColumn: "span 4" }}
            />
            
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              onClick={() => handleFormSubmit()}
              color="secondary"
              variant="contained"
            >
              Crear nuevo producto
            </Button>
          </Box>
        </>
      ) : goodType === "Service" ? (
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
              onChange={(event) => setGoodName(event.target.value)}
              variant="filled"
              type="text"
              label="Good name"
              color="info"
              name="goodName"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              onChange={(event) => setDescription(event.target.value)}
              variant="filled"
              type="text"
              label="Description"
              color="info"
              name="Description"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              onChange={(event) => setDescription(event.target.value)}
              variant="filled"
              type="number"
              label="Price"
              color="info"
              name="Price"
              sx={{ gridColumn: "span 2" }}
            />
            
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              onClick={() => handleFormSubmit()}
              color="secondary"
              variant="contained"
            >
              Crear nuevo servicio
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default GoodCreate;