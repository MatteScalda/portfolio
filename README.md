# Portfolio di Matteo — Next.js + PayloadCMS

Il sito pubblico conserva il design attuale e le lingue italiano/inglese. PayloadCMS è integrato nello stesso progetto Next.js e si apre su `/admin`.

## Avvio locale

Requisiti: Node.js `^22.23.4` oppure `>=24.22.1`, npm.

```bash
npm ci
cp .env.example .env
```

Imposta in `.env` un `PAYLOAD_SECRET` casuale, generabile con:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Poi inizializza il database e importa i contenuti:

```bash
npm run cms:migrate
npm run cms:seed
npm run dev
```

Apri [il sito](http://localhost:3000/it) oppure [il pannello](http://localhost:3000/admin). Al primo accesso al pannello crea il tuo account amministratore. L’importazione non crea credenziali predefinite. Il database locale e il segreto sono già stati preparati nella copia di lavoro usata per questa integrazione.

## Gestione dei contenuti

- **Progetti:** titolo e descrizione tradotti, immagine, tecnologie, link, anno e ordine. Attiva **Pubblicato** per mostrare il progetto sul sito. I progetti non pubblicati sono esclusi anche dalle API pubbliche.
- **Immagini:** caricamento con testo alternativo tradotto e anteprima ridimensionata. I file vengono salvati in `media/`.
- **Tecnologie:** nome, categoria, colore, link e ordine. I nomi esistenti riconoscono le icone già presenti nel sito; nuove tecnologie mostrano comunque il nome.
- **Testi del sito:** presentazione, biografia, titoli delle sezioni, navigazione, contatti, footer e metadati SEO. Seleziona la lingua nel pannello. Nella biografia puoi usare `<highlight>testo</highlight>`.
- **Impostazioni del sito:** nome, dominio pubblico, email, telefono e profili social.

Il plugin ufficiale `@payloadcms/plugin-seo` è disponibile in **Testi del sito → SEO**. Seleziona la lingua e imposta titolo, descrizione e immagine social. La scheda include contatori, indicazioni di completezza, pulsanti per generare titolo e descrizione dai testi disponibili e l’anteprima del risultato di ricerca. Il sito usa questi valori nei metadati HTML, Open Graph e nelle card Twitter/X; canonical e lingue alternative restano generati automaticamente. I metadati precedenti sono conservati e trasferiti nei nuovi campi dalla migrazione, mentre il seed inizializza quelli delle nuove installazioni. Se un campo SEO è vuoto, il sito usa i metadati precedenti nella lingua richiesta.

Le modifiche salvate compaiono ricaricando il sito, senza ricompilazione. I testi non compilati usano quelli originali nella lingua richiesta; per i progetti una traduzione mancante usa l’italiano. È possibile rimuovere tutti i progetti o tutte le tecnologie: non verranno ripristinati automaticamente.

`cms:seed` importa i testi solo se non sono già inizializzati in quella lingua e aggiunge progetti/tecnologie mancanti identificandoli per slug/nome. Non sovrascrive record esistenti. Eseguilo solo per inizializzare: se elimini volontariamente un contenuto iniziale e lo riesegui, il contenuto verrà aggiunto nuovamente. I dati originali sono conservati in `messages/` e `src/data/` come fonte dell’importazione.

## Database e aggiornamenti

SQLite risiede in `data/portfolio.db`. `.env`, database e immagini caricate sono esclusi da Git. Conserva backup del database e di `media/`, insieme al segreto; ferma il processo durante la copia del database per ottenere un backup coerente.

Le modifiche allo schema sono esplicite, anche in sviluppo. Dopo aver cambiato collezioni o campi:

```bash
npm run cms:migrate:create -- nome_modifica
npm run cms:migrate
npm run cms:types
npm run cms:importmap
```

Versiona i file generati in `src/migrations/`, `src/payload-types.ts` e la mappa di importazione del pannello. Non eseguire comandi di reset sul database contenente i tuoi contenuti.

## Verifiche e build

```bash
npm run lint
npm run typecheck
npm run test:cms
npm run build
npm start
```

Il flusso GitHub Actions verifica l’applicazione con un database temporaneo; il vecchio deployment statico su GitHub Pages è stato sostituito perché il CMS richiede un processo Node.js.

## Futuro trasferimento su un server Node.js

Questa integrazione usa un processo Next.js standard. La disponibilità e la configurazione di Node.js del piano SiteGround andranno verificate prima della pubblicazione.

1. Installa una versione Node.js compatibile e imposta la cartella del progetto come directory di lavoro.
2. Configura `PAYLOAD_SECRET`, `DATABASE_URL` e `PAYLOAD_PUBLIC_SERVER_URL` con il dominio HTTPS definitivo. Aggiorna anche **URL del sito** nel pannello.
3. Conserva database e cartella `media/` su disco persistente e scrivibile dall’applicazione. Per il database puoi impostare un percorso assoluto, ad esempio `file:/percorso/persistente/portfolio.db`.
4. Per trasferire i contenuti locali, ferma l’applicazione e copia database e `media/`; il database include anche la cronologia delle migrazioni. In alternativa, su un database nuovo esegui `npm run cms:migrate` e poi `npm run cms:seed`.
5. Esegui `npm ci`, `npm run cms:migrate`, `npm run build`, poi avvia `npm start` con un gestore di processi. `PORT` configura la porta.
6. Configura HTTPS, proxy, backup e invio email prima dell’uso pubblico. Senza un adattatore email i messaggi di recupero password sono solo scritti nei log.

La configurazione SQLite è adatta a un singolo processo con disco persistente. Se l’hosting richiederà più istanze o un filesystem effimero, serviranno database e archiviazione condivisi. `PAYLOAD_MEDIA_DIR` permette di impostare un percorso persistente assoluto per le immagini.

Documentazione: [installazione Payload](https://payloadcms.com/docs/getting-started/installation), [SQLite e migrazioni](https://payloadcms.com/docs/database/sqlite).
