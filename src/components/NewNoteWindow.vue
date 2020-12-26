<template>
    <div class="new_note_container" v-if="newNoteOpen">
        <div class="new_note_box">
            <form class="new_note_overlay">
                <div class="new_note_header">
                    <p>New note</p>
                    <div class="exit_button" @click="addNote">
                    <span class="exit_line_1"></span>
                    <span class="exit_line_2"></span>
                    </div>
                </div>

                <div class="new_note_title">
                    <p class="title_header">Note title:</p>
                    <input type="text" id="note-title" name="note-name" placeholder="Enter note title" v-model="FORM_TITLE">
                </div>

                <div class="new_note_text">
                    <p class="text_header">Note text:</p>
                    <textarea type="text" name="note-text" placeholder="Enter note text" v-model="FORM_TEXT"></textarea>
                </div>

                <div class="new_note_submit">
                    <button type="submit" class="note_submit" @click.prevent="ADD_NEW_NOTE">Save</button>
                </div>
            </form>
            <div class="new_note_background" @click="addNote"></div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'NewNoteWindow',
  computed: {
    ...mapState([
      'newNoteOpen',
    ]),
    FORM_TITLE: { // it tracks input value changes and pushes these values into INPUT_NEW_NOTE variable (onkeyup)
      get() {
        return this.$store.state.INPUT_NEW_NOTE.title;
      },
      set(title) {
        this.$store.commit('GET_FORM_TITLE', title);
      },
    },
    FORM_TEXT: {
      get() {
        return this.$store.state.INPUT_NEW_NOTE.text;
      },
      set(text) {
        this.$store.commit('GET_FORM_TEXT', text);
      },
    },
  },
  methods: {
    ...mapMutations([
      'deleteNote', 'addNote',
    ]),
    ...mapActions([
      'ADD_NEW_NOTE',
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

.new_note_container {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    @include flex(center, center);
    .new_note_box {
        width: 35%;
        height: 75%;
        background: #17171A;
        border-radius: 10px;
        padding: 0 2%;
        .new_note_background {
            z-index: -1;
            width: 100%;
            height: 100vh;
            background: rgba(134, 124, 124, 0.3);
            backdrop-filter: blur(5px);
            position: fixed;
            left: 0;
            top: 0;
        }
        .new_note_overlay {
            width: 100%;
            height: 100%;
            @include flex(center, space-between);
            flex-direction: column;
            z-index: 100;
            .new_note_header {
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
            .new_note_title {
                width: 100%;
                height: 10%;
                @include flex(center, space-between);
                .title_header {
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
            .new_note_text {
                width: 100%;
                height: 50%;
                @include flex(center, space-between);
                margin-top: 15px;
                .text_header {
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
            .new_note_submit {
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
