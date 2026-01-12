import type { EnvOptions } from 'tnp/src';
const env: Partial<EnvOptions> = {
  website: {
    domain: 'isomorphic-lib-v21.example.domain.com',
    title: 'Isomorphic Lib V 18',
    useDomain: true,
  },
  loading: {
     preAngularBootstrap: {
      background: 'gray',
      loader: {
        name: 'lds-default',
        color: 'black',
      }
     }
  }

};
export default env;
