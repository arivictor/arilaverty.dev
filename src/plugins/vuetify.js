import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.indigo.accent4,
                secondary: '#b0bec5',
                accent: colors.orange,
                error: '#b71c1c',
                background: colors.grey.lighten5,
            },
            dark: {
                primary: colors.blueGrey.darken3,
            }
        },
    },
});

export default vuetify
