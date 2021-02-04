import React, { useState, useEffect } from "react";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import { Platform, View, Image, Text, Dimensions } from "react-native";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import PropTypes from "prop-types";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

import DialogActions from "@material-ui/core/DialogActions";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import * as shiphypeservice from "../ShipService/shiphype_service";
import Toast from "./Toast";
import popStyle from ".././style/popUpStyle";
import ProgressBar from "./ProgressBar";
import validate from "validate.js";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import StepConnector from "@material-ui/core/StepConnector";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-52% + 16px)',
    right: 'calc(48% + 16px)',
  },
  line: {
    borderColor: "#3f51b5",
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

const useStyles = makeStyles((theme) => ({
  root: {},
  submit: {
    margin: theme.spacing(0, 0, 0),
    borderRadius: 0,
  },
  textArea: {
    marginTop: theme.spacing(0),
    borderRadius: 0,
  },
  profileMargin: {
    marginTop: theme.spacing(1),
    borderRadius: 0,
    marginBottom: theme.spacing(1),
  },
  profileMargin1: {
    marginTop: theme.spacing(2),
    borderRadius: "5px",
    //  marginBottom: theme.spacing(1),
  },
  paper: {
    border: "2px solid #ced4da",
    height: 80,
    width: 100,
  },
  paper1: {
    border: "2px solid #ced4da",
    height: 120,
    width: 100,
    marginLeft: "15%",
    marginTop: "8%",
  },
  root: {
    flexGrow: 1,
  },
  avatarsmall: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  // grid: {
  //   width: 100,
  //   height: 100,
  // },
}));
const frequency = [
  {
    id: "1",
    label: "Daily",
  },
  {
    id: "2",
    label: "Weekly",
  },
  {
    id: "3",
    label: "Monthly",
  },
  {
    id: "4",
    label: "Quarterly",
  },
  {
    id: "5",
    label: "Semi-Annually",
  },
];
const countryData = [
  {
    id: 1,
    code:"CA",
    label: "Canada",
  },
  {
    id: 2,
    code:"GB",
    label: "United Kingdom",
  },
  {
    id: 3,
    code:"US",
    label: "United States of America",
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

const stateDataCanada = [
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
  } 
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
const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  address1: {
    presence: { allowEmpty: false, message: "is required" },

    length: {
      maximum: 64,
    },
  },
  address2: {
    presence: { allowEmpty: false, message: "is required" },

    length: {
      maximum: 64,
    },
  },
  city: {
    presence: { allowEmpty: false, message: "is required" },

    length: {
      maximum: 64,
    },
  },

  //  country:{
  //   presence: { allowEmpty: false, message: 'is required' },

  //   length: {
  //     maximum: 64
  //   }

  //  },
  phonenumber: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 10,
      minimum: 10,
    },
  },

  zipcode: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 8,
    },
  },
  shipTo: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  attn: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  // state: {
  //   presence: { allowEmpty: false, message: "is required" },
  //   length: {
  //     maximum: 64,
  //   },
  // },
};

/****   For changing the textfield radius  : End *********/
const styles = (theme) => ({
  root: {
    "@media print": {
      margin: 0,
      padding: theme.spacing(2),
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
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "60%",
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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <Grid container item xs={12} justify="flex-end">
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <Typography
          justify="center"
          variant="body1"
          style={{
            fontSize: "14px",
            fontWeight: '700',
            marginLeft: "10px",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          }}
        >
          Address for Shipping Labels
        </Typography>
      </Grid>
    </MuiDialogTitle>
  );
});
function getSteps() {
  return [
    "Marketplace Integration",
    "Shipping Profile",
    "Return Settings",
    "Import Products",
    "Import Customers"
  ];
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/**
 * Description:This function is used for CreateSprint for sprint
 * @param {*} props
 */
export default function CreateSprint(props) {
  const classes = useStyles();
  //const {openCreateSprint}= props;
  const { openReturn } = props;

  const [countryFill, setContruData] = React.useState(countryData[0]);
  const [countryFillTo, setContruDataTo] = React.useState(countryData[0]);
  const [stateFillTo, setStateDataTo] = React.useState(stateData[0]);
  const [activeStep, setActiveStep] = React.useState(2);
  const [completed, setCompleted] = React.useState(new Set());
  const [value, setValue] = React.useState("2");
  const [value1, setValue1] = React.useState("4");
  const [userAddressName, setuserAddressName] = React.useState("");
  const [userdata, setUserData] = React.useState([]);
  const [useraddress, setUseraddress] = React.useState([]);
  const [valueBack, setValueBack] = React.useState("4");
  const [warehouse, setWarehouse] = React.useState("0");
  const [dataUser, setDataUser] = React.useState([]);
  const [open1, setOpen1] = React.useState(false);
  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };
  const handleChangeRadio1 = (event) => {
    setValue1(event.target.value);
  };

  const handleChangeDaFromSate = (event) => {
    setStateDataTo(event);
  };
  //Setup Wizard
  const [state1, setState1] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state1;
  const userid = props.user_id;
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [UserDataStatus, setUserDataStatus] = React.useState(false);
  const [shipProfile, setShipprofiledone] = React.useState(false);
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const [stepdone,setStepdone]=React.useState(false);
  /**
   * Description:Callback function
   */
  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  useEffect(() => {
    fetchShiphypeCompleteStep();
  }, []);

  useEffect(() => {
    //  getUserData(userid);
    getUserFixedAddress();
  }, []);

 
  const getUserFixedAddress = () => {
    setLoading(false);
    shiphypeservice
      .fetchFixedAddress(userid)
      .then((response) => {
        console.log("apicall", response.status);

        if (response.status === true) {
          if(response.data[0].returnsettingId1 === 2){
            setValue("2");
          }else{
            setValue("1");
          }
         // setValue(response.data[0].returnsettingId);
          setUseraddress(response.data);
          setuserAddressName(response.data[0].name);
          setUserDataStatus(true);
          setLoading(false);

          console.log("datatset", JSON.stringify(response.data));
        } else {
          console.log("message", response.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const fetchShiphypeCompleteStep = () => {
    //  const userid=userid;
    shiphypeservice
      .fetchStepCompleteStatus(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          if (response.data.length !== 0) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].shiphypesubsubstepId === 4) {
                setShipprofiledone(true);
              } else {
              }

              if(response.data[i].shiphypesubsubstepId === 6){
                setStepdone(true);
              }
            }
          }
        } else {
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateUserData = () => {
    // if (shipProfile === false) {
    //   setOpen1(true);
    // } else {
      const returnsettingid = value;
      setLoading(true);
      shiphypeservice
        .updateUserDataName(userAddressName,userid,returnsettingid)
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            if(useraddress.length !== 0){
              addStepStatus();
            }else{
              addStepChose();
            }
            
          } else {
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
  //  }
  };
  const handleClickSet = () => {
    // if (shipProfile === false) {
    //   setOpen1(true);
    // } else {
      if (value === "1" && value1 === "3") {
        updateUserData();
        handleAddReturnPreFiiled();
        //addStepStatus();
      } else if (value === "2" && value1 === "3") {
        updateUserData();
        handleAddReturnPreFiiled();
      } else if (value === "2" && value1 === "4") {
        updateUserData();
        handleAddReturnPreFiiled();
        //  updateUserData();
      } else if (value === "1" && value1 === "4") {
        updateUserData();
        handleAddReturnPreFiiled();
      // }
    }
  };

  const addStepChoose = () => {
    setLoading(true);
    const returnsettingid = value;
    shiphypeservice
      .chooseUserStep(userid, returnsettingid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          if (value === "1") {
            handleNextPage(6, 5);
          } else {
            //handleNextPage(7,5);
            handleNextPage(6, 5);
          }
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
    if (status === true) {
      addStepStatus();

      // if(value === '2'){
      //   handleNextPage(parseInt(value),5);
      // }
    } else {
    }
  };
  /**
   * Description:This function call on type character inside input text
   * @param {} prop
   */
  const handleChange = (prop) => (event) => {
    //console.log("email",event.target.value);
    event.persist();
    if(prop === "attn"){
      setuserAddressName(event.target.value);
    }
    //setValues({ ...formState.values, [prop]: event.target.value });
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [prop]: event.target.value,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const steps = getSteps();
  /**
   * For change the value of the name and get the id and value
   * @param {*} i
   * @param {*} event
   */
  function handleChangeName(event) {
    setuserAddressName(event.target.value);
  }

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

  console.log("openReturn", openReturn);

  const handleStepClick = (index) => {
    console.log("indexprint", index);

    if (index === 0) {
      props.handleStepPage(1);
    } else if (index === 1) {
      props.handleStepPage(2);
    } else if (index === 2) {
      props.handleStepPage(3);
    } else if (index === 3) {
      props.handleStepPage(4);
    } else if (index === 4) {
      props.handleStepPage(5);
    }else if (index === 5) {
      props.handleStepPage(6);
    }
  };
  const handleClose3 = () => {
    setOpen1(false);
    // handleNextPage(22);
  };
  React.useEffect(() => {
    // fetchShiphypeCompleteStep();
    fetchReturnPrefilled();
  }, []);

  const fetchReturnPrefilled = () => {
    //  const userid=userid;
    shiphypeservice
      .fetchUserFormDetails(userid)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setDataUser(response.data);
          if (response.data.length !== 0) {
            bindData(response.data);
            if(response.data[0].returnsettingId === 3){
              setValue1("3");
            }else{
              setValue1("4");
            }
            
          }
          for(let i=0;i<frequency.length;i++){
            if(frequency[i].id === response.data[0].frequency){
              setWarehouse(frequency[i]);
              break;
            }
          }
          for(let i=0;i<countryData.length;i++){
            if(countryData[i].label === response.data[0].country){
              setContruData(countryData[i]);

              if(countryData[i].code === "US"){
                for(let j=0;j<stateDataUS.length;j++){
                  if(stateDataUS[j].label === response.data[0].state){
                    setStateDataTo(stateDataUS[j]);
                    break;
                  }
                }
              }else if(countryData[i].code === "CA"){
                for(let k=0;k<stateDataCanada.length;k++){
                  if(stateDataCanada[k].label === response.data[0].state){
                    setStateDataTo(stateDataCanada[k]);
                    break;
                  }
                }
              }else{
                for(let m=0;m<stateData.length;m++){
                  if(stateData[m].label === response.data[0].state){
                    setStateDataTo(stateData[m]);
                    break;
                  }
                }
              }
              break;
            }
          }

         
        } else {
          //setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddReturnPreFiiled = () => {
    if (dataUser.length === 0) {
      // const reciepent='vishal.tyagi@quicklivesolutions.com';
      const returnsettingid = value1;
      const name = userAddressName;
      const frequency = warehouse.id;
      const shipto = formState.values.shipTo;
      const address1 = formState.values.address1;
      const address2 = formState.values.address2;
      const city = formState.values.city;
      const state = stateFillTo.label;
      const zipcode = formState.values.zipcode;
      const country = countryFill.label;
      const telephone = formState.values.phonenumber;
      const email = formState.values.email;
      // const frequency=formState.values.warehouse;
      // const additionalnotes=formState.values.additionalnotes;
      //  console.log("subject",subject);
      setLoading(true);
      shiphypeservice
        .returnSettingFormFill(
          userid,
          returnsettingid,
          name,
          frequency,
          "",
          shipto,
          address1,
          address2,
          city,
          state,
          zipcode,
          country,
          telephone,
          email
        )
        .then((response) => {
          if (response.status === true) {
            setLoading(false);
            addStepChose();
          } else {
            setOpen(true);
            setType("error");
            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // const reciepent='vishal.tyagi@quicklivesolutions.com';
      const returnsettingid = value1;
      const name = userAddressName;
      const frequency = warehouse.id;
      const shipfrom = dataUser[0].shipfrom;
      const shipto = formState.values.shipTo;
      const address1 = formState.values.address1;
      const address2 = formState.values.address2;
      const city = formState.values.city;
      const state = formState.values.state;
      const zipcode = formState.values.zipcode;
      const country = countryFill.label;
      const telephone = formState.values.phonenumber;
      const email = formState.values.email;
      // const frequency=formState.values.warehouse;
      // const additionalnotes=formState.values.additionalnotes;
      //  console.log("subject",subject);
      setLoading(true);
      const userreturndetailId = dataUser[0].userreturndetailId;

      shiphypeservice
        .returnSettingFormFillUpdate(
          userreturndetailId,
          userid,
          returnsettingid,
          name,
          frequency,
          shipfrom,
          shipto,
          address1,
          address2,
          city,
          state,
          zipcode,
          country,
          telephone,
          email
        )
        .then((response) => {
          if (response.status === true) {
            addStepStatus();
          } else {
            setOpen(true);
            setType("error");
            setMsg(response.message);
            setStatus(response.status);
            setLoading(false);
            console.log("message", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const addStepChose = () => {
    const returnsettingid = value;

    setLoading(true);
    shiphypeservice
      .chooseUserStep(userid, returnsettingid)
      .then((response) => {
        if (response.status === true) {
          addStepStatus();
        } else {
          setOpen(true);
          setType("error");
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addStepStatus = () => {
    
    if(stepdone === true){
      handleNextPage(7);
    }else{
      const shiphypesubsubstepId = 6;
      const shiphypesubstepId = 6;
      const shiphypestepId = 0;
      setLoading(true);
      shiphypeservice
        .addUserStepDoneSofar(
          userid,
          shiphypesubsubstepId,
          shiphypesubstepId,
          shiphypestepId
        )
        .then((response) => {
          console.log("status", response.status);
          if (response.status === true) {
            setLoading(false);
            handleNextPage(7);
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
  const handleChange1 = (event) => {
    setWarehouse(event);
  };

  /**
   * Description:To Do bind data for update
   */
  const bindData = (data) => {
    console.log("bind call");
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        shipTo: data[0].shipto,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        shipTo: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        attn: data[0].name,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        attn: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        email: data[0].email,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        email: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        city: data[0].city,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        city: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        zipcode: data[0].zipcode,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        zipcode: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        address1: data[0].address1,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        address1: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        address2: data[0].address2,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        address2: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        state: data[0].state,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        state: true,
      },
    }));

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        phonenumber: data[0].telephone,
        checkFrom: false,
      },
      touched: {
        ...formState.touched,
        phonenumber: true,
      },
    }));
  };

  const handleChangeDa = (event) => {
    setContruData(event);
  };
  /**
   * Description:To do close poup after successfully create sprint and on click cancel button
   * @param {*} issprintCreate
   */
  const handleClose1 = (isSprintCreate) => {
    props.handleSprintCancel(isSprintCreate);
  };
  let screenWidth = Dimensions.get("window").width;

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <View>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        onClose={() => {
          handleClose1(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={openReturn}
      >
        <Grid item xs={12}>
          {(() => {
            if (screenWidth > 690) {
              return (
                <View>
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    connector={<QontoConnector />}
                  >
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepButton
                          onClick={() => {
                            handleStepClick(index);
                          }}
                        >
                          <Text style={popStyle.stepperCss}>{label}</Text>
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                </View>
              );
            }
          })()}

          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              handleClose1(false);
            }}
            style={{ width: "96%", margin: "auto" }}
          ></DialogTitle>
        </Grid>

        <DialogContent style={{ width: "96%", margin: "auto" }}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={`${vertical},${horizontal}`}
            open={open1}
            autoHideDuration={3000}
            onClose={handleClose3}
          >
            <Alert onClose={handleClose3} severity="error">
              First Complete the Shipping Policy screen.
            </Alert>
          </Snackbar>

          {(() => {
            if (parseInt(value) === 1) {
              return (
                <View>
                  <Grid justify="center">
                    <ProgressBar loading={loading} />
                  </Grid>
                  <form className={classes.form}>
                    <Grid
                      justify="space-between" // Add it here :)
                      container
                      spacing={2}
                    >
                      <Grid
                        items
                        lg={12}
                        style={{
                          marginLeft: "18px",
                        }}
                      >
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="carries"
                            name="carries"
                            value={value}
                            onChange={handleChangeRadio}
                          >
                           

                            <FormControlLabel
                              value="2"
                              color="primary"
                              control={<Radio color="primary" />}
                              label={
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    // fontWeight: '700',
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    color: "#001737",

                                    transition: "all 0.25s",
                                  }}
                                >
                                  I want to display my name on shipping labels.
                                </Text>
                              }
                            />
                             <FormControlLabel
                              value="1"
                              color="primary"
                              control={<Radio color="primary" />}
                              label={
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    // fontWeight: '700',
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    color: "#001737",

                                    transition: "all 0.25s",
                                  }}
                                >
                                  I want to display ShipHype's name on shipping
                                  labels.
                                </Text>
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>

                     
                      {showToast(open, msg, type)}
                    </Grid>

                    {/* </Grid> */}
                  </form>
                </View>
              );
            }
          })()}
          {(() => {
            if (parseInt(value) === 2) {
              return (
                <View>
                  <Grid justify="center">
                    <ProgressBar loading={loading} />
                  </Grid>
                  <form className={classes.form}>
                    <Grid
                      justify="space-between" // Add it here :)
                      container
                      spacing={2}
                    >
                      <Grid
                        items
                        lg={12}
                        style={{
                          marginLeft: "18px",
                        }}
                      >
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="carries"
                            name="carries"
                            value={value}
                            onChange={handleChangeRadio}
                          >
                           

                            <FormControlLabel
                              value="2"
                              color="default"
                              control={<Radio color="primary" />}
                              label={
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    // fontWeight: '700',
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    color: "#001737",

                                    transition: "all 0.25s",
                                  }}
                                >
                                  I want to display my name on shipping labels.
                                </Text>
                              }
                            />
                              <View
                              style={{ marginLeft: "30px", marginTop: "10px" }}
                            >
                              <TextField
                                id="name"
                                name="name"
                                variant="outlined"
                                fullWidth
                                placeholder="Name/Business Name"
                                size="small"
                                type="text"
                                onChange={(e) => handleChangeName(e)}
                                style={{ width: "90%" }}
                                value={userAddressName}
                              />
                            </View>
 <FormControlLabel
                              value="1"
                              color="default"
                              control={<Radio color="primary" />}
                              label={
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    // fontWeight: '700',
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    color: "#001737",

                                    transition: "all 0.25s",
                                  }}
                                >
                                  I want to display ShipHype's name on shipping
                                  labels.
                                </Text>
                              }
                            />
                          
                          </RadioGroup>
                        </FormControl>
                      </Grid>

                     
                    </Grid>
                  </form>
                </View>
              );
            }
          })()}

          {(() => {
            if (parseInt(value1) === 3) {
              return (
                <View>
                  <Grid justify="center">
                    <ProgressBar loading={loading} />
                  </Grid>
                  <form className={classes.form}>
                    <Grid
                      justify="space-between" // Add it here :)
                      container
                      spacing={2}
                    >
                      <Grid
                        items
                        lg={12}
                        style={{
                          marginLeft: "18px",
                          marginTop: "10px",
                        }}
                      >
                        <hr style={{marginTop:'18px'}}/>
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="carries"
                            name="carries"
                            value={value1}
                            onChange={handleChangeRadio1}
                          >
                            <Typography
                              justify="center"
                              variant="body1"
                              style={{
                                fontSize: "14px",
                                fontWeight: '700',
                                marginTop: "15px",
                                marginBottom: "10px",
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              }}
                            >
                              {"\n"}Returns Handling{"\n"}
                            </Typography>

                            <FormControlLabel
                              value="4"
                              color="default"
                              control={<Radio color="primary" />}
                              style={{
                                fontSize: "0.8rem",
                                lineHeight: "0.002",
                                fontWeight: "700",
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              }}
                              label={
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    // fontWeight: '700',
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    color: "#001737",

                                    transition: "all 0.25s",
                                  }}
                                >
                                  I want ShipHype to process returns for me.
                                </Text>
                              }
                            />

                            <FormControlLabel
                              value="3"
                              color="default"
                              control={<Radio color="primary" />}
                              label={
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    // fontWeight: '700',
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    color: "#001737",

                                    transition: "all 0.25s",
                                  }}
                                >
                                  I want ShipHype to ship back my returns to me
                                  and I will process them myself.
                                </Text>
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <Grid
                          item
                          xs={10}
                          style={{
                            marginLeft: "15px",
                          }}
                        >
                          <TextField
                            id="shipTo"
                            name="shipTo"
                            variant="outlined"
                            fullWidth
                            error={hasError("shipTo")}
                            helperText={
                              hasError("shipTo")
                                ? formState.errors.shipTo[0]
                                : null
                            }
                            placeholder="Ship To"
                            size="small"
                            type="text"
                            onChange={handleChange("shipTo")}
                            className={classes.profileMargin2}
                            value={formState.values.shipTo || ""}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          style={{
                            marginLeft: "15px",
                          }}
                        >
                          <TextField
                            id="attn"
                            name="attn"
                            variant="outlined"
                            fullWidth
                            error={hasError("attn")}
                            helperText={
                              hasError("attn") ? formState.errors.attn[0] : null
                            }
                            placeholder="Attn:"
                            size="small"
                            type="text"
                            onChange={handleChange("attn")}
                            className={classes.profileMargin1}
                            value={userAddressName}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          style={{
                            marginLeft: "15px",
                          }}
                        >
                          <TextField
                            id="address1"
                            name="address1"
                            variant="outlined"
                            fullWidth
                            error={hasError("address1")}
                            helperText={
                              hasError("address1")
                                ? formState.errors.address1[0]
                                : null
                            }
                            placeholder="Address 1"
                            size="small"
                            type="text"
                            onChange={handleChange("address1")}
                            className={classes.profileMargin1}
                            value={formState.values.address1 || ""}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          style={{
                            marginLeft: "15px",
                          }}
                        >
                          <TextField
                            id="address2"
                            name="address2"
                            variant="outlined"
                            fullWidth
                            error={hasError("address2")}
                            helperText={
                              hasError("address2")
                                ? formState.errors.address2[0]
                                : null
                            }
                            placeholder="Address 2"
                            size="small"
                            type="text"
                            onChange={handleChange("address2")}
                            className={classes.profileMargin1}
                            value={formState.values.address2 || ""}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          style={{
                            marginLeft: "15px",
                          }}
                        >
                          <TextField
                            id="city"
                            name="city"
                            variant="outlined"
                            fullWidth
                            error={hasError("city")}
                            helperText={
                              hasError("city") ? formState.errors.city[0] : null
                            }
                            placeholder="City"
                            size="small"
                            type="text"
                            onChange={handleChange("city")}
                            className={classes.profileMargin1}
                            value={formState.values.city || ""}
                          />
                        </Grid>

                        <Grid
                          item
                          xs={10}
                          style={{
                            marginLeft: "15px",
                          }}
                        >
                          {/* <TextField
                            id="state"
                            name="state"
                            variant="outlined"
                            fullWidth
                            error={hasError("state")}
                            helperText={
                              hasError("state")
                                ? formState.errors.state[0]
                                : null
                            }
                            placeholder="State/Province"
                            size="small"
                            type="text"
                            onChange={handleChange("state")}
                            className={classes.profileMargin1}
                            value={formState.values.state || ""}
                          /> */}

                          {(() => {
              if (countryFill.code === "US"){
                  return ( 
<Autocomplete
                                      id="combo-box-demo"
                                      fullWidth
                                      value={stateFillTo}
  options={stateDataUS}
                                      getOptionLabel={(option) => option.label}
                                      //style={{ width: 300 }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          size="small"
                                          placeholder="Search State"
                                          variant="outlined"
                                        />
                                      )}
                                      onChange={(event, newValue) => {
                                        if (newValue !== null) {
                                          handleChangeDaFromSate(newValue);
                                        } else {
                                          //setServicename("");
                                        }
                                        
                                        console.log("newvalue", newValue);
                                      }}
                                    />
                  )
  
                }
                else if (countryFill.code === "CA"){
                  return ( 
<Autocomplete
                                      id="combo-box-demo"
                                      fullWidth
                                      value={stateFillTo}
  options={stateDataCanada}
                                      getOptionLabel={(option) => option.label}
                                      //style={{ width: 300 }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          size="small"
                                          placeholder="Search State"
                                          variant="outlined"
                                        />
                                      )}
                                      onChange={(event, newValue) => {
                                        if (newValue !== null) {
                                          handleChangeDaFromSate(newValue);
                                        } else {
                                          //setServicename("");
                                        }
                                        
                                        console.log("newvalue", newValue);
                                      }}
                                    />
                  )
  
                }
                else {
                  return ( 
<Autocomplete
                                      id="combo-box-demo"
                                      fullWidth
                                      value={stateFillTo}
  options={stateData}
                                      getOptionLabel={(option) => option.label}
                                      //style={{ width: 300 }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          size="small"
                                          placeholder="Search State"
                                          variant="outlined"
                                        />
                                      )}
                                      onChange={(event, newValue) => {
                                        if (newValue !== null) {
                                          handleChangeDaFromSate(newValue);
                                        } else {
                                          //setServicename("");
                                        }
                                        
                                        console.log("newvalue", newValue);
                                      }}
                                    />
                  )
  
                }
                
                })()}
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <Grid
                          item
                          xs={10}
                          style={{
                            marginLeft: "15px",
                          }}
                        >
                          <TextField
                            id="zipcode"
                            name="zipcode"
                            variant="outlined"
                            fullWidth
                            error={hasError("zipcode")}
                            helperText={
                              hasError("zipcode")
                                ? formState.errors.zipcode[0]
                                : null
                            }
                            placeholder="Zip/Postal Code"
                            size="small"
                            type="text"
                            onChange={handleChange("zipcode")}
                            className={classes.profileMargin2}
                            value={formState.values.zipcode || ""}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          
                          style={{
                            marginLeft: "15px",
marginTop:"15px",
                          }}
                        >

<Autocomplete
                  id="combo-box-demo"
                  fullWidth
                  value={countryFill}
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
                      handleChangeDa(newValue);
                    } else {
                      //setServicename("");
                    }
                    console.log("newvalue", newValue);
                  }}
                />
                          {/* <TextField
                            id="outlined-select-currency-native"
                            select
                            fullWidth
                            // label="Select Seller"
                            value={countryFill}
                            onChange={handleChangeDa}
                            SelectProps={{
                              native: true,
                            }}
                            size="small"
                            type="text"
                            className={classes.profileMargin1}
                            variant="outlined"
                          >
                            <option
                              value="0"
                              disabled
                              style={{
                                fontSize: "14px",
                                //fontWeight: '700',
                                paddingLeft: "15px",
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              }}
                            >
                              Select Country
                            </option>

                            {countryData.map((option) => (
                              <option
                                style={{
                                  fontSize: "14px",
                                  //fontWeight: '700',
                                  paddingLeft: "15px",
                                  cursor: "pointer",
                                  fontFamily:
                                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                }}
                                key={option.id}
                                value={option.id}
                              >
                                {option.label}
                              </option>
                            ))}
                          </TextField> */}
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          style={{
                            marginLeft: "15px",
                          }}
                        >
                          <TextField
                            id="phonenumber"
                            name="phonenumber"
                            variant="outlined"
                            fullWidth
                            error={hasError("phonenumber")}
                            helperText={
                              hasError("phonenumber")
                                ? formState.errors.phonenumber[0]
                                : null
                            }
                            placeholder="Tel"
                            size="small"
                            type="text"
                            onChange={handleChange("phonenumber")}
                            className={classes.profileMargin1}
                            value={formState.values.phonenumber || ""}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          style={{
                            marginLeft: "15px",
                          }}
                        >
                          <TextField
                            id="email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            error={hasError("email")}
                            helperText={
                              hasError("email")
                                ? formState.errors.email[0]
                                : null
                            }
                            placeholder="Email"
                            size="small"
                            type="text"
                            onChange={handleChange("email")}
                            className={classes.profileMargin1}
                            value={formState.values.email || ""}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          style={{
                            marginLeft: "15px",
                            marginTop:"15px",
                          }}
                        >
                         <Autocomplete
                  id="combo-box-demo"
                  fullWidth
                  value={warehouse}
                  options={frequency}
                  getOptionLabel={(option) => option.label}
                  //style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Search Frequency"
                      variant="outlined"
                    />
                  )}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      handleChange1(newValue);
                    } else {
                      //setServicename("");
                    }
                    console.log("newvalue", newValue);
                  }}
                />

                          {/* <TextField
                            id="outlined-select-currency-native"
                            select
                            fullWidth
                            // label="Select Seller"
                            value={warehouse}
                            onChange={handleChange1}
                            SelectProps={{
                              native: true,
                            }}
                            size="small"
                            type="text"
                            className={classes.profileMargin1}
                            variant="outlined"
                          >
                            <option
                              value="0"
                              disabled
                              style={{
                                fontSize: "14px",
                                //fontWeight: '700',
                                paddingLeft: "15px",
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              }}
                            >
                              Select Frequency
                            </option>

                            {frequency.map((option) => (
                              <option
                                style={{
                                  fontSize: "14px",
                                  //fontWeight: '700',
                                  paddingLeft: "15px",
                                  cursor: "pointer",
                                  fontFamily:
                                    '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                }}
                                key={option.id}
                                value={option.id}
                              >
                                {option.label}
                              </option>
                            ))}
                          </TextField> */}
                        </Grid>
                      
                      </Grid>
                    </Grid>
                  </form>
                </View>
              );
            }
          })()}

          {(() => {
            if (parseInt(value1) === 4) {
              return (
                <View>
                  <form className={classes.form}>
                    <Grid
                      justify="space-between" // Add it here :)
                      container
                      spacing={2}
                    >
                      <Grid
                        items
                        lg={12}
                        style={{
                          marginLeft: "18px",
                          marginTop: "10px",
                        }}
                      >
                       <hr style={{marginTop:'18px'}}/>
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="carries"
                            name="carries"
                            value={value1}
                            onChange={handleChangeRadio1}
                          >
                            <Typography
                              justify="center"
                              variant="body1"
                              style={{
                                fontSize: "14px",
                                fontWeight: '700',
                                marginTop: "15px",
                                marginBottom: "10px",
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              }}
                            >
                              {"\n"}Returns Handling{"\n"}
                            </Typography>

                            <FormControlLabel
                              value="4"
                              color="default"
                              control={<Radio color="primary" />}
                              style={{
                                fontSize: "0.8rem",
                                lineHeight: "0.002",
                                fontWeight: "700",
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              }}
                              label={
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    // fontWeight: '700',
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    color: "#001737",

                                    transition: "all 0.25s",
                                  }}
                                >
                                  I want ShipHype to process returns for me.
                                </Text>
                              }
                            />

                            <FormControlLabel
                              value="3"
                              color="default"
                              control={<Radio color="primary" />}
                              label={
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    // fontWeight: '700',
                                    fontFamily:
                                      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                    color: "#001737",

                                    transition: "all 0.25s",
                                  }}
                                >
                                  I want ShipHype to ship back my returns to me
                                  and I will process them myself.
                                </Text>
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>

                     
                    </Grid>
                  </form>
                </View>
              );
            }
          })()}
        </DialogContent>
        <DialogActions style={{ width: "96%", margin: "auto" }}>
          <Grid justify="flex-end" container spacing={24}>
            <Grid item>
              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                className={classes.profileMargin}
                onClick={() => {
                  handlePreviousPage(4);
                }}
              >
                Back
              </ColorButton>
              &nbsp;&nbsp;
              <ColorButton
                size="large"
                variant="contained"
                color="primary"
                disabled={(parseInt(value) === 2 && userAddressName === "") === true ? true : false}
                className={classes.profileMargin}
                onClick={() => {
                  handleClickSet();
                }}
              >
                NEXT
              </ColorButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </View>
  );
}

CreateSprint.propTypes = {
  openReturn: PropTypes.bool,
  handleCloseSprintPoupup: PropTypes.func,
};