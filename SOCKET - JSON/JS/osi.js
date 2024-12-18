// Recupera il file JSON contenente i dati relativi al modello OSI
fetch('../JSON/osi.json')
    .then((res) => res.json()) // Converte la risposta della fetch in un oggetto JavaScript
    .then((data) => {
        // Navbar: Popola i link nella barra di navigazione
        const navbarLinks = document.getElementById('navbarLinks'); // Seleziona il contenitore dei link nella navbar
        data.navbar.links.forEach((link) => { // Itera attraverso l'array di link fornito dal JSON
            const li = document.createElement('li'); // Crea un elemento <li> per ogni link
            li.className = 'nav-item'; // Applica una classe CSS per lo stile (es. Bootstrap)
            li.innerHTML = `<a class="nav-link" href="${link.href}">${link.text}</a>`; // Aggiunge il link come contenuto HTML
            navbarLinks.appendChild(li); // Aggiunge l'elemento <li> alla lista nella navbar
        });

        // Titolo e descrizione: Aggiorna l'hero section con il titolo e la descrizione
        document.querySelector('.hero-section h1').innerText = data.pageTitle; // Imposta il titolo della pagina nella hero section
        document.querySelector('.hero-section p').innerText = data.pageDescription; // Imposta la descrizione della pagina nella hero section

        // Strati del modello OSI: Crea una lista degli strati del modello
        const osiLayersContainer = document.getElementById('osiLayersContainer'); // Seleziona il contenitore degli strati OSI
        data.osiLayers.forEach((layer) => { // Itera attraverso l'array degli strati OSI forniti dal JSON
            const li = document.createElement('li'); // Crea un elemento <li> per ogni strato
            li.className = `list-group-item list-group-item-${layer.class}`; // Aggiunge classi CSS per lo stile (es. colori diversi per Bootstrap)
            li.innerHTML = `<strong>${layer.name}:</strong> ${layer.description}`; // Inserisce il nome dello strato e la relativa descrizione
            osiLayersContainer.appendChild(li); // Aggiunge l'elemento <li> alla lista nel DOM
        });

        // Footer: Aggiorna il testo del footer
        document.querySelector('footer p').innerText = data.footer.text; // Imposta il testo del footer
    })
    .catch((error) => {
        // Gestione degli errori: Stampa un messaggio nella console se il caricamento fallisce
        console.error('Errore nel caricamento del file JSON:', error); // Registra l'errore nella console per il debug
    });
