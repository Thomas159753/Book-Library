const libraryMain = document.querySelector(".library-main");
const popup = document.querySelector(".add_popup");
let myLibrary = [];

const addBook = document
.getElementById("add_book")
.addEventListener("click", () => {
    popup.style.visibility = "visible";
})

const cancelButton = document
.getElementById("cancel")
.addEventListener("click", () => {
    popup.style.visibility = "hidden";
})

const submitButton = document
.getElementById("submit")
.addEventListener('click', (e) => {
    e.preventDefault();
    createbook();
})

function createbook(){
    form = Array.from(document.querySelectorAll("#book_data input")).reduce((acc, input) =>({...acc, [input.id]: input.value}), {});
    // book = Object.assign({}, form)
    // myLibrary.push(book)
    const newbook = new book (form.title, form.author, form.total_pages, form.completed_pages)
    myLibrary.push(newbook)
    newbook.appendBook(newbook)
}

function book(title, author, total_pages, completed_pages){ // dont think i need this but just in case
    this.title = title;
    this.author = author;
    this.total_pages = total_pages;
    this.completed_pages = completed_pages;
}


book.prototype.appendBook = (newbook) =>{
    let booknode = document.createElement("div")
    booknode.classList.add("book");
    booknode.innerHTML = (`
    <div>
        <h3>${newbook.title}</h3>
    </div>
    <div>
        <h4>Author:</h4>
        <p>${newbook.author}</p>
        <h4>Total Pages:</h4>
        <p>${newbook.total_pages}</p>
        <h4>Completed Pages:</h4>
        <p>${newbook.completed_pages}</p>
    </div>`)

    libraryMain.append(booknode);
}