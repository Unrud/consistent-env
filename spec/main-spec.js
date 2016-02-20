'use babel'

import consistentEnvironment from '../'
import {CACHE_KEY} from '../lib/helpers'

describe('consistent-env', function() {
  let env = process.env
  afterEach(function() {
    delete global[CACHE_KEY]
    process.env = env
  })
  beforeEach(function() {
    process.env = {SHELL: process.env.SHELL}
  })

  it('needs just the shell', function() {
    const foundEnv = consistentEnvironment()
    expect(foundEnv.PATH).toContain('/usr/local/bin')
    expect(foundEnv.PATH).toContain('/usr/bin')
    expect(foundEnv.PATH).toContain('/bin')
    expect(foundEnv.USER).toBe(env.USER)
    expect(foundEnv.SHELL).toBe(env.SHELL)
    expect(foundEnv.EDITOR).toBe(env.EDITOR)
    expect(foundEnv.VISUAL).toBe(env.VISUAL)
  })

  it('has a caching that works well', function() {
    const env1 = consistentEnvironment()
    const env2 = consistentEnvironment()
    const env3 = consistentEnvironment()
    expect(env1).toEqual(env2)
    expect(env1).toEqual(env3)
  })

  it('has an async that needs just the shell', function() {
    waitsForPromise(function() {
      return consistentEnvironment.async().then(function(foundEnv) {
        expect(foundEnv.PATH).toContain('/usr/local/bin')
        expect(foundEnv.PATH).toContain('/usr/bin')
        expect(foundEnv.PATH).toContain('/bin')
        expect(foundEnv.USER).toBe(env.USER)
        expect(foundEnv.SHELL).toBe(env.SHELL)
        expect(foundEnv.EDITOR).toBe(env.EDITOR)
        expect(foundEnv.VISUAL).toBe(env.VISUAL)
      })
    })
  })

  it('has an async that has a caching that works well', function() {
    waitsForPromise(async function() {
      const env1 = await consistentEnvironment.async()
      const env2 = await consistentEnvironment.async()
      const env3 = await consistentEnvironment.async()
      expect(env1).toEqual(env2)
      expect(env1).toEqual(env3)
    })
  })
})
