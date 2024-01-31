import { it, expect, describe, beforeEach, jest } from '@jest/globals'
import Service from '../src/service'
import fs from 'node:fs/promises'


describe('Service Test Suit', () => {
  let _service

  const filename = 'testfile.ndjson'

  beforeEach(() => {
    _service = new Service({
        filename: filename
    })
  })

  describe('#read', () => {
    it('should return an empty array if the file is empty', async () => {
      jest.spyOn(
        fs,
        fs.readFile.name
      ).mockResolvedValue('')

      const result = await _service.read()
      console.log(result)

      expect(result).toEqual([])
    })
  })
})