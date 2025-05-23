<template>
  <template v-if="!isUpgrade">
    <div class="actionCol">
      <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
    </div>
    <div class="actionCol">
      <SupportInfo :bot-action="botAction" :structure="true" :terrain-priority="true" :directional-selection="true" :ship-level="true"/>
    </div>
    <div class="actionCol text-muted small">
      <button type="button" class="btn btn-outline-secondary btn-sm" @click="isUpgrade=true">{{t('botAction.transformAndBuild.noWorkshop')}}</button>
      <ol class="mt-2">
        <li v-if="isWanderers"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.transformAndBuild.validSpaces.factionWanderers')"></span></li>
        <li v-else v-html="t(`botAction.transformAndBuild.validSpaces.${botAction.structure}`)"></li>
        <li v-html="t('botAction.transformAndBuild.tiebreaker.title')"></li>
        <ol type="a">
          <template v-if="isKuddlers">
            <li><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.transformAndBuild.tiebreaker.structureClosest')"></span></li>
            <li v-if="botAction.terrainPriority">
              <AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.transformAndBuild.tiebreaker.terrainPriorityYourTerrainType',{terrainPriority:botAction.terrainPriority})"></span>
              <TerrainPriorities v-for="terrain of playerTerrains" :key="terrain" :terrain="terrain" :terrainPriority="botAction.terrainPriority"/>
            </li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.directionalSelection')"></li>
          </template>
          <template v-else-if="isMimics">
            <li v-if="botAction.terrainPriority">
              <AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.transformAndBuild.tiebreaker.terrainPriorityYourTerrainType',{terrainPriority:botAction.terrainPriority})"></span>
              <TerrainPriorities v-for="terrain of playerTerrains" :key="terrain" :terrain="terrain" :terrainPriority="botAction.terrainPriority"/>
            </li>
            <li><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.transformAndBuild.tiebreaker.structureClosest')"></span></li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.directionalSelection')"></li>
          </template>
          <template v-else>
            <li v-if="isPowerMongers"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.transformAndBuild.tiebreaker.factionPowerMongers')"></span></li>
            <li v-if="botAction.terrainPriority">
              <span v-html="t('botAction.transformAndBuild.tiebreaker.terrainPriority',{terrainPriority:botAction.terrainPriority})"></span>
              <TerrainPriorities :terrain="botTerrain" :terrainPriority="botAction.terrainPriority"/>
            </li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.structureClosest')"></li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.directionalSelection')"></li>
          </template>
        </ol>
        <li v-html="t('botAction.transformAndBuild.execute.title')"></li>
        <ol type="a">
          <li v-html="t('botAction.transformAndBuild.execute.homeTerrainTile')"></li>
          <li v-html="t('botAction.transformAndBuild.execute.workshop')"></li>
          <li v-if="isMarkedStructure" v-html="t('botAction.transformAndBuild.execute.marked')"></li>
        </ol>
      </ol>
    </div>

    <ModalDialog id="modalBringTogether" :title="t('botAction.transformAndBuild.bringTogether.title')">
      <template #body>
        <p v-html="t('botAction.transformAndBuild.bringTogether.text1')"></p>
        <p v-html="t('botAction.transformAndBuild.bringTogether.text2')"></p>
      </template>
    </ModalDialog>

  </template>
  <template v-else>
    <Upgrade :bot-action="upgradeBotAction" :navigation-state="navigationState"/>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import AppIcon from '@/components/structure/AppIcon.vue'
import SupportInfo from '../supportInfo/SupportInfo.vue'
import Upgrade from './ActionUpgrade.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import Action from '@/services/enum/Action'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import BotFaction from '@/services/enum/BotFaction'
import Structure from '@/services/enum/Structure'
import TerrainPriorities from './TerrainPriorities.vue'

export default defineComponent({
  name: 'ActionTransformAndBuild',
  inheritAttrs: false,
  components: {
    AppIcon,
    SupportInfo,
    Upgrade,
    ModalDialog,
    TerrainPriorities
  },
  setup(props) {
    const { t } = useI18n()
    const state = useStateStore()
    const { botTerrain, playerTerrains } = props.navigationState
    return { t, state, botTerrain, playerTerrains }
  },
  props: {
    botAction: {
      type: Object as PropType<BotAction>,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      isUpgrade: false,
    }
  },
  computed: {
    upgradeBotAction() : BotAction {
      return {
        action: Action.UPGRADE,
        directionalSelection: this.botAction.directionalSelection,
        directionalSelectionCount: this.botAction.directionalSelectionCount
      }
    },
    botFaction() : BotFaction|undefined {
      return this.botAction.botFaction
    },
    isFactionAction() : boolean {
      return this.botFaction != undefined
    },
    isKuddlers() : boolean {
      return this.botFaction == BotFaction.KUDDLERS
    },
    isWanderers() : boolean {
      return this.botFaction == BotFaction.WANDERERS
    },
    isMimics() : boolean {
      return this.botFaction == BotFaction.MIMICS
    },
    isPowerMongers() : boolean {
      return this.botFaction == BotFaction.POWERMONGERS
    },
    isMarkedStructure() : boolean {
      return this.botAction.structure == Structure.MARKED || this.botAction.structure == Structure.MARKED_REACHING
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 6rem;
}
.structureIcon, .factionActionIcon {
  height: 1.3rem;
  margin-right: 0.2rem;
}
:deep(a) {
  text-decoration: underline;
  text-decoration-style: dotted;
  color: #000;
}
</style>
