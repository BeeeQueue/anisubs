<template>
  <div class="anime-input">
    <div class="cover">
      <transition name="fade">
        <img
          v-if="
            !animeLoading && animeError == null && anime?.imageLarge != null
          "
          class="cover"
          :src="anime?.imageLarge"
        />
        <div v-else class="cover placeholder">
          {{ animeLoading ? "Loading..." : "" }}
        </div>
      </transition>
    </div>

    <input
      v-model.number="animeId"
      v-maska="'#######'"
      type="number"
      placeholder="AniList ID"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAnimeInput } from "@/views/create-job/hooks/anime-input"

const { animeId, anime, animeLoading, animeError } = useAnimeInput()
</script>

<style lang="scss" scoped>
.anime-input {
  width: var(--rest-width);

  & > input {
    width: 100%;
    text-align: center;
  }

  & > .cover {
    position: relative;
    height: 250px;
    width: var(--rest-width);
    margin-bottom: 10px;

    border-radius: 15px;
    background: var(--bg-secondary);
    overflow: hidden;

    & > img,
    & > .placeholder {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }

    & > img {
      object-fit: cover;
    }

    & > .placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }
  }
}
</style>
