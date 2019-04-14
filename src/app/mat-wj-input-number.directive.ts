import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Directive, DoCheck, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { WjInputNumber } from 'wijmo/wijmo.angular2.input';

let nextUniqueId = 0;

@Directive({
  selector: 'wj-input-number[appMatWjInput]',
  providers: [
    { provide: MatFormFieldControl, useExisting: MatWjInputNumberDirective }
  ]
})
export class MatWjInputNumberDirective implements MatFormFieldControl<any>, OnInit, OnDestroy, OnChanges, DoCheck {

  readonly controlType: string = 'mat-wj-input-number';
  readonly stateChanges = new Subject<void>();

  private readonly uid = `mat-wj-input-number-${nextUniqueId++}`;

  private _id!: string;
  private _required: boolean = false;

  autofilled: boolean = false;
  focused: boolean = false;


  @Input()
  placeholder!: string;

  get id(): string {
    return this._id || this.uid;
  }

  @Input()
  set id(id: string) {
    this._id = id || this.uid;
  }

  get required(): boolean {
    return this._required;
  }

  @Input()
  set required(required: boolean) {
    // Wijmoのコントロールはrequired指定すると必ず初期値が入る仕様なので、FormFieldとしてのrequiredを別途持つ
    this._required = coerceBooleanProperty(required);
  }

  get value(): number | null {
    const value = this.wjControl.value;
    return value == null ? null : value;
  }

  get disabled(): boolean {
    return this.wjControl.isDisabled;
  }

  get empty(): boolean {
    return this.value == null;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  get errorState(): boolean {
    return this.ngControl && this.ngControl.invalid === true;
  }

  constructor(
    @Self() private readonly wjControl: WjInputNumber,
    @Optional() @Self() public readonly ngControl: NgControl,
    private readonly focusMonitor: FocusMonitor,
    private readonly autofillMonitor: AutofillMonitor
  ) {
  }

  ngDoCheck(): void {
  }

  ngOnInit(): void {
    const el = this.wjControl.inputElement;
    this.focusMonitor.monitor(el, false).subscribe(state => {
      this.focused = state !== null;
      this.stateChanges.next();
    });
    this.autofillMonitor.monitor(el).subscribe(ev => {
      this.autofilled = ev.isAutofilled;
      this.stateChanges.next();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.stateChanges.next();
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();

    const el = this.wjControl.inputElement;
    this.focusMonitor.stopMonitoring(el);
    this.autofillMonitor.stopMonitoring(el);
  }


  onContainerClick(event: MouseEvent): void {
    this.wjControl.focus();
  }

  setDescribedByIds(ids: string[]): void {
    // Do nothing
  }

}
