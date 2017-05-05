const sharp = require('sharp');
const fs = require('fs')
const filenames =[
  '123966.jpg',
  '124597.jpg'
]
run();
function run(){
  filenames.map(filename=>{
    try{
      sharp(fs.readFileSync(filename))
        .resize(600)
        .toFile('./source/uploads/'+filename)
    }
    catch(err){
      console.error(err);
    }
  })
}
