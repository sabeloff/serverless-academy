var fs = require('fs');




sortingusers();

function sortingusers(){ 

for (let i=0; i<20; i++) {

   var nameFile='out'+i+'.txt';
 
    fs.readFile(nameFile, 'utf8', (err, data) => {
        if (err) {throw err;}   
        const dataArray = data.trim().split('\n');
        var uniqueArray=new Set(dataArray);
        const uniqueAll=Array.from(uniqueArray);
      
        fs.appendFile('myTemp.txt', JSON.stringify(uniqueAll), function (err) {
            if (err) {throw err;}
           
            });    
        
      });
    
    };

    fs.readFile('myTemp.txt', 'utf8', function (err, data) {
      if (err) {throw err;}
    
          
        const myarr=data.replace(/\]\[/g, ',');
        const myarr2 = myarr.split(',');
            
        const onlyUnique=new Set(myarr2);
        
        const count={};
    
          for (let index = 0; index < myarr2.length; index++) {
            count[myarr2[index]] = (count[myarr2[index]] || 0) + 1;
           
          }
           
         
        var num20=0;
        var num10=0;
    
        for (let property in count) {
    
          if(count[property]===20){ var num20=num20+1;  }
          if(count[property]===10){ var num10=num10+1;  }
        }
        
        if(onlyUnique.size>1){           
        
        console.log('Only unique usernames:',onlyUnique.size);    
        console.log('how many usernames occur in all 10 files:', num10);
        console.log('how many usernames occur in all 20 files:', num20);

        fs.truncate('myTemp.txt', 0, function() {
          
         });

            }

        else { sortingusers();};

    
    })  


  }
