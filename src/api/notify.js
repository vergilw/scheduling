import Vue from "vue";

export default {

    show(content) {
        Vue.notify({
            group: 'hud',
            title: content,
            duration: 1500
        });
    }

}
