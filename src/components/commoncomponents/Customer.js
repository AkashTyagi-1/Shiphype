import React, { useState, useEffect } from "react";
import {
  fade,
  withStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import {
  Platform,
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
} from "react-native";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import * as shiphypeservice from "./ShipService/shiphype_service";
import Link from "@material-ui/core/Link";
import InputBase from "@material-ui/core/InputBase";
import Switch from "@material-ui/core/Switch";
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
import Paper from "@material-ui/core/Paper";
import Toast from "./feedback/Toast";
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
import ProgressBar from "./feedback//ProgressBar";

import AddIcon from "@material-ui/icons/Add";
import popUpStyle from "./style/popUpStyle";
import Autocomplete from "@material-ui/lab/Autocomplete";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import RefreshIcon from "@material-ui/icons/Refresh";
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

const ColorButtonAdd = withStyles((theme) => ({
  root: {
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    //marginTop:'3%',
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
  RefreshIcon: forwardRef((props, ref) => (
    <RefreshIcon {...props} ref={ref} color="action" />
  )),
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

const countryData = [
  {
    id: 1,
    code: "CA",
    label: "Canada",
  },

  {
    id: 3,
    code: "US",
    label: "United States",
  },
  {
    id: 2,
    code: "GB",
    label: "United Kingdom",
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
const stateDataCanada = [
  {
    id: 2,
    code: "Prairies",
    label: "AB",
  },
  {
    id: 2,
    code: "British Columbia",
    label: "BC",
  },
  {
    id: 2,
    code: "Prairies",
    label: "MB",
  },
  {
    id: 2,
    code: "Atlantic",
    label: "NB",
  },
  {
    id: 2,
    code: "Atlantic",
    label: "NS",
  },
  {
    id: 2,
    code: "Atlantic",
    label: "NL",
  },
  {
    id: 2,
    code: "Territories",
    label: "NT",
  },
  {
    id: 2,
    code: "Territories",
    label: "NU",
  },
  {
    id: 2,
    code: "Ontario",
    label: "ON",
  },
  {
    id: 2,
    code: "Atlantic",
    label: "PE",
  },
  {
    id: 2,
    code: "Quebec",
    label: "QC",
  },
  {
    id: 2,
    code: "Prairies",
    label: "SK",
  },
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
  },
  {
    id: 2,
    code: "Alaska",
    label: "AK",
  },
  {
    id: 2,
    code: "Arizona",
    label: "AZ",
  },
  {
    id: 2,
    code: "Arkansas",
    label: "AR",
  },
  {
    id: 2,
    code: "California",
    label: "CA",
  },
  {
    id: 2,
    code: "Colorado",
    label: "CO",
  },
  {
    id: 2,
    code: "Connecticut",
    label: "CT",
  },
  {
    id: 2,
    code: "Delaware",
    label: "DE",
  },
  {
    id: 2,
    code: "Florida",
    label: "FL",
  },
  {
    id: 2,
    code: "Georgia",
    label: "GA",
  },
  {
    id: 2,
    code: "Hawaii",
    label: "HI",
  },
  {
    id: 2,
    code: "Idaho",
    label: "ID",
  },
  {
    id: 2,
    code: "Illinois",
    label: "IL",
  },
  {
    id: 2,
    code: "Indiana",
    label: "IN",
  },
  {
    id: 2,
    code: "Iowa",
    label: "IA",
  },
  {
    id: 2,
    code: "Kansas",
    label: "KS",
  },
  {
    id: 2,
    code: "Kentucky",
    label: "KY",
  },
  {
    id: 2,
    code: "Louisiana",
    label: "LA",
  },
  {
    id: 2,
    code: "Maine",
    label: "ME",
  },
  {
    id: 2,
    code: "Maryland",
    label: "MD",
  },
  {
    id: 2,
    code: "Massachusetts",
    label: "MA",
  },
  {
    id: 2,
    code: "Michigan",
    label: "MI",
  },
  {
    id: 2,
    code: "Minnesota",
    label: "MN",
  },
  {
    id: 2,
    code: "Mississippi",
    label: "MS",
  },
  {
    id: 2,
    code: "Missouri",
    label: "MO",
  },
  {
    id: 2,
    code: "Montana",
    label: "MT",
  },
  {
    id: 2,
    code: "Nebraska",
    label: "NE",
  },
  {
    id: 2,
    code: "Nevada",
    label: "NV",
  },
  {
    id: 2,
    code: "New Hampshire",
    label: "NH",
  },
  {
    id: 2,
    code: "New Jersey",
    label: "NJ",
  },
  {
    id: 2,
    code: "New Mexico",
    label: "NM",
  },
  {
    id: 2,
    code: "New York",
    label: "NY",
  },
  {
    id: 2,
    code: "North Carolina",
    label: "NC",
  },
  {
    id: 2,
    code: "North Dakota",
    label: "ND",
  },
  {
    id: 2,
    code: "Ohio",
    label: "OH",
  },
  {
    id: 2,
    code: "Oklahoma",
    label: "OK",
  },
  {
    id: 2,
    code: "Oregon",
    label: "OR",
  },
  {
    id: 2,
    code: "Pennsylvania",
    label: "PA",
  },
  {
    id: 2,
    code: "Rhode Island",
    label: "RI",
  },
  {
    id: 2,
    code: "South Carolina",
    label: "SC",
  },
  {
    id: 2,
    code: "South Dakota",
    label: "SD",
  },
  {
    id: 2,
    code: "Tennessee",
    label: "TN",
  },
  {
    id: 2,
    code: "Texas",
    label: "TX",
  },
  {
    id: 2,
    code: "Utah",
    label: "UT",
  },
  {
    id: 2,
    code: "Vermont",
    label: "VT",
  },
  {
    id: 2,
    code: "Virginia",
    label: "VA",
  },
  {
    id: 2,
    code: "Washington",
    label: "WA",
  },
  {
    id: 2,
    code: "West Virginia",
    label: "WV",
  },
  {
    id: 2,
    code: "Wisconsin",
    label: "WI",
  },
  {
    id: 2,
    code: "Wyoming",
    label: "WY",
  },
  {
    id: 2,
    code: "American Samoa",
    label: "AS",
  },
  {
    id: 2,
    code: "District of Columbia",
    label: "DC",
  },
  {
    id: 2,
    code: "Federated States of Micronesia ",
    label: "FM",
  },
  {
    id: 2,
    code: "Guam",
    label: "GU",
  },
  {
    id: 2,
    code: "Marshall Islands",
    label: "MH",
  },
  {
    id: 2,
    code: "Northern Mariana Islands",
    label: "MP",
  },
  {
    id: 2,
    code: "Palau",
    label: "PW",
  },
  {
    id: 2,
    code: "Puerto Rico",
    label: "PR",
  },
  {
    id: 2,
    code: "Virgin Islands",
    label: "VI",
  },
];
const stateData = [
  {
    id: 1,
    code: "Australian Capital Territory",
    label: "ACT",
  },
  {
    id: 2,
    code: "New South Wales",
    label: "NSW",
  },
  {
    id: 2,
    code: "Northern Territory",
    label: "NT",
  },
  {
    id: 2,
    code: "Queensland",
    label: "QLD",
  },
  {
    id: 2,
    code: "South Australia",
    label: "SA",
  },
  {
    id: 2,
    code: "Tasmania",
    label: "TAS",
  },
  {
    id: 2,
    code: "Victoria",
    label: "VIC",
  },
  {
    id: 2,
    code: "Western Australia",
    label: "WA",
  },
  {
    id: 2,
    code: "Acre",
    label: "	AC",
  },
  {
    id: 2,
    code: "Alagoas",
    label: "AL",
  },
  {
    id: 2,
    code: "Amapá",
    label: "AP",
  },
  {
    id: 2,
    code: "Amazonas",
    label: "AM",
  },
  {
    id: 2,
    code: "Bahia",
    label: "BA",
  },
  {
    id: 2,
    code: "Ceará",
    label: "CE",
  },
  {
    id: 2,
    code: "Distrito Federal",
    label: "DF",
  },
  {
    id: 2,
    code: "Espírito Santo",
    label: "ES",
  },
  {
    id: 2,
    code: "Goias",
    label: "GO",
  },
  {
    id: 2,
    code: "Maranhao",
    label: "MA",
  },
  {
    id: 2,
    code: "Mato Grosso",
    label: "MT",
  },
  {
    id: 2,
    code: "Mato Grosso do Sul",
    label: "MS",
  },
  {
    id: 2,
    code: "Minas Gerais",
    label: "MG",
  },
  {
    id: 2,
    code: "Pará",
    label: "PA",
  },
  {
    id: 2,
    code: "Paraíba",
    label: "PB",
  },
  {
    id: 2,
    code: "Paraná",
    label: "PR",
  },
  {
    id: 2,
    code: "Pernambuco",
    label: "PE",
  },
  {
    id: 2,
    code: "Piauí",
    label: "PI",
  },
  {
    id: 2,
    code: "Rio de Janeiro",
    label: "RJ",
  },
  {
    id: 2,
    code: "Rio Grande do Norte",
    label: "RN",
  },
  {
    id: 2,
    code: "Rio Grande do Sul",
    label: "RS",
  },
  {
    id: 2,
    code: "Rondônia",
    label: "RO",
  },
  {
    id: 2,
    code: "Roraima",
    label: "RR",
  },
  {
    id: 2,
    code: "Santa Catarina",
    label: "SC",
  },
  {
    id: 2,
    code: "Sao Paulo",
    label: "SP",
  },
  {
    id: 2,
    code: "Sergipe",
    label: "SE",
  },
  {
    id: 2,
    code: "Tocantins",
    label: "TO",
  },
  {
    id: 2,
    code: "Alberta",
    label: "AB",
  },
  {
    id: 2,
    code: "British Columbia",
    label: "BC",
  },
  {
    id: 2,
    code: "Manitoba",
    label: "MB",
  },
  {
    id: 2,
    code: "New Brunswick",
    label: "NB",
  },
  {
    id: 2,
    code: "Newfoundland and Labrador",
    label: "NL",
  },
  {
    id: 2,
    code: "Northwest Territories",
    label: "NT",
  },
  {
    id: 2,
    code: "Nova Scotia",
    label: "NS",
  },
  {
    id: 2,
    code: "Nunavut",
    label: "NU",
  },
  {
    id: 2,
    code: "Ontario",
    label: "ON",
  },
  {
    id: 2,
    code: "Prince Edward Island",
    label: "PE",
  },
  {
    id: 2,
    code: "Quebec",
    label: "QC",
  },
  {
    id: 2,
    code: "Saskatchewan",
    label: "SK",
  },
  {
    id: 2,
    code: "Yukon",
    label: "YT",
  },
  {
    id: 2,
    code: "Alabama",
    label: "AL",
  },
  {
    id: 2,
    code: "Alaska",
    label: "AK",
  },
  {
    id: 2,
    code: "Arizona",
    label: "AZ",
  },
  {
    id: 2,
    code: "Arkansas",
    label: "AR",
  },
  {
    id: 2,
    code: "Armed Forces Pacific",
    label: "AP",
  },
  {
    id: 2,
    code: "Armed Forces, Americas",
    label: "AA",
  },
  {
    id: 2,
    code: "Armed Forces, Europe & Other",
    label: "AE",
  },
  {
    id: 2,
    code: "California",
    label: "CA",
  },
  {
    id: 2,
    code: "Colorado",
    label: "CO",
  },
  {
    id: 2,
    code: "Connecticut",
    label: "CT",
  },
  {
    id: 2,
    code: "Delaware",
    label: "DE",
  },
  {
    id: 2,
    code: "District Of Columbia",
    label: "DC",
  },
  {
    id: 2,
    code: "Florida",
    label: "FL",
  },
  {
    id: 2,
    code: "Georgia",
    label: "GA",
  },
  {
    id: 2,
    code: "Hawaii",
    label: "HI",
  },
  {
    id: 2,
    code: "Idaho",
    label: "ID",
  },
  {
    id: 2,
    code: "Illinois",
    label: "IL",
  },
  {
    id: 2,
    code: "Indiana",
    label: "IN",
  },
  {
    id: 2,
    code: "Iowa",
    label: "IA",
  },
  {
    id: 2,
    code: "Kansas",
    label: "KS",
  },
  {
    id: 2,
    code: "Kentucky",
    label: "KY",
  },
  {
    id: 2,
    code: "Louisiana",
    label: "LA",
  },
  {
    id: 2,
    code: "Maine",
    label: "ME",
  },
  {
    id: 2,
    code: "Maryland",
    label: "MD",
  },
  {
    id: 2,
    code: "Massachusetts",
    label: "MA",
  },
  {
    id: 2,
    code: "Michigan",
    label: "MI",
  },
  {
    id: 2,
    code: "Minnesota",
    label: "MN",
  },
  {
    id: 2,
    code: "Mississippi",
    label: "MS",
  },
  {
    id: 2,
    code: "Missouri",
    label: "MO",
  },
  {
    id: 2,
    code: "Montana",
    label: "MT",
  },
  {
    id: 2,
    code: "Nebraska",
    label: "NE",
  },
  {
    id: 2,
    code: "Nevada",
    label: "NV",
  },
  {
    id: 2,
    code: "New Hampshire",
    label: "NH",
  },
  {
    id: 2,
    code: "New Jersey",
    label: "NJ",
  },
  {
    id: 2,
    code: "New Mexico",
    label: "NM",
  },
  {
    id: 2,
    code: "New York",
    label: "NY",
  },
  {
    id: 2,
    code: "North Carolina",
    label: "NC",
  },
  {
    id: 2,
    code: "North Dakota",
    label: "ND",
  },
  {
    id: 2,
    code: "Ohio",
    label: "OH",
  },
  {
    id: 2,
    code: "Oklahoma",
    label: "OK",
  },
  {
    id: 2,
    code: "Oregon",
    label: "OR",
  },
  {
    id: 2,
    code: "Pennsylvania",
    label: "PA",
  },
  {
    id: 2,
    code: "Rhode Island",
    label: "RI",
  },
  {
    id: 2,
    code: "South Carolina",
    label: "SC",
  },
  {
    id: 2,
    code: "South Dakota",
    label: "SD",
  },
  {
    id: 2,
    code: "Tennessee",
    label: "TN",
  },
  {
    id: 2,
    code: "Texas",
    label: "TX",
  },
  {
    id: 2,
    code: "Utah",
    label: "UT",
  },
  {
    id: 2,
    code: "Vermont",
    label: "VT",
  },
  {
    id: 2,
    code: "Virginia",
    label: "VA",
  },
  {
    id: 2,
    code: "Washington",
    label: "WA",
  },
  {
    id: 2,
    code: "West Virginia",
    label: "WV",
  },
  {
    id: 2,
    code: "Wisconsin",
    label: "WI",
  },
  {
    id: 2,
    code: "Wyoming",
    label: "WY",
  },
  {
    id: 2,
    code: "Virgin Islands",
    label: "VI",
  },
];
const packageingType = [
  {
    value: "w2",
    label: "Corrugated Box",
  },
  {
    value: "w3",
    label: "Poly Bubble Mailer",
  },
];
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #ced4da",
    fontSize: 15,
    padding: "2px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 0,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(0, 0, 0),
    borderRadius: 0,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    height: "80vh",
    overflow: "auto",
    backgroundColor: "#fff",
  },

  quantitycss: {
    width: "90%",
    fontSize: "6px",
    cursor: "pointer",
    underline: {
      "&&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
    },
  },
}));

/****   For changing the textfield radius  : End *********/
const styles = (theme) => ({
  root: {
    "@media print": {
      margin: 0,
      padding: theme.spacing(1),
      borderRadius: 0,
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: "-2px",
    color: theme.palette.grey[500],
  },
});
//Make custom button
const ColorButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#0168fa",
    borderColor: "#0168fa",
    borderRadius: 0,
    padding: "1px",
    paddingLeft: "10px",
    paddingRight: "10px",
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);
const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})(MTableToolbar);

/**
 * Description:This function is used for Slide17
 * @param {*} props
 */
export default function Slide17(props) {
  const classes = useStyles();
  const [warehouse, setWarehouse] = React.useState("0");
  const userid = props.user_id;
  const [sellerid, setSellerid] = React.useState(0);
  var uuid = 0;
  const userRoleId = props.userRoleId;
  const [dataproduct, setDataProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [userData, setUserData] = React.useState([]);
  /**
   * Description:Custome switch
   */
  var valueofsouceid = stateData;
  const [changedWarehouseid, setchangedWarehouseid] = React.useState([]);
  const [openChecked, setOpenChekced] = React.useState(false);
  var ids = [];

  const validate = {
    phone: (s) =>
      s.length < 10 && s.length > 10 ? "" : "Phone length is not correct",
  };

  const editComponent = ({ onChange, value, ...rest }) => {
    const [currentValue, setValue] = useState(value);
    const [error, setError] = useState("");
    const change = (e) => {
      const newValue = e.target.value;
      setValue(newValue);
      const errorMesasge = validate[rest.columnDef.field](newValue);
      setError(errorMesasge);
      if (!errorMesasge) {
        onChange(newValue);
      }
    };
    return (
      <TextField
        {...rest}
        error={error}
        helperText={error}
        value={currentValue}
        onChange={change}
        placeholder="Phone"
      />
    );
  };

  const opennewOrder = (rowid, rowData) => {
    props.handleDashboard("AddCustomerManually");
  };
  var flag = false;
  const handleChangeCheckbox = (data) => {
    // var ids=[];
    //  var ids2=[];
    setOpenChekced(true);
    if (ids.length === 0) {
      ids.push(data);
    } else {
      for (let i = 0; i < ids.length; i++) {
        if (data !== ids[i]) {
          //ids.push(data);
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag === true) {
        ids.push(data);
      } else {
        const index = ids.indexOf(data);
        if (index > -1) {
          ids.splice(index, 1);
          if (ids.length === 0) {
            setOpenChekced(false);
          }
        }
      }
    }
    console.log("arraylenghtafter", ids.length);

    const updatedaray = [...ids];

    setchangedWarehouseid(updatedaray);

    setState({
      columns: [
        {
          title: "",
          render: (rowData) => (
            <FormGroup>
              {(() => {
                if (rowData !== undefined) {
                  return (
                    <FormControlLabel
                      style={popUpStyle.checkboxPosition2}
                      control={
                        <Checkbox
                          id={rowData.customerId}
                          checked={(() => {
                            for (let i = 0; i < ids.length; i++) {
                              if (rowData.customerId === parseInt(ids[i])) {
                                return true;
                              }
                            }
                          })()}
                          onChange={() => {
                            handleChangeCheckbox(rowData.customerId);
                          }}
                          color="primary"
                        />
                      }
                      className={classes.radioButtonCss}
                      InputProps={{
                        inputProps: { style: { borderRadius: 0 } },
                        style: { borderRadius: 0 },
                      }}
                    />
                  );
                }
              })()}
            </FormGroup>
          ),
        },
        {
          title: "First Name",
          field: "firstname",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.firstname === null || rowData.firstname === "" ? ' ' : rowData.firstname}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Last Name",
          field: "lastname",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.lastname}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Company Name",
          field: "companyname",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.companyname === null || rowData.companyname === "" ? ' ' : rowData.companyname}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Address",
          field: "addressline1",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.addressline1 === null || rowData.addressline1 === "" ? ' ' : rowData.addressline1}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "City",
          field: "city",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.city === null || rowData.city === "" ? ' ' : rowData.city}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Country",
          field: "country",
          type: "text",
          editComponent: (props) => (
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
                onChange={(e) => handleChangeSource(e, props)}
              >
                <MenuItem value={0}>Select Country</MenuItem>
                {countryData.map((option) => (
                  <MenuItem value={option.label}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ),
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.country === null || rowData.country === "" ? ' ' : rowData.country}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "State",
          field: "state",
          type: "text",
          editComponent: (props) => (
            <FormControl className={classes.formControl}>
              {(() => {
                if (props.rowData !== undefined) {
                  if (props.rowData.country === "Canada") {
                    return (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.value}
                        onChange={(e) => handleChangeSource1(e, props)}
                      >
                        <MenuItem value={0}>Select State</MenuItem>
                        {stateDataCanada.map((option) => (
                          <MenuItem value={option.label}>{option.label}</MenuItem>
                        ))}
                      </Select>
                    );
                  } else if (props.rowData.country === "United States") {
                    return (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.value}
                        onChange={(e) => handleChangeSource1(e, props)}
                      >
                        <MenuItem value={0}>Select State</MenuItem>
                        {stateDataUS.map((option) => (
                          <MenuItem value={option.label}>{option.label}</MenuItem>
                        ))}
                      </Select>
                    );
                  } else {
                    return (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.value}
                        onChange={(e) => handleChangeSource1(e, props)}
                      >
                        <MenuItem value={0}>Select State</MenuItem>
                        {stateData.map((option) => (
                          <MenuItem value={option.label}>{option.label}</MenuItem>
                        ))}
                      </Select>
                    );
                  }
                }
              })()}
              {/* {valueofsouceid.map(option => (
              <MenuItem value={option.label}>  
              {option.label}</MenuItem>
             
             ))} */}
            </FormControl>
          ),
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.state === null || rowData.state === "" ? ' ' : rowData.state}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Zip",
          field: "zip",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.zip === null || rowData.zip === "" ? ' ' : rowData.zip}
                  </Text>
                </Typography>
              }
            />
          ),
        },
  
        {
          title: "Phone No.",
          field: "phone",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.phone === null || rowData.phone === "" ? ' ' : rowData.phone}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Email",
          field: "email",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.email === null || rowData.email === "" ? ' ' : rowData.email}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Customer Type",
          field: "customertype",
          lookup: { 1: "Residential", 2: "Business" },
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {" "}
                    {(() => {
                      if (rowData.customertype === 1) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
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
                            style={{
                              fontSize: "11px",
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
                </Typography>
              }
            />
          ),
        },
      ],
    });
  };

  const handleChangeCheckbox5 = () => {
    setOpenChekced(false);
    var ids9 = [];

    const updatedaray = [...ids9];

    setchangedWarehouseid(updatedaray);

    setState({
      columns: [
        {
          title: "",
          render: (rowData) => (
            <FormGroup>
              {(() => {
                if (rowData !== undefined) {
                  return (
                    <FormControlLabel
                      style={popUpStyle.checkboxPosition2}
                      control={
                        <Checkbox
                          id={rowData.customerId}
                          checked={(() => {
                            for (let i = 0; i < ids.length; i++) {
                              if (rowData.customerId === parseInt(ids[i])) {
                                return true;
                              }
                            }
                          })()}
                          onChange={() => {
                            handleChangeCheckbox(rowData.customerId);
                          }}
                          color="primary"
                        />
                      }
                      className={classes.radioButtonCss}
                      InputProps={{
                        inputProps: { style: { borderRadius: 0 } },
                        style: { borderRadius: 0 },
                      }}
                    />
                  );
                }
              })()}
            </FormGroup>
          ),
        },
        {
          title: "First Name",
          field: "firstname",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.firstname === null || rowData.firstname === "" ? ' ' : rowData.firstname}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Last Name",
          field: "lastname",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.lastname}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Company Name",
          field: "companyname",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.companyname === null || rowData.companyname === "" ? ' ' : rowData.companyname}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Address",
          field: "addressline1",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.addressline1 === null || rowData.addressline1 === "" ? ' ' : rowData.addressline1}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "City",
          field: "city",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.city === null || rowData.city === "" ? ' ' : rowData.city}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Country",
          field: "country",
          type: "text",
          editComponent: (props) => (
            <FormControl className={classes.formControl}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
                onChange={(e) => handleChangeSource(e, props)}
              >
                <MenuItem value={0}>Select Country</MenuItem>
                {countryData.map((option) => (
                  <MenuItem value={option.label}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ),
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.country === null || rowData.country === "" ? ' ' : rowData.country}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "State",
          field: "state",
          type: "text",
          editComponent: (props) => (
            <FormControl className={classes.formControl}>
              {(() => {
                if (props.rowData !== undefined) {
                  if (props.rowData.country === "Canada") {
                    return (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.value}
                        onChange={(e) => handleChangeSource1(e, props)}
                      >
                        <MenuItem value={0}>Select State</MenuItem>
                        {stateDataCanada.map((option) => (
                          <MenuItem value={option.label}>{option.label}</MenuItem>
                        ))}
                      </Select>
                    );
                  } else if (props.rowData.country === "United States") {
                    return (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.value}
                        onChange={(e) => handleChangeSource1(e, props)}
                      >
                        <MenuItem value={0}>Select State</MenuItem>
                        {stateDataUS.map((option) => (
                          <MenuItem value={option.label}>{option.label}</MenuItem>
                        ))}
                      </Select>
                    );
                  } else {
                    return (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.value}
                        onChange={(e) => handleChangeSource1(e, props)}
                      >
                        <MenuItem value={0}>Select State</MenuItem>
                        {stateData.map((option) => (
                          <MenuItem value={option.label}>{option.label}</MenuItem>
                        ))}
                      </Select>
                    );
                  }
                }
              })()}
              {/* {valueofsouceid.map(option => (
              <MenuItem value={option.label}>  
              {option.label}</MenuItem>
             
             ))} */}
            </FormControl>
          ),
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.state === null || rowData.state === "" ? ' ' : rowData.state}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Zip",
          field: "zip",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.zip === null || rowData.zip === "" ? ' ' : rowData.zip}
                  </Text>
                </Typography>
              }
            />
          ),
        },
  
        {
          title: "Phone No.",
          field: "phone",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.phone === null || rowData.phone === "" ? ' ' : rowData.phone}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Email",
          field: "email",
          type: "text",
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {rowData.email === null || rowData.email === "" ? ' ' : rowData.email}
                  </Text>
                </Typography>
              }
            />
          ),
        },
        {
          title: "Customer Type",
          field: "customertype",
          lookup: { 1: "Residential", 2: "Business" },
          render: (rowData) => (
            <FormControlLabel
              onClick={() => {
                handleChangeCheckbox(rowData.customerId);
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
                  <Text
                    style={{
                      fontSize: "11px",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                      transition: "all 0.25s",
                    }}
                  >
                    {" "}
                    {(() => {
                      if (rowData.customertype === 1) {
                        return (
                          <Text
                            style={{
                              fontSize: "11px",
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
                            style={{
                              fontSize: "11px",
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
                </Typography>
              }
            />
          ),
        },
      ],
    });
    //setCardid(0);
    // const updatedshipped=[...ids2];
    // setshippedQuantity(updatedshipped);
  };

  const theme = useTheme();
  const [state, setState] = React.useState({
    columns: [
      {
        title: "",
        render: (rowData) => (
          <FormGroup>
            {(() => {
              if (rowData !== undefined) {
                return (
                  <FormControlLabel
                    style={popUpStyle.checkboxPosition2}
                    control={
                      <Checkbox
                        id={rowData.customerId}
                        checked={(() => {
                          for (let i = 0; i < ids.length; i++) {
                            if (rowData.customerId === parseInt(ids[i])) {
                              return true;
                            }
                          }
                        })()}
                        onChange={() => {
                          handleChangeCheckbox(rowData.customerId);
                        }}
                        color="primary"
                      />
                    }
                    className={classes.radioButtonCss}
                    InputProps={{
                      inputProps: { style: { borderRadius: 0 } },
                      style: { borderRadius: 0 },
                    }}
                  />
                );
              }
            })()}
          </FormGroup>
        ),
      },
      {
        title: "First Name",
        field: "firstname",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.customerId);
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
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.firstname === null || rowData.firstname === "" ? ' ' : rowData.firstname}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Last Name",
        field: "lastname",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.customerId);
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
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.lastname}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Company Name",
        field: "companyname",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.customerId);
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
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.companyname === null || rowData.companyname === "" ? ' ' : rowData.companyname}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Address",
        field: "addressline1",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.customerId);
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
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.addressline1 === null || rowData.addressline1 === "" ? ' ' : rowData.addressline1}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "City",
        field: "city",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.customerId);
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
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.city === null || rowData.city === "" ? ' ' : rowData.city}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Country",
        field: "country",
        type: "text",
        editComponent: (props) => (
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.value}
              onChange={(e) => handleChangeSource(e, props)}
            >
              <MenuItem value={0}>Select Country</MenuItem>
              {countryData.map((option) => (
                <MenuItem value={option.label}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        ),
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.customerId);
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
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.country === null || rowData.country === "" ? ' ' : rowData.country}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "State",
        field: "state",
        type: "text",
        editComponent: (props) => (
          <FormControl className={classes.formControl}>
            {(() => {
              if (props.rowData !== undefined) {
                if (props.rowData.country === "Canada") {
                  return (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.value}
                      onChange={(e) => handleChangeSource1(e, props)}
                    >
                      <MenuItem value={0}>Select State</MenuItem>
                      {stateDataCanada.map((option) => (
                        <MenuItem value={option.label}>{option.label}</MenuItem>
                      ))}
                    </Select>
                  );
                } else if (props.rowData.country === "United States") {
                  return (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.value}
                      onChange={(e) => handleChangeSource1(e, props)}
                    >
                      <MenuItem value={0}>Select State</MenuItem>
                      {stateDataUS.map((option) => (
                        <MenuItem value={option.label}>{option.label}</MenuItem>
                      ))}
                    </Select>
                  );
                } else {
                  return (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.value}
                      onChange={(e) => handleChangeSource1(e, props)}
                    >
                      <MenuItem value={0}>Select State</MenuItem>
                      {stateData.map((option) => (
                        <MenuItem value={option.label}>{option.label}</MenuItem>
                      ))}
                    </Select>
                  );
                }
              }
            })()}
            {/* {valueofsouceid.map(option => (
            <MenuItem value={option.label}>  
            {option.label}</MenuItem>
           
           ))} */}
          </FormControl>
        ),
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.customerId);
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
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.state === null || rowData.state === "" ? ' ' : rowData.state}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Zip",
        field: "zip",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.customerId);
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
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.zip === null || rowData.zip === "" ? ' ' : rowData.zip}
                </Text>
              </Typography>
            }
          />
        ),
      },

      {
        title: "Phone No.",
        field: "phone",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.customerId);
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
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.phone === null || rowData.phone === "" ? ' ' : rowData.phone}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Email",
        field: "email",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.customerId);
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
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {rowData.email === null || rowData.email === "" ? ' ' : rowData.email}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Customer Type",
        field: "customertype",
        lookup: { 1: "Residential", 2: "Business" },
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleChangeCheckbox(rowData.customerId);
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
                <Text
                  style={{
                    fontSize: "11px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                    transition: "all 0.25s",
                  }}
                >
                  {" "}
                  {(() => {
                    if (rowData.customertype === 1) {
                      return (
                        <Text
                          style={{
                            fontSize: "11px",
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
                          style={{
                            fontSize: "11px",
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
              </Typography>
            }
          />
        ),
      },
    ],
  });

  useEffect(() => {
    // fetchShiphypeCompleteStep();
    fetchCustomerList();
  }, []);

  /**
   * Description:To do fetch customer list
   */
  const fetchCustomerList = () => {
    //const userid=5;
    if (sellerid === 0) {
      uuid = userid;
    } else {
      uuid = sellerid;
    }
    setLoading(true);
    shiphypeservice
      .fetchCustomerList(uuid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setDataProduct(response.data);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**
   * Description:To do delete customer
   * @param {*} customproduct_id
   */
  const deleteCustomer = (customerId) => {
    var aarpi = [];
    aarpi.push(customerId);
    shiphypeservice
      .deleteCustomer(aarpi)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          fetchCustomerList();
          handleChangeCheckbox5();
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**
   * Description:To do delete customer
   * @param {*} customproduct_id
   */
  const deleteCustomer1 = () => {
    setLoading(true);
    shiphypeservice
      .deleteCustomer(changedWarehouseid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          fetchCustomerList();
          handleChangeCheckbox5();
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
    customertype
  ) => {
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

          fetchCustomerList();
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleChangeSource = (event, props) => {
    // setSorceId(event.target.value);
    // valueofsouceid=event.target.value;
    if (event.target.value === "United States") {
      valueofsouceid = stateDataUS;
    } else if (event.target.value === "Canada") {
      valueofsouceid = stateDataCanada;
    } else {
      valueofsouceid = stateData;
    }
    props.onChange(event.target.value);
  };
  const handleChangeSource1 = (event, props) => {
    // setSorceId(event.target.value);
    // valueofsouceid=event.target.value;
    props.onChange(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };

  const handleChange1 = (event) => {
    setWarehouse(event.target.value);
    fetchProductListById(event.target.value);
  };
  React.useEffect(() => {
    // fetchProductListOfLastWeek();
    fetchUserInfo();
  }, []);

  var newArr = [];
  const fetchUserInfo = () => {
    //const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchUserInfo()
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          for (let a = 0; a < response.data.length; a++) {
            if (response.data[a].userEmail === "") {
              var myObject = {};
              response.data[a].id
                ? (myObject["id"] = response.data[a].id)
                : null;
              response.data[a].displayName
                ? (myObject["name"] = response.data[a].displayName)
                : null;
              newArr.push(myObject);
            } else {
              var myObject = {};
              response.data[a].id
                ? (myObject["id"] = response.data[a].id)
                : null;
              response.data[a].userEmail
                ? (myObject["name"] = response.data[a].userEmail)
                : null;
              newArr.push(myObject);
            }
          }
          console.log("array", newArr);
          setUserData(newArr);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const fetchProductListById = (User) => {
    //const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchCustomerList(User)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setDataProduct(response.data);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**
   * Description:To do call function on next button
   * @param {*} isSprintCreate
   */
  const handleNextPage = (isSprintCreate, pageExits) => {
    props.handleNextPage(isSprintCreate, pageExits);
    //props.handleNext(isSprintCreate);
  };
  /**
   * Description:To do call function on back button
   * @param {*} isSprintCreate
   */
  const handlePreviousPage = (isSprintCreate) => {
    props.handlePreviousPage(isSprintCreate);
    //props.handleNext(isSprintCreate);
  };

  let screenWidth = Dimensions.get("window").width;

  return (
    <View className={classes.content}>
      <View className={classes.appBarSpacer} />

      <View>
        <Grid item container lg={12} style={popUpStyle.breadCrumSidePadding}>
          <Grid item lg={7}>
            <Link
              onClick={() => {
                props.handleDashboard("01");
              }}
            >
              <Text style={popUpStyle.breadCrundCss1}>DASHBOARD /</Text>
            </Link>
            <Text style={popUpStyle.breadCrundCss2}> CUSTOMERS {"\n"} </Text>
          </Grid>
          <Grid item lg={5} style={{ marginTop: "15px" }}>
            <Grid justify="flex-end" container>
              <Grid item style={{ marginRight: "20px" }}>
                {userRoleId === 1 ? (
                  <Grid
                    item
                    style={{
                      marginTop: "1px",
                      marginBottom: "10px",
                      padding: "0",
                    }}
                  >
                    <Autocomplete
                      id="combo-box-demo"
                      fullWidth
                      options={userData}
                      getOptionLabel={(option) => option.name}
                      style={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Search Seller"
                          variant="outlined"
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue !== null) {
                          fetchProductListById(newValue.id);
                          setSellerid(newValue.id);
                        } else {
                          setSellerid(0);
                          setDataProduct([]);
                        }
                        console.log("newvalue", newValue);
                      }}
                    />
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </View>
      <Grid justify="center">
        <ProgressBar loading={loading} />
      </Grid>

      <View style={popUpStyle.paddingSide}>
        {openChecked === true ? (
          <MaterialTable
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
                All Customers
              </Text>
            }
            columns={state.columns}
            data={dataproduct}
            // cellEditable={{
            //   onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            //     return new Promise((resolve, reject) => {
            //       console.log('newValue: ' + newValue);
            //       setTimeout(resolve, 1000);
            //     });
            //   }
            // }}
            icons={tableIcons}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,

              Toolbar: (props) => <StyledMTableToolbar {...props} />,
            }}
            localization={{
              toolbar: {
                searchPlaceholder: "Search Customers",
              },
              header: {
                actions: "ACTION",
              },
            }}
            actions={[
              {
                tooltip: "Delete Customers",
                icon: () => <DeleteOutline />
                  
                ,

                isFreeAction: openChecked,
                onClick: (event, rowData) => {
                  deleteCustomer1();
                },
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
                onClick: (event) => fetchCustomerList(),
              },

              // {
              //         tooltip: 'Remove All Selected Users',
              //         icon: () => <DeleteOutline
              //        />,
              //        onClick: (event, rowData) => {
              //         //handleClickOpendelete1();
              //       },
              //  isFreeAction: openChecked,
              //       },
            ]}
            options={{
              paging: true,
              // pageSize:7,
              maxBodyHeight: "60vh",
              doubleHorizontalScroll: true,
              headerStyle: { position: "sticky", top: 0 },
              pageSize: 10,
              pageSizeOptions: [10, 20, 30, 40, 50, 100],
              showTitle: true,
              addRowPosition: "first",
              actionsColumnIndex: -1,
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
                paddingTop: 10,
                paddingBottom: 10,
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
              search: true,
              exportButton: false,
              // selection: true,

              showSelectAllCheckbox: false,
              showTextRowsSelected: false,
            }}

            editable={{
              onBulkUpdate: (changes) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (
                      newData.firstname === "" ||
                      newData.lastname === "" ||
                      newData.addressline1 === "" ||
                      newData.city === "" ||
                      newData.state === "" ||
                      newData.zip === "" ||
                      newData.country === "" ||
                      newData.phone === "" ||
                      newData.customertype === ""
                    ) {
                      setOpen(true);
                      setType("error");
                      setMsg(
                        "You can't remove details only Update the customer Details.."
                      );
                      reject();
                      return;
                    } else {
                      const data = dataproduct;
                      const index = data.indexOf(oldData);
                      const customerid = dataproduct[index].customerId;
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
                        newData.customertype
                      );
                    }
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      const data = dataproduct;
                      const index = data.indexOf(oldData);

                      const customerid = dataproduct[index].customerId;

                      deleteCustomer(customerid);
                    }
                    resolve();
                  }, 1000);
                }),
            }}
          />
        ) : (
          <MaterialTable
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
                All Customers
              </Text>
            }
            columns={state.columns}
            data={dataproduct}
            icons={tableIcons}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,

              Toolbar: (props) => <StyledMTableToolbar {...props} />,
            }}
            localization={{
              toolbar: {
                searchPlaceholder: "Search Customers",
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
                  opennewOrder();
                },
                isFreeAction: true,
                //tooltip: 'Add Button',
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
                onClick: (event) => fetchCustomerList(),
              },
              //  {
              //   icon: () => <RefreshIcon style={{ backgroundColor:'#33cc00',color:'#fff',borderRadius : '3px',margin:'3px', width:30,
              //                   height:30}}/>,
              //   //tooltip: 'Refresh',
              //   isFreeAction: true,
              //   onClick: (event) =>   fetchCustomerList()
              // }
            ]}
            options={{
              paging: true,
              // pageSize:7,
              maxBodyHeight: "60vh",
              doubleHorizontalScroll: true,
              headerStyle: { position: "sticky", top: 0 },
              pageSize: 10,
              pageSizeOptions: [10, 20, 30, 40, 50, 100],
              showTitle: true,
              addRowPosition: "first",
              actionsColumnIndex: -1,
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
                paddingTop: 10,
                paddingBottom: 10,
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
              search: true,
              exportButton: false,
              // selection: true,

              showSelectAllCheckbox: false,
              showTextRowsSelected: false,
            }}

            
            editable={{
              onBulkUpdate: (changes) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    if (
                      newData.firstname === "" ||
                      newData.lastname === "" ||
                      newData.addressline1 === "" ||
                      newData.city === "" ||
                      newData.state === "" ||
                      newData.zip === "" ||
                      newData.country === "" ||
                      newData.phone === "" ||
                      newData.customertype === ""
                    ) {
                      setOpen(true);
                      setType("error");
                      setMsg(
                        "You can't remove details only Update the customer Details.."
                      );
                      reject();
                      return;
                    } else {
                      const data = dataproduct;
                      const index = data.indexOf(oldData);
                      const customerid = dataproduct[index].customerId;
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
                        newData.customertype
                      );
                    }
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      const data = dataproduct;
                      const index = data.indexOf(oldData);

                      const customerid = dataproduct[index].customerId;

                      deleteCustomer(customerid);
                    }
                    resolve();
                  }, 1000);
                }),
            }}
          />
        )}
        {showToast(open, msg, type)}
      </View>
    </View>
  );
}
