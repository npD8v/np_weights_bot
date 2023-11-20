const express = require('express');
const http = require('http');
require('dotenv').config();

const ngrokHelper = require('./helpers/ngrok.helper');
const router = require('./routes');
const localHelper = require('./helpers/local.helper');
const telegramService = require('./services/telegram.service');

const app = express();

const server = http.createServer(app);

const {PORT, NGROK_PORT, SERVER_URL} = process.env;

const port = PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use('/', (req, res, next) => { next() })

app.use((req, res, next) => {
    req.serverStartTime = new Date();

    next();
  });

app.use('/api', router);

server.listen(port);

server.on('listening', async () => {

    let url = '';
    
    if(NGROK_PORT){
        url = (await ngrokHelper.getUrl(NGROK_PORT));

        let savedUrl = '';

        if(!(await localHelper.isFileExist())){
            await localHelper.writeFile(url);
        } else { savedUrl = await localHelper.readFile(); }

        if( !localHelper.isFileExist() || url !== savedUrl){
            const urlBuffer = Buffer.from(url, 'utf8');
            await localHelper.writeFile(urlBuffer);
            await telegramService.setWebhook(`${url}/api`);
        }
    } else {
        await telegramService.setWebhook(`${SERVER_URL}/api`);
    }

    console.log(`Server listening on ${NGROK_PORT ? url : SERVER_URL}:${port}`);
})
