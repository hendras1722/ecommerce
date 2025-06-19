import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  globalCss: {
    '*::placeholder': {
      opacity: 1,
      color: 'fg.subtle',
    },
    '*::selection': {
      bg: 'green.200',
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
