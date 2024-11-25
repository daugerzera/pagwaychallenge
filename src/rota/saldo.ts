import { Router } from 'express';
import { getBalance } from '../controlador/saldo';

const router = Router();

router.get('/saldo', getBalance);

export default router;
