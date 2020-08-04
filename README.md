# didi

# Diseños:
[https://sketch.cloud/s/9ZYbM/a/DJD3aj/play](url)


# APK Deployment
Steps to follow for generate an release version of APK
### Prerequisites:
1. Download from google drive an .env file with the environment vars, an put in `./src`. Ask for access to folder with these .env already generated, this serves for development too
2. Generate a keystore (preferably in `./src/android/app`) and with the values used to generate it, fill this `./src/android/gradle.properties` vars
    ````
    MYAPP_RELEASE_STORE_FILE=your.keystore
    MYAPP_RELEASE_KEY_ALIAS=youralias
    MYAPP_RELEASE_STORE_PASSWORD=yourpassword
    MYAPP_RELEASE_KEY_PASSWORD=yourkey

### Generating APK 
1. Check ALWAYS that `./src/src/AppConfig.ts` have `debug = false`, if not, set it.
2. Run `npm run build` in `./src` for build and create apk

The expected output is on `./src/android/app/build/outputs/apk/release/app-release.apk`
