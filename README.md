# didi

# Diseños:
[https://sketch.cloud/s/9ZYbM/a/DJD3aj/play](url)


# APK Deployment
Steps to follow for generate an release version of APK
### Prerequisites:
1. Download from google drive folder with environment files, the following files: `.env.production`, `.env.staging`, `gradle.properties` and `didi-key.keystore`. Ask for access to folder with these .env already generated, this serves for development too.
2. Put `.env.production` and `.env.staging` in `./src`.
3. Put `didi-key.keystore` in `/src/android/app`. It can be regenerated if you want, just remember to change the corresponding values in `gradle.properties`.
3. Put `gradle.properties` in `/src/android`.

### Generating APK 
A. Run `npm run build` in `/src` for build and create apk for production.

Expected output is on `/src/android/app/build/outputs/apk/release/app-release.apk`

B. Run `npm run build:stage` in `/src` for build and create apk for staging.

Expected output is on `/src/android/app/build/outputs/apk/staging/release/app-staging-release.apk`
