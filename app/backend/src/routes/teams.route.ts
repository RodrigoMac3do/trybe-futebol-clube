import { Router } from 'express';
import { TeamsController } from '../controllers/index';

const router = Router();

const controller = new TeamsController();

router.get('/', controller.findAll.bind(controller));

router.get('/:id', controller.findById.bind(controller));

export default router;
