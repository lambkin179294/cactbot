import { Lang } from '../../../resources/languages';
import { LocaleObject, LocaleText } from '../../../types/trigger';

export const translate = <T>(lang: Lang, obj: LocaleObject<T>): T => {
  return obj[lang] ?? obj['en'];
};

type Translation = { [selector: string]: LocaleText };

const emulatorButtons: Translation = {
  '.yesButton': {
    en: 'Yes',
    de: 'Ja',
    fr: 'Oui',
  },
  '.noButton': {
    en: 'No',
    de: 'Nein',
    fr: 'Non',
  },
  '.closeButton': {
    en: 'Close',
    de: 'Schließen',
    fr: 'Fermer',
  },
  '.doneButton': {
    en: 'Done<span class="doneBtnTimeout"></span>',
    de: 'Fertig<span class="doneBtnTimeout"></span>',
    fr: 'Terminé<span class="doneBtnTimeout"></span>',
  },
  '.loadNetworkLogButton': {
    en: 'Load Network Log',
    de: 'Lade Network Log',
    fr: 'Charger Network Log',
  },
  '.exportDBButton': {
    en: 'Export DB',
    de: 'DB exportieren',
    fr: 'Export DB',
  },
  '.importDBButton': {
    en: 'Import DB',
    de: 'DB importieren',
    fr: 'Import DB',
  },
  '.clearDBButton': {
    en: 'Clear DB',
    de: 'DB leeren',
    fr: 'Nettoyer DB',
  },
} as const;

const emulatorTitle: Translation = {
  '.title': {
    en: 'Cactbot Raid Emulator',
    de: 'Cactbot Raid Emulator',
    fr: 'Cactbot Raid Emulator',
  },
} as const;

const emulatorImportModal: Translation = {
  '.importProgressModal .modal-title': {
    en: 'Log File Import Progress',
    de: 'Fortschritt des Logdatei Imports',
    fr: 'Import du fichier log en cours',
  },
  '.importProgressModal .modal-body-contents': {
    en: `<h3>Latest encounter:</h3>
    Zone: <span class="zone"></span><br />
    Encounter: <span class="encounter"></span><br />
    Start: <span class="start"></span><br />
    End: <span class="end"></span><br />
    Duration: <span class="durMins"></span>m<span class="durSecs"></span>s<br />
    Pull Duration: <span class="pullMins"></span>m<span class="pullSecs"></span>s<br />
    Started By: <span class="startedBy"></span><br />
    End Status: <span class="endStatus"></span><br />
    Line Count: <span class="lineCount"></span><br />`,
    de: `<h3>Letzter Kampf:</h3>
    Zone: <span class="zone"></span><br />
    Kampf: <span class="encounter"></span><br />
    Start: <span class="start"></span><br />
    Ende: <span class="end"></span><br />
    Dauer: <span class="durMins"></span>m<span class="durSecs"></span>s<br />
    Dauer des Versuchs: <span class="pullMins"></span>m<span class="pullSecs"></span>s<br />
    Gestartet von: <span class="startedBy"></span><br />
    Endstatus: <span class="endStatus"></span><br />
    Zeilenanzahl: <span class="lineCount"></span><br />`,
    fr: `<h3>Dernier Combat :</h3>
    Zone : <span class="zone"></span><br />
    Combatant : <span class="encounter"></span><br />
    Début : <span class="start"></span><br />
    Fin : <span class="end"></span><br />
    Durée : <span class="durMins"></span>m<span class="durSecs"></span>s<br />
    Durée du pull : <span class="pullMins"></span>m<span class="pullSecs"></span>s<br />
    Démarré par : <span class="startedBy"></span><br />
    Status de fin : <span class="endStatus"></span><br />
    Nombre de lignes : <span class="lineCount"></span><br />`,
  },
} as const;

const emulatorDeleteModal: Translation = {
  '.deleteDBModal .modal-title': {
    en: 'Delete Encounter Database',
    de: 'Lösche Kampfdatenbank',
    fr: 'Effacer la base de données du combat',
  },
  '.deleteDBModal .modal-body': {
    en: '<p>You are about to delete the encounter database. Are you sure?</p>',
    de: '<p>Du bist kurz davor die Kampfdatenbank zu löschen. Bist du sicher?</p>',
    fr:
      '<p>Vous êtes sur le point de supprimer la base de données du combat. En êtes-vous sûr ?</p>',
  },
} as const;

const emulatorIntroModal: Translation = {
  '.introModal .modal-title': {
    en: 'Introduction',
    de: 'Einführung',
    fr: 'Introduction',
  },
  '.introModal .modal-body': {
    en: `<p>Welcome to the Raid Emulator.</p>
    <p>This tool replays encounters and shows what triggers were fired when, and allows you to view the encounter from any player's perspective.</p>
    <p>This tool optionally accepts an <strong>OVERLAY_WS</strong> parameter to connect to an ACT web socket with both ngld's OverlayPlugin and the Cactbot plugin loaded.</p>
    <p>If connected to a web socket, this tool will load and respect user configuration files for cactbot/raidboss.</p>
    <p>No overlays need to be created.</p>
    <p>Current WebSocket status: <span class="d-none websocketConnected text-success">Connected</span><span class="websocketDisconnected text-warning">Disconnected</span>.</p>
    <p>To get started, you need to import an encounter via one of the following options:</p>
    <p>
      <ul>
        <li>Drag and drop a network log file from <code>%APPDATA%/Advanced Combat Tracker/FFXIVLogs/</code> on to the page</li>
        <li>Click the <code>Load Network Log</code> button in the bottom drawer and select a network log file from <code>%APPDATA%/Advanced Combat Tracker/FFXIVLogs/</code></li>
      </ul>
    </p>
    <p>Then, select an encounter via the bottom drawer.</p>
    <p>Once you have loaded an encounter, you can:</p>
    <p>
      <ul>
        <li>Change the current perspective by selecting a party member on the right</li>
        <li>Seek to any point in the encounter by clicking the bar at the top</li>
        <li>Hover over trigger indicators in the top bar to see their names</li>
        <li>See detailed information about triggers fired by clicking their button</li>
      </ul>
    </p>`,
    de: `<p>Willkommen zum Raid Emulator.</p>
    <p>Dieses Tool gibt Kämpfe wieder und zeigt, welche Trigger wann ausgeführt wurden, und ermöglicht es, die Kämpfe aus der Perspektive eines beliebigen Spielers zu betrachten.</p>
    <p>Dieses Tool akzeptiert optional einen <strong>OVERLAY_WS</strong>-Parameter, um sich mit einem ACT-Websocket zu verbinden, in dem sowohl das OverlayPlugin von ngld als auch das Cactbot-Plugin geladen sind.</p>
    <p>Wenn eine Verbindung zu einem Websocket besteht, lädt dieses Tool die Konfigurationsdateien für cactbot/raidboss und benutzt diese.</p>
    <p>Es müssen keine Overlays erstellt werden.</p>
    <p>Aktueller WebSocket-Status: <span class="d-none websocketConnected text-success">Verbunden</span><span class="websocketDisconnected text-warning">Trennt die Verbindung</span>.</p>
    <p>Um loszulegen, muss ein Kampf über eine der folgenden Optionen importiert werden:</p>
    <p>
      <ul>
        <li>Ziehe eine Network-Logdatei aus <code>%APPDATA%/Advanced Combat Tracker/FFXIVLogs/</code> auf die Seite</li>
        <li>Klicke auf die Schaltfläche <code>Lade Network Log</code> in dem unteren Bereich und wähle ein Network Log aus <code>%APPDATA%/Advanced Combat Tracker/FFXIVLogs/</code></li>
      </ul>
    </p>
    <p>Dann wähle über den unteren Bereich einen Kampf aus.</p>
    <p>Sobald ein Kampf geladen wurde, können folgende Aktionen ausgeführt werden:</p>
    <p>
      <ul>
        <li>Wechseln der aktuelle Perspektive, indem ein Gruppenmitglied auf der rechten Seite ausgewählt wird</li>
        <li>Mit einem Klick auf die Leiste am oberen Rand, um zu einem beliebigen Punkt in dem Kampf zu springen</li>
        <li>Fahre mit dem Mauszeiger über Trigger-Indikatoren in der oberen Leiste, um deren Namen zu sehen</li>
        <li>Detaillierte Informationen über aktivierten Trigger anzeigen lassen, indem auf die entsprechende Schaltfläche geklickt wird</li>
      </ul>
    </p>`,
    fr: `<p>Bienvenue dans l'émulateur de raid.</p>
    <p>Cet outil rejoue les rencontres et montre quels triggers ont été déclenchés à quel moment, et vous permet de voir la rencontre du point de vue de n'importe quel joueur.</p>
    <p>Cet outil accepte éventuellement le paramètre <strong>OVERLAY_WS</strong> pour se connecter à un Web socket ACT avec à la fois OverlayPlugin de ngld et le plugin Cactbot chargés.</p>
    <p>S'il est connecté à un Web socket, cet outil chargera et respectera les fichiers de configuration utilisateur pour cactbot/raidboss.</p>
    <p>Aucun overlay n'a besoin d'être créée.</p>
    <p>État actuel de WebSocket : <span class="d-none websocketConnected text-success">Connecté</span><span class="websocketDisconnected text-warning">Déconnecté</span>.</p>
    <p>Pour commencer, vous devez importer une rencontre via l'une des options suivantes :</p>
    <p>
      <ul>
        <li>Faites glisser et déposez un fichier log depuis <code>%APPDATA%/Advanced Combat Tracker/FFXIVLogs/</code> sur la page</li>
        <li>Cliquez sur le bouton <code>Charger Network Log</code> dans le tiroir du bas et sélectionnez un fichier log dans <code>%APPDATA%/Advanced Combat Tracker/FFXIVLogs/</code></li>
      </ul>
    </p>
    <p>Ensuite, sélectionnez une rencontre via le tiroir du bas.</p>
    <p>Une fois que vous avez chargé une rencontre, vous pouvez :</p>
    <p>
      <ul>
        <li>Modifiez la perspective actuelle en sélectionnant un membre du groupe sur la droite</li>
        <li>Recherchez n'importe quel point de la rencontre en cliquant sur la barre en haut</li>
        <li>Passez la souris sur les indicateurs des triggers dans la barre supérieure pour voir leurs noms</li>
        <li>Voir des informations détaillées sur les triggers déclenchés en cliquant sur leur bouton</li>
      </ul>
    </p>`,
  },
} as const;

const emulatorDisconnectedModal: Translation = {
  '.disconnectedModal .modal-title': {
    en: 'Currently Disconnected',
    de: 'Momentan nicht vebunden',
  },
  '.disconnectedModal .modal-body': {
    en: `<p>Raid Emulator is currently disconnected from ACT.</p>
    <p>Raid Emulator will use the default settings for raidboss. These are:</p>
    <ul>
      <li>Display language: <span class="discLangDisplay"></span></li>
      <li>Default alert output: Text and Sound</li>
      <li>Alerts language: <span class="discLangAlerts"></span></li>
      <li>Timeline language: <span class="discLangTimeline"></span></li>
    </ul>`,
    de: `<p>Raid Emulator ist momentan nicht mit ACT verbunden.</p>
    <p>Raid Emulator wird die Standardeinstellungen für Raidboss benutzen. Diese snd:</p>
    <ul>
      <li>Anzeigesprache: <span class="discLangDisplay"></span></li>
      <li>Standard Alarm Ausgabe: Text und Ton</li>
      <li>Alarmsprache: <span class="discLangAlerts"></span></li>
      <li>Timeline Sprache: <span class="discLangTimeline"></span></li>
    </ul>`,
    fr: `<p>Raid Emulator est actuellement déconnecté d'ACT.</p>
    <p>Raid Emulator utilise les paramètres par défaut pour raidboss :</p>
    <ul>
      <li>Langue d'affichage : <span class="discLangDisplay"></span></li>
      <li>Alerte par défaut : Texte et Son</li>
      <li>Langue des alertes : <span class="discLangAlerts"></span></li>
      <li>Langue des timelines : <span class="discLangTimeline"></span></li>
    </ul>`,
  },
} as const;

const emulatorLabels: Translation = {
  ' label[for=hideSkipped]': {
    en: 'Hide Skipped',
    de: 'Verstecke Übersprungene Einträge',
    fr: 'Masquer les entrées sautées',
  },
  ' label[for=hideCollector]': {
    en: 'Hide Collectors',
    de: 'Verstecke "Sammel" Einträge',
    fr: 'Masquer les entrées "Collecté"',
  },
} as const;

const emulatorTooltips: Translation = {
  '.triggerHideSkipped': {
    en: 'Hide triggers that were not executed',
    de: 'Verstecke Trigger, die nicht ausgeführt wurden',
    fr: 'Masquer les triggers non-executés',
  },
  '.triggerHideCollector': {
    en: 'Hide triggers that had no output',
    de: 'Verstecke Trigger, die keine Ausgabe hatten',
    fr: 'Masquer les triggers sans sortie',
  },
  '.connectedIndicator': {
    en: 'Connected to websocket',
    de: 'Mit Websocket verbunden',
    fr: 'Connecté au Websocket',
  },
  '.disconnectedIndicator': {
    en: 'Disconnected from websocket',
    de: 'Keine Verbindung zum Websocket',
    fr: 'Déconnecté du Websocket',
  },
} as const;

const emulatorEncounterInfo: Translation = {
  '.encounterLoad': {
    en: 'Load Encounter',
    de: 'Lade Kampf',
    fr: 'Charger combat',
  },
  '.encounterParse': {
    en: 'Reparse Encounter',
    de: 'Kampf erneut analysieren',
    fr: 'Reparser le combat',
  },
  '.encounterPrune': {
    en: 'Prune Encounter',
    de: 'Kampf leeren',
    fr: 'Combat vide',
  },
  '.encounterDelete': {
    en: 'Delete Encounter',
    de: 'Kampf löschen',
    fr: 'Effacer combat',
  },
  '.encounterZone': {
    en: 'Zone: <span class="label"></span>',
    de: 'Zone: <span class="label"></span>',
    fr: 'Zone : <span class="label"></span>',
  },
  '.encounterStart': {
    en: 'Start: <span class="label"></span>',
    de: 'Start: <span class="label"></span>',
    fr: 'Début : <span class="label"></span>',
  },
  '.encounterDuration': {
    en: 'Duration: <span class="label"></span>',
    de: 'Dauer: <span class="label"></span>',
    fr: 'Durée : <span class="label"></span>',
  },
  '.encounterOffset': {
    en: 'Pull At: <span class="label"></span>',
    de: 'Start um: <span class="label"></span>',
    fr: 'Pull à : <span class="label"></span>',
  },
  '.encounterName': {
    en: 'Name: <span class="label"></span>',
    de: 'Name: <span class="label"></span>',
    fr: 'Nom : <span class="label"></span>',
  },
  '.encounterStartStatus': {
    en: 'Start Status: <span class="label"></span>',
    de: 'Start Status: <span class="label"></span>',
    fr: 'État du démarrage : <span class="label"></span>',
  },
  '.encounterEndStatus': {
    en: 'End Status: <span class="label"></span>',
    de: 'Endstatus: <span class="label"></span>',
    fr: 'État de fin : <span class="label"></span>',
  },
} as const;

// These elements get their innerHTML set to the translated value
export const emulatorTranslations: Translation = {
  ...emulatorButtons,
  ...emulatorTitle,
  ...emulatorImportModal,
  ...emulatorDeleteModal,
  ...emulatorIntroModal,
  ...emulatorDisconnectedModal,
  ...emulatorLabels,
} as const;

// These elements get their title set to the translated value
export const emulatorTooltipTranslations: Translation = {
  ...emulatorTooltips,
} as const;

// Template elements need special handling, any templates that have translatable elements
// should be listed here
export const emulatorTemplateTranslations: { [selector: string]: Translation } = {
  'template.encounterInfo': emulatorEncounterInfo,
};

export const emulatorStartStatuses = {
  unknown: {
    en: 'Unknown',
    de: 'Unbekannt',
    fr: 'Inconnu',
  },
  countdown: {
    en: 'Countdown',
    de: 'Countdown',
    fr: 'Compte à rebours',
  },
  seal: {
    en: 'Seal',
    de: 'Versiegeln',
    fr: 'Fermeture',
  },
  engage: {
    en: 'Engage',
    de: 'Start',
    fr: 'À l\'attaque',
  },
};

export const emulatorEndStatuses = {
  unknown: {
    en: 'Unknown',
    de: 'Unbekannt',
    fr: 'Inconnu',
  },
  win: {
    en: 'Win',
    de: 'Gewonnen',
    fr: 'Gagné',
  },
  wipe: {
    en: 'Wipe',
    de: 'Wipe',
    fr: 'Wipe',
  },
  cactbotWipe: {
    en: 'Cactbot Wipe',
    de: 'Cactbot Wipe',
    fr: 'Cactbot Wipe',
  },
  unseal: {
    en: 'Unseal',
    de: 'Entsiegeln',
    fr: 'Ouverture',
  },
};

// @TODO: Change encounter to store keys for statuses instead of english values as a
// comma-separated string.
export const lookupStartStatuses = (lang: Lang, statusesStr: string): string => {
  const engStatuses = statusesStr.split(', ');
  const transStatuses: string[] = [];
  for (const status of engStatuses) {
    for (const map of Object.values(emulatorStartStatuses)) {
      if (map.en === status) {
        transStatuses.push(translate(lang, map));
        break;
      }
    }
  }
  return transStatuses.join(', ');
};

export const lookupEndStatus = (lang: Lang, status: string): string => {
  for (const map of Object.values(emulatorEndStatuses)) {
    if (map.en === status)
      return translate(lang, map);
  }
  return status;
};
