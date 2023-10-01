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

/* const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Middleware to decode and verify the JWT token
const decodeTokenMiddleware = (req, res, next) => {
  // Verify and decode the JWT here, and attach the user information to req.user
  // You can use libraries like 'jsonwebtoken' for this purpose
  const token = req.headers.authorization; // Assuming the token is in the 'Authorization' header
  // Verify and decode the token here
  // ...

  // Attach user information to the request
  req.user = decodedToken; // Replace with the decoded token
  next();
};

// Route to create a new order
router.post('/create-order', decodeTokenMiddleware, async (req, res) => {
  try {
    // Extract user information from the decoded token
    const { userId } = req.user;

    // Request body containing ordered books
    const { orderedBooks } = req.body;

    // Calculate the total price based on the ordered books and quantities (implement this)
    const total = calculateTotalPrice(orderedBooks);

    // Create the order in the database
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: 'pending', // You can set the initial status as needed
        orderedBooks: {
          create: orderedBooks.map(({ bookId, quantity }) => ({
            bookId,
            quantity,
          })),
        },
      },
      include: {
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });

    // Respond with the newly created order
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    });
  }
});

module.exports = router;
 */
