import { User } from '@prisma/client';
import prisma from './prisma';

export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const isUserExists = async (
  email: string
): Promise<Partial<User> | null> => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      email: true,
      password: true,
      role: true,
    },
  });

  return user;
};

// Prisma equivalent for isPasswordMatched instance method
export const isPasswordMatched = async (
  givenPassword: string,
  currentPassword: string
): Promise<boolean> => {
  // return await bcrypt.compare(givenPassword, currentPassword);
  return givenPassword === currentPassword;
};
