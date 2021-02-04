import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  fade,
  withStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  Platform,
  View,
  Image,
  Text,
  Dimensions,
  ImageBackground,
  Clipboard,
} from "react-native";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import * as shiphypeservice from "./ShipService/shiphype_service";
import MaterialTable, { MTableToolbar } from "material-table";
import popUpStyle from "./style/popUpStyle";
import Toast from "./feedback/Toast";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Grid from "@material-ui/core/Grid";
import ProgressBar from "./feedback/ProgressBar";
import { forwardRef } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  CloudUpload: forwardRef((props, ref) => (
    <CloudUploadIcon {...props} ref={ref} />
  )),
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    height: "60vh",
    overflow: "auto",
    backgroundColor: "#fff",
  },
}));
const ColorButtonInDeliverd = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#002db3",
    "&:hover": {
      backgroundColor: "#002db3",
    },
  },
}))(Button);
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "100%",
    width: "90px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);
//Make custom button
const ColorButtonProcessed = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#0168fa",
    "&:hover": {
      backgroundColor: "#0168fa",
    },
  },
}))(Button);
const ColorButtonCancel = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#e60000",
    "&:hover": {
      backgroundColor: "#e60000",
    },
  },
}))(Button);
const ColorButtonOnHold = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#808080",
    "&:hover": {
      backgroundColor: "#808080",
    },
  },
}))(Button);

const ColorButtonException = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#992600",
    "&:hover": {
      backgroundColor: "#992600",
    },
  },
}))(Button);
const ColorButtonShipped = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    //  backgroundColor:'#009900',
    //  '&:hover': {
    //   backgroundColor: '#009900',

    // },
    backgroundColor: "#732673",
    "&:hover": {
      backgroundColor: "#732673",
    },
  },
}))(Button);
const ColorButtonNew = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#33cc00",
    "&:hover": {
      backgroundColor: "#33cc00",
    },
  },
}))(Button);

const ColorButtonInTransit = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "75%",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#000",
    padding: 0,
    paddingBottom: "3px",
    paddingTop: "3px",
    backgroundColor: "#d9d9d9",
    "&:hover": {
      backgroundColor: "#d9d9d9",
    },
  },
}))(Button);
export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const orderStatusOptions = props.orderStatusOptions;
  let orderStatusId = props.orderStatus;
  const orderTypeOptions = props.orderTypeOptions;
  const orderCouierOptions = props.orderCouierOptions;
  const orderCustomerOptions = props.orderCustomerOptions;
  const internalorder_id = props.internalorder_id;
  const [dataproductData, setdataproductData] = React.useState([]);
  const [orderType, setOrderType] = React.useState([]);
  const [orderStatus, setOrderStatus] = React.useState([]);
  const [orderList, setOrderList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [dataproduct, setDataProduct] = React.useState([]);
  const userid = props.user_id;
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");

  const copyLinkOnClick = (copylink) => {
    Clipboard.setString(copylink);
    setOpen(true);
    setType("success");
    setMsg("Copy to Clipboard");
  };
  const handleGetShipmentId = (rowdata) => {
    props.getShipmentIdFromOrder(rowdata);
  };

  const theme = useTheme();

  const [state, setState] = React.useState({
    column1FilterList: {},
    column2FilterList: {},
    columns: [
      {
        title: "Order ID",
        field: "internalorderId",
        type: "text",
        // render: rowData => <Link href="#" onClick={() => handleGetShipmentId(rowData.internalorderId)} variant="body2">
        // {rowData.internalorderId} </Link>
      },
      { title: "Date Created", field: "orderdate", type: "date" },
      {
        title: "Order Status",
        field: "orderstatus",

        render: (rowData) => (
          <Text>
            {(() => {
              if (rowData.orderstatus === 5) {
                return (
                  <ColorButtonInTransit> In Transit </ColorButtonInTransit>
                );
              } else if (rowData.orderstatus === 3) {
                return (
                  <ColorButtonProcessed> Processing </ColorButtonProcessed>
                );
              } else if (rowData.orderstatus === 6) {
                return (
                  <ColorButtonInDeliverd> Delivered </ColorButtonInDeliverd>
                );
              } else if (rowData.orderstatus === 4) {
                return <ColorButtonShipped> Shipped </ColorButtonShipped>;
              } else if (rowData.orderstatus === 7) {
                return (
                  <ColorButtonOnHold
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {}}
                  >
                    {" "}
                    On Hold
                  </ColorButtonOnHold>
                );
              } else if (rowData.orderstatus === 8) {
                return (
                  <ColorButtonOnHold
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => {}}
                  >
                    {" "}
                    On Hold
                  </ColorButtonOnHold>
                );
              } else {
                return <ColorButtonNew> New Order </ColorButtonNew>;
              }
            })()}
          </Text>
        ),
        // lookup: orderStatusOptions ,
      },

      {
        title: "Customer Type",
        field: "customertype",
        lookup: { 1: "Residential", 2: "Business" },
        render: (rowData) => (
          <Text>
            {(() => {
              if (rowData.customertype === 1) {
                return (
                  <Text
                    onClick={() => {
                      copyLinkOnClick("Residential");
                    }}
                    style={{
                      fontSize: "11px",
                      cursor: "pointer",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    Residential
                  </Text>
                );
              } else {
                return (
                  <Text
                    onClick={() => {
                      copyLinkOnClick("Business");
                    }}
                    style={{
                      fontSize: "11px",
                      cursor: "pointer",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                   Business
                  </Text>
                );
              }
            })()}
          </Text>
        ),
        // lookup: orderCustomerOptions ,
      },
      {
        title: "Customer Name",
        field: "customer",
        type: "text",
        render: (rowData) => (
          <Text
            onClick={() => {
              copyLinkOnClick(rowData.customer.firstname);
            }}
            style={{
              fontSize: "11px",
              cursor: "pointer",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition: "all 0.25s",
            }}
          >
            {" "}
                  {rowData.customer.firstname} {rowData.customer.lastname}{" "}
          </Text>
        ),
      },
      {
        title: "Company Name",
        field: "companyname",
        type: "text",
        render: (rowData) =>  <Text>
        {(() => { 
             if(rowData!==undefined){
              if(rowData.customer!==null)
              {
                return(
                  <Text
          onClick={() => {
            copyLinkOnClick(rowData.customer.companyname);
          }}
          style={{
            fontSize: "11px",
            cursor: "pointer",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition: "all 0.25s",
          }}
        >
          {rowData.customer.companyname}
        </Text>
                  )
              
                }
                else{
                  return(
                    <Text
           
            style={{
              fontSize: "11px",
              cursor: "pointer",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition: "all 0.25s",
            }}
          >
            
          </Text>
                    )
                
                }
               }
               
                  })()} 
      </Text>
        
      },
      {
        title: "Address",
        field: "addressline1",
        type: "text",
        render: (rowData) => <Text>
          {(() => { 
               if(rowData!==undefined){
                if(rowData.customer!==null)
                {
                  return(
                    <Text
            onClick={() => {
              copyLinkOnClick(rowData.customer.addressline1);
            }}
            style={{
              fontSize: "11px",
              cursor: "pointer",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition: "all 0.25s",
            }}
          >
            {rowData.customer.addressline1}
          </Text>
                    )
                
                  }
                  else{
                    return(
                      <Text
             
              style={{
                fontSize: "11px",
                cursor: "pointer",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                transition: "all 0.25s",
              }}
            >
              
            </Text>
                      )
                  
                  }
                 }
                 
                    })()} 
        </Text>
          
        
      },
      {
        title: "City",
        field: "city",
        type: "text",
        render: (rowData) =><Text>
        {(() => { 
             if(rowData!==undefined){
              if(rowData.customer!==null)
              {
                return(
                  <Text
          onClick={() => {
            copyLinkOnClick(rowData.customer.city);
          }}
          style={{
            fontSize: "11px",
            cursor: "pointer",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition: "all 0.25s",
          }}
        >
          {rowData.customer.city}
        </Text>
                  )
              
                }
                else{
                  return(
                    <Text
           
            style={{
              fontSize: "11px",
              cursor: "pointer",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition: "all 0.25s",
            }}
          >
            
          </Text>
                    )
                
                }
               }
               
                  })()} 
      </Text>
        
      },
      {
        title: "State/Province",
        field: "state",
        type: "text",
        render: (rowData) =><Text>
        {(() => { 
             if(rowData!==undefined){
              if(rowData.customer!==null)
              {
                return(
                  <Text
          onClick={() => {
            copyLinkOnClick(rowData.customer.state);
          }}
          style={{
            fontSize: "11px",
            cursor: "pointer",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition: "all 0.25s",
          }}
        >
          {rowData.customer.state}
        </Text>
                  )
              
                }
                else{
                  return(
                    <Text
           
            style={{
              fontSize: "11px",
              cursor: "pointer",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition: "all 0.25s",
            }}
          >
            
          </Text>
                    )
                
                }
               }
               
                  })()} 
      </Text>
        
      },
      {
        title: "Zip/Postal Code",
        field: "zip",
        type: "text",
        render: (rowData) => <Text>
        {(() => { 
             if(rowData!==undefined){
              if(rowData.customer!==null)
              {
                return(
                  <Text
          onClick={() => {
            copyLinkOnClick(rowData.customer.zip);
          }}
          style={{
            fontSize: "11px",
            cursor: "pointer",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition: "all 0.25s",
          }}
        >
          {rowData.customer.zip}
        </Text>
                  )
              
                }
                else{
                  return(
                    <Text
           
            style={{
              fontSize: "11px",
              cursor: "pointer",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition: "all 0.25s",
            }}
          >
            
          </Text>
                    )
                
                }
               }
               
                  })()} 
      </Text>
        
      },
      {
        title: "Country",
        field: "ordercountry",
        type: "text",
        render: (rowData) => <Text>
        {(() => { 
             if(rowData!==undefined){
              return(
                  <Text
          onClick={() => {
            copyLinkOnClick(rowData.ordercountry);
          }}
          style={{
            fontSize: "11px",
            cursor: "pointer",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition: "all 0.25s",
          }}
        >
          {rowData.ordercountry}
        </Text>
                  )
               }
               
                  })()} 
      </Text>
        
      },
      {
        title: "Telephone",
        field: "phone",
        type: "text",
        render: (rowData) => <Text>
        {(() => { 
             if(rowData!==undefined){
              if(rowData.customer!==null)
              {
                return(
                  <Text
          onClick={() => {
            copyLinkOnClick(rowData.customer.phone);
          }}
          style={{
            fontSize: "11px",
            cursor: "pointer",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition: "all 0.25s",
          }}
        >
          {rowData.customer.phone}
        </Text>
                  )
              
                }
                else{
                  return(
                    <Text
           
            style={{
              fontSize: "11px",
              cursor: "pointer",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition: "all 0.25s",
            }}
          >
            
          </Text>
                    )
                
                }
               }
               
                  })()} 
      </Text>
        
      },
      {
        title: "Email",
        field: "email",
        type: "text",
        render: (rowData) => <Text>
        {(() => { 
             if(rowData!==undefined){
              if(rowData.customer!==null)
              {
                return(
                  <Text
          onClick={() => {
            copyLinkOnClick(rowData.customer.email);
          }}
          style={{
            fontSize: "11px",
            cursor: "pointer",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition: "all 0.25s",
          }}
        >
          {rowData.customer.email}
        </Text>
                  )
              
                }
                else{
                  return(
                    <Text
           
            style={{
              fontSize: "11px",
              cursor: "pointer",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition: "all 0.25s",
            }}
          >
            
          </Text>
                    )
                
                }
               }
               
                  })()} 
      </Text>
        
      },
      {
        title: "Additional Notes",
        field: "recipientname9",
        type: "text",

        render: (rowData) => (
          <Text
            onClick={() => {
              copyLinkOnClick(rowData.recipientname9);
            }}
            style={{
              fontSize: "11px",
              cursor: "pointer",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition: "all 0.25s",
            }}
          >
            {rowData.recipientname9}
          </Text>
        ),
      },

      { title: "Date Shipped", field: "shipdate", type: "date" },

      {
        title: "Carrier",
        field: "shippingpolicy",
        type: "text",
        render: (rowData) => (
          <Text
            onClick={() => {
              copyLinkOnClick(rowData.shippingpolicy);
            }}
            style={{
              fontSize: "11px",
              cursor: "pointer",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition: "all 0.25s",
            }}
          >
            {rowData.shippingpolicy}
          </Text>
        ),
      },

      {
        title: "Tracking #",
        field: "tracking",
        type: "text",
        render: (rowData) => (
          <Text
            onClick={() => {
              copyLinkOnClick(rowData.tracking);
            }}
            style={{
              fontSize: "11px",
              cursor: "pointer",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition: "all 0.25s",
            }}
          >
            {rowData.tracking}
          </Text>
        ),
      },
      {
        title: "Shipping Service",
        field: "shipmenttype",
        type: "text",

        render: (rowData) => (
          <FormControlLabel
          onClick={() => {
            
          }}
         
          control={
            <Typography
              style={{
                marginLeft: "20px",
                fontSize: "2px",
                cursor: "pointer",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              }}
            >
          <Text>
            {(() => {
              if (rowData.shipmenttype === "10") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    Custom Shipping Label
                  </Text>
                );
              } else if (rowData.shipmenttype === "2") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    2-Day Shipping
                  </Text>
                );
              } else if (rowData.shipmenttype === "3") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    Overnight Shipping
                  </Text>
                );
              } else if (rowData.shipmenttype === "4") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    Stamped Postage
                  </Text>
                );
              } else if (rowData.shipmenttype === "5") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    Oversize LetterMail
                  </Text>
                );
              } else if (rowData.shipmenttype === "6") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    Pallet Freight
                  </Text>
                );
              }else if (rowData.shipmenttype === "1") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    Standard Shipping
                  </Text>
                );
              }else{
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                   {' '}
                  </Text>
                );
              }
            })()}
          </Text>
          </Typography>
          }
        />
        ),
      },
      {
        title: "Packing Type",
        field: "packagetype",
        type: "text",

        render: (rowData) => (
          <FormControlLabel
          onClick={() => {
            //handleChangeCheckbox(rowData.internalorderId);
          }}
          className={classes.quantitycss}
          control={
            <Typography
              style={{
                marginLeft: "20px",
                fontSize: "2px",
                cursor: "pointer",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              }}
            >
          <Text>
            {(() => {
              if (rowData.packagetype === "1") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    No Packing Slips
                  </Text>
                );
              } else if (rowData.packagetype === "2") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    Add Packing Slip Inside
                  </Text>
                );
              } else if (rowData.packagetype === "3") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    Add Packing Slip Outside
                  </Text>
                );
              } else if (rowData.packagetype === "4") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    Add Packing Slip Inside + Outside
                  </Text>
                );
              
              }else{
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                   {' '}
                  </Text>
                );
              }
            })()}
          </Text>
          </Typography>
          }
        />
        ),
      },
      {
        title: "Invoice Type",
        field: "invoicetype",
        type: "text",

        render: (rowData) => (
          <FormControlLabel
          onClick={() => {
           // handleChangeCheckbox(rowData.internalorderId);
          }}
          className={classes.quantitycss}
          control={
            <Typography
              style={{
                marginLeft: "20px",
                fontSize: "2px",
                cursor: "pointer",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              }}
            >
          <Text>
            {(() => {
              if (rowData.invoicetype === "4") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    No Invoice
                  </Text>
                );
              } else if (rowData.invoicetype === "1") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    Add Invoice Inside
                  </Text>
                );
              } else if (rowData.invoicetype === "2") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                   Add Invoice Outside
                  </Text>
                );
              } else if (rowData.invoicetype === "3") {
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    Add Invoice Inside + Outside
                  </Text>
                );
              }else{
                return (
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                   {' '}
                  </Text>
                );
              }
            })()}
          </Text>
          </Typography>
          }
        />
        ),
      },
      {
        title: "Uploaded Label",
        field: "shippinglabel",
        render: (rowData) => (
<View>
{(() => {
if(rowData.shippinglabel === 0 || rowData.shippinglabel === null){
  return(
<Text>No Attachment</Text>
  )
}else{
  return(

  <ImageBackground
                  onPress={() => {
                    window.open(
                      `https://api.shiphype.com/api/Upload/Download?shipinglabelid=${rowData.shippinglabel}`
                    );
                  }}
                  style={{
                    width: 65,
                    height: 65,
                    flexDirection: "column",
                    borderRadius: 5,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}
                  source={require("../../assets/icons/free_pdf_download_icon.png")}
                >
                  <View
                    style={{
                      alignItems: "flex-end",
                      marginTop: 10,
                      marginRight: 10,
                      justifyContent: "flex-start",
                    }}
                  >
                    <CloudDownloadIcon
                      onClick={() => {
                        window.open(
                          `https://api.shiphype.com/api/Upload/Download?shipinglabelid=${rowData.shippinglabel}`
                        );
                      }}
                    />
                  </View>
                </ImageBackground>
                )
}

})()}
</View>

         
        
        ),
      },
      {
        title: "Packing Slip",
        field: "packaginslipdocnameid",
        render: (rowData) => (
<View>
{(() => {
if(rowData.packaginslipdocnameid === 0 || rowData.packaginslipdocnameid === null){
  return(
<Text>No Attachment</Text>
  )
}else{
  return(

  <ImageBackground
                  onPress={() => {
                    window.open(
                      `https://api.shiphype.com/api/Upload/Download?shipinglabelid=${rowData.packaginslipdocnameid}`
                    );
                  }}
                  style={{
                    width: 65,
                    height: 65,
                    flexDirection: "column",
                    borderRadius: 5,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}
                  source={require("../../assets/icons/free_pdf_download_icon.png")}
                >
                  <View
                    style={{
                      alignItems: "flex-end",
                      marginTop: 10,
                      marginRight: 10,
                      justifyContent: "flex-start",
                    }}
                  >
                    <CloudDownloadIcon
                      onClick={() => {
                        window.open(
                          `https://api.shiphype.com/api/Upload/Download?shipinglabelid=${rowData.packaginslipdocnameid}`
                        );
                      }}
                    />
                  </View>
                </ImageBackground>
                )
}

})()}
</View>

         
        
        ),
      },
      {
        title: "Order Invoice",
        field: "invoicetypedocnameid",
        render: (rowData) => (
<View>
{(() => {
if(rowData.invoicetypedocnameid === 0 || rowData.invoicetypedocnameid === null){
  return(
<Text>No Attachment</Text>
  )
}else{
  return(

  <ImageBackground
                  onPress={() => {
                    window.open(
                      `https://api.shiphype.com/api/Upload/Download?shipinglabelid=${rowData.invoicetypedocnameid}`
                    );
                  }}
                  style={{
                    width: 65,
                    height: 65,
                    flexDirection: "column",
                    borderRadius: 5,
                    marginHorizontal: 5,
                    marginVertical: 5,
                  }}
                  source={require("../../assets/icons/free_pdf_download_icon.png")}
                >
                  <View
                    style={{
                      alignItems: "flex-end",
                      marginTop: 10,
                      marginRight: 10,
                      justifyContent: "flex-start",
                    }}
                  >
                    <CloudDownloadIcon
                      onClick={() => {
                        window.open(
                          `https://api.shiphype.com/api/Upload/Download?shipinglabelid=${rowData.invoicetypedocnameid}`
                        );
                      }}
                    />
                  </View>
                </ImageBackground>
                )
}

})()}
</View>

         
        
        ),
      },
    ],
    data: [],
  });

  const [state1, setState1] = React.useState({
    columns: [
      { title: "Item Title", field: "productname", type: "text" },
      { title: "Item SKU", field: "productsku", type: "text" },
    
      { title: 'ShipHype Internal SKU', field: 'shiphypeSku',type: 'text',
     },
     { title: "Qty", field: "itemquantity", type: "numeric" },

     {
      title: "HS Code",
      field: "hscode",
      type: "text",
    },
      { title: "Item Value", field: "itemvalue", type: "text" },
      {
        title: "Dangerous Goods",
        field: "dangerousgoods",
        type: "boolean",
        render: (rowData) => (
          <FormControlLabel
           
            
            control={
              <Typography
                style={{
                  marginLeft: "20px",
                  fontSize: "2px",
                  cursor: "pointer",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                }}
              >
                {(() => {
                  if (rowData.dangerousgoods === true) {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        Yes
                      </Text>
                    );
                  } else {
                    return (
                      <Text
                        style={{
                          fontSize: "11px",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                          transition: "all 0.25s",
                        }}
                      >
                        No
                      </Text>
                    );
                  }
                })()}
              </Typography>
            }
          />
        ),
      },
      {
        title: "Packaging",
        field: "packaging",
        width: 50,
        lookup: {
          1: "Envelope",
          2: "Courier Bags",
          3: "Poly Bubble Mailer",
          4: "Corrugated Box",
          5: "Corrugated Box (Heavy Duty)",
          6: "Corrugated Box (Cube)",
        },

      },

        {
                     title: 'Promotional Inserts',
                     field: 'promotionalpackaging',
                     lookup: {
                      1: "Envelope",
                      2: "Courier Bags",
                      3: "Poly Bubble Mailer",
                      4: "Corrugated Box",
                      5: "Corrugated Box (Heavy Duty)",
                      6: "Corrugated Box (Cube)",
                    },

                   //  lookup: promoData ,
    },
    {
      title: "Serial Number",
      field: "serialno",
      type: "boolean",
      render: (rowData) => (
        <FormControlLabel
          control={
            <Typography
              style={{
                marginLeft: "20px",
                fontSize: "2px",
                cursor: "pointer",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              }}
            >
              {(() => {
                if (rowData.serialno === true) {
                  return (
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      Yes
                    </Text>
                  );
                } else {
                  return (
                    <Text
                      style={{
                        fontSize: "11px",
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        transition: "all 0.25s",
                      }}
                    >
                      No
                    </Text>
                  );
                }
              })()}
            </Typography>
          }
        />
      ),
    },
    { title: "Serial Number Value", field: "serialnovalue", type: "text" },
     
    ],
  });
  //const column1FilterList = state.column1FilterList;
  React.useEffect(() => {
    //   fetchOderType();
 
    fetchPackingList(userid);
    fetchOrderDetails();
  }, []);
  const fetchPackageForPromotional = (userid,packageDataPro11) => {

    var column1FilterList2 = state.column1FilterList2;
    setLoading(true);
    shiphypeservice.fetchCustomePaching(userid,2)
          .then(response => {
           console.log("status",response.status);
                if(response.status === true) {
                  setLoading(false);
                setPromotionalPackage(response.data);
                var packageDataPro111 = {};
    var data1=response.data;
    data1.map(orderCouierOp => {
        const { packaggingId, packaggingName } = orderCouierOp;
        packageDataPro111[ packaggingId ] = packaggingName
    })
     setState1({
            packageDataPro11,
            columns: [
              { title: "Item Title", field: "productname", type: "text" },
              { title: "Item SKU", field: "productsku", type: "text" },
             
              { title: 'ShipHype Internal SKU', field: 'shiphypeSku',type: 'text',
     },
     { title: "Qty", field: "productquantity", type: "numeric" },
     {
      title: "HS Code",
      field: "hscode",
      type: "text",
    },
              { title: "Item Value", field: "itemvalue", type: "text" },
              {
                title: "Dangerous Goods",
                field: "dangerousgoods",
                type: "boolean",
                render: (rowData) => (
                  <FormControlLabel
                   
                    
                    control={
                      <Typography
                        style={{
                          marginLeft: "20px",
                          fontSize: "2px",
                          cursor: "pointer",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                        {(() => {
                          if (rowData.dangerousgoods === true) {
                            return (
                              <Text
                                style={{
                                  fontSize: "11px",
                                  fontFamily:
                                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                  transition: "all 0.25s",
                                }}
                              >
                                Yes
                              </Text>
                            );
                          } else {
                            return (
                              <Text
                                style={{
                                  fontSize: "11px",
                                  fontFamily:
                                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                  transition: "all 0.25s",
                                }}
                              >
                                No
                              </Text>
                            );
                          }
                        })()}
                      </Typography>
                    }
                  />
                ),
              },
              {
                title: "Packaging",
                field: "packaging",
                width: 50,
                lookup: packageDataPro11,
              },
              {
                title: 'Promotional Inserts',
                field: 'promotionalpackaging',
                lookup: packageDataPro111,
              },
              {
                title: "Serial Number",
                field: "serialno",
                type: "boolean",
                render: (rowData) => (
                  <FormControlLabel
                    control={
                      <Typography
                        style={{
                          marginLeft: "20px",
                          fontSize: "2px",
                          cursor: "pointer",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                        {(() => {
                          if (rowData.serialno === true) {
                            return (
                              <Text
                                style={{
                                  fontSize: "11px",
                                  fontFamily:
                                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                  transition: "all 0.25s",
                                }}
                              >
                                Yes
                              </Text>
                            );
                          } else {
                            return (
                              <Text
                                style={{
                                  fontSize: "11px",
                                  fontFamily:
                                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                  transition: "all 0.25s",
                                }}
                              >
                                No
                              </Text>
                            );
                          }
                        })()}
                      </Typography>
                    }
                  />
                ),
              },
              { title: "Serial Number Value", field: "serialnovalue", type: "text" },
             
            ],
          });
        } else {
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchPackingList = (userid) => {
    shiphypeservice
      .fetchCustomePaching(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          var packageDataPro11 = {};
          var data = response.data;
          data.map((orderCouierOp) => {
            const { packaggingId, packaggingName } = orderCouierOp;
            packageDataPro11[packaggingId] = packaggingName;
          });
        //  fetchPackageForPromotional(userid,packageDataPro11);
          setState1({
            packageDataPro11,
            columns: [
              { title: "Item Title", field: "productname", type: "text" },
              { title: "Item SKU", field: "productsku", type: "text" },
            
              { title: 'ShipHype Internal SKU', field: 'shiphypeSku',type: 'text',
     },
     { title: "Qty", field: "productquantity", type: "numeric" },
     {
      title: "HS Code",
      field: "hscode",
      type: "text",
    },
              { title: "Item Value", field: "itemvalue", type: "text" },
              {
                title: "Dangerous Goods",
                field: "dangerousgoods",
                type: "boolean",
                render: (rowData) => (
                  <FormControlLabel
                   
                    
                    control={
                      <Typography
                        style={{
                          marginLeft: "20px",
                          fontSize: "2px",
                          cursor: "pointer",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                        {(() => {
                          if (rowData.dangerousgoods === true) {
                            return (
                              <Text
                                style={{
                                  fontSize: "11px",
                                  fontFamily:
                                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                  transition: "all 0.25s",
                                }}
                              >
                                Yes
                              </Text>
                            );
                          } else {
                            return (
                              <Text
                                style={{
                                  fontSize: "11px",
                                  fontFamily:
                                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                  transition: "all 0.25s",
                                }}
                              >
                                No
                              </Text>
                            );
                          }
                        })()}
                      </Typography>
                    }
                  />
                ),
              },
              {
                title: "Packaging",
                field: "packaging",
                width: 50,
                lookup: packageDataPro11,
              },
              {
                title: 'Promotional Inserts',
                field: 'promotionalpackaging',
                width: 50,
                lookup: packageDataPro11,
              },
              {
                title: "Serial Number",
                field: "serialno",
                type: "boolean",
                render: (rowData) => (
                  <FormControlLabel
                    control={
                      <Typography
                        style={{
                          marginLeft: "20px",
                          fontSize: "2px",
                          cursor: "pointer",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                        }}
                      >
                        {(() => {
                          if (rowData.serialno === true) {
                            return (
                              <Text
                                style={{
                                  fontSize: "11px",
                                  fontFamily:
                                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                  transition: "all 0.25s",
                                }}
                              >
                                Yes
                              </Text>
                            );
                          } else {
                            return (
                              <Text
                                style={{
                                  fontSize: "11px",
                                  fontFamily:
                                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                  transition: "all 0.25s",
                                }}
                              >
                                No
                              </Text>
                            );
                          }
                        })()}
                      </Typography>
                    }
                  />
                ),
              },
              { title: "Serial Number Value", field: "serialnovalue", type: "text" },
             
            ],
          });
        } else {
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchOrderDetails = () => {
    //const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchOrderDetails(internalorder_id, userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          if (response.data[0].shipdate === "0001-01-01T00:00:00") {
            response.data[0].shipdate = "";
          } else if (response.data[0].orderstatus === 1) {
            response.data[0].shipdate = "";
          }
          if (response.data[0].externalorderId === 0) {
            response.data[0].externalorderId = "";
          }
         
          // setOrderList(response.data);
          setState((prevState) => {
            const data = [...prevState.data];
            data.push(response.data[0]);
            return { ...prevState, data };
          });
for(let i=0;i<response.data[0].product.length;i++)
{
  if(response.data[0].product[i].itemvalue===0)
  {
    response.data[0].product[i].itemvalue='';
  }
}
          setdataproductData(response.data[0].product);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCallbackfunction = () => {
    props.backButtonRouting("14");
  };
  //Show Toast after click event
  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };

  /**
   * Description:Callback function after api call
   */
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <View className={classes.content}>
      {/* <ScrollView> */}
      <View className={classes.appBarSpacer} />

      <View>
        <Grid item container lg={12}>
          <Grid item lg={5} style={{ marginTop: "5px" }}>
            <Link
              onClick={() => {
                props.handleDashboard("01");
              }}
            >
              <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss}>
              {" "}
              ORDERS / RECEIVE ORDER /
            </Text>
            <Text style={popUpStyle.breadCrundCss2}>
              {" "}
              SELECTED ORDER DETAIL {"\n"}{" "}
            </Text>
          </Grid>
          <Grid item lg={3}></Grid>
        </Grid>
      </View>

      <Grid container justify="space-between" spacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "700",
              // marginLeft:'10px',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              color: "#001737",

              transition: "all 0.25s",
            }}
          >
            Selected Order Details
          </Text>
        </Grid>
        <Grid item xs={12} md={4} lg={4}></Grid>
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
        >
         
            <Grid style={{marginLeft:230}}>
              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                // className={classes.profileMargin}
                onClick={() => {
                  handleCallbackfunction();
                }}
              >
                Back
              </ColorButton>
           
          </Grid>
        </Grid>
      </Grid>
      <View className={classes.paper9}>
        <Grid justify="center">
          <ProgressBar loading={loading} />
        </Grid>

        <View style={popUpStyle.paddingSide}>
          <MaterialTable
            
            style={{ padding: "0px",marginTop: '10px'}}
            //  title="."
            columns={state.columns}
            data={state.data}
            icons={tableIcons}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,
              Toolbar: (props) => (
                <View
                  style={{
                    backgroundColor: "#fff",
                    height: "45px",
                    fontSize: "12px",
                    padding: 0,
                  }}
                >
                  <MTableToolbar
                    {...props}
                    style={{
                      paddingBottom: "0px",
                      paddingTop: "0px",
                    }}
                  />
                </View>
              ),
            }}
            localization={{
              header: {
                actions: "ACTION",
              },
            }}
            options={{
              paging: false,
              showTitle: false,
              doubleHorizontalScroll: true,
              maxBodyHeight: 390,
              headerStyle: { position: "sticky", top: 0 },
              pageSize: 7,
              pageSizeOptions: [6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
              addRowPosition: "first",
              actionsColumnIndex: -1,
              exportFileName: "Product Table",
              headerStyle: {
                backgroundColor: "#cccccc",
                color: "#000",

                textTransform: "uppercase",
                width: 20,
                whiteSpace: "nowrap",
                textAlign: "left",
                flexDirection: "row",
                overflow: "hidden",
                textOverflow: "ellipsis",
                paddingLeft: 5,
                paddingTop: 8,
                paddingBottom: 8,
                paddingRight: 0,
                fontSize: "12px",
                //     backgroundColor: theme.palette.primary.table,
                fontWeight: "bold",
                //color: theme.palette.primary.main,
              },
              cellStyle: {
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #cccccc",

                width: 20,
                whiteSpace: "nowrap",
                textAlign: "left",
                flexDirection: "row",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "11px",
                paddingLeft: 5,
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 5,
              },
              rowStyle: {
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #cccccc",

                width: 26,
                whiteSpace: "nowrap",
                textAlign: "left",
                flexDirection: "row",
                overflow: "hidden",
                textOverflow: "ellipsis",
                paddingLeft: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingRight: 0,
              },
              search: false,
              exportButton: false,
            }}
          />

          <Grid
            container
            justify="space-between"
            spacing={2}
            style={{ marginTop: "10px" }}
          >
            <Grid item xs={12} md={10} lg={10}>
              <MaterialTable
                style={{ padding: "0px" }}
                title={
                  <Text
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      color: "#001737",

                      transition: "all 0.25s",
                    }}
                  >
                    Order Product
                  </Text>
                }
                columns={state1.columns}
                data={dataproductData}
                icons={tableIcons}
                components={{
                  Container: (props) => <Paper {...props} elevation={0} />,
                  Toolbar: (props) => (
                    <View
                      style={{
                        backgroundColor: "#fff",
                        height: "45px",
                        fontSize: "12px",
                        padding: 0,
                      }}
                    >
                      <MTableToolbar
                        {...props}
                        style={{
                          paddingBottom: "0px",
                          paddingTop: "0px",
                        }}
                      />
                    </View>
                  ),
                }}
                localization={{
                  header: {
                    actions: "ACTION",
                  },
                  toolbar: {
                    searchPlaceholder: "Search Order Product",
                  },
                }}
                options={{
                  paging: false,
                  showTitle: true,
                  doubleHorizontalScroll: true,
                  maxBodyHeight: 390,
                  headerStyle: { position: "sticky", top: 0 },
                  pageSize: 7,
                  pageSizeOptions: [
                    6,
                    12,
                    18,
                    20,
                    30,
                    40,
                    50,
                    60,
                    70,
                    80,
                    90,
                    100,
                  ],
                  addRowPosition: "first",
                  actionsColumnIndex: -1,
                  exportFileName: "Product Table",
                  headerStyle: {
                    backgroundColor: "#cccccc",
                    color: "#000",

                    textTransform: "uppercase",
                    width: 20,
                    whiteSpace: "nowrap",
                    textAlign: "left",
                    flexDirection: "row",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingLeft: 5,
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingRight: 0,
                    fontSize: "12px",
                    //     backgroundColor: theme.palette.primary.table,
                    fontWeight: "bold",
                    //color: theme.palette.primary.main,
                  },
                  cellStyle: {
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #cccccc",

                    width: 20,
                    whiteSpace: "nowrap",
                    textAlign: "left",
                    flexDirection: "row",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "11px",
                    paddingLeft: 5,
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingRight: 5,
                  },
                  rowStyle: {
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #cccccc",

                    width: 26,
                    whiteSpace: "nowrap",
                    textAlign: "left",
                    flexDirection: "row",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingLeft: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingRight: 0,
                  },
                  search: true,
                  exportButton: false,
                }}
              />
            </Grid>
          </Grid>
          {showToast(open, msg, type)}
        </View>
      </View>

      {/* </ScrollView> */}
    </View>
  );
}