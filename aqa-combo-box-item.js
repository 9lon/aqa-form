import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@9lon/aqa-font/aqa-font.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class AqaComboBoxItem extends PolymerElement {
  static get template() {
    return html`
        <style>
            * {
                font-family: TrirongLight;
                box-sizing: border-box;
            }

            .item {
                color: #424242 
            }
        </style>
        <div class="item">[[_itemLabel(item,itemLabelPath)]]</div>
`;
  }

  static get is() { return 'aqa-combo-box-item'; }
  static get properties() {
      return {
          item:{
              type:Object,
              value:function(){
                  return {}
              }
          },
          itemLabelPath:String
          
      }
  }

  _itemLabel(item,label){
     return  item[label]
  }
}
window.customElements.define(AqaComboBoxItem.is, AqaComboBoxItem);
