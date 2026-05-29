const addBookmarkBtn=document.getElementById("add-bookmark");
const bookmarkList=document.getElementById("bookmark-list");
const bookmarkNameInput=document.getElementById("bookmark-name");
const bookmarkUrlInput=document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);

addBookmarkBtn.addEventListener("click", function(){

    const name=bookmarkNameInput.value.trim();
    const url=bookmarkUrlInput.value.trim();

    if(!name || !url){
        alert("Please Enter Both Name And URL");
        return;
    }

    if(
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ){
        alert("Enter valid URL");
        return;
    }

    addBookmark(name,url);
    saveBookmark(name,url);

    bookmarkNameInput.value="";
    bookmarkUrlInput.value="";
});

function addBookmark(name, url){

    const li = document.createElement("li");

    li.innerHTML = `
        <a href="${url}" target="_blank">${name}</a>
        <button id="delete-btn">Delete</button>
    `;

    const deleteBtn = li.querySelector("#delete-btn");

    deleteBtn.addEventListener("click", function(){

        li.remove();

        deleteBookmark(url);

    });

    bookmarkList.appendChild(li);
}

function saveBookmark(name,url){

    const bookmarks=
        JSON.parse(localStorage.getItem("bookmarks")) || [];

    bookmarks.push({
        name:name,
        url:url
    });

    localStorage.setItem(
        "bookmarks",
        JSON.stringify(bookmarks)
    );
}

function loadBookmarks(){

    const bookmarks=
        JSON.parse(localStorage.getItem("bookmarks")) || [];

    bookmarks.forEach(function(bookmark){

        addBookmark(bookmark.name, bookmark.url);

    });
}

function deleteBookmark(url){

    let bookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];

    bookmarks = bookmarks.filter(function(bookmark){

        return bookmark.url !== url;

    });

    localStorage.setItem(
        "bookmarks",
        JSON.stringify(bookmarks)
    );
}