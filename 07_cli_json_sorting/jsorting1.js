const axios = require('axios');

var urlarr=[
    'https://jsonbase.com/sls-team/json-793',
    'https://jsonbase.com/sls-team/json-955',
    'https://jsonbase.com/sls-team/json-231',
    'https://jsonbase.com/sls-team/json-931',
    'https://jsonbase.com/sls-team/json-93',
    'https://jsonbase.com/sls-team/json-342',
    'https://jsonbase.com/sls-team/json-770',
    'https://jsonbase.com/sls-team/json-491',
    'https://jsonbase.com/sls-team/json-281',
    'https://jsonbase.com/sls-team/json-718',
    'https://jsonbase.com/sls-team/json-310',
    'https://jsonbase.com/sls-team/json-806',
    'https://jsonbase.com/sls-team/json-469',
    'https://jsonbase.com/sls-team/json-258',
    'https://jsonbase.com/sls-team/json-516',
    'https://jsonbase.com/sls-team/json-79',
    'https://jsonbase.com/sls-team/json-706',
    'https://jsonbase.com/sls-team/json-521',
    'https://jsonbase.com/sls-team/json-350',
    'https://jsonbase.com/sls-team/json-64'
];

async function readLinks() {
    var trueValue=0;
    var falseValue=0;
    var failError=0;
    try {
      const links = urlarr;
  
      for (const link of links) {
        try{
        const response = await axios.get(link);
        
        const keyName = 'isDone';
        const result = findKeyPath(response.data, keyName);
        if (result) {
            
            const value = findValue(response.data, result);
            console.log(link,': isDone:', value);
            if(value){trueValue++}
                else {falseValue++};

          } else {
            console.log(`Key '${keyName}' not found in object`);
          };

            if ((trueValue+falseValue+failError)==links.length){
                console.log('Found True values:', trueValue,
                    '\nFound False values:', falseValue);
            }

      } catch (error) {
        console.error(`${link} The endpoint is unavailable`);
        failError++;}

    } 
    }
    catch (error) {
      console.error(error);
     
    }

  }
  
readLinks();


//find value by path
function findValue(obj, path) {
    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
      value = value[key];
      if (value === undefined) {
        return undefined;
      }
    }
    return value;
  }
  

//find out path to isDone
  function findKeyPath(obj, keyName, path = '') {
    const keys = Object.keys(obj);
  
    for (const key of keys) {
      const currentPath = path ? `${path}.${key}` : key;
  
      if (typeof obj[key] === 'object') {
        const result = findKeyPath(obj[key], keyName, currentPath);
        if (result) {
          return result;
        }
      } else if (key === keyName) {
        return currentPath;
      }
    }
  
    return null;
  }
  