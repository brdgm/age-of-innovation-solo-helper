<template>
  <h4>{{t('setupGameAutoma.generalSetup')}}</h4>
  <p v-html="t('setupGameAutoma.generalSetupIntro')"></p>
  <ol>
    <li v-if="isTwoPlayerGame" v-html="t('setupGameAutoma.noTwoPlayerSpecialRules')"></li>
    <li>
      <AppIcon name="scoring-tile-setup" class="scoring-tile-icon"/>
      <span v-html="t('setupGameAutoma.roundScoreTiles')"></span>
    </li>
    <li>
      <AppIcon name="scoring-tile-game-end-token" class="scoring-tile-icon"/>
      <span v-html="t('setupGameAutoma.gameEndToken')"></span>
    </li>
    <li v-html="t('setupGameAutoma.palaceTiles')"></li>
    <li>
      <span v-html="t('setupGameAutoma.factionSelection.title')"></span>
      <ol type="a">
        <li v-html="t('setupGameAutoma.factionSelection.planningDisplayCards')"></li>
        <li v-html="t('setupGameAutoma.factionSelection.factionTiles')"></li>
        <li v-html="t('setupGameAutoma.factionSelection.chooseSet')"></li>
      </ol>
    </li>
    <li v-html="t('setupGameAutoma.chooseAutomaTerrain')"></li>
    <li>
      <span v-html="t('setupGameAutoma.automaComponents.title')"></span>
      <ol type="a">
        <li v-html="t('setupGameAutoma.automaComponents.buildings')"></li>
        <li v-html="t('setupGameAutoma.automaComponents.scholars')"></li>
        <li>
          <span v-html="t('setupGameAutoma.automaComponents.science')"></span>
          <ul>
            <li v-for="faction in factions" :key="faction">
              <i>{{t(`botFaction.${faction}`)}}</i>:
              <span v-for="(bonus,index) in getScienceDisciplineBonus(faction)" :key="index">
                {{bonus.advanceSteps}}
                <AppIcon type="science-discipline" :name="bonus.scienceDiscipline" class="scienceDisciplineIcon me-2"/>
              </span>
              <span v-if="getScienceDisciplineBonus(faction).length == 0" v-html="t('setupGameAutoma.automaComponents.stepNone')"></span>
            </li>
          </ul>
        </li>
        <li v-if="isFactionSymbionts" v-html="t('setupGameAutoma.automaComponents.factionSetup',{faction:t('botFaction.symbionts')})"></li>
        <li v-if="isFactionBlight" v-html="t('setupGameAutoma.automaComponents.factionSetup',{faction:t('botFaction.blight')})"></li>
        <li v-if="isFactionGognomes" v-html="t('setupGameAutoma.automaComponents.factionSetup',{faction:t('botFaction.gognomes')})"></li>
        <li v-html="t('setupGameAutoma.automaComponents.scoreTrack')"></li>
      </ol>
    </li>
  </ol>

  <h4>{{t('setupGameAutoma.initialWorkshop.title')}}</h4>
  <p v-html="t('setupGameAutoma.initialWorkshop.intro')"></p>
  <ol>
    <li v-html="t('setupGameAutoma.initialWorkshop.player')"></li>
    <li>
      <AppIcon type="structure" name="marked" class="structureIcon"/>&nbsp;<span v-html="t('setupGameAutoma.initialWorkshop.marked', {character:randomCard.initialWorkshopMarked})"></span>
    </li>
    <li>
      <AppIcon type="structure" name="unmarked" class="structureIcon"/>&nbsp;<span v-html="t('setupGameAutoma.initialWorkshop.unmarked', {character:randomCard.initialWorkshopUnmarked})"></span>
    </li>
    <li v-html="t('setupGameAutoma.initialWorkshop.playerSecond')"></li>
  </ol>

  <h4>{{t('setupGameAutoma.bonusCards.title')}}</h4>
  <ul>
    <li v-html="t('setupGameAutoma.bonusCards.take',{count:bonusCardCount})"></li>
    <li v-html="t('setupGameAutoma.bonusCards.coins')"></li>
  </ul>
</template>

<script lang="ts">
import Card from '@/services/Card'
import Cards from '@/services/Cards'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import AppIcon from '../structure/AppIcon.vue'
import BotFaction from '@/services/enum/BotFaction'
import { ScienceDisciplineBonusSteps } from '@/services/ScienceDisciplineBonus'
import ScienceDisciplineBonuses from '@/services/ScienceDisciplineBonuses'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'AutomaSetup',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    bonusCardCount() : number {
      return this.state.setup.playerSetup.botCount + this.state.setup.playerSetup.playerCount + 3
    },
    randomCard(): Card {
      const allCards = Cards.getAll()
      const index = rollDice(allCards.length)
      return allCards[index - 1]
    },    
    isFactionSymbionts() : boolean {
      return this.state.setup.playerSetup.botFaction.includes(BotFaction.SYMBIONTS)
    },
    isFactionBlight() : boolean {
      return this.state.setup.playerSetup.botFaction.includes(BotFaction.BLIGHT)
    },
    isFactionGognomes() : boolean {
      return this.state.setup.playerSetup.botFaction.includes(BotFaction.GOGNOMES)
    },
    factions() : BotFaction[] {
      return this.state.setup.playerSetup.botFaction
    },
    isTwoPlayerGame() : boolean {
      const { playerCount, botCount } = this.state.setup.playerSetup
      return (playerCount + botCount) == 2
    }
  },
  methods: {
    getScienceDisciplineBonus(botFaction : BotFaction) : ScienceDisciplineBonusSteps[] {
      return ScienceDisciplineBonuses.get(botFaction)
    }
  }
})
</script>

<style lang="scss" scoped>
li {
  margin-top: 0.5rem;
  clear: both;
  li {
    margin-top: 0rem;
  }
}
.structureIcon, .scienceDisciplineIcon {
  height: 1.5rem;
}
.scoring-tile-icon {
  float: right;
  height: 6rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>