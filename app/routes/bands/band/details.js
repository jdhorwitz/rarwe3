import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return this.modelFor('bands.band');
    },

    actions: {
        willTransition(transition) {
            if (this.get('controller.isEditing')) {
                let leave = window.confirm('Are you sure?');
                if (!leave) {
                    transition.abort();
                } else {
                    this.set('controller.isEditing', false);
                }
            }
        }
    }
});
