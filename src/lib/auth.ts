import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { config } from './config';
import { prisma } from './prisma';

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role?: string;
}

const secretKey = new TextEncoder().encode(config.jwtSecret);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, config.bcryptRounds);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(config.jwtExpiresIn)
    .sign(secretKey);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
      role: (payload.role as string) || 'USER',
    };
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<TokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(config.cookieName)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function getAdminUser(): Promise<TokenPayload | null> {
  const user = await getSessionUser();
  if (!user) return null;
  if (user.role === 'ADMIN' || user.email === 'creativenaaz.business@gmail.com' || user.email === 'admin@naazarts.com') {
    return user;
  }
  // Also check database user role if token didn't have updated role
  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { role: true, email: true },
    });
    if (dbUser && (dbUser.role === 'ADMIN' || dbUser.email === 'creativenaaz.business@gmail.com' || dbUser.email === 'admin@naazarts.com')) {
      return { ...user, role: 'ADMIN' };
    }
  } catch {}
  return null;
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(config.cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(config.cookieName);
}
