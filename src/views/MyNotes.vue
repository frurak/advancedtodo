<template>
    <div class="notes_main_container">

        <NotesSearch />

        <div class="notes_container">
            <div class="notes_header">
                <div class="notes_name">My Notes</div>
                <div class="add_icon" @click="addNote">+</div>
            </div>
            <Notes />
        </div>

        <NewNoteWindow />

    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Notes from '@/components/Notes.vue';
import NewNoteWindow from '@/components/NewNoteWindow.vue';
import NotesSearch from '@/components/NotesSearch.vue';

export default {
  components: {
    Notes, NewNoteWindow, NotesSearch,
  },
  methods: {
    ...mapMutations([
      'addNote',
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

.notes_main_container {
    background: #383843;
    grid-area: cont;
    @include flex(flex-start, space-between);
    flex-direction: column;
    padding: 0 5%;
    .notes_container {
        width: 100%;
        height: 80%;
        @include flex(flex-start, space-between);
        flex-direction: column;
        .notes_header {
            width: 33.5%;
            height: 10%;
            @include flex(center, flex-start);
            padding-top: 4px;
            .notes_name {
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
    }
}
</style>
