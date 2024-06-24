'use server';

import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

export async function authenticate({ email, password }: { email: string; password: string }) {
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
    if (!user) return false;

    cookies().set('accessToken', 'abc123', { httpOnly: true, secure: false }); // secure: true

    return true;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
