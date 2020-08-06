# didi

# Diseños:
[https://sketch.cloud/s/9ZYbM/a/DJD3aj/play](url)


## Environment
### .env
Obtener archivo .env desde Google Drive (pedir acceso) y agregarlo a la carpeta /src del proyecto
### google-services.json
Obtener archivo desde Google Drive o Firebase del proyecto, y agregarlo a /src/android/app

---
## DIDI-SDK

Para el correcto funcionamiento de la aplicación, se debe hacer una modificacion de entorno sobre el DIDI-SDK.

Para esto (una vez realizado _**npm install**_), dirigirse al directorio **_node_modules/didi-sdk/src/crypto/Encription.ts_** y modificar la constante **HASH_SALT** con el valor de **PRIVATE_KEY_SEED_PASSWORD** ubicado en el archivo .env inicialmente configurado.