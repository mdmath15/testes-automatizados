import { it, expect, describe, beforeEach, jest } from '@jest/globals'
import Service from '../src/service'
import fs from 'node:fs/promises'
import fsSync from 'node:fs'


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

      expect(result).toEqual([])
    })

    it('should return users without password if file contains users', async () => {
      // Arrange
      const dbData = [
        {
          username: 'user1',
          password: 'password',
          createdAt: '2021-09-15T00:00:00.000Z',
        },
        {
          username: 'user2',
          password: 'password2',
          createdAt: '2021-09-15T00:00:00.000Z',
        },
      ]

      jest.spyOn(
        fsSync,
        fsSync.existsSync.name
      ).mockReturnValue(true)
      

      const fileContents = dbData
        .map(item => JSON.stringify(item).concat('\n')).join('')

      jest.spyOn(
        fs,
        'readFile'
      ).mockResolvedValue(fileContents)

      // Act
      const result = await _service.read()

      // Assert
      const expectedResult = dbData.map(({password, ...rest}) => ({...rest}))
      expect(result).toEqual(expectedResult)
    })

    it('should return an empty array if the file does not exist', async () => {
      jest.spyOn(
        fsSync,
        'existsSync'
      ).mockReturnValue(false)

      const result = await _service.read()

      expect(result).toEqual([])
    })
  })
})