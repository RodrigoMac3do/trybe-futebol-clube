import { Router } from 'express';
import { LoginController } from '../controllers';

const router = Router();

const controller = new LoginController();

router.get('/validate', controller.validate.bind(controller));

router.post('/', controller.signIn.bind(controller));

export default router;
