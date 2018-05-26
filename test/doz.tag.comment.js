const Doz = require('../index');
const be = require('bejs');

describe('Doz.css.class', function () {

    this.timeout(5000);

    before(function () {
        this.jsdom = require('jsdom-global')()
    });

    after(function () {
        this.jsdom()
    });

    beforeEach(function () {
        document.body.innerHTML = '';
        Doz.collection.removeAll();
    });

    describe('create app', function () {

        it('should be ok', function (done) {

            document.body.innerHTML = `<div id="app"></div>`;

            Doz.component('salutation-card', {
                template() {
                    return `
                        <!-- this is a comment -->
                        <div>Hello ${this.props.title} ${this.props.name}</div>
                    `
                }
            });

            new Doz({
                root: '#app',
                template: `
                    <salutation-card
                        title="MR."
                        name="Doz">
                    </salutation-card>
                `
            });

            setTimeout(()=>{
                const emptyTag = document.body.querySelectorAll('doz-empty');
                be.err(done).equal(emptyTag.length, 1);
            },100);
        });
    });
});