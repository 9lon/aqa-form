/* <link rel="import" href="../polymer/lib/mixins/mutable-data.html"> */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box-light.js';
import './aqa-combo-box-item.js';
import '@9lon/aqa-font/aqa-font.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class AqaComboBox extends PolymerElement {
  static get template() {
    return html`
        <style>
            * {
                font-family: TrirongLight;
                box-sizing: border-box;
            }

            .form-group {
                position: relative;
                /* margin-bottom: 20px; */
            }

            .form-control {
                -webkit-appearance: none;
                -webkit-box-shadow: none;
                box-shadow: none;

                -moz-appearance: none;

                display: block;
                width: 100%;
                height: 36px;
                padding: 6px 15px;
                font-size: 1rem;
                line-height: 1.57142857;
                color: #57626D;
                background-color: #fff;
                background-image: none;
                border: 1px solid #e4eaec;
                border-radius: 3px;
                -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
                -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
                transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
            }

            iron-input {
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                line-height: normal;
                margin: 0;
                font: inherit;
                color: inherit;
                outline: none;
                width: 100%;
                height: auto;
            }

            input:focus {
                border-color: #62a8ea
            }

            input[disabled] {
                background-color: #F3F7F9;
                border-color: #e4eaec;
                color: #a8b3c5;
                cursor: pointer;
                cursor: no-drop;
            }

            input::-webkit-input-placeholder {
                color: #A9A9A9;
            }

            input::-moz-placeholder {
                color: #A9A9A9;
            }

            input:-ms-input-placeholder {
                color: #A9A9A9;
            }

            input:-moz-placeholder {
                color: #A9A9A9;
            }

            label {
                font-weight: 300;
                display: inline-block;
                max-width: 100%;
                margin-bottom: 5px;
                color: #000;
            }

            .help-block {
                margin-bottom: 0;
            }

            small {
                font-size: 70%;
                color: #f96868;
            }

            label[invalid] {
                color: #f96868;
            }

            input[invalid] {
                border-color: #f96868 !important;
            }

            label>span {
                color: #f96868;
            }

            .input-container {
                position: relative;
            }

            .arrow-drop-downw {
                position: absolute;
                top: 6px;
                right: 20px;
                cursor: pointer;
            }

            .arrow-drop-down {
                position: absolute;
                top: 6px;
                right: 0;
                cursor: pointer;
            }
        </style>

        <div class="form-group">
            <template is="dom-if" if="[[!noLabelFloat]]">
                <label class="control-label" invalid\$="{{invalid}}">[[label]] &nbsp;
                    <template is="dom-if" if="[[required]]">
                        <span>*</span>
                    </template>
                </label>
            </template>
            <div class="input-container">
                <vaadin-combo-box-light id="vaadinComboBox" items="[[items]]" item-label-path="[[itemLabelPath]]" item-value-path="[[itemValuePath]]" attr-for-value="bind-value" disabled\$="[[disabled]]" selected-item="{{selectedItem}}" value="{{value}}">
                    <iron-input>
                        <input id="nativeInput" class="form-control" placeholder="[[placeholder]]" invalid\$="{{invalid}}" disabled\$="[[disabled]]">
                    </iron-input>
                    <template>
                        <aqa-combo-box-item item="[[item]]" item-label-path="[[itemLabelPath]]"></aqa-combo-box-item>
                    </template>
                </vaadin-combo-box-light>

                <template is="dom-if" if="{{value}}">
                    <iron-icon class="arrow-drop-downw" hidden="{{disabled}}" icon="icons:clear" on-click="reset"></iron-icon>
                </template>
                <iron-icon class="arrow-drop-down" hidden="{{disabled}}" icon="icons:arrow-drop-down" on-click="_focusInput"></iron-icon>
            </div>

            <template is="dom-if" if="[[invalid]]">
                <small class="help-block">[[errorMessage]]</small>
            </template>
        </div>
`;
  }

  static get is() { return 'aqa-combo-box'; }
  static get properties() {
      return {
          items: {
              type: Array,
              value: function () {
                  return []
              },
              observer: 'setSeleted'
          },
          label: {
              type: String,
              value: ""
          },
          setData: {
              type: Number,
              observer: '_valueChanged'
          },
          autoValidate: Boolean,
          required: {
              type: Boolean,
              value: false
          },
          pattern: {
              type: String
          },
          errorMessage: {
              type: String,
              value: ""
          },
          itemLabelPath: {
              type: String,
              value: "label"
          },
          itemValuePath: {
              type: String,
              value: "value"
          },
          fristValue: {
              type: Boolean,
              value: true
          },
          value: {
              notify: true,
              observer: '_valueChanged',
          },
          invalid: {
              type: Boolean,
              value: false,
              notify: true
          },
          placeholder: {
              type: String,
              value: 'เลือก'
          },
          disabled: {
              type: Boolean
          },
          selectedItem: {
              type: Object,
              notify: true
          },
          noLabelFloat:{
              type:Boolean,
              value:false
          }
      }
  }
  connectedCallback() {
      super.connectedCallback()
      this.$.vaadinComboBox.addEventListener('value-changed', (e) => {
          this.set('value', this.$.vaadinComboBox.value)
          //this.selectedItem = this.$.vaadinComboBox.selectedItem
          //console.log(this.selectedItem)
      })
  }
  validate() {
      this.invalid = false
      if (this.required && (this.value === "" || this.value === undefined || this.value === null)) {
          this.invalid = true
      }
      return this.invalid
  }



  reset() {
      this.invalid = false
      this.value = null
      this.$.nativeInput.value = ""
      this.selectedItem = null
  }
  setSeleted(items) {
      if (items.length >= 1) {
          this._valueChanged(this.value)
          this.$.vaadinComboBox.value = this.value
      }

  }

  _valueChanged(val) {
      if (this.autoValidate && this.required) {
          if (this.fristValue && this.value == "") {
              this.invalid = false
              this.fristValue = false
          } else if (this.value == "") {
              this.invalid = true
          } else {
              this.invalid = false
          }
      }
      let newDate = {}
      let detail = {
          queueProperty: false,
          value: null
      }
      if (val !== undefined && val !== '') {
          newDate = this.items.find(el => el[this.itemValuePath] === val)
          detail = {
              queueProperty: true,
              value: newDate
          }
      }

      setInterval(1,function(){
          this.dispatchEvent(new CustomEvent('selected-item-changed', {
              detail: detail
          }))
      }.bind(this))
  }

  _focusInput() {
      this.$.nativeInput.click()
  }
}
window.customElements.define(AqaComboBox.is, AqaComboBox);
