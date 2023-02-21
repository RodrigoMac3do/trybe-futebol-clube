import { Router } from 'express';
import route from './index';

const router = Router();

router.use('/login', route.login);

router.use('/teams', route.teams);

router.use('/matches', route.matches);

router.use('/leaderboard', route.leaderboard);

export default router;
