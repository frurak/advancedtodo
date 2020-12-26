<template>
    <div class="new_task_container" v-if="newTaskOpen">
      <div class="new_task_box">
        <form class="new_task_overlay">
          <div class="new_task_header">
            <p>New task</p>
            <div class="exit_button" @click="openNewTaskWindow">
              <span class="exit_line_1"></span>
              <span class="exit_line_2"></span>
            </div>
          </div>

          <div class="new_task_date">
            <p class="date_header">Pick task date:</p>
            <input class="date_input" type="date" name="task-date" v-model="FORM_DATE">
          </div>

          <div class="new_task_status">
            <p class="status_header">Choose task status:</p>
            <div class="radio_elements">
              <div class="radio_status">
                <input type="radio" id="to-do" name="task-status" value="todo" v-model="FORM_STATUS">
                <label for="to-do">To do</label>
              </div>
              <div class="radio_status">
                <input type="radio" id="in-progress" name="task-status" value="inprogress" v-model="FORM_STATUS">
                <label for="in-progress">In progress</label>
              </div>
              <div class="radio_status">
                <input type="radio" id="done" name="task-status" value="done" v-model="FORM_STATUS">
                <label for="done">Done</label>
              </div>
            </div>
          </div>

          <div class="new_task_name">
            <p class="name_header">Task name:</p>
            <input type="text" id="task-name" name="task-name" placeholder="Enter task name" v-model="FORM_NAME">
          </div>

          <div class="new_task_description">
            <p class="description_header">Task description:</p>
            <textarea type="text" name="task-description" placeholder="Enter task description" v-model="FORM_DESCRIPTION"></textarea>
          </div>

          <div class="new_task_submit">
            <button type="submit" class="task_submit" @click.prevent="ADD_NEW_TASK">Save</button>
          </div>
        </form>
        <div class="new_task_background" @click="openNewTaskWindow"></div>
      </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'NewTaskWindow',
  computed: {
    ...mapState([
      'newTaskOpen',
    ]),
    FORM_DATE: { // it tracks input value changes and pushes these values into INPUT_NEW_NOTE variable (onkeyup)
      get() {
        return this.$store.state.INPUT_NEW_TASK.date;
      },
      set(date) {
        this.$store.commit('GET_FORM_DATE', date);
      },
    },
    FORM_STATUS: {
      get() {
        return this.$store.state.INPUT_NEW_TASK.status;
      },
      set(status) {
        this.$store.commit('GET_FORM_STATUS', status);
      },
    },
    FORM_NAME: {
      get() {
        return this.$store.state.INPUT_NEW_TASK.name;
      },
      set(name) {
        this.$store.commit('GET_FORM_NAME', name);
      },
    },
    FORM_DESCRIPTION: {
      get() {
        return this.$store.state.INPUT_NEW_TASK.description;
      },
      set(description) {
        this.$store.commit('GET_FORM_DESCRIPTION', description);
      },
    },
  },
  methods: {
    ...mapMutations([
      'openNewTaskWindow',
    ]),
    ...mapActions([
      'ADD_NEW_TASK',
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

.new_task_container {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  @include flex(center, center);
  .new_task_box {
    width: 35%;
    height: 85%;
    background: #17171A;
    border-radius: 10px;
    padding: 0 2%;
    .new_task_background {
      z-index: -1;
      width: 100%;
      height: 100vh;
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(5px);
      position: fixed;
      left: 0;
      top: 0;
    }
    .new_task_overlay {
      width: 100%;
      height: 100%;
      @include flex(center, space-between);
      flex-direction: column;
      z-index: 100;
      .new_task_header {
        width: 100%;
        height: 15%;
        @include flex(center, space-between);
        border-bottom: 1px solid #58585a;
        margin-bottom: 20px;
        p {
          font-size: 1.4rem;
          // margin-left: 5%;
        }
        .exit_button {
          width: 10%;
          height: 50%;
          // position: relative;
          @include flex(center, center);
          cursor: pointer;
          transform: translateX(50%);
          .exit_line_1 {
            width: 30px;
            height: 3px;
            background: #fff;
            transform: rotate(45deg) translate(-00%,0%);
            display: block;
          }
          .exit_line_2 {
            width: 30px;
            height: 3px;
            background: #fff;
            display: block;
            transform: rotate(135deg) translate(72%,550%);
          }
        }
      }
      .new_task_date {
        width: 100%;
        height: 10%;
        @include flex(center, space-between);
        .date_header {
          width: 30%;
          height: 100%;
          @include flex(center, flex-start);
          font-size: 0.8rem;
        }
        .date_input {
          width: 65%;
          height: 100%;
          border-radius: 10px;
          border: none;
          outline: none;
          background: #31313c;
          color: #fff;
          padding: 0 2%;
          cursor: pointer;
        }
      }
      .new_task_status {
        width: 100%;
        height: 10%;
        @include flex(center, space-between);
        .status_header {
          width: 30%;
          height: 100%;
          @include flex(center, flex-start);
          font-size: 0.8rem;
        }
        .radio_elements {
          width: 70%;
          height: 100%;
          @include flex(center, space-between);
          .radio_status{
            height: 100%;
            width: auto;
            @include flex(center, flex-start);
            label {
              margin-left: 10px;
              background: #31313b;
              border-radius: 10px;
              padding: 10px 20px;
              font-size: 0.8rem;
              cursor: pointer;
              &:hover {
                opacity: 0.9;
              }
            }
            input {
              opacity: 0;
            }
            input:focus + label {
              border: 2px solid #37a161;
              padding: 8px 18px;
            }
          }
        }
      }
      .new_task_name {
        width: 100%;
        height: 10%;
        @include flex(center, space-between);
        .name_header {
          width: 30%;
          height: 100%;
          @include flex(center, flex-start);
          font-size: 0.8rem;
        }
        input {
          width: 65%;
          height: 100%;
          border-radius: 10px;
          border: none;
          outline: none;
          background: #31313c;
          color: #fff;
          padding: 0 2%;
          cursor: pointer;
          position: relative;
        }
      }
      .new_task_description {
        width: 100%;
        height: 35%;
        @include flex(center, space-between);
        margin-top: 15px;
        .description_header {
          width: 30%;
          height: 100%;
          @include flex(flex-start, flex-start);
          font-size: 0.8rem;
          margin-top: 15px;
        }
        textarea {
          width: 65%;
          height: 100%;
          border-radius: 10px;
          border: none;
          outline: none;
          background: #31313c;
          color: #fff;
          padding: 2% 2%;
          cursor: pointer;
          position: relative;
          resize: none;
        }
      }
      .new_task_submit {
        width: 100%;
        height: 15%;
        @include flex(center, center);
        button {
          border: none;
          outline: none;
          background: #37a161;
          padding: 10px 20px;
          width: 100%;
          height: 60%;
          border-radius: 10px;
          color: #fff;
          font-size: 1rem;
          text-transform: uppercase;
          cursor: pointer;
        }
      }
    }
  }
}

</style>
