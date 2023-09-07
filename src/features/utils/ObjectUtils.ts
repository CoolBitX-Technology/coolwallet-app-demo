import flatFlatten from 'flat';
import { isNil, isEmpty } from 'lodash';
import mapObj, { mapObjectSkip } from 'map-obj';

type AnyObject = Record<string, any> | Array<any>;
type PartialExcept<T, K extends keyof T> = { [P in K]: T[P] } & { [P in keyof T]?: T[P] | undefined };
interface FlattenOptions {
  shouldFlattenArray?: boolean;
  delimiter?: string;
}
const emptyFlattenOptions = {};
export interface ObjectEntry<T = unknown> {
  key: string;
  value: T;
}
export type ObjectRejecter<T = unknown> = (obj: ObjectEntry<T>) => boolean;

export default class ObjectUtils {
  static isObject(input: unknown): boolean {
    return typeof input === 'object' && input !== null && !Array.isArray(input);
  }

  static isObjectOrArray(input: unknown): boolean {
    return typeof input === 'object' && input !== null;
  }

  static toJsonOrEmptyString(input: unknown): string {
    if (this.isObjectOrArray(input)) {
      return JSON.stringify(input);
    }
    return '';
  }

  static checkNotNull<T = any>(obj: T, errMsg: string): NonNullable<T> {
    if (!obj) {
      throw new Error(errMsg);
    }
    return obj as NonNullable<T>;
  }

  static checkNotNil<T = any>(obj: T, errMsg: string): NonNullable<T> {
    if (isNil(obj)) {
      throw new Error(errMsg);
    }
    return obj as NonNullable<T>;
  }

  static checkNotString<T = any>(obj: T, errMsg: string): NonNullable<T> {
    if (isNil(obj) || typeof obj !== 'string') {
      throw new Error(errMsg);
    }
    return obj as NonNullable<T>;
  }

  static flatten(inputObject: AnyObject, options: FlattenOptions = emptyFlattenOptions): AnyObject {
    const { shouldFlattenArray, delimiter } = options;
    return flatFlatten(inputObject, { safe: !shouldFlattenArray, delimiter }); // When enabled safe, arrays and their contents will be preserved.
  }

  static compactObject(obj: Record<string, any>) {
    return mapObj(obj, (k, v) => (isEmpty(k) ? mapObjectSkip : [k, v]), {
      deep: true,
    });
  }

  // ref: https://stackoverflow.com/questions/52367849/remove-empty-null-values-from-nested-object-es6-clean-nested-objects
  static clean(inputObject: AnyObject, shouldReject?: ObjectRejecter): AnyObject {
    Object.entries(inputObject).forEach(([key, value]) => {
      if (value && typeof value === 'object') {
        this.clean(value as AnyObject, shouldReject);
      }
      const isNonEmptyObject = value && typeof value === 'object' && !Object.keys(value).length;
      if (isNonEmptyObject || value === null || value === undefined) {
        if (Array.isArray(inputObject)) {
          const index = parseInt(key);
          const array = inputObject as Array<unknown>;
          array.splice(index, 1);
        } else {
          delete inputObject[key];
        }
      } else if (shouldReject) {
        const wrappedObject = inputObject as Record<string, unknown>;
        shouldReject({ key, value }) && delete wrappedObject[key];
      }
    });
    return inputObject;
  }

  static isNumeric(value?: string | number) {
    if (value === undefined || value === null) return false;
    if (typeof value === 'number' && Number.isInteger(value) && value > 0) return true;
    return /^[1-9]\d*$/.test(value as string);
  }
}

export type { PartialExcept };
