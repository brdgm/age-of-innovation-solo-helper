<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <ol>
    <li>
      <span v-html="t('endOfGame.areaScoring')"></span>
      <ShipLevel :shipLevel="shipLevel" class="ms-3"/>
    </li>
    <li v-html="t('endOfGame.cultScoring')"></li>
    <li v-if="isFactionWanderers"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('endOfGame.factionWanderers')"></span></li>
    <li v-if="isFactionGognomes"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('endOfGame.factionGognomes')"></span></li>
    <li v-html="t('endOfGame.resourceScoring')"></li>
  </ol>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DifficultyLevelParameters from '@/services/DifficultyLevelParameters'
import { useStateStore } from '@/store/state'
import BotFaction from '@/services/enum/BotFaction'
import ShipLevel from '@/components/turn/supportInfo/ShipLevel.vue'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons,
    ShipLevel
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    return { t, state }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/round/6/end`
    },
    shipLevel() : number {
      return DifficultyLevelParameters.get(this.state.setup.difficultyLevel, 6).shipLevel
    },
    isFactionWanderers() : boolean {
      return this.state.setup.playerSetup.botFaction.includes(BotFaction.WANDERERS)
    },
    isFactionGognomes() : boolean {
      return this.state.setup.playerSetup.botFaction.includes(BotFaction.GOGNOMES)
    }
  }
})
</script>

<style lang="scss" scoped>
.factionActionIcon {
  height: 1.3rem;
  margin-right: 0.2rem;
}
ol > li {
  margin-bottom: 0.5rem;
}
</style>
