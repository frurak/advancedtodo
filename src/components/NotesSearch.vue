<template>
    <div class="search_container">
        <input class="search" id="searchNotesInput" type="text" placeholder="Search" @keyup="searchNotes">
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'NotesSearch',
  methods: {
    ...mapMutations([
      'searchNotes',
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

.search_container {
    width: 50%;
    height: 20%;
    @include flex(center, flex-start);
    .search {
        width: 80%;
        height: 35%;
        background: #31313b;
        @include flex(center, flex-start);
        border-radius: 10px;
        color: #ffffff;
        padding: 0 0 0 40px;
        border: none;
        outline: none;
    }
}
</style>
