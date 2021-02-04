import React,{useState} from 'react';
import {SquarePaymentForm,
CreditCardNumberInput,
CreditCardExpirationDateInput,
CreditCardPostalCodeInput,
CreditCardCVVInput,
CreditCardSubmitButton
} from 'react-square-payment-form';

import 'react-square-payment-form/lib/default.css';
import * as shiphypeService from '../ShipService/shiphype_service';

export default function Square(props) {

    const userid=props.user_id;
const [state,setState]=useState({
errorMessages:[]
});

const [sandboxid,setSandboxid]=useState('sandbox-sq0idb-hmoozbQ4vBcRyaYtk8erXQ');


const cardNonceResponseReceived = (errors,nonce,cardData)=>{
    if(errors){
        setState({errorMessages:errors.map(error=>error.message)})
        return        
    }
    setState({errorMessages:[]});
    alert("nonce created: " + nonce);
    console.log("nonce",nonce);
    console.log("carddata",cardData);
}


const addSquarePaymnetMethod = () => {
    shiphypeService.sendSquareNonce(userid,nonce)
    .then(response => {
     console.log("status",response.status);
     if(response.status === true) {
        props.handleNextPage('billing');
         
               }else{
                
                console.log("message",response.message);
               }   
               
        }).catch((error) =>{
              console.error(error);
        }); 
  }; 


return (

   <div>

<h1>Payment Page</h1>

<SquarePaymentForm  
sandbox={true}
applicationId={sandboxid}
cardNonceResponseReceived={cardNonceResponseReceived}
>
<fieldset className="sq-fieldset">
<CreditCardNumberInput/>

<div className="sq-form-third">
    <CreditCardExpirationDateInput/>
</div>
<div className="sq-form-third">
    <CreditCardPostalCodeInput/>
</div>
<div className="sq-form-third">
    <CreditCardCVVInput/>
</div>

</fieldset>  

<CreditCardSubmitButton>
    Save
</CreditCardSubmitButton>
</SquarePaymentForm>
    </div>
  )
}

