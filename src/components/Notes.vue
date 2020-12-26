<template>
    <div class="notes_overlay">
        <div class="notes" v-if="notes !== ''">
            <div class="note_single" v-for="note in notes" :key="note.title">
                <div class="note_title">
                    <h3 class="title">{{note.title}}</h3>
                    <p class="note_delete" @click="deleteNote(note)">delete</p>
                </div>
                <p class="note_text">{{note.text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Notes',
  computed: {
    ...mapState([
      'notes',
    ]),
  },
  methods: {
    ...mapMutations([
      'deleteNote',
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

.notes_overlay {
    width: 100%;
    height: 100%;
    @include flex(center, center);
    overflow-x: hidden;
    .notes {
        width: 98.5%;
        height: 100%;
        .note_single {
            width: 100%;
            min-height: 20%;
            height: auto;
            background: #31313B;
            border-radius: 10px;
            margin: 5px 0 20px 0;
            .note_title {
                width: 100%;
                height: 5%;
                background: #17171A;
                padding: 1% 2%;
                border-radius: 10px;
                @include flex(center, space-between);
                .title {
                    font-size: 1rem;
                }
                .note_delete {
                    font-size: 0.85rem;
                    font-weight: 300;
                    text-decoration: underline;
                    cursor: pointer;
                    &:hover {
                        opacity: 0.6;
                    }
                }
            }
            .note_text {
                font-size: 0.85rem;
                line-height: 1.35rem;
                font-weight: 300;
                padding: 1% 2%;
            }
        }
    }
}
</style>
