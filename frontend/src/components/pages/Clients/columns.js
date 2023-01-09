import UserActions from './userActions';

export const companyColumns = [
    { field: "hasActiveService", headerName: "Servicio activo" },
    {
      field: "cuit",
      headerName: "CUIT",
      flex: 0.25,
      cellClassName: "name-column--cell",
    },
    {
      field: "companyName",
      headerName: "Nombre de la empresa",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "startOfActivities",
      headerName: "Comienzo de actividades",
      type: "date",
      flex: 0.5,
    },
    {
      field: "userActions",
      headerName: "Actions",
      type: "actions",
      flex: 0.25,
      renderCell: (values) => (
        <UserActions  {...values}/>
      ),
    }
  ];

export const personColumns = [
    {
      field: "dni",
      headerName: "DNI",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1
    },
    {
      field: "firstName",
      headerName: "Nombre",
      flex: 1
    },
    {
      field: "lastName",
      headerName: "Apellido",
      flex: 1
    },
    {
      field: "userActions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      renderCell: (values) => (
        <UserActions  {...values}/>
      ),
    }
];

const productColums = [

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