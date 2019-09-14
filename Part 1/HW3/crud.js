function onCreate(ev) {
    ev.preventDefault();
   
   
    var data = JSON.stringify({
        "author": String(document.getElementById("cauthor").value),
        "title": String(document.getElementById("ctitle").value),
        "fullListeningTime": String(document.getElementById("cfullListeningTime").value),
        "publisher": String(document.getElementById("cpublisher").value)
    });
    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert(this.responseText);
            document.getElementById("createForm").dispatchEvent(new Event('submit'));
        } 
    });

    xhr.open("POST", "http://127.0.0.1:2403/audiobooks/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onRead() {
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            result = JSON.parse(this.response);
            var resultTBody=document.createElement('tbody');
            result.map(function(nthAudioBook){
                resultTBody.appendChild(parseAudioBookToTableRow(nthAudioBook));
            });

            var table = document.getElementById('rTBody').parentElement;
            table.replaceChild(resultTBody, document.getElementById('rTBody'));
            resultTBody.id = 'rTBody';
            console.log('success');
        }
    });

    xhr.open("GET", "http://127.0.0.1:2403/audiobooks/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function onPrepareUpdate(ev){

    ev.preventDefault();
    xhrids = new XMLHttpRequest();
    xhrids.withCredentials = true;

    xhrids.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            result=JSON.parse(this.response);
            var ids=document.createElement('select');
            ids.className='form-control';
            result.map(function(nthAudioBook){
                var id = document.createElement('option');
                id.innerHTML = nthAudioBook['id'];
                ids.appendChild(id);
            });
            var form = document.getElementById('uid').parentElement;
            form.replaceChild(ids,document.getElementById('uid'));
            ids.id='uid';
        }
    });
    xhrids.open("GET", "http://127.0.0.1:2403/audiobooks/");
    xhrids.setRequestHeader("Content-Type", "application/json");
    xhrids.send();
}

function onUpdate(ev) {
    ev.preventDefault();

   
    var data = JSON.stringify({
        "author": String(document.getElementById("uauthor").value),
        "title": String(document.getElementById("utitle").value),
        "fullListeningTime": String(document.getElementById("ufullListeningTime").value),
        "publisher": String(document.getElementById("upublisher").value)
    });
    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("PUT", "http://127.0.0.1:2403/audiobooks/" + document.getElementById("uid").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onDelete(ev) {
    ev.preventDefault();
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("DELETE", "http://127.0.0.1:2403/audiobooks/" + document.getElementById("did").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function parseAudioBookToTableRow(AudioBooks){
    var row = document.createElement('tr');

    id = document.createElement('th');
    id.innerText = AudioBooks['id'];
    row.appendChild(id);

    author = document.createElement('td');
    author.innerText = AudioBooks['author'];
    row.appendChild(author);

    title = document.createElement('td');
    title.innerText = AudioBooks['title'];
    row.appendChild(title);
   
    publisher = document.createElement('td');
    publisher.innerText = AudioBooks['publisher'];
    row.appendChild(publisher);
    
    fullListeningTime = document.createElement('td');
    fullListeningTime.innerText = AudioBooks['fullListeningTime'];
    row.appendChild(fullListeningTime);

    return row;
}


(function () {
  
    document.getElementById('cbutton').addEventListener(
        'click', onCreate
    );
    document.getElementById('rbutton').addEventListener(
        'click', onRead
    );
    document.getElementById('ubutton').addEventListener(
        'click', onUpdate
    );
    document.getElementById('pubutton').addEventListener(
        'click', onPrepareUpdate
    );
    document.getElementById('dbutton').addEventListener(
        'click', onDelete
    );
    console.log('Handlers is set')
})()