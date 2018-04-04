import Controller from '@ember/controller';
import { empty, sort } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
    isAddingSong: false,
    newSongTitle: '',

    isAddButtonDisabled: empty('newSongTitle'),

    actions: {
        addSong() {
            this.set('isAddingSong', true);
        },

        cancelAddSong() {
            this.set('isAddingSong', false);
        },

        async saveSong(event) {
            event.preventDefault();
            let band = this.get('model');
            let newSong = this.get('store').createRecord('song', {
                title: this.get('newSongTitle'),
                band
            });
            await newSong.save();
            this.set('newSongTitle', '');
        },

        updateRating(song, rating) {
            let currentRating = song.get('rating');
            song.set('rating', currentRating === rating ? 0 : rating);
            return song.save();
        },
    },

    sortBy: 'ratingDesc',

    sortProperties: computed('sortBy', function() {
        let options = {
            ratingDesc: ['rating:desc', 'title:asc'],
            ratingAsc: ['rating:asc', 'title:asc'],
            titleDesc: ['title:desc'],
            titleAsc: ['title:asc']
        };
        return options[this.get('sortBy')];
    }),

    sortedSongs: sort('model.songs', 'sortProperties'),

});
