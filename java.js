const libraryMain = document.querySelector(".library-main");
const popup = document.querySelector(".add_popup");
const bookInfo = document.getElementById("total_books");
const PagesInfo = document.getElementById("total_pages");
const TotalCompletePagesInfo = document.getElementById("total_completed_pages");
const OngoingBooksInfo = document.getElementById("ongoing_books");
const titleForm = document.getElementById("title");
const authorForm = document.getElementById("author");
const pagesForm = document.getElementById("pages");
const completed_pagesForm = document.getElementById("completed_pages");

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
    updateInfo();
    popup.style.visibility = "hidden";
})

function createbook(){
    let Title = titleForm.value;
    let author = authorForm.value
    let pages = pagesForm.value
    let completed_pages = completed_pagesForm.value
    let id = myLibrary.length
    
    const newbook = new book (Title, author, pages, completed_pages, id);
    myLibrary.push(newbook);
    newbook.appendBook(newbook);
}

function book(title, author, total_pages, completed_pages, id){ 
    this.title = title;
    this.author = author;
    this.total_pages = total_pages;
    this.completed_pages = completed_pages;
    this.id = id;
}


book.prototype.appendBook = (newbook) =>{
    let nodeBook = document.createElement("div");
    let nodeHeader = document.createElement("div");
    let nodeTitle = document.createElement("h3");
    let nodeDiv = document.createElement("div");
    let nodeAuthor = document.createElement("h4");
    let nodeAuthorContent = document.createElement("p");
    let nodeTotalPages = document.createElement("h4");
    let nodeTotalPagesContent = document.createElement("p");
    let nodeCompletedPages = document.createElement("h4");
    let nodeCompletedPagesContent = document.createElement("p");
    let nodeButtonDiv = document.createElement("div");
    let nodeEditButton = document.createElement("button");
    let nodeDeleteButton = document.createElement("button");

    nodeBook.classList.add("book");
    nodeEditButton.classList.add("edit");
    nodeDeleteButton.classList.add("delete");

    nodeTitle.textContent = newbook.title;
    nodeAuthor.textContent = "Author:";
    nodeAuthorContent.textContent = newbook.author;
    nodeTotalPages.textContent = "Total Pages:";
    nodeTotalPagesContent.textContent = newbook.total_pages;
    nodeCompletedPages.textContent = "Completed Pages:";
    nodeCompletedPagesContent.textContent = newbook.completed_pages;
    nodeEditButton.textContent = "Edit";
    nodeDeleteButton.textContent = "Delete";


    libraryMain.append(nodeBook);
    nodeBook.append(nodeHeader)
    nodeHeader.append(nodeTitle);
    nodeBook.append(nodeDiv);
    nodeDiv.append(nodeAuthor);
    nodeDiv.append(nodeAuthorContent);
    nodeDiv.append(nodeTotalPages);
    nodeDiv.append(nodeTotalPagesContent);
    nodeDiv.append(nodeCompletedPages);
    nodeDiv.append(nodeCompletedPagesContent);
    nodeBook.append(nodeButtonDiv);
    nodeButtonDiv.append(nodeEditButton);
    nodeButtonDiv.append(nodeDeleteButton);

    nodeEditButton.addEventListener("click", function(){
        editPage(newbook)
    })


}

function updateInfo (){
    bookInfo.innerHTML = 0
    PagesInfo.innerHTML = 0
    TotalCompletePagesInfo.innerHTML = 0
    for(i = 0; i < myLibrary.length; i++){
        bookInfo.innerHTML++
        PagesInfo.innerHTML = +PagesInfo.innerHTML + +myLibrary[i].total_pages;
        TotalCompletePagesInfo.innerHTML = +TotalCompletePagesInfo.innerHTML + +myLibrary[i].completed_pages;
    }
}

function editPage(bookData){
    console.log(bookData.id);
}
