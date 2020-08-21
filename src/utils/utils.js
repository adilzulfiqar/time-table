export function getRandomColor(obj) {
  const objKeys = Object.keys(obj);
  const randomNumber = Math.floor(Math.random() * objKeys.length);

  return obj[objKeys[randomNumber]];
}
