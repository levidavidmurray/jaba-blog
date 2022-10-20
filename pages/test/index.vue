<template>
    <div class="max-w-lg mt-12 mx-auto">
        <n-data-table
            :columns="columns"
            :data="data"
            :pagination="false"
            :theme-overrides="{borderRadius: '8px'}"
        />
    </div>
</template>

<script lang="ts" setup>
import { NDataTable } from 'naive-ui'

if (!$isDev) {
    navigateTo('/', { replace: true })
}

const columns = [
    {
      title: 'No',
      key: 'no'
    },
    {
      title: 'Title',
      key: 'title'
    },
    {
      title: 'Length',
      key: 'length'
    },
]

const data = [
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' }
]
</script>