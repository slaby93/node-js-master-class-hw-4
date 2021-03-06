import * as fs from 'fs'
import * as path from 'path'
import logger from './logger';
const DATA_FOLDER = '.data'

export default {
  save: async (folder: string, file: string, data: any) => {
    try {
      await new Promise((resolve, reject) => {
        fs.writeFile(`${DATA_FOLDER}/${folder}/${file}`, data, { encoding: 'utf-8', flag: 'wx' }, error => {
          error ? reject(error) : resolve()
        })
      })
    } catch (error) {
      logger.error({ error })
      throw error
    }
  },
  load: async (folder: string, file: string): Promise<any> => {
    try {
      return await new Promise((resolve, reject) => {
        fs.readFile(path.resolve(`${DATA_FOLDER}/${folder}/${file}`), { encoding: 'utf-8', flag: 'r' }, (error, data) => {
          data && !error ? resolve(data) : reject(error)
        })
      })
    } catch (error) {
      logger.error({ error })
    }
  },
  /**
   * Load all files within given folder
   */
  loadAll: async (folder: string): Promise<any> => {
    try {
      return await new Promise((resolve, reject) => {
        fs.readdir(`${DATA_FOLDER}/${folder}`, (error, data: string[]) => {
          if (error) { return reject(error) }

          const promiseArray = data.map((file: string) => {
            return new Promise((resolve, reject) => {
              fs.readFile(path.resolve(`${DATA_FOLDER}/${folder}/${file}`), { encoding: 'utf-8', flag: 'r' }, (error, data) => {
                if (error) { return reject(error) }
                resolve(JSON.parse(data))
              })
            })
          })

          Promise.all(promiseArray)
            .then(files => resolve(files))

        })

      })
    } catch (error) {
      logger.error({ error })
    }
  },
  update: async (folder: string, file: string, data: any) => {
    try {
      await new Promise((resolve, reject) => {
        fs.writeFile(`${DATA_FOLDER}/${folder}/${file}`, data, { encoding: 'utf-8', flag: 'w+' }, error => {
          error ? reject(error) : resolve()
        })
      })
    } catch (error) {
      logger.error({ error })
      throw error
    }
  },
  delete: async (folder: string, file: string) => {
    try {
      await new Promise((resolve, reject) => {
        fs.unlink(`${DATA_FOLDER}/${folder}/${file}`, error => {
          error ? reject('Can\'t find requested file') : resolve()
        })
      })
    } catch (error) {
      logger.error({ error })
      throw error
    }
  },
  loadAssets: async (folder: string, file: string): Promise<any> => {
    try {
      return await new Promise((resolve, reject) => {
        fs.readFile(path.resolve(`${DATA_FOLDER}/${folder}/${file}`), { flag: 'r' }, (error, data) => {
          data && !error ? resolve(data) : reject(error)
        })
      })
    } catch (error) {
      logger.error({ error })
    }
  },
}