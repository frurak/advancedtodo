<template>
    <div class="task_status to-do">

        <div class="status_header">
            <span class="status_name">To Do</span>
            <span class="add_icon task_add_todo" @click="openNewTaskWindow">+</span>
        </div>

        <div class="task_content_overlay overlay_todo">

            <div class="task_content" v-for="(task, index) in taskTodo" :key="task.name">

                <div class="task_box" draggable="true" @dragstart="startDrag(task)" @dragend="drop" @dragleave="leaveDrag" v-if="task.date === chosenFromCalendar">
                    <div class="task_color" :style="{background: task.color}"></div>
                    <div class="task_insight">
                        <div class="task_name">{{ task.name }}</div>
                        <div class="task_description">{{ task.description }}</div>
                        <div class="task_options" @click="openTaskOptions(task, index)">...</div>
                        <div class="task_action" v-if="taskOptionsOpen && (taskOpenIndex[0].name === task.name && taskOpenIndex[0].status === task.status)">
                            <p @click="editTask(task, index)">Edit</p>
                            <p @click="deleteTodoTask(task)">Delete</p>
                        </div>
                    </div>
                </div>

            </div>

            <div class="task_add_box task_add_todo" @click="openNewTaskWindow">
                <span class="add_icon">+</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'TodoTasks',
  computed: {
    ...mapState([
      'daySelected', 'currentMonth', 'currentYear', 'chosenFromCalendar', 'taskOptionsOpen', 'taskOpenIndex',
    ]),
    ...mapGetters([
      'taskTodo',
    ]),
  },
  methods: {
    ...mapMutations([
      'openNewTaskWindow', 'startDrag', 'drop', 'leaveDrag', 'openTaskOptions', 'editTask', 'deleteTodoTask',
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

.to-do {
    grid-area: todo;
}

</style>
