import React ,{ useState, useEffect } from 'react';
import { fade,withStyles,makeStyles} from '@material-ui/core/styles';
import {Platform,View,Image,Text,Dimensions} from 'react-native';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import * as shiphypeservice from './ShipService/shiphype_service';
import Toast from './feedback/Toast';
import ProgressBar from './feedback/ProgressBar';
import validate from 'validate.js';



const useStyles = makeStyles(theme => ({
    root: { 
      },
    submit: {
      margin: theme.spacing(0, 0, 0),
      borderRadius : 0,
},
textArea:{
  marginTop: theme.spacing(0),
  borderRadius : 0,
},
profileMargin: {
  marginTop: theme.spacing(1),
  borderRadius : 0,
  marginBottom: theme.spacing(1),
},
profileMargin1: {
    marginTop: theme.spacing(1),
    borderRadius : '5px',
  //  marginBottom: theme.spacing(1),
  },
paper: {
  border: '2px solid #ced4da',
  height: 80,
  width: 100,
},
paper1: {
  border: '2px solid #ced4da',
  height: 120,
  width: 100,
  marginLeft: '15%',
  marginTop: '8%'
},
root: {
  flexGrow: 1,
},
avatarsmall: {
  width: theme.spacing(3.5),
  height: theme.spacing(3.5),
},
appBarSpacer: theme.mixins.toolbar,
content: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
    height: '80vh',
    overflow: 'auto',
    backgroundColor:'#fff',
  },

   radioButtonCss:{
    color:'#000',fontSize:'2px'
  },
// grid: {
//   width: 100,
//   height: 100,
// },

}));


const schema = {
    
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
 address1:{
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
 city:{
  presence: { allowEmpty: false, message: 'is required' },
  
  length: {
    maximum: 64
  }
 },

//  country:{
//   presence: { allowEmpty: false, message: 'is required' },
 
//   length: {
//     maximum: 64
//   }

//  },
 phonenumber:{
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
 shipTo:{
  presence: { allowEmpty: false, message: 'is required' },
  length: {
    maximum: 64
  }
 },
 attn:{
  presence: { allowEmpty: false, message: 'is required' },
  length: {
    maximum: 64
  }
 },
 state:{
  presence: { allowEmpty: false, message: 'is required' },
  length: {
    maximum: 64
  }
 },
};

  const frequency = [
    
    {
      id: '1',
      label: 'Daily',
    },
    {
      id: '2',
      label: 'Weekly',
    },
    {
      id: '3',
      label: 'Monthly',
    },
    {
      id: '4',
      label: 'Quarterly',
    },
    {
      id: '5',
      label: 'Semi-Annually',
    },
  ];
  const countryData = [
    
   
    {
      id: 1,
      label: 'Canada',
    },
    {
      id: 2,
      label: 'United Kingdom',
    },
    {
      id: 3,
      label: 'United States of America',
    },
    {
      id: 4,
      label: 'Afghanistan',
    },
    {
      id: 5,
      label: 'Albania',
    },
    {
      id: 6,
      label: 'Algeria',
    },
    {
      id: 7,
      label: 'American Samoa',
    },
    {
      id: 8,
      label: 'Andorra',
    },
    {
      id: 9,
      label: 'Angola',
    },
    {
      id: 10,
      label: 'Anguilla',
    },
    {
      id: 11,
      label: 'Antigua & Barbuda',
    },
    {
      id: 12,
      label: 'Argentina',
    },
    {
      id: 13,
      label: 'Armenia',
    },
    {
      id: 14,
      label: 'Aruba',
    },
    {
      id: 15,
      label: 'Australia',
    },
    {
      id: 16,
      label: 'Austria',
    },
    {
      id: 17,
      label: 'Azerbaijan',
    },
    {
      id: 18,
      label: 'Bahamas',
    },
    {
      id: 19,
      label: 'Bahrain',
    },
    {
      id: 20,
      label: 'Bangladesh',
    },
    {
      id: 21,
      label: 'Barbados',
    },
    {
      id: 22,
      label: 'Belarus',
    },
    {
      id: 23,
      label: 'Belgium',
    },
    {
      id: 24,
      label: 'Belize',
    },
    {
      id: 25,
      label: 'Benin',
    },
    {
      id: 26,
      label: 'Benin',
    },
    {
      id: 27,
      label: 'Bermuda',
    },
    {
      id: 28,
      label: 'Bhutan',
    },
    {
      id: 29,
      label: 'Bolivia',
    },
    {
      id: 30,
      label: 'Bosnia & Herzegovina',
    },
    {
      id: 31,
      label: 'Botswana',
    },
    {
      id: 32,
      label: 'Brazil',
    },
    {
      id: 33,
      label: 'British Indian Ocean Ter',
    },
    {
      id: 34,
      label: 'Brunei',
    },
    {
      id: 35,
      label: 'Bulgaria',
    },
    {
      id: 36,
      label: 'Burkina Faso',
    },
    {
      id: 37,
      label: 'Burundi',
    },
    {
      id: 38,
      label: 'Cambodia',
    },
    {
      id: 39,
      label: 'Cameroon',
    },
    {
      id: 40,
      label: 'Canary Islands',
    },
    {
      id: 41,
      label: 'Cape Verde',
    },
    {
      id: 42,
      label: 'Cayman Islands',
    },
    {
      id: 43,
      label: 'Central African Republic',
    },
    {
      id: 44,
      label: 'Chad'
    },
    {
      id: 45,
      label: 'Channel Islands'
    },
    
  
  
  {
    id: 46,
    label: 'Chile'},
    {
      id: 47,
      label: 'China'},
      {
        id: 48,
        label: 'Christmas Island'},
        {
          id: 49,
          label: 'Cocos Island'},
          {
            id: 50,
            label: 'Colombia'},
            {
              id: 51,
              label: 'Comoros'},
              {
                id: 52,
                label: 'Congo'},
                {
                  id: 53,
                  label: 'Cook Islands'},
                  {
                    id: 54,
                    label: 'Costa Rica'},
                    {
                      id: 55,
                      label: 'Cote DIvoire'},
                      {
                        id: 56,
                        label: 'Croatia'},
                        {
                          id: 57,
                          label: 'Cuba'},
                          {
                            id: 58,
                            label: 'Curacao'},
                            {
                              id: 59,
                              label: 'Cyprus'},
                              {
                                id: 60,
                                label: 'Czech Republic'},
                                {
                                  id: 61,
                                  label: 'Denmark'},
                                  {
                                    id: 62,
                                    label: 'Djibouti'},
                                    {
                                      id: 63,
                                      label: 'Dominica'},
                                      {
                                        id: 64,
                                        label: 'Dominican Republic'},
                                        {
                                          id: 65,
                                          label: 'East Timor'},
                                          {
                                            id: 66,
                                            label: 'Ecuador'},
                                            {
                                              id: 67,
                                              label: 'Egypt'},
                                              {
                                                id: 68,
                                                label: 'El Salvador'},
                                                {
                                                  id: 69,
                                                  label: 'Equatorial Guinea'},
                                                  {
                                                    id: 70,
                                                    label: 'Eritrea'},
                                                    {
                                                      id: 71,
                                                      label: 'Estonia'},
                                                      {
                                                        id: 72,
                                                        label: 'Ethiopia'},
                                                        {
                                                          id: 73,
                                                          label: 'Falkland Islands'},
                                                          {
                                                            id: 74,
                                                            label: 'Faroe Islands'},
                                                            {
                                                              id: 75,
                                                              label: 'Fiji'},
                                                              {
                                                                id: 76,
                                                                label: 'Finland'},
                                                                {
                                                                  id: 77,
                                                                  label: 'France'},
                                                                  {
                                                                    id: 78,
                                                                    label: 'French Guiana'},
                                                                    {
                                                                      id: 79,
                                                                      label: 'French Polynesia'},
     {
      id: 80,
       label: 'French Southern Ter'
      },
      {
        id: 81,
         label: 'Gabon'},
         {
          id: 82,
           label: 'Gambia'},
           {
            id: 83,
             label: 'Georgia'},
             {
              id: 84,
               label: 'Germany'},
               {
                id: 85,
                 label: 'Ghana'},
                 {
                  id: 86,
                   label: 'Gibraltar'},
                   {
                    id: 87,
                     label: 'Great Britain'},
                     {
                      id: 88,
                       label: 'Greece'},
                       {
                        id: 89,
                         label: 'Greenland'},
                         {
                          id: 90,
                           label: 'Grenada'},
                           {
                            id: 91,
                             label: 'Guadeloupe'},
                             {
                              id: 92,
                               label: 'Guam'},
                               {
                                id: 93,
                                 label: 'Guatemala'},
                                 {
                                  id: 94,
                                   label: 'Guinea'},
                                   {
                                    id: 95,
                                     label: 'Guyana'},
                                     {
                                      id: 96,
                                       label: 'Haiti'},
                                       {
                                        id: 97,
                                         label: 'Hawaii'},
                                         {
                                          id: 98,
                                           label: 'Honduras'},
                                           {
                                            id: 99,
                                             label: 'Hong Kong'},
                                             {
                                              id: 100,
                                               label: 'Hungary'},
                                               {
                                                id: 101,
                                                 label: 'Iceland'},
                                                 {
                                                  id: 102,
                                                   label: 'Indonesia'},
                                                   {
                                                    id: 103,
                                                     label: 'India'},
                                                     {
                                                      id: 104,
                                                       label: 'Iran'},
                                                       {
                                                        id: 105,
                                                         label: 'Iraq'},
                                                         {
                                                          id: 106,
                                                           label: 'Ireland'},
                                                           {
                                                            id: 107,
                                                             label: 'Isle of Man'},
                                                             {
                                                              id: 108,
                                                               label: 'Israel'},
                                                               {
                                                                id: 109,
                                                                 label: 'Italy'},
                                                                 {
                                                                  id: 110,
                                                                   label: 'Jamaica'},
                                                                   {
                                                                    id: 111,
                                                                     label: 'Japan'},
                                                                     {
                                                                      id: 112,
                                                                       label: 'Jordan'},
                                                                       {
                                                                        id: 113,
                                                                         label: 'Kazakhstan'},
                                                                         {
                                                                          id: 114,
                                                                           label: 'Kenya'},
                                                                           {
                                                                            id: 115,
                                                                             label: 'Kiribati'},
                                                                             {
                                                                              id: 116,
                                                                               label: 'Korea North'},
                                                                               {
                                                                                id: 117,
                                                                                 label: 'Korea South'},
                                                                                 {
                                                                                  id: 118,
                                                                                   label: 'Kuwait'},
   {
   id: 119,
    label: 'Kyrgyzstan'},
    {
      id: 120,
       label: 'Laos'},
       {
        id: 121,
         label: 'Latvia'},
         {
          id: 122,
           label: 'Lebanon'},
           {
            id: 123,
             label: 'Lesotho'},
             {
              id: 124,
               label: 'Liberia'},
               {
                id: 125,
                 label: 'Libya'},
                 {
                  id: 126 ,
                   label: 'Liechtenstein'},
                   {
                    id: 127,
                     label: 'Lithuania'},
                     {
                      id: 128,
                       label: 'Luxembourg'},
                       {
                        id: 129,
                         label: 'Macau'},
                         {
                          id: 130 ,
                           label: 'Macedonia'},
                           {
                            id: 131,
                             label: 'Madagascar'},
                             {
                              id: 132,
                               label: 'Malaysia'},
                               {
                                id: 133,
                                 label: 'Malawi'},
                                 {
                                  id: 134,
                                   label: 'Maldives'},
                                   {
                                    id: 135,
                                     label: 'Mali'},
                                     {
                                      id: 136,
                                       label: 'Malta'},
                                       {
                                        id: 137,
                                         label: 'Marshall Islands'},
                                         {
                                          id: 138,
                                           label: 'Martinique'},
                                           {
                                            id: 139,
                                             label: 'Mauritania'},
                                             {
                                              id: 140,
                                               label: 'Mauritius'},
                                               {
                                                id: 141,
                                                 label: 'Mayotte'},
                                                 {
                                                  id: 142,
                                                   label: 'Mexico'},
                                                   {
                                                    id: 143,
                                                     label: 'Midway Islands'},
                                                     {
                                                      id: 144,
                                                       label: 'Moldova'},
                                                       {
                                                        id: 145,
                                                         label: 'Monaco'},
                                                         {
                                                          id: 146,
                                                           label: 'Mongolia'},
                                                           {
                                                            id: 147,
                                                             label: 'Montserrat'},
                                                             {
                                                              id: 148,
                                                               label: 'Morocco'},
                                                               {
                                                                id: 149,
                                                                 label: 'Mozambique'},
                                                                 {
                                                                  id: 150,
                                                                   label: 'Myanmar'},
                                                                   {
                                                                    id: 151,
                                                                     label: 'Nambia'},
                                                                     {
                                                                      id: 152,
                                                                       label: 'Nauru'},
                                                                       {
                                                                        id: 153,
                                                                         label: 'Nepal'},
                                                                         {
                                                                          id: 154,
                                                                           label: 'Netherland Antilles'},
                                                                           {
                                                                            id: 155,
                                                                             label: 'Netherlands (Holland, Europe)'},
     {
       id: 156,
       label: 'Nevis'},
       {
        id: 157,
        label: 'New Caledonia'},
        {
          id: 158,
          label: 'New Zealand'},
          {
            id: 159 ,
            label: 'Nicaragua'},
            {
              id: 160,
              label: 'Niger'},
              {
                id: 161,
                label: 'Nigeria'},
                {
                  id: 162,
                  label: 'Niue'},
                  {
                    id: 163,
                    label:  'Norfolk Island'},
                    {
                      id: 164,
                      label: 'Norway'},
                      {
                        id: 165,
                        label: 'Oman'},
                        {
                          id: 166 ,
                          label: 'Pakistan'},
                          {
                            id: 167,
                            label: 'Palau Island'},
                            {
                              id:168 ,
                              label: 'Palestine'},
                              {
                                id: 169,
                                label: 'Panama'},
                                {
                                  id:170 ,
                                  label: 'Papua New Guinea'},
                                  {
                                    id: 171,
                                    label: 'Paraguay'},
                                    {
                                      id: 172,
                                      label: 'Peru'},
                                      {
                                        id: 173,
                                        label: 'hilippines'},
                                        {
                                          id: 174,
                                          label: 'Pitcairn Island'},
                                          {
                                            id: 175 ,
                                            label: 'Poland'},
                                            {
                                              id: 176 ,
                                              label: 'Portugal'},
                                              {
                                                id: 177 ,
                                                label: 'Puerto Rico'},
                                                {
                                                  id:178,
                                                  label: 'Qatar'},
                                                  {
                                                    id: 179,
                                                    label: 'Republic of Montenegro'},
                                                    {
                                                      id: 180,
                                                      label: 'Republic of Serbia'},
                                                      {
                                                        id: 181,
                                                        label: 'Reunion'},
                                                        {
                                                          id: 182,
                                                          label: 'Romania'},
                                                          {
                                                            id: 183,
                                                            label: 'Russia'},
                                                            {
                                                              id: 184,
                                                              label: 'Rwanda'},
                                                              {
                                                                id: 185,
                                                                label: 'St Barthelemy'},
                                                                {
                                                                  id: 186,
                                                                  label: 'St Eustatius'},
                                                                  {
                                                                    id: 187,
                                                                    label: 'St Helena'},
                                                                    {
                                                                      id: 188 ,
                                                                      label: 'St Kitts-Nevis'},
                                                                      {
                                                                        id: 189,
                                                                        label: 'St Lucia'},
                                                                        {
                                                                          id: 190,
                                                                          label: 'St Maarten'},
                                                                          {
                                                                            id: 191,
                                                                            label: 'St Pierre & Miquelon'},
                                                                            {
                                                                              id: 192,
                                                                              label: 'St Vincent & Grenadines'},
                                                                              {
                                                                                id: 193,
                                                                                label: 'Saipan'},
                                                                                {
                                                                                  id: 194,
                                                                                  label: 'Samoa'},
                                                                                  {
                                                                                    id: 195,
                                                                                    label: 'Samoa American'},
                                                                                    {
                                                                                      id: 196,
                                                                                      label: 'San Marino'},
     {
      id: 197,
       label: 'Sao Tome & Principe'},
       {
        id: 198,
        label: 'Saudi Arabia'},
        {
          id: 199,
          label: 'Senegal'},
          {
            id: 200,
            label: 'Seychelles'},
            {
              id: 201,
              label: 'Sierra Leone'},
              {
                id: 202,
                label: 'Singapore'},
                {
                  id: 203,
                  label: 'Slovakia'},
                  {
                    id: 204 ,
                    label: 'Slovenia'},
                    {
                      id: 205,
                      label: 'Solomon Islands'},
                      {
                        id: 206,
                        label: 'Somalia'},
                        {
                          id: 207,
                          label: 'South Africa'},
                          {
                            id: 208,
                            label: 'Spain'},
                            {
                              id:209 ,
                              label: 'Sri Lanka'},
                              {
                                id: 210,
                                label: 'Sudan'},
                                {
                                  id:211,
                                  label: 'Suriname'},
                                  {
                                    id: 212,
                                    label: 'Swaziland'},
                                    {
                                      id: 213,
                                      label: 'Sweden'},
                                      {
                                        id:214 ,
                                        label: 'Switzerland'},
                                        {
                                          id: 215,
                                          label: 'Syria'},
                                          {
                                            id: 216,
                                            label: 'Tahiti'},
                                            {
                                              id:217 ,
                                              label: 'Taiwan'},
                                              {
                                                id: 218,
                                                label: 'Tajikistan'},
                                                {
                                                  id:219 ,
                                                  label: 'Tanzania'},
                                                  {
                                                    id:220,
                                                    label: 'Thailand'},
                                                    {
                                                      id: 221,
                                                      label: 'Togo'},
                                                      {
                                                        id: 222,
                                                        label: 'Tokelau'},
                                                        {
                                                          id: 223,
                                                          label: 'Tonga'},
                                                          {
                                                            id: 224,
                                                            label: 'Trinidad & Tobago'},
                                                            {
                                                              id: 225,
                                                              label: 'Tunisia'},
                                                              {
                                                                id: 226,
                                                                label: 'Turkey'},
                                                                {
                                                                  id: 227,
                                                                  label: 'Turkmenistan'},
                                                                  {
                                                                    id: 228,
                                                                    label: 'Turks & Caicos Is'},
                                                                    {
                                                                      id:229 ,
                                                                      label: 'Tuvalu'},
                                                                      {
                                                                        id: 230,
                                                                        label: 'Uganda'},   
                                                                        {
                                                                          id: 231,
                                                                          label: 'Ukraine'},
                                                                          {
                                                                            id: 232,
                                                                            label: 'United Arab Emirates'},   
                                                                            {
                                                                              id: 233,
                                                                              label: 'Uruguay'},
                                                                              {
                                                                                id: 234,
                                                                                label: 'Uzbekistan'},
                                                                                {
                                                                                  id: 235,
                                                                                  label: 'Vanuatu'},
                                                                                  {
                                                                                    id:236 ,
                                                                                    label: 'Vatican City State'},
                                                                                    {
                                                                                      id:237 ,
                                                                                      label: 'Venezuela'},
                                                                                      {
                                                                                        id: 238,
                                                                                        label: 'Vietnam'},
      {
            id: 239,
         label: 'Virgin Islands (Brit)'},
       {
               id:240 ,
          label: 'Virgin Islands (USA)'},
               {
                 id: 241,
               label: 'Wake Island'},
                       {
                    id:242 ,
     label: 'Wallis & Futana Is'},
       {
      id: 243,  
       label: 'Yemen'},
      {
                 id: 244,
      label: 'Zaire'},
                           {
             id: 245,
                     label: 'Zambia'},
                  {
                 id: 256,
               label: 'Zimbabwe'},
     
    ];

/****   For changing the textfield radius  : End *********/
const styles = (theme) => ({
  root: {
    '@media print': {
    margin: 0,
    padding: theme.spacing(2),
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
    height:'60%',
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
 * Description:This function is used for CreateSprint for sprint
 * @param {*} props 
 */
export default function CreateSprint(props) {
  
   const classes = useStyles();
    //const {openCreateSprint}= props;
   
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Set());
    const [value, setValue] = React.useState('2');
    const [value1, setValue1] = React.useState('4');
    const [warehouse, setWarehouse] = React.useState('2');
    const [countryFill, setContruData] = React.useState('0');
    const [userAddressName, setuserAddressName] = React.useState('');
    const [userdata,setUserData]=React.useState([]);
    const [useraddress,setUseraddress]=React.useState([]);
    const [valueBack, setValueBack] = React.useState('4');
    
    const [dataUser,setDataUser]=React.useState([]);
    const handleChangeRadio = (event) => {
        setValue(event.target.value);
       
      };
      const userid=props.user_id;
      const [open, setOpen]=React.useState(false);
      const [msg,setMsg]=React.useState('');
      const [UserDataStatus,setUserDataStatus]=React.useState(false);
      const [type,setType]=React.useState('');
      const [status,setStatus]=React.useState(false);
      const [loading,setLoading]=React.useState(false);
      const [formState, setFormState] =useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
      });
      const handleChange1 = event => {
        setWarehouse(event.target.value);
      };
      const handleChangeRadio1 = (event) => {
        setValue1(event.target.value);
       
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
  React.useEffect(() => {
  
    //fetchShiphypeCompleteStep(); 
    fetchReturnPrefilled();
   } ,[]);
  
   const fetchReturnPrefilled = ()=>{
  
     //  const userid=userid;
     shiphypeservice.fetchUserFormDetails(userid)
     .then(response => {
      console.log("status",response.status);
           if(response.status === true) {
              // if(response.data[0].returnsettingId === 2){
          //   setValue('2');
          // }else{
          //   setValue('1');
          // }
             setDataUser(response.data);
             setContruData(response.data[0].country);
             if((response.data.length) !== 0){
              bindData1(response.data);
              if(response.data[0].returnsettingId === 3){
                setValue1('3');
              }else{
                setValue1('4');
              }
            }
             setWarehouse(response.data[0].frequency);
                      }else{
                       //setLoading(false);
                       console.log("message",response.message);
                      }   
         }).catch((error) =>{
               console.error(error);
         });
   }

   const handleClickSet= () => {
  
    if(value === '1' && value1==='3'){
      updateUserData();
      handleAddReturnPreFiiled();
      //addStepStatus();
     }
     else if(value=='2' && value1==='3')
     {
      updateUserData();
      handleAddReturnPreFiiled();
     }
     else if(value=='2' && value1==='4')
     {
      updateUserData();
      handleAddReturnPreFiiled();

    //  updateUserData();
     }
     else if(value=='1' && value1==='4')
     {
      updateUserData();
      handleAddReturnPreFiiled();
     }
    
   
   };
/**
 * Description:To do call custome integration api
 */
const handleAddReturnPreFiiled = () => {

  if(dataUser.length === 0)
  {
  // const reciepent='vishal.tyagi@quicklivesolutions.com';
   const returnsettingid=value1;
   const name=userAddressName;
   const frequency=warehouse;
   const shipto=formState.values.shipTo;
   const address1=formState.values.address1;
   const address2=formState.values.address2;
   const city=formState.values.city;
   const state=formState.values.state;
   const zipcode=formState.values.zipcode;
   const country=countryFill;
   const telephone=formState.values.phonenumber;
   const email=formState.values.email;
 // const frequency=formState.values.warehouse;
  // const additionalnotes=formState.values.additionalnotes;
 //  console.log("subject",subject);
   setLoading(true);
   shiphypeservice.returnSettingFormFill(userid,returnsettingid,name,frequency,'',
    shipto,address1,address2,city,state,zipcode,country,telephone,email)
  .then(response => {
         if(response.status === true) {
          setOpen(true);
          setType('success');
          setMsg(response.message);
          setStatus(response.status);
          setLoading(false);
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
  else
  {
// const reciepent='vishal.tyagi@quicklivesolutions.com';
const returnsettingid=value1;
const name=userAddressName;
const frequency=warehouse;
const shipfrom=dataUser[0].shipfrom;
const shipto=formState.values.shipTo;
const address1=formState.values.address1;
const address2=formState.values.address2;
const city=formState.values.city;
const state=formState.values.state;
const zipcode=formState.values.zipcode;
const country=countryFill;
const telephone=formState.values.phonenumber;
const email=formState.values.email;
// const frequency=formState.values.warehouse;
// const additionalnotes=formState.values.additionalnotes;
//  console.log("subject",subject);
setLoading(true);
const userreturndetailId=dataUser[0].userreturndetailId;

shiphypeservice.returnSettingFormFillUpdate(userreturndetailId,userid,returnsettingid,name,frequency,shipfrom,
shipto,address1,address2,city,state,zipcode,country,telephone,email)
.then(response => {
      if(response.status === true) {
        setOpen(true);
        setType('success');
        setMsg(response.message);
        setStatus(response.status);
        setLoading(false);
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
 };

 const handleChangeDa = event => {
  setContruData(event.target.value);
};

 /**
 * Description:To Do bind data for update
 */
const bindData1 = (data)=>{
  console.log("bind call");
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,shipTo:data[0].shipto,
        checkFrom:false
      },
      touched:{
        ...formState.touched,
        shipTo : true
      }
     }));
  
     setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,attn:data[0].name,
        checkFrom:false
      },
      touched:{
        ...formState.touched,
        attn : true
      }
     }));
  
     setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,email: data[0].email,
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
        ...formState.values,city: data[0].city,
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
        ...formState.values,zipcode: data[0].zipcode,
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
        ...formState.values,address1: data[0].address1,
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
        ...formState.values,address2: data[0].address2,
        checkFrom:false
      },
      touched:{
        ...formState.touched,
        address2 : true
      }
     }));

     setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,state: data[0].state,
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
        ...formState.values,phonenumber: data[0].telephone,
        checkFrom:false
      },
      touched:{
        ...formState.touched,
        phonenumber : true
      }
     }));
  }


    useEffect(() => {
      //getUserData(userid);
      getUserFixedAddress();    
     },[]);
          
       
           const getUserFixedAddress = ()=>{
            setLoading(false);
            shiphypeservice.fetchFixedAddress(userid)
            .then(response => {
             console.log("apicall",response.status);
            
                  if(response.status === true) {
                   setUseraddress(response.data);
                   setuserAddressName(response.data[0].name);
                   setUserDataStatus(true);
                   setLoading(false);
                   if(response.data[0].returnsettingId1 === 2){
                    setValue("2");
                  }else{
                    setValue("1");
                  }
                   console.log("datatset",JSON.stringify(response.data));
                   
                             }else{
                               console.log("message",response.message);
                               setLoading(false);
                             }   
                }).catch((error) =>{
                      console.error(error);
                      setLoading(false);
                });
          }

         
       /**
   * Description:This function call on type character inside input text
   * @param {} prop 
   */
  const handleChange = prop => event => {
    console.log("email",event.target.value);
    event.persist();
    if(prop === "attn"){
      setuserAddressName(event.target.value);
    }
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
const updateUserData= () =>{
  const returnsettingid1=value;
  shiphypeservice.updateUserDataName(userAddressName,userid,returnsettingid1)
  .then(response => {
   console.log("status",response.status);
        if(response.status === true) {
          setLoading(false);
          
          
              handleNextPage(7,5);
            
            //handleNextPage(parseInt(value),5);
          
         
                   }else{
                    setLoading(false);
                    console.log("message",response.message);
                   }   
      }).catch((error) =>{
            console.error(error);
      });
}
//Show Toast after click event
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

/**
    * Description:Callback function after api call
    */
   const handleClose = () => {
     setOpen(false);
     if(status === true)
    
     {
      addStepStatus();
     }else{
      
     }
   };
    /**
  * For change the value of the name and get the id and value
  * @param {*} i 
  * @param {*} event 
  */
 function handleChangeName( event) {
 
 
  setuserAddressName(event.target.value);
}
   
  /**
 * Description:To do call function on next button
 * @param {*} isSprintCreate 
 */
const handleNextPage = (isSprintCreate,pageExits) => {
    props.handleNextPage(isSprintCreate,pageExits);
  //props.handleNext(isSprintCreate);
}
 
 


 


         
    
/**
 * Description:To do close poup after successfully create sprint and on click cancel button
 * @param {*} issprintCreate 
 */
const handleClose1 = (isSprintCreate) => {
  props.handleSprintCancel(isSprintCreate);
}
let screenWidth = Dimensions.get('window').width;

const hasError = field =>
formState.touched[field] && formState.errors[field] ? true : false;

    return (  
        <View className={classes.content}>
       
                  <Grid style={{marginLeft:'3px'}}>
         {/* <Text 
           style={{
            fontSize: '14px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',
           }}>{'\n'}
           </Text>   */}
         </Grid>
       
         {(() => {
              if (parseInt(value) === 1){
                  return (
                    <View>

                    <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
                   <form className={classes.form}>
         <Grid  justify="space-between" // Add it here :)
      container 
      spacing={2} >
        <Grid items lg={12}  style={{
            marginLeft:'18px',
           }} >
         <FormControl component="fieldset">
     
      <RadioGroup aria-label="carries" name="carries" value={value} onChange={handleChangeRadio}>
      <Typography justify="center" variant="body1" style={{fontSize: '14px',
            fontWeight: '700',
            marginTop:'35px',
            marginBottom:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>{'\n'}{'\n'}Address for Shipping Labels{'\n'}
</Typography>

      <FormControlLabel value="2" color="primary" control={<Radio color="primary"/>} label={<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>I want to display my name on shipping labels.</Text> } />

       <FormControlLabel value="1" color="primary" control={<Radio color="primary"/>} label={<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>I want to display ShipHype's name on shipping labels.</Text> }/>
      
      

      </RadioGroup>
    </FormControl>
        
         </Grid> 
         

        {showToast(open,msg,type)}
       </Grid>

     
       {/* </Grid> */}
       </form>
                    </View>
                    )
                }
                
                
              })()}
               {(() => {
              if (parseInt(value) === 2){
                  return (
                    <View>
                 <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
                  <form className={classes.form}>
         <Grid  justify="space-between" // Add it here :)
      container 
      spacing={2} >
        <Grid items lg={12}  style={{
            marginLeft:'18px',
           }} >
         <FormControl component="fieldset">
     
      <RadioGroup aria-label="carries" name="carries" value={value} onChange={handleChangeRadio}>
      <Typography justify="center" variant="body1" style={{fontSize: '14px',
            fontWeight: '700',
            marginTop:'35px',
            marginBottom:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>{'\n'}{'\n'}Address for Shipping Labels{'\n'}
</Typography>

      <FormControlLabel value="2" color="default" control={<Radio color="primary"/>} label={<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>I want to display my name on shipping labels.</Text> } />
             <View style={{ marginLeft:'30px', marginTop:'10px'}}>
          
          <TextField
         id="name"
         name='name'
         variant="outlined"
         fullWidth
         
         placeholder="Name/Business Name"
         size='small'
         type="text"
         onChange={e => handleChangeName( e)}
        style={{width:'90%'}}
         value={userAddressName}
       />
</View>
            
        <FormControlLabel value="1" color="default" control={<Radio color="primary" />} label={<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>I want to display ShipHype's name on shipping labels.</Text> }/>
      
     
          
     
      </RadioGroup>
    </FormControl>
        
         </Grid> 
       
         {/* <Grid item xs={12} md={12} lg={12}  >
       
       
           <Grid  justify="flex-end" // Add it here :)
 container 
 spacing={24} >
   <Grid item >
    
       </Grid>


       <Grid item   >

       <ColorButton
       size='large'
       variant="contained"
       color="primary"
       className={classes.profileMargin}
       onClick={()=>{handlePreviousPage(4)}}>
          Back
       </ColorButton>&nbsp;&nbsp;
 
  <ColorButton
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
   
  
    onClick={()=>{updateUserData()}}
  >
    NEXT
     {/* {language.copyandsaveobject} */}
  
  {/* </ColorButton>
       </Grid>


       </Grid>
       </Grid> */} 

     
       </Grid>
       </form>
                    </View>
                    )
                }
              })()}

                
       {(() => {
              if (parseInt(value1) === 3){
                  return (
                    <View>
                <Grid justify="center">
            <ProgressBar 
             loading={loading}
            />
            </Grid>
                <form className={classes.form}>
         <Grid  justify="space-between" // Add it here :)
      container 
      spacing={2} >
        <Grid items lg={12}  style={{
            marginLeft:'18px',
            marginTop:'10px',
           }} >
                <hr style={{marginTop:'18px'}}/>
         <FormControl component="fieldset">
     
      <RadioGroup aria-label="carries" name="carries" value={value1} onChange={handleChangeRadio1}>
     
     
   
<Typography justify="center" variant="body1" style={{fontSize: '14px',
            fontWeight: '700',
            marginTop:'15px',
            marginBottom:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>{'\n'}Returns Handling{'\n'}
</Typography>

<FormControlLabel value="4" color="default"control={<Radio color="primary"/>} style={{fontSize: '0.8rem',lineHeight:'0.002',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}label={<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>I want ShipHype to process returns for me.</Text> } />

      <FormControlLabel value="3" color="default" control={<Radio color="primary"/>}  label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>I want ShipHype to ship back my returns to me and I will process them myself.</Text> }/>
       
      </RadioGroup>
    </FormControl>
        
         </Grid> 
         <Grid item xs={12} md={6} lg={6}>
       
       <Grid item xs={10} style={{
           marginLeft:'15px',
           }}>
    
         <TextField
           id="shipTo"
           name='shipTo'
           variant="outlined"
           fullWidth
           error={hasError('shipTo')}
           helperText={
             hasError('shipTo') ? formState.errors.shipTo[0] : null
           }
           placeholder="Ship To"
           size='small'
           type="text"
           onChange={handleChange('shipTo')}
           className={classes.profileMargin2}
           value={formState.values.shipTo || ''}
         />
    
       </Grid>
         <Grid item xs={10} style={{
           marginLeft:'15px',
           }}>
    
         <TextField
           id="attn"
           name='attn'
           variant="outlined"
           fullWidth
           error={hasError('attn')}
           helperText={
             hasError('attn') ? formState.errors.attn[0] : null
           }
           placeholder="Attn:"
           size='small'
           type="text"
           onChange={handleChange('attn')}
           className={classes.profileMargin1}
           value={userAddressName}
         />
    
       </Grid>
       <Grid item xs={10} style={{
           marginLeft:'15px',
           }}>
    
         <TextField
           id="address1"
           name='address1'
           variant="outlined"
           fullWidth
           error={hasError('address1')}
           helperText={
             hasError('address1') ? formState.errors.address1[0] : null
           }
           placeholder="Address 1"
           size='small'
           type="text"
           onChange={handleChange('address1')}
           className={classes.profileMargin1}
           value={formState.values.address1 || ''}
         />
    
       </Grid>
       <Grid item xs={10} style={{
           marginLeft:'15px',
           }}>
    
         <TextField
           id="address2"
           name='address2'
           variant="outlined"
           fullWidth
           error={hasError('address2')}
           helperText={
             hasError('address2') ? formState.errors.address2[0] : null
           }
           placeholder="Address 2"
           size='small'
           type="text"
           onChange={handleChange('address2')}
           className={classes.profileMargin1}
           value={formState.values.address2 || ''}
         />
    
       </Grid>
       <Grid item xs={10} style={{
           marginLeft:'15px',
           }}>
    
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
    
       <Grid item xs={10} style={{
           marginLeft:'15px',
           }}>
    
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
       </Grid>
       <Grid item xs={12} md={6} lg={6}>
       
       <Grid item xs={10} style={{
           marginLeft:'15px',
           }}>
    
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
           className={classes.profileMargin2}
          
           value={formState.values.zipcode || ''}
         />
    
       </Grid>
       <Grid item xs={10} style={{
           marginLeft:'15px',
           }}>
    

     <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
         // label="Select Seller"
          value={countryFill}
          onChange={handleChangeDa}
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
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Country</option>
     
         {countryData.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.label}  
            >
          {option.label}
         </option>
       ))}
        </TextField>
       </Grid>
       <Grid item xs={10} style={{
           marginLeft:'15px',
           }}>
    
         <TextField
           id="phonenumber"
           name='phonenumber'
           variant="outlined"
           fullWidth
           error={hasError('phonenumber')}
           helperText={
             hasError('phonenumber') ? formState.errors.phonenumber[0] : null
           }
           placeholder="Tel"
           size='small'
           type="text"
           onChange={handleChange('phonenumber')}
           className={classes.profileMargin1}
          
           value={formState.values.phonenumber || ''}
         />
    
       </Grid>
       <Grid item xs={10} style={{
           marginLeft:'15px',
           }}>
    
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
       <Grid item xs={10} style={{
           marginLeft:'15px',
           }}>
    
       {/* <TextField
        id="select"
        name="fullname"
        variant="outlined"
       fullWidth
       label="Select option"
       select
       
      // onChange={handleChange('timeZone')}
       value={warehouse}
      //type="text"
     //  type="timeZone"
       size='small'
       className={classes.profileMargin1}
       onChange={handleChange1}
     >
       <option value='0' disabled  style={{paddingLeft:'3%'}}>Select Frequency</option>
       {frequency.map(option => (
         
           <option  style={{paddingLeft:'3%'}} 
            key={option.id} value={option.id}  
              >
             {option.label}
           </option>
         ))}
     </TextField> */}
    
     <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
         // label="Select Seller"
          value={warehouse}
          onChange={handleChange1}
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
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Frequency</option>
     
         {frequency.map(option => (
         
         <option  style={{fontSize: '14px',
         //fontWeight: '700',
         paddingLeft:'15px',
         cursor:'pointer',
         fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          key={option.id} value={option.id}  
            >
          {option.label}
         </option>
       ))}
        </TextField>


       </Grid>
       {/* <Grid item xs={10} style={{
           marginLeft:'15px', marginTop:'8px',
           }}>
           <Grid  justify="space-between" // Add it here :)
 container 
 spacing={24} >
   <Grid item >
  
       </Grid>


       <Grid item   >

      
       <ColorButton
       size='large'
       variant="contained"
       color="primary"
       className={classes.profileMargin}
       onClick={()=>{handlePreviousPage(5)}}>
          Back
       </ColorButton>&nbsp;&nbsp;
  <ColorButton
    size='large'
    variant="contained"
    color="primary"
    className={classes.profileMargin}
    disabled={!formState.isValid}
    onClick={()=>{handleAddReturnPreFiiled()}}
  >
    NEXT
  
  </ColorButton>
       </Grid>


       </Grid></Grid> */}
       </Grid>

     
       </Grid>
       </form>
                    </View>
                    )
                }
              })()}


               {(() => {
              if (parseInt(value1) === 4){
                  return (
                    <View>
                
                  <form className={classes.form}>
         <Grid  justify="space-between" // Add it here :)
      container 
      spacing={2} >
         <Grid items lg={12}  style={{
            marginLeft:'18px',
            marginTop:'10px',
           }} >
              <hr style={{marginTop:'18px'}}/>
         <FormControl component="fieldset">
     
      <RadioGroup aria-label="carries" name="carries" value={value1} onChange={handleChangeRadio1}>
     
    
      
<Typography justify="center" variant="body1" style={{fontSize: '14px',
            fontWeight: '700',
            marginTop:'15px',
            marginBottom:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>{'\n'}Returns Handling{'\n'}
</Typography>

<FormControlLabel value="4" color="default"control={<Radio color="primary"/>} style={{fontSize: '0.8rem',lineHeight:'0.002',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}label={<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>I want ShipHype to process returns for me.</Text> } />

      <FormControlLabel value="3" color="default" control={<Radio color="primary"/>}  label= {<Text style={{ fontSize: '12px',
           // fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>I want ShipHype to ship back my returns to me and I will process them myself.</Text> }/>
       
      </RadioGroup>
    </FormControl>
        
         </Grid> 
         
       
       </Grid>
       </form>
                    </View>
                    )
                }
              })()}

<Grid  justify="flex-end"
            container 
            spacing={24} >
            
            <Grid item>
        
     <ColorButton
    size='large'
    variant="contained"
    color="primary"
   // disabled={checkA}
    className={classes.profileMargin}
    onClick={()=>{handleClickSet()}}>
   Save
  </ColorButton>
       </Grid>
       </Grid>


        </View>
    );
  }
