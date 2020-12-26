<template>
    <div class="calendar_container" v-if="['AllTasks'].indexOf($route.name) > -1">
        <p class="calendar_header">Calendar:</p>
        <div class="calendar">
          <div class="calendar_top">
            <div class="selected_date">
              <p class="selected_month">{{ currentMonth }}</p>,
              <p class="selected_year">{{ currentYear }}</p>
            </div>
            <div class="date_navigation">
              <span class="date_prev" @click="setPreviousMonth"></span>
              <span class="date_next" @click="setNextMonth"></span>
            </div>
          </div>
          <div class="calendar_day_names">
            <div class="calendar_day_name">Mon</div>
            <div class="calendar_day_name">Tue</div>
            <div class="calendar_day_name">Wed</div>
            <div class="calendar_day_name">Thu</div>
            <div class="calendar_day_name">Fri</div>
            <div class="calendar_day_name">Sat</div>
            <div class="calendar_day_name">Sun</div>
          </div>
          <div class="month_days_container">
            <div class="prev_month_days"
              v-for="previous in previousDays"
              :key="previous.nr"
              >{{previous}}</div>
            <div class="month_day"
              v-for="day in lastDayInMonth"
              :key="day"
              :class="day === currentDate ? 'monthDayActive' : ''"
              @click="changeCurrentDay(day)"
              >{{day}}</div>
            <div class="next_month_days"
              v-for=" next in nextDays"
              :key="next.nr"
              >{{next}}</div>
          </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Calendar',
  computed: {
    ...mapState([
      'currentMonth', 'currentYear', 'previousDays', 'lastDayInMonth', 'currentDate', 'nextDays',
    ]),
  },
  methods: {
    ...mapMutations([
      'setPreviousMonth', 'setNextMonth',
    ]),
    setPreviousMonth() {
      this.$store.state.date.setMonth(this.$store.state.date.getMonth() - 1); // previous month

      // Don't display monthDayActive class if user changes month, else display current date
      if ((this.$store.state.date.getMonth() + 1) !== (new Date().getMonth() + 1)) {
        this.$store.state.currentDate = '';
      } else {
        this.$store.state.currentDate = new Date().getDate();
      }

      this.$store.state.previousDays = [];
      this.$store.state.nextDays = [];

      this.$store.commit('displayCalendar');
      this.$store.commit('renderLastDay');
    },
    setNextMonth() {
      this.$store.state.date.setMonth(this.$store.state.date.getMonth() + 1); // next month

      // Don't display monthDayActive class if user changes month, else display current date
      if ((this.$store.state.date.getMonth() + 1) !== (new Date().getMonth() + 1)) {
        this.$store.state.currentDate = '';
      } else {
        this.$store.state.currentDate = new Date().getDate();
      }

      this.$store.state.previousDays = [];
      this.$store.state.nextDays = [];

      this.$store.commit('displayCalendar');
      this.$store.commit('renderLastDay');
    },
    changeCurrentDay(day) {
      if (day < 10) { // Ads "0" before day if day between 1-9
        this.$store.state.chosenFromCalendar = `${this.$store.state.date.getFullYear()}-${this.$store.state.date.getMonth() + 1}-0${day}`;
        this.$store.state.daySelected = `0${day}`;
      } else {
        this.$store.state.chosenFromCalendar = `${this.$store.state.date.getFullYear()}-${this.$store.state.date.getMonth() + 1}-${day}`;
        this.$store.state.daySelected = `${day}`;
      }
      this.$store.state.currentDate = parseFloat(this.$store.state.daySelected); // change active day class (green bg)
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

.calendar_container {
    width: 100%;
    height: 50%;
    padding: 0 15%;
    .calendar_header {
        width: 100%;
        height: 12%;
        @include flex(center, flex-start);
        margin: 10px 0;
    }
    .calendar {
        width: 100%;
        height: 80%;
        .calendar_top {
            width: 100%;
            height: 15%;
            @include flex(center, center);
            .selected_date {
                @include flex(center, flex-start);
                width: 80%;
                height: 100%;
                // background: green;
                position: relative;
                .selected_month {
                font-size: 1.4rem;
                margin-left: 30px;
                }
                .selected_year {
                color: #5d5d5f;
                margin-left: 10px;
                font-weight: 700;
                transform: translateY(10%);
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
            }
            .date_navigation {
                width: 20%;
                height: 100%;
                @include flex(center, space-between);
                .date_prev {
                    display: block;
                    width: 25px;
                    height: 25px;
                    background: #222228;
                    border-radius: 50%;
                }
                .date_next {
                    display: block;
                    width: 25px;
                    height: 25px;
                    background: #222228;
                    border-radius: 50%;
                }
            }
        }
        .calendar_day_names {
            width: 100%;
            height: 15%;
            @include flex(center, space-between);
            .calendar_day_name {
                color: #5d5d5f;
                font-size: 0.8rem;
                font-weight: 700;
                width: calc(100%/7);
                @include flex(center, center);
            }
        }
        .month_days_container {
            min-height: 70%;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            // transform: translatex(-3%);
            .prev_month_days, .next_month_days {
                @include flex(center, center);
                width: calc(100%/7);
                position: relative;
                z-index: 1;
                font-size: 0.8rem;
                cursor: pointer;
                opacity: 1;
                color: #5d5d5f;
                font-weight: 700;
            }
            .month_day {
                @include flex(center, center);
                width: calc(100%/7);
                position: relative;
                z-index: 1;
                font-size: 0.8rem;
                cursor: pointer;
            }
            .monthDayActive {
                &::before {
                display: block;
                content: '';
                width: 30px;
                height: 30px;
                background: #36a062;
                border-radius: 100%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                z-index: -1;
                }
            }
        }
    }
}

</style>
