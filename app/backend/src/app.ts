import * as express from 'express';
import 'express-async-errors';
import httpErrorMiddleware from './middlewares';
import {
  loginRoute,
  matchesRoute,
  teamsRoute,
  leaderboardRoute,
} from './routes/index';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use('/login', loginRoute);

    this.app.use('/teams', teamsRoute);

    this.app.use('/matches', matchesRoute);

    this.app.use('/leaderboard', leaderboardRoute);

    this.app.use(httpErrorMiddleware);

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
