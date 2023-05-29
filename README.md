# Siseveebi assistent õpetajatele

Pivotal Tracker: [https://www.pivotaltracker.com/n/projects/2645015](https://www.pivotaltracker.com/n/projects/2645015)

## Eesmärk
Siseveebi assistent on Chrome'i laiendus, mis aitab õpetajatel Siseveebis päevikuid täita.

## Paigaldamine
Järgige neid samme assistendi paigaldamiseks:

1. Laadige alla reposiidium
2. Avage Chrome'i laienduste haldur aadressil `chrome://extensions/`
3. Lülitage sisse arendaja režiim (Developer Mode)
4. Klõpsake nuppu `Load unpacked` ja valige alla laaditud kaust
5. Vajadusel vajutage `Reload`

## Kasutamine

**Puuduvate tundidega seotud võimalused:**
- [ ] Kui päevikute loendis on päevikuid, millel on vähemalt üks juba möödunud tund puudu, peaks selleni viiva lingi juures olema punane silt "Puuduvad tunnid".
- [ ] Kui päevik avada, peaks ilmuma teade, milles on loend puuduvatest tundidest ja nupp, mille vajutamisel saab puuduvad tunnid päevikusse lisada.
- [ ] Päevikute loendi vaates on uus tulp "Kokku", milles on kõikide perioodide antud/kokku tunnid kumulatiivselt summeeritud.
- [ ] Päevikute loendi vaates on loendi all "kokku" real kumulatiivne kokku loendur.

**Puuduvate hinnetega seotud võimalused:**
- [ ] Kui päevikute loendis on lõppenud aineid, millel on vähemalt ühel õpilasel vähemalt üks hinne puudu, peaks selleni viiva lingi juures olema punane silt "Puuduvad hinded".
- [ ] Kui päevik avada, peaks ilmuma teade, milles on loend puuduvatest hinnetest ja nupp, mille vajutamisel saab puuduvad hinded päevikusse lisada.

**Ainete lõppemisega seotud võimalused:**
- [ ] Päevikud lehe tabelis on juba äralõppenud ained halli värviga, et kohe näeks, millised ained on juba läbi ja millised veel järel, et tegeleda lõppenud aine antud vs planeeritud tundide ebakõlaga, kui seda peaks juhtuma.
- [ ] Päevikud lehe tabelis on uus tulp, mis annab ülevaate, kui palju aega on jäänud antud aine lõpuni. Esialgsed andmed selleks võetakse koormuste tabelist, mis pakub nädala täpsusega andmeid, sest tunniplaanis on tavaliselt ainult mõne järgneva nädala jagu tunde. Kui koormuste tabel näitab, et aine lõpuni on jäänud vaid viimane nädal, siis uuritakse tunniplaanist, mis kuupäeval see aine viimasena tunniplaanis on. Kuni viimase nädalani on selles tulbas arv, mis annab teada, mitu nädalat on veel jäänud (4n, 3n, 2n, 1n), ja alates viimasest nädalast näidatakse päeva täpsusega rasvases kirjas (näiteks, kui aine viimane tund on reedel, siis esmaspäeval näitab 4p, teisipäeval 3p, kolmapäeval 2p, neljapäeval 1p, reedel on punases kirjas "täna"). Pärast seda näidatakse kuupäeva, millal aine lõppes (näiteks 9.5.22).

**Käsunduslepinguga töötajatele:**
- [ ] Päevikud lehe tabelil on nurgas hammasratta ikoon, mille alt avaneb aken, kust saab linnukestega kontrollida, millist tüüpi tunde tabelis kuvatakse (“kontakt" ehk teoreetiline+praktiline, "e-õpe" ja “iseseisev"), et ei peaks arve loomisel vaeva nägema, et saada kätte iga aine kohta eraldi kontakttundide arv ja e-õppe tundide arv (kuna nad on erineva hinnaga).

