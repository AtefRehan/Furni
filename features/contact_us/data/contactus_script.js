import {sendEmail} from "../../../utils/helper/functions.js";
import {ADMIN_EMAIL} from "../../../utils/helper/constants.js";

const urlParams = new URLSearchParams(window.location.search);
const userEmail = urlParams.get('userEmail');

const textareaElement = document.getElementById('msg');
const mail = document.querySelector('#mail')


const arrowLeftElement = document.querySelector('#arrowLeft');
arrowLeftElement.addEventListener('click', function () {
    // Handle the click event here
    window.location.href = "../../home/presentation/index.html?userEmail=" + userEmail;
});

let btn=document.querySelector('#sendMsg');
btn.addEventListener("click",function (e) {
    e.preventDefault();
    sendEmail(ADMIN_EMAIL,textareaElement.value);
    textareaElement.value = '';
    mail.value='';
})