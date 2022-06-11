import express from 'express';
import { api } from './api';
import { expressjwt } from 'express-jwt';
import { getJwtSecret } from '../components/signIn/SignInController';
import helmet from 'helmet';
import compression from 'compression';
import sslRedirect from 'heroku-ssl-redirect';
import path from 'path';


const app = express();
app.use(sslRedirect());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(expressjwt({
    secret: getJwtSecret(),
    credentialsRequired: false,
    algorithms: ['HS256']
}));
app.use(api);

app.use(express.static(path.join(__dirname, '../')));
app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, '../', 'index.html'));
});

app.listen(process.env["PORT"] || 3002, () => console.log("Server started"));
