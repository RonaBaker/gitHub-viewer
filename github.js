const searchContainer = document.querySelector('#search-container');
const resultContainer = document.querySelector('#search-result-container');
const searchInput = document.querySelector('#search-user-input');
const userName = document.querySelector('#user-name');
const userPic = document.querySelector('#user-pic');
const repositoriesListContainer = document.querySelector('#repositories-list');
const repositoriesContainer = document.querySelector('#user-repositories-container');

let resultLength = 0;

function searchUsers(){
    fetch(`https://api.github.com/search/users?q=${searchInput.value}`)
    .then(res => res.json())
    .then(data => {
        createUsers(data);
    })
    .catch(error => console.log(error));
}

function createUsers(data){
    resultLength = data.items.length;
    for (let i = 0; i < resultLength; i++) {
        let user = document.createElement('div');
        let userPicContainer = document.createElement('div');
        let userPic = document.createElement('img');
        let userDetails = document.createElement('div');
        let userRepBtn = document.createElement('button');
        let userProfileBtn = document.createElement('button');

        user.classList.add('user');
        userPicContainer.classList.add('user-picture');
        userDetails.classList.add('user-details');

        userRepBtn.innerHTML = 'Repositories';
        userProfileBtn.innerHTML = 'Full profile';

        userRepBtn.addEventListener('click', showRepositories);
        userProfileBtn.addEventListener('click', showProfile);

        userRepBtn.dataItem = data.items[i]; // Match specific item for eventListener
        userProfileBtn.dataItem = data.items[i];

        userPic.setAttribute('src' , data.items[i].avatar_url);

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
    
    fetch(`https://api.github.com/users/${dataItem.login}/repos`)
    .then(res => res.json())
    .then(data => {
        createUserRepositories(data)
    })
    .catch(error => console.log(error));

}

function createUserRepositories(data){
    repositoriesContainer.style.visibility = 'visible';
    for(let i = 0; i < data.length; i++){
        userName.innerHTML = data[i].owner.login;
        userName.innerHTML += ` (${data.length})`;

        let repository = document.createElement('div');

        let repName = document.createElement('h4');
        repName.innerHTML = data[i].full_name;

        let flag = document.createElement('div');
        flag.classList.add('rep-flag');
        if(data[i].private === 'false'){
            flag.innerHTML = 'public'
        }
        else{
            flag.innerHTML = 'private'
        }

        let bodyRep = document.createElement('p');
        bodyRep.innerHTML = `Forks: ${data[i].forks_count}</br>Watchers:${data[i].watchers_count}`;

        let linkRep = document.createElement('a');
        linkRep.setAttribute('href' , data[i].html_url);
        linkRep.innerHTML = `URL: ${data[i].html_url}`;
        userPic.setAttribute('src' , data[i].owner.avatar_url);

        repository.appendChild(repName);
        repository.appendChild(flag);
        repository.appendChild(bodyRep);
        repository.appendChild(linkRep);
        repositoriesListContainer.appendChild(repository);
    }
}

function showProfile(event){
    const dataItem = event.target.dataItem;
    window.open(`https://github.com/${dataItem.login}`);
}


