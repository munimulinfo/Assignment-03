import express from 'express';
import validationsRequest from '../../middlewears/validationRequest';
import { ReviewValidation } from './review.validation';
import { ReviewContollers } from './review.contolers';

const router = express.Router();
router.post(
  '/',
  validationsRequest(ReviewValidation.createReviewSchemaValidation),
  ReviewContollers.createReview,
);

export const ReviewRoutes = router;
