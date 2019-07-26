/* global fuzzySearch,seriesComp,dialogComp */

import {html} from 'https://unpkg.com/lit-element/lit-element.js?module';
import {BaseComp} from './base.js';

export class HeaderComp extends BaseComp {

    static get properties() {
        return {
            reload: Number,
            autoload: Number
        };
    }
    constructor() {
        super();
        this.reload = 0;
        this.startAutoload();
    }

    startAutoload() {
        this.autoload = setInterval(() => {
            if (this.autoload === 0) {
                return;
            }
            if (this.reload === 100) {
                this.reload = 0;
                seriesComp.loadStuff();
            }
            this.reload += 1;
        }, 60000 / 10);
    }

    stopAutoload() {
        if (this.autoload !== 0) {
            clearInterval(this.autoload);
        }
    }

    searchEvent(e) {
        let content = $('#seriesComp');
        content.children().each(function () {
            $(this).toggle(fuzzySearch($(this).find('a').data('originalTitle'), e.target.value));
        });
    }

    render() {
        return html`
        <nav id="nav" class="navbar navbar-static-top container-fluid">
        <div class="col-2">
            <a id="plus" class="float-left p-4" type="button" @click=${() => dialogComp.showEdit()}><i class="fas fa-2x fa-plus-circle"></i></a>

        </div>
        <div class="col-8">
            <input id="search" name="search" type="text" placeholder="Search" autocomplete="off" list="titelList" @keyup=${this.searchEvent}>
        </div>
        <div class="d-none d-sm-block col-sm-1">
            <svg id="refresh" class="radial-progress" viewBox="0 0 44 44" @click=${() => seriesComp.loadStuff()}>
              <path id="refresh_bg"
              d="M22 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#444";
              stroke-width="3";
            />
            <path id="refresh_fg"
            d="M22 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#ddd";
            stroke-width="3";
            stroke-dasharray="${this.reload}, 100"
          />
                    </svg>
        </div>
        <div class="col-2 col-sm-1">
            <a id="info" class="float-right p-4" type="button" @click=${() => dialogComp.showInfo()}><i class="fas fa-2x fa-info-circle"></i></a>
        </div>
    </nav>
        `;
    }

}

customElements.define('header-comp', HeaderComp);