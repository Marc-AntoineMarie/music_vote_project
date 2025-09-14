curl 'https://paris-02-2.hyperplanning.fr/hp/appelpanneauinformations' \
  -H 'accept: */*' \
  -H 'accept-language: fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'content-type: text/plain;charset=UTF-8' \
  -b 'ielang=1036' \
  -H 'origin: https://paris-02-2.hyperplanning.fr' \
  -H 'priority: u=1, i' \
  -H 'referer: https://paris-02-2.hyperplanning.fr/hp/panneauinformations.html?id=PA3' \
  -H 'sec-ch-ua: "Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"' \
  -H 'sec-ch-ua-mobile: ?1' \
  -H 'sec-ch-ua-platform: "Android"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36' \
  --data-raw '{"id":"PA3","init":false}'

{
    "parametres":{
      "date":{"_T":7,"V":"14/09/2025 15:36:17"},
      "placeParHeure":4,
      "nomEtablissement":"EMPLOI DU TEMPS ",
      "nomPage":"<<Date>> <<Heure>>",
      "baliseDate":"<<Date>>",
      "baliseHeure":"<<Heure>>",
      "intervalleDefilement":10,
      "theme":2,
      "texteFonce":1,
      "coefPolice":100,
      "ordreContenus":[
        {"G":9,"L":"Horaires"},
        {"G":3,"L":"Salle"},
        {"G":0,"L":"Mati\u00E8re"},
        {"G":1,"L":"Enseignant"},
        {"G":2,"L":"Public"}
      ],
      "listeMessages":{"_T":24,"V":[]}
    }
}

# test

697-f1aead37ac9a{
  
  "parametres":
  {"date":{"_T":7,"V":"14/09/2025 17:17:13"},
  "placeParHeure":4,
  "nomEtablissement":
  "EMPLOI DU TEMPS ",
  "nomPage":"<<Date>> <<Heure>>",
  "baliseDate":"
<<Date>>",
"baliseHeure":"<<Heure>>",
"intervalleDefilement":10,
"theme":2,
"texteFonce":1,
"coefPolice":100},
"ordreContenus":[{"G":9,"L":"Horaires"},{"G":3,"L":"Salle"},{"G":0,"L":"Mati\u00E8re"},{"G":1,"L":"Enseignant"},{"G":2,"L":"Public"}],
"listeMessages":{"_T":24,"V":[]}}



$ curl 'https://paris-02-2.hyperplanning.fr/hp/appelpanneauinformations' \
>   -H 'content-type: text/plain;charset=UTF-8' \
>   -b 'ielang=1036' \
>   --data-raw '{"id":"PA3","init":false,"dateDebut":"2024-09-16","dateFin":"2024-09-22"}'


697-f1aead37ac9a{"parametres":{"date":{"_T":7,"V":"14/09/2025 21:52:17"},"placeParHeure":4,"nomEtablissement":"EMPLOI DU TEMPS ","nomPage":"<<Date>> <<Heu
re>>","baliseDate":"<<Date>>","baliseHeure":"<<Heure>>","intervalleDefilement":10,"theme":2,"texteFonce":1,"coefPolice":100},"ordreContenus":[{"G":9,"L":"Horaires"},{"G":3,"L":"Salle"},{"G":0,"L":"Mati\u00E8re"},{"G":1,"L":"Enseignant"},{"G":2,"L":"Public"}],"listeMessages":{"_T":24,"V":[]}}