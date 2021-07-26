document.addEventListener("DOMContentLoaded", function() {

    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addBookShelf();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }



});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan!!!");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBookShelfs();
});


function changeBookSubmit() {
    const bookIsComplete = document.getElementById("inputBookIsComplete").checked;
    if (bookIsComplete) {
        document.getElementById("bookSubmit").firstElementChild.innerHTML = "Finished!✔";
    } else {
        document.getElementById("bookSubmit").firstElementChild.innerHTML = "Unfinished!❌";
    }
}