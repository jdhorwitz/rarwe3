import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { createBand } from 'rarwe/tests/helpers/custom-helpers';

module('Acceptance | Bands', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('List bands', async function(assert) {
      server.create('band', { name: 'Radiohead' });
      server.create('band', { name: 'Long Distance Calling' });
      await visit('/');

      assert.dom('[data-test-rr=band-link]').exists({ count: 2 },
                                                    'All band links rendered');
      assert.dom('[data-test-rr=band-list-item]:first-child').hasText("Radiohead",
                                                                      'The first band link contains the band name');
      assert.dom('[data-test-rr=band-list-item]:last-child').hasText("Long Distance Calling", 'The other band link contains the band name');
  });

    test('Create a band', async function(assert) {
        server.create('band', { name: 'Royal Blood' });

        await visit('/');
        await createBand('Caspian');

        assert.dom('[data-test-rr=band-list-item]').exists({ count: 2 }, 'A new band link is rendered');
        assert.dom('[data-test-rr=band-list-item]:last-child').hasText('Caspian', 'The new band link is rendered as the last item');
        assert.dom('[data-test-rr=songs-nav-item] > .active').hasText('Songs', 'The Songs tab is active');
    });
});
