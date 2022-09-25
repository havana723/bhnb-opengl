const colorConverter = (bv: number) => {
  const t = 4600 * (1 / (0.92 * bv + 1.7) + 1 / (0.92 * bv + 0.62));

  var x = 0;
  var y = 0;

  if (t >= 1667 && t <= 4000) {
    x =
      (-0.2661239 * Math.pow(10, 9)) / Math.pow(t, 3) +
      (-0.234358 * Math.pow(10, 6)) / Math.pow(t, 2) +
      (0.8776956 * Math.pow(10, 3)) / t +
      0.17991;
  } else if (t > 4000 && t <= 25000) {
    x =
      (-3.0258469 * Math.pow(10, 9)) / Math.pow(t, 3) +
      (2.1070379 * Math.pow(10, 6)) / Math.pow(t, 2) +
      (0.2226347 * Math.pow(10, 3)) / t +
      0.24039;
  }

  if (t >= 1667 && t <= 2222) {
    y =
      -1.1063814 * Math.pow(x, 3) -
      1.3481102 * Math.pow(x, 2) +
      2.18555832 * x -
      0.20219683;
  } else if (t > 2222 && t <= 4000) {
    y =
      -0.9549476 * Math.pow(x, 3) -
      1.37418593 * Math.pow(x, 2) +
      2.09137015 * x -
      0.16748867;
  } else if (t > 4000 && t <= 25000) {
    y =
      3.081758 * Math.pow(x, 3) -
      5.8733867 * Math.pow(x, 2) +
      3.75112997 * x -
      0.37001483;
  }

  const Y = y == 0 ? 0 : 1;
  const X = y == 0 ? 0 : (x * Y) / y;
  const Z = y == 0 ? 0 : ((1 - x - y) * Y) / y;

  const r = 0.41847 * X - 0.15866 * Y - 0.082835 * Z;
  const g = -0.091169 * X + 0.25243 * Y + 0.015708 * Z;
  const b = 0.0009209 * X - 0.0025498 * Y + 0.1786 * Z;

  return { r, g, b };
};

export default colorConverter;
