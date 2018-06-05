import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@nylon/aqa-font/aqa-font.js';
import { IronValidatorBehavior } from '@polymer/iron-validator-behavior/iron-validator-behavior.js';
import './aqa-date-picker-light.js';
import './aqa-date-icon.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

class AqaDatePicker extends mixinBehaviors([IronValidatorBehavior], PolymerElement) {
  static get template() {
    return html`
    <style>
      .container {
        position: relative;
      }

      .container>iron-icon {
        position: absolute;
        cursor: pointer;
        bottom: 6px;
        right: 6px;
      }
    </style>
    <div class="container">
      <slot id="slot"></slot>

      <template is="dom-if" if="{{!disabled}}">
        <iron-icon icon="aqa-data-icon:calendar" on-click="_iconClick"></iron-icon>
      </template>


    </div>
`;
  }

  static get is() { return 'aqa-date-picker'; }
  static get properties() {
    return {
      value: {
        type: String,
        observer: 'setData',
        notify: true
      },
      errorMessage: {
        type: String
      },
      invalid: {
        type: Boolean,
        value: false,
        notify: true
      },
      required: {
        type: Boolean,
        value: false
      },
      disabled: {
        type: Boolean,
        value: false,
        observer: 'setDisabled'
      }
    }
  }
  constructor() {
    super()

    if (!window.aqaDataPickerSection) {
      window.aqaDataPickerSection = document.createElement('aqa-date-picker-light')
      window.aqaDataPickerSection.id = "aqaDataPickerLight"
      document.querySelector('body').appendChild(window.aqaDataPickerSection)
    }

  }

  connectedCallback() {
    super.connectedCallback()
    setTimeout(() => {

      this.child = this.children[0]
      this.child.type = 'date'
      this.child.required = this.required
      this.child.invalid = this.invalid
      this.child.errorMessage = this.errorMessage
      this.child.disabled = this.disabled
      this.nativeInput = this.child.$.nativeInput
      this.nativeInput.addEventListener('focus', this._showDatePicker.bind(this))

      this.aqaDataPickerLight = document.getElementById('aqaDataPickerLight')
      this.calendar = aqaDataPickerLight.$.calendar
      this.aqaDataPickerLight.addEventListener('setDate', this._hideDatePicker.bind(this))
    }, 1)

  }
  setDisabled(disabled = false) {
    setTimeout(() => {
      this.child.disabled = disabled
    }, 2)

  }
  _iconClick() {
    if (!this.disabled) {
      this.nativeInput.focus()
    }

  }

  _showDatePicker() {
    this.child.addEventListener('value-changed', this._childValueChanged.bind(this))

    this.aqaDataPickerLight.child = this.child

    this.calendar.style.display = "block"
    var bodyHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

    var offsetChild = this.child.getBoundingClientRect()
    var offsetCalendar = this.calendar.getBoundingClientRect()

    if (
      (bodyHeight - (offsetChild.top + offsetChild.height)) > offsetCalendar.height
    ) {
      this.calendar.style.left = (offsetChild.left + offsetChild.width - offsetCalendar.width) + 'px';
      this.calendar.style.top = (offsetChild.top + offsetChild.height) + 'px';
    } else {
      this.calendar.style.left = (offsetChild.left + offsetChild.width - offsetCalendar.width) + 'px';
      this.calendar.style.top = (offsetChild.top - offsetCalendar.height) + 'px';
    }

  }

  _hideDatePicker() {
    setTimeout(() => {
      this.calendar.style.display = "none"
    }, 100)

  }

  _childValueChanged(e) {
    var value = e.target.value
    var valueInput = "";

    valueInput += value.substring(0, 2)
    if (value.length > 2) {
      valueInput += '/'
    }
    valueInput += value.substring(2, 4)
    if (value.length > 4) {
      valueInput += '/'
    }
    valueInput += value.substring(4, 8)

    this.aqaDataPickerLight.selectedBe = valueInput
    this.set('value', this.aqaDataPickerLight.selected)
    if (valueInput.length < 7) {
      this.set('value', valueInput)
      this.aqaDataPickerLight.selected = valueInput
    }


  }
  setData(value) {

    if (value === undefined)
      return

    if (value.length > 9) {
      setTimeout(() => {
        this.child.required = this.required
        var select = value.split('-')
        var selectData = {
          day: select[2],
          month: select[1],
          year: parseInt(select[0])
        }
        let da = `${selectData.day}/${selectData.month}/${selectData.year + 543}`
        this.aqaDataPickerLight.child = this.child
        this.aqaDataPickerLight.selectedBe = da
      }, 2)
    }
  }
  validate() {


    let be = this.aqaDataPickerLight.selectedBe
    let dc = this.aqaDataPickerLight.selected
    let arr = []
    arr.push((/^\d{4}[-]\d{1,2}[-]\d{1,2}/).test(dc))
    arr.push((/^\d{1,2}[/]\d{1,2}[/]\d{4}/).test(be))
    let checkData = (arr.find(item => item === false) === undefined ? false : true)

    this.child.invalid = checkData
    this.child.errorMessage = this.errorMessage

    return checkData
  }
}

window.customElements.define(AqaDatePicker.is, AqaDatePicker);
