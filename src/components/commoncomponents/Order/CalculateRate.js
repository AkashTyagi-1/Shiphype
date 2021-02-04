import React, { useState, useEffect } from "react";

import clsx from "clsx";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import { Platform, View, Image, Text, Dimensions } from "react-native";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import PropTypes from "prop-types";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StepConnector from "@material-ui/core/StepConnector";
import { parseISO, format, differenceInCalendarDays ,differenceInDays,differenceInBusinessDays} from "date-fns";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Toast from "../feedback/Toast";
import ProgressBar from "../feedback/ProgressBar";
import * as shiphypeservice from ".././ShipService/shiphype_service";
/**For Style */
import popUpStyle from ".././style/popUpStyle";
import popStyle from ".././style/popUpStyle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
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
import validate from "validate.js";
import MoveOrderHold from "./ShippedStatus";
import parcelimage from "../../../assets/icons/parceliimage.JPG";
import RateIvalue from "./RateIValueScreen";
const QontoConnector = withStyles({
  line: {
    borderColor: "#3f51b5",
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

const tableIcons = {
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

const ColorButtonAdd = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#0168fa",
    borderColor: "#0168fa",
    borderRadius: "3px",
    height: 35,
    width: 190,
    fontSize: "11px",
    fontWeight: "700",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    "&:hover": {
      backgroundColor: "#0168fa",
    },
  },
}))(Button);
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
const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(0, 0, 0),
    borderRadius: 0,
  },
  textArea: {
    marginTop: theme.spacing(0),
    borderRadius: 0,
  },
  profileMargin: {
    marginTop: theme.spacing(2),
    borderRadius: 0,
  },
  paper: {
    border: "2px solid #ced4da",
    height: 100,
    width: 100,
  },
  root: {
    //flexGrow: 1,
    width: "100%",
  },
  profileMargin10: {
    marginTop: theme.spacing(2),
    border: "1px solid #cccccc",
    padding: "2%",
  },
  profileMargin1: {
    // border : '1px solid #cccccc',
    //  padding:'1%',
    marginLeft: "8px",
  },
  button2: {
    //border : ' 1px solid #cccccc',
    //  borderRadius : '5px',
    paddingTop: "1%",
    paddingBottom: "1%",
    paddingLeft: "0%",
    paddingRight: "0%",
    textTransform: "none",
    color: "#0158d4",
  },
  buttonGreen: {
    paddingTop: "1%",
    paddingBottom: "1%",
    paddingLeft: "0%",
    paddingRight: "0%",
    textTransform: "none",
    color: "#00b300",
  },
  checkBoxColor: {
    color: "#0158d4",
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
  // grid: {
  //   width: 100,
  //   height: 100,
  // },
}));

const warehouses = [
  {
    value: "w1",
    label: "Created",
  },
  {
    value: "w2",
    label: "Onhold",
  },
  {
    value: "w3",
    label: "Processing",
  },
  {
    value: "w4",
    label: "Cancled",
  },
  {
    value: "w5",
    label: "Done",
  },
];

const StyledMTableToolbar = withStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})(MTableToolbar);

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
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "98%",
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
const ColorButton1 = withStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "3px",
    //  paddingTop: '9%',
    //  paddingBottom: '9%',
    height: "70%",
    width: "30px",
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
  const {
    children,
    classes,
    onClose,
    onChangeValue,
    warehouse,
    warehouses,
    stepdone,
    ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <Grid container item xs={10} justify="flex-end">
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      ) : null}
      <Grid item xs={6} justify="flex-start">
        <Typography
          justify="center"
          variant="body1"
          style={{
            fontSize: "16px",
            fontWeight: "700",
            marginTop: "20px",
            marginLeft: stepdone === 1 ? "20px" : "20px",
            marginBottom: "20px",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
          }}
        >
          {stepdone === 1 ? "Parcel" : "Calculate Rate"}
        </Typography>
      </Grid>
    </MuiDialogTitle>
  );
});

const schema = {
  packageLength: {
    presence: { allowEmpty: false, message: "is required" },
  },
  packageWidth: {
    presence: { allowEmpty: false, message: "is required" },
  },
  packageHeight: {
    presence: { allowEmpty: false, message: "is required" },
  },
  packageWeight: {
    presence: { allowEmpty: false, message: "is required" },
  },
  CompanyFrom: {
    presence: { allowEmpty: false, message: "is required" },
  },
  AddressLine1From: {
    presence: { allowEmpty: false, message: "is required" },
  },
  AddressLine2From: {
    //presence: { allowEmpty: true, message: "is required" },
  },

  PostalCodeFrom: {
    presence: { allowEmpty: false, message: "is required" },
  },
  CityFrom: {
    presence: { allowEmpty: false, message: "is required" },
  },
  StateFrom: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum:2,
      message: "Please fill two characters valid state code."
    }
  },
  AttentionFrom: {
    presence: { allowEmpty: false, message: "is required" },
  },
  PhoneFrom: {
    presence: { allowEmpty: false, message: "is required" },
  },
  EmailFrom: {
    presence: { allowEmpty: false, message: "is required" },
  },
  InstructionFrom: {
    //presence: { allowEmpty: true, message: "is required" },
  },
  CompanyTo: {
    presence: { allowEmpty: false, message: "is required" },
  },
  AddressLine1To: {
    presence: { allowEmpty: false, message: "is required" },
  },
  AddressLine2To: {
    //presence: { allowEmpty: true, message: "is required" },
  },
 
  PostalCodeTo: {
    presence: { allowEmpty: false, message: "is required" },
  },
  CityTo: {
    presence: { allowEmpty: false, message: "is required" },
  },
  // StateTo: {
  //   presence: { allowEmpty: false, message: "is required" },
  //   length: {
  //     maximum:2,
  //     message: "Please fill two characters valid state code."
  //   }
  // },
  AttentionTo: {
    presence: { allowEmpty: false, message: "is required" },
  },
  PhoneTo: {
    presence: { allowEmpty: false, message: "is required" },
  },
  EmailTo: {
    //presence: { allowEmpty: true, message: "is required" },
  },
  InstructionTo: {
    //presence: { allowEmpty: true, message: "is required" },
  },
  packageInsurance: {
    //presence: { allowEmpty: true, message: "is required" },
  },
};

const ColorButton3 = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#0168fa",
    borderRadius: "3px",
    height: 30,
    width: 100,
    marginTop: "0px",
    marginLeft: "3px",
    fontSize: "12px",
    fontWeight: "550",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
    "&:hover": {
      backgroundColor: "#002080",
    },
  },
}))(Button);

/**
 * Description:This function is used for Select warehouse
 * @param {*} props
 */
export default function ShippingProfile(props) {
  const classes = useStyles();

  const { calculaterate } = props;
  const user_id = props.userid;
  const rowDataForOrder = props.rowDataForOrder;
  const ordercustomerId = props.rowDataForOrder.customerId;
  const [loading, setLoading] = React.useState(false);
  const [carrierId, setCarrierId] = React.useState(0);
  const [shiperdata, setShiperdata] = React.useState([]);
  const [customer, setCustomer] = React.useState([]);
  const [orderCouierType, setOrderCourierType] = React.useState([]);
  const [shipToNumber1, setShipToNumber1] = React.useState("");
  const [shipToAddressLine1, setShipToAddressLine1] = React.useState("");
  const [shipToCity1, setShipToCity1] = React.useState("");
  const [
    shipToStateProvinceCode1,
    setShipToStateProvinceCode1,
  ] = React.useState("");
  const [shipToPostalCode1, setShipToPostalCode1] = React.useState("");
  //const [shipToCountryCode1,setShipToCountryCode1]=React.useState('IN');
  const [shipToCountryCode1, setShipToCountryCode1] = React.useState("CA");
  const [shipToCountryName1, setShipToCountryName1] = React.useState("Canada");
  const [shipToName1, setShipToName1] = React.useState("");
  const [shipToAttentionName1, setShipToAttentionName1] = React.useState("");
  const [shipToFaxNumber1, setShipToFaxNumber1] = React.useState("1234567999");
  const [
    shipToTaxIdentificationNumber1,
    setShipToTaxIdentificationNumber1,
  ] = React.useState("456999");

  const [shipperPhoneNumber1, setShipperPhoneNumber1] = React.useState("");
  const [shipperAddressLine1, setShipperAddressLine1] = React.useState("");
  const [shipperCity1, setShipperCity1] = React.useState("");
  const [
    shipperStateProvinceCode1,
    setShipperStateProvinceCode1,
  ] = React.useState("");
  const [shipperPostalCode1, setShipperPostalCode1] = React.useState("");
  const [shipperCountryCode1, setShipperCountryCode1] = React.useState("");
  const [shipperName1, setShipperName1] = React.useState("");
  const [shipperAttentionName1, setShipperAttentionName1] = React.useState("");
  const [
    shipperTaxIdentificationNumber1,
    setShipperTaxIdentificationNumber1,
  ] = React.useState("TaxID89");
  const [shipperNumber1, setShipperNumber1] = React.useState("A6584R");
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const [warehouseData, setWarehouseData] = React.useState([]);
  const [ratedata, setRatedata] = React.useState([]);
  const [openMoveOnHoldOrder, setOpenMoveOnHoldOrder] = React.useState(false);
  const [parcelData, setParcelData] = React.useState(null);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const [openivalue, setOpenivalue] = React.useState(false);
  const [stepdone, setStepdone] = React.useState(1);
  const [rowData, setRowData] = React.useState(null);
  const [residentialFrom, setResidentialFrom] = React.useState(false);
  const [residentialTo, setResidentialTo] = React.useState(false);
  const [shipinput, setShipinput] = React.useState(null);
  const [serviceName, setServiceName] = React.useState("");

  const [selectedpickDate, setSelectedpickDate] = React.useState(new Date());
  const [countryFillFrom, setContruDataFrom] = React.useState(countryData[0]);
  const [countryFillTo, setContruDataTo] = React.useState(countryData[0]);
  const [stateFillTo, setStateDataTo] = React.useState(stateData[0]);

  var setstateData=stateData;
  const shippingPolicyName=props.shippingPolicyName;
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Service",
        field: "service_name",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            //onClick={()=>{handleChangeCheckbox(rowData)}}
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
                  {rowData.service_name}
                </Text>
              </Typography>
            }
          />
        ),
      },

      {
        title: "Business Days",
        field: "max_delivery_date",
        type: "date",
        render: (rowData) => (
          <FormControlLabel
            // onClick={()=>{handleChangeCheckbox(rowData)}}
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
                  {/* {differenceInCalendarDays(rowData.max_delivery_date,format(new Date(),"yyyy-mm-dd"))} */}
                  {/* {datediff(
                    format(new Date(), "yyyy-MM-dd"),
                    new Date(rowData.max_delivery_date)
                  )} */}
                  {datediff(new Date(),new Date(rowData.max_delivery_date))}
                  {/* {datediff(parseDate(format(new Date(),"yyyy-mm-dd")),parseDate(rowData.max_delivery_date))} */}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Retail Price",
        field: "basecharge",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            // {currentdate(rowData.max_delivery_date)}
            // onClick={()=>{handleChangeCheckbox(rowData)}}
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
                  ${rowData.basecharge === undefined ? "0" : rowData.basecharge}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: " ",
        field: "currency",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            //onClick={()=>{handleChangeCheckbox(rowData)}}
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
                  {rowData.currency}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: "Your Price",
        field: "total_price",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            // onClick={()=>{handleChangeCheckbox(rowData)}}
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
                ${removeHst(rowData)}
                  {/* ${rowData.total_price} */}
                </Text>
              </Typography>
            }
          />
        ),
      },
      {
        title: " ",
        field: "imag",
        type: "text",
        render: (rowData) => (
          <FormControlLabel
            onClick={() => {
              handleopenIValue(rowData);
            }}
            style={popUpStyle.checkboxPosition}
            className={classes.quantitycss}
            control={
              <Image
                style={{
                  alignContent: "center",
                  width: "20px",
                  height: "20px",
                  marginTop: "1%",
                }}
                source={parcelimage}
              />
            }
          />
        ),
      },
      {
        title: " ",
        render: (rowData) => (
          <Grid item xs={5}>
            <ColorButton3
              size="small"
              variant="contained"
              component="label"
              color="primary"
              onClick={() => {
                handleChangeCheckbox(rowData);
              }}
            >
              Select
            </ColorButton3>
          </Grid>
        ),
      },
    ],
  });

  const handleChangeDaFrom = (event) => {
    setContruDataFrom(event);
  };

  const handleChangeDaFromSate = (event) => {
    setStateDataTo(event);
  };

  const handleChangeDaTo = (event) => {
    setContruDataTo(event);
    if(event.code === "US" )
    {
      setStateDataTo(stateDataUS[0]);
    }
    else if(event.code === "CA")
    {
      setStateDataTo(stateDataCanada[0]);
    }
    else{
      setStateDataTo(stateData[0]);
    }
  };

  const handleChangeresidentalTo = (event) => {
    setResidentialTo(event.target.checked);
  };

  const handleChangeresidentalFrom = (event) => {
    setResidentialFrom(event.target.checked);
  };
  function parseDate(str) {
    var mdy = str.split("-");
    console.log("splitdate",mdy);
    return new Date(mdy[1], mdy[0] - 1, mdy[2]);
  }

function removeHst(rowData){
var price=rowData.total_price;
for(let i=0;i<rowData.charges.length;i++){
  if(rowData.charges[i].charge_name === "HST ON" || rowData.charges[i].charge_name === "GST ON" || rowData.charges[i].charge_name === "QST ON"){
price=rowData.total_price - rowData.charges[i].charge_amount;
break;
  }
}
return (Math.round(price * 100) / 100).toFixed(2);
}

  function currentdate(str) {
    var msDiff = new Date(str).getTime() - new Date().getTime();
    var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    console.log("datamax", new Date(str).getTime());
    console.log("datatoday", new Date().getTime());
    console.log("datadiffernce", Math.floor(msDiff / (1000 * 60 * 60 * 24)));
    return daysTill30June2035;
  }

  function datediff(first, second) {


    var offset = -0; //Timezone offset for EST in minutes.
    var estDate = new Date();



    var str=format(new Date(),"yyyy-mm-dd")
    // var date = new Date().getDate(); //Current Date
    // var month = new Date().getMonth() + 1; //Current Month
    // var year = new Date().getFullYear(); //Current Year

    var date = estDate.getDate(); //Current Date
    var month = estDate.getMonth(); //Current Month
    var year = estDate.getFullYear(); //Current Year
    var currentDate=year+"-"+month+"-"+date;
    var update=new Date(currentDate);
    var deleviey=new Date(second.getFullYear()+"-"+(second.getMonth()+1) +"-"+(second.getDate()));
    //var currentDate=new Date().toLocaleDateString();
    //currentDate.setDate(currentDate.getDate() - 1);
   // var Difference_In_Time = second.getTime() - first.getTime();
    //var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    var result=differenceInBusinessDays(deleviey.setDate(second.getDate() + 1),estDate);
   // var result=differenceInDays(second, new Date(currentDate));
    console.log("date1",estDate);
    console.log("delevirydate",second.getDate());
    console.log("currentdate",currentDate);
    console.log("currentdateformat",new Date(currentDate));
    console.log("updatedate",update.getFullYear()+"-"+(update.getMonth() + 1) +"-"+update.getDate());
    console.log("date3",result);
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    if(result === 0){
      result="1";
    }
    return result;
    // var result = differenceInBusinessDays(
    //   new Date(),
    //   new Date(2014, 0, 10)
    // )

    // var date = new Date();
    // // to add 4 days to current date

    // date.setDate(date.getDate() + 2);
    // setSelectedpickDate(second);
    // var updatedate=format(selectedorderDate, "yyyy-MM-dd")
   // var result = differenceInCalendarDays(second, first);
    //return result;
  }

  const handleChangeCheckbox = (rowData) => {
    console.log("rowdata", rowData);
    setParcelData(rowData);
    setServiceName(rowData.service_name);
    setOpenMoveOnHoldOrder(true);

    //datediff(new Date("2020-10-16"),new Date(rowData.max_delivery_date));
  };

  const handleopenIValue = (rowData) => {
    console.log("rowdata", rowData);
    setRowData(rowData);
    setOpenivalue(true);
  };
  const handleCancel = () => {
    setRowData(null);
    setOpenivalue(false);
  };
  React.useEffect(() => {
    // fetchCourierTypeList();
    fetchUserDetails1(user_id);
    fetchCustomerList(user_id);
    fetchWarehouse(user_id);
    console.log("userid", user_id);
  }, []);

  const fetchUserDetails1 = (user_id) => {
    setLoading(true);
    shiphypeservice
      .fetchUserDetail(user_id)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setFormState((formState) => ({
            ...formState,
            values: {
              ...formState.values,
              AttentionFrom: response.data.userdetails.displayName,
              checkFrom: false,
            },
            touched: {
              ...formState.touched,
              AttentionFrom: true,
            },
          }));
          setFormState((formState) => ({
            ...formState,
            values: {
              ...formState.values,
              EmailFrom: response.data.userdetails.userEmail,
              checkFrom: false,
            },
            touched: {
              ...formState.touched,
              EmailFrom: true,
            },
          }));
          setFormState((formState) => ({
            ...formState,
            values: {
              ...formState.values,
              PhoneFrom: "9999999999",
              checkFrom: false,
            },
            touched: {
              ...formState.touched,
              PhoneFrom: true,
            },
          }));
          setShipperPhoneNumber1(response.data.userdetails.userphonenumber);
          setShipperAttentionName1(response.data.userdetails.userNicename);
          setShipperName1(response.data.userdetails.userNicename);
          setShipperAddressLine1(response.data.userdetails.useraddressline);
          setShipperCity1(response.data.userdetails.usercity);
          setShipperStateProvinceCode1(
            response.data.userdetails.userstateprovinceCode
          );
          setShipperPostalCode1(response.data.userdetails.userpostalCode);
          setShipperCountryCode1(response.data.userdetails.usercountrycode);
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchWarehouse = (user_id) => {
    setLoading(true);
    //  const userid=userid;
    shiphypeservice
      .fetchWarehouse(user_id)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          setWarehouseData(response.data);

          if (shipperCountryCode1 === "CA") {
            if (response.data.length !== 0) {
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  CompanyFrom: response.data[0].warehousename,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  CompanyFrom: true,
                },
              }));

              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  AddressLine1From: response.data[0].address,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  AddressLine1From: true,
                },
              }));
              // setFormState((formState) => ({
              //   ...formState,
              //   values: {
              //     ...formState.values,
              //     CountryFrom: "CA",
              //     checkFrom: false,
              //   },
              //   touched: {
              //     ...formState.touched,
              //     CountryFrom: true,
              //   },
              // }));
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  PostalCodeFrom: response.data[1].zipcode,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  PostalCodeFrom: true,
                },
              }));
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  CityFrom: response.data[1].city,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  CityFrom: true,
                },
              }));
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  StateFrom: response.data[1].state,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  StateFrom: true,
                },
              }));
            }
          } else {
            if (response.data.length !== 0) {
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  CompanyFrom: response.data[0].warehousename,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  CompanyFrom: true,
                },
              }));

              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  AddressLine1From: response.data[0].address,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  AddressLine1From: true,
                },
              }));
              // setFormState((formState) => ({
              //   ...formState,
              //   values: {
              //     ...formState.values,
              //     CountryFrom: "CA",
              //     checkFrom: false,
              //   },
              //   touched: {
              //     ...formState.touched,
              //     CountryFrom: true,
              //   },
              // }));
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  PostalCodeFrom: response.data[0].zipcode,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  PostalCodeFrom: true,
                },
              }));
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  CityFrom: response.data[0].city,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  CityFrom: true,
                },
              }));
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  StateFrom: response.data[0].state,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  StateFrom: true,
                },
              }));
            }
          }
        } else {
          setLoading(false);
          console.log("message", response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const fetchCustomerList = (user_id) => {
    //const userid=5;
    setLoading(true);
    shiphypeservice
      .fetchCustomerList(user_id)
      .then((response) => {
        console.log("status", response.status);
        if (response.status === true) {
          setLoading(false);
          //setDataProduct(response.data);
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].customerId === ordercustomerId) {
              setShipToNumber1(response.data[i].phone);
              setShipToAddressLine1(response.data[i].addressline1);
              setShipToStateProvinceCode1(response.data[i].state);
              setShipToPostalCode1(response.data[i].zip);

              setShipToName1(response.data[i].companyname);
              setShipToAttentionName1(response.data[i].firstname);
              setShipToCountryName1(response.data[i].country);
              setShipToCity1(response.data[i].city);
              setShipToFaxNumber1("123456");
              setShipToTaxIdentificationNumber1("123456");

              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  CompanyTo: response.data[i].companyname === "" ? response.data[i].firstname+' '+response.data[i].lastname : response.data[i].companyname,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  CompanyTo: true,
                },
              }));
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  AddressLine1To: response.data[i].addressline1,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  AddressLine1To: true,
                },
              }));
              // setFormState((formState) => ({
              //   ...formState,
              //   values: {
              //     ...formState.values,
              //     CountryTo: response.data[i].country,
              //     checkFrom: false,
              //   },
              //   touched: {
              //     ...formState.touched,
              //     CountryTo: true,
              //   },
              // }));

              for (let j = 0; j < countryData.length; j++) {
                if (
                  countryData[j].label === response.data[i].country ||
                  countryData[j].code === response.data[i].country
                ) {
                  setContruDataTo(countryData[j]);
                  if(countryFillTo.code === "US" )
                  {
                    setstateData=stateDataUS;
                  }
                  else if(countryFillTo.code === "CA")
                  {
                    setstateData=stateDataCanada;
                  }
                  else{
                    setstateData=stateData;
                  }
                  

                  break;
                }
              }

              for (let j = 0; j < stateData.length; j++) {
                if (
                  stateData[j].code === response.data[i].state ||
                  stateData[j].label === response.data[i].state
                ) {
                  setStateDataTo(stateData[j]);
                  break;
                }
                else if(stateData[j].code.toUpperCase() === response.data[i].state ||
                  stateData[j].label.toUpperCase() === response.data[i].state
                  ) {
                    setStateDataTo(stateData[j]);
                    break;
                  }
              }


              
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  PostalCodeTo: response.data[i].zip,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  CountryTo: true,
                },
              }));
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  CityTo: response.data[i].city,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  CountryTo: true,
                },
              }));
              // setFormState((formState) => ({
              //   ...formState,
              //   values: {
              //     ...formState.values,
              //     StateTo: response.data[i].state,
              //     checkFrom: false,
              //   },
              //   touched: {
              //     ...formState.touched,
              //     StateTo: true,
              //   },
              // }));
              var fullName=response.data[i].firstname+' '+response.data[i].lastname;
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  AttentionTo: fullName,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  AttentionTo: true,
                },
              }));
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  PhoneTo: response.data[i].phone,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  PhoneTo: true,
                },
              }));
              setFormState((formState) => ({
                ...formState,
                values: {
                  ...formState.values,
                  EmailTo: response.data[i].email,
                  checkFrom: false,
                },
                touched: {
                  ...formState.touched,
                  EmailTo: true,
                },
              }));
              break;
            }
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

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);
  const handleChange1 = (event) => {
    setCarrierId(event.carrierId);
  };
  /**
   * Description:This function call on type character inside input text
   * @param {} prop
   */
  const handleChange = (prop) => (event) => {
//     if(event.target.id==='PostalCodeTo')
// {
//   const valued= event.target.value;

  //  var pieces = valued.split("");
  // var sizeofpei=pieces.length;


  // if(sizeofpei>6)
  // {
  //   const hasError = (PostalCodeTo) =>
  //   true ;
  // }
  // else if(sizeofpei===6){
   
  //    if(typeof  pieces[0] === 'string')
  //    {
  //     if(typeof parseInt(pieces[1]) === 'number'){
  //       if(typeof pieces[2] === 'string'){
  //         if(typeof parseInt(pieces[3]) === 'number'){
  //           if(typeof pieces[4] === 'string'){
  //             if(typeof parseInt(pieces[5]) === 'number'){
  //               setFormState((formState) => ({
  //                 ...formState,
  //                 values: {
  //                   ...formState.values,
  //                   [prop]: event.target.value,
  //                   checkFrom: false,
  //                 },
  //                 touched: {
  //                   ...formState.touched,
  //                   [event.target.name]: true,
  //                 },
  //               }));
  //             }
  //             else{
  //               const hasError = (PostalCodeTo) =>
  //   true ;
  //             }
  //           }
  //         }
  //       }
      
  //    }
  //   }
  // }
  
 
  // const regex = /^[0-9a-zA-Z]+$/; //this will admit letters, numbers and dashes
  // if (valued.match(regex) || valued === "") {
  //   event.persist();
  //   //setValues({ ...formState.values, [prop]: event.target.value });
  //   setFormState((formState) => ({
  //     ...formState,
  //     values: {
  //       ...formState.values,
  //       [prop]: event.target.value,
  //       checkFrom: false,
  //     },
  //     touched: {
  //       ...formState.touched,
  //       [event.target.name]: true,
  //     },
  //   }));
  // }
  // else{
    
  //   const hasError = (PostalCodeTo) =>
  //    true ;
  // }
 

// }
// else{
  event.persist();
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
// }
  //  console.log("email", event.target.value);
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleClose1 = () => {
    props.handleDeleteCancle();
  };
  const handleDeleteCancle = (isdone) => {
    if (isdone === true) {
      console.log("isonde", isdone);
      setOpenMoveOnHoldOrder(false);
      setParcelData(null);
    } else {
      setOpenMoveOnHoldOrder(false);
      setParcelData(null);
      props.updateCarrier(2, 1);
    }
  };

  const handleConfirmHold = (tracking, carrierid,comapnyname,trackingURL,date) => {
    setOpenMoveOnHoldOrder(false);
    setParcelData(null);
    props.updateCarrier(tracking, carrierid, serviceName,comapnyname,trackingURL,date);
  };

  const showToast = (open, msg, type) => {
    return (
      <Toast open={open} handleClose={handleClose} type={type} msg={msg} />
    );
  };
  const handleClose = () => {
    setOpen(false);
  };
  const upsIntegrationCall1 = () => {
    var valued= formState.values.PostalCodeTo;
    valued = valued.toString().trim();
 
var us = new RegExp("^\\d{5}(-{0,1}\\d{4})?$");
   // var ca  = new RegExp(/^((?!.*[DFIOQU])[A-VXY][0-9][A-Z])|(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\ ?[0-9][A-Z][0-9]$/i);
    var ca = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);

    if(type == "us"){
        if (us.test(valued.toString())) {
            console.log(valued);
            return valued;
        }
    else{
        console.log("Notvalid");
          //return valued;
      }
    }

    if(type == "ca")
    {
        if (ca.test(valued.toString())) {
            console.log(valued);
            return valued;
        }
        else{
          console.log("Notvalid");
            //return valued;
        }
    }
}
  const upsIntegrationCall = () => {
   
    var valued= formState.values.PostalCodeTo;
    valued = valued.toString().trim();
 var validpostalcode=false;
var us = new RegExp("^\\d{5}(-{0,1}\\d{4})?$");
   // var ca  = new RegExp(/^((?!.*[DFIOQU])[A-VXY][0-9][A-Z])|(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\ ?[0-9][A-Z][0-9]$/i);
    var ca = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);

    if(countryFillTo.code === "US"){
        if (us.test(valued.toString())) {
            console.log(valued);
            validpostalcode=true;
            //return valued;
        }
    else{
        console.log("Notvalid");
        validpostalcode=false;
          //return valued;
          setOpen(true);
          setType("error");
          setMsg('Shipping To Postal Code is not valid, it must be 5 number only. Like - 98987 For US');
          setStatus(true);
      }
    }

    if(countryFillTo.code === "CA")
    {
        if (ca.test(valued.toString())) {
            console.log(valued);
            validpostalcode=true;
           // return valued;
        }
        else{
          console.log("Notvalid");
          validpostalcode=false;
          setOpen(true);
          setType("error");
          setMsg('Shipping To Postal Code is not valid, it must be  alphanumric and 6 charater. Like - L1E1G3 For Canada');
          setStatus(true); //return valued;
        }
    }
    if(countryFillTo.code !== "US"  && countryFillTo.code !== "CA" )
    {
      validpostalcode=true;
    }
  if(validpostalcode===true){ const rate = {
    origin: {
      country: countryFillFrom.code,
      postal_code: formState.values.PostalCodeFrom,
      province: formState.values.StateFrom,
      city: formState.values.CityFrom,
      name: formState.values.AttentionFrom,
      address1: formState.values.AddressLine1From,
      address2: formState.values.AddressLine2From,
      address3: null,
      phone: formState.values.PhoneFrom,
      fax: null,
      address_type: residentialFrom === true ? "residential" : "business",
      company_name: formState.values.CompanyFrom,
    },
    destination: {
      country: countryFillTo.code,
      postal_code: formState.values.PostalCodeTo,
      province: stateFillTo.label,
      city: formState.values.CityTo,
      name: formState.values.AttentionTo,
      address1: formState.values.AddressLine1To,
      address2: formState.values.AddressLine2To,
      address3: null,
      phone: formState.values.PhoneTo,
      fax: null,
      address_type: residentialTo === true ? "residential" : "business",
      company_name: formState.values.CompanyTo,
    },
    breakdown_rates: true,
    packaging_information: {
      packaging_type: "My Packaging",
      packages: [
        {
          length: formState.values.packageLength,
          width: formState.values.packageWidth,
          height: formState.values.packageHeight,
          weight: formState.values.packageWeight,
          weightUnit: "lbs",
          description: "TEST",
          insurance_amount:
            formState.values.packageInsurance === undefined
              ? parseFloat("0")
              : parseFloat(formState.values.packageInsurance),
          freight_class: "77.5",
          nmfc_code: "12345",
          type: "pallet",
        },
      ],
    },
  };

  const ship = {
    origin: {
      country: countryFillFrom.code,
      postal_code: formState.values.PostalCodeFrom,
      province: formState.values.StateFrom,
      city: formState.values.CityFrom,
      name: formState.values.AttentionFrom,
      address1: formState.values.AddressLine1From,
      address2: formState.values.AddressLine2From,
      phone: formState.values.PhoneFrom,
      fax: null,
      address_type: residentialFrom === true ? "residential" : "business",
      company_name: formState.values.CompanyFrom,
    },
    destination: {
      country: countryFillTo.code,
      postal_code: formState.values.PostalCodeTo,
      province: stateFillTo.label,
      city: formState.values.CityTo,
      name: formState.values.AttentionTo,
      address1: formState.values.AddressLine1To,
      address2: formState.values.AddressLine2To,
      address3: null,
      phone: formState.values.PhoneTo,
      fax: null,
      address_type: residentialTo === true ? "residential" : "business",
      company_name: formState.values.CompanyTo,
    },
    // service: {
    //   service_code: props.parcelData.service_code,
    //   service_name: props.parcelData.service_name,
    // },
    // ship_date: props.parcelData.max_delivery_date,

    customs_invoice: {
      
      bill_to: "Consignee",
      invoice_currency: "CAD",
      items: [
        {
          description: "My TEST - My PRODUCT1",
          harmonized_code: "12345",
          origin_country_code: "CA",
          quantity: 1,
          unit_price: 15.05,
          weight: 30,
          weightUnit: "lbs",
          sku: "SKU CODE1",
        },
        {
          description: "My TEST - My PRODUCT2",
          harmonized_code: "67890",
          origin_country_code: "CA",
          quantity: 2,
          unit_price: 5.5,
          weight: 12,
          weightUnit: "lbs",
          sku: "SKU CODE2",
        },
      ],
    },
    packaging_information: {
      packaging_type: "My Packaging",
      packages: [
        {
          length: formState.values.packageLength,
          width: formState.values.packageWidth,
          height: formState.values.packageHeight,
          weight: formState.values.packageWeight,
          weightUnit: "lbs",
          description: "TEST",
          insurance_amount:
            formState.values.packageInsurance === undefined
              ? parseFloat("0")
              : parseFloat(formState.values.packageInsurance),
          freight_class: "77.5",
          nmfc_code: "12345",
          type: "pallet",
        },
      ],
    },
  };

  setLoading(true);
  shiphypeservice
    .calculateRate(rate)
    .then((response) => {
      console.log("status", response.status);
      if (response.rates.length > 0) {
        setLoading(false);
        setStepdone(2);
        setRatedata(response.rates);
        setShipinput(ship);
        //props.handleConfirmHold(response.data, carrierId);
      } else {
        setLoading(false);
        setOpen(true);
        setType("error");
        setMsg(response.errors[0].errorMessage);
        //console.log("message", response.message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
   
  };

  return (
    <View>
      <Dialog
        maxWidth={stepdone === 1 ? "md" : "md"}
        fullWidth={true}
        onClose={() => {
          handleClose1(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={calculaterate}
      >
        <Grid item xs={12}>
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => {
              handleClose1(false);
            }}
            stepdone={stepdone}
            style={{
              width: "96%",
              margin: "auto",
              paddingBottom: "0px",
              paddingTop: "0px",
            }}
          ></DialogTitle>
        </Grid>
        <Grid justify="center">
          <ProgressBar loading={loading} />
        </Grid>
        <DialogContent style={popUpStyle.sizeOfBody}>
          {openMoveOnHoldOrder === false ? (
            " "
          ) : (
            <MoveOrderHold
              userid={user_id}
              openMoveOnHoldOrder={openMoveOnHoldOrder}
              rowDataForOrder={rowDataForOrder}
              handleConfirmHold={handleConfirmHold}
              carrierId={carrierId}
              shipinput={shipinput}
              parcelData={parcelData}
              handleDeleteCancle={handleDeleteCancle}
            />
          )}
          {openivalue === false ? (
            " "
          ) : (
            <RateIvalue
              userid={user_id}
              openivalue={openivalue}
              rowData={rowData}
              handlecancel={handleCancel}
            />
          )}

          <form className={classes.form}>
            {(() => {
              if (parseInt(stepdone) === 1) {
                return (
                  <Grid container className={classes.root} spacing={1}>
                    {showToast(open, msg, type)}
                    <Grid container justify="space-between">
                      <Grid item xs={12} md={12} lg={12}>
                        <Grid items xs={12} lg={12}>
                          <Grid justify="space-between" container>
                            {/* <Text
                              style={{
                                fontSize: "14px",
                                // fontWeight: "700",
                                marginLeft: stepdone === 1 ? "10px" : "20px",
                                fontFamily:
                                  '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                              }}
                            >
                              Enter shipment details to get the best rates:
                            </Text> */}

                            <Grid
                              item
                              xs={12}
                              md={10}
                              lg={12}
                              container
                              style={{ marginLeft: "0px" }}
                            >
                              <Grid
                                justify="space-between"
                                container
                                spacing={2}
                              >
                                <Grid item xs={12} md={5} lg={6}>
                                  <Grid item xs={8}>
                                    <Text
                                      style={{
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        marginLeft:
                                          stepdone === 1 ? "10px" : "20px",
                                        fontFamily:
                                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                        color: "#001737",

                                        transition: "all 0.25s",
                                      }}
                                    >
                                      Shipping From
                                    </Text>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginLeft: "10px" }}
                                  >
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={residentialFrom}
                                          color="primary"
                                          onChange={handleChangeresidentalFrom}
                                          name="residentialFrom"
                                        />
                                      }
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
                                          Residential
                                        </Text>
                                      }
                                      value="1"
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "10px" }}
                                  >
                                    <TextField
                                      id="CompanyFrom"
                                      name="CompanyFrom"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("CompanyFrom")}
                                      helperText={
                                        hasError("CompanyFrom")
                                          ? formState.errors.CompanyFrom[0]
                                          : null
                                      }
                                      placeholder="Company / Person"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("CompanyFrom")}
                                      className={classes.profileMargin1}
                                      value={formState.values.CompanyFrom || ""}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="AddressLine1From"
                                      name="AddressLine1From"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("AddressLine1From")}
                                      helperText={
                                        hasError("AddressLine1From")
                                          ? formState.errors.AddressLine1From[0]
                                          : null
                                      }
                                      placeholder="Address Line1"
                                      size="small"
                                      type="text"
                                      onChange={handleChange(
                                        "AddressLine1From"
                                      )}
                                      className={classes.profileMargin1}
                                      value={
                                        formState.values.AddressLine1From || ""
                                      }
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="AddressLine2From"
                                      name="AddressLine2From"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("AddressLine2From")}
                                      helperText={
                                        hasError("AddressLine2From")
                                          ? formState.errors.AddressLine2From[0]
                                          : null
                                      }
                                      placeholder="Address Line2"
                                      size="small"
                                      type="text"
                                      onChange={handleChange(
                                        "AddressLine2From"
                                      )}
                                      className={classes.profileMargin1}
                                      value={
                                        formState.values.AddressLine2From || ""
                                      }
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px",marginLeft: "9px"}}
                                  >
                                    {/* <TextField
                                      id="CountryFrom"
                                      name="CountryFrom"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("CountryFrom")}
                                      helperText={
                                        hasError("CountryFrom")
                                          ? formState.errors.CountryFrom[0]
                                          : null
                                      }
                                      placeholder="Country Code"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("CountryFrom")}
                                      className={classes.profileMargin1}
                                      value={formState.values.CountryFrom || ""}
                                    /> */}

                                    <Autocomplete
                                      id="combo-box-demo"
                                      fullWidth
                                      value={countryFillFrom}
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
                                          handleChangeDaFrom(newValue);
                                        } else {
                                          //setServicename("");
                                        }
                                        console.log("newvalue", newValue);
                                      }}
                                    />
                                  </Grid>

                                  {/* <Grid
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
                </Grid> */}
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="PostalCodeFrom"
                                      name="PostalCodeFrom"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("PostalCodeFrom")}
                                      helperText={
                                        hasError("PostalCodeFrom")
                                          ? formState.errors.PostalCodeFrom[0]
                                          : null
                                      }
                                      placeholder="PostalCode"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("PostalCodeFrom")}
                                      className={classes.profileMargin1}
                                      value={
                                        formState.values.PostalCodeFrom || ""
                                      }
                                    />
                                  </Grid>

                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="CityFrom"
                                      name="CityFrom"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("CityFrom")}
                                      helperText={
                                        hasError("CityFrom")
                                          ? formState.errors.CityFrom[0]
                                          : null
                                      }
                                      placeholder="City"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("CityFrom")}
                                      className={classes.profileMargin1}
                                      value={formState.values.CityFrom || ""}
                                    />
                                  </Grid>

                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="StateFrom"
                                      name="StateFrom"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("StateFrom")}
                                      helperText={
                                        hasError("StateFrom")
                                          ? formState.errors.StateFrom[0]
                                          : null
                                      }
                                      placeholder="State"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("StateFrom")}
                                      className={classes.profileMargin1}
                                      value={formState.values.StateFrom || ""}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="AttentionFrom"
                                      name="AttentionFrom"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("AttentionFrom")}
                                      helperText={
                                        hasError("AttentionFrom")
                                          ? formState.errors.AttentionFrom[0]
                                          : null
                                      }
                                      placeholder="Attention"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("AttentionFrom")}
                                      className={classes.profileMargin1}
                                      value={
                                        formState.values.AttentionFrom || ""
                                      }
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="PhoneFrom"
                                      name="PhoneFrom"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("PhoneFrom")}
                                      helperText={
                                        hasError("PhoneFrom")
                                          ? formState.errors.PhoneFrom[0]
                                          : null
                                      }
                                      placeholder="Phone"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("PhoneFrom")}
                                      className={classes.profileMargin1}
                                      value={formState.values.PhoneFrom || ""}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="EmailFrom"
                                      name="EmailFrom"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("EmailFrom")}
                                      helperText={
                                        hasError("EmailFrom")
                                          ? formState.errors.EmailFrom[0]
                                          : null
                                      }
                                      placeholder="Email"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("EmailFrom")}
                                      className={classes.profileMargin1}
                                      value={formState.values.EmailFrom || ""}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="InstructionFrom"
                                      name="InstructionFrom"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("InstructionFrom")}
                                      helperText={
                                        hasError("InstructionFrom")
                                          ? formState.errors.InstructionFrom[0]
                                          : null
                                      }
                                      placeholder="Instruction"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("InstructionFrom")}
                                      className={classes.profileMargin1}
                                      value={
                                        formState.values.InstructionFrom || ""
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={8}>
                                    <Text
                                      style={{
                                        fontSize: "13px",
                                        //fontWeight: '700',
                                        marginLeft:
                                          stepdone === 1 ? "10px" : "20px",
                                        fontFamily:
                                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                        color: "#001737",

                                        transition: "all 0.25s",
                                      }}
                                    >
                                      Dims (L x W x H Inches)
                                    </Text>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={8}
                                    container
                                    justify="flex-start"
                                    direction="row"
                                  >
                                    <Grid
                                      item
                                      xs={3}
                                      style={{ marginTop: "2px" }}
                                    >
                                      <TextField
                                        id="packageLength"
                                        name="packageLength"
                                        variant="outlined"
                                        fullWidth
                                        error={hasError("packageLength")}
                                        helperText={
                                          hasError("packageLength")
                                            ? "required"
                                            : null
                                        }
                                        placeholder="1"
                                        size="small"
                                        type="text"
                                        onChange={handleChange("packageLength")}
                                        className={classes.profileMargin1}
                                        value={
                                          formState.values.packageLength || ""
                                        }
                                      />
                                    </Grid>

                                    <Grid
                                      item
                                      style={{
                                        marginTop: "16px",
                                        marginLeft: "18px",
                                      }}
                                    >
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
                                        *
                                      </Text>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={3}
                                      style={{
                                        marginTop: "2px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <TextField
                                        id="packageWidth"
                                        name="packageWidth"
                                        variant="outlined"
                                        fullWidth
                                        error={hasError("packageWidth")}
                                        helperText={
                                          hasError("packageWidth")
                                            ? "required"
                                            : null
                                        }
                                        placeholder="1"
                                        size="small"
                                        type="text"
                                        onChange={handleChange("packageWidth")}
                                        className={classes.profileMargin1}
                                        value={
                                          formState.values.packageWidth || ""
                                        }
                                      />
                                    </Grid>
                                    <Grid
                                      item
                                      style={{
                                        justify: "center",
                                        marginTop: "16px",
                                        marginLeft: "18px",
                                      }}
                                    >
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
                                        *
                                      </Text>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={3}
                                      style={{
                                        marginTop: "2px",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      <TextField
                                        id="packageHeight"
                                        name="packageHeight"
                                        variant="outlined"
                                        fullWidth
                                        error={hasError("packageHeight")}
                                        helperText={
                                          hasError("packageHeight")
                                            ? "required"
                                            : null
                                        }
                                        placeholder="1"
                                        size="small"
                                        type="text"
                                        onChange={handleChange("packageHeight")}
                                        className={classes.profileMargin1}
                                        value={
                                          formState.values.packageHeight || ""
                                        }
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid item xs={12} md={5} lg={6}>
                                  <Grid item xs={8}>
                                    <Text
                                      style={{
                                        fontSize: "13px",
                                        fontWeight: "700",
                                        marginLeft:
                                          stepdone === 1 ? "10px" : "20px",
                                        fontFamily:
                                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                        color: "#001737",

                                        transition: "all 0.25s",
                                      }}
                                    >
                                      Shipping To
                                    </Text>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginLeft: "10px" }}
                                  >
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={residentialTo}
                                          color="primary"
                                          onChange={handleChangeresidentalTo}
                                          name="residentialTo"
                                        />
                                      }
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
                                          Residential
                                        </Text>
                                      }
                                      value="2"
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "10px" }}
                                  >
                                    <TextField
                                      id="CompanyTo"
                                      name="CompanyTo"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("CompanyTo")}
                                      helperText={
                                        hasError("CompanyTo")
                                          ? formState.errors.CompanyTo[0]
                                          : null
                                      }
                                      placeholder="Company / Person"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("CompanyTo")}
                                      className={classes.profileMargin1}
                                      value={formState.values.CompanyTo || ""}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="AddressLine1To"
                                      name="AddressLine1To"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("AddressLine1To")}
                                      helperText={
                                        hasError("AddressLine1To")
                                          ? formState.errors.AddressLine1To[0]
                                          : null
                                      }
                                      placeholder="Address Line1"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("AddressLine1To")}
                                      className={classes.profileMargin1}
                                      value={
                                        formState.values.AddressLine1To || ""
                                      }
                                    />
                                  </Grid>

                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="AddressLine2To"
                                      name="AddressLine2To"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("AddressLine2To")}
                                      helperText={
                                        hasError("AddressLine2To")
                                          ? formState.errors.AddressLine2To[0]
                                          : null
                                      }
                                      placeholder="Address Line2"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("AddressLine2To")}
                                      onBlur={handleChange("AddressLine2To")}
                                      className={classes.profileMargin1}
                                      value={
                                        formState.values.AddressLine2To || ""
                                      }
                                    />
                                  </Grid>

                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px",marginLeft: "9px" }}
                                  >
                                    {/* <TextField
                                      id="CountryTo"
                                      name="CountryTo"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("CountryTo")}
                                      helperText={
                                        hasError("CountryTo")
                                          ? formState.errors.CountryTo[0]
                                          : null
                                      }
                                      placeholder="Country Code"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("CountryTo")}
                                      className={classes.profileMargin1}
                                      value={formState.values.CountryTo || ""}
                                    /> */}

                                    <Autocomplete
                                      id="combo-box-demo"
                                      fullWidth
                                      value={countryFillTo}
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
                                          handleChangeDaTo(newValue);
                                        } else {
                                          //setServicename("");
                                        }
                                        console.log("newvalue", newValue);
                                      }}
                                    />
                                  </Grid>

                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="PostalCodeTo"
                                      name="PostalCodeTo"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("PostalCodeTo")}
                                      helperText={
                                        hasError("PostalCodeTo")
                                          ? formState.errors.PostalCodeTo[0]
                                          : null
                                      }
                                      placeholder="PostalCode"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("PostalCodeTo")}
                                      className={classes.profileMargin1}
                                      value={
                                        formState.values.PostalCodeTo || ""
                                      }
                                    />
                                  </Grid>

                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="CityTo"
                                      name="CityTo"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("CityTo")}
                                      helperText={
                                        hasError("CityTo")
                                          ? formState.errors.CityTo[0]
                                          : null
                                      }
                                      placeholder="City"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("CityTo")}
                                      className={classes.profileMargin1}
                                      value={formState.values.CityTo || ""}
                                    />
                                  </Grid>

                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" ,marginLeft:'9px'}}
                                  >
                                    {/* <TextField
                                      id="StateTo"
                                      name="StateTo"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("StateTo")}
                                      helperText={
                                        hasError("StateTo")
                                          ? formState.errors.StateTo[0]
                                          : null
                                      }
                                      placeholder="State"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("StateTo")}
                                      className={classes.profileMargin1}
                                      value={formState.values.StateTo || ""}
                                    /> */}
                                  
                                  {(() => {
              if (countryFillTo.code==='US'){
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
                else if (countryFillTo.code==='CA'){
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
                                          placeholder="Search Country"
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
                                          placeholder="Search Country"
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
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="AttentionTo"
                                      name="AttentionTo"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("AttentionTo")}
                                      helperText={
                                        hasError("AttentionTo")
                                          ? formState.errors.AttentionTo[0]
                                          : null
                                      }
                                      placeholder="Attention"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("AttentionTo")}
                                      className={classes.profileMargin1}
                                      value={formState.values.AttentionTo || ""}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="PhoneTo"
                                      name="PhoneTo"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("PhoneTo")}
                                      helperText={
                                        hasError("PhoneTo")
                                          ? formState.errors.PhoneTo[0]
                                          : null
                                      }
                                      placeholder="Phone"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("PhoneTo")}
                                      className={classes.profileMargin1}
                                      value={formState.values.PhoneTo || ""}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="EmailTo"
                                      name="EmailTo"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("EmailTo")}
                                      helperText={
                                        hasError("EmailTo")
                                          ? formState.errors.EmailTo[0]
                                          : null
                                      }
                                      placeholder="Email"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("EmailTo")}
                                      className={classes.profileMargin1}
                                      value={formState.values.EmailTo || ""}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    style={{ marginTop: "5px" }}
                                  >
                                    <TextField
                                      id="InstructionTo"
                                      name="InstructionTo"
                                      variant="outlined"
                                      fullWidth
                                      error={hasError("InstructionTo")}
                                      helperText={
                                        hasError("InstructionTo")
                                          ? formState.errors.InstructionTo[0]
                                          : null
                                      }
                                      placeholder="Instruction"
                                      size="small"
                                      type="text"
                                      onChange={handleChange("InstructionTo")}
                                      className={classes.profileMargin1}
                                      value={
                                        formState.values.InstructionTo || ""
                                      }
                                    />
                                  </Grid>

                                  <Grid item xs={8}>
                                    <Text
                                      style={{
                                        fontSize: "13px",
                                        //fontWeight: '700',
                                        marginLeft:
                                          stepdone === 1 ? "10px" : "20px",
                                        fontFamily:
                                          '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                                        color: "#001737",

                                        transition: "all 0.25s",
                                      }}
                                    >
                                      Weight (LBS)
                                    </Text>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={8}
                                    container
                                    justify="flex-start"
                                    direction="row"
                                  >
                                    <Grid
                                      item
                                      xs={3}
                                      style={{
                                        marginTop: "2px",
                                        marginLeft: "0px",
                                      }}
                                    >
                                      <TextField
                                        id="packageWeight"
                                        name="packageWeight"
                                        variant="outlined"
                                        fullWidth
                                        error={hasError("packageWeight")}
                                        helperText={
                                          hasError("packageWeight")
                                            ? "required"
                                            : null
                                        }
                                        placeholder="Lbs"
                                        size="small"
                                        type="text"
                                        onChange={handleChange("packageWeight")}
                                        className={classes.profileMargin1}
                                        value={
                                          formState.values.packageWeight || ""
                                        }
                                      />
                                    </Grid>
                                    <Grid
                                      item
                                      xs={4}
                                      style={{
                                        marginTop: "2px",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      <TextField
                                        id="packageInsurance"
                                        name="packageInsurance"
                                        variant="outlined"
                                        fullWidth
                                        error={hasError("packageInsurance")}
                                        helperText={
                                          hasError("packageInsurance")
                                            ? "required"
                                            : null
                                        }
                                        placeholder="Insurance"
                                        size="small"
                                        type="text"
                                        onChange={handleChange(
                                          "packageInsurance"
                                        )}
                                        className={classes.profileMargin1}
                                        value={
                                          formState.values.packageInsurance ||
                                          ""
                                        }
                                      />
                                    </Grid>
                                    <Grid
                                      item
                                      xs={3}
                                      style={{
                                        marginTop: "2px",
                                        marginLeft: "20px",
                                      }}
                                    >
                                      <ColorButton
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        disabled={!formState.isValid}
                                        className={classes.submit}
                                        onClick={() => {
                                          upsIntegrationCall();
                                        }}
                                      >
                                        Calculate
                                      </ColorButton>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid
                              justify="flex-end"
                              container
                              spacing={24}
                              style={{ marginTop: "5px" }}
                            ></Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              }
            })()}

            {(() => {
              if (parseInt(stepdone) === 2) {
                return (
                  <Grid container spacing={1}>
                    {showToast(open, msg, type)}
                    <Grid item xs={12} justify="flex-start">
                      <MaterialTable
                        style={{ padding: "0px" }}
                        columns={state.columns}
                        data={ratedata}
                        icons={tableIcons}
                        title={
                          <View>
                          <Text
                          style={{
                            fontSize: "15px",
                            fontWeight: "700",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                            color: "#FF0000",
                            transition: "all 0.25s",
                          }}
                          >
                            {shippingPolicyName}
                            {'\n'}
                            </Text>
                            <Text
                          style={{
                            fontSize: "15px",
                            fontWeight: "700",
                            fontFamily:
                              '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
                            color: "#000000",
                            transition: "all 0.25s",
                          }}
                          >
                            Dangerous Goods : {props.countDangerousGood}
                            </Text>
                            </View>
                          
                        }
                        components={{
                          Container: (props) => (
                            <Paper {...props} elevation={0} />
                          ),
                          Toolbar: (props) => (
                            <StyledMTableToolbar {...props} />
                          ),
                        }}
                        localization={{
                          toolbar: {
                            searchPlaceholder: "Search Rates",
                          },
                          header: {
                            actions: "ACTION",
                          },
                        }}
                        options={{
                          paging: false,
                          showTitle: true,
                          doubleHorizontalScroll: true,
                          maxBodyHeight: "60vh",
                          headerStyle: { position: "sticky", top: 0 },
                          //pageSize:5,
                          //pageSizeOptions:[6, 12, 18, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                          addRowPosition: "first",
                          actionsColumnIndex: -1,
                          exportFileName: "Product Table",
                          headerStyle: {
                            backgroundColor: "#cccccc",
                            color: "#000",

                            textTransform: "uppercase",
                            width: 26,
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

                            width: 26,
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
                          selection: false,
                          showSelectAllCheckbox: false,
                          showTextRowsSelected: false,
                          search: true,
                          exportButton: false,

                          selectionProps: (rowData) => ({}),
                        }}
                        onSelectionChange={(rows) => {
                          //handleChangeCheckbox(rows);
                        }}
                        actions={[
                          {
                            tooltip: "Calculate Rate Again",
                            icon: () => (
                              <ColorButtonAdd
                                size="large"
                                variant="contained"
                                color="primary"
                              >
                                Calculate Rate Again
                              </ColorButtonAdd>
                            ),
                            onClick: (event, rowData) => {
                              // handleClickOpendelete1();
                              setStepdone(1);
                            },
                            isFreeAction: true,
                          },
                        ]}
                      />
                    </Grid>
                  </Grid>
                );
              }
            })()}
          </form>
        </DialogContent>
        <DialogActions style={{ margin: "auto" }}></DialogActions>
      </Dialog>
    </View>
  );
}

ShippingProfile.propTypes = {
  calculaterate: PropTypes.bool,
  handleDeleteCancle: PropTypes.func,
};