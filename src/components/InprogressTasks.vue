<template>
    <div class="task_status in-progress">

        <div class="status_header">
          <span class="status_name">In Progress</span>
          <span class="add_icon task_add_inprogress" @click="openNewTaskWindow">+</span>
        </div>

        <div class="task_content_overlay overlay_inprogress">

          <div class="task_content" v-for="(task, index) in taskInprogress" :key="task.name">

            <div  class="task_box" draggable="true" @dragstart="startDrag(task)" @dragend="drop" @dragleave="leaveDrag" v-if="task.date === chosenFromCalendar">
              <div class="task_color" :style="{background: task.color}"></div>
              <div class="task_insight">
                <div class="task_name">{{ task.name }}</div>
                <div class="task_description">{{ task.description }}</div>
                <div class="task_options" @click="openTaskOptions(task, index)">...</div>
                <div class="task_action" v-if="taskOptionsOpen && (taskOpenIndex[0].name === task.name && taskOpenIndex[0].status === task.status)">
                  <p @click="editTask(task, index)">Edit</p>
                  <p @click="deleteInprogressTask(task)">Delete</p>
                </div>
              </div>
            </div>

          </div>

          <div class="task_add_box task_add_inprogress" @click="openNewTaskWindow">
            <span class="add_icon">+</span>
          </div>
        </div>
      </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'InprogressTasks',
  computed: {
    ...mapState([
      'daySelected', 'currentMonth', 'currentYear', 'chosenFromCalendar', 'taskOptionsOpen', 'taskOpenIndex',
    ]),
    ...mapGetters([
      'taskInprogress',
    ]),
  },
  methods: {
    ...mapMutations([
      'openNewTaskWindow', 'startDrag', 'drop', 'leaveDrag', 'openTaskOptions', 'editTask', 'deleteInprogressTask',
    ]),
  },
};
</script>

<style lang="scss">
@mixin flex($al, $ju) {
  display: flex;
  align-items: $al;
  justify-content: $ju;
}

.in-progress {
    grid-area: inprogress;
}

</style>
