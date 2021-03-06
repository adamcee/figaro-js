import { load } from '../src'
import { 
  DEVELOPMENT_ENV,
  CONFIG_FILE_PATH
} from './fixtures'

test('adds new env object to process.env', () => {
  const priorProcessEnv = { ...process.env }
  load({
    path: CONFIG_FILE_PATH,
    environment: 'development',
  })
  expect(process.env).toEqual({ ...priorProcessEnv, ...DEVELOPMENT_ENV })
})

test('overwrites existing vars in process.env', () => {
  process.env.SHARED_VAR = 'something'
  load({
    path: CONFIG_FILE_PATH,
    environment: 'development',
  })
  expect(process.env.SHARED_VAR).toEqual(DEVELOPMENT_ENV.SHARED_VAR)
})

test('modifies process.env in place', () => {
  const processEnvReference = process.env
  load({
    path: CONFIG_FILE_PATH,
    environment: 'development',
  })
  expect(process.env).toBe(processEnvReference)
})
