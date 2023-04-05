const express = require("express");
const router = express.Router();
const User = require("../../app/models/User")
const testController = require("../../app/controllers/testController")
const auth = require("../../middleware/auth")
const { spawn } = require('child_process');
const path = require('path');
const child_process = require('child_process');

router.post('/', (req, res) => {
  const code = req.body.code;
  const language = req.body.language;
  const input = req.body.input;
  let cmd;

  
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

  child_process.exec(cmd, (err, stdout, stderr) => {
    if (err) {
      res.status(500).send(stderr);
    } else {
      res.send(stdout);
    }
  });
});


// router.get('/', (req, res) => {
//   res.send(`
//   <form id="code-form">
//       <textarea id="code-input" name="code"></textarea>
//       <select id="language-select" name="language">
//         <option value="c">C</option>
//         <option value="cpp">C++</option>
//         <option value="python">Python</option>
//         <option value="javascript">JavaScript</option>
//       </select>
//       <textarea id="input" name="input"></textarea>
//       <button type="submit">Compile</button>
//     </form>
//     <pre id="output"></pre>
//     <script>
//       const codeForm = document.getElementById('code-form');
//       const codeInput = document.getElementById('code-input');
//       const languageSelect = document.getElementById('language-select');
//       const input = document.getElementById('input');
//       const output = document.getElementById('output');

//       codeForm.addEventListener('submit', (e) => {
//         e.preventDefault();

//         const xhr = new XMLHttpRequest();
//         xhr.open('POST', '/compile');
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.onload = () => {
//           if (xhr.status === 200) {
//             output.innerText = xhr.responseText;
//           } else {
//             output.innerText = 'Error occurred';
//           }
//         };
//         xhr.send(JSON.stringify({
//           code: codeInput.value,
//           language: languageSelect.value,
//           input: input.value
//         }));
//       });
//     </script>
//   `);
// });  

router.get('/', (req,res) => {
    res.render('test2',{
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
// router.get('/',testController.test)
// router.post('/',testController.addLecture)
// router.get('/get',testController.getCourse)
// router.post('/login', async(req, res) => {
//     //Login a registered user
//     try {
//         const { email, password } = req.body
//         const user = await User.findByCredentials(email, password)
//         if (!user) {
//             return res.status(401).send({error: 'Login failed! Check authentication credentials'})
//         }
//         const token = await user.generateAuthToken()
//         res.send({ user, token })
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })
router.get('/me', auth ,async(req,res) => {
    res.send(req.user)
})
// router.post('/me/logout', auth, async (req, res) => {
//     // Log user out of the application
//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token != req.token
//         })
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

module.exports = router;
