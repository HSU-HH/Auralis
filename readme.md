# AURALIS Skin

Auralis ist der ILIAS-Skin der Helmut-Schmidt-Universität / Universität der Bundeswehr Hamburg.  

<br>

## Allgemein

Der Auralis-Skin basiert auf dem Standard-Skin DELOS und stellt viele, zusätzliche Features bereit.  
Die grundlegende Maßgabe für die Entwicklung des Auralis-Skin war die Reversibilität. Der Auralis-Skin ist vollständig 
reversibel entwickelt worden, so dass keine zusätzlichen Patches für die Plattform benötigt werden.

<br>

### Version

Auralis-Version: 1.0 (ILIAS-Version: 9.14)

<br>

## Features

### Übersicht

- Copy-Link - Button
- Scroll-To-Top - Button
- Page-Position - Marker
- Content-Loader
- Sticky Page-Menu (Desktop-Ansicht)
- Banner-Images
- Parallax-Images
- Image-Copyrights
- FlipCards
- Background-Images on Blocks

<br>

### Features im Detail

#### <span><img src="images/icons/copylink.svg" width="24" height="24" alt="Copy Icon" style="vertical-align: middle;">&nbsp;</span> Copy-Link - Button

Erstellt ein Icon neben den Breadcrumbs, womit beim klicken auf das Icon der permanente Link zu dem aktuellen Objekt 
direkt in die Zwischenablage kopiert wird.
Gleichzeitig wird die Option aus dem Footer entfernt.

<br>

#### <span><img src="images/icons/arrow_up_4c6586.svg" width="20" height="20" alt="Copy Icon" style="border-radius: 50%; padding: 4px; border: 2px solid #1c1c1c; vertical-align: middle;">&nbsp;</span> Scroll-To-Top - Button

Fügt auf allen Seiten einen Scroll-To-Top Button ein, welcher beim scrollen auf der Seite eingeblendet wird. Beim 
klicken auf den Button wird ein sanfter Bildlauf zum Seitenanfang durchgeführt.

<br>

#### Page-Position - Marker

Der Page-Position - Marker zeigt unterhalb der Breadcrumbs die Scrollposition auf der Seite als waagerechter Balken an. 
Dies ermöglicht eine Orientierung über die Scrollposition auf der Seite auch bei ausgeblendeten Scrollleisten. 

<br>

#### <span><img src="images/media/loader.svg" width="12" height="12" alt="Copy Icon" style="vertical-align: middle;">&nbsp;</span> Content-Loader

So lange eine Seite geladen wird, wird das Loader-Icon angezeigt. Dies verhindert, dass Glitches, welche durch den 
Umbau des DOM durch den Skin erfolgen sichtbar werden.
Das Hauptmenü und der Header bleiben weiter sichbar.

<br>

#### Sticky Page-Menü

Das Seiten-Menü wird grundsätzich unterhalb der Breadcrumbs angezeigt. Beim scrollen wird das Menü ausgeblendet um
den maximalen Bereich für den Content frei zu halten. Sobald der Mauszeiger knapp unterhalb die Breadcrumbs geführt
wird, rollt das Menü automatisch wieder auf. So können Nutzende das Menü bei Bedarf jederzeit auf der Seite öffnen
um weitere Aktionen durchzuführen.

Zusätzlich ist ein Menü-Pin implementiert worden, um das Menü dauerhaft bei größeren Umbauten anzuzeigen. Der Status
des Menüs wird bei jedem Nutzer als Cookie gespeichert. Der Initialwert ist deaktiviert, so dass das Menü immer 
ausgeblendet wird, sofern kein Cookie gesetzt ist.

<br>

#### Banner-Images

Für Kategorien, Kurse, Gruppen und Inhaltsseiten können über den Contentstyle des Media-Block ein Bannerbild ausgewählt
werden. Dabei gibt es die Versionen mit 50% oder 100% der Gesamthöhe des Bildschirms. Auf dem Bild wird automatisch
ein Scroll-To-Content - Button eingefügt, um mit einem Klick direkt zu eigentlichen Content zu scrollen. Das Scrollen 
wird als sanfter Bildlauf ausgeführt.

>
> **Hinweis:**  
> Um Banner-Images verwenden zu können ist der AURALIS Content-Style nötig, um eine einwandfreie Funktion sicher 
> zu stellen.  
> 

<br>

#### Parallax-Images

Parallax-Images sind ein Design-Element, um Inhalte von Webseiten attraktiv aufzuwerten. Um ein Parallax-Image zu 
erstellen, muss der Block Parallax im Content eingefügt werden und dort ein Media-Container mit einem Bild.


>
> **Hinweis:**  
> Um Banner-Images verwenden zu können ist der AURALIS Content-Style nötig, um eine einwandfreie Funktion sicher
> zu stellen.
>

<br>

#### Image-Copyright

Viele Bilder unterliegen Urheberrechten. Um eine gültige Urheberrechtsangabe einzufügen, wird vom AURALIS-Skin die 
Bildbeschreibung verwendet. Wenn ein (c) oder (C) mit einem Text angegeben wird, wird dieser als Copyright-Angabe 
vom Skin interpretiert und mit dem &copy; - Zeichen als Hover-Overlay eingefügt. Wenn zu der Copyrightangabe noch 
eine zusätzliche Bildbeschreibung eingefügt werden soll, muss die Angabe der Copyright-Informationen in "" und mit
einem (c) oder (C) beginnend eingefügt werden. Alles zwischen den "" wird dann als Copyrightangabe interpretiert,
der übrige Text wird als Bildbeschreibung interpretiert.

<br>

#### FlipCards

Ermöglicht das Einbinden von FlipCards auf der Seite. In der Desktop-Ansicht dreht sich die Karte beim hovern des
Mauszeigers über der jeweiligen FlipCard um. In der mobilen und der Tablet-Ansicht erfolgt dies durch einen Klick
auf die Karte. Dabei werden alle umgedrehten Karten wieder zurück gedreht.


>
> **Hinweis:**  
> Um FlipCards verwenden zu können ist der AURALIS Content-Style nötig, um eine einwandfreie Funktion sicher
> zu stellen.
>

<br>

#### Background-Images

Ermöglicht das Einfügen von Hintergrundbildern in Blöcke bei der Bearbeitung der Seite mit dem Seiteneditor.


>
> **Hinweis:**  
> Um Background-Images verwenden zu können ist der AURALIS Content-Style nötig, um eine einwandfreie Funktion sicher
> zu stellen.
>

<br>

## Lizenz

### CC BY-NC-ND 4.0  

<br>

## Download und Setup

Zunächst muss in das root-Verzeichnis von der ILIAS-Installation gewechselt werden.  
Anschließend kann der Auralis-Skin aus den Repository in das skin-Verzeichnis gecloned werden.

**1. Skin-Verzeichnis erstellen, sofern dieses nicht vorhanden ist und in das Verzeichnis wechseln**

<pre>
mkdir ./Customizing/global/skin
cd ./Customizing/global/skin
</pre>

**2. Auralis-Skin clonen**
<pre>
git clone -b release_9 https://github.com/HSU-HH/Auralis.git auralis
</pre>

Nach dem clonen ist der Auralis-Skin direkt Einsatzbereit und kann über die Administration (Administration > Layout und 
Navigation > Layout - System-Styles) aktiviert und Nutzer*innen zugewiesen werden.  

<br>

## Kontakt

### Entwicklerin  

**Bettina Solzbacher**  
Technische Leitung ILIAS-Supportteam  
Koordinationsstelle E-Lernen  
Helmut-Schmidt-Universität / Universität der Bundeswehr Hamburg  
  
E-Mail: **ilias@hsu-hh.de**  

<br>

## Credits

Die Schriftart **Montserrat** unterliegt dem Copyright von Designer **Julieta Ulanovsky** und steht unter der freien, offenen SIL Open Font License für private und kommerzielle Projekte.

<br>

## Disclaimer

Dieses Projekt wurde an der Helmut-Schmidt-Universität / Universität der Bundeswehr Hamburg (HSU/UniBw H) entwickelt.

Die Software wird „as is“ bereitgestellt, ohne jegliche ausdrückliche oder stillschweigende Gewährleistung, 
einschließlich, aber nicht beschränkt auf Garantien der Fehlerfreiheit, der Handelsüblichkeit, der Eignung für einen 
bestimmten Zweck oder der Nichtverletzung von Rechten Dritter.

Die Nutzung der Software erfolgt ausschließlich auf eigene Verantwortung.
Die HSU/UniBw H sowie die Autorinnen und Autoren übernehmen keinerlei Haftung für Schäden, die aus der Verwendung 
dieser Software entstehen, soweit ein solcher Ausschluss gesetzlich zulässig ist.

<br>
<br>







