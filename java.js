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
const formHeader = document.querySelector('.formHeader');
const readBookForm = document.getElementById("read_book");
const confirm_DeleteWindow = document.querySelector(".confirm_Delete");

let selectedBook =""

let myLibrary = [];

const addBook = document // green add book button
.getElementById("add_book")
.addEventListener("click", () => {
    clearForm()
})

const cancelButton = document // cancel button in forms
.getElementById("cancel")
.addEventListener("click", () => {
    clearForm()
})

const YesDeleteBook = document // delete popup yes runs deletebook function
.getElementById("YesDelete")
.addEventListener("click", () => {
    deletebook();
})

const NoDeletebook = document // delete popup no button tern the window off
.getElementById("NoDelete")
.addEventListener("click", () => {
    confirm_DeleteWindow.style.visibility = "hidden";
})

const submitButton = document.getElementById("submit"); // checks if it should make a new book or edit it
submitButton.addEventListener('click', function(e) {
    validate()
    if (submitButton.innerHTML == "Submit Changes" && validate() == true){
        submitButton.innerHTML = "Submit"
        submitChanges();
        updateInfo();
        clearForm();
    }
    else if (validate() == true) {
        let newbook = new book (titleForm.value, authorForm.value, pagesForm.value, completed_pagesForm.value ,readBookForm.checked);
        myLibrary.push(newbook);
        appendBook();
        updateInfo();
        clearForm();
    }
    e.preventDefault();
})

function book(title, author, total_pages, completed_pages, checked){ 
    this.title = title;
    this.author = author;
    this.total_pages = total_pages;
    this.completed_pages = completed_pages;
    this.id = myLibrary.length;
    this.checked = checked
}

   function appendBook() { // clears display area and creates the books
    libraryMain.innerHTML = ""
    myLibrary.forEach((newbook) => {
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
        nodeBook.dataset.id = newbook.id
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

        if (newbook.checked == true) {
            nodeBook.classList.add("bookRead"); // use a class change colours
        }

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

        nodeEditButton.addEventListener("click", editPage)// the edit buttons in the books
        nodeDeleteButton.addEventListener("click",(e) => { // turns on confirm delete pop up window
            selectedBook = e.target.parentNode.parentNode.dataset.id
            confirm_DeleteWindow.style.visibility = "visible";
        })
    })
    
}

function updateInfo (){ // book stats area
    bookInfo.innerHTML = 0
    PagesInfo.innerHTML = 0
    TotalCompletePagesInfo.innerHTML = 0
    for(i = 0; i < myLibrary.length; i++){
        bookInfo.innerHTML = myLibrary.length;
        PagesInfo.innerHTML = +PagesInfo.innerHTML + +myLibrary[i].total_pages;
        TotalCompletePagesInfo.innerHTML = +TotalCompletePagesInfo.innerHTML + +myLibrary[i].completed_pages;
    }
}

function editPage(e){
    selectedBook = e.target.parentNode.parentNode.dataset.id
    clearForm()
    submitButton.innerHTML = "Submit Changes"
    titleForm.value = myLibrary[selectedBook].title;
    authorForm.value = myLibrary[selectedBook].author;
    pagesForm.value = myLibrary[selectedBook].total_pages;
    completed_pagesForm.value = myLibrary[selectedBook].completed_pages;
    readBookForm.checked = myLibrary[selectedBook].checked;
    formHeader.textContent = "Edit Book";
}

function deletebook(){ // removes book from library - hides window and makes new cards
    myLibrary.splice(selectedBook, 1);
    onfirm_DeleteWindow.style.visibility = "hidden";
    appendBook();
}

function clearForm(){
    if (popup.style.visibility == "hidden") {
    popup.style.visibility = "visible";
    titleForm.value = "";
    authorForm.value = "";
    pagesForm.value = "";
    completed_pagesForm.value = "";
    readBookForm.checked = false;
    }
    else{
        popup.style.visibility = "hidden"
    }
}

function submitChanges(){
    myLibrary[selectedBook].title = titleForm.value;
    myLibrary[selectedBook].author = authorForm.value;
    myLibrary[selectedBook].total_pages = pagesForm.value;
    myLibrary[selectedBook].completed_pages = completed_pagesForm.value;
    myLibrary[selectedBook].checked = readBookForm.checked;
    appendBook();
}


// popup stiling line

const completed_pages_label = document.querySelector(".completed_pages_label");

function validate(){
    if (+pagesForm.value < +completed_pagesForm.value){
        completed_pages_label.textContent = "Complete pages can't be more than Book Pages";
        completed_pages_label.style.color = "red";
        return false;
    } 
return true
}