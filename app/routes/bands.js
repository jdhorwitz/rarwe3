import Route from '@ember/routing/route';
import EmberObject, { computed } from '@ember/object';
import { dasherize } from '@ember/string';
import { A } from '@ember/array';

let Band = EmberObject.extend({
    name: '',

    slug: computed('name', function() {
        return dasherize(this.get('name'));
    }),

    site: computed('slug', 'language', function() {
        return 'http://bands.com/' + this.get('slug') + '.' + this.get('language');
    })

});

let Song = EmberObject.extend({
    title: '',
    rating: 0,
    band: ''
});

export default Route.extend({
    model() {
        let blackDog = Song.create({
            title: 'Black Dog',
            band: 'Led Zeppelin',
            rating: 3
        });

        let yellowLedbetter = Song.create({
            title: 'Yellow Ledbetter',
            band: 'Pearl Jam',
            rating: 4
        });

        let pretender = Song.create({
            title: 'Foo Fighters',
            band: 'Pretender',
            rating: 2
        });

        let daughter = Song.create({
            title: 'Daughter',
            band: 'Pearl Jam',
            rating: 5
        });

        let ledZeppelin = Band.create({ name: 'Led Zeppelin', songs: A([blackDog]) });
        let pearlJam = Band.create({ name: 'Pearl Jam', description: 'Pearl Jam is an American rock band, formed in Seattle, Washington in 1990.', songs: A([yellowLedbetter, daughter]) });
        let fooFighters = Band.create({ name: 'Foo Fighters', songs: A([pretender]) });

        return A([ledZeppelin, pearlJam, fooFighters]);
    }
});
