// prettier-ignore
type Matrix3Values = [
  a11: number, a12: number, a13: number,
  a21: number, a22: number, a23: number,
  a31: number, a32: number, a33: number,
];

export class Matrix3 {
  values: Matrix3Values;

  private constructor(
    a11: number,
    a12: number,
    a13: number,
    a21: number,
    a22: number,
    a23: number,
    a31: number,
    a32: number,
    a33: number
  ) {
    this.values = [a11, a12, a13, a21, a22, a23, a31, a32, a33];
  }

  static identity() {
    // prettier-ignore
    return new Matrix3(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
    );
  }

  static translate(dx: number, dy: number) {
    // prettier-ignore
    return new Matrix3(
      1, 0, dx,
      0, 1, dy,
      0, 0, 1,
    );
  }

  static scale(sx: number, sy: number) {
    // prettier-ignore
    return new Matrix3(
      sx, 0,  0,
      0,  sy, 0,
      0,  0,  1,
    );
  }

  static rotate(theta: number) {
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    // prettier-ignore
    return new Matrix3(
      cos, -sin,  0,
      sin,  cos,  0,
      0,    0,    1,
    );
  }

  multiplyMatrix(other: Matrix3) {
    const [a11, a12, a13, a21, a22, a23, a31, a32, a33] = this.values;
    const [b11, b12, b13, b21, b22, b23, b31, b32, b33] = other.values;

    const c11 = a11 * b11 + a12 * b21 + a13 * b31;
    const c12 = a11 * b12 + a12 * b22 + a13 * b32;
    const c13 = a11 * b13 + a12 * b23 + a13 * b33;

    const c21 = a21 * b11 + a22 * b21 + a23 * b31;
    const c22 = a21 * b12 + a22 * b22 + a23 * b32;
    const c23 = a21 * b13 + a22 * b23 + a23 * b33;

    const c31 = a31 * b11 + a32 * b21 + a33 * b31;
    const c32 = a31 * b12 + a32 * b22 + a33 * b32;
    const c33 = a31 * b13 + a32 * b23 + a33 * b33;

    // prettier-ignore
    return new Matrix3(
      c11, c12, c13,
      c21, c22, c23,
      c31, c32, c33,
    );
  }
}

export class Vector2 {
  constructor(public x: number, public y: number) {}

  transform(mat: Matrix3) {
    const [a11, a12, _, a21, a22] = mat.values;
    return new Vector2(
      a11 * this.x + a12 * this.y,
      a21 * this.x + a22 * this.y
    );
  }
}

export class Point {
  private constructor(public x: number, public y: number) {}

  static origin() {
    return new Point(0, 0);
  }

  transform(mat: Matrix3) {
    const [a11, a12, a13, a21, a22, a23] = mat.values;
    return new Point(
      a11 * this.x + a12 * this.y + a13 * 1,
      a21 * this.x + a22 * this.y + a23 * 1
    );
  }
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

export function clampAngle(angleInRadians: number) {
  return angleInRadians % (Math.PI * 2);
}

export const DEG_TO_RAD = Math.PI / 180;
