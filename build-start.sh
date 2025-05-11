#!/bin/bash
cd client 
export NODE_OPTIONS=--openssl-legacy-provider
npm install
npm run build
cd ..
npm install
npm start