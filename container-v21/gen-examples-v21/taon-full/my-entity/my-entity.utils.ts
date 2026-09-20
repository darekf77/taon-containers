import { MyEntityModels } from './my-entity.models';

export namespace MyEntityUtils {
  export function isActive(state: string): state is MyEntityModels.MyEntityState {
    return state === 'active';
  }
}
