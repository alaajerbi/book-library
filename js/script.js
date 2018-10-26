
    const tableBody = document.getElementById("table-body");
    const popupButton = document.querySelector(".popup-button");
    const formContainer = document.querySelector(".form-container");
    const feedbackText = document.getElementById("feedback");
    const titleInput = document.getElementById("titleInput");
    const authorInput = document.getElementById("authorInput");
    const pagesInput = document.getElementById("pagesInput");
    const readInput = document.getElementById("readStatusInput");
        

    var library = [];

    function toggleForm(){
        popupButton.classList.toggle("opened");
        popupButton.innerHTML == "Add New Book" ? popupButton.innerHTML = "<i class='fas fa-times'></i> Close" : popupButton.innerHTML = "Add New Book";
        formContainer.classList.toggle("show");
    }


    function Book(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }


    function resetFields(){
        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        readInput.value = false;
    }
    function addBookToLibrary(){

        if (titleInput.value.trim() !=="" && authorInput.value.trim()!=="" && pagesInput.value.trim()!=="" && readInput.value.trim()!=="") {
            let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.value);
            library.push(newBook);

            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("library", JSON.stringify(library));
            }

            renderLibrary();
            
            toggleForm();
            resetFields();
            return true;
        }
        return false;
    }

    function renderBook(book, index) {
        tableBody.insertAdjacentHTML("beforeend", "<tr><td>" + book.title + "</td><td>" + book.author + "</td><td>" + book.pages + "</td><td><button onclick='toggleReadStatus(" + index + ")' class='" + (book.read == true ? "button-primary" : "") + "'>" + (book.read == true ? "Read" : "Currently reading") + "</span></td><td><i onclick='removeItem(" + index + ")' class='fas fa-times remove-btn'></i></td></tr>"); 
    }


    function renderLibrary() {
        tableBody.innerHTML = "";
        if (library.length !== 0) {
            feedbackText.style.display = "none";
            library.forEach((book, index) => renderBook(book, index));
        }
        else {
            feedbackText.style.display = "block";
        }
    }

    function removeItem(index){
        library.splice(index, 1);
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("library", JSON.stringify(library));
        }
        tableBody.innerHTML = "";
        renderLibrary();
    }

    function toggleReadStatus(index){
        library[index].read = !library[index].read;
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("library", JSON.stringify(library));
        }
        renderLibrary();
    }

    (function(){
        if (typeof(Storage) !== "undefined") {
            if (localStorage.getItem("library") != null) {
                library = JSON.parse(localStorage.getItem("library"));
            }
            renderLibrary();
        }
        else {
            console.error("Oops, Your browser doesn't support localStorage.");
        }
    })();
