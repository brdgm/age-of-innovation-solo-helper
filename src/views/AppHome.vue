<template>

  <div class="float-end m-2 w-25">
    <a href="https://boardgamegeek.com/boardgame/383179/age-of-innovation" target="_blank" rel="noopener">
      <img src="../assets/game-age-of-innovation.webp" class="rounded shadow w-100" alt=""/>
    </a>
  </div>

  <h1>{{t('home.title')}}</h1>

  <p v-html="t('home.play1')"></p>
  <p v-html="t('home.play2')"></p>

  <p class="text-muted fst-italic">
    {{t('home.feedback')}}
    <a href="https://boardgamegeek.com/thread/3369118/brdgmme-age-of-innovation-solo-helper-web-applicat" target="_blank" rel="noopener">Board Game Geek Thread</a> |
    <a href="https://github.com/brdgm/age-of-innovation-solo-helper" target="_blank" rel="noopener">GitHub</a>
  </p>

  <router-link to="/setupGame" class="btn btn-primary btn-lg mt-3">{{t('action.playGame')}}</router-link>

  <p class="disclaimer">
    This is not an official Feuerland/Capstone product and has no affiliation with <a href="https://www.feuerland-spiele.de/" target="_blank" rel="noopener">Feuerland Spiele</a> or <a href="https://capstone-games.com/" target="_blank" rel="noopener">Capstone Games</a>.
    All art in this app is from <a href="https://www.feuerland-spiele.de/spiele/age-of-innovation/" target="_blank" rel="noopener">Age of Innovation</a>.
    See <a href="#" data-bs-toggle="modal" data-bs-target="#creditsModal">{{t('footer.credits')}}</a>.
    <a href="https://ko-fi.com/brdgm_me" target="_blank" rel="noopener"><img class="kofi-button" src="@/assets/kofi_button_dark.png" alt="Support me on Ko-fi"/></a>
  </p>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AppHome',
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>

<style lang="scss" scoped>
.disclaimer {
  clear: both;
  margin-top: 4rem;
  font-size: smaller;
}
.kofi-button {
  height: 1.4rem;
}
</style>
