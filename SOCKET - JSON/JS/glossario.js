// Carica il file JSON contenente i termini del glossario
fetch('../JSON/glossario.json')
    .then((res) => res.json()) // Converte la risposta in formato JSON
    .then((data) => {
        // Seleziona il contenitore nel DOM dove verranno inseriti gli elementi del glossario
        const glossaryItemsContainer = document.getElementById('glossaryItemsContainer');
        
        // Itera attraverso ogni elemento del glossario presente nel file JSON
        data.glossaryItems.forEach((item) => {
            // Crea un nuovo elemento <div> per ogni termine del glossario
            const div = document.createElement('div');
            div.className = 'list-group-item'; // Aggiunge una classe per lo stile (es. Bootstrap)
            
            // Imposta il contenuto HTML del <div>, includendo il termine come link cliccabile e la definizione
            div.innerHTML = `
                <strong>
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer">
                        ${item.term}:
                    </a>
                </strong> 
                ${item.definition}`;
            
            // Aggiunge il <div> appena creato al contenitore principale nel DOM
            glossaryItemsContainer.appendChild(div);
        });
    })
    .catch((error) => {
        // Registra un messaggio di errore nella console se il caricamento del JSON fallisce
        console.error('Errore nel caricamento del file JSON:', error);
    });
