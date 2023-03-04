const axios = require('axios');

const url = 'https://jsonbase.com/sls-team/vacations';

axios.get(url)
.then(response => {
  first=response.data;
  var copiedObject={};
  
 
  copiedObject = JSON.parse(JSON.stringify(first));
 
  for (let key in copiedObject) {
       
    delete copiedObject[key]._id;
    delete copiedObject[key].status;
    delete copiedObject[key].usedDays;
    copiedObject[key]._id=copiedObject[key].user._id;
    copiedObject[key].name=copiedObject[key].user.name;
   
    delete copiedObject[key].user;
   
    copiedObject[key].vacations=[];
    var a={};
    a.endDate=copiedObject[key].endDate,
    a.startDate=copiedObject[key].startDate;
    copiedObject[key].vacations.push(a);
   
    delete copiedObject[key].endDate;
    delete copiedObject[key].startDate;

  }

//delete duplicates with similar dates and id
var copiedObject2={};
copiedObject2 = JSON.parse(JSON.stringify(copiedObject));

for (let key in copiedObject){
  let i=0;
  for (let key1 in copiedObject2){
    
      if(JSON.stringify(copiedObject[key].vacations)==JSON.stringify(copiedObject2[key1].vacations) && copiedObject[key]._id==copiedObject2[key1]._id){
        if(i>0){
         copiedObject2.splice(key1, 1);
        }  
      i++;
}
}
}

//unique id
var uniqueO=[];
for (let key in copiedObject){
    uniqueO.push(copiedObject[key]._id);   
  }
uniqueO=new Set(uniqueO);

//replace records by unique id
//find a record in array by unique number
//find other records
//adds a data from them to first
for (let element of uniqueO){
  var b=[];
  var c=[];
  var d=[];
 
  let i=0;
    
    for (let key in copiedObject2){
     
      if (element==copiedObject2[key]._id){
                
        if(i>0){     
          
          c=JSON.stringify(copiedObject2[key].vacations);
          if(c!=b){
          d=[];
          d.push(b);
          d.push(c);
          
          var d1=d.toString();
          d1=d1.replace(/\],\[/g, ',');
                   
          var e=JSON.parse(d1);
          copiedObject2[key].vacations=e;
          
          b=JSON.stringify(copiedObject2[key].vacations);
                    
        }

        }
        else {
        b=JSON.stringify(copiedObject2[key].vacations);
        i++;
        
        }
      }
    }
  }

//delete objects with less numbers of vacations
for (let key in copiedObject2){
  for (let key1 in copiedObject2){
      if (copiedObject2[key]._id==copiedObject2[key1]._id){

        if(copiedObject2[key].vacations.length<copiedObject2[key1].vacations.length){
          copiedObject2.splice(key, 1);
        }
      }
  
  }

}

console.log('new objects', copiedObject2);

//delete object with similar id

})
.catch(error => {
  console.log(error);
});
