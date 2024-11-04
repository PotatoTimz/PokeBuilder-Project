export const capitalizeFirstCharacter = (word: string): string => {
  console.log(word.charAt(0).toUpperCase() + word.slice(1));
  return word.charAt(0).toUpperCase() + word.slice(1);
};
