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

// Create an object to hold all my character sets for additional clarity.
const charsets = {
  upperCase: upperCasedCharacters,
  lowerCase: lowerCasedCharacters, 
  numbers: numericCharacters, 
  special: specialCharacters
};

// Constants to hold the allowable minimum and maximum lengths for the password.
// These are used twice in my code so it is is sensible to define them here so if
// any changes are made to these in the future only a single change has to be made.
const MIN_LENGTH = 10;
const MAX_LENGTH = 64;

// Function to prompt user for password options
function getPasswordOptions() {
  // Object to hold all the user option choices for their password
  let options = {};

  // If the user-interface password option fields are visible then use those instead of displaying prompts
  // Just so I can fullfill the technical criteria as well as having a nice little bonus.
  if (!document.querySelector(".options").className.includes("hide")) {
    options = validateOptions();
    // if an options object was not returned then return that, otherwise, cancel operation.
    if (options) {
      return options;
    } else {
      return;
    }
  }

  // First prompt the user for a password length
  let length = prompt("How long do you want you password to be? (At least 10 characters and no more than 64");
  if (!length) { return; }

  // Convert supplied  user value into an integer
  length = parseInt(length);
  
  if (!length) { 
    // If parseInt fails then the user input an invalid string. Alert the user and cancel operation.
    alert("Please input a valid number. Try again.");
    return;
  } else if (length < MIN_LENGTH || length > MAX_LENGTH) {
    // If the length falls outside the expected range alert the user and cancel operation.
    alert("Password length must be between 10 and 64 (inclusive). Try again.");
    return;
  }

  // Prompt user to pick at least one of the four options and add any confirmed choices to my options object
  alert("Please pick at least one of the following options");
  if (confirm("Do you want lower case characters?")) options.hasLowerCase = true;
  if (confirm("Do you want upper case characters?")) options.hasUpperCase = true;
  if (confirm("Do you want numbers?")) options.hasNumbers = true;
  if (confirm("Do you want special characters?")) options.hasSpecial = true;

  // If my options object has no keys at this point then the user has not selected to include and character sets. 
  // Alert the user and cancel the operation.
  if (Object.keys(options).length === 0) { 
    alert("You must pick at least one option. Try again")
    return ;
  }

  // If we get here all checks have passed and we can generate the password so add the length (from user input)
  // to the options object and return the object for it to be used in the generation phase. 
  options.length = length;
  return options;
}

// Function for getting a random element from an array supplied as a paramater
function getRandom(arr) {
  if (!arr) { return; } //If nothing was supplied as a paramater exit immediately
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate password with user input
function generatePassword() {
  // Get user options (function returns an object)
  const options = getPasswordOptions();

  // If getPasswordOptions didn't return an object then either the user cancelled or validation failed.
  // Set the return value to an empty string and exit immediately.
  if (!options) { return ""; }
  let password = "";

  // Don't need to check this really, just a bit of defensive programming to ensure that the user chose a valid password length
  if (options.length >= MIN_LENGTH && options.length <= MAX_LENGTH) { 
    // While the length of the variable 'password' is less that the require length keep looping.
    while(password.length < options.length) {
      // Check the options object to check if each of upper case, lower case, numbers & special characters need to be included
      // in the final output. If they are and the length of the password is still less than the required lenght then add a random
      // character from the relevant array to the 'password' variable. NB: if the options object does not contain the property
      // it returns falsy so we can check chracter inclusion using options.hasNumbers (for example).
      if (options.length && options.hasUpperCase) { password += getRandom(charsets.upperCase); } //Don't need to check length in this one as it was checked in the while condition
      if (password.length < options.length && options.hasLowerCase) { password += getRandom(charsets.lowerCase); }
      if (password.length < options.length && options.hasNumbers) { password += getRandom(charsets.numbers); }
      if (password.length < options.length && options.hasSpecial) { password += getRandom(charsets.special); }
    }
  }

  //Return the password variable so that it can be output to the page
  return password.substring(0, options.length); //don't need a substring as it should be already at the required length. just for my sanity!
}

// Get references to the #generate and #copy  elements
var generateBtn = document.querySelector('#generate');
var copyBtn = document.querySelector('#copy');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  // If password is an empty string then either the user cancelled or validtion failed. Only proceed to outputting
  // the password to the page if it is a none empty string.
  if (password) {
    var passwordText = document.querySelector('#password');
    // passwordText.value = password.match(/.{4}/g).join(" - "); // Just testing password chunking to see if it looks better output like this
    passwordText.value = password;
    copyBtn.classList.remove("hide");
  }
}

// Variable to store timeout of the popup and a reference to the #popup element.
const popup = document.getElementById("popup");
let timeout;

// Function to copy the password to clipboard
function copyPassword() {
  // Get the current value from the password element on the page
  let s = document.querySelector('#password').value.trimEnd();
  // If the variable 's' is a none empty string then copy this to the clipboard and inform the user
  if (s) {
    navigator.clipboard.writeText(s);

    // If a timeout already exists clear this first so the popup isn't dismissed prematurely.
    if (timeout) { clearTimeout(timeout); }

    // Show the popup
    popup.classList.add("show");

    //hide the popup after 1.5 seconds
    timeout = setTimeout(function(){ popup.classList.remove("show"); timeout = false;}, 1500);
  }
}

// Add event listener to generate and copy to clipboard buttons
generateBtn.addEventListener('click', writePassword);
copyBtn.addEventListener('click', copyPassword);

// User interface option fields
document.getElementById("show-options").addEventListener("click", (e) => {
  e.preventDefault();
  const optSelect = document.querySelector(".options");
  if (optSelect.className.includes("hide")) {
    optSelect.classList.remove("hide");
    document.getElementById("show-options").classList.add("hide");
  } else {
    // Disallow hiding again for now as it became too combersome to decide whether 
    // or not to show prompts based on visibility if options were already selected.
    // optSelect.classList.add("hide");
  }
});

function validateOptions() {
  const options = {};
  const length = parseInt(document.getElementById("length").value);
  const checkboxes = document.querySelectorAll(".checkbox input");
  const tooltip = document.getElementById("tooltip");
  tooltip.classList.remove("top");
  tooltip.classList.remove("bottom");
  if (!length) {
    // If no length has been entered alert the user and cancel operation.
    tooltip.textContent = "Length is required";
    tooltip.classList.add("top");
    return false;
  } else if (length < MIN_LENGTH || length > MAX_LENGTH) {
    // If an invlaid length has been entered alert the user and cancel operation.
    tooltip.textContent = "Invalid length";
    tooltip.classList.add("top");
    return false;
  } else {
    let anySelected = false
    // Store password options if selected
    for (el of checkboxes) {
      if (el.checked) { 
        anySelected = true 
        options[el.id] = el.checked;
      };
    }
    // If no options have been selected, alert the user and cancel operation.
    if (!anySelected) {
      tooltip.textContent = "Select at least one option";
      tooltip.classList.add("bottom");
      return false;
    }
  }

  // If we get here all input has passed validation so add length to the options object and return it
  options.length = length;
  return options;
}


// =====================================================================================
// Just a little test to see if i could generate my own character sets programmatically
// =====================================================================================
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
        break;

      case "regex":
        if (!ignore.test(char)) { arr.push(char); }
        break;

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