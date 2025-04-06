# Orders Management System

Tento projekt byl vytvořen jako zpracování části bakalářské práce Romana Perka na téma Porovnání komponentových knihoven pro vývoj v React. Webová aplikace pro správu objednávek je postavená na Reactu a Material-UI. Umožňuje uživatelům spravovat objednávky, přidávat nové objednávky, upravovat existující objednávky a zobrazovat statistiky objednávek.

## Funkcionality

- **Dashboard**: Přehled statistik objednávek, včetně distribuce platebních a doručovacích metod.
- **Přehled objednávek**: Tabulka všech objednávek s možností úprav, dokončení nebo smazání objednávky.
- **Nová objednávka**: Vícekrokový formulář pro přidání nové objednávky.
- **Statistiky**: Vizualizace dat pomocí grafů (Recharts).

## Technologie

- **React**: Pro tvorbu uživatelského rozhraní.
- **Material-UI**: Pro stylování a komponenty.
- **Recharts**: Pro vizualizaci dat.
- **React Router**: Pro navigaci mezi stránkami.
- **Context API**: Pro správu stavu objednávek.

## Struktura projektu

src/
├── components/ # Komponenty uživatelského rozhraní
│ ├── Dashboard/ # Komponenty pro dashboard
│ ├── NavBar/ # Navigační lišta
│ ├── NewOrder/ # Komponenty pro přidání nové objednávky
│ └── OrdersOverview/ # Komponenty pro přehled objednávek
├── context/ # Kontext pro správu stavu objednávek
├── hooks/ # Vlastní React hooky
├── pages/ # Stránky aplikace
├── App.js # Hlavní komponenta aplikace
└── index.js # Vstupní bod aplikace

## Instalace a spuštění

1. Naklonujte tento repozitář:
   git clone <URL_REPOZITÁŘE>
   cd baka-mui

   ## Instalace a spuštění

2. Nainstalujte závislosti:
   npm install

3. Spusťte aplikaci:
   npm start

4. Otevřete aplikaci v prohlížeči na adrese:
   (http://localhost:3000)

## Autor

Tento projekt byl vytvořen jako ukázková aplikace pro správu objednávek vývojářem Romanem Perkem.
