const inquirer = require('inquirer');
var fs = require('fs');
const process = require('process');



survey();

function survey(){
  
inquirer.prompt([       
    {
        type: 'input',
        name: 'name',
        message: 'Enter your Name (to stop - press Enter)',              
    },

    {
      type: 'rawlist',
      name: 'gender',
      message: 'Enter your gender',
      choices:['male', 'female'],
      when: (answers) => answers.name != '',   
    },
    
    {
      type: 'input',
      name: 'age',
      message: 'Enter your age',
      when: (answers) => answers.name != '',
    },

    {
      type: 'confirm',
      name: 'search',
      message: 'Do you like to search a customer?',
      when: (answers) => answers.name === '',
    },
    {
      type: 'input',
      name: 'srchname',
      message: 'Type name of a customer?',
      when: (answers) => answers.name === '',
    },
  
    ])  

  .then(answers => {    
    

    if (!answers.search){
      
      const myJSON = JSON.stringify(answers);
    fs.appendFile('myDB.txt', myJSON , function (err) {
      if (err) throw err;

      survey();
      
    });}
    

    if (answers.search)
    {console.info('Let`s search!');  
    
    fs.readFile('myDB.txt', 'utf8', (err, data) => {
      if (err) {throw err;}
       
      var jdata=JSON.parse("["+data.replace(/}{/g, '},{')+"]"); 
      var namesearch=answers.srchname;
      var result = jdata.find(item => item.name === namesearch);
      console.log('Name: ', result.name);
      console.log('Age: ', result.age);
      console.log('Gender:', result.gender);
      
      process.exit();
    })
        
    
    }
    
  
    
  });
  
}








