import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocalState } from "../../../../util/useLocalStorage";
import * as React from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {row.goodType === "Servicio" ? (
          <>
            <TableCell> {row.goodType} </TableCell>
            <TableCell component="th" scope="row">
              {row.service.name}
            </TableCell>
            <TableCell>{row.service.description}</TableCell>
          </>
        ) : row.goodType === "Producto" ? (
          <>
            <TableCell> {row.goodType} </TableCell>
            <TableCell component="th" scope="row">
              {row.product.name}
            </TableCell>
            <TableCell>{row.product.description}</TableCell>
          </>
        ) : (
          <></>
        )}
        <TableCell>{row.price}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>{row.totalPrice}</TableCell>
        <TableCell align="right">{row.finalItemPrice}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Informacion detallada
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2} align="center">Precio individual</TableCell>
                    <TableCell colSpan={2} align="center" >Cantidad</TableCell>
                    <TableCell colSpan={2}/>
                    <TableCell align="left" colSpan={2}>Precio total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2} align="center">${row.price}</TableCell>
                    <TableCell colSpan={2} align="center">{row.quantity}</TableCell>
                    <TableCell colSpan={2}/>
                    <TableCell align="left" colSpan={2}>${row.totalPrice}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} />
                      <TableCell colSpan={2} align="center">Impuestos </TableCell>
                      <TableCell colSpan={1}/>
                      <TableCell align="center" colSpan={1}>
                    {row.goodType === "Producto" ? (
                      row.product.taxes.map((tax) => (
                        <TableRow >
                          <TableCell align="left" sx={{border:"none"}}>
                            {tax.percentage}% ({tax.name})
                          </TableCell>
                        </TableRow>
                      ))                     
                    ) : row.goodType === "Servicio" ? (
                      row.service.taxes.map((tax) => (
                        <TableRow >
                          <TableCell align="left" sx={{border:"none"}}>
                            {tax.percentage}% ({tax.name})
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <></>
                    )}
                    </TableCell>
                    <TableCell align="left" colSpan={2}>${row.priceAfterTaxes}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} />
                      <TableCell colSpan={2}  align="center">Costos extra </TableCell>
                      <TableCell colSpan={1}/>
                      <TableCell>
                      <TableCell colSpan={2} sx={{border:"none"}} align="center">${row.extraCost}</TableCell>
                      </TableCell>
                      <TableCell colSpan={2} align="left">${row.finalItemPrice}</TableCell>
                    </TableRow>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CreateOrderItems = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [jwt, setJwt] = useLocalState("", "jwt");

  const [open, setOpen] = useState(false);

  const orderId = window.location.href.split("/orders/")[1];
  const [order, setOrder] = useState(null);
  const [orderDetailList, setOrderDetailList] = useState([]);
  const [goods, setGoods] = useState([]);
  const [goodId, setGoodId] = useState(null);
  const [selectedGood, setSelectedGood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [hasWarranty, setHasWarranty] = useState(false);
  const [warrantyYears, setWarrantyYears] = useState(null);

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const updateOrder = (orderDetailId) => {
    const reqBody = {
      orderId: orderId,
      orderDetailId: orderDetailId,
    };

    axios
      .put("/api/order/update", JSON.stringify(reqBody), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setOpen(false);
          setLoading(false);
        } else return Promise.reject();
      })
      .catch((message) => {
        alert("Hubo un problema al actualizar la orden");
      });
  };

  function handleClick() {
    setLoading(true);

    const reqBody = {
      orderId: orderId,
      goodId: goodId,
      quantity: quantity,
      hasWarranty: hasWarranty,
      warrantyYears: warrantyYears,
    };

    axios
      .post("/api/order/item/create", JSON.stringify(reqBody), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          updateOrder(response.data.orderDetailId);
        } else return Promise.reject();
      })
      .catch((message) => {
        alert("Hubo un problema al añadir este item");
      });
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setOrder(res.data);
          setOrderDetailList(res.data.orderDetails);
          setIsLoading(false);
          console.log(res.data.orderDetails);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = "/login";
        }
      });

    axios
      .get("/api/goods/get-all", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setGoods(res.data);
          console.log(goods);
        } else return Promise.reject("Invalid");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return isLoading ? (
    <>LOADING...</>
  ) : (
    <div className="mx-4">
      <TableContainer className="px-2" component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Tipo de bien</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Precio individual</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio total</TableCell>
              <TableCell align="right">Precio final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetailList.map((orderDetail) => (
              <Row key={orderDetail.id} row={orderDetail} />
            ))}
            <TableRow>
              <TableCell
                colSpan={8}
                align="center"
                style={{ cursor: "pointer", backgroundColor: colors.grey[800] }}
                onClick={handleOpen}
              >
                <AddIcon />
              </TableCell>
            </TableRow>
            <TableRow style={{ backgroundColor: colors.grey[900] }}>
              <TableCell colSpan={5} rowSpan={2} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{order.totalPrice}</TableCell>
            </TableRow>
            <TableRow style={{ backgroundColor: colors.grey[900] }}>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{order.finalPrice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="simple-dialog-title">AGREGAR ITEM</DialogTitle>
          <DialogContent sx={{ height: "20rem" }}>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
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
                options={goods}
                getOptionLabel={(good) => good.name || ""}
                clearOnBlur={false}
                onChange={(event, newValue) => {
                  setSelectedGood(newValue);
                  setGoodId(newValue.id);
                }}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    type="text"
                    label="Bienes"
                    color="info"
                    name="bienes"
                    fullWidth
                  />
                )}
              />
              {selectedGood ? (
                selectedGood.goodType === "Producto" ? (
                  <>
                    <FormControlLabel
                      value="top"
                      control={
                        <Checkbox
                          color="info"
                          onChange={(e) => {
                            setHasWarranty(e.target.checked);
                          }}
                        />
                      }
                      label="Garantía"
                      labelPlacement="top"
                      sx={{ gridColumn: "span 1" }}
                    />
                    {hasWarranty ? (
                      <>
                        <TextField
                          variant="filled"
                          value={warrantyYears}
                          onChange={(e) => {
                            setWarrantyYears(e.target.value);
                          }}
                          type="number"
                          label="Años"
                          color="info"
                          name="Anios"
                          fullWidth
                        />
                      </>
                    ) : (
                      <div style={{ gridColumn: "span 1" }}></div>
                    )}
                  </>
                ) : (
                  <div style={{ gridColumn: "span 2" }}></div>
                )
              ) : (
                <div style={{ gridColumn: "span 2" }}></div>
              )}
              <TextField
                variant="filled"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                type="number"
                label="Cantidad"
                color="info"
                name="Cantidad"
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="filled">
              Cancel
            </Button>
            <LoadingButton
              color="secondary"
              onClick={handleClick}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              <span>Save</span>
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </div>
  );
};

export default CreateOrderItems;
