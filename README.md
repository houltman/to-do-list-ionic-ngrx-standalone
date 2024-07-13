# Guía de Despliegue para Aplicaciones Ionic con Capacitor

Esta guía proporciona los pasos esenciales para preparar y desplegar tu aplicación Ionic utilizando Capacitor en plataformas Android e iOS.

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