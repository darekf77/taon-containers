# Archtiecture

- taon is name based framework (every class has a name)
that is preserver in minification inside special propert 
inside class 

- taon standalone container /src folder for storing ALL code

- In taon project we have ONE app and ONE lib(rary) code
(for exmaple in angular ng cli we can have many libs/apps - in taon: ONE lib per project and ONE app per project - but with many artifacts )

- taon support many artifacts: <br>
  + global cli tools
  + npm library (private or public)
  + angular frontend app (ssr or normal)
  + nodejs frontend app (normal node or cloudfalre node)
  + electron app
  + vscode plugin app
  + capacitor mobile app


- inside /src folder we have usuall
```bash
/src/lib  # index.ts is entrypoint for angula npm library and backend npm library 
/src/app  # code that is only for app (node app, electron app, vscode plugin app, cli app) 
/src/globa.scss # global syles for apps
/src/app.ts # entrypoint for nodejs backend/fronend app
/src/app.electron.ts. # entry point for electron
/src/app.vscode.ts # entry point for vscode plugin
```
