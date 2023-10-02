Live Link:https://prisma-postgre-sql-assignment-8.vercel.app

#### User

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/users (GET)
- api/v1/users/e75c333d-230f-497f-80bd-63777863d0bb (Single GET)
- api/v1/users/e75c333d-230f-497f-80bd-63777863d0bb (PATCH)
- api/v1/users/e75c333d-230f-497f-80bd-63777863d0bb (DELETE) Include an id that is saved in your database
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/b76fc3fe-4f90-4a1a-8564-8654e626d9b6 (Single GET)
- api/v1/categories/b76fc3fe-4f90-4a1a-8564-8654e626d9b6 (PATCH)
- api/v1/categories/b76fc3fe-4f90-4a1a-8564-8654e626d9b6 (DELETE)

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:93962f9d-16bc-453d-a744-ed962ea8e62e (GET)
- api/v1/books/:93962f9d-16bc-453d-a744-ed962ea8e62e (PATCH)
- api/v1/books/:93962f9d-16bc-453d-a744-ed962ea8e62e (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)
