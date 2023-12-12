import buildQuery from '../../buillder/buildQuery';
// import { ReviewModel } from '../Review/review.model';
import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

const createCourseInToDb = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const updateCourseInToDb = async (
  payload: Partial<TCourse>,
  courseId: string,
) => {
  const { tags, details, ...remainingCourseData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatedData[`details.${key}`] = value;
    }
  }

  if (tags && tags.length) {
    tags.forEach((tag, index) => {
      for (const [key, value] of Object.entries(tag)) {
        modifiedUpdatedData[`tags.${index}.${key}`] = value;
      }
    });
  }

  const result = await CourseModel.findByIdAndUpdate(
    courseId,
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const getAllCoursesDataFromDb = async (
  queryParams: Record<string, unknown>,
) => {
  const query = buildQuery(queryParams);

  const result = await CourseModel.find(query)
    .sort({
      [queryParams?.sortBy as string]:
        queryParams?.sortOrder === 'asc' ? 1 : -1,
    })
    .skip(((queryParams?.page as number) - 1) * (queryParams?.limit as number))
    .limit(Number(queryParams?.limit as number));

  return result;
};

const getSingleCourseWithReviewFromDb = async (courseId: string) => {
  const result = await CourseModel.findById(courseId)
    .populate('categoryId')
    .populate('reviews');
  if (!result) {
    throw new Error('course is not found');
  }
  return result;
};

const getBestCourseFormDb = async () => {
  const reslut = await CourseModel.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $project: {
        title: 1,
        instructor: 1,
        categoryId: 1,
        price: 1,
        tags: 1,
        startDate: 1,
        endDate: 1,
        language: 1,
        provider: 1,
        durationInWeeks: 1,
        details: 1,
        averageRating: { $avg: '$reviews.rating' },
        reviewCount: { $size: '$reviews' },
      },
    },
    { $sort: { averageRating: -1 } },
    { $limit: 1 },
  ]);
  return reslut;
};

export const CourseServices = {
  createCourseInToDb,
  updateCourseInToDb,
  getSingleCourseWithReviewFromDb,
  getAllCoursesDataFromDb,
  getBestCourseFormDb,
};
