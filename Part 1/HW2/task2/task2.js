var btn3 = document.getElementById("btn3");

function showPopup(){
    var person = prompt("Please enter your name");
    var name = document.getElementById("name");
    var newName = "";

    if (/\d/.test(person)) {
        newName = person.split("").reverse().join("");
    } else {
        for (let i = 0; i < person.length; i++) {
            if (i % 2 == 0){
                newName += person[i].toUpperCase();
            }
            else{
                newName += person[i].toLowerCase();
            }
        }
    }
    name.innerHTML = "Hello " + newName;
}

btn3.addEventListener("click", showPopup);