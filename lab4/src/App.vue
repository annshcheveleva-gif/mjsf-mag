<script setup>
import { ref } from 'vue'
import Tabs from './components/tabs/Tabs.vue'
import Tab from './components/tabs/Tab.vue'

import OverviewPanel from './components/demo-panels/OverviewPanel.vue'
import RequirementsPanel from './components/demo-panels/RequirementsPanel.vue'
import EnvironmentPanel from './components/demo-panels/EnvironmentPanel.vue'

const activeTabUnderline = ref('overview')
const activeTabPills = ref('reqs')
const activeTabBoxed = ref('env')

const pillsTabsConfig = [
  { slug: 'overview', title: 'Огляд (Pills)', panel: OverviewPanel },
  { slug: 'reqs', title: 'Вимоги (Pills)', panel: RequirementsPanel },
  { slug: 'env', title: 'Середовище (Pills)', panel: EnvironmentPanel }
]
</script>

<template>
  <main class="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto space-y-10">
      
      <header class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-black text-slate-900">Лабораторна робота 4</h1>
          <p class="text-slate-600 font-medium mt-1">Створення вкладок із використанням Slots, Provide/Inject, dynamic components і KeepAlive</p>
        </div>
        <div class="text-left sm:text-right bg-slate-50 p-3 rounded-xl border border-slate-100 w-full sm:w-auto">
          <p class="text-sm font-bold text-slate-800">Студент: Щевелева Анна Андріївна</p>
          <p class="text-xs text-slate-500">Група: 7.F2.25-2</p>
          <p class="text-xs text-slate-400 mt-0.5">Середовище: Vite + Vue 3 + Tailwind CSS</p>
        </div>
      </header>

      <section class="space-y-4">
        <h2 class="text-lg font-bold text-slate-800 px-1">1. Варіант Underline (через слот розміткою)</h2>
        <Tabs v-model="activeTabUnderline" variant="underline" label="Перший набір вкладок">
          <Tab slug="overview" title="Огляд">
            <OverviewPanel />
          </Tab>
          <Tab slug="requirements" title="Вимоги">
            <RequirementsPanel />
          </Tab>
          <Tab slug="environment" title="Середовище">
            <EnvironmentPanel />
          </Tab>
        </Tabs>
      </section>

      <section class="space-y-4">
        <h2 class="text-lg font-bold text-slate-800 px-1">2. Варіант Pills (через масив і component :is)</h2>
        <Tabs v-model="activeTabPills" variant="pills" label="Другий набір вкладок">
          <Tab
            v-for="tab in pillsTabsConfig"
            :key="tab.slug"
            :slug="tab.slug"
            :title="tab.title"
            :panel="tab.panel"
          />
        </Tabs>
      </section>

      <section class="space-y-4">
        <h2 class="text-lg font-bold text-slate-800 px-1">3. Варіант Boxed (з вимкненою вкладкою та незалежним станом)</h2>
        <Tabs v-model="activeTabBoxed" variant="boxed" label="Третій набір вкладок">
          <Tab slug="env" title="Середовище 1">
            <EnvironmentPanel />
          </Tab>
          <Tab slug="env-copy" title="Середовище 2">
            <EnvironmentPanel />
          </Tab>
          <Tab slug="disabled-tab" title="Вимкнена вкладка" :disabled="true">
            <p>Цей вміст недоступний, оскільки вкладка вимкнена.</p>
          </Tab>
        </Tabs>
      </section>

    </div>
  </main>
</template>
