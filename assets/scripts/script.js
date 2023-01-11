// Array of special characters to be included in password
const specialCharacters = [
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
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = [
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
const upperCasedCharacters = [
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
  const options = getPasswordOptions();
  if (!options) { return ""; }
  let password = "";
  if (options.length >= 10 && options.length <= 64) { // don't need to check this really, just a bit of defensive programminf
    while(password.length < options.length) {
      if (password.length < options.length && options.hasUpperCase) { password += getRandom(charsets.upperCase); }
      if (password.length < options.length && options.hasLowerCase) { password += getRandom(charsets.lowerCase); }
      if (password.length < options.length && options.hasNumbers) { password += getRandom(charsets.numbers); }
      if (password.length < options.length && options.hasSpecial) { password += getRandom(charsets.special); }
    }
  }
  return password.substring(0, options.length); //don't need a substring as it should be already at the required length. just for my sanity!
}

// Get references to the #generate & #copy elements
var generateBtn = document.querySelector('#generate');
var copyBtn = document.querySelector('#copy');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  //don't need to do this bit if password is an empty string
  if (password) {
    var passwordText = document.querySelector('#password');
    // passwordText.value = password.match(/.{4}/g).join(" - "); // Just testing password chunking to see if it looks better output like this
    passwordText.value = password;
  }
}

// Copy password to clipboard
function copyPassword() {

}

// Add event listener to generate and copy to clipboard buttons
generateBtn.addEventListener('click', writePassword);
copyBtn.addEventListener('click', copyPassword);

// Just a little test to see if i could generate my own character sets
function charArrayFromAscii(asciiStart, asciiEnd, ignore) {
  let arr = [];
  let ignoreType = "default";
  if (ignore && ignore.includes) {
    ignoreType = "array"; // or string but includes works for both :)
  } else if (ignore && ignore.test) {
    ignoreType = "regex";
  } 
  for (let i = Math.max(0,asciiStart); i <= Math.min(128, asciiEnd); i++) {
    char = String.fromCharCode(i);
    switch (ignoreType) {
      case "array":
        if (!ignore.includes(char)) { arr.push(char); }
      break

      case "regex":
        if (!ignore.test(char)) { arr.push(char); }
      break

      default:
        arr.push(char);
    }
    
  }
  return arr;
}

const charsetTest = {
  upperCase: charArrayFromAscii(65,90),
  lowerCase: charArrayFromAscii(97,122), 
  numbers: [..."0123456789"], // or charArrayFromAscii(48,57) - Just wanted to try something different for numbers
  special: charArrayFromAscii(33,126,/[\d\w\s;(),<>=`]/),
};

console.log(charsetTest);