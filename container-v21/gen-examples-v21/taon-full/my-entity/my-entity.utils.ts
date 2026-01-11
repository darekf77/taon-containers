import { MyEntityState } from './my-entity.models';

export namespace MyEntityUtils {
  export function isActive(state: string): state is MyEntityState {
    return state === 'active';
  }
}
