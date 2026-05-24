import fs from 'fs';

let code = fs.readFileSync('src/routes/workDay.route.js', 'utf8');
code = code.replace(
    'import { createWorkDay , getWorkDay , updateWorkDay } from "../controllers/workDay.controller.js";',
    'import { createWorkDay , getWorkDay , updateWorkDay, getTodayWorkDay, endWorkDay } from "../controllers/workDay.controller.js";'
);
code = code.replace(
    'router.patch("/", protectRoute, updateWorkDay);',
    'router.patch("/", protectRoute, updateWorkDay);\nrouter.get("/today", protectRoute, getTodayWorkDay);\nrouter.post("/end", protectRoute, endWorkDay);'
);
fs.writeFileSync('src/routes/workDay.route.js', code);
console.log('Route updated');
