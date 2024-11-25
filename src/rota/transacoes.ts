import { Router } from 'express';
import { createTransaction, getTransactions } from '../controlador/transacao';

const router = Router();

router.post('/transacao', createTransaction);
router.get('/transacao', getTransactions);

export default router;
