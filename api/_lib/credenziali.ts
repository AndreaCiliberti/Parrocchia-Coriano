import { createHash, timingSafeEqual } from 'node:crypto';

const impronta = (valore: string) => createHash('sha256').update(valore).digest();
const uguali = (a: string, b: string) => timingSafeEqual(impronta(a), impronta(b));

export function credenzialiValide(email: unknown, password: unknown): boolean {
  const emailAttesa = process.env.ADMIN_EMAIL;
  const passwordAttesa = process.env.ADMIN_PASSWORD;
  if (!emailAttesa || !passwordAttesa) {
    throw new Error('ADMIN_EMAIL o ADMIN_PASSWORD non configurati');
  }
  if (typeof email !== 'string' || typeof password !== 'string') return false;
  const emailOk = uguali(email.trim().toLowerCase(), emailAttesa.trim().toLowerCase());
  const passwordOk = uguali(password, passwordAttesa);
  return emailOk && passwordOk;
}
