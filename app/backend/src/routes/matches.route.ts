import { Router } from 'express';
import { MatchesController } from '../controllers/index';

const router = Router();

const controller = new MatchesController();

router.patch('/:id', controller.updateGoals.bind(controller));

router.patch('/:id/finish', controller.update.bind(controller));

router.get('/', controller.findAll.bind(controller));

router.post('/', controller.create.bind(controller));

export default router;
