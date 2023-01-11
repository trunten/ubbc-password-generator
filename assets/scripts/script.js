// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

const charsets = {
  upperCase: upperCasedCharacters,
  lowerCase: lowerCasedCharacters, 
  numbers: numericCharacters, 
  special: specialCharacters
};

// Function to prompt user for password options
function getPasswordOptions() {
  const debug =  {
    length: 44,
    hasUpperCase: true,
    hasLowerCase: true,
    hasNumbers: true,
    hasSpecial: true,
  };
  const options = {};
  let length = prompt("How long? (At least 10, no more than 64");
  if (!length) { console.log("user cancelled"); return };
  length = parseInt(length);
  if (!length || length < 10 || length > 64) { console.log("invalid inout or wrong length"); return };
  if (confirm("Lower case?")) options.hasLowerCase = true;
  if (confirm("Upper case?")) options.hasUpperCase = true;
  if (confirm("Numbers?")) options.hasNumbers = true;
  if (confirm("Special characters?")) options.hasSpecial = true;
  if (Object.keys(options).length === 0) { console.log("no options"); return }
  options.length = length;
  return options;
}

// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate password with user input
function generatePassword() {

}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);