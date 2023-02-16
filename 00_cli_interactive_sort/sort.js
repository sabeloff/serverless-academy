const readline = require('readline');
const process = require('process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

wordandnumbers();
    
function wordandnumbers(){


rl.question('Please enter a few words or numbers separated by a space (type "Exit" to exit): ', (answer1) => {
    var result = answer1; //array
    var result2=result.split(" ");
    if (result2.includes("exit")){ 
      process.exit();      
      };

    rl.question('What operation to do with words and numbers: \n 1.Sort words alphabetically (Enter -1) \n 2.Show numbers from lesser to greater (Enter -2)\n 3.Show numbers from bigger to smaller (Enter -3)\n 4.Display words in ascending order by number of letters in the word (Enter -4)\n 5.Show only unique words (Enter -5)\n 6.Display only unique values from the set of words and numbers entered by the user (Enter -6): ', (answer2) => {
        var result1 =answer2; //selected sorting
        if (result2.includes("exit")){
                    process.exit();          
          };
        
        
        var result3=[];
        var result4=[];
        

        result2.forEach(myFunction); //select words and numbers
        

        function myFunction(item, index, result2) {
              if (result2[index] = isNaN(item)){
                
                result3.push(item);//array with words
              }
              else {
                result4.push(item); //array with numbers
              }
            }
        
           
          


        switch(answer2) {
          case '1':
            console.log("Alphabet = "+ result3);//  1.Sort words alphabetically (Enter -1)
            break;
          case '2':
            console.log(result4.sort(function(a, b){return a - b}));// Show numbers from lesser to greater (Enter -2)
            break;
          case '3':
            console.log(result4.sort(function(a, b){return b-a})); // 3.Show numbers from bigger to smaller (Enter -3)
              break;
          case '4':
            console.log(result3.sort(function(a, b){return a.length - b.length}));// 4.Display words in ascending order by number of letters in the word (Enter -4)
            break;
          case '5':
            console.log((Array.from(new Set(result3))));// 5.Show only unique words (Enter -5)
            break;
          case '6':
            console.log((Array.from(new Set(result3)))+","+(Array.from(new Set(result4))));// 6.Display only unique values from the set of words and numbers entered by the user (Enter -6)
           
        }

        wordandnumbers();
        
        
    });
    
});


}
