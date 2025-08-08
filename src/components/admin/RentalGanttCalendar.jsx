import React, { useState, useMemo } from 'react'
import Timeline from 'react-calendar-timeline'
import { 
  startOfMonth, 
  endOfMonth, 
  format, 
  parseISO, 
  subMonths, 
  addMonths,
  setDefaultOptions
} from 'date-fns'
import { es } from 'date-fns/locale'
import styles from '../../styles/admin/RentalGanttCalendar.module.css'

// Configurar date-fns en español
setDefaultOptions({ locale: es })

const RentalGanttCalendar = ({ cars = [], rentals = [] }) => {
  const [selectedTime, setSelectedTime] = useState({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date())
  })

  const hideTooltip = () => {
    const tooltip = document.getElementById('gantt-tooltip')
    if (tooltip) {
      tooltip.style.display = 'none'
    }
  }

  // Manejar cambio de tiempo visible
  const handleTimeChange = (visibleTimeStart, visibleTimeEnd) => {
    setSelectedTime({
      start: new Date(visibleTimeStart),
      end: new Date(visibleTimeEnd)
    })
  }
  
  // Transformar datos para react-calendar-timeline
  const { groups, items } = useMemo(() => {
    if (!cars.length) {
      return { groups: [], items: [] }
    }

    // Crear grupos (autos)
    const timelineGroups = cars.map(car => ({
      id: car.id,
      title: car.name,
      rightTitle: car.model || '',
      stackItems: true
    }))

    // Crear items (alquileres)
    const timelineItems = rentals
      .filter(rental => cars.some(car => car.id === rental.carId))
      .map(rental => {
        const startDate = parseISO(rental.start)
        const endDate = parseISO(rental.end)
        
        return {
          id: rental.id,
          group: rental.carId,
          title: rental.clientName,
          start_time: startDate.getTime(),
          end_time: endDate.getTime(),
          itemProps: {
            className: styles.rentalBlock,
            'data-custom-attribute': 'rental-item',
            onMouseEnter: (e) => showTooltip(e, rental),
            onMouseLeave: hideTooltip
          },
          rental: rental // Datos adicionales para el tooltip
        }
      })

    return { groups: timelineGroups, items: timelineItems }
  }, [cars, rentals])

  // Funciones para tooltip
  const showTooltip = (e, rental) => {
    const tooltip = document.getElementById('gantt-tooltip')
    if (tooltip) {
      const startDate = format(parseISO(rental.start), 'dd MMM yyyy', { locale: es })
      const endDate = format(parseISO(rental.end), 'dd MMM yyyy', { locale: es })
      
      tooltip.innerHTML = `
        <div class="${styles.tooltipContent}">
          <h4>${rental.clientName}</h4>
          <p><strong>Inicio:</strong> ${startDate}</p>
          <p><strong>Fin:</strong> ${endDate}</p>
          <p><strong>Total:</strong> $${rental.totalPrice?.toLocaleString() || 'N/A'}</p>
        </div>
      `
      
      tooltip.style.display = 'block'
      tooltip.style.left = e.pageX + 10 + 'px'
      tooltip.style.top = e.pageY - 10 + 'px'
    }
  }

  

  // Si no hay datos
  if (!cars.length || !rentals.length) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📅</div>
        <h3>No hay datos disponibles para mostrar el calendario</h3>
        <p>Agrega autos y reservas para ver el calendario Gantt</p>
      </div>
    )
  }

  return (
    <div className={styles.ganttContainer}>
      <div className={styles.header}>
        <h2>Calendar de Alquileres</h2>
        <div className={styles.controls}>
          <button 
            className={styles.navButton}
            onClick={() => {
              const newStart = startOfMonth(subMonths(selectedTime.start, 1))
              const newEnd = endOfMonth(subMonths(selectedTime.end, 1))
              setSelectedTime({ start: newStart, end: newEnd })
            }}
          >
            ← Mes Anterior
          </button>
          <span className={styles.currentMonth}>
            {format(selectedTime.start, 'MMMM yyyy', { locale: es })}
          </span>
          <button 
            className={styles.navButton}
            onClick={() => {
              const newStart = startOfMonth(addMonths(selectedTime.start, 1))
              const newEnd = endOfMonth(addMonths(selectedTime.end, 1))
              setSelectedTime({ start: newStart, end: newEnd })
            }}
          >
            Mes Siguiente →
          </button>
        </div>
      </div>

      <div className={styles.timelineWrapper}>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={selectedTime.start.getTime()}
          defaultTimeEnd={selectedTime.end.getTime()}
          visibleTimeStart={selectedTime.start.getTime()}
          visibleTimeEnd={selectedTime.end.getTime()}
          onTimeChange={handleTimeChange}
          canMove={false}
          canResize={false}
          canSelect={false}
          stackItems={true}
          itemHeightRatio={0.8}
          lineHeight={60}
          sidebarWidth={200}
          rightSidebarWidth={0}
          dragSnap={24 * 60 * 60 * 1000} // 1 día
          minZoom={24 * 60 * 60 * 1000} // 1 día
          maxZoom={365 * 24 * 60 * 60 * 1000} // 1 año
          buffer={1}
          traditionalZoom={true}
        />
      </div>

      {/* Tooltip flotante */}
      <div id="gantt-tooltip" className={styles.tooltip}></div>
    </div>
  )
}

export default RentalGanttCalendar
