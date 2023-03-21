
// // let title = array_form[title];
//     array_form = Array.from(document.querySelectorAll("#book_data input")).reduce((acc, input) =>({...acc, [input.id]: input.value}), {});
//     new book(array_form[title], array_form[author], array_form[total_pages], array_form[completed_pages])


const libraryMain = document.querySelector(".library-main");
const popup = document.querySelector(".add_popup");
let myLibrary = [];
form = '';

const addBook = document
.getElementById("add_book")
.addEventListener("click", function() {
    popup.style.visibility = "visible";
})

const cancelButton = document
.getElementById("cancel")
.addEventListener("click", function() {
    popup.style.visibility = "hidden";
})

const submitButton = document
.getElementById("submit")
.addEventListener('click', (e) => {
    e.preventDefault();
    createbook();
    appendBook();
})

function createbook(){
    form = Array.from(document.querySelectorAll("#book_data input")).reduce((acc, input) =>({...acc, [input.id]: input.value}), {});
    // book = Object.assign({}, form)
    // myLibrary.push(book)
    const newbook = new book (form.title, form.author, form.total_pages, form.completed_pages)
    myLibrary.push(newbook)
}

function book(title, author, total_pages, completed_pages){ // dont think i need this but just in case
    this.title = title;
    this.author = author;
    this.total_pages = total_pages;
    this.completed_pages = completed_pages;
}

function appendBook (){
    myLibrary.forEach((book) => {
        let booknode = document.createElement("div")
        booknode.classList.add("book");
        booknode.innerHTML = (`
        <div>
            <h3>${book.title}</h3>
        </div>
        <div>
            <h4>Author:</h4>
            <p>${book.author}</p>
            <h4>Total Pages:</h4>
            <p>${book.total_pages}</p>
            <h4>Completed Pages:</h4>
            <p>${book.completed_pages}</p>
        </div>`)

        libraryMain.appendChild(booknode);
    })
}