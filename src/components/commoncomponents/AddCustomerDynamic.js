import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import * as shiphypeservice from './ShipService/shiphype_service';
import StepConnector from '@material-ui/core/StepConnector';
import Toast from './feedback/Toast';
import DateFnsUtils from '@date-io/date-fns';
import ProgressBar from './feedback//ProgressBar';
import Link from '@material-ui/core/Link';
import popUpStyle from './style/popUpStyle';

import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import Paper from "@material-ui/core/Paper";
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
import AddIcon from "@material-ui/icons/Add";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
/**For Style */
import validate from 'validate.js';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CustomerSheet from "../../assets/icons/CustomerSheet.xlsx";

const ColorButtonAdd = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    // marginTop:'3%',
    height: "100%",
    padding: "3px",
    width: "130px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#0168fa",
    //  paddingLeft: '22%',
    //  paddingRight: '22%',
    "&:hover": {
      color: "#fff",
      backgroundColor: "#0168fa",
    },
  },
}))(Button);

const tableIcons = {
  Add: () => (
    <ColorButtonAdd
      size="large"
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
    >
      Customer
    </ColorButtonAdd>
  ),
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
};
const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})(MTableToolbar);

const schema = {
    firstname: { 
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 32
      }
    },
    lastname: { 
        presence: { allowEmpty: false, message: 'is required' },
        length: {
          maximum: 32
        }
      },
      addressline1:{
    presence: { allowEmpty: false, message: 'is required' },
    
    length: {
      maximum: 64
    }
   },
  
   city:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100,
      
    }
   },
   state:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100,
      
    }
   },
   country:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100,
      
    }
   },
   phone:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 10,
      minimum:10
    }
   },
   zip:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 8
    }
   },
   email:{
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
   },
   
  };

  const stateDataCanada = [
    {
      id: 2,
      code: "Prairies",
      label: "AB",
    } , {
      id: 2,
      code: "British Columbia",
      label: "BC",
    } , {
      id: 2,
      code: "Prairies",
      label: "MB",
    } , {
      id: 2,
      code: "Atlantic",
      label: "NB",
    }   , {
      id: 2,
      code: "Atlantic",
      label: "NS",
    }  ,
    {
      id: 2,
      code: "Atlantic",
      label: "NL",
    }  , {
      id: 2,
      code: "Territories",
      label: "NT",
    }  , {
      id: 2,
      code: "Territories",
      label: "NU",
    } ,{
      id: 2,
      code: "Ontario",
      label: "ON",
    } , {
      id: 2,
      code: "Atlantic",
      label: "PE",
    } ,{
      id: 2,
      code: "Quebec",
      label: "QC",
    } , {
      id: 2,
      code: "Prairies",
      label: "SK",
    } , 
    {
      id: 2,
      code: "Territories",
      label: "YT",
    }, 
  ];
  const stateDataUS = [
    {
      id: 2,
      code: "Alabama",
      label: "AL",
    } , {
      id: 2,
      code: "Alaska",
      label: "AK",
    } , {
      id: 2,
      code: "Arizona",
      label: "AZ",
    } , {
      id: 2,
      code: "Arkansas",
      label: "AR",
    } , {
      id: 2,
      code: "California",
      label: "CA",
    }  , {
      id: 2,
      code: "Colorado",
      label: "CO",
    }  , {
      id: 2,
      code: "Connecticut",
      label: "CT",
    }  , {
      id: 2,
      code: "Delaware",
      label: "DE",
    }    , {
      id: 2,
      code: "Florida",
      label: "FL",
    }  , {
      id: 2,
      code: "Georgia",
      label: "GA",
    }  , {
      id: 2,
      code: "Hawaii",
      label: "HI",
    }  , {
      id: 2,
      code: "Idaho",
      label: "ID",
    } 
    , {
      id: 2,
      code: "Illinois",
      label: "IL",
    } , {
      id: 2,
      code: "Indiana",
      label: "IN",
    } , {
      id: 2,
      code: "Iowa",
      label: "IA",
    } , {
      id: 2,
      code: "Kansas",
      label: "KS",
    } , {
      id: 2,
      code: "Kentucky",
      label: "KY",
    } , {
      id: 2,
      code: "Louisiana",
      label: "LA",
    } , {
      id: 2,
      code: "Maine",
      label: "ME",
    } , {
      id: 2,
      code: "Maryland",
      label: "MD",
    } 
    , {
      id: 2,
      code: "Massachusetts",
      label: "MA",
    } , {
      id: 2,
      code: "Michigan",
      label: "MI",
    } , {
      id: 2,
      code: "Minnesota",
      label: "MN",
    } , {
      id: 2,
      code: "Mississippi",
      label: "MS",
    } , {
      id: 2,
      code: "Missouri",
      label: "MO",
    } , {
      id: 2,
      code: "Montana",
      label: "MT",
    } , {
      id: 2,
      code: "Nebraska",
      label: "NE",
    } , {
      id: 2,
      code: "Nevada",
      label: "NV",
    } , {
      id: 2,
      code: "New Hampshire",
      label: "NH",
    } , {
      id: 2,
      code: "New Jersey",
      label: "NJ",
    } , {
      id: 2,
      code: "New Mexico",
      label: "NM",
    } , {
      id: 2,
      code: "New York",
      label: "NY",
    } , {
      id: 2,
      code: "North Carolina",
      label: "NC",
    } , {
      id: 2,
      code: "North Dakota",
      label: "ND",
    } , {
      id: 2,
      code: "Ohio",
      label: "OH",
    } , {
      id: 2,
      code: "Oklahoma",
      label: "OK",
    } , {
      id: 2,
      code: "Oregon",
      label: "OR",
    } , {
      id: 2,
      code: "Pennsylvania",
      label: "PA",
    } , {
      id: 2,
      code: "Rhode Island",
      label: "RI",
    } , {
      id: 2,
      code: "South Carolina",
      label: "SC",
    } , {
      id: 2,
      code: "South Dakota",
      label: "SD",
    } , {
      id: 2,
      code: "Tennessee",
      label: "TN",
    } , {
      id: 2,
      code: "Texas",
      label: "TX",
    } , {
      id: 2,
      code: "Utah",
      label: "UT",
    } , {
      id: 2,
      code: "Vermont",
      label: "VT",
    } , {
      id: 2,
      code: "Virginia",
      label: "VA",
    } , {
      id: 2,
      code: "Washington",
      label: "WA",
    } , {
      id: 2,
      code: "West Virginia",
      label: "WV",
    } , {
      id: 2,
      code: "Wisconsin",
      label: "WI",
    } , {
      id: 2,
      code: "Wyoming",
      label: "WY",
    } 
    , {
      id: 2,
      code: "American Samoa",
      label: "AS",
    } 
    , {
      id: 2,
      code: "District of Columbia",
      label: "DC",
    } 
    , {
      id: 2,
      code: "Federated States of Micronesia ",
      label: "FM",
    } 
    , {
      id: 2,
      code: "Guam",
      label: "GU",
    } 
    , {
      id: 2,
      code: "Marshall Islands",
      label: "MH",
    } 
    , {
      id: 2,
      code: "Northern Mariana Islands",
      label: "MP",
    }  , {
      id: 2,
      code: "Palau",
      label: "PW",
    }  , {
      id: 2,
      code: "Puerto Rico",
      label: "PR",
    }  , {
      id: 2,
      code: "Virgin Islands",
      label: "VI",
    } 
  ];
  const stateData = [
      {
      id: 2,
      code: "Atlantic",
      label: "NL",
    }  , {
      id: 2,
      code: "Atlantic",
      label: "PE",
    }  , {
      id: 2,
      code: "Atlantic",
      label: "NS",
    }  , {
      id: 2,
      code: "Atlantic",
      label: "NB",
    }  , {
      id: 2,
      code: "Quebec",
      label: "QC",
    } , {
      id: 2,
      code: "Ontario",
      label: "ON",
    } , {
      id: 2,
      code: "Prairies",
      label: "MB",
    } , {
      id: 2,
      code: "Prairies",
      label: "SK",
    } , {
      id: 2,
      code: "Prairies",
      label: "AB",
    } , {
      id: 2,
      code: "British Columbia",
      label: "BC",
    } ,
    {
      id: 2,
      code: "Territories",
      label: "YT",
    } , {
      id: 2,
      code: "Territories",
      label: "NU",
    } , {
      id: 2,
      code: "Territories",
      label: "NT",
    } , {
      id: 2,
      code: "Alabama",
      label: "AL",
    } , {
      id: 2,
      code: "Alaska",
      label: "AK",
    } , {
      id: 2,
      code: "Arizona",
      label: "AZ",
    } , {
      id: 2,
      code: "Arkansas",
      label: "AR",
    } , {
      id: 2,
      code: "Armed Forces Pacific",
      label: "AP",
    } , {
      id: 2,
      code: "Armed Forces, Americas",
      label: "AA",
    } , {
      id: 2,
      code: "Armed Forces, Europe & Other",
      label: "AE",
    }  , {
      id: 2,
      code: "California",
      label: "CA",
    }  , {
      id: 2,
      code: "Colorado",
      label: "CO",
    }  , {
      id: 2,
      code: "Connecticut",
      label: "CT",
    }  , {
      id: 2,
      code: "Delaware",
      label: "DE",
    }  , {
      id: 2,
      code: "District Of Columbia",
      label: "DC",
    }  , {
      id: 2,
      code: "Florida",
      label: "FL",
    }  , {
      id: 2,
      code: "Georgia",
      label: "GA",
    }  , {
      id: 2,
      code: "Hawaii",
      label: "HI",
    }  , {
      id: 2,
      code: "Idaho",
      label: "ID",
    } 
    , {
      id: 2,
      code: "Illinois",
      label: "IL",
    } , {
      id: 2,
      code: "Indiana",
      label: "IN",
    } , {
      id: 2,
      code: "Iowa",
      label: "IA",
    } , {
      id: 2,
      code: "Kansas",
      label: "KS",
    } , {
      id: 2,
      code: "Kentucky",
      label: "KY",
    } , {
      id: 2,
      code: "Louisiana",
      label: "LA",
    } , {
      id: 2,
      code: "Maine",
      label: "ME",
    } , {
      id: 2,
      code: "Maryland",
      label: "MD",
    } 
    , {
      id: 2,
      code: "Massachusetts",
      label: "MA",
    } , {
      id: 2,
      code: "Michigan",
      label: "MI",
    } , {
      id: 2,
      code: "Minnesota",
      label: "MN",
    } , {
      id: 2,
      code: "Mississippi",
      label: "MS",
    } , {
      id: 2,
      code: "Missouri",
      label: "MO",
    } , {
      id: 2,
      code: "Montana",
      label: "MT",
    } , {
      id: 2,
      code: "Nebraska",
      label: "NE",
    } , {
      id: 2,
      code: "Nevada",
      label: "NV",
    } , {
      id: 2,
      code: "New Hampshire",
      label: "NH",
    } , {
      id: 2,
      code: "New Jersey",
      label: "NJ",
    } , {
      id: 2,
      code: "New Mexico",
      label: "NM",
    } , {
      id: 2,
      code: "New York",
      label: "NY",
    } , {
      id: 2,
      code: "North Carolina",
      label: "NC",
    } , {
      id: 2,
      code: "North Dakota",
      label: "ND",
    } , {
      id: 2,
      code: "Ohio",
      label: "OH",
    } , {
      id: 2,
      code: "Oklahoma",
      label: "OK",
    } , {
      id: 2,
      code: "Oregon",
      label: "OR",
    } , {
      id: 2,
      code: "Pennsylvania",
      label: "PA",
    } , {
      id: 2,
      code: "Rhode Island",
      label: "RI",
    } , {
      id: 2,
      code: "South Carolina",
      label: "SC",
    } , {
      id: 2,
      code: "South Dakota",
      label: "SD",
    } , {
      id: 2,
      code: "Tennessee",
      label: "TN",
    } , {
      id: 2,
      code: "Texas",
      label: "TX",
    } , {
      id: 2,
      code: "Utah",
      label: "UT",
    } , {
      id: 2,
      code: "Vermont",
      label: "VT",
    } , {
      id: 2,
      code: "Virginia",
      label: "VA",
    } , {
      id: 2,
      code: "Washington",
      label: "WA",
    } , {
      id: 2,
      code: "West Virginia",
      label: "WV",
    } , {
      id: 2,
      code: "Wisconsin",
      label: "WI",
    } , {
      id: 2,
      code: "Wyoming",
      label: "WY",
    } , {
      id: 2,
      code: "Virgin Islands",
      label: "VI",
    }, {
      id: 1,
      code: "Australian Capital Territory",
      label: "ACT",
    }
    , {
      id: 2,
      code: "New South Wales",
      label: "NSW",
    }
    , {
      id: 2,
      code: "Northern Territory",
      label: "NT",
    }
    , {
      id: 2,
      code: "Queensland",
      label: "QLD",
    }
    , {
      id: 2,
      code: "South Australia",
      label: "SA",
    }
    , {
      id: 2,
      code: "Tasmania",
      label: "TAS",
    }
    , {
      id: 2,
      code: "Victoria",
      label: "VIC",
    }
    , {
      id: 2,
      code: "Western Australia",
      label: "WA",
    } , {
      id: 2,
      code: "Acre",
      label: "	AC",
    } , {
      id: 2,
      code: "Alagoas",
      label: "AL",
    } , {
      id: 2,
      code: "Amapá",
      label: "AP",
    }
    , {
      id: 2,
      code: "Amazonas",
      label: "AM",
    } , {
      id: 2,
      code: "Bahia",
      label: "BA",
    } 
    , {
      id: 2,
      code: "Ceará",
      label: "CE",
    }
    , {
      id: 2,
      code: "Distrito Federal",
      label: "DF",
    } , {
      id: 2,
      code: "Espírito Santo",
      label: "ES",
    } , {
      id: 2,
      code: "Goias",
      label: "GO",
    } , {
      id: 2,
      code: "Maranhao",
      label: "MA",
    } , {
      id: 2,
      code: "Mato Grosso",
      label: "MT",
    } , {
      id: 2,
      code: "Mato Grosso do Sul",
      label: "MS",
    }, {
      id: 2,
      code: "Minas Gerais",
      label: "MG",
    } , {
      id: 2,
      code: "Pará",
      label: "PA",
    } , {
      id: 2,
      code: "Paraíba",
      label: "PB",
    } , {
      id: 2,
      code: "Paraná",
      label: "PR",
    } , {
      id: 2,
      code: "Pernambuco",
      label: "PE",
    } , {
      id: 2,
      code: "Piauí",
      label: "PI",
    } 
    , {
      id: 2,
      code: "Rio de Janeiro",
      label: "RJ",
    } 
    , {
      id: 2,
      code: "Rio Grande do Norte",
      label: "RN",
    } 
    , {
      id: 2,
      code: "Rio Grande do Sul",
      label: "RS",
    } 
    , {
      id: 2,
      code: "Rondônia",
      label: "RO",
    } 
    , {
      id: 2,
      code: "Roraima",
      label: "RR",
    } 
    , {
      id: 2,
      code: "Santa Catarina",
      label: "SC",
    }  , {
      id: 2,
      code: "Sao Paulo",
      label: "SP",
    }  , {
      id: 2,
      code: "Sergipe",
      label: "SE",
    }  , {
      id: 2,
      code: "Tocantins",
      label: "TO",
    }  , {
      id: 2,
      code: "Alberta",
      label: "AB",
    }  
  ];
  const countryData = [
    {
      id: 1,
      code:"CA",
      label: "Canada",
    },
    
    {
      id: 3,
      code:"US",
      label: "United States",
    },
    {
      id: 2,
      code:"GB",
      label: "United Kingdom",
    },
    {
      id: 4,
      code:"AF",
      label: "Afghanistan",
    },
    {
      id: 5,
      code:"AL",
      label: "Albania",
    },
    {
      id: 6,
      code:"DZ",
      label: "Algeria",
    },
    {
      id: 7,
      code:"AS",
      label: "American Samoa",
    },
    {
      id: 8,
      code:"AD",
      label: "Andorra",
    },
    {
      id: 9,
      code:"AO",
      label: "Angola",
    },
    {
      id: 10,
      code:"AI",
      label: "Anguilla",
    },
    {
      id: 11,
      code:"AG",
      label: "Antigua & Barbuda",
    },
    {
      id: 12,
      code:"AR",
      label: "Argentina",
    },
    {
      id: 13,
      code:"AM",
      label: "Armenia",
    },
    {
      id: 14,
      code:"AW",
      label: "Aruba",
    },
    {
      id: 15,
      code:"AU",
      label: "Australia",
    },
    {
      id: 16,
      code:"AT",
      label: "Austria",
    },
    {
      id: 17,
      code:"AZ",
      label: "Azerbaijan",
    },
    {
      id: 18,
      code:"BS",
      label: "Bahamas",
    },
    {
      id: 19,
      code:"BH",
      label: "Bahrain",
    },
    {
      id: 20,
      code:"BD",
      label: "Bangladesh",
    },
    {
      id: 21,
      code:"BB",
      label: "Barbados",
    },
    {
      id: 22,
      code:"BY",
      label: "Belarus",
    },
    {
      id: 23,
      code:"BE",
      label: "Belgium",
    },
    {
      id: 24,
      code:"BZ",
      label: "Belize",
    },
    {
      id: 25,
      code:"BJ",
      label: "Benin",
    },
    {
      id: 26,
      code:"BJ",
      label: "Benin",
    },
    {
      id: 27,
      code:"BM",
      label: "Bermuda",
    },
    {
      id: 28,
      code:"BM",
      label: "Bhutan",
    },
    {
      id: 29,
      code:"BO",
      label: "Bolivia",
    },
    {
      id: 30,
      code:"BA",
      label: "Bosnia & Herzegovina",
    },
    {
      id: 31,
      code:"BW",
      label: "Botswana",
    },
    {
      id: 32,
      code:"BR",
      label: "Brazil",
    },
    {
      id: 33,
      code:"IO",
      label: "British Indian Ocean Ter",
    },
    {
      id: 34,
      code:"",
      label: "Brunei",
    },
    {
      id: 35,
      code:"BG",
      label: "Bulgaria",
    },
    {
      id: 36,
      code:"BF",
      label: "Burkina Faso",
    },
    {
      id: 37,
      code:"",
      label: "Burundi",
    },
    {
      id: 38,
      code:"KH",
      label: "Cambodia",
    },
    {
      id: 39,
      code:"",
      label: "Cameroon",
    },
    {
      id: 40,
      code:"",
      label: "Canary Islands",
    },
    {
      id: 41,
      code:"",
      label: "Cape Verde",
    },
    {
      id: 42,
      code:"",
      label: "Cayman Islands",
    },
    {
      id: 43,
      code:"",
      label: "Central African Republic",
    },
    {
      id: 44,
      code:"",
      label: "Chad",
    },
    {
      id: 45,
      code:"",
      label: "Channel Islands",
    },
  
    {
      id: 46,
      code:"",
      label: "Chile",
    },
    {
      id: 47,
      code:"",
      label: "China",
    },
    {
      id: 48,
      code:"",
      label: "Christmas Island",
    },
    {
      id: 49,
      code:"",
      label: "Cocos Island",
    },
    {
      id: 50,
      code:"",
      label: "Colombia",
    },
    {
      id: 51,
      code:"",
      label: "Comoros",
    },
    {
      id: 52,
      code:"",
      label: "Congo",
    },
    {
      id: 53,
      code:"",
      label: "Cook Islands",
    },
    {
      id: 54,
      code:"",
      label: "Costa Rica",
    },
    {
      id: 55,
      code:"",
      label: "Cote DIvoire",
    },
    {
      id: 56,
      code:"",
      label: "Croatia",
    },
    {
      id: 57,
      code:"",
      label: "Cuba",
    },
    {
      id: 58,
      code:"",
      label: "Curacao",
    },
    {
      id: 59,
      code:"",
      label: "Cyprus",
    },
    {
      id: 60,
      code:"",
      label: "Czech Republic",
    },
    {
      id: 61,
      code:"",
      label: "Denmark",
    },
    {
      id: 62,
      code:"",
      label: "Djibouti",
    },
    {
      id: 63,
      code:"",
      label: "Dominica",
    },
    {
      id: 64,
      code:"",
      label: "Dominican Republic",
    },
    {
      id: 65,
      code:"",
      label: "East Timor",
    },
    {
      id: 66,
      code:"",
      label: "Ecuador",
    },
    {
      id: 67,
      code:"",
      label: "Egypt",
    },
    {
      id: 68,
      code:"",
      label: "El Salvador",
    },
    {
      id: 69,
      code:"",
      label: "Equatorial Guinea",
    },
    {
      id: 70,
      code:"",
      label: "Eritrea",
    },
    {
      id: 71,
      code:"",
      label: "Estonia",
    },
    {
      id: 72,
      code:"",
      label: "Ethiopia",
    },
    {
      id: 73,
      code:"",
      label: "Falkland Islands",
    },
    {
      id: 74,
      code:"",
      label: "Faroe Islands",
    },
    {
      id: 75,
      code:"",
      label: "Fiji",
    },
    {
      id: 76,
      code:"",
      label: "Finland",
    },
    {
      id: 77,
      code:"",
      label: "France",
    },
    {
      id: 78,
      code:"",
      label: "French Guiana",
    },
    {
      id: 79,
      code:"",
      label: "French Polynesia",
    },
    {
      id: 80,
      code:"",
      label: "French Southern Ter",
    },
    {
      id: 81,
      code:"",
      label: "Gabon",
    },
    {
      id: 82,
      code:"",
      label: "Gambia",
    },
    {
      id: 83,
      code:"",
      label: "Georgia",
    },
    {
      id: 84,
      code:"",
      label: "Germany",
    },
    {
      id: 85,
      code:"",
      label: "Ghana",
    },
    {
      id: 86,
      code:"",
      label: "Gibraltar",
    },
    {
      id: 87,
      code:"",
      label: "Great Britain",
    },
    {
      id: 88,
      code:"",
      label: "Greece",
    },
    {
      id: 89,
      code:"",
      label: "Greenland",
    },
    {
      id: 90,
      code:"",
      label: "Grenada",
    },
    {
      id: 91,
      code:"",
      label: "Guadeloupe",
    },
    {
      id: 92,
      code:"",
      label: "Guam",
    },
    {
      id: 93,
      code:"",
      label: "Guatemala",
    },
    {
      id: 94,
      code:"",
      label: "Guinea",
    },
    {
      id: 95,
      code:"",
      label: "Guyana",
    },
    {
      id: 96,
      code:"",
      label: "Haiti",
    },
    {
      id: 97,
      code:"",
      label: "Hawaii",
    },
    {
      id: 98,
      code:"",
      label: "Honduras",
    },
    {
      id: 99,
      code:"",
      label: "Hong Kong",
    },
    {
      id: 100,
      code:"",
      label: "Hungary",
    },
    {
      id: 101,
      code:"",
      label: "Iceland",
    },
    {
      id: 102,
      code:"",
      label: "Indonesia",
    },
    {
      id: 103,
      code:"IN",
      label: "India",
    },
    {
      id: 104,
      code:"",
      label: "Iran",
    },
    {
      id: 105,
      code:"",
      label: "Iraq",
    },
    {
      id: 106,
      code:"",
      label: "Ireland",
    },
    {
      id: 107,
      code:"",
      label: "Isle of Man",
    },
    {
      id: 108,
      code:"",
      label: "Israel",
    },
    {
      id: 109,
      code:"",
      label: "Italy",
    },
    {
      id: 110,
      code:"",
      label: "Jamaica",
    },
    {
      id: 111,
      code:"",
      label: "Japan",
    },
    {
      id: 112,
      code:"",
      label: "Jordan",
    },
    {
      id: 113,
      code:"",
      label: "Kazakhstan",
    },
    {
      id: 114,
      code:"",
      label: "Kenya",
    },
    {
      id: 115,
      code:"",
      label: "Kiribati",
    },
    {
      id: 116,
      code:"",
      label: "Korea North",
    },
    {
      id: 117,
      code:"",
      label: "Korea South",
    },
    {
      id: 118,
      code:"",
      label: "Kuwait",
    },
    {
      id: 119,
      code:"",
      label: "Kyrgyzstan",
    },
    {
      id: 120,
      code:"",
      label: "Laos",
    },
    {
      id: 121,
      code:"",
      label: "Latvia",
    },
    {
      id: 122,
      code:"",
      label: "Lebanon",
    },
    {
      id: 123,
      code:"",
      label: "Lesotho",
    },
    {
      id: 124,
      code:"",
      label: "Liberia",
    },
    {
      id: 125,
      code:"",
      label: "Libya",
    },
    {
      id: 126,
      code:"",
      label: "Liechtenstein",
    },
    {
      id: 127,
      code:"",
      label: "Lithuania",
    },
    {
      id: 128,
      code:"",
      label: "Luxembourg",
    },
    {
      id: 129,
      code:"",
      label: "Macau",
    },
    {
      id: 130,
      code:"",
      label: "Macedonia",
    },
    {
      id: 131,
      code:"",
      label: "Madagascar",
    },
    {
      id: 132,
      code:"",
      label: "Malaysia",
    },
    {
      id: 133,
      code:"",
      label: "Malawi",
    },
    {
      id: 134,
      code:"",
      label: "Maldives",
    },
    {
      id: 135,
      code:"",
      label: "Mali",
    },
    {
      id: 136,
      code:"",
      label: "Malta",
    },
    {
      id: 137,
      code:"",
      label: "Marshall Islands",
    },
    {
      id: 138,
      code:"",
      label: "Martinique",
    },
    {
      id: 139,
      code:"",
      label: "Mauritania",
    },
    {
      id: 140,
      code:"",
      label: "Mauritius",
    },
    {
      id: 141,
      code:"",
      label: "Mayotte",
    },
    {
      id: 142,
      code:"",
      label: "Mexico",
    },
    {
      id: 143,
      code:"",
      label: "Midway Islands",
    },
    {
      id: 144,
      code:"",
      label: "Moldova",
    },
    {
      id: 145,
      code:"",
      label: "Monaco",
    },
    {
      id: 146,
      code:"",
      label: "Mongolia",
    },
    {
      id: 147,
      code:"",
      label: "Montserrat",
    },
    {
      id: 148,
      code:"",
      label: "Morocco",
    },
    {
      id: 149,
      code:"",
      label: "Mozambique",
    },
    {
      id: 150,
      code:"",
      label: "Myanmar",
    },
    {
      id: 151,
      code:"",
      label: "Nambia",
    },
    {
      id: 152,
      code:"",
      label: "Nauru",
    },
    {
      id: 153,
      code:"",
      label: "Nepal",
    },
    {
      id: 154,
      code:"",
      label: "Netherland Antilles",
    },
    {
      id: 155,
      code:"",
      label: "Netherlands (Holland, Europe)",
    },
    {
      id: 156,
      code:"",
      label: "Nevis",
    },
    {
      id: 157,
      code:"",
      label: "New Caledonia",
    },
    {
      id: 158,
      code:"",
      label: "New Zealand",
    },
    {
      id: 159,
      code:"",
      label: "Nicaragua",
    },
    {
      id: 160,
      code:"",
      label: "Niger",
    },
    {
      id: 161,
      code:"",
      label: "Nigeria",
    },
    {
      id: 162,
      code:"",
      label: "Niue",
    },
    {
      id: 163,
      code:"",
      label: "Norfolk Island",
    },
    {
      id: 164,
      code:"",
      label: "Norway",
    },
    {
      id: 165,
      code:"",
      label: "Oman",
    },
    {
      id: 166,
      code:"",
      label: "Pakistan",
    },
    {
      id: 167,
      code:"",
      label: "Palau Island",
    },
    {
      id: 168,
      code:"",
      label: "Palestine",
    },
    {
      id: 169,
      code:"",
      label: "Panama",
    },
    {
      id: 170,
      code:"",
      label: "Papua New Guinea",
    },
    {
      id: 171,
      code:"",
      label: "Paraguay",
    },
    {
      id: 172,
      code:"",
      label: "Peru",
    },
    {
      id: 173,
      code:"",
      label: "hilippines",
    },
    {
      id: 174,
      code:"",
      label: "Pitcairn Island",
    },
    {
      id: 175,
      code:"",
      label: "Poland",
    },
    {
      id: 176,
      code:"",
      label: "Portugal",
    },
    {
      id: 177,
      code:"",
      label: "Puerto Rico",
    },
    {
      id: 178,
      code:"",
      label: "Qatar",
    },
    {
      id: 179,
      code:"",
      label: "Republic of Montenegro",
    },
    {
      id: 180,
      code:"",
      label: "Republic of Serbia",
    },
    {
      id: 181,
      code:"",
      label: "Reunion",
    },
    {
      id: 182,
      code:"",
      label: "Romania",
    },
    {
      id: 183,
      code:"",
      label: "Russia",
    },
    {
      id: 184,code:"",
      label: "Rwanda",
    },
    {
      id: 185,
      code:"",
      label: "St Barthelemy",
    },
    {
      id: 186,
      code:"",
      label: "St Eustatius",
    },
    {
      id: 187,
      code:"",
      label: "St Helena",
    },
    {
      id: 188,
      code:"",
      label: "St Kitts-Nevis",
    },
    {
      id: 189,
      code:"",
      label: "St Lucia",
    },
    {
      id: 190,
      code:"",
      label: "St Maarten",
    },
    {
      id: 191,
      code:"",
      label: "St Pierre & Miquelon",
    },
    {
      id: 192,
      code:"",
      label: "St Vincent & Grenadines",
    },
    {
      id: 193,
      code:"",
      label: "Saipan",
    },
    {
      id: 194,
      code:"",
      label: "Samoa",
    },
    {
      id: 195,
      code:"",
      label: "Samoa American",
    },
    {
      id: 196,
      code:"",
      label: "San Marino",
    },
    {
      id: 197,
      code:"",
      label: "Sao Tome & Principe",
    },
    {
      id: 198,
      code:"",
      label: "Saudi Arabia",
    },
    {
      id: 199,
      code:"",
      label: "Senegal",
    },
    {
      id: 200,
      code:"",
      label: "Seychelles",
    },
    {
      id: 201,
      code:"",
      label: "Sierra Leone",
    },
    {
      id: 202,
      code:"",
      label: "Singapore",
    },
    {
      id: 203,
      code:"",
      label: "Slovakia",
    },
    {
      id: 204,
      code:"",
      label: "Slovenia",
    },
    {
      id: 205,
      code:"",
      label: "Solomon Islands",
    },
    {
      id: 206,
      code:"",
      label: "Somalia",
    },
    {
      id: 207,
      code:"",
      label: "South Africa",
    },
    {
      id: 208,
      code:"",
      label: "Spain",
    },
    {
      id: 209,
      code:"",
      label: "Sri Lanka",
    },
    {
      id: 210,
      code:"",
      label: "Sudan",
    },
    {
      id: 211,
      code:"",
      label: "Suriname",
    },
    {
      id: 212,
      code:"",
      label: "Swaziland",
    },
    {
      id: 213,
      code:"",
      label: "Sweden",
    },
    {
      id: 214,
      code:"",
      label: "Switzerland",
    },
    {
      id: 215,
      code:"",
      label: "Syria",
    },
    {
      id: 216,
      code:"",
      label: "Tahiti",
    },
    {
      id: 217,
      code:"",
      label: "Taiwan",
    },
    {
      id: 218,
      code:"",
      label: "Tajikistan",
    },
    {
      id: 219,
      code:"",
      label: "Tanzania",
    },
    {
      id: 220,
      code:"",
      label: "Thailand",
    },
    {
      id: 221,
      code:"",
      label: "Togo",
    },
    {
      id: 222,
      code:"",
      label: "Tokelau",
    },
    {
      id: 223,
      code:"",
      label: "Tonga",
    },
    {
      id: 224,
      code:"",
      label: "Trinidad & Tobago",
    },
    {
      id: 225,
      code:"",
      label: "Tunisia",
    },
    {
      id: 226,
      code:"",
      label: "Turkey",
    },
    {
      id: 227,
      code:"",
      label: "Turkmenistan",
    },
    {
      id: 228,
      code:"",
      label: "Turks & Caicos Is",
    },
    {
      id: 229,
      code:"",
      label: "Tuvalu",
    },
    {
      id: 230,
      code:"",
      label: "Uganda",
    },
    {
      id: 231,
      code:"",
      label: "Ukraine",
    },
    {
      id: 232,
      code:"",
      label: "United Arab Emirates",
    },
    {
      id: 233,
      code:"",
      label: "Uruguay",
    },
    {
      id: 234,
      code:"",
      label: "Uzbekistan",
    },
    {
      id: 235,
      code:"",
      label: "Vanuatu",
    },
    {
      id: 236,
      code:"",
      label: "Vatican City State",
    },
    {
      id: 237,
      code:"",
      label: "Venezuela",
    },
    {
      id: 238,
      code:"",
      label: "Vietnam",
    },
    {
      id: 239,
      code:"",
      label: "Virgin Islands (Brit)",
    },
    {
      id: 240,
      code:"",
      label: "Virgin Islands (USA)",
    },
    {
      id: 241,
      code:"",
      label: "Wake Island",
    },
    {
      id: 242,
      code:"",
      label: "Wallis & Futana Is",
    },
    {
      id: 243,
      code:"",
      label: "Yemen",
    },
    {
      id: 244,
      code:"",
      label: "Zaire",
    },
    {
      id: 245,
      code:"",
      label: "Zambia",
    },
    {
      id: 256,
      code:"",
      label: "Zimbabwe",
    },
  ];

const dangerousGood = [
    
  {
    id: 1,
    label: 'B2C',
  },
  {
    id: 2,
    label: 'B2B',
  },
  
];




const shipInternational = [
    
  {
    id: 1,
    label: 'Yes',
  },
  {
    id: 2,
    label: 'No',
  },
  
];

const ColorButton2 = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: '#ff9900',
       borderColor: '#e68a00',
       borderRadius:'3px',
       height:45,
       width:290,
            fontSize:'11px',
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      '&:hover': {
        backgroundColor: '#e68a00',
        
      },
    },
  }))(Button);
  //Make custom button
  const ColorButton4 = withStyles(theme => ({
    root: {
      color: '#fff',
      backgroundColor: '#00b33c',
       borderColor: '#009933',
       borderRadius:'3px',
       height:45,
       width:290,
            fontSize:'11px',
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      '&:hover': {
        backgroundColor: '#00cc44',
        
      },
    },
  }))(Button);

const useStyles = makeStyles(theme => ({
    submit: {
      margin: theme.spacing(0, 0, 0),
      borderRadius : 0,
},
appBarSpacer: theme.mixins.toolbar,
content: {
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(2),
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
  backgroundColor:'#fff',
},
textArea:{
  marginTop: theme.spacing(0),
  borderRadius : 0,
},
profileMargin: {
  marginTop: theme.spacing(2),
  borderRadius : 0,
},
paper: {
  border: '2px solid #ced4da',
  height: 100,
  width: 100,
},
root: {
  //flexGrow: 1,
  width: '100%',
},
paper9: {
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
   borderRadius:'0px',
  overflow: 'auto',
   height:'80vh'
},
  profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius : '5px',
  //  marginBottom: theme.spacing(1),
  },
  button2 :{
    border : ' 1px solid #c0ccda',
    borderRadius : '5px',
    // paddingTop: '10%',
    // paddingBottom: '10%',
    height:'100%',
    width:'100px',
    fontSize:'11px',
    fontWeight: '550',
    color:'rgba(27, 46, 75, 0.7)',
    // paddingLeft: '22%',
    // paddingRight: '22%',
    
  },
  buttonHome :{
   // border : ' 1px solid #c0ccda',
    borderRadius : '5px',
    // paddingTop: '10%',
    // paddingBottom: '10%',
    fontSize:'11px',
    fontWeight: '550',
    color:'#fff',
    backgroundColor:'#000',
    // paddingLeft: '22%',
    // paddingRight: '22%',
    height:'100%',
    width:'100px',
    '&:hover': {
      color:'#fff',
      backgroundColor:'#000',
    },
  },
  buttonOrder :{
    // border : ' 1px solid #c0ccda',
     borderRadius : '5px',
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height:'100%',
    width:'110px',
     fontSize:'11px',
     fontWeight: '550',
     color:'#fff',
     backgroundColor:'#0168fa',
    //  paddingLeft: '22%',
    //  paddingRight: '22%',
     '&:hover': {
       color:'#fff',
       backgroundColor:'#0168fa',
     },
   },
   margin: {
    margin: theme.spacing(1),
  },


// grid: {
//   width: 100,
//   height: 100,
// },

}));


/****   For changing the textfield radius  : End *********/
const styles = (theme) => ({
  root: {
    '@media print': {
    margin: 0,
    padding: theme.spacing(1),
    borderRadius:0
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '-2px',
    color: theme.palette.grey[500],
  },
 
});
//Make custom button
const ColorButton = withStyles(theme => ({
    root: {
        color: '#fff',
        borderRadius : '3px',
        //  paddingTop: '9%',
        //  paddingBottom: '9%',
        height:'100%',
        width:'120px',
         fontSize:'11px',
         fontWeight: '550',
         color:'#fff',
         backgroundColor:'#0168fa',
      '&:hover': {
        backgroundColor: '#002080',
        
      },
      },
  }))(Button);
 
  const ColorButton1 = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'100%',
      width:'90px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
    },
  }))(Button);
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  var ids=[];
/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function AddCustomerDynamic(props) {
  
   const classes = useStyles();
   const [packingPallet, setPackingPallet] = React.useState(1);
   const userid=props.user_id;
   const[shipData,setShipData]=React.useState([]);
   const [loading,setLoading]=React.useState(false);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [errorParamName,setErrorParamName]=React.useState('');
   const [type,setType]=React.useState('');
   const [open1, setOpen1] = React.useState(false);
   const [open11, setOpen11] = React.useState(false);
   const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
   const [customePack, setCustomePack] = React.useState(0);
   const [promotioanlIn,setPromotioanlIn]=React.useState(1);
   const [value,setValue]=React.useState(1);
   const [status,setStatus]=React.useState(false);
  const[promotionalInserts,setDataProduct2]=React.useState([]);
  const[countryName,setChangeCountry]=React.useState(0);
  const [dataproduct, setDataProduct] = React.useState([]);
  const [state1, setState1] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state1;
  const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const handleOpenFormPage = ()=>{
    setValue(2);
  }
var valueofsouceid =stateData;
 

  const [state, setState] = React.useState({
    columns: [
      //   { title: 'Customer Id',
      //     field: 'customerId',type: 'text',editable:'never'
      // },
      { title: "First Name", field: "firstname", type: "text" },
      { title: "Last Name", field: "lastname", type: "text" },
      { title: "Company Name", field: "companyname", type: "text" },
      { title: "Address", field: "addressline1", type: "text" },
      { title: "City", field: "city", type: "text" },
      {
        title: "Country",
        field: "country",
        type: "text",
        editComponent: props => (
          <FormControl className={classes.formControl}>
          
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.value}
            onChange={e =>handleChangeSource(e,props)}
          >
            <MenuItem value={0}>  
Select Country</MenuItem>
          {countryData.map(option => (
            <MenuItem value={option.label}>  
            {option.label}</MenuItem>
           
           ))}
          
          </Select>
        </FormControl>
          
        )
             
      },
      {
        title: "State",
        field: "state",
        type: "text",
        editComponent: props => (
//           <FormControl className={classes.formControl}>
          
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={props.value}
//             onChange={e =>handleChangeSource1(e,props)}
//           >
//             <MenuItem value={0}>  
// Select State</MenuItem>
//           {valueofsouceid.map(option => (
//             <MenuItem value={option.label}>  
//             {option.label}</MenuItem>
           
//            ))}
          
//           </Select>
//         </FormControl>
<FormControl className={classes.formControl}>
          
          
{
                (() => {
                  if(props.rowData!==undefined){
                  if(props.rowData.country==='Canada')
                  {
                    return(
                      <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.value}
            onChange={e =>handleChangeSource1(e,props)}
          >
            <MenuItem value={0}>  
Select State</MenuItem>
                      {stateDataCanada.map(option => (
                        <MenuItem value={option.label}>  
                        {option.label}</MenuItem>
                       
                       ))}
                         </Select>
                    )
                  }
                  else if(props.rowData.country==='United States')
                  {
                    return(
                      <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.value}
            onChange={e =>handleChangeSource1(e,props)}
          >
            <MenuItem value={0}>  
Select State</MenuItem>
                      {stateDataUS.map(option => (
                        <MenuItem value={option.label}>  
                        {option.label}</MenuItem>
                       
                       ))}
                         </Select>
                    )
                  }
                  
                  else{
                    return(
                      <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.value}
            onChange={e =>handleChangeSource1(e,props)}
          >
            <MenuItem value={0}>  
Select State</MenuItem>
                      {stateData.map(option => (
                        <MenuItem value={option.label}>  
                        {option.label}</MenuItem>
                       
                       ))}
                         </Select>
                    )

                  }
                }
                })()}
          {/* {valueofsouceid.map(option => (
            <MenuItem value={option.label}>  
            {option.label}</MenuItem>
           
           ))} */}
          
          
        </FormControl>
          
        )
      },
      {
        title: "Zip",
        field: "zip",
        type: "text",
      },

      
      {
        title: "Phone No.",
        field: "phone",
        type: "text",
      },
      {
        title: "Email",
        field: "email",
        type: "text",
      },
      {
        title: "Customer Type",
        field: "customertype",
        lookup: { 1: "Residential", 2: "Business" },
      },
    ],
    data: [
      
    ],
  });

  const handleChangeSource  = (event,props) =>{
    // setSorceId(event.target.value);
    // valueofsouceid=event.target.value;
    if(event.target.value==='United States')
    {
      valueofsouceid=stateDataUS;
    }
    else if(event.target.value==='Canada'){
      valueofsouceid=stateDataCanada;
    }
    else{
      valueofsouceid=stateData;
    }
    props.onChange(event.target.value);
   
  };

  const handleChangeSource1  = (event,props) =>{
    // setSorceId(event.target.value);
   
   
    props.onChange(event.target.value);
   
  };


  React.useEffect(() => {
    // fetchProductList();
 
    for(let i=ids.length;i > 0;i--){
     ids.splice(i, 1);
    }
    if(ids.length === 1){
      ids.splice(0, 1);
    }
    console.log("arrayempty",ids.length);
   }, []);

  /**
   * Description:Callback function
   */
  useEffect(() => {
    
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]
  );
  
  
     /**
   * Description:This function call on type character inside input text
   * @param {} prop 
   */
  const handleChange = prop => event => {
    console.log("email",event.target.value);
    event.persist();
    //setValues({ ...formState.values, [prop]: event.target.value });
    setFormState(formState => ({
     ...formState,
     values: {
       ...formState.values,[prop]:event.target.value,
       checkFrom:false
     },
     touched:{
       ...formState.touched,
       [event.target.name]: true
     }
    }));
};


 const handleCallbackfunction =()=>{
     if(value===2)
     {
         setValue(1);
     }
     else{
        props.handleDashboard('04');
     }
  
}
  
    
/**
   * Description:To do delete customer
   * @param {*} customproduct_id
   */
  const deleteCustomer = (customerId,oldData) => {
    setLoading(true);
    shiphypeservice
      .deleteCustomer(customerId)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setState((prevState) => {
            const data = [...prevState.data];
            data.splice(data.indexOf(oldData), 1);
            ids.splice(data.indexOf(oldData), 1);
            return { ...prevState, data };
          });
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
                  const addNewCustomer = (
                    userId,
                    firstname,
                    lastname,
                    companyname,
                    addressline1,
                    addressline2,
                    city,
                    state,
                    zip,
                    country,
                    phone,
                    email,
                    customertype,newData
                  ) => {
                    if (firstname === undefined ) {
                        setErrorParamName('First Name must be filled.');
                      setOpen1(true);

                    } 
                    else if(lastname === undefined)
                    {
                      setErrorParamName('Last Name must be filled.');
                      setOpen1(true);
                    }
                    // else if(companyname === undefined)
                    // {
                    //   setErrorParamName('Company Name must be filled.');
                    //   setOpen1(true);
                    // }
                    else if(phone === undefined)
                    {
                      setErrorParamName('Phone number must be filled.');
                      setOpen1(true);
                    }
                    else if(customertype === undefined)
                    {
                      setErrorParamName('Customer type must be seleted.');
                      setOpen1(true);
                    }
                    else if(zip === undefined)
                    {
                      setErrorParamName('Zip code must be filled.');
                      setOpen1(true);
                    }
                    else if(city === undefined)
                    {
                      setErrorParamName('City must be filled.');
                      setOpen1(true);
                    }
                    else if(country === undefined)
                    {
                      setErrorParamName('Country must be selected.');
                      setOpen1(true);
                    }
                    else if(state === undefined)
                    {
                      setErrorParamName('State must be selected.');
                      setOpen1(true);
                    }
                    else if(addressline1 === undefined)
                    {
                      setErrorParamName('Address must be filled.');
                      setOpen1(true);
                    }
                    else{
                      setLoading(true);
                      shiphypeservice
                        .addNewCustomer(
                          userId,
                          firstname,
                          lastname,
                          companyname,
                          addressline1,
                          addressline2,
                          city,
                          state,
                          zip,
                          country,
                          phone,
                          email,
                          customertype
                        )
                        .then((response) => {
                          console.log("status", response.status);
                          if (response.status === true) {
                            setLoading(false);
                  
                            ids.push(response.data);
                            console.log("arraylenght",ids.length);
                            setState((prevState) => {
                              const data = [...prevState.data];
                              data.push(newData);
                              return { ...prevState, data };
                            });
                          } else {
                            setLoading(false);
                            console.log("message", response.message);
                          }
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }
                  
                  };
                
                  const updataExistsCustomer = (
                    customerId,
                    firstname,
                    lastname,
                    companyname,
                    addressline1,
                    addressline2,
                    city,
                    state,
                    zip,
                    country,
                    phone,
                    email,
                    customertype,newData,oldData
                  ) => { if (firstname === ''  || 
                  lastname === ''  ||
                  addressline1 === ''  ||
                  addressline2 === ''  ||
                  city === ''  ||
                  country === ''  ||
                  state === ''  ||
                  phone === ''  ||
                  customertype === ''  ||
                  zip === ''  ) {
                  setOpen11(true);
                } 
                else{
                    setLoading(true);
                    shiphypeservice
                      .updateExistsCustomer(
                        customerId,
                        firstname,
                        lastname,
                        companyname,
                        addressline1,
                        addressline2,
                        city,
                        state,
                        zip,
                        country,
                        phone,
                        email,
                        customertype
                      )
                      .then((response) => {
                        console.log("status", response.status);
                        if (response.status === true) {
                          setLoading(false);
                
                          setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                          });
                        } else {
                          setLoading(false);
                          console.log("message", response.message);
                        }
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                    }
                  };
                  const handleCaptureInvoice = (event) => {
                    const target=event.target;
                    const fileReader = new FileReader();
                    const file=target.files[0];
                    var path = (window.URL || window.webkitURL).createObjectURL(file);
                    console.log(path);
                  ///  var form = document.getElementById('createForm');
                    var formData =  new FormData();
                  //  const formData = new FormData();
                  formData.append('file',file);
                 // formData.append('shippingtype',3);
                  formData.append('userid',72);
                  if(file.type==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                  {
                  ExcelRenderer(file, (err, resp) => {
                    if(err){
                      console.log(err);            
                    }
                    else{
                   
                      shiphypeservice.uploadCustomerSheet(resp.rows,userid)
                  .then(response => {
                   console.log("status",response.status);
                        if(response.status === true) {
                            console.log('done');
                            setOpen(true);
                            setType('success');
                            setMsg(response.message);
                            setStatus(response.status);
                            setLoading(false);
                                   }else{
                                    console.log("message",response.message);
                                    setOpen(true);
                                    setType('error');
                                    setMsg(response.message);
                                    setStatus(response.status);
                                    setLoading(false);
                                   }   
                      }).catch((error) =>{
                            console.error(error);
                      });
                      console.log(resp);
                    }
                  });               
                }
                else if(file.type==='application/vnd.ms-excel')
                {
                  ExcelRenderer(file, (err, resp) => {
                    if(err){
                      console.log(err);            
                    }
                    else{
                     
                      shiphypeservice.uploadCustomerSheet(resp.rows,userid)
                  .then(response => {
                   console.log("status",response.status);
                        if(response.status === true) {
                            console.log('done');
                            setOpen(true);
                            setType('success');
                            setMsg(response.message);
                            setStatus(response.status);
                            setLoading(false);
                                   }else{
                                    console.log("message",response.message);
                                    setOpen(true);
                                    setType('error');
                                    setMsg(response.message);
                                    setStatus(response.status);
                                    setLoading(false);
                                   }   
                      }).catch((error) =>{
                            console.error(error);
                      });
                      console.log(resp);
                    }
                  });       
                }
                else{
                  setOpen(true);
    setType('error');
    setMsg('File Type is Invaild');
    setStatus(false);
    setLoading(false);
                }
                  
                 
                  };
                const handleChangeCountry = event => {
                    setChangeCountry(event.target.value);
                  };
                  const handleChangePromotional = event => {
                    setPromotioanlIn(event.target.value);
                  };
                  const handleChangeCustomePackaging = event => {
                    setCustomePack(event.target.value);
                  };
                  const handleChangePackingPallete = event => {
                    setPackingPallet(event.target.value);
                  };
                  
     const handleClose = () => {
      setOpen(false);
    };
    const showToast =(open,msg,type)=>{ 
   
      return(
    <Toast
     open={open}
     handleClose={handleClose}
     type={type}
     msg={msg}
    />
   )
    }

    const handleClose3 = () => {
      setOpen1(false);
      // handleNextPage(22);
    };
    const handleClose31 = () => {
      setOpen11(false);
      // handleNextPage(22);
    };
                    const hasError = field =>
                    formState.touched[field] && formState.errors[field] ? true : false;
          let screenWidth = Dimensions.get('window').width;

    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
    

<View >
            <Grid item  container lg={12}  >
            <Grid item  lg={5}  style={popUpStyle.breadCrumSidePadding} >
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD
            </Text></Link>
            <Text style={popUpStyle.breadCrundCss}> / CUSTOMER /</Text>
          <Text style={popUpStyle.breadCrundCss2}> ADD MANUALLY CUSTOMER {'\n'} </Text> 
          
              </Grid>
              <Grid item  lg={2} ></Grid>
             
              </Grid>
              </View>  
    <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
            <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open1}
            autoHideDuration={6000}
            onClose={handleClose3}
          >
            <Alert onClose={handleClose3} severity="error">
              All Fields must be filled except Email.
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open11}
            autoHideDuration={6000}
            onClose={handleClose31}
          >
            <Alert onClose={handleClose31} severity="error">
              You can't remove details only Update the customer Details.
            </Alert>
          </Snackbar>
         {/* <ScrollView> */}
         <View >
         <View style={popUpStyle.paddingSide}>
       

         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={7} lg={7}>
            <Text style={{ fontSize: '15px',
            //fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              {/* Please provide the pickup address and shipment details for your shipment: */}
              </Text>
              </Grid>
              <Grid item xs={12} md={1} lg={1} ></Grid>
              <Grid item xs={12} md={4} lg={4} 
              //style={{marginRight:'70px'},} 
               >
  
              <Grid container item  justify="flex-end">

              <Grid>
              <ColorButton1
       size='large'
       variant="contained"
       color="primary"
      // className={classes.profileMargin}
       onClick={()=>{handleCallbackfunction()}}
       >
          Back
       </ColorButton1>
    
              </Grid>
            
              </Grid>
            
              </Grid>
              </Grid>
              {(() => {
            if (value === 1) {
              return (
<form className={classes.form}>
         <Grid container   justify="center" >

        
       
        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
       
        <ColorButton2
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    onClick={()=>{handleOpenFormPage()}}
  
    //onClick={()=>{navigation.navigate('Dashboard')}}
  >
    Add Customer Manually
     {/* {language.copyandsaveobject} */}
  
  </ColorButton2>
         
          </Grid>
      
        </Grid>
        <Grid  items xs={12} lg={12}>
        <Grid justify="center" // Add it here :)
      container>
      <form id="createForm" name="createForm" novalidate enctype="multipart/form-data">
      <ColorButton4
  size='large'
  variant="contained"
  component="label"
  color="primary"
  className={classes.profileMargin}
  //  onClick={()=>{handleNextPage(19)}}
    startIcon={<CloudUploadIcon />}
  >
    Upload Customer Sheet
    <input
    type="file"
    webkitdirectory directory multiple 
    onChange={handleCaptureInvoice}
    style={{ display: "none" }}
  />
  </ColorButton4>
         </form>
          </Grid>
      
        </Grid>
        <Grid  items xs={12} lg={12} style={{marginTop:'10px'}}>
        <Grid justify="center" // Add it here :)
      container>
      <form id="createForm" name="createForm" novalidate enctype="multipart/form-data">
      <a href={CustomerSheet} download> Download Sample Sheet</a>
         </form>
          </Grid>
      
        </Grid>
       <Grid items xs={12} lg={12}>
       <Grid  justify="flex-end" // Add it here :)
 container 
 spacing={24} >
   <Grid items >
         
       </Grid>


     
       </Grid>


       </Grid>
     
      </Grid>
        

           </form>
                );
            }
          })()}
              {(() => {
            if (value === 2) {
              return (
                <form className={classes.form}>
                <MaterialTable
                  style={{ padding: "0px",marginTop: '10px'}}
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
                        Add Customers Manually
                      </Text>
                    }
                    columns={state.columns}
                    data={state.data}
                    icons={tableIcons}
                    components={{
                      Container: (props) => <Paper {...props} elevation={0} />,
                      Toolbar: (props) => <StyledMTableToolbar {...props} />,
                    }}
                    localization={{
                      header: {
                        actions: "ACTION",
                      },
                    }}
                    options={{
                      paging: false,
                      addRowPosition: "first",
                      actionsColumnIndex: -1,
                      doubleHorizontalScroll: true,
                      maxBodyHeight: "55vh",
                      headerStyle: { position: "sticky", top: 0 },
                      exportFileName: "Customer List",
                      headerStyle: {
                        backgroundColor: "#cccccc",
                        color: "#000",

                        textTransform: "uppercase",
                        width: 40,
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

                        width: 40,
                        whiteSpace: "nowrap",
                        textAlign: "left",
                        flexDirection: "row",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "11px",
                        paddingLeft: 5,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingRight: 0,
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
                    editable={{
                      onRowAdd: (newData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            if ( newData.firstname === undefined ) {
                              setOpen(true);
                              setType("error");
                              setMsg(
                                "First Name must be filled."
                              );
                            //  props.rowData=newData;
                              //showToast(true,'First Name must be filled.','error')
                             reject();
                              return;
                            //   setErrorParamName('First Name must be filled.');
                            // setOpen1(true);
      
                          } 
                          else if( newData.lastname === undefined)
                          {
                            setOpen(true);
                            setType("error");
                            setMsg(
                              "Last Name must be filled."
                            );
                            reject();
                            return;
                            // setErrorParamName('Last Name must be filled.');
                            // setOpen1(true);
                          }
                          // else if( newData.companyname === undefined)
                          // {
                          //   setOpen(true);
                          //   setType("error");
                          //   setMsg(
                          //     "Company Name must be filled."
                          //   );
                          //   reject();
                          //   return;
                          //   // setErrorParamName('Company Name must be filled.');
                          //   // setOpen1(true);
                          // }
                          else if( newData.phone === undefined)
                          {
                            setOpen(true);
                            setType("error");
                            setMsg(
                              "Phone number must be filled."
                            );
                            reject();
                            return;


                            setErrorParamName('Phone number must be filled.');
                            setOpen1(true);
                          }
                          else if( newData.customertype === undefined)
                          {
                            setOpen(true);
                            setType("error");
                            setMsg(
                              "Customer type must be seleted."
                            );
                            reject();
                            return;

                            setErrorParamName('Customer type must be seleted.');
                            setOpen1(true);
                          }
                          else if( newData.zip === undefined)
                          {
                            setOpen(true);
                            setType("error");
                            setMsg(
                              "Zip code must be filled."
                            );
                            reject();
                            return;
                            setErrorParamName('Zip code must be filled.');
                            setOpen1(true);
                          }
                          else if( newData.city === undefined)
                          {
                            setOpen(true);
                            setType("error");
                            setMsg(
                              "City must be filled."
                            );
                            reject();
                            return;
                            setErrorParamName('City must be filled.');
                            setOpen1(true);
                          }
                          else if( newData.country === undefined)
                          {
                            setOpen(true);
                            setType("error");
                            setMsg(
                              "Country must be selected."
                            );
                            reject();
                            return;
                            setErrorParamName('Country must be selected.');
                            setOpen1(true);
                          }
                          else if( newData.state === undefined)
                          {
                            setOpen(true);
                            setType("error");
                            setMsg(
                              "State must be selected."
                            );
                            reject();
                            return;
                            setErrorParamName('State must be selected.');
                            setOpen1(true);
                          }
                          else if( newData.addressline1 === undefined)
                          {
                            setOpen(true);
                            setType("error");
                            setMsg(
                              "Address must be filled."
                            );
                            reject();
                            return;
                            setErrorParamName('Address must be filled.');
                            setOpen1(true);
                          } else {

                              addNewCustomer(
                                userid,
                                newData.firstname,
                                newData.lastname,
                                newData.companyname,
                                newData.addressline1,
                                newData.addressline1,
                                newData.city,
                                newData.state,
                                newData.zip,
                                newData.country,
                                newData.phone,
                                newData.email,
                                newData.customertype,newData
                              );
                            }

                            resolve();
                          }, 1000);
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            if (
                              newData.firstname === '' ||
                              newData.lastname === '' ||
                              newData.addressline1 === '' ||
                              newData.city === '' ||
                              newData.state === '' ||
                              newData.zip === '' ||
                              newData.country === '' ||
                              newData.phone === '' ||
                              newData.customertype === ''
                            ) {
                              setOpen(true);
                              setType("error");
                              setMsg(
                                "You can't remove details only Update the customer Details.."
                              );
                              reject();
                              return;
                            } else {
                              const dataup=state.data;
                              const index = dataup.indexOf(oldData);
                              const customerid = ids[index];
                              updataExistsCustomer(
                                customerid,
                                newData.firstname,
                                newData.lastname,
                                newData.companyname,
                                newData.addressline1,
                                newData.addressline1,
                                newData.city,
                                newData.state,
                                newData.zip,
                                newData.country,
                                newData.phone,
                                newData.email,
                                newData.customertype,newData,oldData
                              );
                            }

                            resolve();
                          }, 1000);
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            {
                              const dataup=state.data;
                              const index = dataup.indexOf(oldData);

                              const customerid = ids[index];

                              deleteCustomer(customerid,oldData);
                            }
                            resolve();
                          }, 1000);
                        }),
                    }}
                  />
                  </form>
       
                );
            }
          })()}
        
  {showToast(open,msg,type)}
        </View>
       
         
           </View>
        </View>
    );
  }