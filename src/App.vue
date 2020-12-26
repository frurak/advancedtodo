<template>
  <!-- eslint-disable max-len -->
  <div id="app">
    <div id="navigation_container">
      <div class="logo_container">
        <p>Drag & Drop <span>advanced to-do</span></p>
      </div>
      <div class="routes_container">
        <p class="categories_header">Categories:</p>
        <div class="routes">
          <div class="route">
            <router-link to="/all-tasks">All Tasks</router-link>
            <p class="route-description">Daily tasks to accomplish</p>
          </div>
          <div class="route">
            <router-link to="/my-notes">My Notes</router-link>
            <p class="route-description">All notes chart</p>
          </div>
        </div>
      </div>
      <Calendar />
      <div class="rights_container">
        <div class="copy">&copy; All rights reserved.</div>
        <div class="info">Designed and developed by Filip Rurak</div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue';

export default {
  components: {
    Calendar,
  },
  created() {
    this.$store.commit('displayCalendar');
    this.$store.commit('renderLastDay');

    // Create some random task for current date, every time application rendered
    this.$store.state.todo.push(
      {
        name: 'Favourite Book',
        description: 'Read my favourite book in this month',
        color: '#4d4d4d',
        status: 'todo',
        date: `${this.$store.state.currentYear}-${this.$store.state.date.getMonth() + 1}-${this.$store.state.currentDate}`,
      },
      {
        name: 'Make pizza',
        description: 'Make my favourite hawai pizza',
        color: '#bd3140',
        status: 'todo',
        date: `${this.$store.state.currentYear}-${this.$store.state.date.getMonth() + 1}-${this.$store.state.currentDate}`,
      },
      {
        name: 'Grocery Shopping',
        description: 'Buy milk, bread, butter, apples, oranges',
        color: '#4da3a1',
        status: 'todo',
        date: `${this.$store.state.currentYear}-${this.$store.state.date.getMonth() + 1}-${this.$store.state.currentDate}`,
      },
      {
        name: 'Cook a pie',
        description: 'Cook delicious christmas orange pie',
        color: '#4da3b1',
        status: 'todo',
        date: `${this.$store.state.currentYear}-${this.$store.state.date.getMonth() + 1}-${this.$store.state.currentDate}`,
      },
    );

    this.$store.state.inprogress.push(
      {
        name: 'Eat Breakfast',
        description: 'Do and eat delicious breakfast',
        color: '#4da3a1',
        status: 'inprogress',
        date: `${this.$store.state.currentYear}-${this.$store.state.date.getMonth() + 1}-${this.$store.state.currentDate}`,
      },
    );

    this.$store.state.done.push(
      {
        name: 'Morging Run',
        description: 'Run 10km with intervals',
        color: '#a5b042',
        status: 'done',
        date: `${this.$store.state.currentYear}-${this.$store.state.date.getMonth() + 1}-${this.$store.state.currentDate}`,
      },
    );

    // Create some random notes, every time application rendered
    this.$store.state.notes.push(
      {
        title: 'Plan my day',
        text:
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida ullamcorper enim, sit amet ultricies nisl fermentum at. Vestibulum sed nunc sollicitudin, rhoncus nunc ut, faucibus ex. Cras libero enim, lobortis cursus mattis ut, auctor non mauris. Vivamus vitae arcu quam. Aenean condimentum, neque sed tempus aliquet, elit sapien rutrum enim, ut gravida nisi velit vel odio. Nulla ultrices elementum nulla, vel fermentum purus consequat sed. Quisque id erat id sem faucibus tristique. Integer vel aliquet metus.    
          Donec varius auctor nulla at semper. Integer accumsan cursus lacus, nec imperdiet augue tempor ut. Nam efficitur molestie interdum. Etiam egestas libero vel elit egestas bibendum. Sed est nunc, iaculis et euismod quis, feugiat at risus. Duis sed commodo orci. Praesent consectetur erat id velit consectetur cursus. Quisque scelerisque odio vel orci venenatis ultricies. Nunc at turpis efficitur, iaculis tortor sit amet, posuere arcu. Praesent sollicitudin orci eu semper ornare. Fusce arcu turpis, pellentesque a posuere ut, molestie vitae purus.`,
      },
      {
        title: 'One coffee every day',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida ullamcorper enim, sit amet ultricies nisl fermentum at. Vestibulum sed nunc sollicitudin, rhoncus nunc ut, faucibus ex. Cras libero enim, lobortis cursus mattis ut, auctor non mauris. Vivamus vitae arcu quam. Aenean condimentum, neque sed tempus aliquet, elit sapien rutrum enim, ut gravida nisi velit vel odio. Nulla ultrices elementum nulla, vel fermentum purus consequat sed. Quisque id erat id sem faucibus tristique. Integer vel aliquet metus.',
      },
    );
  },
};
</script>

<style lang="scss">

@mixin flex($al, $ju) {
  display: flex;
  align-items: $al;
  justify-content: $ju;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Mulish', sans-serif;
}

body {
  background: #383843;
  font-size: 16px;
  color: #fff;
}

a {
  text-decoration: none;
  color: #fff;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #31313b;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #222228;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

#app {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas:
    'cont cont cont cont cont navg navg';
  width: 100%;
  height: 100vh;
}

#navigation_container {
  grid-area: navg;
  background: #17171A;
  @include flex(flex-start, flex-start);
  flex-direction: column;
  .logo_container {
    width: 100%;
    height: 15%;
    @include flex(center, center);
    text-transform: uppercase;
    padding: 0 15%;
    p {
      font-size: 1.1rem;
      width: 100%;
      span {
        font-weight: 900;
      }
    }
  }
  .routes_container {
    width: 100%;
    height: auto;
    @include flex(flex-start, space-around);
    flex-direction: column;
    padding: 0 15%;
    a {
      font-size: 1.45rem;
    }
    .categories_header {
      width: 100%;
      height: 30%;
      @include flex(center, flex-start);
      margin-bottom: 10px;
    }
    .routes {
      width: 100%;
      height: 70%;
      @include flex(flex-start, space-around);
      flex-direction: column;
      .route {
        width: 100%;
        height: 100%;
        margin: 10px 0 10px 30px;
        @include flex(flex-start, space-between);
        flex-direction: column;
        position: relative;
        .route-description {
          font-size: 0.7rem;
          font-weight: 700;
          color: #5d5d5f;
          margin-top: 2px;
        }
        &::after {
          display: block;
          content: '';
          width: 13px;
          height: 100%;
          background: #000;
          position: absolute;
          left: 0;
          top: 0;
          transform: translateX(-30px);
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        &:nth-child(1)::after {
          background: #a04137;
        }
        &:nth-child(2)::after {
          background: #2f8abf;
        }
      }
    }
  }
  .rights_container {
    width: 24%;
    height: 14%;
    @include flex(flex-start, center);
    flex-direction: column;
    position: absolute;
    right: 0;
    bottom: 0;
    .copy {
      color: #5D5D5F;
      font-size: 0.85rem;
      margin-bottom: 5px;
      z-index: 10;
    }
    .info {
      font-size: 0.85rem;
      z-index: 10;
    }
  }
}
</style>
