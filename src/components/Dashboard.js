import React, { useState, useEffect } from "react";

const AttendanceDashboard = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 56, seconds: 44 });
  const [checkinTime, setCheckinTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [isPresent, setIsPresent] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(timer);
      clearInterval(clockTimer);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isPresent && !isCheckedOut) {
      interval = setInterval(() => {
        setCheckinTime((prev) => {
          let { hours, minutes, seconds } = prev;
          seconds++;
          if (seconds === 60) {
            seconds = 0;
            minutes++;
          }
          if (minutes === 60) {
            minutes = 0;
            hours++;
          }
          return { hours, minutes, seconds };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPresent, isCheckedOut]);

  const handleAttendance = () => {
    if (!isPresent) {
      setIsPresent(true);
      setCheckinTime({ hours: 0, minutes: 0, seconds: 0 });
    } else {
      setIsCheckedOut(true);
    }
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1200;

  const styles = {
    container: {
      backgroundColor: "#f5f7fa",
      minHeight: "100vh",
      padding: isMobile ? "16px" : "24px",
      paddingTop: isMobile ? "80px" : "100px",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "24px",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "16px" : "0",
    },
    greeting: {
      fontSize: "28px",
      fontWeight: "600",
      color: "#1a1a2e",
      margin: "0 0 4px 0",
    },
    subtitle: {
      fontSize: "14px",
      color: "#666",
      margin: 0,
    },
    timeBox: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      backgroundColor: "#fff",
      padding: "12px 16px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      width: isMobile ? "100%" : "auto",
      justifyContent: isMobile ? "space-between" : "flex-start",
    },
    timeLabel: {
      fontSize: "12px",
      color: "#888",
      margin: 0,
    },
    timeValue: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#1a1a2e",
      margin: 0,
    },
    clockIcon: {
      width: "36px",
      height: "36px",
      border: "2px solid #1a1a2e",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "1fr 1fr"
        : "1fr 1fr 1fr 1.2fr",
      gap: "20px",
      marginBottom: "24px",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    },
    todayCard: {
      backgroundColor: "#fff",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#1a1a2e",
      margin: 0,
    },
    badge: {
      backgroundColor: "red",
      color: "#fff",
      padding: "4px 12px",
      borderRadius: "16px",
      fontSize: "12px",
      fontWeight: "500",
    },
    todayContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "20px" : "0",
      textAlign: isMobile ? "center" : "left",
    },
    fingerprintIcon: {
      width: "36px",
      height: "36px",
      border: "2px solid #ddd",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "12px",
      color: "#3b82f6",
      fontSize: "16px",
    },
    message: {
      fontSize: "13px",
      color: "#666",
      marginBottom: "12px",
      lineHeight: "1.5",
    },
    timeLeftContainer: {
      display: "flex",
      alignItems: "center",
      fontSize: "13px",
      color: "#333",
      marginBottom: "16px",
      justifyContent: isMobile ? "center" : "flex-start",
    },
    timeBorder: {
      width: "3px",
      height: "18px",
      backgroundColor: "#E53935",
      marginRight: "8px",
      borderRadius: "2px",
    },
    timeLeftValue: {
      color: "#22c55e",
      fontWeight: "600",
    },
    markButton: {
      width: "100%",
      backgroundColor: "#3b82f6",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      padding: "12px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "auto",
    },
    progressContainer: {
      position: "relative",
      width: "100px",
      height: "100px",
    },
    progressText: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    },
    percentageText: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#333",
      display: "block",
    },
    inOfficeText: {
      fontSize: "10px",
      color: "#888",
    },
    poorText: {
      fontSize: "11px",
      color: "#FFC107",
      fontWeight: "600",
    },
    statsCard: {
      backgroundColor: "#fff",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    statsIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "12px",
      fontSize: "18px",
    },
    statsLabel: {
      fontSize: "13px",
      color: "#888",
      margin: "0 0 4px 0",
    },
    statsValue: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#1a1a2e",
      margin: 0,
    },
    statsValueGreen: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#22c55e",
      margin: 0,
    },
    attendanceCard: {
      backgroundColor: "#fff",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    },
    viewStats: {
      color: "#3b82f6",
      fontSize: "13px",
      fontWeight: "500",
      cursor: "pointer",
      background: "none",
      border: "none",
    },
    attendanceContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: isMobile ? "column-reverse" : "row",
      gap: isMobile ? "24px" : "0",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "8px",
      fontSize: "13px",
      color: "#555",
    },
    legendDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
    },
    donutContainer: {
      position: "relative",
      width: "120px",
      height: "120px",
    },
    donutText: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    },
    donutValue: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#1a1a2e",
      display: "block",
    },
    donutSubtext: {
      fontSize: "11px",
      color: "#888",
    },
    betterThan: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginTop: "55px",
      textAlign: "justify",
      textAlignLast: "center",
      fontSize: "12px",
      color: "#555",
    },
    checkIcon: {
      color: "#22c55e",
      fontSize: "16px",
    },
    bottomGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "20px",
    },
    tableCard: {
      backgroundColor: "#fff",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    },
    tableHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
    },
    legend: {
      display: "flex",
      gap: "16px",
      flexWrap: "wrap",
      marginBottom: "16px",
    },
    legendSmall: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      fontSize: "11px",
      color: "#666",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      textAlign: "left",
      padding: "10px 8px",
      fontSize: "12px",
      color: "#888",
      fontWeight: "500",
      borderBottom: "1px solid #eee",
    },
    td: {
      padding: "12px 8px",
      fontSize: "13px",
      color: "#333",
      borderBottom: "1px solid #f5f5f5",
    },
    memberCell: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    avatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      backgroundColor: "#e0e0e0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      color: "#666",
    },
    memberName: {
      fontWeight: "500",
      color: "#1a1a2e",
      margin: 0,
      fontSize: "13px",
    },
    memberRole: {
      fontSize: "11px",
      color: "#888",
      margin: 0,
    },
    statusDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      display: "inline-block",
      marginRight: "6px",
    },
    select: {
      padding: "6px 12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "13px",
      color: "#333",
      backgroundColor: "#fff",
      cursor: "pointer",
    },
    progressRing: {
      width: "28px",
      height: "28px",
    },
    horizontalLine: {
      borderTop: "1px solid #e5e7eb",
      margin: "16px 0",
      width: "100%",
    },
  };

  const CircularProgress = ({
    percentage,
    size = 100,
    strokeWidth = 8,
    color = "#FFC107",
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#eee"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  const DonutChart = () => {
    const data = [
      { value: 1031, color: "#22c55e" },
      { value: 191, color: "#FFC107" },
      { value: 212, color: "#ef4444" },
      { value: 66, color: "#9ca3af" },
    ];
    const total = data.reduce((acc, item) => acc + item.value, 0);
    const size = 120;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    let cumulativePercentage = 0;

    return (
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const strokeDasharray = `${
            (percentage / 100) * circumference
          } ${circumference}`;
          const strokeDashoffset =
            -(cumulativePercentage / 100) * circumference;
          cumulativePercentage += percentage;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={item.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
            />
          );
        })}
      </svg>
    );
  };

  const SmallProgressRing = ({ percentage, color }) => {
    const size = 28;
    const strokeWidth = 3;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#eee"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  const teamMembers = [
    {
      name: "Alena Gouse",
      role: "UI Designer - UID1",
      today: { time: "11:56 AM", status: "office" },
      day1: { time: "12:45 AM", status: "office" },
      day2: { time: "10:44 AM", status: "office" },
      day3: { status: "weekend" },
    },
    {
      name: "Miracle Vetrovs",
      role: "UX Designer - UXD2",
      today: { time: "-", status: "absent" },
      day1: { time: "10:33 AM", status: "office" },
      day2: { status: "leave" },
      day3: { status: "weekend" },
    },
    {
      name: "Avery Arwood",
      role: "UI Designer - UID2",
      today: { status: "wfh" },
      day1: { time: "10:21 AM", status: "office" },
      day2: { status: "wfh" },
      day3: { status: "weekend" },
    },
    {
      name: "John Erkwood",
      role: "Developer - DEV1",
      today: { time: "09:30 AM", status: "office" },
      day1: { time: "09:15 AM", status: "office" },
      day2: { time: "09:45 AM", status: "office" },
      day3: { status: "weekend" },
    },
  ];

  const workingHistory = [
    {
      date: "Today",
      day: 26,
      arrival: "11:19 AM",
      departure: "- Still in office -",
      hours: "6:27 hours",
      target: "9 hours",
      progress: 72,
      color: "#FFC107",
    },
    {
      date: "25/9/23",
      day: 25,
      arrival: "11:56 AM",
      departure: "6:01 PM",
      hours: "6:05 hours",
      target: "9 hours",
      progress: 67,
      color: "#FFC107",
    },
    {
      date: "24/9/23",
      day: 24,
      arrival: "10:11 AM",
      departure: "8:53 PM",
      hours: "10:42 hours",
      target: "9 hours",
      progress: 100,
      color: "#22c55e",
    },
    {
      date: "23/9/23",
      day: 23,
      arrival: "12:45 AM",
      departure: "4:03 PM",
      hours: "3:18 hours",
      target: "9 hours",
      progress: 36,
      color: "#ef4444",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "office":
        return "#3b82f6";
      case "wfh":
        return "#FFC107";
      case "leave":
        return "#ef4444";
      case "absent":
        return "#9ca3af";
      case "weekend":
        return "#d1d5db";
      default:
        return "#9ca3af";
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>Good afternoon, Sourav!</h1>
          <p style={styles.subtitle}>You have 2 leave request pending.</p>
        </div>
        <div style={styles.timeBox}>
          <div>
            <p style={styles.timeLabel}>Current time</p>
            <p style={styles.timeValue}>
              {currentTime.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              ,{" "}
              {currentTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
          <div style={styles.clockIcon}>🕐</div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={styles.grid}>
        {/* Today Card */}
        <div style={styles.todayCard}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Today</h3>
            {isPresent ? (
              <span
                style={{
                  ...styles.badge,
                  backgroundColor: isCheckedOut ? "#FFC107" : "#22c55e",
                }}
              >
                {isCheckedOut ? "Checked Out" : "Present"}
              </span>
            ) : (
              <span style={styles.badge}>Absent</span>
            )}
          </div>
          <div style={styles.horizontalLine} />
          <div style={styles.todayContent}>
            <div>
              {/* <div style={styles.fingerprintIcon}>👆</div> */}
              {isPresent ? (
                <>
                  <p style={styles.message}>
                    {isCheckedOut
                      ? "You have checked out!"
                      : "You are marked present!"}
                    <br />
                    Work duration:
                  </p>
                  <div style={styles.timeLeftContainer}>
                    <div
                      style={{
                        ...styles.timeBorder,
                        backgroundColor: "#22c55e",
                      }}
                    ></div>
                    <span>
                      Duration :{" "}
                      <span style={styles.timeLeftValue}>
                        {String(checkinTime.hours).padStart(2, "0")}h{" "}
                        {String(checkinTime.minutes).padStart(2, "0")}m{" "}
                        {String(checkinTime.seconds).padStart(2, "0")}s
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <p style={styles.message}>
                    You have not marked
                    <br />
                    yourself as present today!
                  </p>
                  <div style={styles.timeLeftContainer}>
                    <div style={styles.timeBorder}></div>
                    <span>
                      Time left :{" "}
                      <span style={styles.timeLeftValue}>
                        {timeLeft.minutes}m {timeLeft.seconds}s
                      </span>
                    </span>
                  </div>
                </>
              )}
            </div>
            <div style={styles.progressContainer}>
              <CircularProgress percentage={67} />
              <div style={styles.progressText}>
                <span style={styles.percentageText}>67%</span>
                <span style={styles.inOfficeText}>in office</span>
                <br />
                <span style={styles.poorText}>POOR</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleAttendance}
            style={{
              ...styles.markButton,
              backgroundColor: isCheckedOut ? "#9ca3af" : "#3b82f6",
              cursor: isCheckedOut ? "not-allowed" : "pointer",
            }}
            disabled={isCheckedOut}
          >
            {!isPresent
              ? "Mark Present"
              : !isCheckedOut
              ? "Check Out"
              : "Checked Out"}
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={styles.statsCard}>
            <div
              style={{
                ...styles.statsIcon,
                border: "2px solid #ddd",
                color: "#666",
              }}
            >
              ⏱
            </div>
            <p style={styles.statsLabel}>Average hours</p>
            <p style={styles.statsValue}>7h 17mins</p>
          </div>
          <div style={styles.statsCard}>
            <div
              style={{
                ...styles.statsIcon,
                border: "2px solid #ddd",
                color: "#666",
              }}
            >
              ⏰
            </div>
            <p style={styles.statsLabel}>On-time arrival</p>
            <p style={styles.statsValueGreen}>98.56 %</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={styles.statsCard}>
            <div
              style={{
                ...styles.statsIcon,
                border: "2px solid #ddd",
                color: "#666",
              }}
            >
              →
            </div>
            <p style={styles.statsLabel}>Average check-in</p>
            <p style={styles.statsValue}>10:33 AM</p>
            <p style={styles.statsValue}>{}</p>
          </div>
          <div style={styles.statsCard}>
            <div
              style={{
                ...styles.statsIcon,
                border: "2px solid #ddd",
                color: "#666",
              }}
            >
              ←
            </div>
            <p style={styles.statsLabel}>Average check-out</p>
            <p style={styles.statsValue}>19:12 PM</p>
          </div>
        </div>

        {/* My Attendance Card */}
        <div style={styles.attendanceCard}>
          <div style={styles.tableHeader}>
            <h3 style={styles.cardTitle}>My Attendance</h3>
            <button style={styles.viewStats}>View Stats</button>
          </div>
          <div style={styles.horizontalLine} />
          <div style={styles.attendanceContent}>
            <div>
              <div style={styles.legendItem}>
                <span
                  style={{ ...styles.legendDot, backgroundColor: "#22c55e" }}
                ></span>
                <span>
                  <strong>1,031</strong> on time
                </span>
              </div>
              <div style={styles.legendItem}>
                <span
                  style={{ ...styles.legendDot, backgroundColor: "#FFC107" }}
                ></span>
                <span>
                  <strong>191</strong> Work from home
                </span>
              </div>
              <div style={styles.legendItem}>
                <span
                  style={{ ...styles.legendDot, backgroundColor: "#ef4444" }}
                ></span>
                <span>
                  <strong>212</strong> late attendance
                </span>
              </div>
              <div style={styles.legendItem}>
                <span
                  style={{ ...styles.legendDot, backgroundColor: "#9ca3af" }}
                ></span>
                <span>
                  <strong>66</strong> absent
                </span>
              </div>
              <div style={styles.betterThan}>
                <span style={styles.checkIcon}>✓</span>
                <span>
                  Better than <strong>91.3%</strong> employees!
                </span>
              </div>
            </div>
            <div style={styles.donutContainer}>
              <DonutChart />
              <div style={styles.donutText}>
                <span style={styles.donutValue}>1,434</span>
                <span style={styles.donutSubtext}>/1500</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div style={styles.bottomGrid}>
        {/* My Team */}
        <div style={styles.tableCard}>
          <h3 style={styles.cardTitle}>My Team</h3>
          <div style={styles.legend}>
            <div style={styles.legendSmall}>
              <span
                style={{ ...styles.legendDot, backgroundColor: "#3b82f6" }}
              ></span>
              in office
            </div>
            <div style={styles.legendSmall}>
              <span
                style={{ ...styles.legendDot, backgroundColor: "#FFC107" }}
              ></span>
              work from home
            </div>
            <div style={styles.legendSmall}>
              <span
                style={{ ...styles.legendDot, backgroundColor: "#ef4444" }}
              ></span>
              on leave
            </div>
            <div style={styles.legendSmall}>
              <span
                style={{ ...styles.legendDot, backgroundColor: "#9ca3af" }}
              ></span>
              absent
            </div>
            <div style={styles.legendSmall}>
              <span
                style={{ ...styles.legendDot, backgroundColor: "#d1d5db" }}
              ></span>
              holiday
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Members</th>
                  <th style={styles.th}>Today</th>
                  <th style={styles.th}>25/9</th>
                  <th style={styles.th}>24/9</th>
                  <th style={styles.th}>23/9</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member, index) => (
                  <tr key={index}>
                    <td style={styles.td}>
                      <div style={styles.memberCell}>
                        <div style={styles.avatar}>{member.name.charAt(0)}</div>
                        <div>
                          <p style={styles.memberName}>{member.name}</p>
                          <p style={styles.memberRole}>{member.role}</p>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusDot,
                          backgroundColor: getStatusColor(member.today.status),
                        }}
                      ></span>
                      {member.today.time || member.today.status}
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusDot,
                          backgroundColor: getStatusColor(member.day1.status),
                        }}
                      ></span>
                      {member.day1.time || member.day1.status}
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusDot,
                          backgroundColor: getStatusColor(member.day2.status),
                        }}
                      ></span>
                      {member.day2.time || member.day2.status}
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusDot,
                          backgroundColor: getStatusColor(member.day3.status),
                        }}
                      ></span>
                      {member.day3.time || member.day3.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Working History */}
        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <h3 style={styles.cardTitle}>Working History</h3>
            <select style={styles.select}>
              <option>Show all</option>
            </select>
          </div>
          <div style={styles.legend}>
            <div style={styles.legendSmall}>
              <span
                style={{ ...styles.legendDot, backgroundColor: "#22c55e" }}
              ></span>
              meeting criteria
            </div>
            <div style={styles.legendSmall}>
              <span
                style={{ ...styles.legendDot, backgroundColor: "#FFC107" }}
              ></span>
              criteria unmet
            </div>
            <div style={styles.legendSmall}>
              <span
                style={{ ...styles.legendDot, backgroundColor: "#ef4444" }}
              ></span>
              action needed
            </div>
            <div style={styles.legendSmall}>
              <span
                style={{ ...styles.legendDot, backgroundColor: "#f97316" }}
              ></span>
              overtime
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Arrival</th>
                  <th style={styles.th}>Departure</th>
                  <th style={styles.th}>Effective time</th>
                </tr>
              </thead>
              <tbody>
                {workingHistory.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>
                      <span style={{ color: "#888", marginRight: "8px" }}>
                        {item.day}
                      </span>
                      <span
                        style={{
                          color: item.date === "Today" ? "#3b82f6" : "#333",
                          fontWeight: item.date === "Today" ? "500" : "normal",
                        }}
                      >
                        {item.date}
                      </span>
                    </td>
                    <td style={styles.td}>{item.arrival}</td>
                    <td style={{ ...styles.td, color: "#888" }}>
                      {item.departure}
                    </td>
                    <td style={styles.td}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: "500" }}>{item.hours}</div>
                          <div style={{ fontSize: "11px", color: "#888" }}>
                            / {item.target}
                          </div>
                        </div>
                        <SmallProgressRing
                          percentage={item.progress}
                          color={item.color}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
