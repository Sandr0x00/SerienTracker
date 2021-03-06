/* global dialogComp */

import {html} from 'lit-element';
import {BaseComp} from './base.js';
import $ from 'jquery';

export class DialogInfoComp extends BaseComp {

    static get properties() {
        return {
        };
    }

    constructor() {
        super();
    }

    close() {
        dialogComp.close(true);
    }

    render() {
        return html`
<div id="dialog" class="offset-sm-4 offset-md-8 col-md-4 col-sm-8" style="text-align: left">
  Style:<br>
  <a id="changestyle" @click=${() => {
        const dark = 'dark';
        const light = 'light';
        $('body').toggleClass(dark);
        $('body').toggleClass(light);

        if ($('body').hasClass(light)) {
            this.setCookie('theme', light);
        } else {
            this.setCookie('theme', dark);
        }
    }}>Switch Style</a><br><br>
  Stuff used:<br>
  <a target="_blank" href="https://fontawesome.com/">FontAwesome <i class="fas fa-external-link-alt"></i></a>,
  <a target="_blank" href="https://getbootstrap.com/">Bootstrap <i class="fas fa-external-link-alt"></i></a>,
  <a target="_blank" href="https://jquery.com/">JQuery <i class="fas fa-external-link-alt"></i></a>,
  <a target="_blank" href="https://lit-element.polymer-project.org/">LitElement <i class="fas fa-external-link-alt"></i></a><br>
  <br>
  Download status: <a href="api/series?b64" download="status.txt">status.txt</a>
  <!--<br/>Upload status: <form id="upload_status" action="server/post_status_file.php" method="post" enctype="multipart/form-data"><input type="file" name="file" id="file"><input class="submit" type="submit" value="Upload" name="submit"></form>-->
  <br>
  Contribute at <a href="https://github.com/Sandr0x00/SerienTracker">GitHub</a>
</div>`;
    }

    setCookie(cname, cvalue) {
        let d = new Date();
        d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires;
    }
}

customElements.define('dialog-info', DialogInfoComp);