<template>
<!-- eslint-disable max-len -->
  <div class="content_container">
    <div class="topbar_container">

      <TasksSearch />
      <DateTopbar />

    </div>

    <div class="tasks_container">

      <TodoTasks />
      <InprogressTasks />
      <DoneTasks />

    </div>

    <NewTaskWindow />
  </div>
</template>

<script>
import TasksSearch from '@/components/TasksSearch.vue';
import DateTopbar from '@/components/DateTopbar.vue';
import TodoTasks from '@/components/TodoTasks.vue';
import InprogressTasks from '@/components/InprogressTasks.vue';
import DoneTasks from '@/components/DoneTasks.vue';
import NewTaskWindow from '@/components/NewTaskWindow.vue';

export default {
  name: 'AllTasks',
  props: ['id'],
  components: {
    TasksSearch, DateTopbar, TodoTasks, InprogressTasks, DoneTasks, NewTaskWindow,
  },
};
</script>

<style lang="scss">
@mixin flex($al, $ju) {
  display: flex;
  align-items: $al;
  justify-content: $ju;
}

.content_container {
  background: #383843;
  grid-area: cont;
  @include flex(center, space-between);
  flex-direction: column;
  .topbar_container {
    width: 100%;
    height: 20%;
    @include flex(center, space-between);
    padding: 0 5%;
  }
  .tasks_container {
    height: 80%;
    width: 90%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: 'todo inprogress done';
    .task_status {
      .status_header {
        width: 100%;
        height: 10%;
        @include flex(center, flex-start);
        .status_name {
          font-size: 0.8rem;
          position: relative;
          z-index: 1;
          width: 100px;
          height: 30px;
          margin-left: 5px;
          background: #31313b;
          @include flex(center, center);
          border-radius: 10px;
        }
        .add_icon {
          font-size: 1.2rem;
          font-weight: 400;
          z-index: 1;
          margin-left: 20%;
          cursor: pointer;
          position: relative;
          z-index: 1;
          &::before {
            display: block;
            content: '';
            width: 30px;
            height: 30px;
            background: #222228;
            @include flex(center, center);
            border-radius: 50%;
            z-index: -1;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-45%);
          }
          &:hover {
            transition: 0.1s ease-in-out;
            opacity: 0.8;
          }
        }
      }
      .task_content_overlay {
        width: 100%;
        height: 70vh;
        overflow-x: hidden;
        .task_content {
          width: 100%;
          height: auto;
          padding: 0 2%;
          .task_box {
            width: 100%;
            height: 160px;
            border-radius: 10px;
            @include flex(center, center);
            margin-bottom: 10px;
            .task_color {
              width: 5%;
              height: 100%;
              background: #a5b042;
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
              cursor: pointer;
            }
            .task_insight {
              width: 95%;
              height: 100%;
              background: #17171a;
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
              @include flex(flex-start, flex-start);
              flex-direction: column;
              position: relative;
              padding: 5%;
              .task_name {
                font-size: 1.2rem;
                font-weight: 700;
                z-index: 20;
              }
              .task_description {
                font-size: 1rem;
                color: #5d5d5f;
                margin-top: 5px;
                z-index: 20;
              }
              .task_options {
                position: absolute;
                right: 5%;
                bottom: 5%;
                font-size: 2rem;
                cursor: pointer;
                z-index: 30;
              }
              .task_action {
                position: absolute;
                right: 0%;
                bottom: 0%;
                width: 25%;
                height: 60%;
                border-radius: 10px;
                background: #31313b;
                z-index: 29;
                @include flex(flex-start, flex-start);
                flex-direction: column;
                padding: 10px 0 0 10px;
                box-shadow: 0px 0px 6px rgba(0,0,0,0.7);
                p {
                  margin: 0 0 5px 0;
                  text-decoration: underline;
                  &:hover {
                    color: #36a062;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
        .task_add_box {
          width: 96%;
          height: 160px;
          border-radius: 10px;
          @include flex(center, center);
          margin-bottom: 10px;
          background: #31313b;
          cursor: pointer;
          margin: 0 2%;
          .add_icon {
            font-size: 1.2rem;
            font-weight: 400;
            z-index: 1;
            position: relative;
            z-index: 1;
            &::before {
              display: block;
              content: '';
              width: 30px;
              height: 30px;
              background: #222228;
              @include flex(center, center);
              border-radius: 50%;
              z-index: -1;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-45%);
            }
            &:hover {
              transition: 0.1s ease-in-out;
              opacity: 0.8;
            }
          }
        }
      }
    }
  }
}

</style>
