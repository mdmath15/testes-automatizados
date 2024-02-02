import { it, expect, describe, beforeEach, jest } from '@jest/globals'
import Service from '../src/service'
import crypto from 'node:crypto'
import fs from 'node:fs/promises'


describe('Service Test Suit', () => {
  let _service

  const filename = 'testfile.ndjson'
  const MOCKED_HASH_PWD = 'hashedpassword'

  describe('#create - spies', () => {
    beforeEach(() => {
      jest.spyOn(
        crypto,
        crypto.createHash.name
      )
      .mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(MOCKED_HASH_PWD)
      })

      jest.spyOn(
        fs,
        fs.appendFile.name
      )
      .mockResolvedValue()
      

      _service = new Service({
          filename: filename
      })
    })
    
    it('should call appendFile with right params', async () => {
      // AAA - Arrange Act Assert

      // Arrange
      const input  = {
        username: 'user1',
        password: 'password1'
      }

      const expectedCreatedAt = new Date().toISOString()

      jest.spyOn(
        Date.prototype,
        Date.prototype.toISOString.name
      )
      .mockReturnValue(expectedCreatedAt)

       // Act
      await _service.create(input)
      
      // Assert
      expect(crypto.createHash).toHaveBeenCalledWith('sha256')
      expect(crypto.createHash).toHaveBeenCalledTimes(1)

      const hash = crypto.createHash('sha256')
      expect(hash.digest).toHaveBeenCalledWith('hex')
     
      const expectedData = JSON.stringify({
        ...input,
        password: MOCKED_HASH_PWD,
        createdAt: expectedCreatedAt
      }).concat('\n')

      expect(fs.appendFile).toHaveBeenCalledWith(filename, expectedData)
    })
  })
})