import { resolve } from 'path'
import { app } from 'electron'
import { I18nService } from 'bitwarden/services/i18n.service'
import { NodeCryptoFunctionService } from 'bitwarden/services/nodeCryptoFunction.service'
import { LowdbStorageService } from 'bitwarden/services/lowdbStorage.service'
import { NodeEnvSecureStorageService } from 'bitwarden/cli/services/nodeEnvSecureStorage.service'
import { CryptoService } from 'bitwarden/services/crypto.service'
import { ContainerService } from 'bitwarden/services/container.service'
import { CliPlatformUtilsService } from 'bitwarden/cli/services/cliPlatformUtils.service'
import { TokenService } from 'bitwarden/services/token.service'
import { NodeApiService } from 'bitwarden/services/nodeApi.service'
import { EnvironmentService } from 'bitwarden/services/environment.service'
import { AuthService } from 'bitwarden/services/auth.service'
import { UserService } from 'bitwarden/services/user.service'
import { AppIdService } from 'bitwarden/services/appId.service'
import { NoopMessagingService } from 'bitwarden/services/noopMessaging.service'
import { SyncService } from 'bitwarden/services/sync.service'

import { CipherService } from 'bitwarden/services/cipher.service'
import { SettingsService } from 'bitwarden/services/settings.service'
import { FolderService } from 'bitwarden/services/folder.service'
import { CollectionService } from 'bitwarden/services/collection.service'
import { SearchService } from 'bitwarden/services/search.service'

import { Utils } from 'bitwarden/misc/utils'
import { LoginCommand } from 'bitwarden/cli/commands/login.command'

import ipc from './ipc'
import state from './state'

export default class Vault {
  constructor (session) {
    const storagePath = resolve(app.getPath('userData'), 'Vaults', session)
    this.session = session
    this.i18nService = new I18nService('en', './locales')
    this.cryptoFunctionService = new NodeCryptoFunctionService()
    this.storageService = new LowdbStorageService(null, storagePath, true)
    this.secureStorageService = new NodeEnvSecureStorageService(this.storageService, () => this.cryptoService)
    this.cryptoService = new CryptoService(this.storageService, this.secureStorageService, this.cryptoFunctionService)
    this.containerService = new ContainerService(this.cryptoService)
    this.platformUtilsService = new CliPlatformUtilsService('cli', require('../package.json'))
    this.tokenService = new TokenService(this.storageService)
    this.apiService = new NodeApiService(this.tokenService, this.platformUtilsService, this.logout)
    this.environmentService = new EnvironmentService(this.apiService, this.storageService, null)
    this.userService = new UserService(this.tokenService, this.storageService)
    this.appIdService = new AppIdService(this.storageService)
    this.messagingService = new NoopMessagingService()
    this.authService = new AuthService(this.cryptoService, this.apiService, this.userService, this.tokenService,
      this.appIdService, this.i18nService, this.platformUtilsService, this.messagingService, true)
    this.cipherService = new CipherService(this.cryptoService, this.userService, this.settingsService,
      this.apiService, this.storageService, this.i18nService, null)
    this.settingsService = new SettingsService(this.userService, this.storageService)
    this.folderService = new FolderService(this.cryptoService, this.userService, this.apiService,
      this.storageService, this.i18nService, this.cipherService)
    this.collectionService = new CollectionService(this.cryptoService, this.userService, this.storageService,
      this.i18nService)
    this.syncService = new SyncService(this.userService, this.apiService, this.settingsService,
      this.folderService, this.cipherService, this.cryptoService, this.collectionService,
      this.storageService, this.messagingService, this.logout)
    this.searchService = new SearchService(this.cipherService, this.platformUtilsService)
  }

  async init () {
    this.storageService.init()
    this.containerService.attachToGlobal(global)
    await this.environmentService.setUrlsFromStorage()
    this.authService.init()
  }

  async login (username, password) {
    process.env.BW_SESSION = Utils.fromBufferToB64(await this.cryptoFunctionService.randomBytes(64))
    const command = new LoginCommand(this.authService, this.apiService, this.i18nService)
    const response = await command.run(username, password, { method: null })
    response.raw = process.env.BW_SESSION
    return response
  }

  async search (query) {
    let ciphers = await this.cipherService.getAllDecrypted()
    ciphers = this.searchService.searchCiphersBasic(ciphers, query)
    return ciphers[0]
  }

  async logout () {
    console.log('BITWARDEN LOGOUT')
  }

  async sync () {
    if (!state.sessions[this.session].vaultToken) return null
    process.env.BW_SESSION = state.sessions[this.session].vaultToken
    await this.syncService.fullSync(true)
    return await this.cipherService.getAllDecrypted()
  }
}

const vaultSessions = {}

function vaultForSession (session) {
  if (!vaultSessions[session]) {
    vaultSessions[session] = new Vault(session)
    vaultSessions[session].init()
  }
  return vaultSessions[session]
}

ipc.register('vault:login', async ({ session, username, password }) => {
  const vault = vaultForSession(session)
  const response = await vault.login(username, password)
  if (response.success) {
    state.sessions[session].vaultToken = response.raw
    return true
  }
  return false
})

ipc.register('vault:sync', async ({ session }) => {
  const vault = vaultForSession(session)
  return vault.sync()
})
