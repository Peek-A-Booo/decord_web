<template>
  <div class="h-full">
    <n-form inline>
      <n-form-item label="姓名" path="user.name">
        <n-input v-model:value="form.name" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="年龄" path="user.age">
        <n-input placeholder="输入年龄" v-model:value="form.age" />
      </n-form-item>
      <n-form-item>
        <n-space>
          <n-button>搜索</n-button>
          <n-button type="primary" @click="openAdd">新建</n-button>
        </n-space>
      </n-form-item>
    </n-form>
    <n-data-table
      flex-height
      :style="{ height: 'calc(100vh - 200px)' }"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />

    <Add ref="addRef" />
  </div>
</template>

<script setup lang="ts">
  import { h, reactive, ref } from 'vue';
  import { NTag, NButton } from 'naive-ui';
  import Add from './add.vue';

  const createColumns = ({ sendMail }: any) => {
    return [
      {
        title: 'Name',
        key: 'name',
        align: 'center',
      },
      {
        title: 'Age',
        key: 'age',
      },
      {
        title: 'Address',
        key: 'address',
      },
      {
        title: 'Tags',
        key: 'tags',
        render(row: any) {
          const tags = row.tags.map((tagKey: string) => {
            return h(
              NTag,
              {
                style: {
                  marginRight: '6px',
                },
                type: 'info',
              },
              {
                default: () => tagKey,
              }
            );
          });
          return tags;
        },
      },
      {
        title: 'Action',
        key: 'actions',
        render(row: any) {
          return h(
            NButton,
            {
              size: 'small',
              onClick: () => sendMail(row),
            },
            { default: () => 'Send Email' }
          );
        },
      },
    ];
  };

  const createData = () => [
    {
      key: 0,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: 1,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['wow'],
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const data = createData();

  const columns = createColumns({
    sendMail(rowData: any) {
      console.log(rowData, 'rowData');
    },
  });

  const pagination = {
    pageSize: 10,
  };

  const form = reactive({
    name: '',
    age: '',
  });

  const addRef = ref();

  const openAdd = () => {
    addRef.value.init();
  };
</script>

<style lang="scss" scoped></style>
