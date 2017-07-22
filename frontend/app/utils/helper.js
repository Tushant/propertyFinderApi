export function isEmpty(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

export function capitalize(string) {
  const stringArray = string.split(' ' || '');
  return stringArray.map(arr => `${arr.charAt(0).toUpperCase() + arr.slice(1)} `);
  // return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sizeOfAnObject(obj) {
  let size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}
