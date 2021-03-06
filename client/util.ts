import {HP} from './const';
export function snap(px: number): number {
  return Math.round(px + HP) - HP;
}

export function lerp(a: number, b: number, alpha: number): number {
  return b + (alpha * (a - b));
}
