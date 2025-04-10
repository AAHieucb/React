import useMousePosition from './useMousePosition'

// safe triangle
export const SafeArea = ({ anchor, submenu }) => {
  const { x: mouseX, y: mouseY } = useMousePosition()

  const {
    width: anchorWidth,
    height: anchorHeight,
    x: anchorX,
    y: anchorY,
  } = anchor.getBoundingClientRect()
  const {
    width: submenuWidth,
    height: submenuHeight,
    x: submenuX,
    y: submenuY,
  } = submenu.getBoundingClientRect()

  const svgWidth = submenuX - mouseX + 4
  const svgHeight = submenuHeight

  return (
    <svg
      style={{
        position: 'fixed',
        width: svgWidth,
        height: submenuHeight,
        pointerEvents: 'none',
        zIndex: 2,
        top: submenuY,
        left: mouseX - 2,
      }}
      id="svg-safe-area"
    >
      {/* Unsafe Area - only defined for debug visualisation */}
      <path
        pointerEvents="none"
        width="100%"
        height="100%"
        // Cho màu trong suốt là được
        fill="rgba(187,39,38,0.05)"
        d={`M 0,0 L ${svgWidth},0 L ${svgWidth},${svgHeight} L 0,${svgHeight} z`}
      />
      {/* Safe Area */}
      <path
        pointerEvents="auto"
        stroke="red"
        strokeWidth="0.4"
        fill="rgba(114,140,89,0.3)"
        // prettier-ignore
        d={`M 0, ${mouseY-submenuY} 
            L ${svgWidth},${svgHeight}  
            L ${svgWidth},0 z`}
      ></path>
    </svg>
  )
}
