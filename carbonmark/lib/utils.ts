import isNil from "lodash/isNil";
import negate from "lodash/negate";

export const notNil = <T>(a: T): a is NonNullable<T> => negate(isNil)(a);
