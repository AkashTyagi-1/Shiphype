import React ,{ useState, useEffect } from 'react';
import clsx from 'clsx';
import { fade,withStyles,makeStyles, useTheme} from '@material-ui/core/styles';
import {Platform,View,ScrollView,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from "@material-ui/core/TextField";
import DialogActions from '@material-ui/core/DialogActions';
import PropTypes from "prop-types";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import * as shiphypeservice from './ShipService/shiphype_service';
import StepConnector from '@material-ui/core/StepConnector';
import MaterialTable , { MTableToolbar,MTableAction }from 'material-table';
import { forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Toast from './feedback/Toast';
import { format } from 'date-fns';
import AddBox from '@material-ui/icons/AddBox';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import ProgressBar from './feedback//ProgressBar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import AddIcon from '@material-ui/icons/Add';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import popUpStyle from './style/popUpStyle';
import HomeIcon from '@material-ui/icons/Home';
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import RefreshIcon from '@material-ui/icons/Refresh';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
/**For Style */
import validate from 'validate.js';

const ColorButtonRefresh = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    height: "100%",
    padding: "3px",
    width: "100px",
    fontSize: "11px",
    fontWeight: "550",
    color: "#fff",
    backgroundColor: "#33cc00",
    //  paddingLeft: '22%',
    //  paddingRight: '22%',
    "&:hover": {
      color: "#fff",
      backgroundColor: "#33cc00",
    },
  },
}))(Button);


const QontoConnector = withStyles({
 
  line: {
    borderColor: '#3f51b5',
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

const schema = {
  shipFrom: {
    
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  shipFromAttn: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  address1: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  
  address2:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }
 },

 zipCode:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 city:{
  presence: { allowEmpty: false, message: 'is required' },
  
  length: {
    maximum: 11
  }
 },
 state:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 country:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 phone:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 10
  }

 },
 packagePallets:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 length:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 hieght:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 width:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },
 packagePalletsWeight:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 64
  }

 },

};
const pickUP = [
    
  {
    id: 1,
    label: 'Yes',
  },
  {
    id: 2,
    label: 'No',
  },
 
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
const pickUPTime = [
    
    {
      id: 1,
      label: '10 AM',
    },
    {
      id: 2,
      label: '11 AM',
    },
    {
        id: 3,
        label: '12 AM',
      },
      {
        id: 4,
        label: '1 PM',
      },
      {
        id: 5,
        label: '2 PM',
      },
      {
        id: 5,
        label: '3 PM',
      },
      {
        id: 6,
        label: '4 PM',
      },
    

   
  ];
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
    }  , {
      id: 2,
      code: "British Columbia",
      label: "BC",
    }  , {
      id: 2,
      code: "Manitoba",
      label: "MB",
    }  , {
      id: 2,
      code: "New Brunswick",
      label: "NB",
    }  , {
      id: 2,
      code: "Newfoundland and Labrador",
      label: "NL",
    } , {
      id: 2,
      code: "Northwest Territories",
      label: "NT",
    } , {
      id: 2,
      code: "Nova Scotia",
      label: "NS",
    } , {
      id: 2,
      code: "Nunavut",
      label: "NU",
    } , {
      id: 2,
      code: "Ontario",
      label: "ON",
    } , {
      id: 2,
      code: "Prince Edward Island",
      label: "PE",
    } , {
      id: 2,
      code: "Quebec",
      label: "QC",
    } , {
      id: 2,
      code: "Saskatchewan",
      label: "SK",
    } , {
      id: 2,
      code: "Yukon",
      label: "YT",
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
    }
  ];
  const ColorButtonAdd = withStyles(theme => ({
    root: {
     borderRadius : '3px',
     height:'100%',
     padding:'3px',
     width:'130px',
      fontSize:'11px',
      fontWeight: '550',
      color:'#fff',
      backgroundColor:'#0168fa',
      '&:hover': {
        color:'#fff',
        backgroundColor:'#0168fa',
      },
    },
  }))(Button);
  const tableIcons = {
  //   Add: () => <ColorButtonAdd
  //   size='large'
  //   variant="contained"
  //   color="primary"
  //   startIcon={<AddIcon />}
  //   >
  //   Customer
  // </ColorButtonAdd>,
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    RefreshIcon: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} color='action'/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
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
  height: '120vh',
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
profileMargin10: {
  
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

  radioButtonCss:{
    color:'#000',fontSize:'2px',    height: '25px'
  },
// grid: {
//   width: 100,
//   height: 100,
// },
normal :{
   
    borderRadius : '0px',
    width:'70%',
    //height:'70px',
    backgroundColor:'#D3D3D3',
    color:'#fff',
    '&:hover': {
        backgroundColor:'#D3D3D3',
        color:'#fff',
        },
    
  },
  normalSelected :{
   
    borderRadius : '0px',
    width:'70%',
    //height:'70px',
    backgroundColor:'#0168fa',
    color:'#fff',
    '&:hover': {
      
        backgroundColor:'#0168fa',
        color:'#fff',
        },
    
  },
  urgent :{
   
    borderRadius : '0px',
    width:'70%',
    //height:'70px',
    backgroundColor:'#D3D3D3',
    color:'#fff',
    '&:hover': {
        backgroundColor:'#D3D3D3',
        color:'#fff',
        },
    
    
  },
  urgentSelected :{
   
    borderRadius : '0px',
    width:'70%',
    //height:'70px',
    backgroundColor:'#0168fa',
    color:'#fff',
    '&:hover': {
        backgroundColor:'#0168fa',
        color:'#fff',
        },
    
    
  },
  quantitycss:{
    width:'90%',
    fontSize:'6px',
    cursor:'pointer',
    underline: {
     "&&&:before": {
       borderBottom: "none"
     },
     "&&:after": {
       borderBottom: "none"
     }
   } 
   },
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
 

 
  /**
   * Description:To do show step of task
   */
  function getSteps() {
    return ['Marketplace Integration', 'Shipping Profile', 'Product Import','Product Sync','Import Customers'];
  }
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function SelectCustomerKind(props) {
  
   const classes = useStyles();
   const [carrierId, setSetCarrierId] = React.useState('');
   const [tailgateValue, setTailgateValue] = React.useState('');
   const [pickupRequired, setPickupRequired] = React.useState('');
   const [shipTimeDate, setShipTimeDate] = React.useState('');
   const {openAddCustomerManually}= props;
   const [activeStep, setActiveStep] = React.useState(0);
   const [completed, setCompleted] = React.useState(new Set());
   const [skipped, setSkipped] = React.useState(new Set());
   const steps = getSteps();
   const userid=props.user_id;
   const [radioValue,setRadioValue] = React.useState(1);
   const[value,setValue]=React.useState('');
   const [checkedA,setCheckedA]=React.useState(true);
   const[dataproduct,setDataProduct]=React.useState([]);
   const[shipData,setShipData]=React.useState([]);
   const [loading,setLoading]=React.useState(true);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
   const [startsprint,setStartsprint]=React.useState(0);
   const [status,setStatus]=React.useState(false);
   const[orderCouierType,setOrderCourierType]=React.useState([]);
   const [selectedpickDate, setSelectedpickDate] = React.useState(new Date());
   const [qualitycontrol,setQualitycontrol]=React.useState(false);
   const [printsku,setPrintsku]=React.useState(false);
   const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
   const [custmoerId,setCustomerId]=React.useState(0);
   const [custmoerName,setCustomerName]=React.useState('');
   const [custmoerCountry,setCustomerCountry]=React.useState('');
   const [customerDataSelect,setCustomerDataSelect]=React.useState([]);
   const [editRoleData,setEditRoleData]=React.useState(null);
   const [open1, setOpen1] = React.useState(false);
   const addActionRef = React.useRef();
   var valueofsouceid =stateData;
   const [state1, setState1] = useState({
    vertical: "center",
    horizontal: "center",
  });
  const { vertical, horizontal } = state1;
   const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  var ids=[];
  const StyledMTableToolbar = withStyles({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })(MTableToolbar);
  const theme = useTheme()
   const [state, setState] = React.useState({

    columns: [
   
      { title: '',
      render: rowData => <FormGroup>
      
      <FormControlLabel style={popUpStyle.checkboxPosition}
        control={<Checkbox 
         

          checked={
                    (() => {
                      for(let i=0; i<ids.length;i++)
                     
                      {
                        if(editRoleData !== null){
                        if(editRoleData.moduleinfo!==0){
                        if (rowData.customerId  === parseInt(ids[i])){
                          return (
                              true
                            )
                        }
                      }
                      else{
                        if (rowData.customerId  === parseInt(ids[i])){
                          return (
                              true
                            )
                        }
                      }
                    }
                    else{
                      if (rowData.customerId  === parseInt(ids[i])){
                        return (
                            true
                          )
                      }
                    }
                      }
                     
                      })()}
                

                
          onChange={()=>{handleChangeCheckbox(rowData)}}
          
          color="primary"
         />}
          className={classes.radioButtonCss}
          InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
         
          
      />
        
     </FormGroup>
    
    },
      { title: 'First Name', field: 'firstname',type: 'text',
      render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.firstname}</Text>
          
        </Typography>}
    />  
      
    },
      { title: 'Last Name', field: 'lastname',type: 'text',
      render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.lastname}</Text>
          
        </Typography>}
    />  
    },
      { title: 'Company Name', field: 'companyname', type: 'text',
      render: rowData =><FormControlLabel
         
           onClick={()=>{handleChangeCheckbox(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
         transition : 'all 0.25s',}}>{rowData.companyname}</Text>
               
             </Typography>}
         />  
    },
      { title: 'Address', field: 'addressline1',type: 'text', render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.addressline1}</Text>
          
        </Typography>}
    />  },
      { title: 'City', field: 'city', type: 'text', render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.city}</Text>
          
        </Typography>}
    />  
      
     },
     {
      title: 'Country',
      field: 'country',
      type: 'text',  editComponent: props => (
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
        
      ), render: rowData =><FormControlLabel
       
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.country}</Text>
          
        </Typography>}
    />  
    },
      {
        title: 'State',
        field: 'state',
        type: 'text', editComponent: props => (
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
          
        ), render: rowData =><FormControlLabel
         
        onClick={()=>{handleChangeCheckbox(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>{rowData.state}</Text>
            
          </Typography>}
      />  
      },
      {
        title: 'Zip',
        field: 'zip',
        type: 'text', 
        render: rowData =><FormControlLabel
         
        onClick={()=>{handleChangeCheckbox(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>{rowData.zip}</Text>
            
          </Typography>}
      />  
      },
      
      {
        title: 'Phone No.',
        field: 'phone',
        type: 'text', render: rowData =><FormControlLabel
         
        onClick={()=>{handleChangeCheckbox(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>{rowData.phone}</Text>
            
          </Typography>}
      />  
      },
      {
        title: 'Email',
        field: 'email',
        type: 'text', render: rowData =><FormControlLabel
         
        onClick={()=>{handleChangeCheckbox(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>{rowData.email}</Text>
            
          </Typography>}
      />  
      },
      {
        title: 'Customer Type',
        field: 'customertype',
        lookup: { 1: 'Residential', 2: 'Business' },
        render: rowData =><FormControlLabel
        
        onClick={()=>{handleChangeCheckbox(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
        
        <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}> {(() => {
          if(rowData.customertype===1)
          {
            return(
              <Text style={{ fontSize: '11px', 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition : 'all 0.25s',}}>Residential</Text>
              )
            }
            else{
              return(
                <Text style={{ fontSize: '11px', 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                transition : 'all 0.25s',}}>Business</Text>
                )
            }
            })()}</Text>
          
        </Typography>}
        />
      },
    ],
    
  });

  useEffect(() => {
    //fetchShiphypeCompleteStep();
    fetchCustomerList();
    },[]);


     /**
      * Description:To do fetch customer list
      */
     const fetchCustomerList = ()=>{

      //const userid=5;
      setLoading(true);
      shiphypeservice.fetchCustomerList(userid)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              setLoading(false);
                 setDataProduct(response.data);
                       }else{
                        setLoading(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }
  
     /**
     * Description:To do delete customer
     * @param {*} customproduct_id 
     */
    const deleteCustomer = (customerId)=>{
  
      shiphypeservice.deleteCustomer(customerId)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              setLoading(false);
              fetchCustomerList();
                 
                       }else{
                        setLoading(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }
  


    const addNewCustomer = (userId,firstname,lastname,companyname,addressline1,addressline2,city,state,zip,country,phone,email,customertype)=>{
      if (firstname === undefined  || 
        lastname === undefined  ||
        companyname === undefined  ||
        addressline1 === undefined  ||
        addressline2 === undefined  ||
        city === undefined  ||
        country === undefined  ||
        state === undefined  ||
        phone === undefined  ||
        customertype === undefined  ||
        zip === undefined  ) {
        setOpen1(true);
      } 
      else{
    
      shiphypeservice.addNewCustomer(userId,firstname,lastname,companyname,addressline1,addressline2,city,state,zip,country,phone,email,customertype)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              setLoading(false);
                
              fetchCustomerList();
                       }else{
                        setLoading(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
        }
    }
  
  
    const updataExistsCustomer = (customerId,firstname,lastname,companyname,addressline1,addressline2,city,state,zip,country,phone,email,customertype)=>{
   
      shiphypeservice.updateExistsCustomer(customerId,firstname,lastname,companyname,addressline1,addressline2,city,state,zip,country,phone,email,customertype)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              setLoading(false);
                
              fetchCustomerList();
                       }else{
                        setLoading(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }

/**
 * Description:To do checklist of steps
 */
const handleChangequality = (event) => {
    setQualitycontrol(event.target.checked);
    };

   /**
    * Description:To do set value of checkbox
    * @param {*} event 
    */
    const handleChangeprintsku = (event) => {
    setPrintsku(event.target.checked);

    };  

    const handleChangeButton = (id) => {
        // setProjectid(row);
          setRadioValue(id);
          console.log('button value', id)
          }; 

    const handleChangeRadio = (event) => {
        setValue(event.target.value);
       console.log("radiobutton",event.target.value);
      };
      const handleStartDateChangePick = (date,value) => {
        //setStartsprint(value);
        setSelectedpickDate(date);
        console.log("startdate",value);
    
      };
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

  const handleChangeShipDateTime = event => {
    setShipTimeDate(event.target.value);
  };
   const handleStartDateChange = (date,value) => {
    setStartsprint(value);
    setSelectedStartDate(date);
    console.log("startdate",value);

  };
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
React.useEffect(() => {
    // fetchCustomePackageingList();
  //   fetchShiphypeCompleteStep();
  if(props.editOrder !== null){
    setCheckedA(false);
    setCustomerId(props.editOrder.customerId);
    setCustomerName(props.editOrder.recipientname);
    setCustomerCountry(props.editOrder.ordercountry);
    ids.push(props.editOrder.customerId);
    setState({
      columns: [
   
        { title: '',
        render: rowData => <FormGroup>
        {
                (() => {
                  if(rowData!==undefined){
                    return(
        <FormControlLabel style={popUpStyle.checkboxPosition}
          control={<Checkbox 
            id={rowData.customerId}
  
            checked={
                    (() => {
                      for(let i=0; i<ids.length;i++)
                     
                      {
                        if(editRoleData !== null){
                        if(editRoleData.moduleinfo!==0){
                        if (rowData.customerId  === parseInt(ids[i])){
                          return (
                              true
                            )
                        }
                      }
                      else{
                        if (rowData.customerId  === parseInt(ids[i])){
                          return (
                              true
                            )
                        }
                      }
                    }
                    else{
                      if (rowData.customerId  === parseInt(ids[i])){
                        return (
                            true
                          )
                      }
                    }
                      }
                     
                      })()}
                
                  
            
            onChange={()=>{handleChangeCheckbox(rowData)}}
            
            color="primary"
           />}
            className={classes.radioButtonCss}
            InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
           
            
        />
        )

      
    }
    })()}
       </FormGroup>
      
      },
      { title: 'First Name', field: 'firstname',type: 'text',
      render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.firstname}</Text>
          
        </Typography>}
    />  
      
    },
      { title: 'Last Name', field: 'lastname',type: 'text',
      render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.lastname}</Text>
          
        </Typography>}
    />  
    },
      { title: 'Company Name', field: 'companyname', type: 'text',
      render: rowData =><FormControlLabel
         
           onClick={()=>{handleChangeCheckbox(rowData)}}
           className={classes.quantitycss}
           control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
         transition : 'all 0.25s',}}>{rowData.companyname}</Text>
               
             </Typography>}
         />  
    },
      { title: 'Address', field: 'addressline1',type: 'text', render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.addressline1}</Text>
          
        </Typography>}
    />  },
      { title: 'City', field: 'city', type: 'text', render: rowData =><FormControlLabel
         
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.city}</Text>
          
        </Typography>}
    />  
      
     },
     {
      title: 'Country',
      field: 'country',
      type: 'text',  editComponent: props => (
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
        
      ), render: rowData =><FormControlLabel
       
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.country}</Text>
          
        </Typography>}
    />  
    },
      {
        title: 'State',
        field: 'state',
        type: 'text', editComponent: props => (
          <FormControl className={classes.formControl}>
          
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.value}
            onChange={e =>handleChangeSource1(e,props)}
          >
            <MenuItem value={0}>  
Select State</MenuItem>
          {valueofsouceid.map(option => (
            <MenuItem value={option.label}>  
            {option.label}</MenuItem>
           
           ))}
          
          </Select>
        </FormControl>
          
        ), render: rowData =><FormControlLabel
         
        onClick={()=>{handleChangeCheckbox(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>{rowData.state}</Text>
            
          </Typography>}
      />  
      },
      {
        title: 'Zip',
        field: 'zip',
        type: 'text', render: rowData =><FormControlLabel
         
        onClick={()=>{handleChangeCheckbox(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>{rowData.zip}</Text>
            
          </Typography>}
      />  
      },
      
      {
        title: 'Phone No.',
        field: 'phone',
        type: 'text', render: rowData =><FormControlLabel
         
        onClick={()=>{handleChangeCheckbox(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>{rowData.phone}</Text>
            
          </Typography>}
      />  
      },
      {
        title: 'Email',
        field: 'email',
        type: 'text', render: rowData =><FormControlLabel
         
        onClick={()=>{handleChangeCheckbox(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
      transition : 'all 0.25s',}}>{rowData.email}</Text>
            
          </Typography>}
      />  
      },
      {
        title: 'Customer Type',
        field: 'customertype',
        lookup: { 1: 'Residential', 2: 'Business' },
        render: rowData =><FormControlLabel
        
        onClick={()=>{handleChangeCheckbox(rowData)}}
        className={classes.quantitycss}
        control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
        
        <Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}> {(() => {
          if(rowData.customertype===1)
          {
            return(
              <Text style={{ fontSize: '11px', 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
              transition : 'all 0.25s',}}>Residential</Text>
              )
            }
            else{
              return(
                <Text style={{ fontSize: '11px', 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                transition : 'all 0.25s',}}>Business</Text>
                )
            }
            })()}</Text>
          
        </Typography>}
        />
      },
      ],
      

    })


  }   
  else{
    if(props.customerId!==0)
    {
      if(props.customerId.length!==0)
      {

      setCheckedA(false);
      
    setCustomerId(props.customerId);
    setCustomerName(props.customerName);
   // setCustomerCountry(props.editOrder.ordercountry);
   for (let i=0;i<props.customerId.length;i++)
   {
    ids.push(props.customerId[i]);
   }

    const updatedaray = [...ids];

    setchangedWarehouseid(updatedaray);
  
   setState({
     columns: [
  
       { title: '',
       render: rowData => <FormGroup>
        {
                (() => {
                  if(rowData!==undefined){
                    return(
       <FormControlLabel style={popUpStyle.checkboxPosition}
         control={<Checkbox 
           id={rowData.customerId}
 
           checked={
                   (() => {
                     for(let i=0; i<ids.length;i++)
                    
                     {
                       if(editRoleData !== null){
                       if(editRoleData.moduleinfo!==0){
                       if (rowData.customerId  === parseInt(ids[i])){
                         return (
                             true
                           )
                       }
                     }
                     else{
                       if (rowData.customerId  === parseInt(ids[i])){
                         return (
                             true
                           )
                       }
                     }
                   }
                   else{
                     if (rowData.customerId  === parseInt(ids[i])){
                       return (
                           true
                         )
                     }
                   }
                     }
                    
                     })()}
               
                 
           
           onChange={()=>{handleChangeCheckbox(rowData)}}
           
           color="primary"
          />}
           className={classes.radioButtonCss}
           InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
          
           
       />
       )

      
    }
    })()}
      </FormGroup>
     
     },
     { title: 'First Name', field: 'firstname',type: 'text',
     render: rowData =><FormControlLabel
        
     onClick={()=>{handleChangeCheckbox(rowData)}}
     className={classes.quantitycss}
     control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   transition : 'all 0.25s',}}>{rowData.firstname}</Text>
         
       </Typography>}
   />  
     
   },
     { title: 'Last Name', field: 'lastname',type: 'text',
     render: rowData =><FormControlLabel
        
     onClick={()=>{handleChangeCheckbox(rowData)}}
     className={classes.quantitycss}
     control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   transition : 'all 0.25s',}}>{rowData.lastname}</Text>
         
       </Typography>}
   />  
   },
     { title: 'Company Name', field: 'companyname', type: 'text',
     render: rowData =><FormControlLabel
        
          onClick={()=>{handleChangeCheckbox(rowData)}}
          className={classes.quantitycss}
          control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
        transition : 'all 0.25s',}}>{rowData.companyname}</Text>
              
            </Typography>}
        />  
   },
     { title: 'Address', field: 'addressline1',type: 'text', render: rowData =><FormControlLabel
        
     onClick={()=>{handleChangeCheckbox(rowData)}}
     className={classes.quantitycss}
     control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   transition : 'all 0.25s',}}>{rowData.addressline1}</Text>
         
       </Typography>}
   />  },
     { title: 'City', field: 'city', type: 'text', render: rowData =><FormControlLabel
        
     onClick={()=>{handleChangeCheckbox(rowData)}}
     className={classes.quantitycss}
     control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
   fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
   transition : 'all 0.25s',}}>{rowData.city}</Text>
         
       </Typography>}
   />  
     
    },
    {
      title: 'Country',
      field: 'country',
      type: 'text',  editComponent: props => (
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
        
      ), render: rowData =><FormControlLabel
       
      onClick={()=>{handleChangeCheckbox(rowData)}}
      className={classes.quantitycss}
      control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}>{rowData.country}</Text>
          
        </Typography>}
    />  
    },
     {
       title: 'State',
       field: 'state',
       type: 'text', editComponent: props => (
         <FormControl className={classes.formControl}>
         
         <Select
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           value={props.value}
           onChange={e =>handleChangeSource1(e,props)}
         >
           <MenuItem value={0}>  
Select State</MenuItem>
         {valueofsouceid.map(option => (
           <MenuItem value={option.label}>  
           {option.label}</MenuItem>
          
          ))}
         
         </Select>
       </FormControl>
         
       ), render: rowData =><FormControlLabel
        
       onClick={()=>{handleChangeCheckbox(rowData)}}
       className={classes.quantitycss}
       control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     transition : 'all 0.25s',}}>{rowData.state}</Text>
           
         </Typography>}
     />  
     },
     {
       title: 'Zip',
       field: 'zip',
       type: 'text', render: rowData =><FormControlLabel
        
       onClick={()=>{handleChangeCheckbox(rowData)}}
       className={classes.quantitycss}
       control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     transition : 'all 0.25s',}}>{rowData.zip}</Text>
           
         </Typography>}
     />  
     },
     
     {
       title: 'Phone No.',
       field: 'phone',
       type: 'text', render: rowData =><FormControlLabel
        
       onClick={()=>{handleChangeCheckbox(rowData)}}
       className={classes.quantitycss}
       control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     transition : 'all 0.25s',}}>{rowData.phone}</Text>
           
         </Typography>}
     />  
     },
     {
       title: 'Email',
       field: 'email',
       type: 'text', render: rowData =><FormControlLabel
        
       onClick={()=>{handleChangeCheckbox(rowData)}}
       className={classes.quantitycss}
       control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     transition : 'all 0.25s',}}>{rowData.email}</Text>
           
         </Typography>}
     />  
     },
     {
       title: 'Customer Type',
       field: 'customertype',
       lookup: { 1: 'Residential', 2: 'Business' },
       render: rowData =><FormControlLabel
       
       onClick={()=>{handleChangeCheckbox(rowData)}}
       className={classes.quantitycss}
       control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
       
       <Text style={{ fontSize: '11px', 
       fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
       transition : 'all 0.25s',}}> {(() => {
         if(rowData.customertype===1)
         {
           return(
             <Text style={{ fontSize: '11px', 
             fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
             transition : 'all 0.25s',}}>Residential</Text>
             )
           }
           else{
             return(
               <Text style={{ fontSize: '11px', 
               fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
               transition : 'all 0.25s',}}>Business</Text>
               )
           }
           })()}</Text>
         
       </Typography>}
       />
     },
     ],
     

   })

  }
    }
   
  }  
  } ,[]);
 
 

    const onNextfunction=()=>{

        props.setCustomerIdUpdate(changedWarehouseid,custmoerName,custmoerCountry);
      //  props.handleNextPage('select_ship_type');
      //props.backButtonRouting('ShippingPolicyOrder');
      props.handleNextPage('select_ship_type');
    }

    const handleCallbackfunction =()=>{
       // props.backButtonRouting('select_order_type');
        props.backButtonRouting('select_Order_Product');
      }

      var i=0;
      var flag =false;
      const handleChangeCheckbox = (data) => {
        if(ids.length === 0){
          ids.push(data.customerId);
        }else{
          for(let i=0;i<ids.length ;i++){
          if(data.customerId !== ids[i]){
           // ids.push(data);
            //ids.splice(0, 1);
            flag=true;
          }else{
            flag=false;
            break; 
          }
          
          }
          if(flag === true){
            ids.push(data.customerId); 
          }else{
            const index =  ids.indexOf(data.customerId);
            if (index > -1) {
              ids.splice(index, 1);
            }
          }
          
        }
        

        console.log("customeridata",data);
        const updatedaray = [...ids];

    setchangedWarehouseid(updatedaray);

        setCheckedA(false);
        if(data !== undefined){

        
        setCustomerDataSelect(data);
        if(i === data.customerId){
          i=0;
          setCustomerId(0);
          setCustomerName('');
          setCustomerCountry('');
          console.log("customeridA",i);
        }else{
          i=data.customerId;
          setCustomerId(data.customerId);
          setCustomerName(data.firstname+" "+data.lastname);
          setCustomerCountry(data.country);
          console.log("customeridB",i);
        }
        
setState({
  columns: [

    { title: '',
    render: rowData => <FormGroup>
    {
                (() => {
                  if(rowData!==undefined){
                    return(
    <FormControlLabel style={popUpStyle.checkboxPosition}
      control={<Checkbox 
       

        checked={
                    (() => {
                      for(let i=0; i<ids.length;i++)
                     
                      {
                        if(editRoleData !== null){
                        if(editRoleData.moduleinfo!==0){
                        if (rowData.customerId  === parseInt(ids[i])){
                          return (
                              true
                            )
                        }
                      }
                      else{
                        if (rowData.customerId  === parseInt(ids[i])){
                          return (
                              true
                            )
                        }
                      }
                    }
                    else{
                      if (rowData.customerId  === parseInt(ids[i])){
                        return (
                            true
                          )
                      }
                    }
                      }
                     
                      })()}
                
        
        onChange={()=>{handleChangeCheckbox(rowData)}}
        
        color="primary"
       />}
        className={classes.radioButtonCss}
        InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
       
        
    />
    )

                    }
})()}
   </FormGroup>
  
  },
  { title: 'First Name', field: 'firstname',type: 'text',
  render: rowData =><FormControlLabel
     
  onClick={()=>{handleChangeCheckbox(rowData)}}
  className={classes.quantitycss}
  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{rowData.firstname}</Text>
      
    </Typography>}
/>  
  
},
  { title: 'Last Name', field: 'lastname',type: 'text',
  render: rowData =><FormControlLabel
     
  onClick={()=>{handleChangeCheckbox(rowData)}}
  className={classes.quantitycss}
  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{rowData.lastname}</Text>
      
    </Typography>}
/>  
},
  { title: 'Company Name', field: 'companyname', type: 'text',
  render: rowData =><FormControlLabel
     
       onClick={()=>{handleChangeCheckbox(rowData)}}
       className={classes.quantitycss}
       control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
     fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
     transition : 'all 0.25s',}}>{rowData.companyname}</Text>
           
         </Typography>}
     />  
},
  { title: 'Address', field: 'addressline1',type: 'text', render: rowData =><FormControlLabel
     
  onClick={()=>{handleChangeCheckbox(rowData)}}
  className={classes.quantitycss}
  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{rowData.addressline1}</Text>
      
    </Typography>}
/>  },
  { title: 'City', field: 'city', type: 'text', render: rowData =><FormControlLabel
     
  onClick={()=>{handleChangeCheckbox(rowData)}}
  className={classes.quantitycss}
  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{rowData.city}</Text>
      
    </Typography>}
/>  
  
 },
 {
  title: 'Country',
  field: 'country',
  type: 'text',  editComponent: props => (
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
    
  ), render: rowData =><FormControlLabel
   
  onClick={()=>{handleChangeCheckbox(rowData)}}
  className={classes.quantitycss}
  control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
transition : 'all 0.25s',}}>{rowData.country}</Text>
      
    </Typography>}
/>  
},
  {
    title: 'State',
    field: 'state',
    type: 'text',  editComponent: props => (
      <FormControl className={classes.formControl}>
      
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        onChange={e =>handleChangeSource1(e,props)}
      >
        <MenuItem value={0}>  
Select State</MenuItem>
      {valueofsouceid.map(option => (
        <MenuItem value={option.label}>  
        {option.label}</MenuItem>
       
       ))}
      
      </Select>
    </FormControl>
      
    ),render: rowData =><FormControlLabel
     
    onClick={()=>{handleChangeCheckbox(rowData)}}
    className={classes.quantitycss}
    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.state}</Text>
        
      </Typography>}
  />  
  },
  {
    title: 'Zip',
    field: 'zip',
    type: 'text', render: rowData =><FormControlLabel
     
    onClick={()=>{handleChangeCheckbox(rowData)}}
    className={classes.quantitycss}
    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.zip}</Text>
        
      </Typography>}
  />  
  },
 
  {
    title: 'Phone No.',
    field: 'phone',
    type: 'text', render: rowData =><FormControlLabel
     
    onClick={()=>{handleChangeCheckbox(rowData)}}
    className={classes.quantitycss}
    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.phone}</Text>
        
      </Typography>}
  />  
  },
  {
    title: 'Email',
    field: 'email',
    type: 'text', render: rowData =><FormControlLabel
     
    onClick={()=>{handleChangeCheckbox(rowData)}}
    className={classes.quantitycss}
    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>

<Text style={{ fontSize: '11px', 
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
  transition : 'all 0.25s',}}>{rowData.email}</Text>
        
      </Typography>}
  />  
  },
  {
    title: 'Customer Type',
    field: 'customertype',
    lookup: { 1: 'Residential', 2: 'Business' },
    render: rowData =><FormControlLabel
    
    onClick={()=>{handleChangeCheckbox(rowData)}}
    className={classes.quantitycss}
    control={<Typography style={{marginLeft:'20px',fontSize:'2px',cursor:'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>
    
    <Text style={{ fontSize: '11px', 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    transition : 'all 0.25s',}}> {(() => {
      if(rowData.customertype===1)
      {
        return(
          <Text style={{ fontSize: '11px', 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          transition : 'all 0.25s',}}>Residential</Text>
          )
        }
        else{
          return(
            <Text style={{ fontSize: '11px', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            transition : 'all 0.25s',}}>Business</Text>
            )
        }
        })()}</Text>
      
    </Typography>}
    />
  },
  ],
  

})

}
      };
      const handleChangeSource1  = (event,props) =>{
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
    
      const handleChangeSource  = (event,props) =>{
        // setSorceId(event.target.value);
        // valueofsouceid=event.target.value;
        props.onChange(event.target.value);
       
      };
      const handleClose3 = () => {
        setOpen1(false);
        // handleNextPage(22);
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
                    const hasError = field =>
                    formState.touched[field] && formState.errors[field] ? true : false;
          let screenWidth = Dimensions.get('window').width;

    return (  
      <View className={classes.content}>
    <View className={classes.appBarSpacer} />
  
              <View >
            <Grid item  container lg={12}>
            <Grid item  lg={5}   style={popUpStyle.breadCrumSidePadding}>
            <Link  onClick={()=>{props.handleDashboard('01')}}>
            <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link><Text style={popUpStyle.breadCrundCss}>  ORDERS / MANUAL ORDER /</Text>
          <Text style={popUpStyle.breadCrundCss2}> SELECT CUSTOMER {'\n'} </Text> 
            
              </Grid>
              <Grid item  lg={2} ></Grid>
              </Grid>
              </View>  
              <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>

         {/* <ScrollView> */}
         <View style={popUpStyle.paddingSide}>
         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={4} lg={4}>
            <Text style={{ fontSize: '15px',
            fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Select Customer(s)</Text>
              </Grid>
              <Grid item xs={12} md={4} lg={4}></Grid>
              <Grid item xs={12} md={4} lg={4}>
  
              <Grid container item  justify="flex-end">

              <Grid>
              <ColorButton
       size='large'
       variant="contained"
       color="primary"
       onClick={()=>{handleCallbackfunction()}}>
          Back
       </ColorButton>&nbsp;&nbsp;
              </Grid>
            <Grid>
              <ColorButton
       size='large'
       variant="contained"
       color="primary"
       disabled={checkedA}
       //className={classes.profileMargin}
       onClick={()=>{onNextfunction()}}
       >
          Next
       </ColorButton>
    
              </Grid>
              </Grid>
            
              </Grid>
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
              <View >
         
         <MaterialTable
       style={{ padding: "0px",marginTop: '10px'}}
        title={<Text style={{ fontSize: '13px',
          // fontWeight: '700',
           fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
           color: '#001737',
         
           transition : 'all 0.25s',}}>Select Customer</Text> }
       columns={state.columns}
       data={dataproduct}
       icons={tableIcons}
       components={{
         Container: props => <Paper {...props} elevation={0}/>,
        
         Toolbar: props => (
           <StyledMTableToolbar {...props} />
         ),
         Action: (props) => {
            //If isn't the add action
            if (
              typeof props.action === typeof Function ||
              props.action.tooltip !== "Add"
            ) {
              return <MTableAction {...props} />;
            } else {
              return <div ref={addActionRef} onClick={props.action.onClick} />;
            }
          }
       }}
       localization={{
        toolbar: {
            searchPlaceholder: "Search Customers"
        },
        header: {
          actions: "ACTION",
        },
    }}
    actions={[
      {
                icon: () => (
                  <ColorButtonAdd
                    size="large"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Customer
                  </ColorButtonAdd>
                ),
                onClick: (event, rowData) => {
                  addActionRef.current.click();
                },
                isFreeAction: true,
                //tooltip: "Add Button",
              },
              {
                  icon: () => (
                    <ColorButtonRefresh
                    size="large"
                      variant="contained"
                      color="primary"
                      startIcon={<RefreshIcon />}
                    >
                      Refresh
                    </ColorButtonRefresh>
                  ),
                  //tooltip: "Refresh",
                  isFreeAction: true,
                  onClick: (event) =>  fetchCustomerList(),
                },    
     
    ]}
       options={{
       paging: true,
      // pageSize:7,
       maxBodyHeight: 380,
       doubleHorizontalScroll: true,
       headerStyle: { position: 'sticky', top: 0 },
       pageSize:10,
           pageSizeOptions:[10,20,30,40,50,100],
       showTitle: false,
       addRowPosition: 'first',
       actionsColumnIndex: -1,
       exportFileName: "Customer List",
       headerStyle: {
           backgroundColor: '#cccccc',
           color: '#000',
          
           textTransform: 'uppercase',
           width: 40,
           whiteSpace: 'nowrap',
           textAlign: 'left',
           flexDirection: 'row',
           overflow: 'hidden',
           textOverflow: 'ellipsis',
           paddingLeft: 5,
           paddingTop:8,
           paddingBottom:8,
           paddingRight: 0,
           fontSize:'12px',
      //     backgroundColor: theme.palette.primary.table,
          fontWeight: 'bold',
           //color: theme.palette.primary.main,
         },
         cellStyle: {
           backgroundColor: '#fff',
           color: '#000',
           border:'1px solid #cccccc',

           width: 40,
           whiteSpace: 'nowrap',
           textAlign: 'left',
           flexDirection: 'row',
           overflow: 'hidden',
           textOverflow: 'ellipsis',
           fontSize:'11px',
           paddingLeft: 5,
           paddingTop:0,
           paddingBottom:0,
           paddingRight: 0,
         },
         rowStyle: {
           backgroundColor: '#fff',
           color: '#000',
           border:'1px solid #cccccc',

           width: 26,
           whiteSpace: 'nowrap',
           textAlign: 'left',
           flexDirection: 'row',
           overflow: 'hidden',
           textOverflow: 'ellipsis',
           paddingLeft: 0,
           paddingTop:0,
           paddingBottom:0,
           paddingRight: 0,
         },
         search: true,
         exportButton: false,
         selection: false,
         showSelectAllCheckbox:false,
         showTextRowsSelected:false,
         
         selectionProps: rowData => ({
          checked: rowData.customerId === custmoerId, 
        })
     }}

     onSelectionChange={(rows) => {
            handleChangeCheckbox(rows);
        }}
       editable={{
         onRowAdd: newData =>
           new Promise((resolve, reject) => {
             setTimeout(() => {
               {
                 
                 addNewCustomer(userid,newData.firstname,newData.lastname,newData.companyname,newData.addressline1,newData.addressline1,newData.city,newData.state,newData.zip,newData.country,newData.phone,newData.email,1);
              
               }
               resolve()
             }, 1000)
           }),
         onRowUpdate: (newData, oldData) =>
           new Promise((resolve, reject) => {
             setTimeout(() => {
               {
                 const data = dataproduct;
                 const index = data.indexOf(oldData);
                 const customerid=(dataproduct[index].customerId);
                 updataExistsCustomer(customerid,newData.firstname,newData.lastname,newData.companyname,newData.addressline1,newData.addressline1,newData.city,newData.state,newData.zip,newData.country,newData.phone,newData.email,newData.customertype);
              
               }
               resolve()
             }, 1000)
           }),
         onRowDelete: oldData =>
           new Promise((resolve, reject) => {
             setTimeout(() => {
               {
                 const data = dataproduct;
                 const index = data.indexOf(oldData);
                
                 const customerid=(dataproduct[index].customerId);
                 
                 deleteCustomer(customerid);
               }
               resolve()
             }, 1000)
           }),
       }}
     />
       </View>
  {showToast(open,msg,type)}
        </View>
       
         
           
        </View>
    );
  }