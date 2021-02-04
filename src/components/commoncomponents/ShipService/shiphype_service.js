//export const BASE_URL='http://3.20.18.207/api/';
export const BASE_URL='https://api.shiphype.com/api/';
//export const BASE_URL='https://preptest.shiphype.com/api/';
import axios from 'axios';

/**
 * Description:To do fetch shiphype warehouse
 */
export function fetchWarehouse(userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'Warehouse/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:To do fetch shiphype warehouse
 */
export function fetchShipingType() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };
    return fetch(BASE_URL+'Shipping/FetchType', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
/**
 *  Description:To do fetch shiphype options
 * @param {*} userid 
 */
export function fetchOptions(userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'Option/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function fetchimagelogobyid(integrationid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({integrationid})
    };
    return fetch(BASE_URL+'Integration/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function requestCustomeIntegration(subject,integrationname,website,additionalnotes) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({subject,integrationname,website,additionalnotes})
    };
    return fetch(BASE_URL+'Email/Send', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:To do fetch ship hype step
 */
export function fetchShipHypeStatus() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };
    return fetch(BASE_URL+'Step/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:To do fetch complete step status by userid
 * @param {*} userid 
 */
export function fetchStepCompleteStatus(userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'Step/FetchStatus', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:To do add user step done so far
 * @param {*} userid 
 */
export function addUserStepDoneSofar(userid,shiphypesubsubstepId,shiphypesubstepId,shiphypestepId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid,shiphypesubsubstepId,shiphypesubstepId,shiphypestepId})
    };
    return fetch(BASE_URL+'Step/AddStatus', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:Add user intwgration
 * @param {*} integration_id 
 * @param {*} user_id 
 */
export function addUserIntegration(integration_id,user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({integration_id,user_id})
    };
    return fetch(BASE_URL+'Integration/AddUserIntegration', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:Add user options
 * @param {*} optionId 
 * @param {*} user_id 
 */
export function addUserOptions(optionid,userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({optionid,userid})
    };
    return fetch(BASE_URL+'Option/AddUserOption', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:Add user options
 * @param {*} ShipementPolicyId 
 * @param {*} user_id 
 */
export function addShipemntPolicy(integrationspolicies_id,user_id,warehouseid,shipmenttype,sourceid,shippingserviceid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({integrationspolicies_id,user_id,warehouseid,shipmenttype,sourceid,shippingserviceid})
    };
    return fetch(BASE_URL+'Shipping/AddUserPolicies', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:Add user options
 * @param {*} addCarrier 
 * @param {*} user_id 
 */
export function addCarrier(carrierservice_id,user_id,warehouse_id,shippingtypeid,integrationpolicy_id ) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({carrierservice_id,user_id,warehouse_id,shippingtypeid,integrationpolicy_id })
    };
    return fetch(BASE_URL+'Carrier/AddUserCarrier', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:Add user warehouse
 * @param {*} warehouseId 
 * @param {*} user_id 
 */
export function addUserWarehouse(warehouseid,userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({warehouseid,userid})
    };
    return fetch(BASE_URL+'Warehouse/AddUserWarehouse', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:Add user carrier
 */
export function fetchCarriers(user_id,warehouse_id,shippingtypeid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id,warehouse_id,shippingtypeid})
    };
    return fetch(BASE_URL+'Carrier/FetchServices', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:Add user ship policy
 */
export function fetchShipPolicy(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'Shipping/FetchPolicies', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:Add user ship policy
 */
export function fetchShipPolicyOrder(user_id,order) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id,order})
    };
    return fetch(BASE_URL+'Shipping/FetchPolicies', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:To do fecth user integration
 * @param {*} user_id 
 */
export function fetchUserIntegration(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'Integration/FetchUserIntegration', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


/**
 * Description:To do fetch product list
 * @param {*} userid 
 */
export function fetchProductList(userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'Product/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:To do fetch product list
 * @param {*} userid 
 */
export function updateProductSerialNumber(serialnovalue_update) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({serialnovalue_update})
    };
    return fetch(BASE_URL+'Product/Update_serialnovalue', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function fetchProductList1(userid,warehouseid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid,warehouseid})
    };
    return fetch(BASE_URL+'Product/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:To do add new product
 * @param {*} productsku 
 * @param {*} productname 
 * @param {*} domesticshipping 
 * @param {*} internationalshipping 
 * @param {*} dangerousgoods 
 * @param {*} hscode 
 * @param {*} itemvalue 
 * @param {*} itemcurrency 
 * @param {*} packaging 
 * @param {*} userid 
 */
export function addProduct(productsku,productname,domesticshipping,internationalshipping,
    dangerousgoods,hscode,itemvalue,itemcurrency,itemquantity,packaging,userid,promotionalpackaging,warehouseid,isprocess,serialno) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({productsku,productname,domesticshipping,internationalshipping,dangerousgoods,hscode,itemvalue,
            itemcurrency,itemquantity,packaging,userid,promotionalpackaging,warehouseid,isprocess,serialno})
    };
    return fetch(BASE_URL+'Product/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function addProduct1(productsku,productname,domesticshipping,internationalshipping,
    dangerousgoods,hscode,itemvalue,itemcurrency,itemquantity,packaging,userid,torontostock,losangelesstock) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({productsku,productname,domesticshipping,internationalshipping,dangerousgoods,hscode,itemvalue,itemcurrency,itemquantity,packaging,userid,torontostock,losangelesstock})
    };
    return fetch(BASE_URL+'Product/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function addProductManually(productsku,productname,internationalshipping,
    dangerousgoods,hscode,itemvalue,itemcurrency,packaging,userid,promotionalpackaging,torontostock,losangelesstock) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({productsku,productname,internationalshipping,
            dangerousgoods,hscode,itemvalue,itemcurrency,packaging,userid,promotionalpackaging,torontostock,losangelesstock})
    };
    return fetch(BASE_URL+'Product/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
/**
 * Description:to do update product
 * @param {*} customproduct_id 
 * @param {*} productsku 
 * @param {*} productname 
 * @param {*} domesticshipping 
 * @param {*} internationalshipping 
 * @param {*} dangerousgoods 
 * @param {*} hscode 
 * @param {*} itemvalue 
 * @param {*} itemcurrency 
 * @param {*} packaging 
 * @param {*} userid 
 */
export function updateProduct(customproduct_id,productsku,productname,domesticshipping,internationalshipping,dangerousgoods,
    hscode,itemvalue,itemcurrency,itemquantity,packaging,userid,promotionalpackaging,warehouseid,isprocess,serialno) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({customproduct_id,productsku,productname,domesticshipping,internationalshipping,dangerousgoods,hscode,
            itemvalue,itemcurrency,itemquantity,packaging,userid,promotionalpackaging,warehouseid,isprocess,serialno})
    };
    return fetch(BASE_URL+'Product/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function updateProduct1(customproduct_id,productsku,productname,domesticshipping,internationalshipping,
    dangerousgoods,hscode,itemvalue,itemcurrency,itemquantity,packaging,userid,torontostock,losangelesstock,
    shiphypeSKU,promotionalpackaging,isprocess,serialno) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({customproduct_id,productsku,productname,domesticshipping,
            internationalshipping,dangerousgoods,hscode,itemvalue,itemcurrency,itemquantity,
            packaging,userid,torontostock,losangelesstock,shiphypeSKU,promotionalpackaging,isprocess,serialno})
    };
    return fetch(BASE_URL+'Product/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function deleteProduct(customproduct_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({customproduct_id})
    };
    return fetch(BASE_URL+'Product/Delete', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function returnSettingFormFill(userid,returnsettingid,name,frequency,shipfrom,shipto,address1,address2,city,state,zipcode,country,telephone,email) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid,returnsettingid,name,frequency,shipfrom,shipto,address1,address2,city,state,zipcode,country,telephone,email})
    };
    return fetch(BASE_URL+'ReturnSetting/AddUser', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function fetchUserFormDetails(userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'ReturnSetting/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function returnSettingFormFillUpdate(userreturndetailId,userid,returnsettingid,name,frequency,shipfrom,shipto,address1,address2,city,state,zipcode,country,telephone,email) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userreturndetailId,userid,returnsettingid,name,frequency,shipfrom,shipto,address1,address2,city,state,zipcode,country,telephone,email})
    };
    return fetch(BASE_URL+'ReturnSetting/Updateuser', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function chooseUserStep(userid,returnsettingid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid,returnsettingid})
    };
    return fetch(BASE_URL+'ReturnSetting/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


/**
 * Description:To do fetch product list
 * @param {*} userid 
 */
export function fetchCustomePaching(userid,packaggingtypeid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid,packaggingtypeid})
    };
    return fetch(BASE_URL+'Packaging/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
/**
 * Description:To do fetch product list
 * @param {*} userid 
 */
export function fetchCustomePachingAsc(userid,packaggingtypeid,ascending) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid,packaggingtypeid,ascending})
    };
    return fetch(BASE_URL+'Packaging/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


/**
 * Description:To do add new product
 * @param {*} packaggingname 
 * @param {*} assignsku 
 * @param {*} packaggingtypeid 
 * @param {*} userid 
 */
export function addCustomePacking(assignsku,packaggingname,packaggingtypeid,userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({assignsku,packaggingname,packaggingtypeid,userid})
    };
    return fetch(BASE_URL+'Packaging/Insert', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function addCustomePacking1(assignsku,packaggingname,packaggingtypeid,torontostock,losangelesstock,userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({assignsku,packaggingname,packaggingtypeid,torontostock,losangelesstock,userid})
    };
    return fetch(BASE_URL+'Packaging/Insert', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * 
 * @param {*} packagging_id 
 */
export function deleteCustomePacking(packagging_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({packagging_id})
    };
    return fetch(BASE_URL+'Packaging/Delete', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * 
 * @param {*} packagging_id 
 * @param {*} assignsku 
 * @param {*} packaggingname 
 * @param {*} packaggingtypeid 
 * @param {*} userid 
 */
export function updatePackageing(packagging_id,assignsku,packaggingname,packaggingtypeid,userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({packagging_id,assignsku,packaggingname,packaggingtypeid,userid})
    };
    return fetch(BASE_URL+'Packaging/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updatePackageing1(packagging_id,assignsku,packaggingname,packaggingtypeid,torontostock,losangelesstock,userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({packagging_id,assignsku,packaggingname,packaggingtypeid,torontostock,losangelesstock,userid})
    };
    return fetch(BASE_URL+'Packaging/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


/**
 * 
 * 
 */
export function fetchFixedAddress(userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'ReturnSetting/FetchReturnType', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function addNewCustomer(userId,firstname,lastname,companyname,addressline1,addressline2,city,state,zip,country,phone,email,customertype) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId,firstname,lastname,companyname,addressline1,addressline2,city,state,zip,country,phone,email,customertype})
    };
    return fetch(BASE_URL+'Customer/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}






export function updateExistsCustomer(customerid,firstname,lastname,companyname,addressline1,addressline2,city,state,zip,country,phone,email,customertype) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({customerid,firstname,lastname,companyname,addressline1,addressline2,city,state,zip,country,phone,email,customertype})
    };
    return fetch(BASE_URL+'Customer/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchCustomerList(userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'Customer/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function deleteCustomer(customerId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({customerId})
    };
    return fetch(BASE_URL+'Customer/Delete', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function fetchOrderStatus() {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
    };
    return fetch(BASE_URL+'Order/FetchOrderStatus', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchCourierTypeList(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'Carrier/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchCustomerTypeList(userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'Customer/FetchCustomerType', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


/**
 * Description:To do fetch product list
 * @param {*} userid 
 */
export function fetchOderType() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };
    return fetch(BASE_URL+'Order/FetchOrderType', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function updateUserDataName(name,userid,returnsettingid1) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name,userid,returnsettingid1})
    };
    return fetch(BASE_URL+'ReturnSetting/UpdateReturnType', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function addOrder(source,orderType,recipientname,ordercountry,shippingcourier
    ,orderStatus,orderDate,customertype,orderkind,customer_id,shippingpolicy_id,user_id,option_id,
    dangerousgoods,extrabubble,insuranceoption,productIds,invoicetype,packagetype,shippinglabeldocnameid,shippinglabeldocname,
    packaginslipdocnameid,packaginslipdocname,invoicetypedocnameid,invoicetypedocname,shipmenttype,warehouseid,productquantity,shippinglabelid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({source,orderType,recipientname,ordercountry,shippingcourier
            ,orderStatus,orderDate,customertype,orderkind,customer_id,shippingpolicy_id,user_id,option_id,
            dangerousgoods,extrabubble,insuranceoption,productIds,invoicetype,packagetype,shippinglabeldocnameid,shippinglabeldocname,
            packaginslipdocnameid,packaginslipdocname,invoicetypedocnameid,invoicetypedocname,shipmenttype,warehouseid,productquantity,shippinglabelid})
    };
    return fetch(BASE_URL+'Order/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchOrderDetails(internalorder_id,user_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({internalorder_id,user_id})
    };
    return fetch(BASE_URL+'Order/FetchOrder', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updateOrder(internalorder_id,source,orderType,recipientname,ordercountry,shippingcourier
    ,orderStatus,orderDate,shipDate,customertype,orderkind,customer_id,shippingpolicy_id,user_id,option_id,
    dangerousgoods,extrabubble,insuranceoption,productIds,invoicetype,packagetype,shippinglabeldocnameid,shippinglabeldocname,
    packaginslipdocnameid,packaginslipdocname,invoicetypedocnameid,invoicetypedocname,shipmenttype,warehouseid,productquantity,courierid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({internalorder_id,source,orderType,recipientname,ordercountry,shippingcourier
            ,orderStatus,orderDate,shipDate,customertype,orderkind,customer_id,shippingpolicy_id,user_id,option_id,
            dangerousgoods,extrabubble,insuranceoption,productIds,invoicetype,packagetype,shippinglabeldocnameid,shippinglabeldocname,
            packaginslipdocnameid,packaginslipdocname,invoicetypedocnameid,invoicetypedocname,shipmenttype,warehouseid,productquantity,courierid})
    };
    return fetch(BASE_URL+'Order/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function updateOrderTracking(internalorder_id,externalorder_id,source,orderType,recipientname,ordercountry,shippingcourier
    ,orderStatus,orderDate,shipDate,customertype,orderkind,customer_id,shippingpolicy_id,user_id,option_id,
    dangerousgoods,extrabubble,insuranceoption,tracking,courierid,shippingpolicy,shipmenttype,code,storename,externaluniqueid,tracking_company
    ,tracking_url,warehouseid,refreshcode,trackingservice,trackingshipDate) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({internalorder_id,externalorder_id,source,orderType,recipientname,ordercountry,shippingcourier
            ,orderStatus,orderDate,shipDate,customertype,orderkind,customer_id,shippingpolicy_id,user_id,option_id,
            dangerousgoods,extrabubble,insuranceoption,tracking,courierid,shippingpolicy,shipmenttype,code,storename,externaluniqueid,
            tracking_company
            ,tracking_url,warehouseid,refreshcode,trackingservice,trackingshipDate})
    };
    return fetch(BASE_URL+'Order/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function updateManualTracking(internalorder_id,externalorder_id,source,orderType,recipientname,ordercountry,shippingcourier
    ,orderStatus,orderDate,shipDate,customertype,orderkind,customer_id,shippingpolicy_id,user_id,option_id,
    dangerousgoods,extrabubble,insuranceoption,tracking,shippingpolicy,shipmenttype,code,storename,externaluniqueid,warehouseid,
    tracking_company,refreshcode, consumerkey,
    consumersecret) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({internalorder_id,externalorder_id,source,orderType,recipientname,ordercountry,shippingcourier
            ,orderStatus,orderDate,shipDate,customertype,orderkind,customer_id,shippingpolicy_id,user_id,option_id,
            dangerousgoods,extrabubble,insuranceoption,tracking,shippingpolicy,shipmenttype,code,storename,
            externaluniqueid,warehouseid,tracking_company,refreshcode, consumerkey,
            consumersecret})
    };
    return fetch(BASE_URL+'Order/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function deleteOrder(internalorder_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({internalorder_id})
    };
    return fetch(BASE_URL+'Order/Delete', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function fetchOrderList(user_id,orderstatus) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id,orderstatus})
    };
    return fetch(BASE_URL+'Order/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchOrderListReturn(user_id,orderstatus,adminfetch) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id,orderstatus,adminfetch})
    };
    return fetch(BASE_URL+'Order/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchOrderListOfLastWeek() {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
    };
    return fetch(BASE_URL+'Order/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updateOrderStatus(internalorder_id,orderstatus) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({internalorder_id,orderstatus})
    };
    return fetch(BASE_URL+'Order/StatusUpdate', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchB2BCustomer(userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'Customer/FetchCustomerType', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
/**
 * Description:To do call add customer type
 * @param {*} customertypeid 
 * @param {*} userid 
 */
export function addB2BCustomerType(customertypeid,userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({customertypeid,userid})
    };
    return fetch(BASE_URL+'Customer/AddCustomerType', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function updateB2BCustomerType(customertypeid,userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({customertypeid,userid})
    };
    return fetch(BASE_URL+'Customer/UpdateCustomerType', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function sendSpecailRequest(shippingId,requestRelatedTo,requestDescription) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({shippingId,requestRelatedTo,requestDescription})
    };
    return fetch(BASE_URL+'Email/SpecialRequest', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function sendSpecailRequestFromUser(user_id,requestRelatedTo,requestDescription) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id,requestRelatedTo,requestDescription})
    };
    return fetch(BASE_URL+'Email/SpecialRequest', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchSpecilRequest(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'Email/FetchSpecialRequest', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function addArrangeShip(userid,productIds,shippedquantity,shippingFromName,shippingTowarehouseId,trackingNumber,
    shipingDate,shippingCarrier,checked,shippingstatus,packagingtypeid,packagingid,promotionalinserts,packagingquantity,
    promotionalinsertsquantity,newcarriername,shipper,labeltype,shipmentpackaging,shipmenttype,qtybox) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid,productIds,shippedquantity,shippingFromName,shippingTowarehouseId,
            trackingNumber,shipingDate,shippingCarrier,checked,shippingstatus,packagingtypeid,packagingid,
            promotionalinserts,packagingquantity,promotionalinsertsquantity,newcarriername,shipper,labeltype,shipmentpackaging,shipmenttype,qtybox})
    };
    return fetch(BASE_URL+'Shipping/AddOwnShipping', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function addArrangeShip2(userid,productIds,shippedquantity,shippingFromName,shippingfromattn,addressline1,addressline2,
    zipcode,city,state,country,pickuptimefrom,telephone,shippingTowarehouseId,shipingDate,noofpackages,
    length,width,height,packageweight,unit,pickuprequired,tailgaterequired,checked,shippingstatus,packagingtypeid,
    packagingid,promotionalinserts,packagingquantity,dimension,promotionalinsertsquantity,shipper,labeltype,shipmentpackaging,shipmenttype) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid,productIds,shippedquantity,shippingFromName,shippingfromattn,addressline1,addressline2,
            zipcode,city,state,country,pickuptimefrom,telephone,shippingTowarehouseId,shipingDate,noofpackages,
            length,width,height,packageweight,unit,pickuprequired,tailgaterequired,checked,shippingstatus,packagingtypeid,
            packagingid,promotionalinserts,packagingquantity,dimension,promotionalinsertsquantity,shipper,labeltype,shipmentpackaging,shipmenttype})
    };
    return fetch(BASE_URL+'Shipping/AddOwnShipping', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function updateArrangeShip2(shippingId,shippingFromName,shippingTowarehouseId,shipingDate,productIds,
    shippedquantity,shippingfromattn,addressline1,addressline2,zipcode,city,state,country,pickuptimefrom,telephone,
    noofpackages,length,width,height,packageweight,unit,pickuprequired,tailgaterequired,checked,packagingtypeid,
    packagingid,promotionalinserts,packagingquantity,dimension,promotionalinsertsquantity,shipper,labeltype,shipmentpackaging,shipmenttype) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({shippingId,shippingFromName,shippingTowarehouseId,shipingDate,productIds,
            shippedquantity,shippingfromattn,addressline1,addressline2,zipcode,city,state,country,pickuptimefrom,
            telephone,noofpackages,length,width,height,packageweight,unit,pickuprequired,tailgaterequired,checked,
            packagingtypeid,packagingid,promotionalinserts,packagingquantity,dimension,promotionalinsertsquantity,shipper,labeltype,shipmentpackaging,shipmenttype})
    };
    return fetch(BASE_URL+'Shipping/UpdateOwnShipping', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updateArrangeShip(shippingId,productIds,shippedquantity,shippingFromName,shippingTowarehouseId,
    trackingNumber,shipingDate,shippingCarrier,checked,packagingtypeid,packagingid,promotionalinserts,packagingquantity,
    promotionalinsertsquantity,newcarriername,shipper,labeltype,shipmentpackaging,shipmenttype,qtybox) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({shippingId,productIds,shippedquantity,shippingFromName,shippingTowarehouseId,
            trackingNumber,shipingDate,shippingCarrier,checked,packagingtypeid,packagingid,
            promotionalinserts,packagingquantity,promotionalinsertsquantity,newcarriername,shipper,labeltype,shipmentpackaging,shipmenttype,qtybox})
    };
    return fetch(BASE_URL+'Shipping/UpdateOwnShipping', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updateShipingWarehouse(shippingId,shippingFromName,shippingTowarehouseId,shipingDate) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({shippingId,shippingFromName,shippingTowarehouseId,shipingDate})
    };
    return fetch(BASE_URL+'Shipping/UpdateOwnShipping', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function fetchArrangeShip(shippingId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({shippingId})
    };
    return fetch(BASE_URL+'Shipping/FetchOwnShipping', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function fetchAllShip(user_id,wareshouse_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id,wareshouse_id})
    };
    return fetch(BASE_URL+'Shipping/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchAllShipmentInfo(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'Shipping/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchProductListOfLastWeek(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'Shipping/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function fetchUserInfo() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };
    return fetch(BASE_URL+'User/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchShipmentProductList(shippingid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({shippingid})
    };
    return fetch(BASE_URL+'AdminProduct/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function addCreditCard(cardholdername,cardnumber,expiredate,cvvnumber,userid,defaultcard,nonce,currency) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({cardholdername,cardnumber,expiredate,cvvnumber,userid,defaultcard,nonce,currency})
    };
    return fetch(BASE_URL+'CreditCard/Save', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updateCreditCard(customercard_id,cardholdername,cardnumber,expiredate,cvvnumber,defaultcard,userid,currency) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({customercard_id,cardholdername,cardnumber,expiredate,cvvnumber,defaultcard,userid,currency})
    };
    return fetch(BASE_URL+'CreditCard/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function fetchCreditCard(userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'CreditCard/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function deleteCreditCard(customercard_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({customercard_id})
    };
    return fetch(BASE_URL+'CreditCard/Delete', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function updateShipingQuantity(productIds,type) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({productIds,type})
    };
    return fetch(BASE_URL+'Shipping/UpdateShippedQuantity', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function sendHelp(yourname,youremail,subject,message,userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({yourname,youremail,subject,message,userid})
    };
    return fetch(BASE_URL+'Email/Help', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function fetchHelpMeag(userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'Email/FetchHelpRequest', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function addPlan(user_id,plan_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id,plan_id})
    };
    return fetch(BASE_URL+'Plan/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchplanbyid(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'Plan/FetchUserPlan', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updatePlan(userplan_id,user_id,plan_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userplan_id,user_id,plan_id})
    };
    return fetch(BASE_URL+'Plan/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


/**
 * Description:To do fetch shiphype warehouse
 */
export function fetchOrderSetting(userId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId})
    };
    return fetch(BASE_URL+'OrderSetting/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:To do fetch shiphype warehouse
 */
export function addOrderSetting(selectcutofftime,canadawarehouse,nopackingslips,addpackingslipinside,addpackingslipoutside,addpackingslipinsideOutside,
    addinvoiceinside,addinvoiceoutside,addinvoiceinsideOutside,fragileExtrabubblebag,
    shippinginsurance,enableinsurance,disableinsurance,customertype,userId,signature) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({selectcutofftime,canadawarehouse,nopackingslips,addpackingslipinside,addpackingslipoutside,addpackingslipinsideOutside,
            addinvoiceinside,addinvoiceoutside,addinvoiceinsideOutside,fragileExtrabubblebag,
            shippinginsurance,enableinsurance,disableinsurance,customertype,userId,signature})
    };
    return fetch(BASE_URL+'OrderSetting/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updateOrderSetting(userordersetting_id,selectcutofftime,canadawarehouse,nopackingslips,addpackingslipinside,addpackingslipoutside,addpackingslipinsideOutside,
    addinvoiceinside,addinvoiceoutside,addinvoiceinsideOutside,fragileExtrabubblebag,
    shippinginsurance,enableinsurance,disableinsurance,customertype,userId,signature) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userordersetting_id,selectcutofftime,canadawarehouse,nopackingslips,addpackingslipinside,addpackingslipoutside,addpackingslipinsideOutside,
            addinvoiceinside,addinvoiceoutside,addinvoiceinsideOutside,fragileExtrabubblebag,
            shippinginsurance,enableinsurance,disableinsurance,customertype,userId,signature})
    };
    return fetch(BASE_URL+'OrderSetting/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchOrderCount(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'Order/Count', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function deleteProductFromShipemnt(shippingproduct) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({shippingproduct})
    };
    return fetch(BASE_URL+'AdminProduct/Relatedshippingupdate', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updateStatus(shippingId,shippingstatus) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({shippingId,shippingstatus})
    };
    return fetch(BASE_URL+'Shipping/UpdateStatus', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function updateProductShipment(shippingproduct) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({shippingproduct})
    };
    return fetch(BASE_URL+'AdminProduct/Relatedshippingupdate', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updatePromotionalShipment(shippingpromotionalinsert) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({shippingpromotionalinsert})
    };
    return fetch(BASE_URL+'AdminProduct/Relatedshippingupdate', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updateCustomShipment(shippingpackaging) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({shippingpackaging})
    };
    return fetch(BASE_URL+'AdminProduct/Relatedshippingupdate', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function searchUserdetails(find) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({find})
    };
    return fetch(BASE_URL+'Order/Search', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

export function AddOrderReson(orderid,reason,status,userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({orderid,reason,status,userid})
    };
    return fetch(BASE_URL+'Orderstatusrequest/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

export function UpdateOrderReson(orderid,reason,status,userid,orderstatusrequest_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({orderid,reason,status,userid,orderstatusrequest_id})
    };
    return fetch(BASE_URL+'Orderstatusrequest/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

export function updateShipingWarehouseId(shippingid,shippingtowarehouseid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({shippingid,shippingtowarehouseid})
    };
    return fetch(BASE_URL+'Shipping/Updateshippingtowarehouseid', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

export function fetchOrderStuatus(shippingid,shippingtowarehouseid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({shippingid,shippingtowarehouseid})
    };
    return fetch(BASE_URL+'Shipping/Updateshippingtowarehouseid', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 


export function fetchUserDetail(userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'User/FetchDetails', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function removeIntegration(user_id,integration_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id,integration_id})
    };
    return fetch(BASE_URL+'Integration/RemoveUserIntegration', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchsingleOrderData(internalorder_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({internalorder_id})
    };
    return fetch(BASE_URL+'Order/FetchOrder', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function uploadInvoiceData(data) {
    
    axios.post(BASE_URL+'Upload/Invoice', data)
        .then(function (response) {
            return response;
     });

    
  //    axios.post('https://api.shiphype.com/api/Upload/Invoice', formData)
  //    .then(function (response) {
  // // this.setState({ imageURL: `http://localhost:8000/${body.file}`, uploadStatus: true });
  //    })
  //    .catch(function (error) {
  //      console.log(error);
  //    });

    


    // const requestOptions = {
    //     method: 'POST',

    //     headers: {
    //         // Accept: "multipart/form-data",
    //     'Content-Type': 'multipart/form-data',
    //     //    'Accept': '*/*',
    //     // //    'Authorization': 
    //     // //    "Bearer "+(JSON.parse(sessionStorage.getItem('token')).token),
    //     // //    'Access-Control-Allow-Origin': this.apiURL,
    //     //    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //     //    'Access-Control-Allow-Headers': 'origin,X-Requested-With,content-type,accept',
    //     //    'Access-Control-Allow-Credentials': 'true' 
    //      //   'Authorization': 'Bearer ' + this.authService.getToken()
    //     },
    //     body: JSON.stringify({data})
    // };
    // return fetch(BASE_URL+'Upload/Invoice', requestOptions)
    //     .then((response) => response.json())
    //     .then(response => {
    //         return response;
    //     });
}

export function ebayIntegration(authorizationcodevalue,integration_id,user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({authorizationcodevalue,integration_id,user_id})
    };
    return fetch(BASE_URL+'EbayInregration/CreateToken', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function getebayOrder(token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({token})
    };
    return fetch(BASE_URL+'EbayInregration/GetOrder', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function getebayProduct(token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({token})
    };
    return fetch(BASE_URL+'EbayInregration/GetProduct', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchOrderOverview(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'Order/FetchOrderOverview', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function addNewCustomeWarehouse(userid,companyname,warehousename,address1,address2,city,state,postalcode,country,telephone,email) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid,companyname,warehousename,address1,address2,city,state,postalcode,country,telephone,email})
    };
    return fetch(BASE_URL+'Warehouse/AddCustomwarehouse', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:To do update shipping warehouse from one to another
 * @param {*} shippingid 
 * @param {*} newshippingtowarehouseid 
 */
export function updateSHippingWarehouse(shippingid,newshippingtowarehouseid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({shippingid,newshippingtowarehouseid})
    };
    return fetch(BASE_URL+'Warehouse/Changemasterwarehouse', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function AddShipemntReson(shipmentid,userid,reason,status) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({shipmentid,userid,reason,status})
    };
    return fetch(BASE_URL+'ShipmentStatusrequest/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

export function AddSubscriptionData(custompackaging,promotionalinserts,productIds,sku,title,description,quantity,user_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({custompackaging,promotionalinserts,productIds,sku,title,description,quantity,user_id})
    };
    return fetch(BASE_URL+'SubscriptionBox/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

export function fetchSubscriptionBoxData(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'SubscriptionBox/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

export function updateSubscriptionShortData(subscriptionbox_id,sku,quantity,title,description,user_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({subscriptionbox_id,sku,quantity,title,description,user_id})
    };
    return fetch(BASE_URL+'SubscriptionBox/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

export function UpdateSubscriptionData(subscriptionbox_id,custompackaging,promotionalinserts,productIds,sku,title,description,quantity,user_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({subscriptionbox_id,custompackaging,promotionalinserts,productIds,sku,title,description,quantity,user_id})
    };
    return fetch(BASE_URL+'SubscriptionBox/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 



export function sendUpsIntegrationShipments(shipperPhoneNumber,shipperAddressLine,shipperCity,shipperStateProvinceCode,
    shipperPostalCode,shipperCountryCode,shipperName,shipperAttentionName,shipperTaxIdentificationNumber,shipperNumber,
    shipToNumber,shipToAddressLine,shipToCity,shipToStateProvinceCode,shipToPostalCode,shipToCountryCode,shipToCountryName,
    shipToName,shipToAttentionName,shipToFaxNumber,shipToTaxIdentificationNumber,shipFromNumber,shipFromAddressLine,shipFromCity,
    shipFromStateProvinceCode,shipFromPostalCode,shipFromCountryCode,shipFromCountryName,shipFromName,shipFromAttentionName,
    shipFromFaxNumber,shipFromTaxIdentificationNumber,accountNumber,type,code,description,shippingPackage,negotiatedRatesIndicator,
    serviceDescription,itemizedChargesRequestedIndicator,ratingMethodRequestedIndicator,taxInformationIndicator,labelImageFormatCode,
    couriertype,order_id
    ,packageLength,packageWidth,packageHeight) {
     const requestOptions = {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({shipperPhoneNumber,shipperAddressLine,shipperCity,shipperStateProvinceCode,shipperPostalCode,shipperCountryCode,shipperName,shipperAttentionName,shipperTaxIdentificationNumber,shipperNumber,shipToNumber,shipToAddressLine,shipToCity,shipToStateProvinceCode,shipToPostalCode,shipToCountryCode,shipToCountryName,shipToName,shipToAttentionName,shipToFaxNumber,shipToTaxIdentificationNumber,shipFromNumber,shipFromAddressLine,shipFromCity,shipFromStateProvinceCode,shipFromPostalCode,shipFromCountryCode,shipFromCountryName,shipFromName,shipFromAttentionName,shipFromFaxNumber,shipFromTaxIdentificationNumber,accountNumber,type,code,description,shippingPackage,negotiatedRatesIndicator,serviceDescription,itemizedChargesRequestedIndicator,ratingMethodRequestedIndicator,taxInformationIndicator,labelImageFormatCode,couriertype,order_id,packageLength,packageWidth,packageHeight})
     };
     return fetch(BASE_URL+'AllCourier/CreateShipments', requestOptions)
         .then((response) => response.json())
         .then(response => {
             return response;
         });
 }
 

export function createAffiliateCode(userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'AffiliateCode/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 


export function editAffiliateCode(userid,affiliatecode,earningtodate) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid,affiliatecode,earningtodate})
    };
    return fetch(BASE_URL+'AffiliateCode/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

export function fetchAffiliateCode(userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'AffiliateCode/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

/**
 * Description:To add request work order
 * @param {*} userid 
 * @param {*} fullinventorycount 
 * @param {*} qualitycontrol 
 * @param {*} repackagingproducts 
 * @param {*} baggingproducts 
 * @param {*} anyothergenerictask 
 * @param {*} comments 
 */
export function addRequestWorkOrder(userid,fullinventorycount,commentsfullinventorycount,qualitycontrol,commentsqualitycontrolnts,repackagingproducts,commentsrepackagingproducts,baggingproducts,commentsbaggingproducts,anyothergenerictask,commentsanyothergenerictask,priority) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid,fullinventorycount,commentsfullinventorycount,qualitycontrol,commentsqualitycontrolnts,repackagingproducts,commentsrepackagingproducts,baggingproducts,commentsbaggingproducts,anyothergenerictask,commentsanyothergenerictask,priority})
    };
    return fetch(BASE_URL+'Email/AddRequestWorkOrder', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

/**
 * Description:To do update request work order
 * @param {*} requestworkorder_id 
 * @param {*} userid 
 * @param {*} fullinventorycount 
 * @param {*} qualitycontrol 
 * @param {*} repackagingproducts 
 * @param {*} baggingproducts 
 * @param {*} anyothergenerictask 
 * @param {*} comments 
 */
export function updateRequestWorkOrder(requestworkorder_id,userid,fullinventorycount,commentsfullinventorycount,qualitycontrol,commentsqualitycontrolnts,repackagingproducts,commentsrepackagingproducts,baggingproducts,commentsbaggingproducts,anyothergenerictask,commentsanyothergenerictask) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({requestworkorder_id,userid,fullinventorycount,commentsfullinventorycount,qualitycontrol,commentsqualitycontrolnts,repackagingproducts,commentsrepackagingproducts,baggingproducts,commentsbaggingproducts,anyothergenerictask,commentsanyothergenerictask})
    };
    return fetch(BASE_URL+'Email/UpdateRequestWorkOrder', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

/**
 * Description:To do fetch request work order
 * @param {*} userid 
 */
export function fetchRequestWorkOrder(userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'Email/FetchRequestWorkOrder', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

 
export function updateUserDetails(userid,usernicename,useremail,useraddressline,usercity,userstatecode,usercountrycode,userpincode,userphonenumber,bussinessname,bussinessdescription,bussinesswebsite,positionincompany) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid,usernicename,useremail,useraddressline,usercity,userstatecode,usercountrycode,userpincode,userphonenumber,bussinessname,bussinessdescription,bussinesswebsite,positionincompany})
    };
    return fetch(BASE_URL+'User/Updatedetails', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

export function addCarrierSetting(warehouseID,shippingPloicyID,carrierID,shipmenttype,user_id,source,servicetype) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({warehouseID,shippingPloicyID,carrierID,shipmenttype,user_id,source,servicetype})
    };
    return fetch(BASE_URL+'CarrierSetting/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 
export function updateCarrierSetting(carriersetting_id,warehouseID,shippingPloicyID,carrierID,shipmenttype,user_id,source,servicetype) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({carriersetting_id,warehouseID,shippingPloicyID,carrierID,shipmenttype,user_id,source,servicetype})
    };
    return fetch(BASE_URL+'CarrierSetting/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 
export function fetchCarrierSetting(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'CarrierSetting/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}



export function addMarketSetting(userid,marketplace,isenable,time) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid,marketplace,isenable,time})
    };
    return fetch(BASE_URL+'MarketPlaceSetting/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updateMarketSetting(marketplacesetting_id,userid,marketplace,isenable,time) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({marketplacesetting_id,userid,marketplace,isenable,time})
    };
    return fetch(BASE_URL+'MarketPlaceSetting/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function fetchMarketSetting(userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'MarketPlaceSetting/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function sendSquareNonce(userid,nonce) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid,nonce})
    };
    return fetch(BASE_URL+'MarketPlaceSetting/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}



export function fetchShopfyProduct(code,storename) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code,storename }),
    };
    return fetch(BASE_URL + "Shopify/FetchProduct", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  export function fetchShopfyOrder(code,storename,created_at_min,created_at_max) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code,storename,created_at_min,created_at_max}),
    };
    return fetch(BASE_URL + "Shopify/FetchOrder", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  export function fetchShopfyCustomer(code,storename) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code,storename }),
    };
    return fetch(BASE_URL + "Shopify/FetchCustomer", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  export function sendShopfydetail(userid,integrationid,appname,apikey,apipass) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userid,integrationid,appname,apikey,apipass}),
    };
    return fetch(BASE_URL + "Shopify/Add", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  export function getShopfydetails(userid,integrationid) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid ,integrationid}),
    };
    return fetch(BASE_URL + "Shopify/Fetch", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }


  export function addImportOrder(
    externalorder_id,
    source,
    orderstatus,
    orderdate,
    shipdate,
    user_id,
    customer_id,
    shippingcourier,
    ordertype,
    customertype,
    productIds
  ) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        externalorder_id,
        source,
        orderstatus,
        orderdate,
        shipdate,
        user_id,
        customer_id,
        shippingcourier,
        ordertype,
        customertype,
        productIds,
      }),
    };
    return fetch(BASE_URL + "Order/Add", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  export function addProductShopfy(
    productsku,
    productname,
    domesticshipping,
    internationalshipping,
    dangerousgoods,
    hscode,
    itemvalue,
    itemcurrency,
    itemquantity,
    packaging,
    userid,
    externalproduct_id
  ) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productsku,
        productname,
        domesticshipping,
        internationalshipping,
        dangerousgoods,
        hscode,
        itemvalue,
        itemcurrency,
        itemquantity,
        packaging,
        userid,
        externalproduct_id,
      }),
    };
    return fetch(BASE_URL + "Product/Add", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  export function createSquareupCustomer(
    given_name,
    family_name,
    email_address,
    phone_number,
    reference_id,
    note,
    customercardid
  ) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        given_name,
        family_name,
        email_address,
        phone_number,
        reference_id,
        note,
        customercardid,
      }),
    };
    return fetch(BASE_URL + "Sqaureup/CreateCustomer", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  export function createSquareupCustomerCard(
    card_nonce,
    customer_id,
    customercardid
  ) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ card_nonce, customer_id, customercardid }),
    };
    return fetch(BASE_URL + "Sqaureup/CreateCustomerCard", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  export function createTransactionList() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };
    return fetch(BASE_URL + "Sqaureup/TransactionList", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  
  export function fetchCurrenTotalamount(userid) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userid}),
    };
    return fetch(BASE_URL + "Sqaureup/fetchCurrenTotalamount", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  export function squareupPayment(
    idempotency_key,
    amount_money,
    source_id,
    customer_id,
    autocomplete,
    reference_id,
    note,
    app_fee_money,
    user_id
  ) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idempotency_key,
        amount_money,
        source_id,
        customer_id,
        autocomplete,
        reference_id,
        note,
        app_fee_money,
        user_id,
      }),
    };
    return fetch(BASE_URL + "Sqaureup/Payment", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }


  export function fetchUserDetails(userid) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userid}),
    };
    return fetch(BASE_URL + "User/FetchDetails", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }

  export function fetchWoocommerceProduct(consumerkey, consumersecret, websitename) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consumerkey, consumersecret, websitename }),
    };
    return fetch(BASE_URL + "WooCommerce/FetchProduct", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  export function fetchWoocommerceOrder(consumerkey, consumersecret, websitename) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consumerkey, consumersecret, websitename }),
    };
    return fetch(BASE_URL + "WooCommerce/FetchWooCommerceOrder", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  export function fetchWoocommerceCustomer(consumerkey, consumersecret, websitename) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consumerkey, consumersecret, websitename }),
    };
    return fetch(BASE_URL + "WooCommerce/FetchWooCommerceCustomer", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  
  export function deleteIntegrationProduct(externalproduct_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({externalproduct_id})
    };
    return fetch(BASE_URL+'Product/Delete', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
  export function deleteIntegrationCustomer(externalcustomer_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({externalcustomer_id})
    };
    return fetch(BASE_URL+'Customer/Delete', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function deleteIntegrationOrder(externalorder_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({externalorder_id})
    };
    return fetch(BASE_URL+'Order/Delete', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function addNewCustomerShopfy(userId,firstname,lastname,companyname,addressline1,addressline2,city,state,zip,country,phone,email,customertype,externalcustomer_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId,firstname,lastname,companyname,addressline1,addressline2,city,state,zip,country,phone,email,customertype,externalcustomer_id})
    };
    return fetch(BASE_URL+'Customer/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


  export function addTransferInvenrotyWarehouse(user_id, transferfrom, transferto,date) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, transferfrom, transferto,date }),
    };
    return fetch(BASE_URL + "TransferInventoryRequest/Add", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  

  export function fetchTransferInvenroty(user_id) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id}),
    };
    return fetch(BASE_URL + "TransferInventoryRequest/Fetch", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }


  export function updateStatusForHelp(userid,helpmailid,yourname,youremail,subject,message,status,admincomments) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userid,helpmailid,yourname,youremail,subject,message,status,admincomments}),
    };
    return fetch(BASE_URL + "Email/UpdateHelp", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  
  

  export function updateStatusForREequest(userid,requestworkorder_id,type,comments,typenavigation,status_openclosed,admincomments,usertype) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userid,requestworkorder_id,type,comments,typenavigation,status_openclosed,admincomments,usertype}),
    };
    return fetch(BASE_URL + "Email/UpdateRequestWorkOrder", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
  }
  
  
  
  export function fetchShippingPloicy(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'Shipping/FetchUserPolicies', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updateShipemntPolicy(userintegrationpolicyId,integrationspolicies_id,user_id,warehouseid,shipmenttype,sourceid,shippingserviceid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userintegrationpolicyId,integrationspolicies_id,user_id,warehouseid,shipmenttype,sourceid,shippingserviceid})
    };
    return fetch(BASE_URL+'Shipping/UpdateUserPolicies', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

/**
 * Description:To do update shipping warehouse from one to another
 * @param {*} shippingid 
 * @param {*} newshippingtowarehouseid 
 */
export function updateSHippingProject(productid,itemquantity,newwarehouseid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({productid,itemquantity,newwarehouseid})
    };
    return fetch(BASE_URL+'Warehouse/Updateproductwarehouseid', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchOrderCharges(userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'ShiphypePriceList/FetchOrderCharges', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function createOrderPayment(orderid,orderpermo) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({orderid,orderpermo})
    };
    return fetch(BASE_URL+'ShiphypePriceList/CalculateCharges', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function doPayment(amount_money,source_id,customer_id,autocomplete,reference_id,note,user_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({amount_money,source_id,customer_id,autocomplete,reference_id,note,user_id})
    };
    return fetch(BASE_URL+'Sqaureup/Payment', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updateOrderServices(orderid,servicename,othercharge) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({orderid,servicename,othercharge})
    };
    return fetch(BASE_URL+'ShiphypePriceList/UpdateCalculateCharges', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchOrderServices(orderid,orderpermo) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({orderid,orderpermo})
    };
    return fetch(BASE_URL+'ShiphypePriceList/CalculateCharges', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function createShipmentPayment(shippingid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({shippingid})
    };
    return fetch(BASE_URL+'ShiphypePriceList/ShippingCharges', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchShipmentCharges(userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'ShiphypePriceList/FetchshipmentCharges', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function updateShipmentServices(shippingid,servicename,othercharge) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({shippingid,servicename,othercharge})
    };
    return fetch(BASE_URL+'ShiphypePriceList/UpdateShippingCharges', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function transactionHistory() {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
    };
    return fetch(BASE_URL+'Sqaureup/TransactionList', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function uploadProductSheet(excelsheetrows,userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({excelsheetrows,userid})
    };
    return fetch(BASE_URL+'Excelsheet/UploadProductExcelsheet', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function calculateRate(rate) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({rate})
    };
    return fetch(BASE_URL+'Rate/Rating', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function paymentdueAdd(user_id,description,amount,status) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id,description,amount,status})
    };
    return fetch(BASE_URL+'DuePayment/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchduePayment(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'DuePayment/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function sentShipmentRequest(ship) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ship})
    };
    return fetch(BASE_URL+'Rate/Ship', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function uploadOrderSheet(excelsheetrows,userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({excelsheetrows,userid})
    };
    return fetch(BASE_URL+'Excelsheet/UploadOrdertExcelsheet', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function uploadCustomerSheet(excelsheetrows,userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({excelsheetrows,userid})
    };
    return fetch(BASE_URL+'Excelsheet/UploadCustomertExcelsheet', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function updateDuePayment(duePaymentid,user_id,description,amount,status) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({duePaymentid,user_id,description,amount,status})
    };
    return fetch(BASE_URL+'DuePayment/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function cancelRequestParcel(cancel) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cancel})
    };
    return fetch(BASE_URL+'Rate/CancelRequest', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function getEbayProduct(token,startdatetime,enddatetime,entriesperpage) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token,startdatetime,enddatetime,entriesperpage})
    };
    return fetch(BASE_URL+'EbayInregration/GetProducts', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function shopfyIntegrationToken(code,storename,user_id,integration_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({code,storename,user_id,integration_id})
    };
    return fetch(BASE_URL+'Shopify/Token', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function WixIntegrationToken(code,user_id,integration_id,storename) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({code,user_id,integration_id,storename})
    };
    return fetch(BASE_URL+'Wix/Token', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function getEbayOrder(token,startdatetime,enddatetime) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token,startdatetime,enddatetime})
    };
    return fetch(BASE_URL+'EbayInregration/GetOrders', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function addBulkOrder(insertOrderDetailsProxy) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({insertOrderDetailsProxy})
    };
    return fetch(BASE_URL+'Order/BulkImport', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function createOrderIntegration(externalorder_id,
    externaluniqueid,
    source,
    ordertype,
    recipientname,
    ordercountry,
    tracking,
    shippingcourier,
    orderstatus,
    orderdate,
    customertype,
    orderkind,
    shippingpolicy_id,
    user_id,
    option_id,
    dangerousgoods,
    warehouseid,
    customer,
    product,skus,
    productIds,
    productquantity
    ) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({externalorder_id,
            externaluniqueid,
            source,
            ordertype,
            recipientname,
            ordercountry,
            tracking,
            shippingcourier,
            orderstatus,
            orderdate,
            customertype,
            orderkind,
            shippingpolicy_id,
            user_id,
            option_id,
            dangerousgoods,
            warehouseid,
            customer,
            product,skus,
            productIds,
            productquantity})
    };
    return fetch(BASE_URL+'Order/AddOrderDetails', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function paymentDeduct(userid,amount,description) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({userid,amount,description})
    };
    return fetch(BASE_URL+'Sqaureup/Deductamount', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function paymentHistory(userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'Sqaureup/fetchcurrenttransaction', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function paymentDeductUpdate(currenttransaction_id,userid,transact,description) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({currenttransaction_id,userid,transact,description})
    };
    return fetch(BASE_URL+'Sqaureup/Updateamount', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function sellerPaymentdetails(userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'Sqaureup/fetchCurrenTotalamount', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchShippingCalculator(userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'Sqaureup/FetchShippingcalulatorsetting', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function addShippingCalculator(parcelprofitmargin_percentage,parcelprofitmargin,userid) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({parcelprofitmargin_percentage,parcelprofitmargin,userid})
    };
    return fetch(BASE_URL+'Sqaureup/AddShippingcalulatorsetting', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function updateShippingCalculator(shippingcalculatorsetting_id,userid,parcelprofitmargin_percentage,parcelprofitmargin) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({shippingcalculatorsetting_id,userid,parcelprofitmargin_percentage,parcelprofitmargin})
    };
    return fetch(BASE_URL+'Sqaureup/UpdateShippingcalulatorsetting', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function add30MinutesSYnc(isactive,userintegration_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({isactive,userintegration_id})
    };
    return fetch(BASE_URL+'Integration/Sync', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}


export function addenabledisable(userid,isfulfillment) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({userid,isfulfillment})
    };
    return fetch(BASE_URL+'User/UpdateFulfillment', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function checkShopifyIntegration(user_id,integration_id,storename) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({user_id,integration_id,storename})
    };
    return fetch(BASE_URL+'Integration/ExistCheck', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}




export function squareSpaceIntegration(code,user_id,integration_id,storename) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({code,user_id,integration_id,storename})
    };
    return fetch(BASE_URL+'SquareSpace/Token', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function addReturnOrder(returncondition,tracking,fromname,recievedate,warehouseid,carrierid,productIds,productquantity,assignsellerid,orderstatus,uploadphoto) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({returncondition,tracking,fromname,recievedate,warehouseid,carrierid,productIds,productquantity,assignsellerid,orderstatus,uploadphoto})
    };
    return fetch(BASE_URL+'Order/AddReturnOrder', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchreturnorder(user_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id})
    };
    return fetch(BASE_URL+'Order/Fetchreturnorder', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function CheckSkuExist(productsku,productname) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({productsku,productname})
    };
    return fetch(BASE_URL+'Product/productCheck', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

export function ReplytoReturnOrder(internalorder_id,comment) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({internalorder_id,comment})
    };
    return fetch(BASE_URL+'Order/UpdateComment', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
} 

export function sendFeedback(userid,comment) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid,comment})
    };
    return fetch(BASE_URL+'Email/FeedBack', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchFeedback(userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
    };
    return fetch(BASE_URL+'Email/FetchFeedBack', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function addpolicyrestrication(orderdestination,shippingfrom,importdata,userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({orderdestination,shippingfrom,importdata,userid})
    };
    return fetch(BASE_URL+'UserShipingPolicies/Add', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function updatepolicyrestrication(usershipingpoliciesid,orderdestination,shippingfrom,importdata,userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({usershipingpoliciesid,orderdestination,shippingfrom,importdata,userid})
    };
    return fetch(BASE_URL+'UserShipingPolicies/Update', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function fetchrestrication(userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
    return fetch(BASE_URL+'UserShipingPolicies/Fetch', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
export function removerestrication(usershipingpoliciesid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({usershipingpoliciesid})
    };
    return fetch(BASE_URL+'UserShipingPolicies/Remove', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function fetchchat(requestworkorder_id) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({requestworkorder_id})
    };
    return fetch(BASE_URL+'Email/FetchChatHistory', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}

export function wocommerceToken(userid,appname) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid,appname})
    };
    return fetch(BASE_URL+'WooCommerce/UpdateIntegration', requestOptions)
        .then((response) => response.json())
        .then(response => {
            return response;
        });
}
