// Carica il file JSON da "../JSON/client-code.json"
fetch("../JSON/client-code.json")
  .then((response) => response.json()) // Converte la risposta in formato JSON
  .then((data) => {
    // Aggiorna il titolo della pagina con il valore fornito dal JSON
    document.title = data.pageTitle;

    // Navbar
    const navbar = document.getElementById("navbar"); // Seleziona il contenitore della navbar
    const navHTML = `
      <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div class="container-fluid">
          <!-- Logo del sito o brand -->
          <a class="navbar-brand" href="#">${data.navbar.brand}</a>
          <!-- Bottone toggle per la visualizzazione mobile -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <!-- Contenitore per i link di navigazione -->
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              ${data.navbar.links
                .map((link) => {
                  // Controlla se il link ha un menu a tendina
                  if (link.dropdown) {
                    return `
                      <li class="nav-item dropdown">
                        <!-- Link principale con dropdown -->
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          ${link.text}
                        </a>
                        <!-- Menu a tendina -->
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                          ${link.items
                            .map(
                              // Genera le voci del menu dropdown
                              (item) => `<li><a class="dropdown-item" href="${item.href}">${item.text}</a></li>`
                            )
                            .join("")} <!-- Concatena tutte le voci -->
                        </ul>
                      </li>`;
                  } else {
                    // Genera un link standard (non dropdown)
                    return `<li class="nav-item"><a class="nav-link" href="${link.href}">${link.text}</a></li>`;
                  }
                })
                .join("")} <!-- Concatena tutti i link della navbar -->
            </ul>
          </div>
        </div>
      </nav>`;
    navbar.innerHTML = navHTML; // Inietta la struttura della navbar nel DOM

    // Hero Section
    const heroSection = document.getElementById("hero-section"); // Seleziona il contenitore della hero section
    heroSection.innerHTML = `
      <div class="hero-title-background">
        <!-- Titolo e sottotitolo della hero section -->
        <h1>${data.heroSection.title}</h1>
        <p>${data.heroSection.subtitle}</p>
      </div>`;

    // Content Section
    const contentSection = document.getElementById("content-section"); // Seleziona il contenitore della sezione contenuto
    contentSection.innerHTML = `
      <h2 class="text-center">${data.content.sectionTitle}</h2> <!-- Titolo della sezione -->
      <p>${data.content.description}</p> <!-- Descrizione -->
      <!-- Codice formattato con la libreria di evidenziazione (ad esempio, Prism.js) -->
      <pre><code class="language-${data.content.code.language}">${data.content.code.content}</code></pre>
      <p>${data.content.note}</p> <!-- Nota finale -->`;

    // Footer
    const footer = document.getElementById("footer"); // Seleziona il contenitore del footer
    footer.innerHTML = `<p>${data.footer.text}</p>`; // Inietta il testo del footer
  })
  .catch((error) => console.error("Errore nel caricamento del JSON:", error)); // Gestisce eventuali errori durante il caricamento o il parsing del JSON
