import { OnInit, EventEmitter, Provider } from '@angular/core';
import { CalendarComponentOptions, CalendarDay, CalendarComponentPayloadTypes, CalendarComponentMonthChange, CalendarComponentTypeProperty } from '../calendar.model';
import { CalendarService } from "../services/calendar.service";
import { ControlValueAccessor } from '@angular/forms';
export declare const ION_CAL_VALUE_ACCESSOR: Provider;
export declare class CalendarComponent implements ControlValueAccessor, OnInit {
    calSvc: CalendarService;
    private _d;
    private _options;
    private _view;
    private _calendarMonthValue;
    private _showToggleButtons;
    showToggleButtons: boolean;
    private _showMonthPicker;
    showMonthPicker: boolean;
    private monthOpt;
    format: string;
    type: CalendarComponentTypeProperty;
    readonly: boolean;
    onChange: EventEmitter<CalendarComponentPayloadTypes>;
    monthChange: EventEmitter<CalendarComponentMonthChange>;
    onSelect: EventEmitter<CalendarDay>;
    onSelectStart: EventEmitter<CalendarDay>;
    onSelectEnd: EventEmitter<CalendarDay>;
    options: CalendarComponentOptions;
    constructor(calSvc: CalendarService);
    ngOnInit(): void;
    getViewDate(): CalendarComponentPayloadTypes;
    setViewDate(value: CalendarComponentPayloadTypes): void;
    switchView(): void;
    prev(): void;
    next(): void;
    prevYear(): void;
    nextYear(): void;
    nextMonth(): void;
    canNext(): boolean;
    backMonth(): void;
    canBack(): boolean;
    monthOnSelect(month: number): void;
    onChanged($event: CalendarDay[]): void;
    swipeEvent($event: any): void;
    _onChanged: Function;
    _onTouched: Function;
    _payloadToTimeNumber(value: CalendarComponentPayloadTypes): number;
    _monthFormat(date: number): string;
    private initOpt();
    private createMonth(date);
    private _createCalendarDay(value);
    private _handleType(value);
    writeValue(obj: any): void;
    registerOnChange(fn: () => {}): void;
    registerOnTouched(fn: () => {}): void;
    private _writeValue(value);
}
