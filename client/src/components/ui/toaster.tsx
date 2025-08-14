import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <div key={id} className="p-4 bg-gray-900 text-white rounded-lg border border-gray-700 mb-2">
            {title && <div className="font-semibold">{title}</div>}
            {description && <div className="text-sm text-gray-300">{description}</div>}
            {action}
          </div>
        )
      })}
    </div>
  )
}