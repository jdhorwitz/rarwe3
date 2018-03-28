import EmberObject, { computed } from '@ember/object';
import { dasherize } from '@ember/string';

export default EmberObject.extend({
    name: '',

    init() {
        this._super(...arguments);
        let songs = this.get('songs');
        if (!songs) {
            this.set('songs', []);
        }
    },

    slug: computed('name', function() {
        return dasherize(this.get('name'));
    })
});
