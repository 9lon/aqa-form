import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@nylon/aqa-font/aqa-font.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class AqaInput extends PolymerElement {
  static get template() {
    return html`
        <style>
            * {
                font-family: TrirongLight;
                box-sizing: border-box;
            }

            /* .form-group {
                margin-bottom: 20px;
            } */

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
                color: #424242;
                background-color: #fff;
                background-image: none;
                border: 1px solid #e4eaec;
                border-radius: 3px;
                -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
                -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
                transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
            }

            input {
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                line-height: normal;
                margin: 0;
                font: inherit;
                color: inherit;
                outline: none;
            }

            input[disabled] {
                /* border: 0; */
                background-color: #F3F7F9;
                border-color: #e4eaec;
                color: #a8b3c5;
                cursor: pointer;
                cursor: no-drop;
            }

            input:focus {
                border-color: #62a8ea
            }

            input::-webkit-input-placeholder {
                /* Chrome/Opera/Safari */
                color: #A9A9A9;
            }

            input::-moz-placeholder {
                /* Firefox 19+ */
                color: #A9A9A9;
            }

            input:-ms-input-placeholder {
                /* IE 10+ */
                color: #A9A9A9;
            }

            input:-moz-placeholder {
                /* Firefox 18- */
                color: #A9A9A9;
            }

            label {
                font-weight: 300;
                display: inline-block;
                max-width: 100%;
                color: #000000;
                text-overflow: ellipsis;
                margin-bottom: 5px;
                white-space: nowrap;
                /* overflow: hidden; */
            }

            .help-block {
                font-size: 0.8rem;
                margin-bottom: 0;
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
        </style>
        <div class="form-group">
            <template is="dom-if" if="[[!noLabelFloat]]">
                <label class="control-label" invalid\$="{{invalid}}">[[label]]
                    <template is="dom-if" if="[[required]]">
                        <span>*</span>
                    </template>
                </label>
            </template>
            <input id="nativeInput" class="form-control" placeholder="[[placeholder]]" on-input="_inputChanged" invalid\$="[[invalid]]" disabled\$="[[disabled]]" maxlength\$="[[maxlength]]" minlength\$="[[minlength]]">
            <template is="dom-if" if="[[invalid]]">
                <span class="help-block">[[errorMessage]]</span>
            </template>
        </div>
`;
  }

  static get is() { return 'aqa-input' }
  static get properties() {
      return {
          label: {
              type: String,
              value: ""
          },
          value: {
              type: String,
              notify: true,
              observer: "_valueChanged"
          },
          valueInput: {
              type: String,
              value: ""
          },
          autoValidate: Boolean,
          pattern: {
              type: String,
              value: ""
          },
          maxlength: {
              type: Number,
          },
          minlength: {
              type: Number,
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
          placeholder: {
              type: String,
              value: ""
          },
          errorMessage: {
              type: String,
              value: ""
          },
          allowedPattern: {
              type: String,
              value: ""
          },
          type: {
              type: String,
              value: "text",
              observer: '_typeChanged'
          },
          disabled: {
              type: Boolean
          },
          dataPattern: {
              type: String,
              value: ""
          },
          noLabelFloat:{
              type:Boolean,
              value:false
          }

      }
  }

  validate() {
      this.invalid = false
      // this.value = this.value.trim()
      // console.log(this.required,this.value)
      if (this.required && (this.value == "" || typeof this.value == "undefined")) {
          this.invalid = true
      }
      // console.log(this.value);
      if (this.value !== undefined) {
          switch (this.type) {
              case 'phone':
                  this.invalid = (this.value.length !== 10 ? true : false)
                  break;
              case 'pid':
                  this.invalid = (this.value.length !== 13 ? true : false)
                  break;
              default:

          }
      }

      return this.invalid
  }

  reset() {
      this.invalid = false
      this.value = ""
  }

  _typeChanged(type) {
      if (type == "phone" || type == "pid" || type == "date") {
          this.allowedPattern = "[0-9]"
      }
  }

  _valueChanged(newVal, oldVal) {
      var input = this.$.nativeInput
      input.value = this._convertDataToPattern(newVal)

      if (this.autoValidate) {
          if (this.pattern != "") {
              var patt = new RegExp('^' + this.pattern + '$');
              var res = patt.test(input.value);
              if (!res) {
                  this.invalid = true
              } else {
                  this.invalid = false
              }
          } else if (this.required) {
              if (input.value == "") {
                  this.invalid = true
              } else {
                  this.invalid = false
              }
          } else {
              this.invalid = false
          }

      }
      // if (this.type === 'phone') {
      //     this.invalid = (newVal.length !== 10 ? true : false)
      // }
      // if (this.type === 'pid') {
      //     this.invalid = (newVal.length !== 13 ? true : false)
      // }
      if (this.value !== undefined) {
          switch (this.type) {
              case 'phone':
                  this.invalid = (this.value.length !== 10 ? true : false)
                  break;
              case 'pid':
                  this.invalid = (this.value.length !== 13 ? true : false)
                  break;
              default:
          }
      }

  }

  _convertDataToPattern(newVal) {

      var value = newVal || ""
      var valueInput = ""

      if (this.type == "phone") {

          valueInput += value.substring(0, 3)
          if (value.length > 3) {
              valueInput += '-'
          }

          valueInput += value.substring(3, 6)
          if (value.length > 6) {
              valueInput += '-'
          }

          valueInput += value.substring(6, 10)

      } else if (this.type == "pid") {
          valueInput += value.substring(0, 1)
          if (value.length > 1) {
              valueInput += '-'
          }

          valueInput += value.substring(1, 5)
          if (value.length > 5) {
              valueInput += '-'
          }

          valueInput += value.substring(5, 10)
          if (value.length > 10) {
              valueInput += '-'
          }

          valueInput += value.substring(10, 12)
          if (value.length > 12) {
              valueInput += '-'
          }

          valueInput += value.substring(12, 13)

      } else if (this.type == "date") {
          valueInput += value.substring(0, 2)
          if (value.length > 2) {
              valueInput += '/'
          }

          valueInput += value.substring(2, 4)
          if (value.length > 4) {
              valueInput += '/'
          }

          valueInput += value.substring(4, 8)

      }
      else {
          valueInput = value
      }

      return valueInput

  }

  _convertPatternToData(newVal) {

      var value = newVal || ""
      var valueInput = ""

      if (this.type == "phone") {
          var val = value.replace(/-/g, "")
          val = val.substring(0, 10)
          valueInput = val
      } else if (this.type == "pid") {
          var val = value.replace(/-/g, "")
          val = val.substring(0, 13)
          valueInput = val
      } else if (this.type == "date") {
          var val = value.replace(/\//g, "")
          val = val.substring(0, 8)
          valueInput = val
      } else {
          valueInput = value
      }

      return valueInput


  }

  _inputChanged(e) {

      e.target.value = this._convertDataToPattern(this._convertPatternToData(e.target.value))
      var value = this._convertPatternToData(e.target.value)


      if (value != "" && this.allowedPattern != "") {
          var patt = new RegExp('^' + this.allowedPattern + '*$');
          var res = patt.test(value);
          if (!res) {
              e.target.value = this._convertDataToPattern(this.value)
          }
      }

      this.value = this._convertPatternToData(e.target.value)


      // var value = this.newVal || ""
      // value = val.replace(/-/g, "")
      // //this.value = value

      // var valueInput = ""  
      // if(value.length >= 3){
      //     valueInput +=  valueInput.substring(0, 3)+'-'
      // }
      // this.valueInput
  }
}

window.customElements.define(AqaInput.is, AqaInput);
