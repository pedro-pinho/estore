import { BehaviorSubject, Observable } from "rxjs";

export class StoreItem<T> {
  private _state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
  }

  protected setValue(value: T): void {
    this._state$.next(value);
  }

  protected get value$(): Observable<T> {
    return this._state$.asObservable();
  }

  protected get value(): T {
    return this._state$.value;
  }
}
