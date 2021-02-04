import {AsyncStorage} from 'react-native';


/**
 * Description:To do Store data for later use dynamically
 * @param {*} key 
 * @param {*} value 
 */
 export const storeData = async (key, value) =>{
    try {
      await AsyncStorage.setItem(key, value);

    } catch (e) {
      console.log(e);
    }
  }


  /**
   * Description:To do get stored data for later use
   * @param {*} key 
   */
export const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
          console.log("retrive",value);
        return value;
      }
    } catch (error) {
      
    } 
  }

  