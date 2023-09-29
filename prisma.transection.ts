//Insert data using transection & roll back

/* const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async transectionClient => {
    const result = await transectionClient.course.create({
      data: courseData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Course creation failed');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      await asyncForEach(
        preRequisiteCourses,
        async (preRequisiteCourse: IpreRequisiteRequest) => {
          const createPrerequisite =
            await transectionClient.courseToPrerequisits.create({
              data: {
                courseId: result.id,
                prerequisitesId: preRequisiteCourse.courseId,
              },
            });
          console.log(createPrerequisite);
        }
      );
    }

    return result;
  });

  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        prerequisits: {
          include: {
            prerequisites: true,
          },
        },
        prerequisitsFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Course creation failed');
}; */

//Update data using transection & roll back

/* const updateIntoDB = async (
    id: string,
    payload: Partial<Book>
  ): Promise<Book | null> => {
    const { preRequisiteCourses, ...courseData } = payload;
  
    await prisma.$transaction(async transectionClient => {
      const result = await transectionClient.course.update({
        where: {
          id,
        },
        data: courseData,
      });
  
      if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update course');
      }
  
      if (preRequisiteCourses && preRequisiteCourses.length > 0) {
        const deletePrerequisite = preRequisiteCourses.filter(
          deletePrerequisite =>
            deletePrerequisite.courseId && deletePrerequisite.isDeleted
        );
        const newPrerequisite = preRequisiteCourses.filter(
          coursePrerequisite =>
            coursePrerequisite.courseId && !coursePrerequisite.isDeleted
        );
        await asyncForEach(
          deletePrerequisite,
          async (deletePreRequisiteCourse: IpreRequisiteRequest) => {
            await transectionClient.courseToPrerequisits.deleteMany({
              where: {
                AND: [
                  {
                    courseId: id,
                  },
                  {
                    prerequisitesId: deletePreRequisiteCourse.courseId,
                  },
                ],
              },
            });
          }
        );
  
        await asyncForEach(
          newPrerequisite,
          async (createPreRequisiteCourse: IpreRequisiteRequest) => {
            await transectionClient.courseToPrerequisits.create({
              data: {
                courseId: id,
                prerequisitesId: createPreRequisiteCourse.courseId,
              },
              include: {
                prerequisites: true,
              },
            });
          }
        );
      }
      return result;
    });
  
    const responseData = await prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        prerequisits: {
          include: {
            prerequisites: true,
          },
        },
        prerequisitsFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }; */
