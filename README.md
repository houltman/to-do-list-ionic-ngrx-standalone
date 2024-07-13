# Guía de Despliegue para Aplicaciones Ionic con Capacitor

Esta guía proporciona los pasos esenciales para preparar y desplegar tu aplicación Ionic utilizando Capacitor en plataformas Android e iOS.

## Deploy en netlify
https://todoionic-ngrx.netlify.app

## Requerimientos
node v20.15.1
npm 10.7.0
ionic CLI 7.1.1

## Instalacion de dependencias
npm install

## Construcción de la Aplicación

Antes de desplegar tu aplicación, necesitas construir la versión de producción. Esto optimiza tu aplicación para el despliegue.

ionic build --prod

## Añadir Plataformas

ionic capacitor add android
ionic capacitor add ios

## Sincronización de Capacitor
ionic capacitor sync

## Pruebas en Dispositivos Reales
ionic capacitor open android
ionic capacitor open ios

## Compatibilidad
The project is using an incompatible version (AGP 8.2.1) of the Android Gradle plugin. Latest supported version is AGP 8.1.1

Para resolver el problema de incompatibilidad con la versión del Android Gradle Plugin (AGP), necesitas cambiar la versión de AGP en tu proyecto a la última versión soportada, que es la 8.1.1. Sigue estos pasos:

Abre el archivo build.gradle: Este archivo se encuentra en el directorio raíz de tu proyecto Android (dentro de la carpeta android/ si estás utilizando Capacitor).

Modifica la versión de AGP: Busca la línea que define la versión del classpath del Android Gradle Plugin en la sección de dependencias del archivo build.gradle en el directorio android/. Cambia la versión a 8.1.1.

classpath 'com.android.tools.build:gradle:8.1.1'

Sincroniza 
ionic capacitor sync android