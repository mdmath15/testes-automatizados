import { it, expect, describe, jest, beforeEach } from '@jest/globals'
import Task from '../src/task.js'
import { setTimeout } from 'node:timers/promises'

describe('Task Test Suite', () => {
  let logMock
  let _task

  beforeEach(() => {
    logMock = jest.spyOn(
      console, 
      'log'
    ).mockImplementation()

    _task = new Task()
  })

  it('should only run tasks that are due with fake timers (fast)', async () => {
    jest.useFakeTimers()
    //Arrange
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5000), // 5s
        fn: jest.fn()
      },
      {
        name: 'Task-Will-Run-In-10-Secs',
        dueAt: new Date(Date.now() + 10000), // 10s
        fn: jest.fn()
      }
    ]

    //Act
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    _task.run(200) // 200ms

    jest.advanceTimersByTime(4000)

    // ninguém deve ser executado ainda
    expect(tasks.at(0).fn).not.toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(2000)

    // 4 + 2 = 6 só a primeira tarefa deve executar
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(4000)
   
    // 4 + 2 + 4 = 10 as duas tarefas devem ser executadas
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).toHaveBeenCalled()

    jest.useRealTimers()
  })

  it('should clear interval when no tasks are left', async () => {
    jest.useFakeTimers()
    //Arrange
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5000), // 5s
        fn: jest.fn()
      },
      {
        name: 'Task-Will-Run-In-10-Secs',
        dueAt: new Date(Date.now() + 10000), // 10s
        fn: jest.fn()
      }
    ]

    jest.spyOn(global, 'clearInterval')

    //Act
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    _task.run(200) // 200ms

    jest.advanceTimersByTime(11000) // 11s
  
    expect(clearInterval).toHaveBeenCalledTimes(1)

    jest.useRealTimers()
  })
})



