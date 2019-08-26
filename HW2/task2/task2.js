var btn3 = document.getElementById("btn3");

function showPopup(){
    var person = prompt("Please enter your name");
    var name = document.getElementById("name");
    var newName = "";

    if (/\d/.test(person)) {
      name.innerHTML = "Hello " + person;
    } else {
        for (let i = 0; i < person.length; i++) {
            if (i % 2 == 0){
                newName += person[i].toUpperCase();
            }
            else{
                newName += person[i].toLowerCase();
            }
        }
        alert(newName);
    }
}

btn3.addEventListener("click", showPopup);