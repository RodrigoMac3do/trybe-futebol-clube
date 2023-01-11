import { Router } from 'express';
import { MatchesController } from '../controllers/index';

const router = Router();

const controller = new MatchesController();

router.get('/', controller.findAll.bind(controller));

export default router;
