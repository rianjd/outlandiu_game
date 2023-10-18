<template>
    <div class="player-details">
      <h2 class="player-title">Detalhes do Jogador</h2>
      <div class="player-info">
        <strong class="info-label">Elemento:</strong>
        <span class="info-value">{{ player.element }}</span>
      </div>
      <div class="player-info">
        <strong class="info-label">Espécie:</strong>
        <span class="info-value">{{ player.species }}</span>
      </div>
      <div class="player-info">
        <strong class="info-label">Poder:</strong>
        <span class="info-value">{{ player.power }}</span>
      </div>
      <div class="player-info">
        <strong class="info-label">País:</strong>
        <span class="info-value">{{ player.country_name }}</span>
      </div>
      <div class="player-info">
        <strong class="info-label">Herança:</strong>
        <span class="info-value">{{ player.variation }}</span>
      </div>
    </div>
  </template>

<script>
export default {
    props: {
        player: Object,
    },
};

</script>
