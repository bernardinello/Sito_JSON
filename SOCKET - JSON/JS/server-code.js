// Carica il file JSON che contiene i dati di configurazione
fetch("../JSON/server-code.json")
  .then((response) => response.json()) // Converte la risposta in formato JSON
  .then((data) => {
    // Aggiorna il titolo della pagina con il valore preso dal JSON
    document.title = data.pageTitle;

    // Costruzione della Navbar
    const navbar = document.getElementById("navbar"); // Seleziona l'elemento con id "navbar"
    const navHTML = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">${data.navbar.brand}</a> <!-- Aggiunge il brand alla navbar -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span> <!-- Icona del pulsante per la visualizzazione mobile -->
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        ${data.navbar.links
                            .map((link) => {
                                // Gestisce i link nella navbar, inclusi i menu a discesa
                                if (link.dropdown) {
                                    // Se il link è un menu a discesa
                                    return ` 
                                        <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                ${link.text}
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                ${link.items
                                                    .map(
                                                        (item) => `<li><a class="dropdown-item" href="${item.href}">${item.text}</a></li>` // Crea i singoli item del menu
                                                    )
                                                    .join("")}
                                            </ul>
                                        </li>`;
                                } else {
                                    // Se non è un menu a discesa, crea un semplice link
                                    return `<li class="nav-item"><a class="nav-link" href="${link.href}">${link.text}</a></li>`;
                                }
                            })
                            .join("")}
                    </ul>
                </div>
            </div>
        </nav>`;
    navbar.innerHTML = navHTML; // Inserisce il codice HTML della navbar nel DOM

    // Sezione Hero (prima della pagina)
    const heroSection = document.getElementById("hero-section");
    heroSection.innerHTML = `
        <div class="hero-title-background">
            <h1>${data.heroSection.title}</h1> <!-- Titolo della sezione Hero -->
            <p>${data.heroSection.subtitle}</p> <!-- Sottotitolo della sezione Hero -->
        </div>`;

    // Sezione del contenuto principale
    const contentSection = document.getElementById("content-section");
    contentSection.innerHTML = `
        <h2 class="text-center">${data.content.sectionTitle}</h2> <!-- Titolo della sezione di contenuto -->
        <p>${data.content.description}</p> <!-- Descrizione della sezione di contenuto -->
        <pre><code class="language-${data.content.code.language}">${data.content.code.content}</code></pre> <!-- Blocco di codice -->
        <p>${data.content.note}</p>`; // Nota finale

    // Footer (piè di pagina)
    const footer = document.getElementById("footer");
    footer.innerHTML = `<p>${data.footer.text}</p>`; // Testo del footer
  })
  .catch((error) => console.error("Errore nel caricamento del JSON:", error)); // Gestione degli errori in caso di fallimento nel caricamento del JSON

