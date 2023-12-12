import express from 'express';
import { CategoryContolers } from './category.contolers';
import validationsRequest from '../../middlewears/validationRequest';
import { CategoryValidation } from './category.validation';

const router = express.Router();
router.post(
  '/',
  validationsRequest(CategoryValidation.createCategorySchemaValidation),
  CategoryContolers.createCategory,
);

router.get('/', CategoryContolers.getAllCategory);

export const CategoryRoutes = router;
