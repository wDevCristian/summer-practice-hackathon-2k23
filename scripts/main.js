// let {log, dir} = console;

// Init with localStorage data
let otpList = document.querySelector(".otp-list");
otpList.innerHTML = localStorage.getItem("currentHTMLState");

function addEventListenerOnExistance(elem) {
   if(elem) {
      elem.forEach(item => {
         item.addEventListener('click', () => {
            item.parentNode.remove();
            updateLocalStorage();
         }); 
      });
   }
}

let closeBtns = document.querySelectorAll(".otp-list__item-close");
addEventListenerOnExistance(closeBtns);

function generateRandomKey() {
   return Math.random().toString().slice(-6);
}

function createNewOTP(itemKey, itemNameCode) {
   const listItem = document.createElement("li");
   listItem.className = "otp-list__item";
   listItem.innerHTML = `<div class="otp-list__item-wrapper"><span class="otp-list__item-key">${itemKey}</span><span class="otp-list__item-name-code">${itemNameCode}</span><span class="otp-list__item-timer"></span>
   <span class="otp-list__item-close material-symbols-outlined">close</span></div>`;
   
   otpList.appendChild(listItem);
}

function updateLocalStorage() {
   localStorage.setItem("currentHTMLState", otpList.innerHTML);
}

// Added eventListener for btn with OTP creation
const btn = document.querySelector(".auth-form__btn");
btn.addEventListener('click', () => {
   const formInput = document.querySelector(".auth-form__input");

   const input = formInput.value;
   
   if (input !== "") 
   createNewOTP(generateRandomKey(), input);

   closeBtns = document.querySelectorAll(".otp-list__item-close");
   addEventListenerOnExistance(closeBtns);

   updateLocalStorage();

   updateTimerElem();
})

function updateKeysForElems() {
   const items = document.querySelectorAll(".otp-list__item-key");

   items.forEach(item => {
      item.innerHTML = generateRandomKey();
   })
}

function updateTimer() {
   const currentDate = new Date();
   const seconds = currentDate.getSeconds();
   timer = 30 - seconds % 30;
   isExpired = timer == 30 ? true : false;
}

function updateTimerElem() {
   let timerElem = document.querySelectorAll(".otp-list__item-timer");

   if(timerElem.length != 0) {
      timerElem.forEach(item => item.innerHTML = timer);
   }  
}
 
let timer;
let isExpired; 

setInterval(() => {
   updateTimer(); 
   updateTimerElem();
   if (isExpired) {
      updateKeysForElems();
   }
}, 1000)

// Not integrated with rest of the project
const request = new Request('https://swapi.dev/api/people/?format=json');

fetch(request)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
  });

  // TODO: 
  // - change localStorageUpdate to be called on beforeunload() event
  // - integrate fetch() in project
  // - delete inputbox after entering a value
  // - add function for checking if the same name-code exists in order to prevent duplicates