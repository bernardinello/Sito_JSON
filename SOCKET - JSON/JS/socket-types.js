// Effettua una richiesta per caricare il file JSON "socket-types.json"
fetch('../JSON/socket-types.json')
    .then((res) => res.json()) // Converte la risposta HTTP in un oggetto JSON
    .then((data) => {
        // Navbar: aggiunge dinamicamente i link alla barra di navigazione
        const navbarLinks = document.getElementById('navbarLinks'); // Seleziona il contenitore della navbar
        data.navbar.links.forEach((link) => { // Itera su ogni elemento dell'array `links` nel JSON
            const li = document.createElement('li'); // Crea un elemento <li>
            li.className = 'nav-item'; // Assegna la classe Bootstrap per la navbar
            li.innerHTML = `<a class="nav-link" href="${link.href}">${link.text}</a>`; // Crea un link con il testo e l'href
            navbarLinks.appendChild(li); // Aggiunge l'elemento <li> al contenitore della navbar
        });

        // Aggiorna il titolo e la descrizione nella sezione hero
        document.querySelector('.hero-section h1').innerText = data.pageTitle; // Imposta il titolo
        document.querySelector('.hero-section p').innerText = data.pageDescription; // Imposta la descrizione

        // Socket Section: crea dinamicamente le card per ogni tipo di socket
        const socketLinksContainer = document.getElementById('socketLinksContainer'); // Seleziona il contenitore delle card
        data.socket.links.forEach((link) => { // Itera su ogni link nella sezione `socket.links` del JSON
            const div = document.createElement('div'); // Crea un contenitore <div>
            div.className = 'col-md-6'; // Assegna la classe Bootstrap per il layout a colonne
            div.innerHTML = `
                <div class="card shadow-sm"> <!-- Card con ombra -->
                    <img src="${link.img}" class="card-img-top" alt="${link.name}"> <!-- Immagine della card -->
                    <div class="card-body"> <!-- Corpo della card -->
                        <h5 class="card-title">${link.name}</h5> <!-- Titolo della card -->
                        <p class="card-text">${link.description}</p> <!-- Descrizione della card -->
                        <a href="${link.href}" class="btn btn-primary">Vai alla pagina</a> <!-- Pulsante con link -->
                    </div>
                </div>
            `;
            socketLinksContainer.appendChild(div); // Aggiunge la card al contenitore
        });

        // Footer: aggiorna il contenuto del footer con i dati dal JSON
        document.querySelector('footer p').innerText = data.footer.text; // Imposta il testo principale del footer
        document.querySelector('footer small').innerHTML = data.footer.smallText; // Imposta il testo aggiuntivo del footer
    })
    .catch((error) => {
        // Gestione degli errori: stampa un messaggio nella console in caso di errore
        console.error('Errore nel caricamento del file JSON:', error);
    });
