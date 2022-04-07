function range({ start = 0, end = 0, step = 1 } = {}) {
  const range = [];
  for (let i = start; i < end; i = i + step) {
    range.push(i);
  }
  return range;
}

export default range;
