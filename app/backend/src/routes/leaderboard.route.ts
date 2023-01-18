import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const router = Router();

const controller = new LeaderboardController();

router.get('/home', controller.leaderboardHome.bind(controller));

router.get('/away', controller.leaderboardAway.bind(controller));

export default router;
