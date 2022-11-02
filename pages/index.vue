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
      <CHeading text-align="center" mb="4"> ⚡️ 気象庁の地震情報を取得する </CHeading>
      <CFlex justify="center" direction="column" align="center">
        <CBox mb="3">
          <CButton left-icon="star" variant-color="blue" @click="requestQuakeApi">
            しゅとく！
          </CButton>
        </CBox>
      </CFlex>
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
          color: 'gray.900'
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
    }
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
      this.quakes = res.data
      console.log(this.quakes)

      this.$toast({
        title: '地震情報を取得しました',
        description: '直近 5 件の地震情報です。',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    }
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
</style>