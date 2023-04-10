const express = require("express");
const router = express.Router();
const User = require("../../app/models/User")
const testController = require("../../app/controllers/testController")
const auth = require("../../middleware/auth")
const { spawn } = require('child_process');
const path = require('path');
const child_process = require('child_process');
const VM2 = require('vm2');
router.post('/', (req, res) => {
 
  
  switch (language) {
    case 'c':
      cmd = `gcc -x c -o code.out - && echo "${input}" | ./code.out`;
      break;
    case 'cpp':
      cmd = `g++ -x c++ -o code.out - && echo "${input}" | ./code.out`;
      break;
    case 'python':
      cmd = `echo "${input}" | python -c "${code}"`;
      break;
    case 'javascript':
      cmd = `echo "${input}" | node -e "${code}"`;
      break;
    default:
      return res.status(400).send('Invalid language');
  }
  console.log(cmd,code)
  child_process.exec(cmd, (err, stdout, stderr) => {
    if (err) {
      res.status(500).send(stderr);
    } else {
      console.log(cmd)
      res.send(stdout)
    }
  });
});




router.get('/', (req,res) => {
    res.render('test3',{
        layout:false
    })
})
// router.get('/',(req,res) =>{
//   const vm  = require('vm')

// const code1 = `
// print('hihi')
// `

// const code2 = `
// (async function(){
//   for (i=0;i<5;++i) await Promise.resolve(console.log(2))
// })()
// `
// vm.runInNewContext(code1, { console }, { timeout: 5000 })

// vm.runInNewContext(code2, { console }, { timeout: 5000 })

// })


module.exports = router;
