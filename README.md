# didi

# Diseños:
[https://sketch.cloud/s/9ZYbM/a/DJD3aj/play](url)


## Environment
### .env.production y .env.staging
Obtener archivos desde Google Drive (pedir acceso) y agregarlos a la carpeta /src del proyecto
### google-services.json
Obtener archivo desde Google Drive o Firebase del proyecto, y agregarlo a `/src/android/app`

## APK Deployment
Steps to follow for generate an release version of APK
### Prerequisites:
1. Download from google drive folder with environment files, the following files: `.env.production`, `.env.staging`, `gradle.properties` and `didi-key.keystore`. Ask for access to folder with these .env already generated, this serves for development too.
2. Put `.env.production` and `.env.staging` in `./src`.
3. Put `didi-key.keystore` in `/src/android/app`. It can be regenerated if you want, just remember to change the corresponding values in `gradle.properties`.
3. Put `gradle.properties` in `/src/android`.

### Generating APK 
A. Run `npm run build` in `/src` for build and create apk for production.

B. Run `npm run build:stage` in `/src` for build and create apk for staging.

Expected output (for both) is on `/src/android/app/build/outputs/apk/staging/release/app-staging-release.apk`

---
## DIDI-SDK

Para el correcto funcionamiento de la aplicación, se debe hacer una modificacion de entorno sobre el DIDI-SDK.

Para esto (una vez realizado _**npm install**_), dirigirse al directorio **_node_modules/didi-sdk/src/crypto/Encription.ts_** y modificar la constante **HASH_SALT** con el valor de **PRIVATE_KEY_SEED_PASSWORD** ubicado en el archivo .env inicialmente configurado.
