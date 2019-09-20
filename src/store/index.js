import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global.js'
import schedule from './modules/schedule.js'
import scheduleForm from './modules/schedule-form.js'
import schedulesForm from './modules/schedules-form.js'
import courseForm from './modules/course-form.js'
import roomForm from './modules/room-form.js'
import lessonForm from "./modules/lesson-form.js";
import coursePeriodForm from "./modules/course-period-form.js";
import classTimeForm from "./modules/class-time-form.js";
import transferStudentForm from "./modules/transfer-student-form.js";
import courseTypeForm from "./modules/course-type-form.js";
import crowdsForm from "./modules/crowds-form.js";
import studentsForm from "./modules/students-form.js";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        global,
        schedule,
        scheduleForm,
        schedulesForm,
        courseForm,
        roomForm,
        lessonForm,
        coursePeriodForm,
        classTimeForm,
        transferStudentForm,
        courseTypeForm,
        crowdsForm,
        studentsForm,
    },
    strict: debug,
})
