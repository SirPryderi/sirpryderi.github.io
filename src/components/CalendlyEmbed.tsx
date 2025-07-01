import React, { useEffect, useRef } from "react"

// Extend the Window interface to include Calendly
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: CalendlyOptions) => void
      closePopupWidget: () => void
      initPopupWidget: (options: CalendlyOptions) => void
    }
  }
}

interface CalendlyOptions {
  url: string
  parentElement?: HTMLElement
  prefill?: {
    email?: string
    firstName?: string
    lastName?: string
    name?: string
    guests?: string[]
    customAnswers?: Record<string, string>
    date?: Date
  }
  utm?: {
    utmCampaign?: string
    utmSource?: string
    utmMedium?: string
    utmContent?: string
    utmTerm?: string
  }
}

interface CalendlyEmbedProps {
  /** Your Calendly scheduling URL */
  url: string
  /** Container height (default: '630px') */
  height?: string
  /** Container width (default: '100%') */
  width?: string
  /** Background color for the container */
  backgroundColor?: string
  /** Text color for the container */
  textColor?: string
  /** Primary color for the container */
  primaryColor?: string
  /** Border radius for the container */
  borderRadius?: string
  /** Custom CSS class name */
  className?: string
  /** Prefill form data */
  prefill?: CalendlyOptions["prefill"]
  /** UTM parameters for tracking */
  utm?: CalendlyOptions["utm"]
  /** Callback when widget loads */
  onLoad?: () => void
  /** Callback when an event is scheduled */
  onEventScheduled?: (event: any) => void
  /** Hide event type details (default: true) */
  hideEventTypeDetails?: boolean
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({
  url,
  height = "730px",
  width = "100%",
  backgroundColor = "ffffff",
  textColor = "000000",
  primaryColor = "3665a8",
  className = "",
  prefill,
  utm,
  onLoad,
  onEventScheduled,
  hideEventTypeDetails = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    const loadCalendlyScript = () => {
      if (scriptLoadedRef.current || window.Calendly) {
        initializeWidget()
        return
      }

      const script = document.createElement("script")
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      script.onload = () => {
        scriptLoadedRef.current = true
        initializeWidget()
      }
      document.head.appendChild(script)
    }

    const initializeWidget = () => {
      if (!window.Calendly || !containerRef.current) return

      // Clear any existing content
      containerRef.current.innerHTML = ""

      const urlWithParams = new URL(url)

      urlWithParams.searchParams.set("embed_type", "Inline")
      urlWithParams.searchParams.set("embed_domain", window.location.hostname)

      if (hideEventTypeDetails) {
        urlWithParams.searchParams.set("hide_event_type_details", "1")
      }
      if (backgroundColor) {
        urlWithParams.searchParams.set("background_color", backgroundColor)
      }
      if (textColor) {
        urlWithParams.searchParams.set("text_color", textColor)
      }
      if (primaryColor) {
        urlWithParams.searchParams.set("primary_color", primaryColor)
      }

      window.Calendly.initInlineWidget({
        url: urlWithParams.toString(),
        parentElement: containerRef.current,
        prefill,
        utm,
      })

      // Set up event listeners if callbacks are provided
      if (onLoad || onEventScheduled) {
        window.addEventListener("message", handleCalendlyEvents)
      }

      if (onLoad) {
        onLoad()
      }
    }

    const handleCalendlyEvents = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com") return

      if (event.data.event === "calendly.event_scheduled" && onEventScheduled) {
        onEventScheduled(event.data)
      }
    }

    loadCalendlyScript()

    // Cleanup
    return () => {
      if (onLoad || onEventScheduled) {
        window.removeEventListener("message", handleCalendlyEvents)
      }
    }
  }, [url, prefill, utm, onLoad, onEventScheduled])

  const containerStyle: React.CSSProperties = {
    width,
    height,
    overflow: "hidden",
    colorScheme: "light",
  }

  return (
    <div
      ref={containerRef}
      className={`calendly-embed-container ${className}`.trim()}
      style={containerStyle}
      role="application"
      aria-label="Calendly scheduling widget"
    />
  )
}

export default CalendlyEmbed
