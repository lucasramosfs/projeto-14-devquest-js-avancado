const screen={
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
       this.userProfile.innerHTML = 
                                    `<div class="info">
                                        <img src="${user.avatarUrl}"alt="Foto de perfil do usuário"/>
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado'}</h1>
                                            <div class="followers">
                                                <h2>👥️Seguidores ${user.followers}</h2>
                                                <h2>👥️Seguindo ${user.following}</h2>
                                            </div>
                                            <p>${user.bio ?? 'Não possui bio cadastrada'}</p>
                                        </div>
                                    </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">${repo.name}
                                                                    <div>
                                                                        <i>🍴️${repo.forks}</i> 
                                                                        <i>⭐️${repo.stargazers_count}</i> 
                                                                        <i>👀${repo.watchers}</i> 
                                                                        <i>👨‍💻️${repo.language ?? ''}</i> 
                                                                    <div></a>
                                                                </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += 
                                        `<div class="repositories section">
                                            <h2> Repositórios </h2>
                                            <ul>${repositoriesItens}</ul>
                                        </div>`
        }
        let eventsItens = ''
        user.events.forEach(event => {
            if((event.type === 'PushEvent'|| event.type === 'CreateEvent') && event.payload.description !== null){
                eventsItens += `<li><h4>${event.repo.name}</h4><p>- ${event.payload.commits[0].message}</p></li>`
            }else if((event.type === 'PushEvent'|| event.type === 'CreateEvent') && event.payload.description == null){
                eventsItens += `<li><h4>${event.repo.name}</h4><p>- Sem Commits</p></li>`
            }
        })
        
        
        if (user.events.length > 0) {
            this.userProfile.innerHTML += 
                                        `<div class="events section">
                                            <h2>Eventos</h2>
                                            <ul>${eventsItens}</ul>
                                        </div>`
        }
    
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
    
    
}

export {screen}
