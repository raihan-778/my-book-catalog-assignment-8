import express from 'express';
import { BuildingRoutes } from '../modules/building/building.routes';
import { CourseRoutes } from '../modules/course/course.routes';
import { FacultyRoutes } from '../modules/faculty/faculty.routes';
import { OfferedCourseRouter } from '../modules/offeredCourse/offeredCourse.routes';
import { OfferedCourseSectionRoutes } from '../modules/offeredCourseSection/offeredCourseSection.routes';

import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.routes';
import { OfferedCourseClassScheduleRoutes } from './../modules/offeredCourseClassSchedule/offeredCourseClassSchedule.routes';
import { StudentsRoutes } from './../modules/student/student.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes

  {
    path: '/students',
    routes: StudentsRoutes,
  },
  {
    path: '/faculties',
    routes: FacultyRoutes,
  },
  {
    path: '/buildings',
    routes: BuildingRoutes,
  },

  {
    path: '/courses',
    routes: CourseRoutes,
  },
  {
    path: '/semester-registrations',
    routes: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    routes: OfferedCourseRouter,
  },
  {
    path: '/offered-course-sections',
    routes: OfferedCourseSectionRoutes,
  },
  {
    path: '/offered-course-class-schedules',
    routes: OfferedCourseClassScheduleRoutes,
  },
  //   {
  //     path: '/',
  //     route: UserRoutes,
  //   },
  //  {
  //     path: '/auth',
  //     route: AuthRoutes,
  //   },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
