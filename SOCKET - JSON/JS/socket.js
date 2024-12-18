// Effettua una richiesta per caricare il file JSON "socket.json"
fetch('../JSON/socket.json')
    .then(response => response.json()) // Converte la risposta della richiesta in un oggetto JSON
    .then(data => {
        // Aggiorna il titolo e la descrizione della pagina
        document.getElementById('pageTitle').textContent = data.pageTitle; // Imposta il titolo della pagina dal JSON
        document.getElementById('pageDescription').textContent = data.pageDescription; // Imposta la descrizione della pagina dal JSON

        // Sezione delle card: Creazione dinamica delle card per i link
        const cardContainer = document.getElementById('cardContainer'); // Seleziona il contenitore delle card
        data.socket.links.forEach(link => { // Itera attraverso l'array `links` all'interno della chiave `socket` nel JSON
            const card = document.createElement('div'); // Crea un elemento <div> per ogni card
            card.classList.add('col-md-6'); // Applica la classe per la larghezza (es. layout Bootstrap)
            
            // Struttura HTML della card
            card.innerHTML = `
                <div class="card">
                    <img src="${link.img}" class="card-img-top" alt="${link.name}"> <!-- Immagine della card -->
                    <div class="card-body">
                        <h5 class="card-title">${link.name}</h5> <!-- Titolo della card -->
                        <p class="card-text">${link.description}</p> <!-- Descrizione della card -->
                        <a href="${link.href}" class="btn btn-primary">Scopri di più</a> <!-- Link -->
                    </div>
                </div>
            `;
            cardContainer.appendChild(card); // Aggiunge la card al contenitore
        });

        // Aggiorna il contenuto del footer
        document.getElementById('footerText').textContent = data.footer.text; // Aggiorna il testo principale del footer
        document.getElementById('footerSmallText').innerHTML = data.footer.smallText; // Aggiorna il testo secondario, con supporto per HTML
    })
    .catch(error => console.error('Errore nel caricare il JSON:', error)); // Gestisce errori nella richiesta o parsing del JSON
