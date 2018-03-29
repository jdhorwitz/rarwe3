import Controller from '@ember/controller';
import { empty } from '@ember/object/computed';

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
        }
    }
});
