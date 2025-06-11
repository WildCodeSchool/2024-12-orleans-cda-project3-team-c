import type { AliasableExpression } from 'kysely';

export default function notNull<T>(expr: AliasableExpression<T>) {
  return expr as unknown as AliasableExpression<Exclude<T, null>>;
}
