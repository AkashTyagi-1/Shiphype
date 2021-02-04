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

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
/**For Style */
import validate from 'validate.js';
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
  
//   address2:{
//   presence: { allowEmpty: false, message: 'is required' },
 
//   length: {
//     maximum: 64
//   }
//  },

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
//  country:{
//   presence: { allowEmpty: false, message: 'is required' },
 
//   length: {
//     maximum: 64
//   }

//  },
 phone:{
  presence: { allowEmpty: false, message: 'is required' },
 
  length: {
    maximum: 10
  }

 },
 
//  length:{
//   presence: { allowEmpty: false, message: 'is required' },
 
 
//  },
//  hieght:{
//   presence: { allowEmpty: false, message: 'is required' },
 
  

//  },
//  width:{
//   presence: { allowEmpty: false, message: 'is required' },
 
 

//  },
 packagePalletsWeight:{
  presence: { allowEmpty: false, message: 'is required' },
 
 

 },

};
const unitsPick=[
  {
    id: 1,
    label: 'Ib',
  },
  {
    id: 2,
    label: 'kg',
  },
]
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

const CountryName = [
    
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




const packagePalletes = [
    
  {
    id: 1,
    label: '1',
  },
  {
    id: 2,
    label: '2',
  },
  {
    id: 3,
    label: '3',
  },
   {
    id: 4,
    label: '4',
  },
  {
    id: 5,
    label: '5',
  },
  {
    id: 6,
    label: '6',
  },
  {
    id: 7,
    label: '7',
  },
  {
    id: 8,
    label: '8',
  },
  {
    id: 9,
    label: '9',
  },
  {
    id: 10,
    label: '10',
  },
  {
    id: 11,
    label: '11',
  },
  {
    id: 12,
    label: '12',
  },
  {
    id: 13,
    label: '13',
  },
  {
    id: 14,
    label: '14',
  },
  {
    id: 15,
    label: '15',
  },
  {
    id: 16,
    label: '16',
  },
  {
    id: 17,
    label: '17',
  },
  {
    id: 18,
    label: '18',
  },
  {
    id: 19,
    label: '19',
  },
  {
    id: 20,
    label: '20',
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
      width:'170px',
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
 
  /**
   * Description:To do show step of task
   */
  function getSteps() {
    return ['Marketplace Integration', 'Shipping Profile', 'Product Import','Product Sync','Import Customers'];
  }

/**
 * Description:This function is used for Slide17
 * @param {*} props 
 */
export default function Slide17(props) {
  
   const classes = useStyles();
   const [carrierId, setSetCarrierId] = React.useState('');
   const [tailgateValue, setTailgateValue] = React.useState('0');
   const [packingPallet, setPackingPallet] = React.useState('0');
   const [pickupRequired, setPickupRequired] = React.useState('');
   const [unitRequired, setUnitRequired] = React.useState('0');
   const [shipTimeDate, setShipTimeDate] = React.useState('0');
   //const {openAddCustomerManually}= props;
   const openPromotionalID =props.openPromotionalID;
   const shipmentIds=props.shipmentId;
   const requestRelatedTo=props.requestRelatedTo;
   const promotionalQuantity=props.promotionalQuantity;
   const packagingQuantity=props.packagingQuantity;
const requestDescription=props.requestDescription;
const selectwarehouse=props.selectwarehouse;
const [shipmentId1, setShipemntId1] = React.useState(0);
const productIds=props.changedWarehouseid;
const shipmentId11=props.shipmentId1;
const shippedQuantity=props.shippedQuantity;
const openPackageTypeID=props.openPackageTypeID;
const openPackageID=props.openPackageID;
   const userid=props.user_id;
   const[shipData,setShipData]=React.useState([]);
   const [loading,setLoading]=React.useState(true);
   const [open, setOpen]=React.useState(false);
   const [msg,setMsg]=React.useState('');
   const [type,setType]=React.useState('');
   const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
   const [selectedpickDate, setSelectedpickDate] = React.useState(new Date());
   const [startsprint,setStartsprint]=React.useState(0);
   const [editArrangeShip,setEditArrangeShip]=React.useState(0);
   const [status,setStatus]=React.useState(false);
  const[orderCouierType,setOrderCourierType]=React.useState([]);
  const[countryName,setChangeCountry]=React.useState(0);
  const [formState, setFormState] =useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [lengthwidthHeight, setLengthWidthH] = useState([{ length: 0 ,width :0,height:0}]);
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
   const handleChange1 = event => {
    setSetCarrierId(event.target.value);
  };
  const handleChangeTailgate = event => {
    setTailgateValue(event.target.value);
  };
  const handleChangeCountry = event => {
    setChangeCountry(event.target.value);
  };

  function handleChange9(i, event) {
   
  
   
    const values = [...lengthwidthHeight];
    values[i].length = event.target.value;
  
    setLengthWidthH(values);
      
  }
  function handleChange10(i, event) {
   
  
   
    const values = [...lengthwidthHeight];
    values[i].width = event.target.value;
  
    setLengthWidthH(values);
      
  }
  function handleChange11(i, event) {
   
  
   
    const values = [...lengthwidthHeight];
    values[i].height = event.target.value;
  
    setLengthWidthH(values);
      
  }


  const handleChangePackingPallete = event => {
    setLengthWidthH(0);
    const valueLengthWidthHeight=[...lengthwidthHeight];
    for(var i=0;valueLengthWidthHeight.length!==0;i++)
    {
     valueLengthWidthHeight.pop({ length: 0 ,width :0,height:0});
    }
   for(var i=0;i<parseInt(event.target.value);i++)
   {
    valueLengthWidthHeight.push({ length: 0 ,width :0,height:0});
   }
  
    setLengthWidthH(valueLengthWidthHeight);
    
    setPackingPallet(event.target.value);
  };
  const handleChangePickup = event => {
    setPickupRequired(event.target.value);
  };
  const handleChangeUnit = event => {
    setUnitRequired(event.target.value);
  };
  const handleChangeShipDateTime = event => {
    setShipTimeDate(event.target.value);
  };
   const handleStartDateChange = (date,value) => {
    setStartsprint(value);
    setSelectedStartDate(date);
    console.log("startdate",value);

  };

  const handleStartDateChangePick = (date,value) => {
    //setStartsprint(value);
    setSelectedpickDate(date);
    console.log("startdate",value);

  };
  const handleCallbackfunction1 =()=>{
    props.backButtonRouting('SepacilaRequest9');
  }
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
  
  var date = new Date();
  // to add 4 days to current date
  
  date.setDate(date.getDate() + 3);
  setSelectedStartDate(date);
  } ,[]);
 
  React.useEffect(() => {
       console.log("selectwarehouse",selectwarehouse);    
    fetchCourierTypeList(userid);  
    if(shipmentIds !== 0){
      fetchArrangeShip(shipmentIds);
    } 
    if(shipmentId11!==0)
    {
      fetchArrangeShip(shipmentId11);
    }
   
 } ,[]);

 const handleCallbackfunction =()=>{
  props.backButtonRouting(7);
}
  const fetchArrangeShip = (shipmentIds)=>{

    //  const userid=5;
      setLoading(true);
      shiphypeservice.fetchArrangeShip(shipmentIds)
      .then(response => {
       console.log("status",response.status);
            if(response.status === true) {
              setLoading(false);
                 setShipData(response.data);
                 if(response.data.length !== 0)
                 {
                  setEditArrangeShip(1);
                 }
                
                 bindData(response.data[0].shipping,response.data[0].shipmentdimension);
                 
                       }else{
                        setLoading(false);
                        console.log("message",response.message);
                       }   
          }).catch((error) =>{
                console.error(error);
          });
    }


  const bindData = (data1,data)=>{
    console.log("bind call",data1);
    
  
   
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,shipFrom: data1[0].shippingfromname,
          checkFrom:false
        },
        touched:{
          ...formState.touched,
          shipFrom : true
        }
       }));
    
       setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,shipFromAttn: data1[0].shippingfromattn,
          checkFrom : false
        },
        touched:{
          ...formState.touched,
          shipFromAttn : true
        }
       }));
    
       setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,address1: data1[0].addressline1,
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
          ...formState.values,address2: data1[0].addressline2,
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
          ...formState.values,city: data1[0].city,
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
          ...formState.values,state: data1[0].state,
          checkFrom:false
        },
        touched:{
          ...formState.touched,
          state : true
        }
       }));
      
      //  setFormState(formState => ({
      //   ...formState,
      //   values: {
      //     ...formState.values,country: data1[0].country,
      //     checkFrom:false
      //   },
      //   touched:{
      //     ...formState.touched,
      //     country : true
      //   }
      //  })); 
       setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,phone: data1[0].telephone,
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
          ...formState.values,zipCode: data1[0].zipcode,
          checkFrom:false
        },
        touched:{
          ...formState.touched,
          zipCode : true
        }
       })); 


      //  setFormState(formState => ({
      //   ...formState,
      //   values: {
      //     ...formState.values,packagePallets: data[0].noofpackages,
      //     checkFrom:false
      //   },
      //   touched:{
      //     ...formState.touched,
      //     packagePallets : true
      //   }
      //  })); 
      setPackingPallet(data[0].noofpackages);
      const valueLengthWidthHeight=[...lengthwidthHeight];
      for(var i=0;valueLengthWidthHeight.length!==0;i++)
    {
     valueLengthWidthHeight.pop({ length: 0 ,width :0,height:0});
    }
   for(var i=0;i<parseInt(data.length);i++)
   {
     
    valueLengthWidthHeight.push({ length: data[i].length ,width : data[i].width,height: data[i].height});
   }
   setLengthWidthH(valueLengthWidthHeight);

       setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,packagePalletsWeight: data[0].packageweight,
          checkFrom:false
        },
        touched:{
          ...formState.touched,
          packagePalletsWeight : true
        }
       })); 

       setChangeCountry(data1[0].country);
       setSelectedStartDate(data1[0].shipingdate);
       setTailgateValue(data[0].tailgaterequired);
       setSelectedpickDate(data[0].pickuprequired);
       setUnitRequired(data[0].unit);
       setShipTimeDate(data1[0].pickuptimefrom);

    }
    const addArrangeShip =()=>{
        setLoading(true);
        if(editArrangeShip ===0)
        {
         const shippingFromName=formState.values.shipFrom;
         const shippingfromattn=formState.values.shipFromAttn;
         const addressline1=formState.values.address1;
         const addressline2=formState.values.address2;
         const zipcode=formState.values.zipCode;
         const city=formState.values.city;
         const state=formState.values.state;
         const country=countryName;
         const telephone=formState.values.phone;  
         const noofpackages=packingPallet;
         const length=formState.values.length;
         const height=formState.values.hieght;
         const width=formState.values.width;
         const packageweight=parseInt(formState.values.packagePalletsWeight);

         const tailgaterequired=tailgateValue;
        
         const shipingDate=selectedpickDate;
        // const pickuprequired=pickupRequired;
         const pickuprequired=selectedpickDate;
         const unit=unitRequired;
//const carrierIds=carrierId;
         const pickuptimefrom=shipTimeDate;
         //props.inventoryLocation
      //props.inventoryPackgingType
      //props.inventoryShipemntType
      //props.inventoryLabel
        shiphypeservice.addArrangeShip2(userid,productIds,shippedQuantity,shippingFromName,shippingfromattn,addressline1,addressline2,
          zipcode,city,state,country,pickuptimefrom,telephone,selectwarehouse,shipingDate,noofpackages,
          length,width,height,packageweight,unit,pickuprequired,tailgaterequired,1,'New Shipment',openPackageTypeID,openPackageID,openPromotionalID,packagingQuantity,lengthwidthHeight,promotionalQuantity,
          props.inventoryLocation,
          props.inventoryPackgingType,
          props.inventoryShipemntType,
          props.inventoryLabel)
          
              .then(response => {
               console.log("status",response.status);
                    if(response.status === true) {
                      setOpen(true);
                          setType('success');
                          setMsg(response.message);
                          setStatus(response.status);
                          setLoading(false);
                         // sentSpecialRequest(response.data);
                         setShipemntId1(response.data);
                         addStepStatus(response.data);
                         AsyncStorage.removeItem("ProductSelect");
                   AsyncStorage.removeItem("CustomPackges");
                   AsyncStorage.removeItem("SelectPromotional");
                               }else{
                          setOpen(true);
                          setType('error');
                          setMsg(response.message);
                          setStatus(response.status);
                          setLoading(false);
                          console.log("message",response.message);
                          AsyncStorage.removeItem("ProductSelect");
                   AsyncStorage.removeItem("CustomPackges");
                   AsyncStorage.removeItem("SelectPromotional");
                               }   
                  }).catch((error) =>{
                        console.error(error);
                  });
                }
                else
                {
                  
                  const shippingFromName=formState.values.shipFrom;
                  const shippingfromattn=formState.values.shipFromAttn;
                  const addressline1=formState.values.address1;
                  const addressline2=formState.values.address2;
                  const zipcode=formState.values.zipCode;
                  const city=formState.values.city;
                  const state=formState.values.state;
                  const country=countryName;
                  const telephone=formState.values.phone;  
                  const noofpackages=packingPallet;
                  const length=formState.values.length;
                  const height=formState.values.hieght;
                  const width=formState.values.width;
                  const packageweight=parseInt(formState.values.packagePalletsWeight);
         
                  const tailgaterequired=tailgateValue;
                  const shipingDate=selectedpickDate;
                  const pickuprequired=selectedpickDate;
                  const unit=unitRequired;
        
                  const pickuptimefrom=shipTimeDate;
                  var shipmentIds12=0;
                  if(shipmentIds !== 0){
                    shipmentIds12=shipmentIds;
                  } 
                  if(shipmentId11!==0)
                  {
                    shipmentIds12=shipmentId11;
                  }

                  var ids3 = [];
                  if(productIds!==undefined)
                  {
                  for (let k = 0; k < productIds.length; k++) {
                    ids3.push(1);
                  }
                }
                
                  var ids5 = [];
                  if(openPackageID!==undefined)
                  {
                  for (let k = 0; k < openPackageID.length; k++) {
                    ids5.push(1);
                  }
                  }
                  var ids4 = [];
                  if(openPromotionalID!==undefined)
                  {
                    for (let k = 0; k < openPromotionalID.length; k++) {
                      ids4.push(1);
                    }
                  }
                  
                //    const selectedStartDate=format(selectedStartDate, "yyyy-MM-dd hh:mm:ss");
                //const shippingId=shipData[0].shippingId;
               // const productIdsarry=shipData[0].productid
               //props.inventoryLocation
      //props.inventoryPackgingType
      //props.inventoryShipemntType
      //props.inventoryLabel
       shiphypeservice.updateArrangeShip2(shipmentIds12,shippingFromName,selectwarehouse,shipingDate,productIds,ids3,shippingfromattn,addressline1,addressline2,zipcode,city,state,country,pickuptimefrom,telephone,noofpackages,length,width,height,
        packageweight,unit,pickuprequired,tailgaterequired,1,openPackageTypeID,openPackageID,openPromotionalID,ids5,lengthwidthHeight,ids4,
        props.inventoryLocation,
        props.inventoryPackgingType,
        props.inventoryShipemntType,
        props.inventoryLabel)
             .then(response => {
              console.log("status",response.status);
                   if(response.status === true) {
                    props.updateShipmentId();
                 //   props.handleNextPage('09');
               //  sentSpecialRequest();
                     setOpen(true);
                         setType('success');
                         setMsg(response.message);
                         setStatus(response.status);
                         setLoading(false);
                         addStepStatus(shipmentIds);
                         setShipemntId1(shipmentIds);
                         AsyncStorage.removeItem("ProductSelect");
                   AsyncStorage.removeItem("CustomPackges");
                   AsyncStorage.removeItem("SelectPromotional");
                              }else{
                         setOpen(true);
                         setType('error');
                         setMsg(response.message);
                         setStatus(response.status);
                         setLoading(false);
                         console.log("message",response.message);
                         AsyncStorage.removeItem("ProductSelect");
                   AsyncStorage.removeItem("CustomPackges");
                   AsyncStorage.removeItem("SelectPromotional");
                              }   
                 }).catch((error) =>{
                       console.error(error);
                 });
                }
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

const addStepStatus =(shipmentIds)=>{
  setLoading(true);
  
 // const userid=user_id;
  const shiphypesubsubstepId=0;
  const shiphypesubstepId=11;
  const shiphypestepId=0;
  shiphypeservice.addUserStepDoneSofar(userid,shiphypesubsubstepId,shiphypesubstepId,shiphypestepId)
        .then(response => {
         console.log("status",response.status);
              if(response.status === true) {
                setLoading(false);
                props.upadteShipID(shipmentIds);
                props.saveback('9');
                props.handleNextPage('SepacilaRequest');
                         }else{
                          setLoading(false);
                          console.log("message",response.message);
                         }   
            }).catch((error) =>{
                  console.error(error);
            });
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
 * Description:To do call function on back button
 * @param {*} isSprintCreate 
 */
const handlePreviousPage = (isSprintCreate) => {
  props.handlePreviousPage(isSprintCreate);
//props.handleNext(isSprintCreate);
} 
     
      
       
       
        
         
          const fetchCourierTypeList =(userid)=>{
            setLoading(true);
            shiphypeservice.fetchCourierTypeList(userid)
                  .then(response => {
                   console.log("status",response.status);
                        if(response.status === true) {
                          setLoading(false);
                          setOrderCourierType(response.data);
                                   }else{
                                    setLoading(false);
                                    console.log("message",response.message);
                                   }   
                      }).catch((error) =>{
                            console.error(error);
                      });
                    }
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
            <Text style={popUpStyle.breadCrundCss}> / SEND INVENTORY /</Text>
          <Text style={popUpStyle.breadCrundCss2}> ARRANGING SHIP {'\n'} </Text> 
          
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
         <View >
         <View style={popUpStyle.paddingSide}>
         {/* <Grid style={{marginLeft:'3px'},}>
         <Text 
           style={{
            fontSize: '13px',
            //fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
            marginTop:'10px',
            transition : 'all 0.25s',
           }}>Arranging ship
           </Text>  
         </Grid> */}

         <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={7} lg={7}>
            <Text style={{ fontSize: '15px',
            fontWeight: '700',
            // marginLeft:'10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',}}>
              
              Please provide the Pickup Address and Shipment Details for your shipment:</Text>
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
       {/* &nbsp;&nbsp;
              <ColorButton1
       size='large'
       variant="contained"
       color="primary"
      // className={classes.profileMargin}
       onClick={()=>{handleCallbackfunction1()}}
       >
          Next
       </ColorButton1> */}
    
              </Grid>
            
              </Grid>
            
              </Grid>
              </Grid>
         <form className={classes.form}>
         <Grid  justify="space-between" 
      container 
      spacing={2} >
         <Grid item xs={12} md={5} lg={6}   >

         <Grid item xs={8} >
       <Text 
           style={{
            fontSize: '13px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',
           }}>Pickup Address
           </Text>  
         </Grid>
         <Grid item xs={8}  style={{marginTop:'10px'}} >
    
         <TextField
           id="shipFrom"
           name='shipFrom'
           variant="outlined"
           fullWidth
           error={hasError('shipFrom')}
           helperText={
              hasError('shipFrom') ? formState.errors.shipFrom[0] : null
           }
           placeholder="Ship From"
           size='small'
           type="text"
           onChange={handleChange('shipFrom')}
           className={classes.profileMargin1}
           value={formState.values.shipFrom || ''}
         />
    
       </Grid>
       <Grid item xs={8} >
    
         <TextField
           id="shipFromAttn"
           name='shipFromAttn'
           variant="outlined"
           fullWidth
           error={hasError('shipFromAttn')}
           helperText={
              hasError('shipFromAttn') ? formState.errors.shipFromAttn[0] : null
           }
           placeholder="Ship From Attn."
           size='small'
           type="text"
           onChange={handleChange('shipFromAttn')}
           className={classes.profileMargin1}
           value={formState.values.shipFromAttn || ''}
         />
    
       </Grid>
       <Grid item xs={8} >
    
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
       <Grid item xs={8} >
    
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
       <Grid item xs={8} >
       <TextField
      id="zipCode"
      name='zipCode'
      variant="outlined"
      fullWidth
      error={hasError('zipCode')}
      helperText={
         hasError('zipCode') ? formState.errors.zipCode[0] : null
      }
      placeholder="Zip/Postal Code"
      size='small'
      type="text"
      onChange={handleChange('zipCode')}
      className={classes.profileMargin1}
      value={formState.values.zipCode || ''}
    />

       </Grid>


<Grid item xs={8}>

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

<Grid item xs={8}>

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

<Grid item xs={8}>
<TextField
          id="outlined-select-currency-native"
          select
          fullWidth
        //  label="Select Country"
          value={countryName}
          onChange={handleChangeCountry}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin1}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Country</option>
     
         {CountryName.map(option => (
         
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


       {/* <Grid item xs={8} >
       <Grid container justify="space-between">
     <Grid xs={3} >
     <TextField
      id="zipCode"
      name='zipCode'
      variant="outlined"
      fullWidth
      error={hasError('zipCode')}
      helperText={
         hasError('zipCode') ? formState.errors.zipCode[0] : null
      }
      label="Zip/Postal Code"
      size='small'
      type="text"
      onChange={handleChange('zipCode')}
      className={classes.profileMargin1}
      value={formState.values.zipCode || ''}
    />
     </Grid>
     <Grid xs={3} style={{marginLeft:'0px'}}>
     <TextField
      id="city"
      name='city'
      variant="outlined"
      fullWidth
      error={hasError('city')}
      helperText={
         hasError('city') ? formState.errors.city[0] : null
      }
      label="City"
      size='small'
      type="text"
      onChange={handleChange('city')}
      className={classes.profileMargin1}
      value={formState.values.city || ''}
    />
     </Grid>
    
</Grid>
  </Grid>
  <Grid item xs={12}  >
  <Grid  container justify="flex-start"
       >
     <Grid xs={4} >
     <TextField
      id="state"
      name='state'
      variant="outlined"
      fullWidth
      error={hasError('state')}
      helperText={
         hasError('state') ? formState.errors.state[0] : null
      }
      label="State/Province"
      size='small'
      type="text"
      onChange={handleChange('state')}
      className={classes.profileMargin1}
      value={formState.values.state || ''}
    />
     </Grid>
     <Grid xs={4} style={{marginLeft:'2px'}}>
     
     <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
          label="Select Country"
          value={countryName}
          onChange={handleChangeCountry}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin1}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Country</option>
     
         {CountryName.map(option => (
         
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
    </Grid>

  </Grid> */}
      
  
  <Grid item xs={8} >
    
  <TextField
           id="phone"
           name='phone'
           variant="outlined"
           fullWidth
           error={hasError('phone')}
           helperText={
             hasError('phone') ? formState.errors.phone[0] : null
           }
           placeholder="Tel"
           size='small'
           type="text"
           onChange={handleChange('phone')}
           className={classes.profileMargin1}
          
           value={formState.values.phone || ''}
         />
  </Grid>
  
         
       </Grid>
       <Grid item xs={12} md={5} lg={6} >
       <Grid item xs={8} >
       <Text 
           style={{
            fontSize: '13px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',
            color: '#001737',
          
            transition : 'all 0.25s',
           }}>Shipment Details
           </Text>  
         </Grid>
         

       <Grid item xs={8} style={{marginTop:'10px'}}>
    
       {/* <TextField
        id="packagePallets"
           name='packagePallets'
           variant="outlined"
       fullWidth
       label="# of Packages/Pallets"
       select
       
      
       value={packingPallet}
     
       size='small'
       className={classes.profileMargin1}
       onChange={handleChangePackingPallete}
     >
       {packagePalletes.map(option => (
         
         <option  style={{paddingLeft:'3%'}} 
          key={option.id} value={option.id}  
            >
           {option.label}
           </option>
       ))}
     </TextField>  */}

     <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
        //  label="# of Packages/Pallets"
          value={packingPallet}
          onChange={handleChangePackingPallete}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin1}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select # of Packages/Pallets </option>
     
         {packagePalletes.map(option => (
         
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
  {lengthwidthHeight.map((field, idx) => {
        return (
          <View key={`${field}-${idx}`}>
       
            {/* <TextField
              id="name"
              name="name"
              variant="outlined"
              fullWidth
              error={hasError('fullname')}
              helperText={
                hasError('fullname') ? field.errors.fullname[0] : null
              }
              placeholder={language.name}
              size='small'
              type="text"
              onChange={e => handleChange8(idx, e)}
              className={classes.profileMargin}
              InputProps={{ inputProps: { style: {  borderRadius: 0 }, }, style: { borderRadius: 0 }, }}
              value={formState.values.fullname}
            /> */}
       

       <Grid item xs={8}>
       <Grid  justify="space-between" // Add it here :)
      container 
       >
     <Grid lg={3} >
     <TextField
      id="length"
      name='length'
      variant="outlined"
      fullWidth
      // error={hasError('length')}
      // helperText={
      //    hasError('length') ? formState.errors.length[0] : null
      // }
      label="L"
      size='small'
      type="text"
    //  onChange={handleChange('length')}
    onChange={e => handleChange9(idx, e)}
      className={classes.profileMargin1}
      value={field.length}
    />
     </Grid>
     
     <Grid lg={3} >
     <TextField
      id="width"
      name='width'
      variant="outlined"
      fullWidth
      // error={hasError('width')}
      // helperText={
      //    hasError('width') ? formState.errors.width[0] : null
      // }
      label="W"
      size='small'
      type="text"
      //onChange={handleChange('width')}
      onChange={e => handleChange10(idx, e)}
      className={classes.profileMargin1}
      value={field.width}
    />
     </Grid>
     <Grid lg={3} >
     <TextField
      id="hieght"
      name='hieght'
      variant="outlined"
      fullWidth
      // error={hasError('hieght')}
      // helperText={
      //    hasError('hieght') ? formState.errors.hieght[0] : null
      // }
      label="H"
      size='small'
      type="text"
    //  onChange={handleChange('hieght')}
    onChange={e => handleChange11(idx, e)}
      className={classes.profileMargin1}
      value={field.height}
    />
     </Grid>
    
</Grid>
       </Grid>


        </View>
        );
      })}
     
       <Grid item xs={8} >
    
         <TextField
           id="packagePalletsWeight"
           name='packagePalletsWeight'
           variant="outlined"
           fullWidth
           error={hasError('packagePalletsWeight')}
           helperText={
              hasError('packagePalletsWeight') ? formState.errors.packagePalletsWeight[0] : null
           }
           placeholder="Weight"
           size='small'
           type="number"
           onChange={handleChange('packagePalletsWeight')}
           className={classes.profileMargin1}
           value={formState.values.packagePalletsWeight || ''}
         />
    
       </Grid>
      
  <Grid item xs={8} >
    
       {/* <TextField
        id="pickingTime"
        name="pickingTime"
        variant="outlined"
       fullWidth
       label="Unit"
       select
       
      // onChange={handleChange('timeZone')}
       value={unitRequired}
      //type="text"
     //  type="timeZone"
       size='small'
       className={classes.profileMargin1}
       onChange={handleChangeUnit}
     >
       <option value='0' disabled  style={{paddingLeft:'3%'}}>Select Option</option>
       {unitsPick.map(option => (
         
           <option  style={{paddingLeft:'3%'}} 
            key={option.id} value={option.id}  
              >
             {option.label}
             </option>
         ))}
     </TextField>  */}


     <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
        //  label="# of Packages/Pallets"
          value={unitRequired}
          onChange={handleChangeUnit}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin1}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select </option>
     
         {unitsPick.map(option => (
         
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
  <Grid item xs={8} >
  {/* <TextField
        id="pickingTime"
        name="pickingTime"
        variant="outlined"
       fullWidth
       label="Pickup Time"
       select
       
      // onChange={handleChange('timeZone')}
       value={shipTimeDate}
      //type="text"
     //  type="timeZone"
       size='small'
       className={classes.profileMargin1}
       onChange={handleChangeShipDateTime}
     >
       <option value='0' disabled  style={{paddingLeft:'3%'}}>Select Pickup time</option>
       {pickUPTime.map(option => (
         
           <option  style={{paddingLeft:'3%'}} 
            key={option.id} value={option.id}  
              >
             {option.label}
             </option>
         ))}
     </TextField>  */}
   
     <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
         // label="Pickup Time"
          value={shipTimeDate}
          onChange={handleChangeShipDateTime}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin1}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Pickup Time </option>
     
         {pickUPTime.map(option => (
         
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
  <Grid item xs={8} >
    
       {/* <TextField
        id="pickingTime"
        name="pickingTime"
        variant="outlined"
       fullWidth
       label="Tailgate Required"
       select
       
      // onChange={handleChange('timeZone')}
       value={tailgateValue}
      //type="text"
     //  type="timeZone"
       size='small'
       className={classes.profileMargin1}
       onChange={handleChangeTailgate}
     >
       <option value='0' disabled  style={{paddingLeft:'3%'}}>Select Option</option>
       {pickUP.map(option => (
         
         <option  style={{paddingLeft:'3%'}} 
          key={option.id} value={option.id}  
            >
           {option.label}
           </option>
       ))}
     </TextField>  */}


     <TextField
          id="outlined-select-currency-native"
          select
          fullWidth
         // label="Tailgate Required"
          value={tailgateValue}
          onChange={handleChangeTailgate}
          SelectProps={{
            native: true,
          }}
          size='small'
          type="text"
          className={classes.profileMargin1}
          style={{fontSize: '12px',
          //fontWeight: '700',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}
          variant="outlined"
        >
            <option value='0' disabled  style={{fontSize: '14px',
            //fontWeight: '700',
            paddingLeft:'15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter UI", Roboto, sans-serif',}}>Select Tailgate Required</option>
     
         {pickUP.map(option => (
         
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
  <Grid item xs={8} >
    
   

  <MuiPickersUtilsProvider utils={DateFnsUtils} customStyles={{
          dateInput: {
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
          }
      }}>
     
     <KeyboardDatePicker
         variant="outlined"
         format="yyyy-MM-dd"
         margin="normal"
         id="pickingTime"
         fullWidth
         disablePast={true}
         placeholder="Pickup Required"
         value={selectedpickDate}
         
         onChange={handleStartDateChangePick}
         KeyboardButtonProps={{
           'aria-label': 'change date',
         }}
      
       />  
   </MuiPickersUtilsProvider>
</Grid>


   <Grid container item xs={8} justify="flex-end">
            <Grid>
          <ColorButton
          size='large'
          variant="contained"
          color='primary'
          className={classes.profileMargin1}
          disabled={!formState.isValid}
          onClick={()=>{addArrangeShip()}}>
          {(editArrangeShip === 0 ? 'Submit Request' : 'Update')}    
        </ColorButton>
            </Grid>
          </Grid>
       </Grid>
       </Grid></form>

  {showToast(open,msg,type)}
        </View>
       
         
           </View>
        </View>
    );
  }
