// Effettua una richiesta per caricare il file JSON "tcpudp.json"
fetch('../JSON/tcpudp.json')
    .then((res) => res.json()) // Converte la risposta HTTP in un oggetto JSON
    .then((data) => {
        // Sezione Navbar: aggiunge dinamicamente i link alla barra di navigazione
        const navbarLinks = document.getElementById('navbarLinks'); // Seleziona l'elemento della barra di navigazione
        data.navbar.links.forEach((link) => { // Itera su ogni elemento nell'array `links` del JSON
            const li = document.createElement('li'); // Crea un elemento <li>
            li.className = 'nav-item'; // Assegna la classe Bootstrap per gli elementi della navbar
            li.innerHTML = `<a class="nav-link" href="${link.href}">${link.text}</a>`; // Imposta il link con testo e href
            navbarLinks.appendChild(li); // Aggiunge l'elemento <li> alla barra di navigazione
        });

        // Aggiorna il titolo e la descrizione nella sezione "hero"
        document.querySelector('.hero-section h1').innerText = data.pageTitle; // Imposta il titolo della pagina
        document.querySelector('.hero-section p').innerText = data.pageDescription; // Imposta la descrizione della pagina

        // Sezione Differenze TCP vs UDP: crea dinamicamente una lista di differenze
        const tcpUdpDifferencesContainer = document.getElementById('tcpUdpDifferencesContainer'); // Seleziona il contenitore per le differenze
        data.tcpUdpDifferences.forEach((difference) => { // Itera sull'array `tcpUdpDifferences`
            const li = document.createElement('li'); // Crea un elemento <li>
            li.className = `list-group-item list-group-item-${difference.class}`; // Imposta una classe per lo stile (es. success, warning, danger)
            li.innerHTML = `<strong>${difference.name}:</strong> ${difference.description}`; // Aggiunge il nome e la descrizione
            tcpUdpDifferencesContainer.appendChild(li); // Aggiunge l'elemento <li> al contenitore
        });

        // Aggiorna il contenuto del footer
        document.querySelector('footer p').innerText = data.footer.text; // Imposta il testo del footer dal JSON
    })
    .catch((error) => {
        // Gestione degli errori: stampa un messaggio nella console in caso di problemi
        console.error('Errore nel caricamento del file JSON:', error);
    });
