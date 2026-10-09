### Code regions

Taon framework splits each *.ts to different
temporary source folder that serve different purposes. From original*.ts files code regions/lines
are removed based on region tag.

\+ **Code for NodeJs/Websql backend:**

`//#region @websql`

  /*code*/
  
   `//#endregion`

\+ **Same as above for function return :**

`//#region @websqlFunc`

  /*code*/
  
  `//#endregion`

*When you should use @websql, @websqlFunc:*
\-> generally this should be most often used
tool for striping backend code (you never know if
some of your backend files are going to be
needed on frontend for some reason)

```ts
function myFunc():string {
  //@websqlFunc
  return 'hello in backend'l
  //#endregion
}

// in browser (not WEBSQL mode) there will be
function myFunc():string {
  /**/
  /**/
  return void 0; // void 0 means undefined
}
```

\+ **Code only for NodeJS/backend:**

`//#region @backend`

  /*code*/
  
  `//#endregion`
  

\+ **Same as above, but returns "undefined" as result function:**

`//#region @backendFunc`
  
  /*code*/
  
`//#endregion`

*When you should use @backend, @backendFunc:* ?

\-> for deleting code that can't be mocked in websql mode


```ts
function whatIsMyOs():string {
  //@backendFunc
  return os.getName();
  //#endregion
}

// in browser there will be
function myFunc():string {
  /**/
  /**/
  return void 0; // void 0 means undefined
}
```

\+ **Code only for browser:**

`//#region @browser`

 /*code*/

`//#endregion`

*When you should use @browser* ?

\-> for frontend code that for some reason can't be executed/imported in NodeJS backend

\+ **Code only for websql mode (not available for NodeJs backend):**

`//#region @websqlOnly`  

/*code*/

`//#endregion`

*When you should use @websqlOnly* ?

\-> when you are converting NodeJS only backend to websql mode friendly backend

### Inline imports/exports code removal
Taon lets you exclude from backend(or browser, or websql) code specific imports/exports by 
setting special tag at the end of import/export (not above, not below - at the end)<br>

When you automatically orders your imports/export with prettier/eslint - every tag is being preserved.
<br><br>
*Taon code*
```ts
import {
  Taon,
  Connection,
} from 'taon/src';
import fse from 'fs-extra'; // @backend
import {
  tap,
  filter,
} from 'rxjs'; // @browser

import { User } from './user';
const lodash= require('lodash'); // @backend TAG DOES NOT WORK
```

<br><br>
*backend*

```ts
import {
  Taon,
  Connection,
} from 'taon/src';
import fse from 'fs-extra'; // @backend
/* */
/* */
/* */
/* */

import { User } from './user';
const lodash= require('lodash'); // @backend TAG DOES NOT WORK
```

<br><br>

*browser*
```ts
import {
  Taon,
  Connection,
} from 'taon/src';
/* */
import {
  tap,
  filter,
} from 'rxjs'; // @browser

import { User } from './user';
const lodash= require('lodash'); // @backend TAG DOES NOT WORK
```


##  Cloudfalre backend

Sometime you need to cut from Normal NodeJs code parts 
that are not going to work inside Cloudfalre worker
(but are fine on normal taon cloud server)

Use **esm remove** tag

```ts

const backednFuctionOrMethod = (): SomeResult => {
  // #region @backendFunc

  if(UtilsOs.isRunningInCloudflareWorker()) {
    // api/libs compatible with cloudflare
  } else {
  // #region @esmRemove
  
  // api/libs with access to real server fs,child_process etc.
  // you can remove code that is not going to be used on
  // cloudflare

  // #endregion
  }
  // #endregion
}


```
