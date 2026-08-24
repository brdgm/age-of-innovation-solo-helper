<template>
  <ModalDialog id="cardInfoModal" sizeLg>
    <template #body>
      <div class="cardInfoGrid">
        <div v-for="entry of cardEntries" :key="entry.label" class="cardBlock">
          <h6 class="cardHeading">
            {{t(entry.label)}} <span class="cardId">{{entry.card.id}}</span>
          </h6>
          <div class="cardColumns">
            <div class="supportColumn">
              <div><AppIcon type="bonus-card-selection" :name="entry.card.bonusCardSelection" class="bonusCardIcon"/></div>
              <StructureSelection :type="entry.card.structure"/>
              <TerrainPriority :type="entry.card.terrainPriority"/>
              <DirectionalSelection :type="entry.card.directionalSelection" :count="entry.card.directionalSelectionCount"/>
              <ScienceDisciplineSelection :type="entry.card.scienceDisciplineSelection"/>
            </div>
            <div class="actionColumn">
              <div v-for="(action, index) of entry.card.actions" :key="index" class="actionItem">
                <div v-if="action === Action.GAIN_VICTORY_POINTS" class="vpItem">
                  <div v-if="entry.card.victoryPoints" class="vpCount">{{entry.card.victoryPoints}}</div>
                  <AppIcon type="action" name="gain-victory-points" class="vpIcon"/>
                  <AppIcon v-if="entry.card.victoryPointsDifficultyLevel" name="difficulty-level" class="vpDifficultyIcon"/>
                </div>
                <AppIcon v-else type="action" :name="action" class="actionIcon"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/services/Card'
import Action from '@/services/enum/Action'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import StructureSelection from './supportInfo/StructureSelection.vue'
import TerrainPriority from './supportInfo/TerrainPriority.vue'
import DirectionalSelection from './supportInfo/DirectionalSelection.vue'
import ScienceDisciplineSelection from './supportInfo/ScienceDisciplineSelection.vue'

interface CardEntry {
  label: string
  card: Card
}

export default defineComponent({
  name: 'CardInfoModal',
  components: {
    ModalDialog,
    AppIcon,
    StructureSelection,
    TerrainPriority,
    DirectionalSelection,
    ScienceDisciplineSelection
  },
  setup() {
    const { t } = useI18n()
    return { t, Action }
  },
  props: {
    actionCard: {
      type: Object as PropType<Card>,
      required: true
    },
    supportCard: {
      type: Object as PropType<Card>,
      required: true
    }
  },
  computed: {
    cardEntries() : CardEntry[] {
      return [
        { label: 'cardInfo.actionCard', card: this.actionCard },
        { label: 'cardInfo.supportCard', card: this.supportCard }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.cardInfoGrid {
  display: flex;
  flex-flow: wrap;
  gap: 1rem;
}
.cardBlock {
  flex: 1 1 14rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  padding: 0.75rem;
}
.cardHeading {
  margin-bottom: 0.75rem;
  .cardId {
    color: #6c757d;
    font-weight: normal;
  }
}
.cardColumns {
  display: flex;
  gap: 1rem;
}
.supportColumn {
  background-color: #f7d39c;
  border-radius: 0.5rem;
  padding: 0.5rem;
  div {
    margin: 0.2rem;
  }
  .bonusCardIcon {
    width: 3rem;
  }
}
.actionColumn {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  .actionItem .actionIcon {
    width: 5rem;
  }
  .vpItem {
    position: relative;
    .vpCount {
      position: absolute;
      width: 5rem;
      margin-top: -0.5rem;
      font-size: 3rem;
      font-weight: bold;
      text-align: center;
      color: white;
      text-shadow: 1px 1px 10px #000, 1px 1px 10px #000;
    }
    .vpIcon {
      width: 5rem;
    }
    .vpDifficultyIcon {
      width: 1.5rem;
      vertical-align: bottom;
      margin-left: 0.2rem;
    }
  }
}
</style>
