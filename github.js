let searchContainer = document.querySelector('#search-container');
let resultContainer = document.querySelector('#search-result-container');
let searchInput = document.querySelector('#user-input');
let userContainer = document.querySelector('#user-container');
let resultLength = 0;

function searchUsers(){
    fetch('https://api.github.com/search/users?q=' + searchInput.value)
    .then(res => res.json())
    .then(data => {
        create(data);
    })
    .catch(error => console.log(error));
}

function create(data){
    resultLength = data.items.length;
    for (let i=0; i<resultLength; i++){
        const user = document.createElement("li");
        const username = document.createElement("div");
        const userPic = document.createElement("img");
        const userRepBtn = document.createElement("button");
        const userProfileBtn = document.createElement("button");

        userRepBtn.innerHTML = "Repositories";
        userProfileBtn.innerHTML = "Full profile";

        userRepBtn.addEventListener("click", showRep);
        userRepBtn.dataItem = data.items[i];

        resultContainer.appendChild(user);
        user.appendChild(username);
        user.appendChild(userPic);
        user.appendChild(userRepBtn);
        user.appendChild(userProfileBtn);
        userPic.setAttribute("src" , data.items[i].avatar_url);
        username.innerHTML = data.items[i].login;
    }
}

function showRep(event){
    console.log(event);
    const dataItem = event.target.dataItem;
    let repositories = document.createElement("div");
    repositories.innerHTML = dataItem.repos_url;
    userContainer.appendChild(repositories);

}