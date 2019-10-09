"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Book =
/*#__PURE__*/
function () {
  function Book(title, author) {
    _classCallCheck(this, Book);

    this.title = title;
    this.author = author;
  }

  _createClass(Book, [{
    key: "displayInfo",
    value: function displayInfo() {
      return "Book: " + this.title + "\n" + "Author: " + this.author;
    }
  }, {
    key: "author",
    get: function get() {
      return this._author;
    },
    set: function set(author) {
      this._author = author;
    }
  }, {
    key: "title",
    get: function get() {
      return this._title;
    },
    set: function set(title) {
      this._title = title;
    }
  }]);

  return Book;
}();

var Audiobook =
/*#__PURE__*/
function (_Book) {
  _inherits(Audiobook, _Book);

  function Audiobook(publisher, fullListeningTime, title, author) {
    var _this;

    _classCallCheck(this, Audiobook);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Audiobook).call(this, title, author));
    _this.publisher = publisher;
    _this.fullListeningTime = fullListeningTime;
    return _this;
  }

  _createClass(Audiobook, [{
    key: "displayInfo",
    value: function displayInfo() {
      return _get(_getPrototypeOf(Audiobook.prototype), "displayInfo", this).call(this) + "\n" + "Publisher: " + this.publisher + "\n" + "Full Listening Time: " + this.fullListeningTime;
    }
  }, {
    key: "publisher",
    get: function get() {
      return this._publisher;
    },
    set: function set(publisher) {
      this._publisher = publisher;
    }
  }, {
    key: "fullListeningTime",
    get: function get() {
      return this._fullListeningTime;
    },
    set: function set(fullListeningTime) {
      this._fullListeningTime = fullListeningTime;
    }
  }]);

  return Audiobook;
}(Book);

var TextBook =
/*#__PURE__*/
function (_Book2) {
  _inherits(TextBook, _Book2);

  function TextBook(pages, creationDate, title, author) {
    var _this2;

    _classCallCheck(this, TextBook);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(TextBook).call(this, title, author));
    _this2.pages = pages;
    _this2.creationDate = creationDate;
    return _this2;
  }

  _createClass(TextBook, [{
    key: "displayInfo",
    value: function displayInfo() {
      return _get(_getPrototypeOf(TextBook.prototype), "displayInfo", this).call(this) + "\n" + "Creation Date: " + this.creationDate.toLocaleString() + "\n" + "Pages: " + this.pages;
    }
  }, {
    key: "pages",
    get: function get() {
      return this._pages;
    },
    set: function set(pages) {
      this._pages = pages;
    }
  }, {
    key: "creationDate",
    get: function get() {
      return this._creationDate;
    },
    set: function set(creationDate) {
      this._creationDate = creationDate;
    }
  }]);

  return TextBook;
}(Book);

var book = new Book('Harry Potter and the Philosophers Stone', 'J. K. Rowling');
var audioBook = new Audiobook('New York Times', '06:33:21', 'Тонкое искусство пофигизма', 'Марк Мэнсон');
var textBook = new TextBook(596, new Date(2012, 10, 5), 'Букварь', 'Надежда Жукова');
console.log(book.displayInfo());
console.log(textBook.displayInfo());
console.log(audioBook.displayInfo());
//# sourceMappingURL=ES6ToEs5.js.map
