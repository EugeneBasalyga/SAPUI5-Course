
class Book {

    constructor(title, author){
        this.title = title;
        this.author = author;
    }

    get author(){
        return this._author;
    }
    get title(){
        return this._title;
    }
    set author(author){
        this._author = author;
    }
    set title(title){
        this._title = title;
    }

    displayInfo (){
        return "Book: " + this.title + "\n" + "Author: " + this.author;
    }
}
 


class Audiobook extends Book{

    constructor(publisher, fullListeningTime, title, author){
        super(title, author);
        this.publisher = publisher;
        this.fullListeningTime = fullListeningTime;
    }
    get publisher(){
        return this._publisher;
    }
    get fullListeningTime(){
        return this._fullListeningTime;
    }
    set publisher(publisher){
        this._publisher = publisher;
    }
    set fullListeningTime(fullListeningTime){
        this._fullListeningTime = fullListeningTime;
    }

    displayInfo(){
        return super.displayInfo() + "\n" + "Publisher: " + this.publisher + "\n" + "Full Listening Time: " + this.fullListeningTime;
    }
}


class TextBook extends Book{

    constructor(pages, creationDate, title, author){
        super(title, author);
        this.pages = pages;
        this.creationDate = creationDate;
    }
    get pages(){
        return this._pages;
    }
    get creationDate(){
        return this._creationDate;
    }
    set pages(pages){
        this._pages = pages;
    }
    set creationDate(creationDate){
        this._creationDate = creationDate;
    }

    displayInfo(){
        return super.displayInfo() + "\n" + "Creation Date: " + this.creationDate.toLocaleString() + "\n" +"Pages: "+ this.pages;
    }
}


var book = new Book('Harry Potter and the Philosophers Stone','J. K. Rowling');
var audioBook = new Audiobook ('New York Times', '06:33:21', 'Тонкое искусство пофигизма', 'Марк Мэнсон');
var textBook = new TextBook (596, new Date(2012, 10, 5), 'Букварь', 'Надежда Жукова');


console.log(book.displayInfo());
console.log(textBook.displayInfo());
console.log(audioBook.displayInfo());

