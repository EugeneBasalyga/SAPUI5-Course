function onCreate(ev) {
    ev.preventDefault();
   
   
    var data = JSON.stringify({
        "author": String(document.getElementById("cauthor").value),
        "title": String(document.getElementById("ctitle").value),
        "fullListeningTime": String(document.getElementById("cfullListeningTime").value),
        "publisher": String(document.getElementById("cpublisher").value)
    });

    fetch("http://127.0.0.1:2403/audiobooks/", {
        method: 'POST',
        body: data, 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
}

function onRead() {

    fetch('http://127.0.0.1:2403/audiobooks/', {
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(audiobooks) {
        var resultTBody = document.createElement('tbody');
        audiobooks.map(function(nthAudioBook){
            resultTBody.appendChild(parseAudioBookToTableRow(nthAudioBook));
        });

        var table = document.getElementById('rTBody').parentElement;
        table.replaceChild(resultTBody, document.getElementById('rTBody'));
        resultTBody.id = 'rTBody';
        console.log('success');
    })
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

    fetch("http://127.0.0.1:2403/audiobooks/" + document.getElementById("uid").value, {
        method: 'PUT', 
        body: data, 
        headers:{
          'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}

function onDelete(ev) {
    ev.preventDefault();

    fetch("http://127.0.0.1:2403/audiobooks/" + document.getElementById("did").value, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
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