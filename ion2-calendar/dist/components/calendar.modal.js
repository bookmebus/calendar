"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var calendar_service_1 = require("../services/calendar.service");
var moment = require("moment");
var config_1 = require("../config");
var translate = require("@ngx-translate/core");
var CalendarModal = /** @class */ (function () {
    function CalendarModal(_renderer, _elementRef, params, viewCtrl, ref, calSvc) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.ref = ref;
        this.calSvc = calSvc;
        this.datesTemp = [null, null];
        this._s = true;
        this.segment = 'startDate';
        this.startDateValue = null;
        this.returnDateValue = null;
        this.checkStatus = true;
        this.buttonText = "I'm travelling one way";
        this.buttonTextKey = "ImTravellingOneWay"
        this.checkStartDate = null;
        this.firstOpen = true;
        this.firstOpenSetDate = true;
        this.startDateCheck = null;
        this.returnDateCheck = null;
        this.setDefaultDate = false;
        this.startDateDefault = null;
        this.returnDateDefault = null;
        this.TranslateText = null;
        this.textEn = {
          ChooseDate : "Choose Date",
          StartDate: "Start Date",
          ReturnDate: "Return Date",
          ImTravellingOneWay: "I'm travelling one way",
          ImTravellingWithReturnTrip : "I'm travelling with return trips",
        };
        this.textKh = {
          ChooseDate : "ជ្រើសកាលបរិច្ឆេទ",
          StartDate: "ថ្ងៃចេញដំណើរ",
          ReturnDate: "ថ្ងៃត្រឡប់មក",
          ImTravellingOneWay: "ជ្រើសរើស",
          ImTravellingWithReturnTrip : "ជ្រើសរើស",
        };
        this.monthTranslationKh = ["មករា", "កម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"]
        this.monthTranslationEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        this.monthTranslation = null
        // {
        //     kh: ["មករា", "កម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"],
        //     en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        //   }
      }
    CalendarModal.prototype.onSegmentChange = function () {
      let fromDate;
      let toDate;
      if(this.segment == "startDate"){

        if(this.returnDateCheck !== null){
          if(this.returnDateCheck.time !== undefined){
            toDate = new Date(this.returnDateCheck.time)
          }else{
            toDate = new Date(this.returnDateCheck)
          }
          this.params.data.options.to = toDate;
          this._d.to = toDate;
          this.params.data.options.pickMode = config_1.pickModes.RANGE;
          this._d.pickMode = config_1.pickModes.RANGE;
          this._d.defaultDateRange = {to:this.returnDateCheck};
          this.params.data.options.defaultDateRange ={to: this.returnDateCheck}
        }else{
          fromDate = new Date();
        }

      }

      if(this.segment == "returnDate"){
        this.params.data.options.pickMode = config_1.pickModes.RANGE;
        this._d.pickMode = config_1.pickModes.RANGE;
        if(this.checkStartDate !== null){
          if(this.checkStartDate.time !== undefined){
            fromDate = new Date(this.checkStartDate.time)
          }else{
            fromDate = new Date(this.checkStartDate)
          }
        }
        //delet to cuz we want to show more date to select
        delete this.params.data.options.to;
        delete this._d.to
      }
      this.params.data.options.from = fromDate;
      this._d.from = fromDate;
      this._d.defaultDateRange = {from:fromDate};
      this.params.data.options.defaultDateRange ={from: fromDate}
      this._d.defaultDateRange = {to:toDate};
      this.params.data.options.defaultDateRange ={to:toDate}
      this.init();
      this.initDefaultDate();
    };
    CalendarModal.prototype.ngOnInit = function () {
        this.init();
        this.initDefaultDate();
    };
    CalendarModal.prototype.ionViewDidLoad = function () {
        this.findCssClass();
        this.scrollToDefaultDate();
        if(this.setDefaultDate === false){
          let sDate = this.params.data.options.startDate;
          let rDate = this.params.data.options.returnDate;
          if(sDate !== undefined){
            this.checkStartDate = sDate;
            this.startDateDefault = sDate;
          }
          if(rDate !== undefined){
            this.returnDateCheck = rDate;
            this.returnDateDefault = rDate;
          }
          this.setDefaultDate = true;
          this.initDefaultDate();
        }
        if(this.segment == "startDate"){
          
          if(this.params.data.options.returnDate !== undefined){
            this.returnDateCheck = this.params.data.options.returnDate;
            let d = new Date(this.params.data.options.returnDate);
            this.params.data.options.to = d
            this._d.to = d;
            this.init();
            this.initDefaultDate();
          }
          this.init();
          this.initDefaultDate();
        }
        if(this.segment == "returnDate"){
         
          if(this.params.data.options.startDate !== null){
            this.checkStartDate = this.params.data.options.startDate;
            let d = new Date(this.params.data.options.startDate);
            this.params.data.options.from = d
            this._d.from = d;
            this.init();
            this.initDefaultDate();
          }
          if(this.params.data.options.defaultreturnDate == null){
            this.buttonTextKey = "ImTravellingOneWay"
          }else{
            this.buttonTextKey = "ImTravellingWithReturnTrip"
          }
        }
        
        
    };



    CalendarModal.prototype.init = function () {
      let lang = localStorage['lang']
      if(lang == 'en'){
        this.TranslateText = this.textEn
        this.monthTranslation = this.monthTranslationEn
      }else if(lang == 'kh'){
        this.TranslateText = this.textKh
        this.monthTranslation = this.monthTranslationKh
      }
      let segmentActive = this.params.get('options');
      let defaultScrollDate = null;
        if(this.firstOpen === true){
          this.segment = segmentActive.title;
          this.firstOpen = false;
        }
       
        let checkTo = new Date(this.params.data.options.to)
        let checkYearTo = checkTo.getFullYear()
        if(checkYearTo < 2018){
          this.params.data.options.to = 0
        }
        this._d = this.calSvc.safeOpt(this.params.get('options'));
        this._d.showAdjacentMonthDay = false;
        
        if(this.segment == "startDate"){
            this._d.defaultScrollTo = new Date(this.params.data.options.startDate)
        }
        // else{
        //     if(this.params.data.options.startDate != undefined || this.params.data.options.startDate != null){
        //         this._d.defaultScrollTo = new Date(this.params.data.options.startDate)
        //     }
        // }
        console.log(' this._d.defaultScrollTo', this._d.defaultScrollTo)
        this.step = this._d.step;
        if (this.step < 1) {
            this.step = 1;
        }
        this.calendarMonths = this.calSvc.createMonthsByPeriod(moment(this._d.from).valueOf(), this.findInitMonthNumber(this._d.defaultScrollTo) + this.step, this._d);
        console.log('this.calendarMonths',this.calendarMonths)
    };
    CalendarModal.prototype.initDefaultDate = function () {
        var _this = this;
        var _a = this._d, pickMode = _a.pickMode, defaultDate = _a.defaultDate, defaultDateRange = _a.defaultDateRange, defaultDates = _a.defaultDates;
        switch (pickMode) {
            case config_1.pickModes.SINGLE:
                if (defaultDate) {
                    this.datesTemp[0] = this.calSvc.createCalendarDay(this._getDayTime(defaultDate), this._d);
                }
                break;
            case config_1.pickModes.RANGE:
                if (defaultDateRange) {
                    if (defaultDateRange.from) {
                        this.datesTemp[0] = this.calSvc.createCalendarDay(this._getDayTime(defaultDateRange.from), this._d);
                    }
                    if (defaultDateRange.to) {
                        this.datesTemp[1] = this.calSvc.createCalendarDay(this._getDayTime(defaultDateRange.to), this._d);
                    }
                }
                break;
            case config_1.pickModes.MULTI:
                if (defaultDates && defaultDates.length) {
                    this.datesTemp = defaultDates.map(function (e) { return _this.calSvc.createCalendarDay(_this._getDayTime(e), _this._d); });
                }
                break;
            default:
                this.datesTemp = [null, null];
        }
    };
    CalendarModal.prototype.findCssClass = function () {
        var _this = this;
        var cssClass = this._d.cssClass;
        if (cssClass) {
            cssClass.split(' ').forEach(function (_class) {
                if (_class.trim() !== '')
                    _this._renderer.addClass(_this._elementRef.nativeElement, _class);
            });
        }
    };
    CalendarModal.prototype.onChange = function (data) {
        delete this.params.data.options.defaultDateRange;
        var _a = this._d, pickMode = _a.pickMode, autoDone = _a.autoDone;
        if(this.segment === "startDate" && this.returnDateCheck === null){
          this.checkStartDate = data[0];
           _a.pickMode = config_1.pickModes.SINGLE;
           data[1] = null
          this.checkStatus = false;
          this.buttonText = "I'm travelling one way";
          this.buttonTextKey = "ImTravellingOneWay"
          this.firstOpenSetDate = false;
        }else if(this.segment === "startDate" && this.returnDateCheck !== null){
          _a.pickMode = config_1.pickModes.RANGE;

          let tt = data;
          if(this.returnDateCheck.time === undefined){
          data[1] = this.calSvc.createCalendarDay(this._getDayTime(this.returnDateCheck), this._d);
        }else{
          data[1] = this.returnDateCheck;
        }
          this.buttonText = "I'm travelling with return trip";
          this.buttonTextKey = "ImTravellingWithReturnTrip"
          data[0] = tt[0];
          this.checkStartDate = data[0];
          this.checkStatus = false;

        }
        if(this.segment === "returnDate"){
          this.buttonText = "I'm travelling with return trip";
          this.buttonTextKey = "ImTravellingWithReturnTrip"
          _a.pickMode = config_1.pickModes.RANGE;
          pickMode = _a.pickMode;
          let t = [];
          if(this.checkStartDate.time === undefined){
            t[0] = this.calSvc.createCalendarDay(this._getDayTime(this.checkStartDate), this._d);
          }else{
            t[0] = this.checkStartDate;
          }
          if(this.firstOpenSetDate === true){
            let g = new Date(this.params.data.options.startDate);
            let f = this.calSvc.createCalendarDay(this._getDayTime(g), this._d);
            t[0] = f;
            this.firstOpenSetDate = false;
            this.checkStatus = false;
          }
          if(data[1] !== null){
            t[1] = data[1];
          }else{
            t[1] = data[0];
          }
          this.returnDateCheck = t[1];
          data = t;
        }
        this.datesTemp = data;
        this.ref.detectChanges();
        if (pickMode !== config_1.pickModes.MULTI && autoDone && this.canDone()) {
            this.done();

        }

    };
    CalendarModal.prototype.onCancel = function () {
        this.viewCtrl.dismiss(null, 'cancel');
    };
    CalendarModal.prototype.done = function () {
        this.datesTemp.startDate = this.startDateValue;
        this.datesTemp.returnDate = this.returnDateValue;
        this.viewCtrl.dismiss(this.datesTemp, 'done');
    };
    CalendarModal.prototype.onSelect = function () {

    }
    CalendarModal.prototype.canDone = function () {

        if (!Array.isArray(this.datesTemp)) {
            return false;
        }
        var pickMode = this._d.pickMode;
        switch (pickMode) {
            case config_1.pickModes.SINGLE:
                return !!(this.datesTemp[0] && this.datesTemp[0].time);
            case config_1.pickModes.RANGE:
                return !!(this.datesTemp[0] && this.datesTemp[1]) && !!(this.datesTemp[0].time && this.datesTemp[1].time);
            case config_1.pickModes.MULTI:
                return this.datesTemp.length > 0 && this.datesTemp.every(function (e) { return !!e && !!e.time; });
            default:
                return false;
        }




    };
    CalendarModal.prototype.oneWayButtonClicked = function () {
      let tempStart = null;
      let tempReturn = null;
      if(this.datesTemp[1] === null){
         tempStart = this.calSvc.wrapResult(this.datesTemp, config_1.pickModes.SINGLE);
         this.datesTemp.oneWayTravelling = true;
      }else{
        tempStart = this.calSvc.wrapResult(this.datesTemp, config_1.pickModes.MULTI);
        tempReturn = this.calSvc.wrapResult(this.datesTemp, config_1.pickModes.MULTI);
        this.datesTemp.oneWayTravelling = false;
      }

      this.datesTemp.startDate = tempStart
      this.datesTemp.returnDate = tempReturn;
      this.viewCtrl.dismiss(this.datesTemp, 'done');
    };
    CalendarModal.prototype.nextMonth = function (infiniteScroll) {
        this.infiniteScroll = infiniteScroll;
        var len = this.calendarMonths.length;
        var final = this.calendarMonths[len - 1];
        var nextTime = moment(final.original.time).add(1, 'M').valueOf();
        var rangeEnd = this._d.to ? moment(this._d.to).subtract(1, 'M') : 0;
        if (len <= 0 || (rangeEnd !== 0 && moment(final.original.time).isAfter(rangeEnd))) {
            infiniteScroll.enable(false);
            return;
        }
        (_a = this.calendarMonths).push.apply(_a, this.calSvc.createMonthsByPeriod(nextTime, 1, this._d));
        infiniteScroll.complete();
        var _a;
    };
    CalendarModal.prototype.backwardsMonth = function () {
        var first = this.calendarMonths[0];
        if (first.original.time <= 0) {
            this._d.canBackwardsSelected = false;
            return;
        }
        var firstTime = moment(first.original.time).subtract(1, 'M').valueOf();
        (_a = this.calendarMonths).unshift.apply(_a, this.calSvc.createMonthsByPeriod(firstTime, 1, this._d));
        this.ref.detectChanges();
        var _a;
    };
    CalendarModal.prototype.scrollToDefaultDate = function () {
        var _this = this;
        var defaultDateIndex = this.findInitMonthNumber(this._d.defaultScrollTo);
        var defaultDateMonth = this.monthsEle.nativeElement.children["month-" + defaultDateIndex].offsetTop;
        console.log('defaultDateMonth',defaultDateMonth)
        if (defaultDateIndex === 0 || defaultDateMonth === 0)
            return;
        setTimeout(function () {
            _this.content.scrollTo(0, defaultDateMonth, 128);
        }, 300);
    };
    CalendarModal.prototype.onScroll = function ($event) {
        var _this = this;
        if (!this._d.canBackwardsSelected)
            return;
        if ($event.scrollTop <= 200 && this._s) {
            this._s = !1;
            var lastHeight_1 = this.content.getContentDimensions().scrollHeight;
            setTimeout(function () {
                _this.backwardsMonth();
                var nowHeight = _this.content.getContentDimensions().scrollHeight;
                _this.content.scrollTo(0, nowHeight - lastHeight_1, 0)
                    .then(function () {
                    _this._s = !0;
                });
            }, 180);
        }
    };
    CalendarModal.prototype.findInitMonthNumber = function (date) {
        var startDate  = moment(this._d.from);
        var defaultScrollTo = moment(date);
        var isAfter = defaultScrollTo.isAfter(startDate);
        if (!isAfter)
            return 0;
        if (this.showYearPicker) {
            startDate = moment(new Date(this.year, 0, 1));
        }
        console.log("defaultScrollTo.diff(startDate, 'month')",defaultScrollTo.diff(startDate, 'month'))
        return defaultScrollTo.diff(startDate, 'month');
    };
    CalendarModal.prototype._getDayTime = function (date) {
        return moment(moment(date).format('YYYY-MM-DD')).valueOf();
    };
    CalendarModal.prototype._monthFormat = function (date) {
        return moment(date).format(this._d.monthFormat.replace(/y/g, 'Y'));
    };
    CalendarModal.prototype.trackByIndex = function (index, moment) {
        return moment.original ? moment.original.time : index;
    };

    CalendarModal.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ion-calendar-modal',
                    template: "\n<ion-header style='background-color:rgb(18, 176, 226) !important;'>\n      <ion-navbar text-center style='background-color:rgb(18, 176, 226) !important;' [color]=\"_d.color\">\n\n "+
                          "<ion-title text-center>{{TranslateText['ChooseDate']}}</ion-title>\n\n      "+
                          "</ion-navbar>\n\n   "+
                          " <ion-segment mode='md' [(ngModel)]='segment' (ionChange)='onSegmentChange()'>"+
                          "<ion-segment-button class='segment-calender' value='startDate'>{{TranslateText['StartDate']}}</ion-segment-button>"+
                          "<ion-segment-button class='segment-calender' value='returnDate'>{{TranslateText['ReturnDate']}}</ion-segment-button>"+
                          "</ion-segment> "+
                          "</ion-header>\n\n    <ion-content (ionScroll)=\"onScroll($event)\" class=\"calendar-page\"\n "+

                          "[ngClass]=\"{'multi-selection': _d.pickMode === 'multi'}\">\n\n   "+
                          "   <div #months>\n      "+
                          " <ng-template ngFor let-month [ngForOf]=\"calendarMonths\" [ngForTrackBy]=\"trackByIndex\" let-i=\"index\">\n       "+
                          "<div class=\"month-box\" [attr.id]=\"'month-' + i\">\n         "+
                          "<h4 class=\"text-center month-title\">{{monthTranslation[month.original.month]}} {{month.original.year}}</h4>\n        "+
                          "<ion-calendar-month [month]=\"month\"\n                                [pickMode]=\"_d.pickMode\"\n             "+
                          "[isSaveHistory]=\"_d.isSaveHistory\"\n                                [id]=\"_d.id\"\n              "+
                          "[color]=\"_d.color\"\n                                (onChange)=\"onChange($event)\"\n             "+
                          "[(ngModel)]=\"datesTemp\">\n\n            </ion-calendar-month>\n          </div>\n      "+
                          "</ng-template>\n\n      </div>\n\n      <ion-infinite-scroll (ionInfinite)=\"nextMonth($event)\">\n     "+
                          "<ion-infinite-scroll-content></ion-infinite-scroll-content>\n   "+
                          "</ion-infinite-scroll>\n\n    </ion-content>\n  "+
                          "<ion-footer (click)='oneWayButtonClicked()' ><div class=\"content-footer\" >"+
                          "<button ion-button full clear style=\"color: white\" class=\"primary-button\">"+
                          "<p><b>{{TranslateText[buttonTextKey]}}</b></p></button></div>"
                },] },
    ];
    /** @nocollapse */
    CalendarModal.ctorParameters = function () { return [
        { type: core_1.Renderer2, },
        { type: core_1.ElementRef, },
        { type: ionic_angular_1.NavParams, },
        { type: ionic_angular_1.ViewController, },
        { type: core_1.ChangeDetectorRef, },
        { type: calendar_service_1.CalendarService, },
    ]; };
    CalendarModal.propDecorators = {
        "content": [{ type: core_1.ViewChild, args: [ionic_angular_1.Content,] },],
        "monthsEle": [{ type: core_1.ViewChild, args: ['months',] },],
    };
    return CalendarModal;
}());
exports.CalendarModal = CalendarModal;
