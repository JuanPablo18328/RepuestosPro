import { toast } from 'vue-sonner'

export function showSuccess(message) {
  toast.success(message)
}

export function showError(message) {
  toast.error(message)
}