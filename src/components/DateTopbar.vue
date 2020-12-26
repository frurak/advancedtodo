<template>
    <div class="date_container">
        <div class="date_values">
          <div class="current_day">{{daySelected}}</div>
          <div class="current_month">{{currentMonth}},</div>
          <div class="current_year">{{currentYear}}</div>
        </div>
        <div class="date_navigation">
          <span class="date_prev" @click="setPreviousMonth"></span>
          <span class="date_next" @click="setNextMonth"></span>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'DateTopbar',
  computed: {
    ...mapState([
      'daySelected', 'currentMonth', 'currentYear',
    ]),
  },
  methods: {
    ...mapMutations([
      'setPreviousMonth', 'setNextMonth',
    ]),
    setPreviousMonth() {
      this.$store.state.date.setMonth(this.$store.state.date.getMonth() - 1);

      this.$store.state.previousDays = [];
      this.$store.state.nextDays = [];

      this.$store.commit('displayCalendar');
      this.$store.commit('renderLastDay');
    },
    setNextMonth() {
      this.$store.state.date.setMonth(this.$store.state.date.getMonth() + 1);

      this.$store.state.previousDays = [];
      this.$store.state.nextDays = [];

      this.$store.commit('displayCalendar');
      this.$store.commit('renderLastDay');
    },
  },
};
</script>

<style lang="scss">
@mixin flex($al, $ju) {
  display: flex;
  align-items: $al;
  justify-content: $ju;
}

.date_container {
  width: 40%;
  height: 35%;
  border-radius: 10px;
  @include flex(center, space-between);
  position: relative;
  .date_values {
    height: 100%;
    @include flex(center, flex-start);
    .current_day {
      font-size: 1.4rem;
      margin-left: 35px;
      font-weight: 700;
    }
    .current_month {
      font-size: 1.4rem;
      margin-left: 10px;
      font-weight: 700;
    }
    .current_year {
      color: #5d5d5f;
      font-weight: 700;
      margin-left: 10px;
      transform: translateY(10%);
    }
  }
  &::after {
    display: block;
    content: '';
    width: 13px;
    height: 100%;
    background:  #36a062;
    position: absolute;
    left: 0;
    top: 0;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .date_navigation {
    // width: 20%;
    height: 100%;
    @include flex(center, space-between);
    margin-left: 15%;
    .date_prev {
      display: block;
      width: 35px;
      height: 35px;
      background: #222228;
      border-radius: 50%;
      margin-right: 20px;
    }
    .date_next {
      display: block;
      width: 35px;
      height: 35px;
      background: #222228;
      border-radius: 50%;
    }
  }
}

</style>
