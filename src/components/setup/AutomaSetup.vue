<template>
  <h4>{{t('setupGameAutoma.generalSetup')}}</h4>
  <p v-html="t('setupGameAutoma.generalSetupIntro')"></p>
  <ol>
    <li v-if="isTwoPlayerGame" v-html="t('setupGameAutoma.noTwoPlayerSpecialRules')"></li>
    <li v-html="t('setupGameAutoma.palaceTiles', {count:palaceTileCount})"></li>
    <li v-if="isTwoHumanPlayers" v-html="t('setupGameAutoma.factionSelectionTwoHumanPlayer')"></li>
    <li v-else>
      <span v-html="t('setupGameAutoma.factionSelection.title')"></span>
      <ol type="a">
        <li v-html="t('setupGameAutoma.factionSelection.planningDisplayCards')"></li>
        <li v-html="t('setupGameAutoma.factionSelection.factionTiles')"></li>
        <li v-html="t('setupGameAutoma.factionSelection.chooseSet')"></li>
      </ol>
    </li>
    <li>
      <span v-html="t('setupGameAutoma.chooseAutomaTerrain')"></span><br/>
      <ul>
        <li v-for="(faction,i) in factions" :key="faction">
          <i>{{t(`botFaction.${faction}`)}}</i>:
          <div class="terrainSelection">
            <div class="form-check form-check-inline" v-for="terrain in terrains" :key="terrain">
              <label class="form-check-label">
                <input class="form-check-input" type="radio" :name="`botTerrain${i}`" v-model="botTerrain[i]" :value="terrain">
                <AppIcon type="terrain" :name="terrain" extension="webp" class="terrainIcon"/>
              </label>
            </div>
          </div>
        </li>
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

export default defineComponent({
  name: 'AutomaSetup',
  emits: {
    botTerrain: (_botTerrain: (Terrain|undefined)[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      botTerrain: [undefined, undefined] as (Terrain|undefined)[]
    }
  },
  computed: {
    palaceTileCount() : number {
      return this.state.setup.playerSetup.playerCount + 1
    },
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
    },
    isTwoHumanPlayers() : boolean {
      return this.state.setup.playerSetup.playerCount === 2
    },
    terrains() : Terrain[] {
      return Object.values(Terrain)
    }
  },
  methods: {
    getScienceDisciplineBonus(botFaction : BotFaction) : ScienceDisciplineBonusSteps[] {
      return ScienceDisciplineBonuses.get(botFaction)
    }
  },
  watch: {
    // whenever question changes, this function will run
    botTerrain: {
      handler(newValue) {
        this.$emit('botTerrain', newValue)
      },
      deep: true
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
.terrainSelection .form-check-label {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
}
.terrainIcon {
  margin: 0.25rem;
  height: 1.75rem;
  filter: drop-shadow(2px 2px 2px #888);
  cursor: pointer;
}
</style>