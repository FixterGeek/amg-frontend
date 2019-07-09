function rotateArray(arr = []) {
  const tempIndex = arr.shift();
  return [...arr, tempIndex];
}

function rotateArrayRight(arr = []) {
  const tempIndex = arr.pop();
  return [tempIndex, ...arr];
}

export {
  rotateArray,
  rotateArrayRight,
};
