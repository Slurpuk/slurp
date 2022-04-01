/**
 * Fisher–Yates_shuffle method to get random subset of an array.
 * https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
 * @param arr array to shuffle and reduce.
 * @param canHaveZeroItems use ceil or floor function to have possibly yield no items
 * @returns Array subarray of random size
 */
export function getRandomSubarray(arr, canHaveZeroItems = false) {
  let shuffled = arr.slice(0),
    i = arr.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  if (canHaveZeroItems) {
    return shuffled.slice(0, Math.floor((Math.random() * arr.length) / 2));
  } else {
    return shuffled.slice(0, Math.ceil((Math.random() * arr.length) / 2));
  }
}

/**
 * Function to make a selection of options.
 * @param options list of options including milks and syrups
 * @returns {*} list with one milk and 0 to x options
 */
export function getRandomOptions(options) {
  const milks = options.filter(option => option.type === 'Milk');
  const syrups = options.filter(option => option.type === 'Syrup');
  const optionSelection = getRandomSubarray(syrups, true);
  optionSelection.push(milks[Math.floor(Math.random() * milks.length)]);
  return optionSelection;
}
