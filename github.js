let searchContainer = document.querySelector('#search-container');
let resultContainer = document.querySelector('#search-result-container');
let searchInput = document.querySelector('#search-user-input');

let userName = document.querySelector('#user-name');
let userPic = document.querySelector('#user-pic');
let repositoriesContainer = document.querySelector('#repositories-list');

let resultLength = 0;

function searchUsers(){
    fetch(`https://api.github.com/search/users?q=${searchInput.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        createUsers(data);
    })
    .catch(error => console.log(error));
}

function createUsers(data){
    resultLength = data.items.length;
    for (let i = 0; i < resultLength; i++) {
        let user = document.createElement("div");
        let userPicContainer = document.createElement("div");
        let userPic = document.createElement("img");
        let userDetails = document.createElement("div");
        let userRepBtn = document.createElement("button");
        let userProfileBtn = document.createElement("button");

        user.classList.add("user");
        userPicContainer.classList.add("user-picture");
        userDetails.classList.add("user-details");

        userRepBtn.innerHTML = "Repositories";
        userProfileBtn.innerHTML = "Full profile";

        userRepBtn.addEventListener("click", showRepositories);
        //userProfileBtn.addEventListener("click", showProfile);

        userRepBtn.dataItem = data.items[i]; // Match specific item for eventListener
        //userProfileBtn.dataItem = data.items[i];

        userPic.setAttribute("src" , data.items[i].avatar_url);

        userDetails.innerHTML = data.items[i].login;

        resultContainer.appendChild(user);
        user.appendChild(userDetails);
        user.appendChild(userPicContainer);
        userPicContainer.appendChild(userPic);
        userDetails.appendChild(userRepBtn);
        userDetails.appendChild(userProfileBtn);   
    }
}

function showRepositories(event){
    const dataItem = event.target.dataItem;
    console.log(dataItem);
    
    fetch(`https://api.github.com/users/${dataItem.login}/repos`)
    .then(res => res.json())
    .then(data => {
        createUserRepositories(data)
    })
    .catch(error => console.log(error));

}

function createUserRepositories(data){
    for(let i = 0; i < data.length; i++){
        let repository = document.createElement("div");
        repository.innerHTML = data[i].name;
        console.log(data);
        userName.innerHTML = data[i].owner.login;
        userName.innerHTML += `(${data.length})`;
        userPic.setAttribute("src" , data[i].owner.avatar_url);
    
        repositoriesContainer.appendChild(repository);
    }
}


