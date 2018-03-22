import EmberObject, { computed } from '@ember/object';

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
        return this.get('name').dasherize();
    })
});
