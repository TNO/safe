# C2 App GUI

The GUI is served by the server.

## Getting started

Before you can use it, please create your `Mapbox` access token from [here](https://account.mapbox.com), and insert it into the `.env` file (you can copy the `.env.example` to `.env`).


## LLM model

### **Vertaling van de onafhankelijke categorieën naar het Nederlands**  

#### **1. Operationele Omgeving (Externe Context & Dreigingsniveau)**

Deze categorie beschrijft de externe situatie waarin het schip opereert, inclusief geopolitieke, tactische en omgevingsfactoren.  

##### **1.1 Strategische Context** (Waarom het schip opereert)

- **Vredestijd Routine** – Standaard training, onderhoud en aanwezigheidspatrouilles.  
- **Afschrikking & Machtsvertoon** – Opereren in betwiste gebieden om dominantie te tonen.  
- **Gevechtsoperaties** – Actieve betrokkenheid bij vijandelijke strijdkrachten in oorlogstijd.  
- **Humanitaire Hulp & Rampenbestrijding** – Bieden van hulp en medische ondersteuning.  
- **Geheime & Inlichtingenoperaties** – Ongedetecteerd opereren voor verkenning.  
- **Onstabiele/Grijze Zone Conflicten** – Opereren in hybride oorlogsvoeringzones met onduidelijke dreigingen.  

##### **1.2 Dreigingsniveau** (Hoe gevaarlijk de omgeving is)

- **Laag (Veilige Zone)** – Geen directe dreiging, routinematige navigatie.  
- **Matig (Potentiële Vijandigheid)** – Mogelijke aanwezigheid van tegenstanders, oplopende spanningen.  
- **Hoog (Dreigend Conflict)** – Vijandelijke eenheden gedetecteerd, kans op confrontatie.  
- **Kritiek (Actief Gevecht)** – Directe betrokkenheid bij vijandelijkheden.  

---

#### **2. Gereedheid van het Schip (Interne Voorbereiding & Houding)**

Deze categorie beschrijft hoe het schip is geconfigureerd en voorbereid op zijn missie.  

##### **2.1 Gereedheidshouding** (Algemene status van het schip)

- **Routinematige Operaties** – Standaard wachtindelingen, training en onderhoud.
- **Verhoogde Paraatheid** – Gedeeltelijke gevechtsgereedheid, systemen geactiveerd.  
- **Volledige Gevechtsgereedheid** – Wapens geladen, sensoren op volle capaciteit, verdedigingssystemen actief.  
- **Schadebeheersing & Noodoperaties** – Actief reageren op schade of noodsituaties.  
- **Missiespecifieke Configuratie** – Aangepast voor humanitaire hulp, speciale operaties of verkenning.  
- **Stilte/Onzichtbaar Opereren** – Uitzendbeperkingen en lage zichtbaarheid voor geheime operaties.  

##### **2.2 Middelenstatus** (Hoe duurzaam de operaties zijn)

- **Volledig Bevoorraad** – Brandstof, munitie, voedsel en voorraden op peil.  
- **Duurzame Operaties** – Voorraden raken op, maar zijn nog beheersbaar.  
- **Kritieke Tekorten** – Lage brandstof, munitie of voorraden die operationele capaciteiten beïnvloeden.  
- **Gedegradeerde Systemen** – Gevechtsschade, mechanische defecten of systeemstoringen.  

---

#### **3. Geestestoestand van de Bemanning (Psychologische en Gedragsmatige Staat)**

Deze categorie beschrijft de psychologische en gedragsmatige toestand van het personeel aan boord.  

##### **3.1 Psychologische Staat** (Hoe de bemanning zich voelt)

- **Routine/Stabiel** – Normaal moreel, standaard dienstroosters.  
- **Voorzichtig/Gedisciplineerd** – Verhoogde waakzaamheid, strikte naleving van protocollen.  
- **Spannend/Ongerust** – Zorg over mogelijke dreigingen, lichte stress.  
- **Agressief/Vastberaden** – Gefocust op missiesucces, gevechtsmentaliteit.  
- **Gestrest/Overwerkt** – Hoge operationele belasting, vermoeidheid begint in te zetten.  
- **Uitgeput/Slagmoe** – Ernstige vermoeidheid, dalend moreel.  
- **Gemotiveerd/Geïnspireerd** – Hoog moreel door missiesucces of betekenisvol werk (bijv. humanitaire hulp).  

##### **3.2 Gedragsmatige Paraatheid** (Hoe de bemanning presteert)

- **Trainingsmodus** – Oefeningen en vaardigheidsontwikkeling.  
- **Efficiënt & Effectief** – Optimaal presteren, soepele uitvoering.  
- **Belast & Overbelast** – Functionerend, maar met toenemende stress.  
- **Verminderde Effectiviteit** – Vermoeidheid of morele problemen verminderen prestaties.  
- **Crisismodus** – Volledig gericht op noodsituatiebeheer.  

---

## **Toepassing op de Voorbeelden van Commander's Intent in SURG**  

1. **Defensieve Houding in een Gespannen Situatie**  
   - **Commander's Intent:** *"Behoud een sterke defensieve houding terwijl escalatie met buitenlandse schepen wordt vermeden."*  
   - **Operationele Omgeving:** *Afschrikking & Machtsvertoon, Matige Dreiging*  
   - **Gereedheid van het Schip:** *Verhoogde Paraatheid, Volledig Bevoorraad*  
   - **Geestestoestand van de Bemanning:** *Voorzichtig/Gedisciplineerd, Efficiënt & Effectief*  

2. **Agressieve Gevechtsoperaties**  
   - **Commander's Intent:** *"Verkrijg maritieme superioriteit door vijandelijke schepen in de operationele zone uit te schakelen."*  
   - **Operationele Omgeving:** *Gevechtsoperaties, Kritieke Dreiging*  
   - **Gereedheid van het Schip:** *Volledige Gevechtsgereedheid, Gedegradeerde Systemen (bij schade)*  
   - **Geestestoestand van de Bemanning:** *Agressief/Vastberaden, Crisismodus*  

   - Verkrijg maritieme superioriteit door vijandelijke schepen in de operationele zone uit te schakelen. Prioriteit lucht, water, onderwater.

3. **Rampenbestrijding en Humanitaire Hulp**  
   - **Commander's Intent:** *"Bied directe humanitaire hulp aan getroffen kustbevolkingen terwijl operationele veiligheid behouden blijft."*  
   - **Operationele Omgeving:** *Humanitaire Hulp & Rampenbestrijding, Lage Dreiging*  
   - **Gereedheid van het Schip:** *Missiespecifieke Configuratie, Volledig Bevoorraad*  
   - **Geestestoestand van de Bemanning:** *Gemotiveerd/Geïnspireerd, Efficiënt & Effectief*  

4. **Geheime Verkenning en Inlichtingenverzameling**  
   - **Commander's Intent:** *"Voer onopgemerkte observatie uit van vijandelijke marinebewegingen terwijl confrontatie wordt vermeden."*  
   - **Operationele Omgeving:** *Geheime & Inlichtingenoperaties, Hoge Dreiging*  
   - **Gereedheid van het Schip:** *Stilte/Onzichtbaar Opereren, Duurzame Operaties*  
   - **Geestestoestand van de Bemanning:** *Spannend/Ongerust, Belast & Overbelast*  

5. **Vrije Navigatieoperaties**  
   - **Commander's Intent:** *"Toon onze inzet voor internationaal zeerecht door aanwezigheid in betwiste wateren te behouden."*  
   - **Operationele Omgeving:** *Afschrikking & Machtsvertoon, Matige Dreiging*  
   - **Gereedheid van het Schip:** *Verhoogde Paraatheid, Volledig Bevoorraad*  
   - **Geestestoestand van de Bemanning:** *Voorzichtig/Gedisciplineerd, Efficiënt & Effectief*  

---

Deze uitgebreide classificatie biedt een gedetailleerd en consistent kader voor het analyseren van verschillende commander's intents en hun impact op de operationele status van een marineschip. Wil je verdere uitbreidingen of aanpassingen?
---

## **Uitbreiding: Vaarsnelheid, Manoeuvreren en Domeinprioriteit**  

**1. Vaarsnelheid** (Hoe snel het schip zich beweegt)  
- **Stationair** – Geen beweging, schip geankerd of afgemeerd.  
- **Langzaam (5-12 knopen)** – Brandstofbesparing, patrouillemodus, of opereren in een drukke haven.  
- **Cruisesnelheid (12-20 knopen)** – Standaard snelheid voor lange afstanden, economische snelheid.  
- **Operatiesnelheid (20-30 knopen)** – Actieve inzet, snelle reactievermogen vereist.  
- **Hoge Snelheid (+30 knopen)** – Maximale snelheid voor snelle verplaatsing of gevechtsacties.  

**2. Manoeuvreren** (Hoe het schip beweegt en zich positioneert)  
- **Vaste Koers** – Lineaire beweging zonder grote koerswijzigingen, typisch voor transit.  
- **Aanpasbaar** – Gereed om koers te wijzigen, maar zonder agressieve manoeuvres.  
- **Actieve Manoeuvres** – Frequent koers wijzigen om te reageren op tactische omstandigheden.  
- **Evasief** – Onregelmatige koerswijzigingen om vijandelijke detectie of aanvallen te ontwijken.  
- **Schip in Bescherming** – Gebruikmakend van kustlijnen, eilanden of andere schepen als dekking.  

**3. Domeinprioriteit** (Wat het belangrijkste operationele domein is)  
- **Primair Lucht** – Focus op luchtverdediging tegen vijandelijke vliegtuigen en raketten.  
- **Primair Oppervlakte** – Prioriteit voor vijandelijke schepen, kustdoelen en maritieme controle.  
- **Primair Onderwater** – Antionderzeebootoperaties (ASW), dreiging door onderzeeboten.  
- **Multi-domein** – Geen dominante focus, gelijke aandacht voor alle dreigingen.  

---

### **Toepassing op de Voorbeelden van Commander's Intent**  

1. **Defensieve Houding in een Gespannen Situatie**  
   - **Commander's Intent:** *"Behoud een sterke defensieve houding terwijl escalatie met buitenlandse schepen wordt vermeden."*  
   - **Vaarsnelheid:** *Langzaam (10-15 knopen)* – Brandstofefficiëntie en aanwezigheid tonen.  
   - **Manoeuvreren:** *Aanpasbaar* – Gereed om te reageren, maar zonder provocatie.  
   - **Domeinprioriteit:** *Primair Oppervlakte* – Dreiging van andere schepen heeft prioriteit.  

2. **Agressieve Gevechtsoperaties**  
   - **Commander's Intent:** *"Verkrijg maritieme superioriteit door vijandelijke schepen in de operationele zone uit te schakelen."*  
   - **Vaarsnelheid:** *Hoge Snelheid (+30 knopen)* – Snel herpositioneren om tactische voordelen te benutten.  
   - **Manoeuvreren:** *Actieve Manoeuvres* – Aanpassing op basis van vijandelijke acties.  
   - **Domeinprioriteit:** *Primair Oppervlakte* – Vijandelijke schepen zijn de primaire bedreiging.  

3. **Rampenbestrijding en Humanitaire Hulp**  
   - **Commander's Intent:** *"Bied directe humanitaire hulp aan getroffen kustbevolkingen terwijl operationele veiligheid behouden blijft."*  
   - **Vaarsnelheid:** *Langzaam (5-12 knopen)* – Zorgvuldig navigeren bij een getroffen kust.  
   - **Manoeuvreren:** *Vaste Koers* – Stabiele positie om goederen en personeel over te brengen.  
   - **Domeinprioriteit:** *Multi-domein* – Humanitaire focus, maar beveiliging tegen alle dreigingen.  

4. **Geheime Verkenning en Inlichtingenverzameling**  
   - **Commander's Intent:** *"Voer onopgemerkte observatie uit van vijandelijke marinebewegingen terwijl confrontatie wordt vermeden."*  
   - **Vaarsnelheid:** *Cruisesnelheid (12-20 knopen) of Stationair (indien observatie vereist is).*  
   - **Manoeuvreren:** *Schip in Bescherming* – Gebruik van eilanden of weersomstandigheden voor dekking.  
   - **Domeinprioriteit:** *Primair Onderwater (voor onderzeeboten) of Primair Oppervlakte (voor fregatten).*  

5. **Vrije Navigatieoperaties**  
   - **Commander's Intent:** *"Toon onze inzet voor internationaal zeerecht door aanwezigheid in betwiste wateren te behouden."*  
   - **Vaarsnelheid:** *Cruisesnelheid (12-20 knopen)* – Constante beweging zonder agressie.  
   - **Manoeuvreren:** *Vaste Koers* – Rechtlijnige doorvaart om claim te versterken.  
   - **Domeinprioriteit:** *Multi-domein* – Weerbaarheid tegen lucht-, oppervlak- en onderwaterdreigingen.  

---

Met deze toevoegingen biedt het model een **volledige operationele beschrijving** van maritieme missies en hun impact op de scheepsoperaties.  

Wil je nog verdere uitbreidingen of specifieke scenario’s uitwerken?
