import Component from '@ember/component';

export default Component.extend({
    classNames: ['rating-panel'],
    rating: 0,
    maxRating: 5,
    onClick() {},

    stars: computed('rating', 'maxRating', function() {
        let stars = [];
        let rating = this.get('rating');
        for (let i=1; i <= this.get('maxRating'); i++) {
            stars.push({ rating: i, isFull: rating >= i });
        }

        return stars;
    }),

    actions: {
        setRating(newRating) {
            return this.get('onClick') ({
                item: this.get('item'),
                rating: newRating
            });
            return this.get('onClick')(newRating);
        }
    }
});
