'use server';

import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

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

    if (!process.env.SECRET_KEY) throw new Error('시크릿 키 없음');

    var token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

    cookies().set('accessToken', token, { httpOnly: true, secure: false });

    return true;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
