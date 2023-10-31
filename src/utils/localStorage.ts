import { interfaceInitialState } from '@/store/reducers/InterfaceSlice/InterfaceSlice'
import { set } from 'lodash'
export class LocalStorage {
  public static init() {
    if (typeof window !== 'undefined') {
      const isExistInterface = window.localStorage.getItem('interface')
      if (!isExistInterface) {
        window.localStorage.setItem('interface', JSON.stringify(interfaceInitialState))
      }
    }
  }
  public static getInterfaceState() {
    if (typeof window !== 'undefined') {
      const interfaceLS = window.localStorage.getItem('interface')
      try {
        const parsedILS = JSON.parse(interfaceLS ?? '{}')
        if (typeof parsedILS.menuBar.collapsed !== 'boolean') throw ':('
        if (parsedILS.mode !== 'light' && parsedILS.mode !== 'dark') throw ':('
        return parsedILS
      } catch (e) {
        window.localStorage.setItem('interface', JSON.stringify(interfaceInitialState))
      }
    }
    return interfaceInitialState
  }
  public static setInterfaceValue(field: string, value: unknown) {
    if (typeof window !== 'undefined') {
      let interfaceLS: string | null = window.localStorage.getItem('interface')
      if (!interfaceLS) interfaceLS = JSON.stringify(interfaceInitialState)
      try {
        const parsed = JSON.parse(interfaceLS)
        set(parsed, field, value)
        window.localStorage.setItem('interface', JSON.stringify(parsed))
      } catch (e) {}
    }
  }
}
