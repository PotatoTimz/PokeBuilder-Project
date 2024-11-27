// Function to capitalize the first character of a given word
export const capitalizeFirstCharacter = (word: string): string => {
  // Takes the first character of the word, converts it to uppercase,
  // then concatenates it with the rest of the word (starting from the second character)
  return word.charAt(0).toUpperCase() + word.slice(1);
};
