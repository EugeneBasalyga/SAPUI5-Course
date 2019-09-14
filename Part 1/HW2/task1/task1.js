var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");

function redirectToGoogle() {
    window.location.href = "http://www.google.com";
}

function deleteAllContent(){
    while (document.body.firstChild){
        document.body.removeChild(document.body.firstChild);
    }
}

btn1.addEventListener("click", redirectToGoogle);
btn2.addEventListener("click", deleteAllContent);