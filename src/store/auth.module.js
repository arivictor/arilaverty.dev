import * as fb from '../firebase';

const state = {
    user: null,
    emailVerified: false,
};

const getters = {
    user(state) {
        return state.user;
    },
};

const actions = {
    async signin({ dispatch }, form) {
        // sign user in
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);

        // fetch user profile and set in state
        dispatch('fetchUserProfile', user);
    },
    async register({ dispatch }, form) {
        // sign user up
        const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);

        // create user profile object in userCollections
        await fb.usersCollection.doc(user.uid).set({
            name: form.name,
            created: new Date(),
        });

        await fb.auth.currentUser.sendEmailVerification();

        // fetch user profile and set in state
        dispatch('fetchUserProfile', user);
    },
    async signout({ commit }) {
        await fb.auth.signOut();

        // clear userProfile and redirect to /login
        commit('setUserProfile', null);
    },
    async fetchUserProfile({ commit }, user) {

        // fetch user profile
        const userRef = fb.usersCollection.doc(user.uid);
        const userData = await userRef.get();

        // set user profile in state
        commit('setUserProfile', {identity: user, profile: userData.data()});
    }
};

const mutations = {
    setUserProfile(state, val) {
        state.user = val;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};