const urlParams = new URLSearchParams(window.location.search);
const userEmail = urlParams.get('userEmail');
window.addEventListener("load",function () {
    const arrowLeftIcon = document.querySelector('.about-us-container .fa-arrow-left');

    arrowLeftIcon.onclick = function() {
        window.location.href = "../../home/presentation/index.html?userEmail=" + userEmail;
    };
})