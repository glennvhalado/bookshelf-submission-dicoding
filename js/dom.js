const INCOMPLETED_LIST_BOOKSHELF_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOKSHELF_ID = "completeBookshelfList";
const BOOKSHELF_ITEMID = "itemId";

function addBookShelf() {
    let BOOKSHELFList;

    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = "Writer : " + document.getElementById("inputBookAuthor").value;
    const bookYear = "Year : " + document.getElementById("inputBookYear").value;
    const bookIsComplete = document.getElementById("inputBookIsComplete").checked;

    if (bookIsComplete) {
        BOOKSHELFList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);
    } else {
        BOOKSHELFList = document.getElementById(INCOMPLETED_LIST_BOOKSHELF_ID);
    }

    const bookShelf = makeBookShelf(bookTitle, bookAuthor, bookYear, bookIsComplete);
    const bookShelfObject = composeBookObject(bookTitle, bookAuthor, bookYear, bookIsComplete);

    bookShelf[BOOKSHELF_ITEMID] = bookShelfObject.id;
    books.push(bookShelfObject);

    BOOKSHELFList.append(bookShelf);

    updateDataToStorage();

}

function makeBookShelf(title, author, year, bookIsComplete) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.innerText = year;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action");
    buttonContainer.append(createCompleteButton(bookIsComplete), createDeleteButton(), createEditButton());

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(bookTitle, bookAuthor, bookYear, buttonContainer);

    return container;
}

function createCompleteButton(isComplete) {
    if (isComplete) {
        return createButton("green", "Not finished in Read", function(event) {
            addReadToInCompleted(event.target.parentElement.parentElement);
        });
    } else {
        return createButton("green", "Finished in Read", function(event) {
            addReadToCompleted(event.target.parentElement.parentElement);
        });
    }

}

function createDeleteButton() {
    return createButton("red", "Delete book", function(event) {
        removeBook(event.target.parentElement.parentElement);
    });
}

function createEditButton() {
    return createButton("blue", "Edit book", function(event) {
        editBook(event.target.parentElement.parentElement);
    });
}


function createButton(buttonTypeClass, buttonInnerText, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonInnerText;
    button.addEventListener("click", function(event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addReadToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);
    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelectorAll(".book_item > p")[0].innerText;
    const bookYear = taskElement.querySelectorAll(".book_item > p")[1].innerText;

    const newBookShelf = makeBookShelf(bookTitle, bookAuthor, bookYear, true);
    const bookShelf = findBook(taskElement[BOOKSHELF_ITEMID]);
    bookShelf.isCompleted = true;
    newBookShelf[BOOKSHELF_ITEMID] = bookShelf.id;

    listCompleted.append(newBookShelf);

    taskElement.remove();

    updateDataToStorage();
}

function addReadToInCompleted(taskElement) {
    const listCompleted = document.getElementById(INCOMPLETED_LIST_BOOKSHELF_ID);
    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelectorAll(".book_item > p")[0].innerText;
    const bookYear = taskElement.querySelectorAll(".book_item > p")[1].innerText;

    const newBookShelf = makeBookShelf(bookTitle, bookAuthor, bookYear, false);
    const bookShelf = findBook(taskElement[BOOKSHELF_ITEMID]);
    bookShelf.isCompleted = false;
    newBookShelf[BOOKSHELF_ITEMID] = bookShelf.id;

    listCompleted.append(newBookShelf);

    taskElement.remove();

    updateDataToStorage();
}

function removeBook(taskElement) {
    if (confirm("Are you sure you want to delete the book data?")) {
        const bookShelfPosition = findBookIndex(taskElement[BOOKSHELF_ITEMID]);
        books.splice(bookShelfPosition, 1);

        taskElement.remove();
        updateDataToStorage();
    }
}

function editBook(taskElement) {
    const bookTitle = taskElement.querySelector(".book_item > h3");
    const bookAuthor = taskElement.querySelectorAll(".book_item > p")[0];
    const bookYear = taskElement.querySelectorAll(".book_item > p")[1];
    const button = taskElement.querySelector(".book_item > .action > .blue").innerText;

    if (button === "Edit buku") {
        bookTitle.contentEditable = "true";
        bookAuthor.contentEditable = "true";
        bookYear.contentEditable = "true";
        taskElement.querySelector(".book_item > .action > .blue").innerText = "Save Changes";
        bookTitle.focus();
    } else {
        const bookShelf = findBook(taskElement[BOOKSHELF_ITEMID]);
        bookShelf.title = bookTitle.innerText;
        bookShelf.author = bookAuthor.innerText;
        bookShelf.year = bookYear.innerText;

        if (confirm("Are you sure you want to save?")) {
            updateDataToStorage();
        }


        bookTitle.contentEditable = "false";
        bookAuthor.contentEditable = "false";
        bookYear.contentEditable = "false";
        taskElement.querySelector(".book_item > .action > .blue").innerText = "Edit book";

    }


}



function refreshDataFromBookShelfs() {
    let BOOKSHELFList;

    for (bookShelf of books) {
        const newBookShelf = makeBookShelf(bookShelf.title, bookShelf.author, bookShelf.year, bookShelf.isCompleted);

        newBookShelf[BOOKSHELF_ITEMID] = bookShelf.id;

        if (bookShelf.isCompleted) {
            BOOKSHELFList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);
        } else {
            BOOKSHELFList = document.getElementById(INCOMPLETED_LIST_BOOKSHELF_ID);
        }

        BOOKSHELFList.append(newBookShelf);

    }
}