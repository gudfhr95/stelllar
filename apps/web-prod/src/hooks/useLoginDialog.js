import { useStore } from '@/hooks/useStore'

export const useLoginDialog = () =>
  useStore(s => [
    s.loginDialog,
    s.setLoginDialog,
    s.register,
    s.setRegister
  ])

export const useOpenLogin = () => {
  const open = useLoginDialog()[1]
  return () => open(true)
}
