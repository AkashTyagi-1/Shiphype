import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";

import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import * as shiphypeservice from './ShipService/shiphype_service';
import StepConnector from '@material-ui/core/StepConnector';
import MaterialTable , { MTableToolbar }from 'material-table';
import { forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Toast from './feedback/Toast';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import ProgressBar from './feedback/ProgressBar';
import popUpStyle from './style/popUpStyle';
import Autocomplete from "@material-ui/lab/Autocomplete";
import HomeIcon from '@material-ui/icons/Home';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
/**For Style */
import validate from 'validate.js';

const countryData = [
  {
    id: 1,
    code: "CA",
    label: "Canada",
  },
  {
    id: 2,
    code: "GB",
    label: "United Kingdom",
  },
  {
    id: 3,
    code: "US",
    label: "United States",
  },
  {
    id: 4,
    code: "AF",
    label: "Afghanistan",
  },
  {
    id: 5,
    code: "AL",
    label: "Albania",
  },
  {
    id: 6,
    code: "DZ",
    label: "Algeria",
  },
  {
    id: 7,
    code: "AS",
    label: "American Samoa",
  },
  {
    id: 8,
    code: "AD",
    label: "Andorra",
  },
  {
    id: 9,
    code: "AO",
    label: "Angola",
  },
  {
    id: 10,
    code: "AI",
    label: "Anguilla",
  },
  {
    id: 11,
    code: "AG",
    label: "Antigua & Barbuda",
  },
  {
    id: 12,
    code: "AR",
    label: "Argentina",
  },
  {
    id: 13,
    code: "AM",
    label: "Armenia",
  },
  {
    id: 14,
    code: "AW",
    label: "Aruba",
  },
  {
    id: 15,
    code: "AU",
    label: "Australia",
  },
  {
    id: 16,
    code: "AT",
    label: "Austria",
  },
  {
    id: 17,
    code: "AZ",
    label: "Azerbaijan",
  },
  {
    id: 18,
    code: "BS",
    label: "Bahamas",
  },
  {
    id: 19,
    code: "BH",
    label: "Bahrain",
  },
  {
    id: 20,
    code: "BD",
    label: "Bangladesh",
  },
  {
    id: 21,
    code: "BB",
    label: "Barbados",
  },
  {
    id: 22,
    code: "BY",
    label: "Belarus",
  },
  {
    id: 23,
    code: "BE",
    label: "Belgium",
  },
  {
    id: 24,
    code: "BZ",
    label: "Belize",
  },
  {
    id: 25,
    code: "BJ",
    label: "Benin",
  },
  {
    id: 26,
    code: "BJ",
    label: "Benin",
  },
  {
    id: 27,
    code: "BM",
    label: "Bermuda",
  },
  {
    id: 28,
    code: "BM",
    label: "Bhutan",
  },
  {
    id: 29,
    code: "BO",
    label: "Bolivia",
  },
  {
    id: 30,
    code: "BA",
    label: "Bosnia & Herzegovina",
  },
  {
    id: 31,
    code: "BW",
    label: "Botswana",
  },
  {
    id: 32,
    code: "BR",
    label: "Brazil",
  },
  {
    id: 33,
    code: "IO",
    label: "British Indian Ocean Ter",
  },
  {
    id: 34,
    code: "",
    label: "Brunei",
  },
  {
    id: 35,
    code: "BG",
    label: "Bulgaria",
  },
  {
    id: 36,
    code: "BF",
    label: "Burkina Faso",
  },
  {
    id: 37,
    code: "",
    label: "Burundi",
  },
  {
    id: 38,
    code: "KH",
    label: "Cambodia",
  },
  {
    id: 39,
    code: "",
    label: "Cameroon",
  },
  {
    id: 40,
    code: "",
    label: "Canary Islands",
  },
  {
    id: 41,
    code: "",
    label: "Cape Verde",
  },
  {
    id: 42,
    code: "",
    label: "Cayman Islands",
  },
  {
    id: 43,
    code: "",
    label: "Central African Republic",
  },
  {
    id: 44,
    code: "",
    label: "Chad",
  },
  {
    id: 45,
    code: "",
    label: "Channel Islands",
  },

  {
    id: 46,
    code: "",
    label: "Chile",
  },
  {
    id: 47,
    code: "",
    label: "China",
  },
  {
    id: 48,
    code: "",
    label: "Christmas Island",
  },
  {
    id: 49,
    code: "",
    label: "Cocos Island",
  },
  {
    id: 50,
    code: "",
    label: "Colombia",
  },
  {
    id: 51,
    code: "",
    label: "Comoros",
  },
  {
    id: 52,
    code: "",
    label: "Congo",
  },
  {
    id: 53,
    code: "",
    label: "Cook Islands",
  },
  {
    id: 54,
    code: "",
    label: "Costa Rica",
  },
  {
    id: 55,
    code: "",
    label: "Cote DIvoire",
  },
  {
    id: 56,
    code: "",
    label: "Croatia",
  },
  {
    id: 57,
    code: "",
    label: "Cuba",
  },
  {
    id: 58,
    code: "",
    label: "Curacao",
  },
  {
    id: 59,
    code: "",
    label: "Cyprus",
  },
  {
    id: 60,
    code: "",
    label: "Czech Republic",
  },
  {
    id: 61,
    code: "",
    label: "Denmark",
  },
  {
    id: 62,
    code: "",
    label: "Djibouti",
  },
  {
    id: 63,
    code: "",
    label: "Dominica",
  },
  {
    id: 64,
    code: "",
    label: "Dominican Republic",
  },
  {
    id: 65,
    code: "",
    label: "East Timor",
  },
  {
    id: 66,
    code: "",
    label: "Ecuador",
  },
  {
    id: 67,
    code: "",
    label: "Egypt",
  },
  {
    id: 68,
    code: "",
    label: "El Salvador",
  },
  {
    id: 69,
    code: "",
    label: "Equatorial Guinea",
  },
  {
    id: 70,
    code: "",
    label: "Eritrea",
  },
  {
    id: 71,
    code: "",
    label: "Estonia",
  },
  {
    id: 72,
    code: "",
    label: "Ethiopia",
  },
  {
    id: 73,
    code: "",
    label: "Falkland Islands",
  },
  {
    id: 74,
    code: "",
    label: "Faroe Islands",
  },
  {
    id: 75,
    code: "",
    label: "Fiji",
  },
  {
    id: 76,
    code: "",
    label: "Finland",
  },
  {
    id: 77,
    code: "",
    label: "France",
  },
  {
    id: 78,
    code: "",
    label: "French Guiana",
  },
  {
    id: 79,
    code: "",
    label: "French Polynesia",
  },
  {
    id: 80,
    code: "",
    label: "French Southern Ter",
  },
  {
    id: 81,
    code: "",
    label: "Gabon",
  },
  {
    id: 82,
    code: "",
    label: "Gambia",
  },
  {
    id: 83,
    code: "",
    label: "Georgia",
  },
  {
    id: 84,
    code: "",
    label: "Germany",
  },
  {
    id: 85,
    code: "",
    label: "Ghana",
  },
  {
    id: 86,
    code: "",
    label: "Gibraltar",
  },
  {
    id: 87,
    code: "",
    label: "Great Britain",
  },
  {
    id: 88,
    code: "",
    label: "Greece",
  },
  {
    id: 89,
    code: "",
    label: "Greenland",
  },
  {
    id: 90,
    code: "",
    label: "Grenada",
  },
  {
    id: 91,
    code: "",
    label: "Guadeloupe",
  },
  {
    id: 92,
    code: "",
    label: "Guam",
  },
  {
    id: 93,
    code: "",
    label: "Guatemala",
  },
  {
    id: 94,
    code: "",
    label: "Guinea",
  },
  {
    id: 95,
    code: "",
    label: "Guyana",
  },
  {
    id: 96,
    code: "",
    label: "Haiti",
  },
  {
    id: 97,
    code: "",
    label: "Hawaii",
  },
  {
    id: 98,
    code: "",
    label: "Honduras",
  },
  {
    id: 99,
    code: "",
    label: "Hong Kong",
  },
  {
    id: 100,
    code: "",
    label: "Hungary",
  },
  {
    id: 101,
    code: "",
    label: "Iceland",
  },
  {
    id: 102,
    code: "",
    label: "Indonesia",
  },
  {
    id: 103,
    code: "IN",
    label: "India",
  },
  {
    id: 104,
    code: "",
    label: "Iran",
  },
  {
    id: 105,
    code: "",
    label: "Iraq",
  },
  {
    id: 106,
    code: "",
    label: "Ireland",
  },
  {
    id: 107,
    code: "",
    label: "Isle of Man",
  },
  {
    id: 108,
    code: "",
    label: "Israel",
  },
  {
    id: 109,
    code: "",
    label: "Italy",
  },
  {
    id: 110,
    code: "",
    label: "Jamaica",
  },
  {
    id: 111,
    code: "",
    label: "Japan",
  },
  {
    id: 112,
    code: "",
    label: "Jordan",
  },
  {
    id: 113,
    code: "",
    label: "Kazakhstan",
  },
  {
    id: 114,
    code: "",
    label: "Kenya",
  },
  {
    id: 115,
    code: "",
    label: "Kiribati",
  },
  {
    id: 116,
    code: "",
    label: "Korea North",
  },
  {
    id: 117,
    code: "",
    label: "Korea South",
  },
  {
    id: 118,
    code: "",
    label: "Kuwait",
  },
  {
    id: 119,
    code: "",
    label: "Kyrgyzstan",
  },
  {
    id: 120,
    code: "",
    label: "Laos",
  },
  {
    id: 121,
    code: "",
    label: "Latvia",
  },
  {
    id: 122,
    code: "",
    label: "Lebanon",
  },
  {
    id: 123,
    code: "",
    label: "Lesotho",
  },
  {
    id: 124,
    code: "",
    label: "Liberia",
  },
  {
    id: 125,
    code: "",
    label: "Libya",
  },
  {
    id: 126,
    code: "",
    label: "Liechtenstein",
  },
  {
    id: 127,
    code: "",
    label: "Lithuania",
  },
  {
    id: 128,
    code: "",
    label: "Luxembourg",
  },
  {
    id: 129,
    code: "",
    label: "Macau",
  },
  {
    id: 130,
    code: "",
    label: "Macedonia",
  },
  {
    id: 131,
    code: "",
    label: "Madagascar",
  },
  {
    id: 132,
    code: "",
    label: "Malaysia",
  },
  {
    id: 133,
    code: "",
    label: "Malawi",
  },
  {
    id: 134,
    code: "",
    label: "Maldives",
  },
  {
    id: 135,
    code: "",
    label: "Mali",
  },
  {
    id: 136,
    code: "",
    label: "Malta",
  },
  {
    id: 137,
    code: "",
    label: "Marshall Islands",
  },
  {
    id: 138,
    code: "",
    label: "Martinique",
  },
  {
    id: 139,
    code: "",
    label: "Mauritania",
  },
  {
    id: 140,
    code: "",
    label: "Mauritius",
  },
  {
    id: 141,
    code: "",
    label: "Mayotte",
  },
  {
    id: 142,
    code: "",
    label: "Mexico",
  },
  {
    id: 143,
    code: "",
    label: "Midway Islands",
  },
  {
    id: 144,
    code: "",
    label: "Moldova",
  },
  {
    id: 145,
    code: "",
    label: "Monaco",
  },
  {
    id: 146,
    code: "",
    label: "Mongolia",
  },
  {
    id: 147,
    code: "",
    label: "Montserrat",
  },
  {
    id: 148,
    code: "",
    label: "Morocco",
  },
  {
    id: 149,
    code: "",
    label: "Mozambique",
  },
  {
    id: 150,
    code: "",
    label: "Myanmar",
  },
  {
    id: 151,
    code: "",
    label: "Nambia",
  },
  {
    id: 152,
    code: "",
    label: "Nauru",
  },
  {
    id: 153,
    code: "",
    label: "Nepal",
  },
  {
    id: 154,
    code: "",
    label: "Netherland Antilles",
  },
  {
    id: 155,
    code: "",
    label: "Netherlands (Holland, Europe)",
  },
  {
    id: 156,
    code: "",
    label: "Nevis",
  },
  {
    id: 157,
    code: "",
    label: "New Caledonia",
  },
  {
    id: 158,
    code: "",
    label: "New Zealand",
  },
  {
    id: 159,
    code: "",
    label: "Nicaragua",
  },
  {
    id: 160,
    code: "",
    label: "Niger",
  },
  {
    id: 161,
    code: "",
    label: "Nigeria",
  },
  {
    id: 162,
    code: "",
    label: "Niue",
  },
  {
    id: 163,
    code: "",
    label: "Norfolk Island",
  },
  {
    id: 164,
    code: "",
    label: "Norway",
  },
  {
    id: 165,
    code: "",
    label: "Oman",
  },
  {
    id: 166,
    code: "",
    label: "Pakistan",
  },
  {
    id: 167,
    code: "",
    label: "Palau Island",
  },
  {
    id: 168,
    code: "",
    label: "Palestine",
  },
  {
    id: 169,
    code: "",
    label: "Panama",
  },
  {
    id: 170,
    code: "",
    label: "Papua New Guinea",
  },
  {
    id: 171,
    code: "",
    label: "Paraguay",
  },
  {
    id: 172,
    code: "",
    label: "Peru",
  },
  {
    id: 173,
    code: "",
    label: "hilippines",
  },
  {
    id: 174,
    code: "",
    label: "Pitcairn Island",
  },
  {
    id: 175,
    code: "",
    label: "Poland",
  },
  {
    id: 176,
    code: "",
    label: "Portugal",
  },
  {
    id: 177,
    code: "",
    label: "Puerto Rico",
  },
  {
    id: 178,
    code: "",
    label: "Qatar",
  },
  {
    id: 179,
    code: "",
    label: "Republic of Montenegro",
  },
  {
    id: 180,
    code: "",
    label: "Republic of Serbia",
  },
  {
    id: 181,
    code: "",
    label: "Reunion",
  },
  {
    id: 182,
    code: "",
    label: "Romania",
  },
  {
    id: 183,
    code: "",
    label: "Russia",
  },
  {
    id: 184,
    code: "",
    label: "Rwanda",
  },
  {
    id: 185,
    code: "",
    label: "St Barthelemy",
  },
  {
    id: 186,
    code: "",
    label: "St Eustatius",
  },
  {
    id: 187,
    code: "",
    label: "St Helena",
  },
  {
    id: 188,
    code: "",
    label: "St Kitts-Nevis",
  },
  {
    id: 189,
    code: "",
    label: "St Lucia",
  },
  {
    id: 190,
    code: "",
    label: "St Maarten",
  },
  {
    id: 191,
    code: "",
    label: "St Pierre & Miquelon",
  },
  {
    id: 192,
    code: "",
    label: "St Vincent & Grenadines",
  },
  {
    id: 193,
    code: "",
    label: "Saipan",
  },
  {
    id: 194,
    code: "",
    label: "Samoa",
  },
  {
    id: 195,
    code: "",
    label: "Samoa American",
  },
  {
    id: 196,
    code: "",
    label: "San Marino",
  },
  {
    id: 197,
    code: "",
    label: "Sao Tome & Principe",
  },
  {
    id: 198,
    code: "",
    label: "Saudi Arabia",
  },
  {
    id: 199,
    code: "",
    label: "Senegal",
  },
  {
    id: 200,
    code: "",
    label: "Seychelles",
  },
  {
    id: 201,
    code: "",
    label: "Sierra Leone",
  },
  {
    id: 202,
    code: "",
    label: "Singapore",
  },
  {
    id: 203,
    code: "",
    label: "Slovakia",
  },
  {
    id: 204,
    code: "",
    label: "Slovenia",
  },
  {
    id: 205,
    code: "",
    label: "Solomon Islands",
  },
  {
    id: 206,
    code: "",
    label: "Somalia",
  },
  {
    id: 207,
    code: "",
    label: "South Africa",
  },
  {
    id: 208,
    code: "",
    label: "Spain",
  },
  {
    id: 209,
    code: "",
    label: "Sri Lanka",
  },
  {
    id: 210,
    code: "",
    label: "Sudan",
  },
  {
    id: 211,
    code: "",
    label: "Suriname",
  },
  {
    id: 212,
    code: "",
    label: "Swaziland",
  },
  {
    id: 213,
    code: "",
    label: "Sweden",
  },
  {
    id: 214,
    code: "",
    label: "Switzerland",
  },
  {
    id: 215,
    code: "",
    label: "Syria",
  },
  {
    id: 216,
    code: "",
    label: "Tahiti",
  },
  {
    id: 217,
    code: "",
    label: "Taiwan",
  },
  {
    id: 218,
    code: "",
    label: "Tajikistan",
  },
  {
    id: 219,
    code: "",
    label: "Tanzania",
  },
  {
    id: 220,
    code: "",
    label: "Thailand",
  },
  {
    id: 221,
    code: "",
    label: "Togo",
  },
  {
    id: 222,
    code: "",
    label: "Tokelau",
  },
  {
    id: 223,
    code: "",
    label: "Tonga",
  },
  {
    id: 224,
    code: "",
    label: "Trinidad & Tobago",
  },
  {
    id: 225,
    code: "",
    label: "Tunisia",
  },
  {
    id: 226,
    code: "",
    label: "Turkey",
  },
  {
    id: 227,
    code: "",
    label: "Turkmenistan",
  },
  {
    id: 228,
    code: "",
    label: "Turks & Caicos Is",
  },
  {
    id: 229,
    code: "",
    label: "Tuvalu",
  },
  {
    id: 230,
    code: "",
    label: "Uganda",
  },
  {
    id: 231,
    code: "",
    label: "Ukraine",
  },
  {
    id: 232,
    code: "",
    label: "United Arab Emirates",
  },
  {
    id: 233,
    code: "",
    label: "Uruguay",
  },
  {
    id: 234,
    code: "",
    label: "Uzbekistan",
  },
  {
    id: 235,
    code: "",
    label: "Vanuatu",
  },
  {
    id: 236,
    code: "",
    label: "Vatican City State",
  },
  {
    id: 237,
    code: "",
    label: "Venezuela",
  },
  {
    id: 238,
    code: "",
    label: "Vietnam",
  },
  {
    id: 239,
    code: "",
    label: "Virgin Islands (Brit)",
  },
  {
    id: 240,
    code: "",
    label: "Virgin Islands (USA)",
  },
  {
    id: 241,
    code: "",
    label: "Wake Island",
  },
  {
    id: 242,
    code: "",
    label: "Wallis & Futana Is",
  },
  {
    id: 243,
    code: "",
    label: "Yemen",
  },
  {
    id: 244,
    code: "",
    label: "Zaire",
  },
  {
    id: 245,
    code: "",
    label: "Zambia",
  },
  {
    id: 256,
    code: "",
    label: "Zimbabwe",
  },
];
const shipData=[
    {
        "id":"1",
        "code":"US"
    },
    {
        "id":"2",
        "code":"CA"
    },
    {
        "id":"3",
        "code":"IN"
    }
]

const schema = {
  fullname: { 
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  
 address1:{
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
 phone:{
  presence: { allowEmpty: false, message: 'is required' },
  length: {
    maximum: 10,
    minimum:10
  }
 },
 zipcode:{
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
 businessname:{
  presence: { allowEmpty: false, message: 'is required' },
  length: {
    maximum: 64
  }  
 },
 businesswebsite:{
  presence: { allowEmpty: false, message: 'is required' },
  length: {
    maximum: 64
  }  
 },
 businessdescription:{
  presence: { allowEmpty: false, message: 'is required' },
  length: {
    maximum: 64
  }  
 },
 positionincompany:{
  presence: { allowEmpty: false, message: 'is required' },
  length: {
    maximum: 64
  }  
 },
};



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
  height: '90vh',
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
      width:'150px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#0168fa',
    '&:hover': {
      backgroundColor: '#002080',
      
    },
    },
  }))(Button);

  const ColorButtonEdit = withStyles(theme => ({
    root: {
      color: '#fff',
      borderRadius : '3px',
      //  paddingTop: '9%',
      //  paddingBottom: '9%',
      height:'100%',
      width:'150px',
       fontSize:'11px',
       fontWeight: '550',
       color:'#fff',
       backgroundColor:'#D3D3D3',
    '&:hover': {
      backgroundColor: '#D3D3D3',
      
    },
    },
  }))(Button);

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function Slide17(props) {
  
   const classes = useStyles();
   const shipmentIds=props.shipmentId;
   const [carrierId, setCarrierId] = React.useState('');
   const [shipmentId, setShipemntId] = React.useState('');
   const [countrycode,setCountrycode]=React.useState(countryData[0]);
   const [custome,setCustome]=React.useState(1);
   const userid=props.user_id;
   const isAdmin=props.isAdmin;
   const[dataproduct,setDataProduct]=React.useState([]);
   const[packingdata,setPackingdata]=React.useState([]);
   const [loading,setLoading]=React.useState(false);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
   const [editArrangeShip,setEditArrangeShip]=React.useState(0);
   const [status,setStatus]=React.useState(false);
   const [orderCouierType,setOrderCourierType]=React.useState([]);
   const [userdetails,setUserdetails]=React.useState({});
   const [userstatus,setUserstatus]=React.useState(false);



   const [useridset, setUserId] = React.useState('');
   const [username, setUserNameId] = React.useState('');
   const [usermeail, setUserEmailId] = React.useState('');
   const [businsesname, setusinessId] = React.useState('');
   const [websiteid, setWebsiteId] = React.useState('');
   const [positionid, setpositionId] = React.useState('');

  const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

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

useEffect(() => {
    fetchUserDetails1(userid); 
  },[]);
  

const fetchUserDetails1 = (user)=>{

    //const user_id=5;
    setLoading(true);
    shiphypeservice.fetchUserDetail(user)
    .then(response => {
     console.log("status",response.status);
          if(response.status === true) {
            setLoading(false);
         //   setUserData(response.data);
         bindData(response.data);
         setUserstatus(response.status);
         setUserdetails(response.data); 
         setUserId(response.data.userdetails.id);
         setUserNameId(response.data.userdetails.displayName);
         setUserEmailId(response.data.userdetails.userEmail);
         setusinessId(response.data.company_name);
         setWebsiteId(response.data.userdetails.userUrl);
         setpositionId(response.data.position_in_comp);
                     }else{
                      setLoading(false);
                      console.log("message",response.message);
                     }   
        }).catch((error) =>{
              console.error(error);
        });
  }



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
/*
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleClose1 = (isSprintCreate) => {
  props.handleSprintCancel(isSprintCreate);
}

const addArrangeShip =()=>{

  setLoading(true);
  const usernicename=formState.values.fullname;
  const useremail=formState.values.email;
  const useraddressline=formState.values.address1;
  
  const usercity=formState.values.city;
  const userstatecode=formState.values.state;
  const userpincode=formState.values.zipcode;
  const bussinessname=formState.values.businessname;
  const userphonenumber=formState.values.phone;
  const bussinessdescription=formState.values.businessdescription;
  const usercountrycode=countrycode.label;
  const bussinesswebsite=formState.values.businesswebsite;
  const positionincompany=formState.values.positionincompany;
 

 shiphypeservice.updateUserDetails(userid,usernicename,useremail,useraddressline,usercity,userstatecode,usercountrycode,userpincode,userphonenumber,bussinessname,bussinessdescription,bussinesswebsite,positionincompany)
       .then(response => {
        console.log("status",response.status);
             if(response.status === true) {
                   setOpen(true);
                   setType('success');
                   setMsg(response.message);
                   setStatus(response.status);
                   setLoading(false);
                   fetchUserDetails1(userid);
                   setCustome(1);
                        }else{
                   setOpen(true);
                   setType('error');
                   setMsg(response.message);
                   setStatus(response.status);
                   setLoading(false);
                   console.log("message",response.message);
                        }   
           }).catch((error) =>{
                 console.error(error);
           });



         }
         
        
         const addArrangeShipDefaultWarehouse =()=>{
           
          setCustome(2);
        }
        const bindData = (data)=>{
          console.log("bind call",data);
          
            setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,fullname: data.userdetails.displayName,
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                fullname : true
              }
             }));
          
             setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,email: data.userdetails.userEmail,
                checkFrom : false
              },
              touched:{
                ...formState.touched,
                email : true
              }
             }));
            
          
             setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,address1: data.useraddressline,
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                address1 : true
              }
             }));
          
            
          
             setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,city: data.usercity,
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                city : true
              }
             }));
          
             setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,state: data.userstateprovinceCode,
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                state : true
              }
             }));
            
             setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,phone: data.phone_number,
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                phone : true
              }
             })); 
             setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,zipcode: data.userpostalCode,
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                zipcode : true
              }
             })); 

             setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,businessname: data.bussinessname,
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                businessname : true
              }
             })); 

             setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,businesswebsite: data.userdetails.userUrl,
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                businesswebsite : true
              }
             })); 


             setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,businessdescription: data.description,
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                businessdescription : true
              }
             })); 


             setFormState(formState => ({
              ...formState,
              values: {
                ...formState.values,positionincompany: data.position_in_comp,
                checkFrom:false
              },
              touched:{
                ...formState.touched,
                positionincompany : true
              }
             })); 
             for(let j=0;j<countryData.length;j++){
               if(data.country === countryData[j].label){
                setCountrycode(countryData[j]);
                break;
               }
             }
             
           
          }  
       
         
         
/**
 * Description:To do call function on next button
 * @param {*} isSprintCreate 
 */
const handleNextPage = () => {
    props.updateInventoryWarehouse(fromWarehouse,toWarehouse);
    props.handleNextPage('select_transfer_inventory');
}
/**
 * Description:To do call function on back button
 * @param {*} isSprintCreate 
 */
const handlePreviousPage = (isSprintCreate) => {
  props.handlePreviousPage(isSprintCreate);
} 
     
       
const handleChangeCountryCode = event =>{
  setCountrycode(event);
 }   
         
         const handleCallbackfunction =()=>{
          props.backButtonRouting(7);
        }

         
                    const hasError = field =>
                    formState.touched[field] && formState.errors[field] ? true : false;
          let screenWidth = Dimensions.get('window').width;

    return (  
      <View className={classes.content}>
    {/* <View className={classes.appBarSpacer} /> */}
   
{/* <View>
            <Grid item  container lg={12}  >
            <Grid item  lg={5} style={{marginTop:'5px'}} >
          {/* <Text style={{ fontSize: '14px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>DASHBOARD / </Text><Text style={{ fontSize: '14px',
            // fontWeight: '700',
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             color: '#0168fa',
          
             transition : 'all 0.25s',}}> ACCOUNT SETTING {'\n'} </Text>  */}
          
              {/* </Grid>
              <Grid item  lg={3} ></Grid>
              
              </Grid>
              </View>   */}
    <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
        
         <View>
             
         <View >
        

         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={7} lg={7} style={{marginTop:'20px'}}>
            <Text style={{ fontSize: '15px',
            fontWeight: '700',
          //   marginTop:'20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Profile Information</Text>
              </Grid>
              <Grid item xs={12} md={1} lg={1}></Grid>
              <Grid item xs={12} md={4} lg={4}>
  
              <Grid container item  justify="flex-end">

              </Grid>
            
              </Grid>
              </Grid>

              {(() => {
              if (parseInt(custome) === 1){
                  return (
                    <View>
                    <form className={classes.form}>
         <Grid  justify="space-between"
      container 
      spacing={2}  style={{marginTop:'10px'}}>
         <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
         
         <View style={{ marginLeft:'0px',}}>


         <Text style={{fontSize: '15px',
           fontWeight:'700',
           marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
Your Client ID:{ <Text style={{fontSize: '14px',
          
          marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
          
            
            {(() => {
              if (userstatus === true){
                  return (
                  <Text >
                    
                     {useridset} {'\n'}
                  </Text>
                    )
                }
              })()}


           
</Text>}
</Text>
            

           <Text style={{fontSize: '15px',
           fontWeight:'700',
           marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            {'\n'}Full Name
</Text>
             <Text style={{fontSize: '14px',
          
          marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
          
            
            {(() => {
              if (userstatus === true){
                  return (
                  <Text >
                  
                     {username} {'\n'}
                  </Text>
                    )
                }
              })()}


           
</Text>


<Text style={{fontSize: '15px',
           fontWeight:'700',
           marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            {'\n'}Email
</Text>
             <Text style={{fontSize: '14px',
          
          marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
           
            
            {(() => {
              if (userstatus === true){
                  return (
                  <Text >
                     
                     {usermeail} {'\n'}
                  </Text>
                    )
                }
              })()}


           
</Text>


<Text style={{fontSize: '15px',
           fontWeight:'700',
           marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            {'\n'}Phone
</Text>
             <Text style={{fontSize: '14px',
          
          marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
           
            
            {(() => {
              if (userstatus === true){
                  return (
                  <Text >
                    
                      {'\n'}
                  </Text>
                    )
                }
              })()}


           
</Text>


<Text style={{fontSize: '15px',
           fontWeight:'700',
           marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            {'\n'}Address
</Text>
             <Text style={{fontSize: '14px',
          
          marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
           
            {(() => {
              if (userstatus === true){
                  return (
                  <Text >
                     {'\n'}
                   
                  </Text>
                    )
                }
              })()}          
</Text>


<Text style={{fontSize: '15px',
           fontWeight:'700',
           marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            {'\n'}Business Name
</Text>
             <Text style={{fontSize: '14px',
          
          marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
           
            
            {(() => {
              if (userstatus === true){
                  return (
                  <Text >
                     
                     {businsesname} {'\n'}
                  </Text>
                    )
                }
              })()}


           
</Text>


<Text style={{fontSize: '15px',
           fontWeight:'700',
          marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            {'\n'}Business Description
</Text>
             <Text style={{fontSize: '14px',
          
          marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
           
            
            {(() => {
              if (userstatus === true){
                  return (
                  <Text >
                     {/* {userdetails.bussinessdescription} {'\n'} */}
                  </Text>
                    )
                }
              })()}


           
</Text>

<Text style={{fontSize: '15px',
           fontWeight:'700',
          marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            {'\n'}Business Website
</Text>
             <Text style={{fontSize: '14px',
          
          marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
           
            
            {(() => {
              if (userstatus === true){
                  return (
                  <Text >
                  
                     {websiteid} {'\n'}
                  </Text>
                    )
                }
              })()}


           
</Text>


<Text style={{fontSize: '15px',
           fontWeight:'700',
          marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
            
            {'\n'}Position in Company
</Text>
             <Text style={{fontSize: '14px',
          
          marginLeft:'0px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
           
            
            {(() => {
              if (userstatus === true){
                  return (
                  <Text >
                     
                     {positionid} {'\n'}
                  </Text>
                    )
                }
              })()}


           
</Text>
</View>
         
  <Grid item xs={9} >
    
  
  </Grid>
 
          <Grid container item xs={9} justify="flex-start" style={{marginTop:'5px'}}>
            <Grid>
          <ColorButtonEdit
          size='large'
          variant="contained"
          color='primary'
          onClick={()=>{addArrangeShipDefaultWarehouse()}}
          
          >
      Edit
        </ColorButtonEdit>
            </Grid>
          </Grid>
       </Grid></Grid></form>


                    </View>
                    )}
                    
                     })()}

                     {(() => {
              if (parseInt(custome) === 2){
                  return (
                    <View>

                    <form className={classes.form}>
         <Grid  justify="space-between" 
      container 
      spacing={2} style={{marginTop:'10px'}}>
         <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
        
  
  <Grid item xs={9} >
    
         <TextField
           id="fullname"
           name='fullname'
           variant="outlined"
           fullWidth
           error={hasError('fullname')}
           helperText={
              hasError('fullname') ? formState.errors.fullname[0] : null
           }
           placeholder="Full Name"
           size='small'
           type="text"
           onChange={handleChange('fullname')}
           className={classes.profileMargin1}
           value={formState.values.fullname || ''}
         />
    
       </Grid>

       <Grid item xs={9} >
    
    <TextField
      id="email"
      name='email'
      variant="outlined"
      fullWidth
      error={hasError('email')}
      helperText={
        hasError('email') ? formState.errors.email[0] : null
      }
      placeholder="Email"
      size='small'
      type="text"
      onChange={handleChange('email')}
      className={classes.profileMargin1}
     
      value={formState.values.email || ''}
    />

  </Grid>
  <Grid item xs={9} >
    
         <TextField
           id="address1"
           name='address1'
           variant="outlined"
           fullWidth
           error={hasError('address1')}
           helperText={
             hasError('address1') ? formState.errors.address1[0] : null
           }
           placeholder="Address"
           size='small'
           type="text"
           onChange={handleChange('address1')}
           className={classes.profileMargin1}
           value={formState.values.address1 || ''}
         />
    
       </Grid>
       
      
       <Grid item xs={9} >
    
         <TextField
           id="city"
           name='city'
           variant="outlined"
           fullWidth
           error={hasError('city')}
           helperText={
             hasError('city') ? formState.errors.city[0] : null
           }
           placeholder="City"
           size='small'
           type="text"
           onChange={handleChange('city')}
           className={classes.profileMargin1}
          
           value={formState.values.city || ''}
         />
    
       </Grid>

       <Grid item xs={9}>
    
    <TextField
      id="state"
      name='state'
      variant="outlined"
      fullWidth
      error={hasError('state')}
      helperText={
        hasError('state') ? formState.errors.state[0] : null
      }
      placeholder="State/Province"
      size='small'
      type="text"
      onChange={handleChange('state')}
      className={classes.profileMargin1}
     
      value={formState.values.state || ''}
    />

  </Grid>

  <Grid item xs={9} >
    
    <TextField
      id="zipcode"
      name='zipcode'
      variant="outlined"
      fullWidth
      error={hasError('zipcode')}
      helperText={
        hasError('zipcode') ? formState.errors.zipcode[0] : null
      }
      placeholder="Zip/Postal Code"
      size='small'
      type="text"
      onChange={handleChange('zipcode')}
      className={classes.profileMargin1}
     
      value={formState.values.zipcode || ''}
    />

  </Grid>

  <Grid item xs={9} >
    
    {/* <TextField
   id="countrycode"
   name='countrycode'
   variant="outlined"
   fullWidth
   label="Country Code"
   select
  
 
   value={countrycode}

   size='small'
   className={classes.profileMargin1}
   onChange={handleChangeCountryCode}
   >
    
  {shipData.map(option => (
    
    <option  style={{paddingLeft:'3%',cursor: 'pointer'}} 
     key={option.id} value={option.code}  
       >
      {option.code}
    </option>
  ))}
</TextField>  */}

{/* <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
         // label="Select Seller"
          value={countrycode}
          onChange={handleChangeCountryCode}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin1}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Country Code</option>
     
         {shipData.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.id}  
            >
          {option.code}
         </option>
       ))}
        </TextField> */}

        <Autocomplete
                  id="combo-box-demo"
                  fullWidth
                  value={countrycode}
                  options={countryData}
                  getOptionLabel={(option) => option.label}
                  //style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Search Country"
                      variant="outlined"
                    />
                  )}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      handleChangeCountryCode(newValue);
                    } else {
                      //setServicename("");
                    }
                    console.log("newvalue", newValue);
                  }}
                />

  </Grid>
       </Grid>
       
       <Grid item xs={12} md={6} lg={6}   style={{marginLeft:'0px'}}>
      
       <Grid item xs={9} >
    
         <TextField
           id="phone"
           name='phone'
           variant="outlined"
           fullWidth
           error={hasError('phone')}
           helperText={
             hasError('phone') ? formState.errors.phone[0] : null
           }
           placeholder="Phone"
           size='small'
           type="text"
           onChange={handleChange('phone')}
           className={classes.profileMargin1}
          
           value={formState.values.phone || ''}
         />
    
       </Grid>

      <Grid item xs={9} >
    
         <TextField
           id="businessname"
           name='businessname'
           variant="outlined"
           fullWidth
           error={hasError('businessname')}
           helperText={
             hasError('businessname') ? formState.errors.businessname[0] : null
           }
           placeholder="Business Name"
           size='small'
           type="text"
           onChange={handleChange('businessname')}
           className={classes.profileMargin1}
          
           value={formState.values.businessname || ''}
         />
    
       </Grid>
 
       <Grid item xs={9} >
      
    <TextField
      id="businesswebsite"
      name='businesswebsite'
      variant="outlined"
      fullWidth
      error={hasError('businesswebsite')}
      helperText={
        hasError('businesswebsite') ? formState.errors.businesswebsite[0] : null
      }
      placeholder="Business Website"
      size='small'
      type="text"
      onChange={handleChange('businesswebsite')}
      className={classes.profileMargin1}
     
      value={formState.values.businesswebsite || ''}
    />

  </Grid>

  <Grid item xs={9} >
    
    <TextField
      id="businessdescription"
      name='businessdescription'
      variant="outlined"
      fullWidth
      error={hasError('businessdescription')}
      helperText={
        hasError('businessdescription') ? formState.errors.businessdescription[0] : null
      }
      placeholder="Business Description"
      size='small'
      type="text"
      multiline = {true}
      rows={3}
      onChange={handleChange('businessdescription')}
      className={classes.profileMargin1}
     
      value={formState.values.businessdescription || ''}
    />

  </Grid>

  <Grid item xs={9} >
    
    <TextField
      id="positionincompany"
      name='positionincompany'
      variant="outlined"
      fullWidth
      error={hasError('positionincompany')}
      helperText={
        hasError('positionincompany') ? formState.errors.positionincompany[0] : null
      }
      placeholder="Position Company"
      size='small'
      type="text"
      onChange={handleChange('positionincompany')}
      className={classes.profileMargin1}
     
      value={formState.values.positionincompany || ''}
    />

  </Grid>
          <Grid container item xs={9} justify="flex-end" style={{marginTop:'5px'}}>
            <Grid>
          <ColorButton
          size='large'
          variant="contained"
          color='primary'
          //disabled={!formState.isValid}
          onClick={()=>{addArrangeShip()}}>
       Update
        </ColorButton>
            </Grid>
          </Grid>
       </Grid></Grid></form>

                    </View>
                    )}
                    
                     })()}

         
  {showToast(open,msg,type)}
        </View>
       
         
           </View>
        </View>
    );
  }

