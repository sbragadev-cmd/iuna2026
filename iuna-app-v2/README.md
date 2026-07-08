# Iúna App v2

Aplicativo estático premium para acompanhamento da gestação da Iúna.

## Como usar

1. Suba este projeto para o GitHub.
2. Configure na Vercel com Framework: Other, Build Command vazio, Output Directory `.`.
3. Configure `js/firebase-web.js` com os dados reais do Firebase Web App.
4. Publique as regras temporárias do Firestore durante o desenvolvimento:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /iuna_eventos/{document=**} { allow read, write: if true; }
    match /iuna_exames/{document=**} { allow read, write: if true; }
    match /iuna_prenatal/{document=**} { allow read, write: if true; }
    match /iuna_galeria/{document=**} { allow read, write: if true; }
    match /iuna_diary/{document=**} { allow read, write: if true; }
    match /iuna_family/{document=**} { allow read, write: if true; }
    match /iuna_layette/{document=**} { allow read, write: if true; }
    match /iuna_finance/{document=**} { allow read, write: if true; }
    match /iuna_settings/{document=**} { allow read, write: if true; }
  }
}
```

## Galeria local

Coloque imagens em:

```txt
public/img/galeria/barriga/26-05.jpeg
public/img/galeria/ultrassons/ultra-24-06.jpeg
```

Na página Galeria, informe apenas o nome do arquivo e a categoria.

## GitHub Actions

Configure estes Secrets:

- FIREBASE_SERVICE_ACCOUNT
- MAMAE_PHONE
- MAMAE_CALLMEBOT_KEY
- PAPAI_PHONE
- PAPAI_CALLMEBOT_KEY

