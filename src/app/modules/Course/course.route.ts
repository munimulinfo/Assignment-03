import express from 'express';
import validationsRequest from '../../middlewears/validationRequest';
import { CourseValidation } from './course.validation';
import { CourseContolers } from './course.contolers';
const router = express.Router();

router.post(
  '/',
  validationsRequest(CourseValidation.createCourseSchemaValidation),
  CourseContolers.createCourse,
);

router.put(
  '/:courseId',
  validationsRequest(CourseValidation.updateCourseSchemaValidation),
  CourseContolers.updateCourse,
);
router.get('/', CourseContolers.getAllCourseWithFiltaring);
router.get('/:courseId/reviews', CourseContolers.getSingleCourseWithReview);
router.get('/best', CourseContolers.getBestCourse);

export const CourseRoutes = router;
