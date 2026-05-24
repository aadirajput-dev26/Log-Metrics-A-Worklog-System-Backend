import fs from 'fs';

let code = fs.readFileSync('src/routes/auth.route.js', 'utf8');

code = code.replace(
    'import { signup, login, logout } from "../controllers/auth.controller.js"',
    'import { signup, login, logout, checkUsername, setUsername, googleAuth } from "../controllers/auth.controller.js"'
);

code = code.replace(
    'export default router;',
    'router.post("/check-username", checkUsername);\nrouter.post("/set-username", setUsername);\nrouter.post("/google", googleAuth);\n\nexport default router;'
);

fs.writeFileSync('src/routes/auth.route.js', code);
console.log("Auth route updated");
