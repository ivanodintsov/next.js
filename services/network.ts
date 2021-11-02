import config from '~/config';
import { NetworkServiceMock } from '~/services/NetworkService/NetworkService.mock';
import { TokenLocalStorage } from '~/core/Auth/Token/LocalStorage';
import { TokenMemoryStorage } from '~/core/Auth/Token/MemoryStorage';

export const network = new NetworkServiceMock({
  baseURL: config.API_URL,
  tokenStorage: process.browser
    ? new TokenLocalStorage()
    : new TokenMemoryStorage(),
});
