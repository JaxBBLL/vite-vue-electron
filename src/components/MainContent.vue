<template>
  <header>
    <div class="wrap flex">
      <div class="flex-1">
        <n-input-group>
          <n-input v-model:value="url" clearable placeholder="请输入网址" />
          <n-button @click="onClick" type="primary">查询</n-button>
        </n-input-group>
      </div>
      <n-button @click="onDownload" class="ml-10" type="info">
        下载
      </n-button>
    </div>
  </header>
  <footer>
    <div class="content-list wrap">
      <img
        referrerpolicy="no-referrer"
        class="content-item"
        :src="item"
        v-for="(item, index) in list"
        :key="index"
      />
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
const win: any = window
const url = ref('https://www.zhaosw.com/product/detail/255536545')
const list = ref([])
const Message = useMessage()

const onClick = () => {
  win.electron.query(url.value).then((res) => {
    list.value = res
  })
}

const onDownload = () => {
  win.electron.download().then((res) => {
    console.log(res)
  })
}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}

.mt-10 {
  margin-top: 10px;
}

.ml-10 {
  margin-left: 10px;
}
header {
  position: sticky;
  background: #fff;
  top: 0;
  padding: 10px 0;
  box-shadow: 0 0 5px 0 #ddd;
}
footer {
  margin-top: 10px;
}
.wrap {
  max-width: 1200px;
  margin: 0 auto;
}
.content-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}
.content-item {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  border: 1px solid #ddd;
  vertical-align: middle;
}

@media screen and (max-width: 1200px) {
  .content-list {
    grid-template-columns: repeat(5, 1fr);
  }
  .wrap {
    padding: 0 30px;
  }
}
</style>
