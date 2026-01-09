import React from "react"

const Sidebar = ({ activeItem = "Calendar", onItemClick }) => {
  const styles = {
    sidebar: {
      position: "fixed",
      left: 0,
      top: 0,
      width: "80px",
      height: "100vh",
      backgroundColor: "#fff",
      borderRight: "1px solid #eee",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "20px",
      paddingBottom: "20px",
      zIndex: 1000,
      boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)",
    },
    logo: {
      width: "40px",
      height: "40px",
      backgroundColor: "#22c55e",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "20px",
      marginBottom: "30px",
    },
    navItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px 8px",
      marginBottom: "8px",
      cursor: "pointer",
      borderRadius: "12px",
      width: "64px",
      transition: "background-color 0.2s",
    },
    navItemActive: {
      backgroundColor: "#3b82f6",
      color: "white",
    },
    icon: {
      width: "24px",
      height: "24px",
      marginBottom: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontSize: "11px",
      color: "#666",
      textAlign: "center",
    },
    labelActive: {
      color: "white",
      fontWeight: "600",
    },
    spacer: {
      flex: 1,
    },
  }

  const menuItems = [
    { id: "Dashboard", icon: DashboardIcon, label: "Dashboard" },
    { id: "Org", icon: OrgIcon, label: "Org." },
    { id: "Calendar", icon: CalendarIcon, label: "Calendar" },
    { id: "Parkings", icon: ParkingsIcon, label: "Parkings" },
    { id: "Recruit", icon: RecruitIcon, label: "Recruit" },
    { id: "Messages", icon: MessagesIcon, label: "Messages" },
  ]

  const bottomItems = [
    { id: "Help", icon: HelpIcon, label: "Help" },
    { id: "Settings", icon: SettingsIcon, label: "Settings" },
  ]

  const renderNavItem = (item) => {
    const isActive = activeItem === item.id
    const IconComponent = item.icon
    return (
      <div
        key={item.id}
        style={{
          ...styles.navItem,
          ...(isActive ? styles.navItemActive : {}),
        }}
        onClick={() => onItemClick && onItemClick(item.id)}
      >
        <div style={styles.icon}>
          <IconComponent isActive={isActive} />
        </div>
        <span style={{ ...styles.label, ...(isActive ? styles.labelActive : {}) }}>{item.label}</span>
      </div>
    )
  }

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>L</div>
      {menuItems.map(renderNavItem)}
      <div style={styles.spacer} />
      {bottomItems.map(renderNavItem)}
    </div>
  )
}

const DashboardIcon = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#fff" : "#666"} strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

const OrgIcon = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#fff" : "#666"} strokeWidth="1.5">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="12" y2="14" />
  </svg>
)

const CalendarIcon = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#fff" : "#666"} strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    {isActive && <rect x="7" y="14" width="4" height="4" rx="1" fill="#fff" stroke="none" />}
  </svg>
)

const ParkingsIcon = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#fff" : "#666"} strokeWidth="1.5">
    <path d="M5 17h14M6 9l2-4h8l2 4M4 17V9h16v8" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
)

const RecruitIcon = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#fff" : "#666"} strokeWidth="1.5">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
)

const MessagesIcon = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#fff" : "#666"} strokeWidth="1.5">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)

const HelpIcon = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#fff" : "#666"} strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const SettingsIcon = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#fff" : "#666"} strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
  </svg>
)

export default Sidebar
