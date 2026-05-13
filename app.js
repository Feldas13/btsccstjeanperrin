


/* ─── RÉFÉRENTIEL ─── */
const COMPS = {
  com: [
    {code:'C1.1', label:'Préparer une négociation technique et commerciale'},
    {code:'C1.2', label:'Conseiller, prescrire et communiquer tout au long du processus de négociation'},
    {code:'C1.3', label:'Gérer le risque affaire et le risque client'},
    {code:'C1.4', label:'Mettre en œuvre l\'entretien de vente technico-commercial'},
    {code:'C1.5', label:'Assurer le suivi d\'une affaire'}
  ],
  mgmt: [
    {code:'C2.1', label:'Recruter et former des collaborateurs'},
    {code:'C2.2', label:'Animer un réseau'},
    {code:'C2.3', label:'Analyser les parcours pour optimiser l\'expérience client'},
    {code:'C2.4', label:'Évaluer la performance commerciale'}
  ],
  tech: [
    {code:'C4.1', label:'Réaliser une veille concurrentielle et sectorielle'},
    {code:'C4.2', label:'Analyser les besoins d\'un secteur / d\'un segment'},
    {code:'C4.3', label:'Produire des solutions technico-commerciales pour un segment cible'},
    {code:'C4.4', label:'Mettre en œuvre une formation technique pour le segment cible'}
  ]
};

const COMP_DESC = {
  'C1.1':'Identifier les informations sur l\'offre, prendre en compte le parcours digital du client, analyser le contexte et concevoir une stratégie de négociation technico-commerciale.',
  'C1.2':'Conseiller un client sur les solutions techniques compte tenu de ses contraintes, mobiliser les outils de communication, transmettre un message adapté à l\'interlocuteur.',
  'C1.3':'Mesurer la solvabilité d\'un client, identifier et intégrer le risque affaire, défendre les marges, maîtriser les aspects comptables et financiers d\'une affaire.',
  'C1.4':'Analyser les besoins actuels d\'un client, détecter le potentiel d\'achat, proposer des solutions adaptées, réaliser une argumentation personnalisée, finaliser un accord.',
  'C1.5':'Assurer la traçabilité des échanges, veiller à la bonne exécution du contrat, mesurer la satisfaction client, gérer les dysfonctionnements, établir une relation durable.',
  'C2.1':'Évaluer les besoins en compétences, définir un profil de poste, identifier les étapes d\'un recrutement, conduire un entretien, élaborer un plan de formation.',
  'C2.2':'Identifier les acteurs d\'un réseau, gérer et diffuser les informations, participer au pilotage d\'un réseau commercial ou partenarial.',
  'C2.3':'Identifier les parcours client, mobiliser les outils digitaux et proposer des améliorations pour optimiser l\'expérience client multicanal.',
  'C2.4':'Définir des objectifs commerciaux, déterminer des critères d\'appréciation de la performance, mesurer via des indicateurs, proposer des axes d\'amélioration.',
  'C4.1':'Identifier les sources d\'information, rechercher et collecter les données, classifier, mettre en forme et diffuser l\'information à la cible, actualiser la base de données.',
  'C4.2':'Déterminer les besoins d\'un segment, prendre en compte les objectifs de l\'entreprise, intégrer les normes en vigueur, participer à l\'élaboration du cahier des charges.',
  'C4.3':'Identifier et caractériser des solutions, classifier selon des critères technico-économiques, mobiliser des ressources et élaborer des solutions créatrices de valeur.',
  'C4.4':'Identifier les besoins de formation, définir les objectifs et la méthodologie, choisir les ressources, élaborer des supports adaptés et animer la formation.'
};

const MATIERES = {
  com:  {label:'Conception & Négociation',            cls:'com',  bloc:'Bloc 1'},
  mgmt: {label:'Management',                          cls:'mgmt', bloc:'Bloc 2'},
  tech: {label:'Expertise technico-commerciale',      cls:'tech', bloc:'Bloc 4'}
};

/* ─── STATE ─── */
let resources = [];
let state = {section:'home', mat:'com', type:'fiches', comp:'C1.1'};

/* ─── STOCKAGE PERSISTANT (localStorage) ─── */
// Les documents sont sauvegardés dans le navigateur via localStorage.
// Les PDF sont des liens Google Drive — aucun fichier lourd stocké localement.

const STATIC_RESOURCES = [
  {id:"r001",title:"FR1 Communication interpersonnelle et forme de la négociation TC",matiere:"com",type:"fiches",comp:"C1.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1TLDmdqtOP-0wORCSLmGPWiuEibVDhVdI/preview"},
  {id:"r002",title:"FR2 Communication interpersonnelle en négociation technico-commerciale",matiere:"com",type:"fiches",comp:"C1.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1WgdufEwSMk_qMqKbvAEDaDl3pcFSUzQk/preview"},
  {id:"r003",title:"FR3 Le profil client BtoB et valeur client",matiere:"com",type:"fiches",comp:"C1.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1PeXKYbhQ8TvLbeF8TvWevWkKEQcdEdus/preview"},
  {id:"r004",title:"FR4 Le processus d\'achat BtoB",matiere:"com",type:"fiches",comp:"C1.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1LvrWMhbOX8STTR0UytO6rYlOH661pVnG/preview"},
  {id:"r005",title:"FR5 Situation de marché et Analyse concurrentielle",matiere:"com",type:"fiches",comp:"C1.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1B3qSvzXGRgAKnRHtkDWcTAp3-H_7q9rU/preview"},
  {id:"r006",title:"FR6 Paramètres commerciaux",matiere:"com",type:"fiches",comp:"C1.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1sVWJbO0FFAEU3X6EL8d38jdT_ZFVzfYH/preview"},
  {id:"r007",title:"FR7 Cadre juridique de la vente B2B",matiere:"com",type:"fiches",comp:"C1.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1V_Kfs7fBN1SmBbqJ56hPk4O2BcDaxMDo/preview"},
  {id:"r008",title:"FR8 Stratégie de Négociation Technico-commerciale",matiere:"com",type:"fiches",comp:"C1.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/14Jtlua-eFGwTZYOAgkY6O1afyTJqwEYY/preview"},
  {id:"r009",title:"FR1 La vente-conseil en BtoB",matiere:"com",type:"fiches",comp:"C1.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/18f3tnyyjkF9kJGeG87dWY0E1uB_WGHyO/preview"},
  {id:"r010",title:"FR2 Construire et présenter une solution",matiere:"com",type:"fiches",comp:"C1.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1HGbs1B3Z8FcEVLfxt3mfVEcg0IdB2yiS/preview"},
  {id:"r011",title:"FR3 Analyser et positionner son offre",matiere:"com",type:"fiches",comp:"C1.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1XdN9A5G7c0_CtU4NZmLam6C0yfbdgGKb/preview"},
  {id:"r012",title:"FR4 Répondre à un CDC ou appel d\'offres",matiere:"com",type:"fiches",comp:"C1.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1J9HF1nSLRcpvIw8nsHuII2c9WeBi2tSi/preview"},
  {id:"r013",title:"FR5 Les outils phygitaux d\'aide à la vente",matiere:"com",type:"fiches",comp:"C1.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1fGP_eaDnOafcq-6pmkkaffptpOETkA1k/preview"},
  {id:"r014",title:"FR6 La communication écrite professionnelle en BtoB",matiere:"com",type:"fiches",comp:"C1.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1R97d_m_a6D0M7ZtUMCmaAyQskQatOjup/preview"},
  {id:"r015",title:"FR7 Travailler en mode collaboratif",matiere:"com",type:"fiches",comp:"C1.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1jMpkfV68SqHzJtHxvYUgR7jPvtcnBMbE/preview"},
  {id:"r016",title:"FR8 La veille commerciale et technique du TC",matiere:"com",type:"fiches",comp:"C1.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1AB_2k_2_48RQMoRByqDH7u-Atlvf59LO/preview"},
  {id:"r017",title:"FR1 Évaluer et gérer le risque client",matiere:"com",type:"fiches",comp:"C1.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/110JbmdTiws_MQ5xJNBPjPf7SLQV1ivqH/preview"},
  {id:"r018",title:"FR2 Mesurer la solvabilité d\'un client",matiere:"com",type:"fiches",comp:"C1.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1XT3LKSDHtUaFKFP4-bSPf3vrY596tilp/preview"},
  {id:"r019",title:"FR3 Proposer des modes de règlement et de financement",matiere:"com",type:"fiches",comp:"C1.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/13_FWlBaQJsWQTk4nwGZjZeLPvFvYKDrX/preview"},
  {id:"r020",title:"FR4 Défendre les marges et gérer les concessions",matiere:"com",type:"fiches",comp:"C1.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1JjAb3wCqg13sgD32DHWp_3a4vaBfwXJP/preview"},
  {id:"r021",title:"FR1 Déroulé Complet de l\'Oral de Négociation",matiere:"com",type:"fiches",comp:"C1.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1-XmZiEfG8I5yc7MVo10ulQ6UNYqO31_e/preview"},
  {id:"r022",title:"FR2 Prise de contact et installation",matiere:"com",type:"fiches",comp:"C1.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1yUPfCg5w189rNqA2mKEqO-9ZjUt3sPIK/preview"},
  {id:"r023",title:"FR3 Découverte des besoins",matiere:"com",type:"fiches",comp:"C1.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1sQi353KiAMXxD2Yt0SCywp5kNcUTXFAT/preview"},
  {id:"r024",title:"FR4 Argumentation",matiere:"com",type:"fiches",comp:"C1.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1EqPhajEEpfWtAHY5G_MLKCU4pUEHVxzA/preview"},
  {id:"r025",title:"FR5 Traitement des objections",matiere:"com",type:"fiches",comp:"C1.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/14Dx8XuXlVfX7Z8KiLxPa4f817bNvwLId/preview"},
  {id:"r026",title:"FR6 Conclusion et prise de congé",matiere:"com",type:"fiches",comp:"C1.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1x5aUJ_7uiOv27DVQpO-rgsDasJyfF2Rq/preview"},
  {id:"r027",title:"FR1 Le compte rendu de visite commercial",matiere:"com",type:"fiches",comp:"C1.5",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1fViKVquyI6qkEE4O8KWS0nl3wZ7DY7sd/preview"},
  {id:"r028",title:"FR2 Les écrits professionnels post-entretien",matiere:"com",type:"fiches",comp:"C1.5",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/13YmEiiQO0IcL5EbazHMJQr-YGm009A1i/preview"},
  {id:"r029",title:"FR3 CRM et traçabilité des échanges client",matiere:"com",type:"fiches",comp:"C1.5",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1xJ0PLkDCQqgrRfth6CEcJwLlZ9UTJEBe/preview"},
  {id:"r030",title:"FR4 Mesurer et gérer la satisfaction client",matiere:"com",type:"fiches",comp:"C1.5",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1VHRSiMUa7vihG6OQzRJwBuG9DNVj2Q4k/preview"},
  {id:"r031",title:"FR5 La gestion des litiges et des dysfonctionnements",matiere:"com",type:"fiches",comp:"C1.5",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1x_JpzvdLgCR45Uwutk9_h_2V2J_BhINX/preview"},
  {id:"r032",title:"FR6 Fidélisation et logique de partenariat durable",matiere:"com",type:"fiches",comp:"C1.5",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1jzYwpVIrL7ROUoaxKoOIZAfm3gwd7xzf/preview"},
  {id:"r033",title:"FR7 Conduire le suivi d\'une affaire de A à Z",matiere:"com",type:"fiches",comp:"C1.5",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1i17EXA9fTsSwpFD6W9g4hIpXiItPvIRS/preview"},
  {id:"r034",title:"1. Fiche Scoring Prise de Contact et Installation",matiere:"com",type:"scoring",comp:"ALL",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1epUKra4Xv320WORmYyq5ZQq5cpjtVOyA/preview"},
  {id:"r035",title:"2. Fiche Scoring Découverte des Besoins",matiere:"com",type:"scoring",comp:"ALL",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/13gdjlGPeqAJrZlUg3NLNLoovLbxJjm6_/preview"},
  {id:"r036",title:"3. Fiche Scoring Argumentation et Objections",matiere:"com",type:"scoring",comp:"ALL",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1iu_ZnydNTilncM-cMqSCFT9yLHjjMgfc/preview"},
  {id:"r037",title:"4. Fiche Scoring Conclusion et Prise de Congé",matiere:"com",type:"scoring",comp:"ALL",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1EFTtB0RcmnmrlEQEN5CyNYM_QTEV_BTJ/preview"},
  {id:"r038",title:"Cas Schneider",matiere:"com",type:"cas",comp:"ALL",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/15GPHBIaKkxG0ktfBG_kJ7-yDXxr4K333/preview"},
  {id:"r039",title:"Fichier Découverte FR — Cas Schneider",matiere:"com",type:"cas",comp:"ALL",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1soB9JRIyrzoSd0hWkSY1agS3zl66O7In/preview"},
  {id:"r040",title:"Cas Air Liquide",matiere:"com",type:"cas",comp:"ALL",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/16OyhIEobUZZG9nsMGRJSKq0NkRtxt_Qx/preview"},
  {id:"r041",title:"Exemple Fiche CCF1",matiere:"com",type:"ccf",comp:"ALL",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/14rLJGJC1F9AONQ0ZlHUyajiJJqTUwbXG/preview"},
  {id:"r042",title:"Réussir Oral CCF1",matiere:"com",type:"ccf",comp:"ALL",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1rvtyIyEQHdhUkXl1BBToqPbAbMtx_WPn/preview"},
  {id:"r043",title:"Fiche E5 CCF1 2026",matiere:"com",type:"ccf",comp:"ALL",date:"14 mars 2026",driveUrl:"https://docs.google.com/document/d/1_gLPzkEwLvi1jAxMjPyJS5XUUPI3qK1r/preview"}
,
  {id:"r101",title:"FR1 Identifier les besoins en compétences et en personnel",matiere:"mgmt",type:"fiches",comp:"C2.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1pWEFZGLWHqWiaeDgtwc8Jbg_2q3dpF5f/preview"},
  {id:"r102",title:"FR2 La fiche de poste du technico-commercial",matiere:"mgmt",type:"fiches",comp:"C2.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1ZKdjzw7gjamMrIYVy54sWTjS-G7eku5K/preview"},
  {id:"r103",title:"FR3 Le processus de recrutement",matiere:"mgmt",type:"fiches",comp:"C2.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1GpcrWJF2icbWFLah2XyxDfKsVOp8JPya/preview"},
  {id:"r104",title:"FR4 Les leviers de motivation",matiere:"mgmt",type:"fiches",comp:"C2.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/18tCk0LAO6ryonerCp8dICB5hZhaAsGBY/preview"},
  {id:"r105",title:"FR5 La rémunération des commerciaux",matiere:"mgmt",type:"fiches",comp:"C2.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/18U7GZDOXuPoKuYPFEV7ZEoLPtdmRxC-8/preview"},
  {id:"r106",title:"FR6 L\'évaluation des performances individuelles",matiere:"mgmt",type:"fiches",comp:"C2.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1RGQbNdft6SHLQbnD0LltmhFVnwT-_WSj/preview"},
  {id:"r107",title:"FR7 Mobiliser les outils de productivité de l\'équipe commerciale",matiere:"mgmt",type:"fiches",comp:"C2.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1xgLz8Z1lal-X2Nbyyg49DfMVcLZ7lItc/preview"},
  {id:"r108",title:"FM1 Élaborer un cahier des charges de formation",matiere:"mgmt",type:"methodes",comp:"C2.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1RYnOu2xf8DaOerbJGPi1h-hvYp1CDwBr/preview"},
  {id:"r109",title:"FM2 Conduire un entretien de recrutement ou d\'évaluation annuelle",matiere:"mgmt",type:"methodes",comp:"C2.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1ijaJjqKOePFCfhmbW3PinzgIQx4d3xgI/preview"},
  {id:"r110",title:"FM3 Proposer des actions de motivation différenciées",matiere:"mgmt",type:"methodes",comp:"C2.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1lJz6KuFfLBsIV45YFh-FyKbwt430sogd/preview"},
  {id:"r111",title:"FR1 Cartographie du réseau B2B",matiere:"mgmt",type:"fiches",comp:"C2.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1b8vEfbIEXZy6DHji3WMkmwndX2UpN9c_/preview"},
  {id:"r112",title:"FR2 Les outils d\'animation du réseau",matiere:"mgmt",type:"fiches",comp:"C2.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1gl4zAcnLqfP5_Du3txN_IG9LeqrlccCc/preview"},
  {id:"r113",title:"FR3 Système d\'information commercial",matiere:"mgmt",type:"fiches",comp:"C2.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1nCnQ7mzat3gp2FT12ptKFfAr3KWRooId/preview"},
  {id:"r114",title:"FR4 Logistique, politique d\'approvisionnement et supply chain B2B",matiere:"mgmt",type:"fiches",comp:"C2.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1zn_LyLqyPjS991A5Jq-AtTLlbh3Jsrig/preview"},
  {id:"r115",title:"FR5 Évaluation et pilotage du réseau",matiere:"mgmt",type:"fiches",comp:"C2.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1dJwTqI5vjqXg6r7FobYqF1NlUUqIZRc_/preview"},
  {id:"r116",title:"FR6 Communication digitale du réseau",matiere:"mgmt",type:"fiches",comp:"C2.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1XW3-Ok57xvNPfuNLdg3cTr8YIFt_W6ox/preview"},
  {id:"r117",title:"FM1 Concevoir un plan d\'animation réseau et un cahier des charges d\'événement",matiere:"mgmt",type:"methodes",comp:"C2.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1RrFXTS-MdRfpXJxuQ9je-qsEjwy-90Dz/preview"},
  {id:"r118",title:"FM2 Cartographier un réseau, gérer et diffuser l\'information",matiere:"mgmt",type:"methodes",comp:"C2.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1l_HWMK_QNw0btYca6H_XOfNKbVsfkGhj/preview"},
  {id:"r119",title:"FR1 Le parcours client B2B",matiere:"mgmt",type:"fiches",comp:"C2.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1W_0Vx-nIEvV-i33b4OFftKp8sFMbBET2/preview"},
  {id:"r120",title:"FR2 L\'expérience client",matiere:"mgmt",type:"fiches",comp:"C2.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1a27TB4aPtmEEVnHojhAxyBEIuCR5VIXj/preview"},
  {id:"r121",title:"FR3 Canaux de distribution et stratégies",matiere:"mgmt",type:"fiches",comp:"C2.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/14HEfGo4Rbej-wrLltxiHHejxenoSlwHU/preview"},
  {id:"r122",title:"FR4 Le marchéage B2B",matiere:"mgmt",type:"fiches",comp:"C2.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1pG2QgZE_DV1uhMjB6nOZtfnlx_kCxOtW/preview"},
  {id:"r123",title:"FR5 Les indicateurs de l\'expérience client",matiere:"mgmt",type:"fiches",comp:"C2.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1fHipN0s2Aawh5sUsuvTOk0Mz62HZ8msr/preview"},
  {id:"r124",title:"FR6 Les outils de mesure de l\'expérience client",matiere:"mgmt",type:"fiches",comp:"C2.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1GkHFTXEcC1Mk7FAcfQJaxYmbXmoO6VRN/preview"},
  {id:"r125",title:"FM1 Cartographier le parcours client et identifier les points de dissonance",matiere:"mgmt",type:"methodes",comp:"C2.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1dmJs2-H4W1gFK2KmVEtISc8Udu75YLcx/preview"},
  {id:"r126",title:"FM2 Optimiser le parcours client et évaluer l\'efficacité des solutions",matiere:"mgmt",type:"methodes",comp:"C2.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1owwnxjnguaPhXtSNiypUB8Zd15DlkadQ/preview"},
  {id:"r127",title:"FR1 Les indicateurs de performance commerciale",matiere:"mgmt",type:"fiches",comp:"C2.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1A6DB0a26W4BwxPZgZw8S3Em7GBgOdQe8/preview"},
  {id:"r128",title:"FR2 Prix, coûts, marges et structures de coûts",matiere:"mgmt",type:"fiches",comp:"C2.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1SV-ZPqU8iHezYZNR9w2-xV-yXFhQh2nD/preview"},
  {id:"r129",title:"FR3 Objectifs commerciaux SMART",matiere:"mgmt",type:"fiches",comp:"C2.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1EQknPCD-6LFGEgerOBXxrbqFSGs9JW55/preview"},
  {id:"r130",title:"FR4 Portefeuille clients",matiere:"mgmt",type:"fiches",comp:"C2.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1DozOnmQyQOzg8WzYTh1zp2SALyPJXmVg/preview"},
  {id:"r131",title:"FR5 Espaces d\'influence commerciale",matiere:"mgmt",type:"fiches",comp:"C2.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1SbdjyksJwv31QPj-M0Br8fuIlDq7uQMb/preview"},
  {id:"r132",title:"FR6 Tableaux de bord, outils de planification et méthodes de prévision",matiere:"mgmt",type:"fiches",comp:"C2.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1UZ8UZAu8_QMBfDdy1Eq4tECwBvSaHJjJ/preview"},
  {id:"r133",title:"FR7 Analyse de la valeur client et performance organisationnelle",matiere:"mgmt",type:"fiches",comp:"C2.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/12-GfrCdUflRzFiSKsIL7BLP93oSwii1t/preview"}
,
  {id:"r201",title:"FR1 Sources et collecte de l\'information",matiere:"tech",type:"fiches",comp:"C4.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1-aTaaSMfN3eW2cBW_3bwAYzOJmDRVWxu/preview"},
  {id:"r202",title:"FR2 Classifier, analyser et mettre en forme l\'information",matiere:"tech",type:"fiches",comp:"C4.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1kYolhSAP_rbK9JX7k_f-RDR9lEUefVdM/preview"},
  {id:"r203",title:"FR3 Diffusion dans le SIC — Procédures et RGPD",matiere:"tech",type:"fiches",comp:"C4.1",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1OvLr73vgbNIyuuNwcH6gulyVSztOQx0W/preview"},
  {id:"r204",title:"FR1 Analyser les besoins d\'un segment",matiere:"tech",type:"fiches",comp:"C4.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1NUOQ84W9CukrtnVC_U_RQYELAmyUAxSS/preview"},
  {id:"r205",title:"FR2 Le cahier des charges fonctionnel",matiere:"tech",type:"fiches",comp:"C4.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1emiwKWUI1b7JIMfdzQe5SbjaWVIS1lug/preview"},
  {id:"r206",title:"FR3 Paramètres de compétitivité d\'une solution TC",matiere:"tech",type:"fiches",comp:"C4.2",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/10SXp6ihtYy8tAeUdPwH0-h64-sP2Jgao/preview"},
  {id:"r207",title:"FR1 Classer et comparer des solutions TC",matiere:"tech",type:"fiches",comp:"C4.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1jCINwWIQSxKRAr1g9wWipC-C19NtsTIi/preview"},
  {id:"r208",title:"FR2 Construire et valoriser l\'offre globale TC",matiere:"tech",type:"fiches",comp:"C4.3",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1M9Geu2ICOPO4yYA4VXtlEJ3frIsM-3Jf/preview"},
  {id:"r209",title:"FR1 Ingénierie pédagogique de la formation technique",matiere:"tech",type:"fiches",comp:"C4.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/128lEE3uc6FrLzUKqUXiza4Nrzii1u_id/preview"},
  {id:"r210",title:"FR2 Élaborer les supports et animer la formation",matiere:"tech",type:"fiches",comp:"C4.4",date:"14 mars 2026",driveUrl:"https://drive.google.com/file/d/1zB8tM6RoO05VscGamP9la0TxNCuJXMiK/preview"}
];

function storageLoad() {
  let userDocs = [];
  try {
    userDocs = JSON.parse(localStorage.getItem('btsccst:docs') || '[]');
  } catch(e) { userDocs = []; }
  // Fusionner : docs statiques + docs ajoutés par l'enseignant
  // Les docs utilisateur écrasent les statiques si même id
  const staticIds = new Set(STATIC_RESOURCES.map(r=>r.id));
  const userOnly = userDocs.filter(r=>!staticIds.has(r.id));
  resources = [...STATIC_RESOURCES, ...userOnly];
}

function storageSave() {
  localStorage.setItem('btsccst:docs', JSON.stringify(resources));
}

// Compat aliases pour le reste du code
async function storageSaveIndex() { storageSave(); }
async function storageSavePdf(id, url) { /* liens GDrive, rien à faire */ }
async function storageDeleteDoc(id) { storageSave(); }

/* ─── MEGA MENU (click-based) ─── */
function toggleMenu(btn) {
  const item = btn.closest('.nb-item');
  const isOpen = item.classList.contains('open');
  closeAllMenus();
  if (!isOpen) item.classList.add('open');
}
function closeAllMenus() {
  document.querySelectorAll('.nb-item.open').forEach(i => i.classList.remove('open'));
}
document.addEventListener('click', function(e) {
  if (!e.target.closest('.nb-item')) closeAllMenus();
});

/* ─── NAVIGATION ─── */
function showHome() {
  closeAllMenus();
  window.scrollTo(0,0);
  document.getElementById('app-home').style.display = 'block';
  document.getElementById('app-mat').style.display = 'none';
  state.section = 'home';
  updateCounts();
}

function showSection(mat, type, comp) {
  closeAllMenus();
  window.scrollTo(0,0);
  // Basculer les vues
  document.getElementById('app-home').style.display = 'none';
  document.getElementById('app-mat').style.display = 'block';
  // Afficher la bonne section matière
  document.querySelectorAll('.mat-section').forEach(s => s.style.display = 'none');
  document.getElementById('mat-'+mat).style.display = 'block';
  // Mettre à jour l'état
  state.section = mat;
  state.mat = mat;
  state.type = type;
  state.comp = comp || (COMPS[mat]?.[0]?.code ?? 'ALL');
  // Sync les onglets
  ['fiches','td','scoring','methodes','revision','cas','ccf'].forEach(t => {
    const el = document.getElementById(mat+'-type-'+t);
    if(el) el.classList.toggle('active', t===type);
  });
  renderBody(mat);
}

/* ─── ONGLETS TYPE ─── */
function switchType(mat, type) {
  closeAllMenus();
  state.mat = mat;
  state.type = type;
  const withComp = ['fiches','td','methodes'];
  state.comp = withComp.includes(type) ? (COMPS[mat]?.[0]?.code ?? 'ALL') : 'ALL';
  ['fiches','td','scoring','methodes','revision','cas','ccf'].forEach(t => {
    const el = document.getElementById(mat+'-type-'+t);
    if(el) el.classList.toggle('active', t===type);
  });
  renderBody(mat);
}

function setComp(code) {
  state.comp = code;
  renderBody(state.mat);
}

/* ─── RENDER ─── */
function renderBody(mat) {
  const body = document.getElementById(mat+'-body');
  const m = MATIERES[mat];
  const comps = COMPS[mat];
  const type = state.type;

  if (type === 'fiches') {
    const activeComp = comps.find(c=>c.code===state.comp) || comps[0];
    const docs = resources.filter(r=>r.matiere===mat && r.type==='fiches' && r.comp===state.comp);

    const sidebar = `<div class="comp-sidebar">
      <div class="comp-sidebar-head">Compétences</div>
      ${comps.map(c=>`
        <button class="comp-btn ${c.code===activeComp.code?'active':''}" onclick="setComp('${c.code}')">
          <span class="comp-code">${c.code}</span>
          <span class="comp-label">${c.label}</span>
        </button>`).join('')}
    </div>`;

    const content = `<div class="comp-content">
      <div class="comp-content-header ${mat}">
        <div class="cch-badge">${activeComp.code}</div>
        <div class="cch-title">${activeComp.label}</div>
        <div class="cch-desc">${COMP_DESC[activeComp.code]||''}</div>
        <div class="cch-divider"></div>
      </div>
      <div class="cards-grid">
        ${docs.map(r=>docCard(r,mat)).join('')}
        <div class="add-card" onclick="openModalFor('${mat}','fiches','${activeComp.code}')">
          <div class="add-icon">＋</div><span>Ajouter une fiche</span>
        </div>
      </div>
    </div>`;

    body.innerHTML = sidebar + content;

  } else if (type === 'cas') {
    const docs = resources.filter(r=>r.matiere===mat && r.type==='cas');
    body.innerHTML = `<div style="grid-column:1/-1"><div class="comp-content">
      <div class="comp-content-header ${mat}">
        <div class="cch-badge ${mat}">🧩 Cas pratiques — ${m.bloc}</div>
        <div class="cch-title">Tous les cas pratiques</div>
        <div class="cch-desc">Ensemble des cas pratiques de la matière.</div>
        <div class="cch-divider"></div>
      </div>
      <div class="cards-grid">
        ${docs.map(r=>docCard(r,mat)).join('')}
        <div class="add-card" onclick="openModalFor('${mat}','cas','ALL')">
          <div class="add-icon">＋</div><span>Ajouter un cas pratique</span>
        </div>
      </div>
    </div></div>`;

  } else if (type === 'ccf') {
    const docs = resources.filter(r=>r.matiere===mat && r.type==='ccf');
    body.innerHTML = `<div style="grid-column:1/-1"><div class="comp-content">
      <div class="comp-content-header ${mat}">
        <div class="cch-badge ${mat}">📁 CCF — ${m.bloc}</div>
        <div class="cch-title">Documents CCF</div>
        <div class="cch-desc">Sujets, grilles d'évaluation et supports liés au Contrôle en Cours de Formation.</div>
        <div class="cch-divider"></div>
      </div>
      <div class="cards-grid">
        ${docs.map(r=>docCard(r,mat)).join('')}
        <div class="add-card" onclick="openModalFor('${mat}','ccf','ALL')">
          <div class="add-icon">＋</div><span>Ajouter un document CCF</span>
        </div>
      </div>
    </div></div>`;

  } else if (type === 'td') {
    // TD avec sidebar compétences — B1 uniquement
    const activeComp = comps.find(c=>c.code===state.comp) || comps[0];
    const docs = resources.filter(r=>r.matiere===mat && r.type==='td' && r.comp===state.comp);
    const sidebar = `<div class="comp-sidebar">
      <div class="comp-sidebar-head">Compétences</div>
      ${comps.map(c=>`
        <button class="comp-btn ${c.code===activeComp.code?'active':''}" onclick="setComp('${c.code}')">
          <span class="comp-code">${c.code}</span>
          <span class="comp-label">${c.label}</span>
        </button>`).join('')}
    </div>`;
    const content = `<div class="comp-content">
      <div class="comp-content-header ${mat}">
        <div class="cch-badge">✏️ ${activeComp.code}</div>
        <div class="cch-title">TD — ${activeComp.label}</div>
        <div class="cch-desc">${COMP_DESC[activeComp.code]||''}</div>
        <div class="cch-divider"></div>
      </div>
      <div class="cards-grid">
        ${docs.map(r=>docCard(r,mat)).join('')}
        <div class="add-card" onclick="openModalFor('${mat}','td','${activeComp.code}')">
          <div class="add-icon">＋</div><span>Ajouter un TD</span>
        </div>
      </div>
    </div>`;
    body.innerHTML = sidebar + content;

  } else if (type === 'scoring' || type === 'revision') {
    // Global simple sans sidebar
    const meta = {
      scoring:  {icon:'🎯', label:'Fiches Scoring',        desc:'Grilles de scoring et outils d\'évaluation commerciale.'},
      revision: {icon:'🔁', label:'Documents de révision', desc:'Synthèses, fiches bilan et documents de préparation aux évaluations.'}
    }[type];
    const docs = resources.filter(r=>r.matiere===mat && r.type===type);
    body.innerHTML = `<div style="grid-column:1/-1"><div class="comp-content">
      <div class="comp-content-header ${mat}">
        <div class="cch-badge ${mat}">${meta.icon} ${m.bloc}</div>
        <div class="cch-title">${meta.label}</div>
        <div class="cch-desc">${meta.desc}</div>
        <div class="cch-divider"></div>
      </div>
      <div class="cards-grid">
        ${docs.map(r=>docCard(r,mat)).join('')}
        <div class="add-card" onclick="openModalFor('${mat}','${type}','ALL')">
          <div class="add-icon">＋</div><span>Ajouter un document</span>
        </div>
      </div>
    </div></div>`;

  } else if (type === 'methodes') {
    // Sidebar + compétences (comme Fiches ressources) — B2 uniquement
    const activeComp = comps.find(c=>c.code===state.comp) || comps[0];
    const docs = resources.filter(r=>r.matiere===mat && r.type==='methodes' && r.comp===state.comp);
    const sidebar = `<div class="comp-sidebar">
      <div class="comp-sidebar-head">Compétences</div>
      ${comps.map(c=>`
        <button class="comp-btn ${c.code===activeComp.code?'active':''}" onclick="setComp('${c.code}')">
          <span class="comp-code">${c.code}</span>
          <span class="comp-label">${c.label}</span>
        </button>`).join('')}
    </div>`;
    const content = `<div class="comp-content">
      <div class="comp-content-header ${mat}">
        <div class="cch-badge">📐 ${activeComp.code}</div>
        <div class="cch-title">Fiches Méthodes — ${activeComp.label}</div>
        <div class="cch-desc">Fiches méthodes et outils méthodologiques pour cette compétence.</div>
        <div class="cch-divider"></div>
      </div>
      <div class="cards-grid">
        ${docs.map(r=>docCard(r,mat)).join('')}
        <div class="add-card" onclick="openModalFor('${mat}','methodes','${activeComp.code}')">
          <div class="add-icon">＋</div><span>Ajouter une fiche méthode</span>
        </div>
      </div>
    </div>`;
    body.innerHTML = sidebar + content;
  }
}

function docCard(r, mat) {
  const compInfo = COMPS[mat]?.find(c=>c.code===r.comp);
  let tagLabel;
  if(r.type==='cas') tagLabel='Cas pratique';
  else if(r.type==='ccf') tagLabel='CCF';
  else if(r.type==='td') tagLabel='TD · '+(compInfo?compInfo.code:r.comp);
  else if(r.type==='scoring') tagLabel='Scoring';
  else if(r.type==='methodes') tagLabel='Méthode · '+(compInfo?compInfo.code:r.comp);
  else if(r.type==='revision') tagLabel='Révision';
  else tagLabel = compInfo ? compInfo.code : (r.comp||'Fiche');
  return `<div class="doc-card">
    <div class="dc-top ${mat}-bar"></div>
    <div class="dc-body">
      <div class="dc-tag ${mat}-tag">${tagLabel}</div>
      <div class="dc-title">${esc(r.title)}</div>
      ${r.desc?`<div class="dc-desc">${esc(r.desc)}</div>`:''}
      <div class="dc-meta">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        ${r.date}${r.size?' · '+r.size:''}
      </div>
      <div class="dc-foot">
        ${r.driveUrl
          ?`<button class="btn-c" onclick="openPdf('${r.id}')"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>Consulter</button>
           <button class="btn-d" onclick="dlPdf('${r.id}')">↓</button>
           <button class="btn-d" onclick="delDoc('${r.id}')" style="color:#b91c1c;border-color:#fca5a5">✕</button>`
          :`<button class="btn-c" disabled style="opacity:.35;cursor:not-allowed">Lien manquant</button>
            <button class="btn-d" onclick="delDoc('${r.id}')" style="color:#b91c1c;border-color:#fca5a5">✕</button>`}
      </div>
    </div>
  </div>`;
}

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

/* ─── COUNTS ─── */
function updateCounts() {
  let total=0;
  for(const m of Object.keys(MATIERES)){
    const n=resources.filter(r=>r.matiere===m).length;
    total+=n;
    const el=document.getElementById('count-'+m);
    if(el) el.textContent=n+' document'+(n!==1?'s':'');
  }
  document.getElementById('totalDocs').textContent=total;
}

/* ─── PDF ─── */
function openPdf(id){const r=resources.find(x=>x.id===id);if(!r?.driveUrl)return;document.getElementById('pdfTitle').textContent=r.title;document.getElementById('pdfFrame').src=r.driveUrl;document.getElementById('pdfOverlay').classList.add('open')}
function closePdf(){document.getElementById('pdfOverlay').classList.remove('open');document.getElementById('pdfFrame').src=''}
function dlPdf(id){const r=resources.find(x=>x.id===id);if(!r?.driveUrl)return;const a=document.createElement('a');a.href=getDriveDownloadUrl(r.driveUrl);a.target='_blank';a.click()}
function delDoc(id){
  if(!confirm('Supprimer ce document ?'))return;
  resources=resources.filter(r=>r.id!==id);
  storageDeleteDoc(id);
  updateCounts();
  if(state.section!=='home')renderBody(state.mat);
}

/* ─── MODAL ─── */
function updateTypeAndComp(){updateCompSelect()}
function updateCompSelect(){
  const mat=document.getElementById('docMatiere').value;
  const type=document.getElementById('docType').value;
  const sel=document.getElementById('docComp');
  const cf=document.getElementById('compField');
  if(type==='fiches'||type==='td'||type==='methodes'){
    cf.style.display='block';
    const comps=COMPS[mat]||[];
    sel.innerHTML=comps.map(c=>`<option value="${c.code}">${c.code} — ${c.label}</option>`).join('');
  } else {
    cf.style.display='none';
    sel.innerHTML='<option value="ALL">N/A</option>';
  }
}
function openModal(){updateCompSelect();document.getElementById('modalOverlay').classList.add('open')}
function openModalFor(mat,type,comp){
  document.getElementById('docMatiere').value=mat;
  document.getElementById('docType').value=type;
  updateCompSelect();
  if(comp&&comp!=='ALL') document.getElementById('docComp').value=comp;
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal(){
  document.getElementById('modalOverlay').classList.remove('open');
  ['docTitle','docDesc','docUrl'].forEach(i=>{const el=document.getElementById(i);if(el)el.value='';});
}

function addResource(){
  const title=document.getElementById('docTitle').value.trim();
  if(!title){alert('Veuillez saisir un titre.');return}
  const rawUrl=document.getElementById('docUrl').value.trim();
  if(!rawUrl){alert('Veuillez coller un lien Google Drive.');return}
  const matiere=document.getElementById('docMatiere').value;
  const type=document.getElementById('docType').value;
  const comp=(type==='fiches'||type==='td'||type==='methodes')?document.getElementById('docComp').value:'ALL';
  const desc=document.getElementById('docDesc').value.trim();
  const date=new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'});
  const id='r_'+Date.now();
  // Convertir le lien de partage Google Drive en lien d'aperçu direct
  const driveUrl = convertDriveUrl(rawUrl);
  resources.push({id,title,matiere,type,comp,desc,date,driveUrl});
  storageSave();
  closeModal(); updateCounts();
  if(state.section===matiere){ renderBody(matiere); }
  toast('Document ajouté avec succès.');
}

function convertDriveUrl(url){
  // Lien partage : https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // → aperçu embarqué : https://drive.google.com/file/d/FILE_ID/preview
  const m = url.match(/\/file\/d\/([^\/\?]+)/);
  if(m) return 'https://drive.google.com/file/d/' + m[1] + '/preview';
  // Lien docs.google.com/open?id=FILE_ID
  const m2 = url.match(/[?&]id=([^&]+)/);
  if(m2) return 'https://drive.google.com/file/d/' + m2[1] + '/preview';
  return url;
}

function getDriveDownloadUrl(url){
  const m = url.match(/\/file\/d\/([^\/\?]+)/);
  if(m) return 'https://drive.google.com/uc?export=download&id=' + m[1];
  return url;
}

function toast(msg){
  const t=document.getElementById('toast');
  document.getElementById('toastMsg').textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2000);
}

/* ─── INIT ─── */


document.addEventListener('DOMContentLoaded', function() {
  storageLoad();
  updateCounts();
  document.getElementById('app-home').style.display = 'block';
  document.getElementById('app-mat').style.display  = 'none';
  state.section = 'home';
});
