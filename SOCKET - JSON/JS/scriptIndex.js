// Funzione per caricare e parse il JSON
function loadJSON() {
    // Esegue una richiesta fetch al file JSON
    fetch('../JSON/index.json') // Carica il file JSON dalla cartella JSON
    .then(response => response.json())  // Converte la risposta in formato JSON
    .then(jsonData => generateHTML(jsonData))  // Passa i dati JSON alla funzione generateHTML
    .catch(error => console.log("Errore nel caricamento del JSON: ", error)); // Gestisce eventuali errori
}

// Funzione per generare l'HTML dinamicamente
function generateHTML(jsonData) {
    const body = jsonData.html.body; // Estrae la sezione "body" dal JSON
    const contentDiv = document.getElementById("content"); // Seleziona il div principale per il contenuto

    // Crea la Navbar
    const nav = document.createElement('nav'); // Crea l'elemento <nav>
    nav.className = body.nav.class; // Applica la classe definita nel JSON

    // Crea il contenitore della navbar
    const divNav = document.createElement('div'); // Contenitore principale della navbar
    divNav.className = body.nav.div.class; // Applica la classe definita nel JSON

    // Crea il link del brand
    const a = document.createElement('a'); // Link al logo o brand
    a.className = body.nav.div.a.class; // Applica la classe dal JSON
    a.href = body.nav.div.a.href; // Imposta il link all'indirizzo fornito
    a.textContent = body.nav.div.a.text; // Imposta il testo visibile
    divNav.appendChild(a); // Aggiunge il link al contenitore della navbar

    // Aggiungi il bottone per la navbar mobile
    const button = document.createElement('button'); // Bottone per il toggle in modalità mobile
    button.className = 'navbar-toggler'; // Classe bootstrap per il bottone
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'collapse'); // Attributi per il comportamento della navbar
    button.setAttribute('data-bs-target', '#navbarNav');
    button.setAttribute('aria-controls', 'navbarNav');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Toggle navigation');
    button.innerHTML = '<span class="navbar-toggler-icon"></span>'; // Icona del bottone

    // Aggiungi la lista dei link (con le tue pagine)
    const divNavbarCollapse = document.createElement('div'); // Contenitore per il menu mobile
    divNavbarCollapse.className = 'collapse navbar-collapse'; // Classe bootstrap
    divNavbarCollapse.id = 'navbarNav';

    const ul = document.createElement('ul'); // Lista non ordinata per i link della navbar
    ul.className = 'navbar-nav mx-auto mb-2 mb-lg-0'; // Classi bootstrap per il layout

    // Crea le voci del menu
    const pages = [
        { href: "index.html", text: "Home" },
        { href: "socket.html", text: "Cos'è una Socket?" },
        { href: "osi.html", text: "Modello OSI" },
        { href: "tcpudp.html", text: "TCP vs UDP" },
        { href: "glossario.html", text: "Glossario" }
    ];

    // Aggiungi ogni voce alla lista
    pages.forEach(page => {
        const li = document.createElement('li'); // Crea un elemento <li>
        li.className = 'nav-item'; // Applica la classe dal JSON o fissa
        const link = document.createElement('a'); // Crea il link
        link.className = 'nav-link'; // Classe bootstrap per i link
        link.href = page.href; // URL del link
        link.textContent = page.text; // Testo del link
        li.appendChild(link); // Aggiunge il link alla lista
        ul.appendChild(li); // Aggiunge l'elemento <li> alla lista <ul>
    });

    divNavbarCollapse.appendChild(ul); // Aggiunge la lista al contenitore del menu

    // Aggiungi il bottone e il div contenente la lista alla navbar
    nav.appendChild(divNav);
    nav.appendChild(button);
    nav.appendChild(divNavbarCollapse);

    contentDiv.appendChild(nav); // Aggiunge la navbar al contenitore principale

    // Crea la Hero Section
    const heroSection = document.createElement('div'); // Sezione introduttiva
    heroSection.className = body.heroSection.class; // Applica la classe dal JSON
    const divHero = document.createElement('div'); // Contenitore interno
    divHero.className = body.heroSection.div.class; // Classe interna
    const h1 = document.createElement('h1'); // Titolo principale
    h1.textContent = body.heroSection.div.h1; // Contenuto dal JSON
    const p = document.createElement('p'); // Descrizione
    p.textContent = body.heroSection.div.p; // Contenuto dal JSON
    divHero.appendChild(h1); // Aggiunge il titolo al contenitore
    divHero.appendChild(p); // Aggiunge il paragrafo al contenitore
    heroSection.appendChild(divHero); // Aggiunge il contenitore alla hero section
    contentDiv.appendChild(heroSection); // Aggiunge la hero section al contenitore principale

    // Crea il contenuto principale
    const container = document.createElement('div'); // Contenitore generale
    container.className = body.container.class; // Classe dal JSON
    const h2 = document.createElement('h2'); // Sottotitolo
    h2.textContent = body.container.h2; // Testo del sottotitolo
    const paragraph = document.createElement('p'); // Paragrafo descrittivo
    paragraph.textContent = body.container.p; // Testo dal JSON
    const alertDiv = document.createElement('div'); // Contenitore per messaggi
    alertDiv.className = body.container.div.class; // Classe dal JSON
    alertDiv.setAttribute('role', body.container.div.role); // Attributo role
    alertDiv.textContent = body.container.div.text; // Testo del messaggio
    container.appendChild(h2); // Aggiunge il sottotitolo al contenitore
    container.appendChild(paragraph); // Aggiunge il paragrafo
    container.appendChild(alertDiv); // Aggiunge il messaggio
    contentDiv.appendChild(container); // Aggiunge il contenitore principale

    // Crea il footer
    const footer = document.createElement('footer'); // Sezione footer
    footer.className = body.footer.class; // Classe dal JSON
    const footerText = document.createElement('p'); // Testo del footer
    footerText.textContent = body.footer.p; // Contenuto dal JSON
    footer.appendChild(footerText); // Aggiunge il testo al footer
    contentDiv.appendChild(footer); // Aggiunge il footer al contenitore principale

    // Inietta il CSS dinamicamente
    const style = document.getElementById("dynamic-style"); // Seleziona il tag <style> esistente
    style.innerHTML = ` // Aggiunge regole CSS definite nel JSON
        .hero-section {
            background: ${jsonData.css.heroSection.background};
            color: ${jsonData.css.heroSection.color};
            padding: ${jsonData.css.heroSection.padding};
            text-align: ${jsonData.css.heroSection.textAlign};
        }
        .hero-section h1 {
            font-size: ${jsonData.css.heroSection.h1.fontSize};
            font-weight: ${jsonData.css.heroSection.h1.fontWeight};
            text-shadow: ${jsonData.css.heroSection.h1.textShadow};
        }
        .hero-section p {
            font-size: ${jsonData.css.heroSection.p.fontSize};
            margin-top: ${jsonData.css.heroSection.p.marginTop};
        }
        .navbar {
            background-color: ${jsonData.css.navbar.backgroundColor};
            border-bottom: ${jsonData.css.navbar.borderBottom};
            box-shadow: ${jsonData.css.navbar.boxShadow};
        }
        .navbar .nav-link {
            color: ${jsonData.css.navbar.navLink.color};
            font-weight: ${jsonData.css.navbar.navLink.fontWeight};
            padding: ${jsonData.css.navbar.navLink.padding};
            border-radius: ${jsonData.css.navbar.navLink.borderRadius};
            transition: ${jsonData.css.navbar.navLink.transition};
        }
        .navbar .nav-link:hover {
            background-color: ${jsonData.css.navbar.navLink.hover.backgroundColor};
            color: ${jsonData.css.navbar.navLink.hover.color};
        }
        footer {
            background-color: ${jsonData.css.footer.backgroundColor};
            text-align: ${jsonData.css.footer.textAlign};
            padding: ${jsonData.css.footer.padding};
        }
    `;
}

// Carica il JSON quando il documento è pronto
window.onload = loadJSON;
