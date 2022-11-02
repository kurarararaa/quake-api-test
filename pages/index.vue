<template>
  <div class="container">
    <CBox v-bind="mainStyles[colorMode]">
      <nav class="navbar">
        <h2>⚡️ 地震情報 API てすと</h2>
        <ul>
          <li>
            <CIconButton
              mr="3"
              :icon="colorMode === 'light' ? 'moon' : 'sun'"
              :aria-label="`Switch to ${
                colorMode === 'light' ? 'dark' : 'light'
              } mode`"
              @click="toggleColorMode"
            />
          </li>
        </ul>
      </nav>
    </CBox>
    <CBox
      v-bind="mainStyles[colorMode]"
      d="flex"
      w="100vw"
      h="100vh"
      flex-dir="column"
      justify-content="center"
    >
      <CHeading text-align="center" mb="4">
        ⚡️ 気象庁の地震情報を取得する
      </CHeading>
      <CFlex justify="center" direction="column" align="center" mb="4">
        <CBox mb="3">
          <CButton
            left-icon="star"
            variant-color="blue"
            @click="requestQuakeApi"
          >
            しゅとく！
          </CButton>
        </CBox>
      </CFlex>
      <table v-if="quakes.length > 0">
        <thead>
          <tr>
            <th>発生日時</th>
            <th>最大震度</th>
            <th>震源地（震源の深さ, マグニチュード）</th>
            <th>津波の有無</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="earthquake in earthquakes" :key="earthquake">
            <td>{{ earthquake.time }}</td>
            <td>{{ maxScaleText(earthquake.maxScale) }}</td>
            <td>
              {{ earthquake.hypocenter.name }}（{{
                earthquake.hypocenter.depth
              }}, M{{ earthquake.hypocenter.magnitude }}）
            </td>
            <td>{{ domesticTsunamiText(earthquake.domesticTsunami) }}</td>
          </tr>
        </tbody>
      </table>
    </CBox>
  </div>
</template>

<script lang="js">
import {
  CBox,
  CButton,
  CIconButton,
  CFlex,
  CHeading
} from '@chakra-ui/vue'

export default {
  name: 'IndexPage',
  components: {
    CBox,
    CButton,
    CIconButton,
    CFlex,
    CHeading
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data() {
    return {
      quakes: [],
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.700'
        }
      }
    }
  },
  computed: {
    colorMode() {
      return this.$chakraColorMode()
    },
    theme() {
      return this.$chakraTheme()
    },
    toggleColorMode() {
      return this.$toggleColorMode
    },
    earthquakes() {
      return this.quakes
        .map(data => data.earthquake)
    },
  },
  methods: {
    async requestQuakeApi() {
      const endPoint = 'https://api.p2pquake.net/v1/human-readable'
      // const headers = {}
      const params = {
        limit: 5,
      }

      const res = await this.$axios.get(endPoint, {
        // headers,
        params,
      })
      this.quakes = res.data.filter(data => data.code === 551)

      this.$toast({
        title: '地震情報を取得しました',
        description: '直近の最大 5 件の地震情報です。',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    maxScaleText(maxScale) {
      switch (maxScale) {
        case 0:
          return 'なし'
        case 10:
          return '震度1'
        case 20:
          return '震度2'
        case 30:
          return '震度3'
        case 40:
          return '震度4'
        case 50:
          return '震度5弱'
        case 55:
          return '震度5強'
        case 60:
          return '震度6弱'
        case 65:
          return '震度6強'
        case 70:
          return '震度7'
        default:
          return 'なし'
      }
    },
    domesticTsunamiText(domesticTsunami) {
      switch (domesticTsunami) {
        case 'None':
          return '津波の心配なし'
        case 'Unknown':
          return '不明'
        case 'Checking':
          return '調査中'
        case 'NonEffective':
          return '若干の海面変動（被害の心配なし）'
        case 'Watch':
          return '津波注意報'
        case 'Warning':
          return '津波予報（種類不明）'
        default:
          return '不明'
      }
    },
  }
}
</script>

<style scoped>
.navbar {
  position: absolute;
  width: 100%;
  height: 60px;
  padding: var(--chakra-space-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--chakra-shadows-md);
}

.navbar h2 {
  font-size: 1.2rem;
  font-weight: bold;
}

.navbar ul {
  list-style: none;
}

table {
  border-spacing: 1;
  border-collapse: collapse;
  border-radius: 6px;
  overflow: hidden;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}

table * {
  position: relative;
}

table th {
  color: var(--chakra-colors-gray-700);
}

table td,
table th {
  padding-left: 8px;
  text-align: left;
}

table thead tr {
  height: 60px;
  background: #ffed86;
  font-size: 16px;
}

table tbody tr {
  height: 48px;
  border-bottom: 1px solid #e3f1d5;
}

table tbody tr:last-child {
  border: 0;
}

table td.l,
table th.l {
  text-align: right;
}

table td.c,
table th.c {
  text-align: center;
}

table td.r,
table th.r {
  text-align: center;
}

@media screen and (max-width: 35.5em) {
  table {
    display: block;
  }

  table > *,
  table tr,
  table td,
  table th {
    display: block;
  }

  table thead {
    display: none;
  }

  table tbody tr {
    height: auto;
    padding: 8px 0;
  }

  table tbody tr td {
    padding-left: 45%;
    margin-bottom: 12px;
  }

  table tbody tr td:last-child {
    margin-bottom: 0;
  }

  table tbody tr td::before {
    position: absolute;
    font-weight: 700;
    width: 40%;
    left: 10px;
    top: 0;
  }

  table tbody tr td:nth-child(1)::before {
    content: 'Code';
  }

  table tbody tr td:nth-child(2)::before {
    content: 'Stock';
  }

  table tbody tr td:nth-child(3)::before {
    content: 'Cap';
  }

  table tbody tr td:nth-child(4)::before {
    content: 'Inch';
  }

  table tbody tr td:nth-child(5)::before {
    content: 'Box Type';
  }
}
</style>
