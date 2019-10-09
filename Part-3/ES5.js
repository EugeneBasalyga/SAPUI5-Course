
function Book (title, author){
    var _title = title;
    var _author = author;
    this.getAuthor = function(){
        return _author;
    }
    this.getTitle = function(){
        return _title;
    }
    this.setTitle = function (title){
        _title = title;
    }
    this.setAuthor = function (autor){
        _author = autor;
    }
}

Book.prototype.displayInfo = function(){
    return "Book: " + this.getTitle() + "\n" + "Author: " + this.getAuthor();
}
 


function Audiobook(publisher, fullListeningTime, title, author){
    Book.call(this, title, author);
    var _publisher = publisher;
    var _fullListeningTime = fullListeningTime;
    this.getPublisher = function(){
        return _publisher;
    }
    this.getFullListeningTime = function(){
        return _fullListeningTime;
    }
    this.setPublisher = function (publisher){
        _publisher = publisher;
    }
    this.setFullListeningTime = function (fullListeningTime){
        _fullListeningTime = fullListeningTime;
    }
}

Audiobook.prototype = Object.create(Book.prototype);

Audiobook.prototype.displayInfo = function(){
    return Book.prototype.displayInfo.call(this) + "\n" + "Publisher: " + this.getPublisher() + "\n" + "Full Listening Time: " + this.getFullListeningTime();
}


function TextBook(pages, creationDate, title, author ){
    Book.call(this, title, author);
    var _pages = pages;
    var _creationDate =  creationDate;
    this.getPages = function(){
        return _pages;
    }
    this.getCreationDate= function(){
        return _creationDate;
    }
    this.setPages = function (pages){
        _pages = newPages;
    }
    this.setCreationDate = function (creationDate){
        _creationDate = creationDate;
    }

}

TextBook.prototype = Object.create(Book.prototype);

TextBook.prototype.displayInfo = function(){
    return Book.prototype.displayInfo.call(this) + "\n" + "Creation Date: " + this.getCreationDate().toLocaleString() + "\n" +"Pages: " + this.getPages(); 
}


var book = new Book('Harry Potter and the Philosophers Stone','J. K. Rowling');
var audioBook = new Audiobook ('New York Times', '06:33:21', 'Тонкое искусство пофигизма', 'Марк Мэнсон');
var textBook = new TextBook (596, new Date(2012, 10, 5), 'Букварь', 'Надежда Жукова');


console.log(book.displayInfo());
console.log(textBook.displayInfo());
console.log(audioBook.displayInfo());

