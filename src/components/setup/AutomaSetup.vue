<template>
  <h4>{{t('setupGameAutoma.generalSetup')}}</h4>
  <p v-html="t('setupGameAutoma.generalSetupIntro')"></p>
  <ol>
    <li v-if="isTwoPlayerGame" v-html="t('setupGameAutoma.noTwoPlayerSpecialRules')"></li>
    <li v-html="t('setupGameAutoma.palaceTiles', {count:palaceTileCount})"></li>
    <li v-if="isTwoHumanPlayers">
      <span v-html="t('setupGameAutoma.factionSelectionTwoHumanPlayer')"></span>
      <ul>
        <li v-for="(player,i) in playerCount" :key="player">
          <i>{{t(`setup.players.player`, {player})}}</i>:
          <ChooseTerrain v-model="playerTerrain[i]"/>
        </li>
      </ul>
    </li>
    <li v-else>
      <span v-html="t('setupGameAutoma.factionSelection.title')"></span>
      <ol type="a">
        <li v-html="t('setupGameAutoma.factionSelection.planningDisplayCards')"></li>
        <li v-html="t('setupGameAutoma.factionSelection.factionTiles')"></li>
        <li>
          <span v-html="t('setupGameAutoma.factionSelection.chooseSet')"></span>
          <ChooseTerrain v-model="playerTerrain[0]"/>
        </li>
      </ol>
    </li>
    <li>
      <span v-html="t('setupGameAutoma.chooseAutomaTerrain')"></span><br/>
      <ul>
        <template v-for="(faction,i) in factions" :key="faction">
          <li>
            <i>{{t(`botFaction.${faction}`)}}</i>:
            <ChooseTerrain v-model="botTerrain[i]"/>
          </li>
          <li v-if="isBotFactionSymbionts(faction)">
            <i>{{t('setupGameAutoma.symbiontsYouth')}}</i>:
            <ChooseTerrain v-model="botSymbiontYouthTerrain"/>
          </li>
        </template>
      </ul>
    </li>
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
    <template v-if="isTwoHumanPlayers">
      <li v-html="t('setupGameAutoma.initialWorkshop.playerMultiple', {player:1})"></li>
      <li v-html="t('setupGameAutoma.initialWorkshop.playerMultiple', {player:2})"></li>
    </template>
    <li v-else v-html="t('setupGameAutoma.initialWorkshop.player')"></li>
    <li>
      <AppIcon type="structure" name="marked" class="structureIcon"/>&nbsp;<span v-html="t('setupGameAutoma.initialWorkshop.marked', {character:randomCard.initialWorkshopMarked})"></span>
    </li>
    <li>
      <AppIcon type="structure" name="unmarked" class="structureIcon"/>&nbsp;<span v-html="t('setupGameAutoma.initialWorkshop.unmarked', {character:randomCard.initialWorkshopUnmarked})"></span>
    </li>
    <template v-if="isTwoHumanPlayers">
      <li v-html="t('setupGameAutoma.initialWorkshop.playerSecondMultiple', {player:2})"></li>
      <li v-html="t('setupGameAutoma.initialWorkshop.playerSecondMultiple', {player:1})"></li>
    </template>
    <li v-else v-html="t('setupGameAutoma.initialWorkshop.playerSecond')"></li>
  </ol>

  <h4>{{t('setupGameAutoma.bonusCards.title')}}</h4>
  <ul>
    <li v-if="isTwoHumanPlayers" v-html="t('setupGameAutoma.bonusCards.takeTwoHumanPlayer',{count:bonusCardCount})"></li>
    <li v-else v-html="t('setupGameAutoma.bonusCards.take',{count:bonusCardCount})"></li>
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
import Terrain from '@/services/enum/Terrain'
import ChooseTerrain from './ChooseTerrain.vue'

export default defineComponent({
  name: 'AutomaSetup',
  emits: {
    playerTerrain: (_playerTerrain: (Terrain|undefined)[]) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars
    botTerrain: (_botTerrain: (Terrain|undefined)[], _botSymbiontYouthTerrain?: Terrain) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    AppIcon,
    ChooseTerrain
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const { playerCount, botCount, botFaction } = state.setup.playerSetup
    return { t, state, playerCount, botCount, botFaction }
  },
  data() {
    return {
      playerTerrain: [undefined, undefined] as (Terrain|undefined)[],
      botTerrain: [undefined, undefined] as (Terrain|undefined)[],
      botSymbiontYouthTerrain: undefined as Terrain|undefined
    }
  },
  computed: {
    palaceTileCount() : number {
      return this.playerCount + 1
    },
    bonusCardCount() : number {
      return this.playerCount + this.botCount + 3
    },
    randomCard(): Card {
      const allCards = Cards.getAll()
      const index = rollDice(allCards.length)
      return allCards[index - 1]
    },    
    isFactionSymbionts() : boolean {
      return this.botFaction.includes(BotFaction.SYMBIONTS)
    },
    isFactionBlight() : boolean {
      return this.botFaction.includes(BotFaction.BLIGHT)
    },
    isFactionGognomes() : boolean {
      return this.botFaction.includes(BotFaction.GOGNOMES)
    },
    factions() : BotFaction[] {
      return this.botFaction
    },
    isTwoPlayerGame() : boolean {
      return (this.playerCount + this.botCount) == 2
    },
    isTwoHumanPlayers() : boolean {
      return this.playerCount === 2
    }
  },
  methods: {
    getScienceDisciplineBonus(botFaction : BotFaction) : ScienceDisciplineBonusSteps[] {
      return ScienceDisciplineBonuses.get(botFaction)
    },
    isBotFactionSymbionts(botFaction : BotFaction) : boolean {
      return botFaction == BotFaction.SYMBIONTS
    }
  },
  watch: {
    playerTerrain: {
      handler(newValue) {
        this.$emit('playerTerrain', newValue)
      },
      deep: true
    },
    botTerrain: {
      handler(newValue) {
        this.$emit('botTerrain', newValue, this.botSymbiontYouthTerrain)
      },
      deep: true
    },
    botSymbiontYouthTerrain: {
      handler(newValue) {
        this.$emit('botTerrain', this.botTerrain, newValue)
      }
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
.structureIcon {
  height: 1.5rem;
}
.scienceDisciplineIcon {
  height: 1.75rem;
  filter: drop-shadow(2px 2px 2px #888);
}
</style>