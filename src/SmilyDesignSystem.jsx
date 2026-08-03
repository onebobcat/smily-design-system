import { useState } from "react";

// ─── SMILY DESIGN TOKENS ─────────────────────────────────────────────────────

const tokens = {
  colors: {
    // Brand
    primary: "#1DC8CA",
    primaryGradient: "linear-gradient(82.58deg, #04969D 15.234%, #1DC8CA 241.16%)",
    secondary: "#FF27D7",

    // Status
    success: "#3DB559",
    error: "#E74C3C",
    warning: "#FD8B07",
    info: "#199BD9",

    // Gray scale
    gray50:  "#f6f7f9",
    gray100: "#ecedf2",
    gray200: "#d4d8e3",
    gray300: "#aeb6cb",
    gray400: "#828fae",
    gray500: "#627093",
    gray600: "#4e5a7b",
    gray700: "#404964",
    gray800: "#383f54",
    gray900: "#323748",
    gray950: "#212430",

    // Text
    headingColor: "#152536",
    bodyColor:    "#6B7176",
    dark:         "#343A40",
    white:        "#FFFFFF",
  },
  fonts: {
    // Figma DS: Sofia Pro — web prototype substitute: Mulish
    heading: "'Mulish', sans-serif",
    body:    "'Open Sans', sans-serif",
  },
  radii: {
    xs:   "2.5px",
    sm:   "5px",
    md:   "10px",
    lg:   "20px",
    xl:   "40px",
    pill: "1000px",
  },
  spacing: {
    0: "0px",
    1: "2px",
    2: "4px",
    3: "8px",
    4: "12px",
    5: "16px",
    6: "20px",
    7: "24px",
    8: "32px",
  },
  shadows: {
    card:       "0px 2px 9px rgba(98, 112, 147, 0.14)",
    cardStrong: "2px 4px 20px rgba(0, 0, 0, 0.10)",
    cardWide:   "0px 4px 40px rgba(0, 0, 0, 0.10)",
    inner:      "inset -1px 0px 12px rgba(0, 0, 0, 0.04)",
  },
};

// ─── BUTTON COMPONENTS ───────────────────────────────────────────────────────

function ButtonSolid({ children = "Button", size = "M", disabled = false, loading = false, leadingIcon, trailingIcon, onClick, className = "" }) {
  const sizeStyles = size === "S"
    ? { padding: "8px 12px", fontSize: "13px", height: "37px" }
    : { padding: "12px 16px", fontSize: "14px", height: "45px" };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        borderRadius: tokens.radii.md,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: tokens.fonts.body,
        fontWeight: 600,
        lineHeight: 1.5,
        color: tokens.colors.white,
        background: disabled ? tokens.colors.gray300 : tokens.tokens?.primaryGradient || "linear-gradient(82.58deg, #08767D 15.234%, #1DC8CA 241.16%)",
        transition: "opacity 0.15s, filter 0.15s",
        minWidth: "72px",
        ...sizeStyles,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.filter = "brightness(0.92)"; }}
      onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
    >
      {leadingIcon && <span style={{ display: "flex", alignItems: "center" }}>{leadingIcon}</span>}
      {loading ? <span style={{ display: "flex", gap: "3px", alignItems: "center" }}>
        {[0,1,2].map(i => (
          <span key={i} style={{
            width: 5, height: 5, borderRadius: "50%", background: "white",
            animation: `bounce 0.9s ${i * 0.2}s infinite`,
          }} />
        ))}
      </span> : children}
      {trailingIcon && <span style={{ display: "flex", alignItems: "center" }}>{trailingIcon}</span>}
    </button>
  );
}

function ButtonOutline({ children = "Button", size = "M", disabled = false, onClick, className = "" }) {
  const sizeStyles = size === "S"
    ? { padding: "8px 12px", fontSize: "13px", height: "37px" }
    : { padding: "12px 16px", fontSize: "14px", height: "45px" };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        borderRadius: tokens.radii.md,
        border: `1px solid ${disabled ? tokens.colors.gray200 : tokens.colors.gray300}`,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: tokens.fonts.body,
        fontWeight: 600,
        lineHeight: 1.5,
        color: disabled ? tokens.colors.gray300 : tokens.colors.gray500,
        background: tokens.colors.white,
        transition: "border-color 0.15s, background 0.15s",
        minWidth: "72px",
        ...sizeStyles,
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.borderColor = tokens.colors.gray500; e.currentTarget.style.background = tokens.colors.gray50; }}}
      onMouseLeave={e => { e.currentTarget.style.borderColor = tokens.colors.gray300; e.currentTarget.style.background = tokens.colors.white; }}
    >
      {children}
    </button>
  );
}

function ButtonTonal({ children = "Button", size = "M", disabled = false, onClick, className = "" }) {
  const sizeStyles = size === "S"
    ? { padding: "8px 12px", fontSize: "13px", height: "37px" }
    : { padding: "12px 16px", fontSize: "14px", height: "45px" };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        borderRadius: tokens.radii.md,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: tokens.fonts.body,
        fontWeight: 600,
        lineHeight: 1.5,
        color: disabled ? tokens.colors.gray400 : tokens.colors.primary,
        background: disabled ? tokens.colors.gray100 : "rgba(29, 200, 202, 0.12)",
        transition: "background 0.15s",
        minWidth: "72px",
        ...sizeStyles,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "rgba(29, 200, 202, 0.2)"; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = "rgba(29, 200, 202, 0.12)"; }}
    >
      {children}
    </button>
  );
}

function ButtonText({ children = "Button", size = "M", disabled = false, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        borderRadius: tokens.radii.md,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: tokens.fonts.body,
        fontWeight: 600,
        fontSize: size === "S" ? "13px" : "14px",
        lineHeight: 1.5,
        color: disabled ? tokens.colors.gray300 : tokens.colors.primary,
        background: "transparent",
        padding: size === "S" ? "8px 4px" : "12px 4px",
        minWidth: "unset",
        textDecoration: "none",
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.textDecoration = "underline"; }}
      onMouseLeave={e => { e.currentTarget.style.textDecoration = "none"; }}
    >
      {children}
    </button>
  );
}

// ─── INPUT FIELD ─────────────────────────────────────────────────────────────

function InputField({
  label,
  placeholder = "Search",
  helperText,
  state = "default", // default | focused | error | disabled
  value,
  onChange,
  maxLength,
  type = "text",
}) {
  const [focused, setFocused] = useState(false);
  const isError = state === "error";
  const isDisabled = state === "disabled";
  const isFocused = focused && !isDisabled;

  const borderColor = isError
    ? tokens.colors.error
    : isFocused
    ? tokens.colors.primary
    : tokens.colors.gray400;

  const borderWidth = isError || isFocused ? "1.5px" : "1px";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "72px", width: "100%" }}>
      {label && (
        <div style={{ display: "flex", alignItems: "center", gap: "2px", paddingBottom: "4px" }}>
          <label style={{
            fontFamily: tokens.fonts.body,
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: tokens.colors.gray600,
          }}>{label}</label>
        </div>
      )}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        height: "45px",
        padding: "12px 8px",
        borderRadius: tokens.radii.sm,
        border: `${borderWidth} solid ${borderColor}`,
        background: isDisabled ? tokens.colors.gray100 : tokens.colors.gray50,
        transition: "border-color 0.15s",
        boxSizing: "border-box",
      }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            fontFamily: tokens.fonts.body,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: isDisabled ? tokens.colors.gray400 : tokens.colors.gray700,
            outline: "none",
            width: "100%",
          }}
        />
      </div>
      {(helperText || maxLength) && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: tokens.fonts.body,
          fontSize: "12px",
          lineHeight: 1.5,
        }}>
          {helperText && (
            <span style={{ color: isError ? "#d53d2d" : tokens.colors.gray600 }}>{helperText}</span>
          )}
          {maxLength && value !== undefined && (
            <span style={{ color: tokens.colors.gray400, marginLeft: "auto" }}>{value.length}/{maxLength}</span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── COLOR SWATCH ────────────────────────────────────────────────────────────

function Swatch({ name, hex, large = false }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "4px", cursor: "pointer" }}
      onClick={() => { navigator.clipboard?.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      title={`Copy ${hex}`}
    >
      <div style={{
        width: large ? 80 : 56,
        height: large ? 48 : 36,
        borderRadius: "6px",
        background: hex,
        border: hex === "#FFFFFF" || hex === "#f6f7f9" ? "1px solid #e3e4e7" : "none",
        transition: "transform 0.1s",
      }} />
      <div style={{ fontFamily: tokens.fonts.body, fontSize: "10px", color: tokens.colors.gray600, lineHeight: 1.3 }}>
        <div style={{ fontWeight: 600, color: tokens.colors.headingColor }}>{copied ? "Copied!" : name}</div>
        <div>{hex}</div>
      </div>
    </div>
  );
}

// ─── SECTION ─────────────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h2 style={{
        fontFamily: tokens.fonts.heading,
        fontSize: "16px",
        fontWeight: 700,
        color: tokens.colors.headingColor,
        marginBottom: "12px",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        borderBottom: `2px solid ${tokens.colors.gray100}`,
        paddingBottom: "6px",
      }}>{title}</h2>
      {children}
    </div>
  );
}

// ─── SVG ICON ────────────────────────────────────────────────────────────────

function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.5, style }) {
  const paths = {
    close: "M18 6L6 18M6 6l12 12",
    trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
    info: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-14v4m0 4h.01",
    check: "M20 6L9 17l-5-5",
    alert: "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
    dashboard: "M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 14a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm10-3a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z",
    inbox: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 8h4l2 3h4l2-3h4",
    tasks: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
    calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
    bookings: "M2 7h20M2 12h20M2 17h10M16 17l2 2 4-4",
    guests: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm8 4a4 4 0 10.001-8.001A4 4 0 0017 15z",
    rentals: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
    rates: "M2 9a2 2 0 012-2h16a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9zm18-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v2",
    discounts: "M9 14l6-6M9.5 9a.5.5 0 100-1 .5.5 0 000 1zm5 5a.5.5 0 100-1 .5.5 0 000 1zM21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
    inquiries: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z",
    reviews: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    performance: "M18 20V10M12 20V4M6 20v-6",
    finance: "M12 2a10 10 0 100 20A10 10 0 0012 2zm1 6H9m4 4H9m2 4H9",
    apps: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    whats_new: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    help: "M12 22a10 10 0 100-20 10 10 0 000 20zm0-14a2 2 0 012 2c0 1.5-2 2-2 3m0 4h.01",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
    chevron_down: "M6 9l6 6 6-6",
    chevron_right: "M9 18l6-6-6-6",
    chevron_left: "M15 18l-6-6 6-6",
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
    language: "M12 22a10 10 0 100-20 10 10 0 000 20zm0 0c-2.5 0-4-4.5-4-10S9.5 2 12 2s4 4.5 4 10-1.5 10-4 10zM2 12h20",
    filter: "M3 4h18l-7 9v7l-4 2v-9L3 4z",
    plus: "M12 5v14M5 12h14",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>
      <path d={paths[name] || ""} />
    </svg>
  );
}

// ─── DIALOG COMPONENTS ───────────────────────────────────────────────────────

function DialogModal({ children, onClose }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(53, 64, 82, 0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      {children}
    </div>
  );
}

function Dialog({ variant = "default", title, body, onClose, onConfirm, onCancel, confirmLabel = "Confirm", cancelLabel = "Cancel" }) {
  const isDelete = variant === "delete";
  const isSuccess = variant === "success";

  const iconBg = isDelete ? "#fef3f2" : "#effefc";
  const iconColor = isDelete ? tokens.colors.error : tokens.colors.primary;
  const iconName = isDelete ? "trash" : "language";

  return (
    <div style={{
      background: "white",
      borderRadius: tokens.radii.lg,
      boxShadow: "2px 4px 20px rgba(0,0,0,0.1)",
      width: 500,
      maxWidth: "calc(100vw - 32px)",
      maxHeight: "90vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}>
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 8, right: 8,
          background: "none", border: "none", cursor: "pointer",
          width: 36, height: 36, borderRadius: tokens.radii.md,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: tokens.colors.gray400,
        }}
        onMouseEnter={e => e.currentTarget.style.background = tokens.colors.gray50}
        onMouseLeave={e => e.currentTarget.style.background = "none"}
      >
        <Icon name="close" size={18} />
      </button>

      {/* Body */}
      <div style={{ padding: "24px 24px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, overflow: "auto" }}>
        {isSuccess ? (
          <div style={{
            width: "100%", height: 200,
            borderRadius: tokens.radii.lg, overflow: "hidden",
            background: "linear-gradient(135deg, #effefc 0%, #c9fefa 40%, #ffc6f9 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 4,
          }}>
            <span style={{ fontSize: 64 }}>🎉</span>
          </div>
        ) : (
          <div style={{
            width: 56, height: 56, borderRadius: "50%", background: iconBg,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon name={iconName} size={26} color={iconColor} />
          </div>
        )}

        {/* Divider */}
        {!isSuccess && <div style={{ width: "100%", height: 1, background: tokens.colors.gray100 }} />}

        <div style={{ width: "100%", textAlign: "center", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: tokens.fonts.heading, fontSize: 16, fontWeight: 600, color: tokens.colors.gray600 }}>
            {title}
          </div>
          <div style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray500, lineHeight: 1.6 }}>
            {body}
          </div>
        </div>

        {/* Content slot (default dialog) */}
        {!isDelete && !isSuccess && (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {["Review language mismatch", "Booking.com may reject non-matching replies", "You can re-submit after"].map((item, i) => (
              <div key={i} style={{
                padding: "10px 14px", background: tokens.colors.gray50,
                borderRadius: tokens.radii.sm, border: `1px solid ${tokens.colors.gray100}`,
                fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray600,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <Icon name="info" size={15} color={tokens.colors.info} />
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: `1px solid ${tokens.colors.gray100}`,
        padding: "14px 24px 18px",
        display: "flex",
        gap: 12,
        marginTop: 16,
      }}>
        {!isSuccess && (
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: "11px 16px", borderRadius: tokens.radii.md,
              border: `1px solid ${tokens.colors.gray300}`, background: "white", cursor: "pointer",
              fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 14, color: tokens.colors.gray500,
            }}
          >{cancelLabel}</button>
        )}
        <button
          onClick={isSuccess ? onClose : onConfirm}
          style={{
            flex: 1, padding: "11px 16px", borderRadius: tokens.radii.md,
            border: "none", cursor: "pointer",
            fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 14, color: "white",
            background: isDelete ? tokens.colors.error : "linear-gradient(82.58deg, #08767D 15.234%, #1DC8CA 241.16%)",
          }}
        >{isSuccess ? "Close" : confirmLabel}</button>
      </div>
    </div>
  );
}

// ─── NAVIGATION DRAWER ───────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "inbox", label: "Inbox", icon: "inbox" },
  { id: "tasks", label: "Tasks", icon: "tasks" },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "bookings", label: "Bookings", icon: "bookings" },
  { id: "guests", label: "Guests", icon: "guests" },
  { id: "rentals", label: "Rentals", icon: "rentals" },
  { id: "rates", label: "Rate tables", icon: "rates" },
  { id: "discounts", label: "Discounts", icon: "discounts" },
  { id: "inquiries", label: "Inquiries", icon: "inquiries" },
  { id: "reviews", label: "Reviews", icon: "reviews", hasChildren: true },
  { id: "performance", label: "Performance", icon: "performance" },
  { id: "finance", label: "Finance", icon: "finance" },
  { id: "apps", label: "Apps", icon: "apps" },
  { id: "whats_new", label: "What's new?", icon: "whats_new" },
  { id: "help", label: "Help", icon: "help" },
  { id: "settings", label: "Settings", icon: "settings", hasChildren: true },
];

function NavDrawer({ activeItem = "inbox" }) {
  const [active, setActive] = useState(activeItem);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <div style={{
      width: 256, height: 600,
      background: "white",
      borderRadius: tokens.radii.lg,
      border: `1px solid ${tokens.colors.gray100}`,
      display: "flex", flexDirection: "column",
      overflow: "hidden",
      boxShadow: "2px 4px 20px rgba(0,0,0,0.06)",
    }}>
      {/* Top: logo + account selector */}
      <div style={{ padding: "14px 12px 8px", borderBottom: `1px solid ${tokens.colors.gray100}` }}>
        <div
          onClick={() => setAccountOpen(o => !o)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "6px 8px", borderRadius: tokens.radii.md, cursor: "pointer",
            background: accountOpen ? tokens.colors.gray50 : "transparent",
            userSelect: "none",
          }}
          onMouseEnter={e => e.currentTarget.style.background = tokens.colors.gray50}
          onMouseLeave={e => e.currentTarget.style.background = accountOpen ? tokens.colors.gray50 : "transparent"}
        >
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(82.58deg, #08767D 15.234%, #1DC8CA 241.16%)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ color: "white", fontWeight: 800, fontSize: 13, fontFamily: tokens.fonts.heading }}>S</span>
          </div>
          <span style={{ fontFamily: tokens.fonts.heading, fontWeight: 700, fontSize: 13, color: tokens.colors.headingColor, flex: 1 }}>
            Conciergerie
          </span>
          <Icon name="chevron_down" size={16} color={tokens.colors.gray400} />
        </div>

        {accountOpen && (
          <div style={{ marginTop: 4, padding: "4px 0" }}>
            <div style={{ padding: "4px 8px", marginBottom: 4 }}>
              <input
                placeholder="Search accounts..."
                style={{
                  width: "100%", padding: "5px 8px", borderRadius: tokens.radii.sm,
                  border: `1px solid ${tokens.colors.gray200}`, fontFamily: tokens.fonts.body,
                  fontSize: 12, color: tokens.colors.gray700, background: tokens.colors.gray50,
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
            {["Benakey", "Demo Account", "Gwern", "Locastay", "Megan Account"].map(acc => (
              <div key={acc} style={{
                padding: "7px 12px", fontFamily: tokens.fonts.body, fontSize: 13,
                color: tokens.colors.gray700, cursor: "pointer", borderRadius: tokens.radii.sm,
              }}
                onMouseEnter={e => e.currentTarget.style.background = tokens.colors.gray50}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >{acc}</div>
            ))}
          </div>
        )}
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 10px", borderRadius: tokens.radii.md, cursor: "pointer",
                marginBottom: 1,
                background: isActive ? "rgba(29, 200, 202, 0.1)" : "transparent",
                color: isActive ? tokens.colors.primary : tokens.colors.gray600,
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = tokens.colors.gray50; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon name={item.icon} size={17} color={isActive ? tokens.colors.primary : tokens.colors.gray400} />
              <span style={{
                fontFamily: tokens.fonts.body, fontSize: 13,
                fontWeight: isActive ? 600 : 400, flex: 1,
                color: isActive ? tokens.colors.primary : tokens.colors.gray700,
              }}>{item.label}</span>
              {item.hasChildren && <Icon name="chevron_right" size={14} color={tokens.colors.gray300} />}
            </div>
          );
        })}
      </div>

      {/* Bottom: user */}
      <div style={{
        borderTop: `1px solid ${tokens.colors.gray100}`,
        padding: "10px 12px",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", background: tokens.colors.gray200,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon name="user" size={15} color={tokens.colors.gray500} />
        </div>
        <span style={{ fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray700, fontWeight: 500 }}>
          User name
        </span>
      </div>
    </div>
  );
}

// ─── INFORMATIONAL CARDS ─────────────────────────────────────────────────────

const CARD_PURPOSES = {
  informational: {
    bg: "#f1f9fe", border: "#99c2f5", text: "#114869",
    icon: "info", label: "Informational",
  },
  neutral: {
    bg: tokens.colors.gray50, border: tokens.colors.gray300, text: tokens.colors.gray900,
    icon: "info", label: "Neutral",
  },
  success: {
    bg: "#f2fbf4", border: "#96dfa6", text: "#1d4a29",
    icon: "check", label: "Success",
  },
  warning: {
    bg: "#fffbeb", border: "#f8d451", text: "#763811",
    icon: "alert", label: "Warning",
  },
  smily: {
    bg: "#effefc", border: "#55f3f0", text: "#0f4e52",
    icon: "alert", label: "Smily branded",
  },
  danger: {
    bg: "#fef3f2", border: "#f9b0a8", text: "#7b2921",
    icon: "alert", label: "Danger",
  },
};

function InfoCard({ purpose = "informational", header = "Header", body = "This booking contains locked fields.", onAction }) {
  const cfg = CARD_PURPOSES[purpose];
  return (
    <div style={{
      background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 12,
      padding: "20px", display: "flex", flexDirection: "column", gap: 12,
      width: 280,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name={cfg.icon} size={18} color={cfg.text} />
        <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, fontWeight: 600, color: cfg.text }}>{header}</span>
      </div>
      <p style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: cfg.text, margin: 0, lineHeight: 1.55 }}>{body}</p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onAction}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: "4px 0",
            fontFamily: tokens.fonts.body, fontSize: 14, fontWeight: 600, color: cfg.text,
            textDecoration: "underline",
          }}
        >See why</button>
      </div>
    </div>
  );
}

function StatCard({ purpose = "neutral", label = "Body", metric = "Heading 1", sublabel = "Body" }) {
  const cfg = CARD_PURPOSES[purpose];
  const metricColor = purpose === "smily" ? "#04969d" : purpose === "danger" ? "#d53d2d" : tokens.colors.gray700;
  return (
    <div style={{
      background: cfg.bg, borderRadius: 12, padding: "24px 20px",
      display: "flex", flexDirection: "column", gap: 10, width: 200,
    }}>
      <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray700 }}>{label}</span>
      <span style={{ fontFamily: tokens.fonts.body, fontSize: 24, fontWeight: 600, color: metricColor }}>{metric}</span>
      <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray700 }}>{sublabel}</span>
    </div>
  );
}

// Cards/list item, Type=Metric — KPI card used as a selectable tab (Property 2: selected/unselected)
function MetricCard({ label = "Occupancy rate", value = "67", unit = "%", trend, trendPositive = true, showInfo = true, selected = false, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "white", cursor: onClick ? "pointer" : "default",
        border: `1px solid ${selected ? tokens.colors.primary : tokens.colors.gray200}`,
        borderRadius: tokens.radii.md, padding: 16, width: 176,
        display: "flex", flexDirection: "column", gap: 4,
        boxShadow: selected ? "0 0 0 1px " + tokens.colors.primary : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 4, width: "100%" }}>
        <span style={{
          fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray600,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{label}</span>
        {showInfo && <Icon name="info" size={14} color={tokens.colors.gray400} />}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
          <span style={{ fontFamily: tokens.fonts.body, fontSize: 24, fontWeight: 600, color: tokens.colors.gray600, lineHeight: "30px" }}>{value}</span>
          <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray600 }}>{unit}</span>
        </span>
        {trend && (
          <span style={{
            display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: tokens.radii.sm,
            background: trendPositive ? "#e1f7e5" : "#fde3e0", color: trendPositive ? "#0b2813" : "#7b2921",
            fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 14,
          }}>{trend}</span>
        )}
        <span style={{ display: "flex", marginLeft: "auto" }}>
          <Icon name="chevron_right" size={12} color={tokens.colors.gray400} />
        </span>
      </div>
    </div>
  );
}

function DiscoveryCard({ onClose }) {
  return (
    <div style={{
      background: "white", borderRadius: 12,
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "2px 4px 20px rgba(0,0,0,0.1)",
      overflow: "hidden", display: "flex", flexDirection: "column", width: 420,
    }}>
      <div style={{
        height: 140, background: "linear-gradient(135deg, #effefc 0%, #c9fefa 35%, #ffc6f9 75%, #ff98f3 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      }}>
        <span style={{ fontSize: 48 }}>😊</span>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 8, right: 8,
              background: "rgba(255,255,255,0.7)", border: "none", borderRadius: "50%",
              width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: tokens.colors.gray500,
            }}
          ><Icon name="close" size={13} /></button>
        )}
        <div style={{
          position: "absolute", top: 8, left: 10,
          background: "#fff0fc", border: "1px solid #ff98f3", borderRadius: tokens.radii.sm,
          padding: "1px 8px", fontFamily: tokens.fonts.body, fontSize: 13, fontWeight: 600, color: "#ff01bb",
        }}>NEW</div>
      </div>
      <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontFamily: tokens.fonts.body, fontSize: 17, fontWeight: 600, color: tokens.colors.gray600 }}>
          Keep track of your payouts
        </div>
        <p style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray700, margin: 0, lineHeight: 1.6 }}>
          Get paid directly to your own account—no need to wait for the owner's transfer. See exactly what you receive and when.
        </p>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 4 }}>
          <ButtonSolid>Create a SmilyPay account</ButtonSolid>
          <ButtonText>Learn more</ButtonText>
        </div>
      </div>
    </div>
  );
}

// ─── PRICING LABELS ──────────────────────────────────────────────────────────

function LabelSection({ title, subtitle, variant = "default" }) {
  const icon = variant === "check"
    ? <span style={{ color: tokens.colors.primary, marginRight: 6, fontSize: 14, lineHeight: 1 }}>✓</span>
    : variant === "info"
    ? <span style={{ color: tokens.colors.gray400, marginRight: 6, fontSize: 14, lineHeight: 1 }}>ⓘ</span>
    : null;
  return (
    <div style={{
      background: "white", border: `1px solid ${tokens.colors.gray200}`,
      borderRadius: tokens.radii.sm, padding: "12px 16px",
      display: "flex", flexDirection: "column", gap: 4,
    }}>
      <div style={{ fontFamily: tokens.fonts.body, fontSize: 14, fontWeight: 600, color: tokens.colors.gray800, display: "flex", alignItems: "center" }}>
        {icon}{title}
      </div>
      {subtitle && <div style={{ fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500 }}>{subtitle}</div>}
    </div>
  );
}

function LabelSubsection({ heading, body }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div style={{ fontFamily: tokens.fonts.heading, fontSize: 14, fontWeight: 700, color: tokens.colors.headingColor }}>{heading}</div>
      <div style={{ fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.bodyColor }}>{body}</div>
    </div>
  );
}

function BreakdownRow({ label, amount, variant = "default", onClick }) {
  const isChild = variant === "child";
  const isTotal = variant === "total";
  const hasChevron = variant === "collapsed" || variant === "expanded";
  return (
    <div
      onClick={hasChevron ? onClick : undefined}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isChild ? "4px 0 4px 12px" : "8px 0",
        cursor: hasChevron ? "pointer" : "default",
        borderTop: isTotal ? `1px solid ${tokens.colors.gray200}` : "none",
        marginTop: isTotal ? 4 : 0,
      }}
    >
      <div style={{
        fontFamily: tokens.fonts.body, fontSize: isChild ? 12 : 14,
        fontWeight: isTotal ? 700 : 400,
        color: isChild ? tokens.colors.gray400 : tokens.colors.gray700,
        display: "flex", alignItems: "center", gap: 4,
      }}>
        {label}
        {variant === "collapsed" && <span style={{ fontSize: 10 }}>▾</span>}
        {variant === "expanded" && <span style={{ fontSize: 10 }}>▴</span>}
      </div>
      <div style={{
        fontFamily: tokens.fonts.body, fontSize: isChild ? 12 : 14,
        fontWeight: isTotal ? 700 : 400,
        color: isChild ? tokens.colors.gray400 : tokens.colors.gray700,
      }}>
        {amount}
      </div>
    </div>
  );
}

function BreakdownGroup({ label, amount, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <BreakdownRow label={label} amount={amount} variant={open ? "expanded" : "collapsed"} onClick={() => setOpen(o => !o)} />
      {open && (
        <div style={{ borderLeft: `2px solid ${tokens.colors.gray100}`, marginLeft: 4, paddingLeft: 8 }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── INFOGRAPHIC: PRICE BREAKDOWN ────────────────────────────────────────────

function PriceBreakdownChart({ items = [], total }) {
  const totalValue = items.reduce((sum, item) => sum + (item.value || 0), 0) || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", height: 10, borderRadius: tokens.radii.pill, overflow: "hidden", width: "100%" }}>
        {items.map((item, i) => (
          <div key={i} style={{ width: `${(item.value / totalValue) * 100}%`, background: item.color }} />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${tokens.colors.gray100}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
              <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray700 }}>{item.label}</span>
            </div>
            <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray700 }}>{item.amount}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 4px" }}>
          <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, fontWeight: 700, color: tokens.colors.gray800 }}>Total</span>
          <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, fontWeight: 700, color: tokens.colors.gray800 }}>{total}</span>
        </div>
      </div>
    </div>
  );
}

// ─── TAB BAR COMPONENT ───────────────────────────────────────────────────────

function TabBar({ tabs, active, onChange, variant = "underline" }) {
  if (variant === "pill") {
    return (
      <div style={{
        display: "inline-flex",
        background: tokens.colors.gray100,
        borderRadius: tokens.radii.pill,
        padding: "3px",
        gap: "2px",
      }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => onChange(tab)} style={{
            padding: "7px 16px",
            borderRadius: tokens.radii.pill,
            border: "none",
            cursor: "pointer",
            fontFamily: tokens.fonts.body,
            fontSize: "14px",
            fontWeight: active === tab ? 600 : 400,
            color: active === tab ? tokens.colors.headingColor : tokens.colors.gray500,
            background: active === tab ? tokens.colors.white : "transparent",
            boxShadow: active === tab ? tokens.shadows.card : "none",
            transition: "all 0.15s",
          }}>
            {tab}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      borderBottom: `1px solid ${tokens.colors.gray100}`,
      gap: "0",
    }}>
      {tabs.map(tab => (
        <button key={tab} onClick={() => onChange(tab)} style={{
          padding: "10px 20px",
          border: "none",
          borderBottom: active === tab ? `2px solid ${tokens.colors.primary}` : "2px solid transparent",
          marginBottom: "-1px",
          cursor: "pointer",
          fontFamily: tokens.fonts.body,
          fontSize: "14px",
          fontWeight: active === tab ? 600 : 400,
          color: active === tab ? tokens.colors.primary : tokens.colors.gray500,
          background: "transparent",
          transition: "color 0.15s, border-color 0.15s",
          whiteSpace: "nowrap",
        }}>
          {tab}
        </button>
      ))}
    </div>
  );
}

// ─── PAGINATION ───────────────────────────────────────────────────────────────

function PaginationItem({ children, active, disabled, onClick, ellipsis }) {
  if (ellipsis) return (
    <div style={{
      width: 36, height: 36,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: tokens.fonts.body, fontSize: "14px",
      color: tokens.colors.gray400,
    }}>…</div>
  );
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: 36, height: 36,
      display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: tokens.radii.sm,
      border: active ? "none" : `1px solid ${disabled ? tokens.colors.gray100 : tokens.colors.gray200}`,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: tokens.fonts.body,
      fontSize: "14px",
      fontWeight: active ? 600 : 400,
      color: active ? tokens.colors.white : disabled ? tokens.colors.gray300 : tokens.colors.gray600,
      background: active ? tokens.colors.primary : tokens.colors.white,
      transition: "all 0.15s",
    }}
    onMouseEnter={e => { if (!active && !disabled) { e.currentTarget.style.borderColor = tokens.colors.primary; e.currentTarget.style.color = tokens.colors.primary; }}}
    onMouseLeave={e => { if (!active && !disabled) { e.currentTarget.style.borderColor = tokens.colors.gray200; e.currentTarget.style.color = tokens.colors.gray600; }}}
    >
      {children}
    </button>
  );
}

function Pagination({ current = 3, total = 8, onChange }) {
  const [page, setPage] = useState(current);
  const go = (p) => { setPage(p); onChange?.(p); };

  const ArrowLeft = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const ArrowRight = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Build page list with ellipsis
  const pages = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(total - 1, page + 1); i++) pages.push(i);
    if (page < total - 2) pages.push("...");
    pages.push(total);
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <PaginationItem disabled={page === 1} onClick={() => go(page - 1)}>
        <ArrowLeft />
      </PaginationItem>
      {pages.map((p, i) =>
        p === "..." ? <PaginationItem key={`ellipsis-${i}`} ellipsis /> :
        <PaginationItem key={p} active={p === page} onClick={() => go(p)}>{p}</PaginationItem>
      )}
      <PaginationItem disabled={page === total} onClick={() => go(page + 1)}>
        <ArrowRight />
      </PaginationItem>
    </div>
  );
}

// ─── TOOLTIP ─────────────────────────────────────────────────────────────────

function Tooltip({ content, placement = "top", children }) {
  const [visible, setVisible] = useState(false);

  const placements = {
    top:    { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)",    left: "50%", transform: "translateX(-50%)" },
    left:   { right: "calc(100% + 8px)",  top: "50%",  transform: "translateY(-50%)" },
    right:  { left: "calc(100% + 8px)",   top: "50%",  transform: "translateY(-50%)" },
  };

  const arrowStyles = {
    top:    { bottom: "-4px", left: "50%", transform: "translateX(-50%) rotate(45deg)" },
    bottom: { top: "-4px",    left: "50%", transform: "translateX(-50%) rotate(45deg)" },
    left:   { right: "-4px",  top: "50%",  transform: "translateY(-50%) rotate(45deg)" },
    right:  { left: "-4px",   top: "50%",  transform: "translateY(-50%) rotate(45deg)" },
  };

  return (
    <div style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={{
          position: "absolute",
          ...placements[placement],
          background: tokens.colors.gray900,
          color: tokens.colors.white,
          padding: "6px 10px",
          borderRadius: tokens.radii.sm,
          fontSize: "12px",
          fontFamily: tokens.fonts.body,
          fontWeight: 400,
          whiteSpace: "nowrap",
          zIndex: 100,
          boxShadow: tokens.shadows.cardStrong,
          pointerEvents: "none",
        }}>
          {content}
          <div style={{
            position: "absolute",
            width: 8, height: 8,
            background: tokens.colors.gray900,
            ...arrowStyles[placement],
          }} />
        </div>
      )}
    </div>
  );
}

// ─── IN-APP INTERCEPT ────────────────────────────────────────────────────────
// Rules from learnings.json L001–L007:
// - No status icon, no title divider
// - X close always visible
// - One open-ended question + free-text area only
// - Submit → Secondary (tonal), Dismiss → Ghost/text
// - Trigger at moment of user action

function InAppIntercept({ title, question, onSubmit, onDismiss, onClose }) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(answer);
  };

  const CloseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  if (submitted) {
    return (
      <div style={{
        background: tokens.colors.white,
        borderRadius: tokens.radii.lg,
        boxShadow: tokens.shadows.cardStrong,
        width: 360,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "28px" }}>🎉</div>
        <div style={{ fontFamily: tokens.fonts.heading, fontWeight: 700, fontSize: "16px", color: tokens.colors.headingColor }}>
          Thank you!
        </div>
        <div style={{ fontFamily: tokens.fonts.body, fontSize: "14px", color: tokens.colors.bodyColor }}>
          Your feedback helps us improve.
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: tokens.colors.white,
      borderRadius: tokens.radii.lg,
      boxShadow: tokens.shadows.cardStrong,
      width: 360,
      padding: "20px 24px 24px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}>
      {/* Header — no status icon, no divider (L001, L002) */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
        <div style={{
          fontFamily: tokens.fonts.heading,
          fontWeight: 700,
          fontSize: "16px",
          color: tokens.colors.headingColor,
          lineHeight: 1.3,
        }}>
          {title}
        </div>
        {/* X always visible (L005) */}
        <button onClick={onClose} style={{
          background: "transparent", border: "none", cursor: "pointer",
          color: tokens.colors.gray400, padding: "2px", flexShrink: 0,
          display: "flex", alignItems: "center",
          borderRadius: tokens.radii.xs,
        }}
        onMouseEnter={e => e.currentTarget.style.color = tokens.colors.gray700}
        onMouseLeave={e => e.currentTarget.style.color = tokens.colors.gray400}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Single open-ended question + text area (L007) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label style={{
          fontFamily: tokens.fonts.body,
          fontSize: "14px",
          color: tokens.colors.gray700,
          fontWeight: 400,
        }}>
          {question}
        </label>
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Share your thoughts…"
          rows={3}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: tokens.radii.sm,
            border: `1px solid ${tokens.colors.gray200}`,
            background: tokens.colors.gray50,
            fontFamily: tokens.fonts.body,
            fontSize: "14px",
            color: tokens.colors.dark,
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={e => e.target.style.borderColor = tokens.colors.primary}
          onBlur={e => e.target.style.borderColor = tokens.colors.gray200}
        />
      </div>

      {/* Footer — tonal submit, ghost dismiss (L003, L004) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
        <button onClick={onDismiss} style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: tokens.fonts.body,
          fontSize: "14px",
          fontWeight: 600,
          color: tokens.colors.primary,
          padding: "10px 4px",
          textDecoration: "none",
        }}
        onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
        onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
        >
          Skip
        </button>
        <button onClick={handleSubmit} style={{
          background: `rgba(29, 200, 202, 0.12)`,
          border: "none",
          cursor: "pointer",
          fontFamily: tokens.fonts.body,
          fontSize: "14px",
          fontWeight: 600,
          color: tokens.colors.primary,
          padding: "10px 20px",
          borderRadius: tokens.radii.sm,
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(29, 200, 202, 0.2)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(29, 200, 202, 0.12)"}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

// ─── BADGE ───────────────────────────────────────────────────────────────────

const BADGE_COLORS = {
  green:  { bg: "#f2fbf4", border: "#96dfa6", text: "#1d4a29", solid: tokens.colors.success },
  blue:   { bg: "#f1f9fe", border: "#99c2f5", text: "#114869", solid: tokens.colors.info },
  yellow: { bg: "#fffbeb", border: "#f8d451", text: "#763811", solid: tokens.colors.warning },
  red:    { bg: "#fef3f2", border: "#f9b0a8", text: "#7b2921", solid: tokens.colors.error },
  grey:   { bg: tokens.colors.gray50, border: tokens.colors.gray300, text: tokens.colors.gray700, solid: tokens.colors.gray500 },
  purple: { bg: "#f5f0ff", border: "#c9b3f7", text: "#4b2e83", solid: "#8b5cf6" },
};

function Badge({ children, color = "green", variant = "tonal" }) {
  const cfg = BADGE_COLORS[color];
  const isSolid = variant === "solid";
  const isOutline = variant === "outline";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 8px", borderRadius: tokens.radii.sm,
      fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 13,
      background: isSolid ? cfg.solid : isOutline ? "white" : cfg.bg,
      border: `1px solid ${isSolid ? cfg.solid : cfg.border}`,
      color: isSolid ? "white" : cfg.text,
    }}>{children}</span>
  );
}

// ─── SNACKBAR ────────────────────────────────────────────────────────────────

function Snackbar({ variant = "success", message }) {
  const isError = variant === "error";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      background: isError ? "#7b2921" : tokens.colors.gray900,
      color: "white", borderRadius: tokens.radii.md,
      padding: "12px 16px", boxShadow: tokens.shadows.cardStrong,
      fontFamily: tokens.fonts.body, fontSize: 14, maxWidth: 420,
    }}>
      <Icon name={isError ? "alert" : "check"} size={18} color={isError ? "#f9b0a8" : tokens.colors.primary} />
      <span style={{ flex: 1, lineHeight: 1.4 }}>{message}</span>
    </div>
  );
}

// ─── FILTER BAR ──────────────────────────────────────────────────────────────

function FilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "8px 14px", borderRadius: tokens.radii.pill,
      border: `1px solid ${active ? tokens.colors.primary : tokens.colors.gray300}`,
      background: active ? "rgba(29,200,202,0.1)" : "white",
      color: active ? tokens.colors.primary : tokens.colors.gray600,
      fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 13, cursor: "pointer",
    }}>
      {label}
      {active && <Icon name="close" size={12} color={tokens.colors.primary} />}
    </button>
  );
}

function FilterDropdownButton({ label = "Filters", count }) {
  return (
    <button style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "8px 14px", borderRadius: tokens.radii.pill,
      border: `1px solid ${tokens.colors.gray300}`, background: "white",
      color: tokens.colors.gray600, fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 13, cursor: "pointer",
    }}>
      {label}{count ? ` (${count})` : ""}
      <Icon name="chevron_down" size={13} color={tokens.colors.gray400} />
    </button>
  );
}

// ─── SELECTION CONTROLS ──────────────────────────────────────────────────────

function Checkbox({ label, checked, onChange, disabled = false, error = false, description }) {
  return (
    <label style={{
      display: "flex", alignItems: "flex-start", gap: 8,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
    }}>
      <span style={{
        width: 18, height: 18, flexShrink: 0, marginTop: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: tokens.radii.xs,
        border: `1.5px solid ${error ? tokens.colors.error : checked ? tokens.colors.primary : tokens.colors.gray300}`,
        background: checked ? tokens.colors.primary : "white",
      }}>
        {checked && <Icon name="check" size={12} color="white" strokeWidth={3} />}
      </span>
      <span>
        <div style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: error ? tokens.colors.error : tokens.colors.gray700 }}>{label}</div>
        {description && <div style={{ fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.gray400, marginTop: 2 }}>{description}</div>}
      </span>
      <input type="checkbox" checked={!!checked} onChange={onChange || (() => {})} readOnly={!onChange} disabled={disabled} style={{ display: "none" }} />
    </label>
  );
}

function Radio({ label, checked, onChange, disabled = false, description }) {
  return (
    <label style={{
      display: "flex", alignItems: "flex-start", gap: 8,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
    }}>
      <span style={{
        width: 18, height: 18, flexShrink: 0, marginTop: 1, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1.5px solid ${checked ? tokens.colors.primary : tokens.colors.gray300}`,
        background: "white",
      }}>
        {checked && <span style={{ width: 9, height: 9, borderRadius: "50%", background: tokens.colors.primary }} />}
      </span>
      <span>
        <div style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray700 }}>{label}</div>
        {description && <div style={{ fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.gray400, marginTop: 2 }}>{description}</div>}
      </span>
      <input type="radio" checked={!!checked} onChange={onChange || (() => {})} readOnly={!onChange} disabled={disabled} style={{ display: "none" }} />
    </label>
  );
}

function ToggleSwitch({ checked, onChange, label, disabled = false }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>
      <span
        onClick={disabled ? undefined : onChange}
        style={{
          width: 36, height: 20, borderRadius: tokens.radii.pill, position: "relative", flexShrink: 0,
          background: checked ? tokens.colors.primary : tokens.colors.gray300,
          transition: "background 0.15s",
        }}
      >
        <span style={{
          position: "absolute", top: 2, left: checked ? 18 : 2,
          width: 16, height: 16, borderRadius: "50%", background: "white",
          boxShadow: "0 1px 2px rgba(0,0,0,0.2)", transition: "left 0.15s",
        }} />
      </span>
      {label && <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray700 }}>{label}</span>}
    </label>
  );
}

// ─── DATE PICKER ─────────────────────────────────────────────────────────────

function DatePickerCalendar({ month = "June 2025", days = 30, startOffset = 6, selectedStart = 12, selectedEnd = 16 }) {
  const cells = Array.from({ length: days }, (_, i) => i + 1);
  return (
    <div style={{ width: 280, background: "white", border: `1px solid ${tokens.colors.gray100}`, borderRadius: tokens.radii.md, padding: 16, boxShadow: tokens.shadows.card }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <Icon name="chevron_left" size={16} color={tokens.colors.gray400} />
        <span style={{ fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 14, color: tokens.colors.headingColor }}>{month}</span>
        <Icon name="chevron_right" size={16} color={tokens.colors.gray400} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} style={{ textAlign: "center", fontSize: 11, color: tokens.colors.gray400, fontFamily: tokens.fonts.body }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {Array.from({ length: startOffset }).map((_, i) => <div key={`e${i}`} />)}
        {cells.map(day => {
          const inRange = day >= selectedStart && day <= selectedEnd;
          const isEdge = day === selectedStart || day === selectedEnd;
          return (
            <div key={day} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: 28, borderRadius: isEdge ? "50%" : tokens.radii.xs,
              background: isEdge ? tokens.colors.primary : inRange ? "rgba(29,200,202,0.12)" : "transparent",
              color: isEdge ? "white" : inRange ? tokens.colors.primary : tokens.colors.gray700,
              fontFamily: tokens.fonts.body, fontSize: 13, fontWeight: isEdge ? 600 : 400,
            }}>{day}</div>
          );
        })}
      </div>
    </div>
  );
}

// ─── BREADCRUMBS ─────────────────────────────────────────────────────────────

function Breadcrumbs({ items = [] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: tokens.fonts.body, fontSize: 13 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              color: isLast ? tokens.colors.gray700 : tokens.colors.gray400,
              fontWeight: isLast ? 600 : 400,
              cursor: isLast ? "default" : "pointer",
            }}>{item}</span>
            {!isLast && <Icon name="chevron_right" size={12} color={tokens.colors.gray300} />}
          </span>
        );
      })}
    </div>
  );
}

// ─── AVATAR ──────────────────────────────────────────────────────────────────

const CHANNEL_AVATAR = {
  Airbnb:        { bg: "#FF5A5F", label: "A" },
  "Booking.com": { bg: "#003580", label: "B" },
  Expedia:       { bg: "#00355F", label: "E" },
};

function Avatar({ type = "Icon", name = "Emma Laurent" }) {
  const initials = name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
  const channel = CHANNEL_AVATAR[type];
  return (
    <div style={{ position: "relative", width: 40, height: 40, flexShrink: 0 }}>
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        background: channel ? tokens.colors.gray100 : "rgba(29,200,202,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 14,
        color: channel ? tokens.colors.gray600 : tokens.colors.primary,
      }}>
        {type === "Icon" ? <Icon name="user" size={18} color={tokens.colors.gray400} /> : initials}
      </div>
      {channel && (
        <div style={{
          position: "absolute", bottom: -2, right: -2,
          width: 16, height: 16, borderRadius: "50%",
          background: channel.bg, border: "2px solid white",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 8, fontWeight: 700, color: "white", fontFamily: tokens.fonts.body,
        }}>{channel.label}</div>
      )}
    </div>
  );
}

function AvatarUserRow({ name, subtext, side = "left" }) {
  const nameBlock = (
    <div>
      <div style={{ fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 14, color: tokens.colors.headingColor }}>{name}</div>
      <div style={{ fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.gray400 }}>{subtext}</div>
    </div>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexDirection: side === "right" ? "row-reverse" : "row" }}>
      <Avatar type="Icon" />
      {nameBlock}
    </div>
  );
}

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────

function ProgressBar({ value = 60, orientation = "horizontal" }) {
  if (orientation === "vertical") {
    return (
      <div style={{ width: 8, height: 120, borderRadius: tokens.radii.pill, background: tokens.colors.gray100, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: `${value}%`, background: tokens.colors.primary, borderRadius: tokens.radii.pill }} />
      </div>
    );
  }
  return (
    <div style={{ width: "100%", maxWidth: 320, height: 8, borderRadius: tokens.radii.pill, background: tokens.colors.gray100, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: tokens.colors.primary, borderRadius: tokens.radii.pill }} />
    </div>
  );
}

// ─── ACCORDION ───────────────────────────────────────────────────────────────
// Matches Figma DS node 2971-2205 — component key 7afec5b11ac9c3d87fd4739ff410f970ec7c932e
// Flat white card, 1px gray-200 border, no shadow, border-radius md (10px)
// Header: title left + chevron right, border-bottom when open

function Accordion({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      background: tokens.colors.white,
      borderRadius: tokens.radii.md,
      border: `1px solid ${tokens.colors.gray200}`,
      marginBottom: "8px",
      overflow: "hidden",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          background: "none",
          border: "none",
          borderBottom: open ? `1px solid ${tokens.colors.gray100}` : "none",
          cursor: "pointer",
          transition: "background 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = tokens.colors.gray50}
        onMouseLeave={e => e.currentTarget.style.background = "none"}
      >
        <span style={{
          fontFamily: tokens.fonts.body,
          fontWeight: 600,
          fontSize: "14px",
          color: tokens.colors.headingColor,
          textAlign: "left",
        }}>{title}</span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0, marginLeft: "12px" }}
        >
          <path d="M4 6L8 10L12 6" stroke={tokens.colors.gray400} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={{ padding: "20px" }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function SmilyDesignSystem() {
  const [inputVal, setInputVal] = useState("");
  const [inputVal2, setInputVal2] = useState("Hello world");
  const [openDialog, setOpenDialog] = useState(null);
  const [demoTab, setDemoTab] = useState("Overview");
  const [demoPillTab, setDemoPillTab] = useState("Monthly");
  const [showIntercept, setShowIntercept] = useState(true);
  const [demoChecked, setDemoChecked] = useState(true);
  const [demoRadio, setDemoRadio] = useState("monthly");
  const [demoToggle, setDemoToggle] = useState(true);
  const [demoMetricTab, setDemoMetricTab] = useState("occupancy");

  return (
    <div style={{
      fontFamily: tokens.fonts.body,
      background: tokens.colors.gray50,
      minHeight: "100vh",
      padding: "0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700;800&family=Open+Sans:wght@400;600&display=swap');
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        * { box-sizing: border-box; }
        input::placeholder { color: #828fae; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "white",
        borderBottom: `1px solid ${tokens.colors.gray100}`,
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "8px",
              background: "linear-gradient(82.58deg, #08767D 15.234%, #1DC8CA 241.16%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "white", fontWeight: 800, fontSize: "14px", fontFamily: tokens.fonts.heading }}>S</span>
            </div>
            <h1 style={{ fontFamily: tokens.fonts.heading, fontSize: "20px", fontWeight: 800, color: tokens.colors.headingColor, margin: 0 }}>
              Smily Design System
            </h1>
          </div>
          <p style={{ fontFamily: tokens.fonts.body, fontSize: "12px", color: tokens.colors.gray500, margin: "4px 0 0 42px" }}>
            18 components · Colors · Typography · Buttons · Inputs · Dialogs · Navigation · Cards · Labels · Infographics · Tabs · Pagination · Tooltip · Intercept · Badges · Snackbar · Filter bar · Date picker · Breadcrumbs
          </p>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: tokens.colors.primary }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: tokens.colors.secondary }} />
        </div>
      </div>

      {/* Accordions */}
      <div style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>

        {/* COLORS */}
        <Accordion title="🎨 Colors" defaultOpen={true}>
            <Section title="Brand">
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ width: 100, height: 56, borderRadius: "8px", background: "linear-gradient(82.58deg, #08767D 15.234%, #1DC8CA 241.16%)" }} />
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "10px", color: tokens.colors.headingColor, fontWeight: 600 }}>Primary Gradient</div>
                </div>
                <Swatch name="Primary" hex="#1DC8CA" large />
                <Swatch name="Secondary" hex="#FF01BB" large />
              </div>
            </Section>

            <Section title="Status">
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Swatch name="Success" hex="#3DB559" />
                <Swatch name="Error" hex="#E74C3C" />
                <Swatch name="Warning" hex="#FD8B07" />
                <Swatch name="Info" hex="#199BD9" />
              </div>
            </Section>

            <Section title="Gray Scale">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {[
                  ["50", "#f6f7f9"], ["100", "#ecedf2"], ["200", "#d4d8e3"], ["300", "#aeb6cb"],
                  ["400", "#828fae"], ["500", "#627093"], ["600", "#4e5a7b"], ["700", "#404964"],
                  ["800", "#383f54"], ["900", "#323748"], ["950", "#212430"],
                ].map(([name, hex]) => (
                  <Swatch key={name} name={`Gray-${name}`} hex={hex} />
                ))}
              </div>
            </Section>

            <Section title="Teal Palette (Primary)">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {[
                  ["50","#effefc"],["100","#c9fefa"],["200","#93fcf6"],["300","#55f3f0"],
                  ["400","#1dc8ca"],["500","#09bdc3"],["600","#04969d"],["700","#08767d"],
                  ["800","#0c5c63"],["900","#0f4e52"],
                ].map(([name, hex]) => (
                  <Swatch key={name} name={`Teal-${name}`} hex={hex} />
                ))}
              </div>
            </Section>

            <Section title="Pink Palette (Secondary)">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {[
                  ["50","#fff0fc"],["100","#ffe3fc"],["200","#ffc6f9"],["300","#ff98f3"],
                  ["400","#ff58e7"],["500","#ff27d7"],["600","#ff01bb"],["700","#df0097"],
                  ["800","#b8007d"],["900","#5f003c"],
                ].map(([name, hex]) => (
                  <Swatch key={name} name={`Pink-${name}`} hex={hex} />
                ))}
              </div>
            </Section>
        </Accordion>

        {/* TYPOGRAPHY */}
        <Accordion title="📝 Typography">
            <Section title="Typefaces">
              <div style={{ display: "flex", gap: "32px" }}>
                <div>
                  <div style={{ fontFamily: tokens.fonts.heading, fontSize: "28px", fontWeight: 800, color: tokens.colors.headingColor }}>Mulish</div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "12px", color: tokens.colors.gray500 }}>Headings · UI labels</div>
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "28px", fontWeight: 400, color: tokens.colors.headingColor }}>Open Sans</div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "12px", color: tokens.colors.gray500 }}>Body · Inputs · Captions</div>
                </div>
              </div>
            </Section>

            <Section title="Heading Scale (Mulish)">
              {[
                { label: "heading-xs", size: "14px", weight: 600 },
                { label: "heading-sm", size: "16px", weight: 600 },
                { label: "heading-md", size: "20px", weight: 700 },
                { label: "heading-lg", size: "24px", weight: 700 },
                { label: "heading-xl", size: "30px", weight: 800 },
                { label: "heading-2xl", size: "36px", weight: 800 },
              ].map(({ label, size, weight }) => (
                <div key={label} style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "8px", borderBottom: `1px solid ${tokens.colors.gray100}`, paddingBottom: "8px" }}>
                  <div style={{ width: "120px", fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500 }}>{label}</div>
                  <div style={{ fontFamily: tokens.fonts.heading, fontSize: size, fontWeight: weight, color: tokens.colors.headingColor, lineHeight: 1.25 }}>The quick brown fox</div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray400, marginLeft: "auto" }}>{size} / {weight}</div>
                </div>
              ))}
            </Section>

            <Section title="Body Scale (Open Sans)">
              {[
                { label: "text-2xs", size: "10px" },
                { label: "text-xs", size: "12px" },
                { label: "text-sm", size: "14px" },
                { label: "text-md", size: "16px" },
                { label: "text-lg", size: "18px" },
                { label: "text-xl", size: "20px" },
              ].map(({ label, size }) => (
                <div key={label} style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "8px", borderBottom: `1px solid ${tokens.colors.gray100}`, paddingBottom: "8px" }}>
                  <div style={{ width: "120px", fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500 }}>{label}</div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: size, fontWeight: 400, color: tokens.colors.dark, lineHeight: 1.5 }}>The quick brown fox jumps over the lazy dog</div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray400, marginLeft: "auto" }}>{size}</div>
                </div>
              ))}
            </Section>
        </Accordion>

        {/* BUTTONS */}
        <Accordion title="🔘 Buttons">
            <Section title="Solid (Primary)">
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Size M</div>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                    <ButtonSolid>Button</ButtonSolid>
                    <ButtonSolid disabled>Disabled</ButtonSolid>
                    <ButtonSolid loading>Loading</ButtonSolid>
                    <ButtonSolid leadingIcon={<span>←</span>}>With Icon</ButtonSolid>
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Size S</div>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                    <ButtonSolid size="S">Button</ButtonSolid>
                    <ButtonSolid size="S" disabled>Disabled</ButtonSolid>
                    <ButtonSolid size="S" loading>Loading</ButtonSolid>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Outline (Tertiary)">
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                  <ButtonOutline>Button</ButtonOutline>
                  <ButtonOutline disabled>Disabled</ButtonOutline>
                  <ButtonOutline size="S">Small</ButtonOutline>
                </div>
              </div>
            </Section>

            <Section title="Tonal">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <ButtonTonal>Button</ButtonTonal>
                <ButtonTonal disabled>Disabled</ButtonTonal>
                <ButtonTonal size="S">Small</ButtonTonal>
              </div>
            </Section>

            <Section title="Text">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <ButtonText>Text Button</ButtonText>
                <ButtonText disabled>Disabled</ButtonText>
                <ButtonText size="S">Small</ButtonText>
              </div>
            </Section>

            <Section title="All Variants Side-by-Side">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", padding: "20px", background: "white", borderRadius: "8px", border: `1px solid ${tokens.colors.gray100}` }}>
                <ButtonSolid>Solid</ButtonSolid>
                <ButtonTonal>Tonal</ButtonTonal>
                <ButtonOutline>Outline</ButtonOutline>
                <ButtonText>Text</ButtonText>
              </div>
            </Section>
        </Accordion>

        {/* INPUTS */}
        <Accordion title="📥 Inputs">
            <Section title="Input States">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Default (placeholder)</div>
                  <InputField label="Property name" placeholder="Enter value" helperText="Helper text" />
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Focused (click to try)</div>
                  <InputField label="Guest name" placeholder="Enter guest name" helperText="Type to search" value={inputVal} onChange={e => setInputVal(e.target.value)} maxLength={30} />
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Entered / Filled</div>
                  <InputField label="Property name" placeholder="Enter value" value={inputVal2} onChange={e => setInputVal2(e.target.value)} maxLength={20} />
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Error state</div>
                  <InputField label="Email" placeholder="email@example.com" state="error" helperText="Please enter a valid email" value="not-valid" />
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>Disabled</div>
                  <InputField label="Property ID" placeholder="Auto-generated" state="disabled" helperText="This field is read-only" />
                </div>
                <div>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray500, marginBottom: "8px" }}>No label / Minimal</div>
                  <InputField placeholder="Search properties..." />
                </div>
              </div>
            </Section>

            <Section title="Token Reference">
              <table style={{ width: "100%", fontFamily: tokens.fonts.body, fontSize: "12px", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${tokens.colors.gray100}` }}>
                    {["State", "Border", "Background", "Text"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: tokens.colors.gray500, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Default", "gray-400 #828fae", "gray-50 #f6f7f9", "gray-700 #404964"],
                    ["Focused", "primary #1DC8CA (1.5px)", "gray-50 #f6f7f9", "gray-700 #404964"],
                    ["Error", "red-500 #E74C3C (1.5px)", "gray-50 #f6f7f9", "gray-700 #404964"],
                    ["Disabled", "gray-200 #d4d8e3", "gray-100 #ecedf2", "gray-400 #828fae"],
                  ].map(([state, border, bg, text]) => (
                    <tr key={state} style={{ borderBottom: `1px solid ${tokens.colors.gray50}` }}>
                      {[state, border, bg, text].map((cell, i) => (
                        <td key={i} style={{ padding: "6px 8px", color: tokens.colors.dark }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
        </Accordion>

        {/* DIALOGS */}
        <Accordion title="💬 Dialogs">
            {openDialog && (
              <DialogModal onClose={() => setOpenDialog(null)}>
                <Dialog
                  variant={openDialog}
                  title={
                    openDialog === "delete" ? "Confirm Deletion"
                    : openDialog === "success" ? "Smile, you are all set!"
                    : "Language Mismatch Detected"
                  }
                  body={
                    openDialog === "delete"
                      ? "Are you sure you want to delete this item? This action cannot be undone."
                    : openDialog === "success"
                      ? "We are preparing your rental on Booking.com. It should be available in 24 hours."
                    : "We noticed that your reply is in another language than that of the client review. Some platforms like Booking.com may reject your reply."
                  }
                  confirmLabel={openDialog === "delete" ? "Delete" : "Publish anyway"}
                  cancelLabel="Cancel"
                  onClose={() => setOpenDialog(null)}
                  onConfirm={() => setOpenDialog(null)}
                  onCancel={() => setOpenDialog(null)}
                />
              </DialogModal>
            )}

            <Section title="Dialog Variants">
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                {[
                  { variant: "default", label: "Default Dialog", desc: "Icon + content + Cancel / Confirm" },
                  { variant: "delete", label: "Delete Dialog", desc: "Destructive action confirmation" },
                  { variant: "success", label: "Success Dialog", desc: "Celebration state with illustration" },
                ].map(({ variant, label, desc }) => (
                  <div key={variant} style={{
                    border: `1px solid ${tokens.colors.gray100}`, borderRadius: tokens.radii.lg,
                    padding: "20px 24px", background: "white", display: "flex", flexDirection: "column", gap: 10, minWidth: 220,
                  }}>
                    <div style={{ fontFamily: tokens.fonts.heading, fontSize: 14, fontWeight: 700, color: tokens.colors.headingColor }}>{label}</div>
                    <div style={{ fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.gray500 }}>{desc}</div>
                    <ButtonSolid onClick={() => setOpenDialog(variant)} size="S">Open dialog</ButtonSolid>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Anatomy">
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                <div style={{
                  background: "white", borderRadius: tokens.radii.lg, boxShadow: "2px 4px 20px rgba(0,0,0,0.1)",
                  width: 420, padding: "24px", display: "flex", flexDirection: "column", gap: 14,
                }}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ width: 32, height: 32, borderRadius: tokens.radii.md, background: tokens.colors.gray50, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="close" size={16} color={tokens.colors.gray400} />
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#effefc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="language" size={24} color={tokens.colors.primary} />
                    </div>
                  </div>
                  <div style={{ height: 1, background: tokens.colors.gray100 }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: tokens.fonts.heading, fontSize: 16, fontWeight: 600, color: tokens.colors.gray600, marginBottom: 6 }}>Dialog Title</div>
                    <div style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray500, lineHeight: 1.6 }}>Supporting description text goes here. Keep it short and clear.</div>
                  </div>
                  <div style={{ height: 1, background: tokens.colors.gray100 }} />
                  <div style={{ display: "flex", gap: 10 }}>
                    <ButtonOutline style={{ flex: 1 }}>Cancel</ButtonOutline>
                    <ButtonSolid style={{ flex: 1 }}>Confirm</ButtonSolid>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
                  {[
                    ["Width", "500px"],
                    ["Border radius", "8px (lg)"],
                    ["Shadow", "2px 4px 20px rgba(0,0,0,0.10)"],
                    ["Header", "Open Sans SemiBold 16px"],
                    ["Body", "Open Sans Regular 14px"],
                    ["Footer buttons", "Full-width, flex row"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", gap: 12 }}>
                      <div style={{ width: 120, fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.gray400 }}>{k}</div>
                      <div style={{ fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.dark }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
        </Accordion>

        {/* NAVIGATION DRAWER */}
        <Accordion title="🧭 Navigation">
            <Section title="Navigation Drawer">
              <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
                <NavDrawer />
                <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 300 }}>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7 }}>
                    Navigation drawers let users switch between main views on larger screens. Click any item to set active state. Click the account name to open the account switcher.
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      ["Width", "256px"],
                      ["Item height", "~36px"],
                      ["Active bg", "rgba(29,200,202, 0.10)"],
                      ["Active text", "Primary #1DC8CA"],
                      ["Inactive text", "Gray-700 #404964"],
                      ["Icon size", "17px"],
                      ["Font", "Open Sans 13px"],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", gap: 12 }}>
                        <div style={{ width: 110, fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.gray400 }}>{k}</div>
                        <div style={{ fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.dark }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Item States">
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  { label: "Default", bg: "transparent", color: tokens.colors.gray700, iconColor: tokens.colors.gray400, weight: 400 },
                  { label: "Hover", bg: tokens.colors.gray50, color: tokens.colors.gray700, iconColor: tokens.colors.gray400, weight: 400 },
                  { label: "Active", bg: "rgba(29,200,202,0.10)", color: tokens.colors.primary, iconColor: tokens.colors.primary, weight: 600 },
                ].map(({ label, bg, color, iconColor, weight }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.gray500 }}>{label}</div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 12px", borderRadius: tokens.radii.md, background: bg, width: 180,
                    }}>
                      <Icon name="inbox" size={17} color={iconColor} />
                      <span style={{ fontFamily: tokens.fonts.body, fontSize: 13, fontWeight: weight, color }}> Inbox</span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
        </Accordion>

        {/* LABELS */}
        <Accordion title="🏷 Labels">
            <Section title="Section Block">
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 220 }}>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.gray400, textTransform: "uppercase", letterSpacing: 1 }}>Default</div>
                  <LabelSection title="Section block" subtitle="2 nights" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 220 }}>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.gray400, textTransform: "uppercase", letterSpacing: 1 }}>With check</div>
                  <LabelSection title="Dates" subtitle="2 nights" variant="check" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 220 }}>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.gray400, textTransform: "uppercase", letterSpacing: 1 }}>With info</div>
                  <LabelSection title="Dates" subtitle="2 nights" variant="info" />
                </div>
              </div>
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 480 }}>
                Used in booking detail sidebars to group related data (e.g. stay dates, guest count). The check variant confirms a validated field; the info variant signals an editable or expandable section.
              </div>
            </Section>

            <Section title="Subsection">
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
                <LabelSubsection heading="Heading 4" body="Supporting body text" />
                <LabelSubsection heading="Check-in" body="Thu, 12 Jun 2025" />
                <LabelSubsection heading="Guests" body="2 adults · 1 child" />
              </div>
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 480 }}>
                Lightweight heading+value pair. Use inside panels and cards to label individual data points — dates, guest counts, property names. Heading uses Mulish (Sofia Pro in Figma), value uses Open Sans.
              </div>
            </Section>

            <Section title="Breakdown Row">
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ width: 280 }}>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.gray400, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Flat list</div>
                  <BreakdownRow label="Accommodation" amount="€420.00" />
                  <BreakdownRow label="Cleaning fee" amount="€60.00" />
                  <BreakdownRow label="Tourist tax" amount="€14.00" />
                  <BreakdownRow label="Total" amount="€494.00" variant="total" />
                </div>
                <div style={{ width: 280 }}>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.gray400, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>With collapse</div>
                  <BreakdownGroup label="Accommodation" amount="€420.00">
                    <BreakdownRow label="Base rate (7 nights)" amount="€360.00" variant="child" />
                    <BreakdownRow label="Weekend surcharge" amount="€60.00" variant="child" />
                  </BreakdownGroup>
                  <BreakdownRow label="Cleaning fee" amount="€60.00" />
                  <BreakdownRow label="Total" amount="€480.00" variant="total" />
                </div>
              </div>
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 480 }}>
                Use <strong>BreakdownRow</strong> for flat line items. Use <strong>BreakdownGroup</strong> to wrap collapsible sub-items — click the row header to expand/collapse. Always end a breakdown list with a <code>variant="total"</code> row.
              </div>
            </Section>
        </Accordion>

        {/* INFOGRAPHICS */}
        <Accordion title="📊 Infographics">
            <Section title="Price Breakdown Chart">
              <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ width: 360 }}>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.gray400, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Revenue split example</div>
                  <PriceBreakdownChart
                    items={[
                      { label: "Accommodation", amount: "€420", value: 420, color: "#272B45" },
                      { label: "Channel fees", amount: "€80", value: 80, color: tokens.colors.primary },
                      { label: "Extras & add-ons", amount: "€240", value: 240, color: tokens.colors.secondary },
                    ]}
                    total="€740"
                  />
                </div>
                <div style={{ width: 360 }}>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.gray400, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Booking source split</div>
                  <PriceBreakdownChart
                    items={[
                      { label: "Direct bookings", amount: "62%", value: 62, color: "#272B45" },
                      { label: "Airbnb", amount: "25%", value: 25, color: tokens.colors.primary },
                      { label: "Booking.com", amount: "13%", value: 13, color: tokens.colors.secondary },
                    ]}
                    total="100%"
                  />
                </div>
              </div>
              <div style={{ marginTop: 24, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 560 }}>
                Use for financial summaries, revenue splits, and channel distribution. The three brand colors (dark navy <code>#272B45</code>, teal <code>#1DC8CA</code>, pink <code>#FF01BB</code>) map to primary/secondary/tertiary categories. Pass <code>value</code> as a number for proportional bar widths; <code>amount</code> is the display string.
              </div>
            </Section>

            <Section title="Color Reference">
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  { name: "Category 1 — Dark navy", hex: "#272B45" },
                  { name: "Category 2 — Primary teal", hex: tokens.colors.primary },
                  { name: "Category 3 — Secondary pink", hex: tokens.colors.secondary },
                ].map(({ name, hex }) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "white", border: `1px solid ${tokens.colors.gray100}`, borderRadius: tokens.radii.sm }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: hex, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: tokens.fonts.body, fontSize: 13, fontWeight: 600, color: tokens.colors.gray700 }}>{name}</div>
                      <div style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.gray400 }}>{hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
        </Accordion>

        {/* TABS */}
        <Accordion title="🗂 Tabs">
            <Section title="Underline Tabs (default)">
              <div style={{ background: tokens.colors.white, borderRadius: tokens.radii.md, padding: "24px", boxShadow: tokens.shadows.card }}>
                <TabBar
                  tabs={["Overview", "Bookings", "Reviews", "Settings"]}
                  active={demoTab}
                  onChange={setDemoTab}
                  variant="underline"
                />
                <div style={{ padding: "20px 4px 0", fontFamily: tokens.fonts.body, fontSize: "14px", color: tokens.colors.bodyColor }}>
                  Content for <strong>{demoTab}</strong> tab
                </div>
              </div>
            </Section>

            <Section title="Pill Tabs">
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <TabBar
                  tabs={["Monthly", "Weekly", "Daily"]}
                  active={demoPillTab}
                  onChange={setDemoPillTab}
                  variant="pill"
                />
                <TabBar
                  tabs={["All", "Confirmed", "Pending", "Cancelled"]}
                  active="All"
                  onChange={() => {}}
                  variant="pill"
                />
              </div>
            </Section>

            <Section title="Usage Rules">
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {[
                  ["Underline", "Main page-level navigation within a screen. Sits on a white card."],
                  ["Pill", "Filters and toggles inside a card or panel. Sits on gray-50."],
                ].map(([label, desc]) => (
                  <div key={label} style={{ flex: "1 1 200px", background: tokens.colors.gray50, borderRadius: tokens.radii.md, padding: "16px", border: `1px solid ${tokens.colors.gray100}` }}>
                    <div style={{ fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: "13px", color: tokens.colors.headingColor, marginBottom: "6px" }}>{label}</div>
                    <div style={{ fontFamily: tokens.fonts.body, fontSize: "13px", color: tokens.colors.bodyColor }}>{desc}</div>
                  </div>
                ))}
              </div>
            </Section>
        </Accordion>

        {/* PAGINATION */}
        <Accordion title="📄 Pagination">
            <Section title="Default Pagination">
              <Pagination current={3} total={8} />
            </Section>

            <Section title="First Page">
              <Pagination current={1} total={8} />
            </Section>

            <Section title="Last Page">
              <Pagination current={8} total={8} />
            </Section>

            <Section title="Short (≤ 7 pages — no ellipsis)">
              <Pagination current={3} total={5} />
            </Section>

            <Section title="Anatomy">
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {[
                  ["Prev / Next", "Chevron buttons. Disabled at boundary pages."],
                  ["Active page", `Solid ${tokens.colors.primary} fill, white text.`],
                  ["Inactive page", "White bg, gray-200 border. Hover → teal border."],
                  ["Ellipsis", "Gray-400 '…', not interactive."],
                ].map(([label, desc]) => (
                  <div key={label} style={{ flex: "1 1 180px", background: tokens.colors.gray50, borderRadius: tokens.radii.md, padding: "14px", border: `1px solid ${tokens.colors.gray100}` }}>
                    <div style={{ fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: "13px", color: tokens.colors.headingColor, marginBottom: "4px" }}>{label}</div>
                    <div style={{ fontFamily: tokens.fonts.body, fontSize: "12px", color: tokens.colors.bodyColor }}>{desc}</div>
                  </div>
                ))}
              </div>
            </Section>
        </Accordion>

        {/* TOOLTIP */}
        <Accordion title="💡 Tooltip">
            <Section title="Placements">
              <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", alignItems: "center", padding: "20px 0" }}>
                {["top", "bottom", "left", "right"].map(placement => (
                  <div key={placement} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <Tooltip content={`Tooltip — ${placement}`} placement={placement}>
                      <button style={{
                        padding: "8px 16px", borderRadius: tokens.radii.sm,
                        border: `1px solid ${tokens.colors.gray200}`, background: tokens.colors.white,
                        fontFamily: tokens.fonts.body, fontSize: "13px", color: tokens.colors.gray600,
                        cursor: "pointer",
                      }}>
                        Hover ({placement})
                      </button>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="In context">
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontFamily: tokens.fonts.body, fontSize: "14px", color: tokens.colors.bodyColor }}>Channel sync status</span>
                <Tooltip content="Last synced 3 minutes ago" placement="top">
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: tokens.colors.gray200, cursor: "help",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: tokens.fonts.body, fontSize: "11px", fontWeight: 600,
                    color: tokens.colors.gray500,
                  }}>?</div>
                </Tooltip>
                <Tooltip content="This action cannot be undone" placement="right">
                  <button style={{
                    padding: "6px 12px", borderRadius: tokens.radii.sm,
                    border: "none", background: "#fef3f2",
                    fontFamily: tokens.fonts.body, fontSize: "13px", color: "#7b2921",
                    cursor: "pointer", fontWeight: 600,
                  }}>Delete rental</button>
                </Tooltip>
              </div>
            </Section>

            <Section title="Spec">
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {[
                  ["Background", tokens.colors.gray900],
                  ["Text", tokens.colors.white],
                  ["Font size", "12px / Open Sans Regular"],
                  ["Padding", "6px 10px"],
                  ["Border radius", tokens.radii.sm],
                  ["Offset from trigger", "8px"],
                ].map(([label, val]) => (
                  <div key={label} style={{ background: tokens.colors.gray50, border: `1px solid ${tokens.colors.gray100}`, borderRadius: tokens.radii.md, padding: "12px 16px" }}>
                    <div style={{ fontFamily: tokens.fonts.body, fontSize: "11px", color: tokens.colors.gray400, marginBottom: "2px" }}>{label}</div>
                    <div style={{ fontFamily: tokens.fonts.body, fontSize: "13px", fontWeight: 600, color: tokens.colors.headingColor }}>{val}</div>
                  </div>
                ))}
              </div>
            </Section>
        </Accordion>

        {/* IN-APP INTERCEPT */}
        <Accordion title="🎯 In-app Intercept">
            <Section title="Live Example — click Submit or Skip to interact">
              <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "flex-start" }}>
                <div>
                  {showIntercept ? (
                    <InAppIntercept
                      title="Why are you switching plans?"
                      question="What's the main reason you're making this change?"
                      onSubmit={() => setTimeout(() => setShowIntercept(false), 1200)}
                      onDismiss={() => setShowIntercept(false)}
                      onClose={() => setShowIntercept(false)}
                    />
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{ fontFamily: tokens.fonts.body, fontSize: "14px", color: tokens.colors.bodyColor }}>Intercept dismissed.</div>
                      <button onClick={() => setShowIntercept(true)} style={{
                        padding: "8px 16px", borderRadius: tokens.radii.sm, border: "none",
                        background: "rgba(29,200,202,0.12)", color: tokens.colors.primary,
                        fontFamily: tokens.fonts.body, fontSize: "14px", fontWeight: 600, cursor: "pointer",
                      }}>Reset demo</button>
                    </div>
                  )}
                </div>
              </div>
            </Section>

            <Section title="Design Rules (from learnings.json)">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  ["L001", "No status icon", "Icons signal system state (error/warning/success). A feedback intercept has no system state."],
                  ["L002", "No title divider", "Removing the divider reduces visual weight — signals lighter than a blocking dialog."],
                  ["L003", "Dismiss → Ghost/Text button", "Ghost 'Skip' signals lower commitment than an outline button."],
                  ["L004", "Submit → Secondary (tonal)", "Tonal is prominent without competing with the host page's Primary CTA."],
                  ["L005", "X close always visible", "Primary dismiss affordance. Never hide it."],
                  ["L006", "Trigger at moment of action", "Signal quality is highest when reason is captured exactly when the user acts."],
                  ["L007", "One question + free text only", "No multi-step, no rating scales. Single question = lower friction = higher completion."],
                ].map(([id, rule, reason]) => (
                  <div key={id} style={{
                    display: "flex", gap: "12px", alignItems: "flex-start",
                    padding: "12px 16px", background: tokens.colors.white,
                    borderRadius: tokens.radii.md, border: `1px solid ${tokens.colors.gray100}`,
                  }}>
                    <span style={{ fontFamily: tokens.fonts.body, fontSize: "11px", fontWeight: 600, color: tokens.colors.primary, background: "rgba(29,200,202,0.1)", padding: "2px 6px", borderRadius: tokens.radii.xs, whiteSpace: "nowrap" }}>{id}</span>
                    <div>
                      <div style={{ fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: "13px", color: tokens.colors.headingColor }}>{rule}</div>
                      <div style={{ fontFamily: tokens.fonts.body, fontSize: "12px", color: tokens.colors.bodyColor, marginTop: "2px" }}>{reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Dialogs vs Intercepts">
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: tokens.fonts.body, fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: tokens.colors.gray50 }}>
                    {["Property", "Blocking Dialog", "In-app Intercept"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: tokens.colors.gray500, fontWeight: 600, borderBottom: `1px solid ${tokens.colors.gray100}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Status icon",          "✅ Yes", "❌ No"],
                    ["Title divider",        "✅ Yes", "❌ No"],
                    ["Primary gradient CTA", "✅ Yes", "❌ No"],
                    ["Submit button",        "Primary (gradient)", "Secondary (tonal)"],
                    ["Dismiss button",       "Outline", "Ghost / Text"],
                    ["Close X",             "Optional", "Always visible"],
                  ].map(([prop, dialog, intercept]) => (
                    <tr key={prop} style={{ borderBottom: `1px solid ${tokens.colors.gray50}` }}>
                      <td style={{ padding: "10px 14px", color: tokens.colors.gray700, fontWeight: 500 }}>{prop}</td>
                      <td style={{ padding: "10px 14px", color: tokens.colors.bodyColor }}>{dialog}</td>
                      <td style={{ padding: "10px 14px", color: tokens.colors.bodyColor }}>{intercept}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
        </Accordion>

        {/* CARDS */}
        <Accordion title="🃏 Cards">
            <Section title="Informational Cards (Text)">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {Object.entries(CARD_PURPOSES).map(([key, cfg]) => (
                  <InfoCard key={key} purpose={key} header={cfg.label} />
                ))}
              </div>
            </Section>

            <Section title="Stat Cards">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <StatCard purpose="neutral" label="Total bookings" metric="1,284" sublabel="This month" />
                <StatCard purpose="smily" label="Revenue" metric="€42,600" sublabel="+12% vs last month" />
                <StatCard purpose="danger" label="Cancellations" metric="38" sublabel="This month" />
              </div>
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 560 }}>
                Cards/informational, Content = Stats. A purpose-tinted callout that highlights a single figure between two text lines — static, no trend, no interaction. Use for a headline number inside an already-colored context (e.g. a warning card that also states a count).
              </div>
            </Section>

            <Section title="Metric Card">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <MetricCard label="Occupancy rate" value="67" unit="%" trend="+25%" trendPositive selected={demoMetricTab === "occupancy"} onClick={() => setDemoMetricTab("occupancy")} />
                <MetricCard label="Average nightly rate" value="184" unit="€" trend="-4%" trendPositive={false} selected={demoMetricTab === "adr"} onClick={() => setDemoMetricTab("adr")} />
                <MetricCard label="Guest satisfaction" value="4.8" unit="/5" showInfo={false} selected={demoMetricTab === "csat"} onClick={() => setDemoMetricTab("csat")} />
              </div>
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 560 }}>
                Cards/list item, Type = Metric. A white bordered KPI card — label with optional info tooltip, value + unit, and a color-coded trend badge (green = up, red = down). Doubles as a selectable tab (click one to switch the dashboard chart below it): the selected card gets a teal border, unselected cards stay gray. Distinct from the Stat Card above — this one is interactive and always carries a real value + trend, not just a static figure.
              </div>
            </Section>

            <Section title="Discovery Card">
              <DiscoveryCard />
            </Section>

            <Section title="Token Reference">
              <table style={{ width: "100%", fontFamily: tokens.fonts.body, fontSize: "12px", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${tokens.colors.gray100}` }}>
                    {["Variant", "Background", "Border", "Text color"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: tokens.colors.gray500, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Informational", "#f1f9fe", "#99c2f5", "#114869"],
                    ["Neutral", "#f6f7f9 (gray-50)", "#aeb6cb (gray-300)", "#404964 (gray-700)"],
                    ["Success", "#f2fbf4", "#96dfa6", "#1d4a29"],
                    ["Warning", "#fffbeb", "#f8d451", "#763811"],
                    ["Smily branded", "#effefc (teal-50)", "#55f3f0 (teal-300)", "#0f4e52 (teal-900)"],
                    ["Danger", "#fef3f2 (red-50)", "#f9b0a8 (red-300)", "#7b2921 (red-900)"],
                  ].map(([variant, bg, border, text]) => (
                    <tr key={variant} style={{ borderBottom: `1px solid ${tokens.colors.gray50}` }}>
                      {[variant, bg, border, text].map((cell, i) => (
                        <td key={i} style={{ padding: "6px 8px", color: tokens.colors.dark }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
        </Accordion>

        {/* BADGES */}
        <Accordion title="🎫 Badges">
            <Section title="Status colors">
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Badge color="green">Confirmed</Badge>
                <Badge color="blue">Upcoming</Badge>
                <Badge color="yellow">Pending</Badge>
                <Badge color="red">Overdue</Badge>
                <Badge color="grey">Inactive</Badge>
                <Badge color="purple">AI-powered</Badge>
              </div>
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 560 }}>
                Color semantics: green = completed or success. Blue = upcoming, scheduled, or partially collected. Yellow = pending or warning. Red = danger, overdue, or action required. Grey = incomplete, inactive, or expected but not confirmed. Purple = secured (guaranteed) or an AI-powered feature. Apply the color that matches the state being communicated, not a decorative choice.
              </div>
            </Section>

            <Section title="Variants">
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.gray400, textTransform: "uppercase", letterSpacing: 1 }}>Tonal (default)</div>
                  <Badge color="green" variant="tonal">Confirmed</Badge>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.gray400, textTransform: "uppercase", letterSpacing: 1 }}>Outline</div>
                  <Badge color="green" variant="outline">Confirmed</Badge>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.gray400, textTransform: "uppercase", letterSpacing: 1 }}>Solid</div>
                  <Badge color="green" variant="solid">Confirmed</Badge>
                </div>
              </div>
            </Section>
        </Accordion>

        {/* SNACKBAR */}
        <Accordion title="🔔 Snackbar">
            <Section title="Success">
              <Snackbar variant="success" message="Your changes have been saved" />
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 560 }}>
                Shown after all save requests succeed. Exit edit mode after display.
              </div>
            </Section>

            <Section title="Error (partial failure)">
              <Snackbar variant="error" message="Some booking details couldn't be saved. Please fix the errors below." />
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 560 }}>
                On partial save failure, keep failed fields in Error state and apply Entered styling to fields that saved successfully. Never reset valid inputs after a failed save — show the error snackbar alongside field-level error messages.
              </div>
            </Section>

            <Section title="Placement">
              <div style={{ fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 560 }}>
                Positioned top-center, 80px from the top of the viewport (below the browser chrome bar). It overlays page content without blocking primary navigation.
              </div>
            </Section>
        </Accordion>

        {/* FILTER BAR */}
        <Accordion title="🔍 Filter Bar">
            <Section title="≤3 filters (inline pills)">
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <FilterPill label="Status: Confirmed" active />
                <FilterPill label="Channel" />
                <FilterPill label="Date range" />
              </div>
            </Section>

            <Section title="≥4 filters (overflow dropdown)">
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <FilterPill label="Status: Confirmed" active />
                <FilterPill label="Channel" />
                <FilterPill label="Date range" />
                <FilterDropdownButton count={2} />
              </div>
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 560 }}>
                Standardized filter bar for all list and calendar pages. Up to 3 filter buttons show inline as pills; 4 or more hide the overflow behind a "Filters" dropdown button. Elements stay top-aligned so the layout doesn't break when horizontal scroll triggers on narrow viewports.
              </div>
            </Section>

            <Section title="Active filters row (desktop)">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "7px 8px 7px 12px", borderRadius: tokens.radii.sm,
                    border: `2px solid ${tokens.colors.primary}`, background: tokens.colors.gray100,
                    color: tokens.colors.primary, fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 14,
                  }}>
                    <Icon name="filter" size={16} color={tokens.colors.primary} />
                    Filters (3)
                    <Icon name="chevron_down" size={16} color={tokens.colors.primary} style={{ transform: "rotate(180deg)" }} />
                  </div>
                  <button style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    background: "transparent", border: "none", cursor: "pointer",
                    fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 14, color: tokens.colors.gray600, padding: "8px 12px",
                  }}>
                    Clear the 3 filters
                    <Icon name="close" size={16} color={tokens.colors.gray600} />
                  </button>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    { label: "Rentals", active: true },
                    { label: "From/To", active: true, icon: "calendar" },
                    { label: "Destination", active: true },
                    { label: "Sleeps", active: false },
                    { label: "Bedrooms", active: false },
                  ].map(f => (
                    <div key={f.label} style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "8px 8px 8px 12px", borderRadius: tokens.radii.sm,
                      border: f.active ? `2px solid ${tokens.colors.gray400}` : `1px solid ${tokens.colors.gray300}`,
                      background: f.active ? tokens.colors.gray100 : "white",
                      color: f.active ? tokens.colors.gray600 : tokens.colors.gray500,
                      fontFamily: tokens.fonts.body, fontWeight: 600, fontSize: 14,
                    }}>
                      {f.icon && <Icon name={f.icon} size={16} color={tokens.colors.gray500} />}
                      {f.label}
                      <Icon name="chevron_down" size={16} color={tokens.colors.gray400} />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 620 }}>
                When filters are active, the "Filters" trigger switches from outline to tonal (filled teal) — a known outline→tonal inconsistency tracked as a separate ticket; implement as-is, no custom workarounds. The clear action reads "Clear the N filters" and stays a secondary text button, never red. Chips with a non-default value get a heavier 2px border to stand out from untouched filters in the same row.
              </div>
            </Section>

            <Section title="Mobile — icon-only trigger">
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                height: 56, padding: "0 16px", background: "white",
                border: `1px solid ${tokens.colors.gray100}`, borderRadius: tokens.radii.md, maxWidth: 375,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name="chevron_left" size={20} color={tokens.colors.gray600} />
                  <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray600 }}>Bookings</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button style={{ background: "transparent", border: "none", cursor: "pointer", width: 37, height: 37, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: tokens.radii.sm }}>
                    <Icon name="filter" size={20} color={tokens.colors.gray700} />
                  </button>
                  <button style={{
                    width: 37, height: 37, borderRadius: tokens.radii.sm, border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: tokens.colors.primaryGradient,
                  }}>
                    <Icon name="plus" size={20} color="white" />
                  </button>
                </div>
              </div>
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 620 }}>
                On mobile the filter trigger is icon-only — no text label, no button border — since the funnel icon is a universal identifier and the header is already dense. It sits top-right, next to the primary CTA. The chevron used on desktop is dropped too: tapping always opens a panel or bottom sheet, so it adds nothing. When a toolbar already carries 4 or more elements (e.g. a multi-rental calendar with view tabs and date navigation), Filters and Legend move into a "⋮" overflow menu instead, ordered view-density options before data-scoping controls: Compact view, Detailed view, Legend, Filters.
              </div>
            </Section>
        </Accordion>

        {/* DATE PICKER */}
        <Accordion title="📅 Date Picker">
            <Section title="Range selection">
              <DatePickerCalendar />
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 560 }}>
                Date pickers let users select a single date or a range of dates. Available as a docked input (inline field), a modal (dialog), or a season calendar for longer-range selection.
              </div>
            </Section>

            <Section title="Docked input">
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                height: 45, padding: "0 12px", borderRadius: tokens.radii.sm,
                border: `1px solid ${tokens.colors.gray300}`, background: tokens.colors.gray50,
              }}>
                <Icon name="calendar" size={16} color={tokens.colors.gray400} />
                <span style={{ fontFamily: tokens.fonts.body, fontSize: 14, color: tokens.colors.gray700 }}>Jun 12 – Jun 16, 2025</span>
              </div>
            </Section>
        </Accordion>

        {/* BREADCRUMBS */}
        <Accordion title="🍞 Breadcrumbs">
            <Section title="Operational hierarchy">
              <Breadcrumbs items={["Locastay", "Airbnb", "Seaside Villa", "Booking #4821"]} />
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 560 }}>
                Shows the user's location within the application hierarchy: account → channel → rental → booking, from most general to most specific. Labels are sentence case; nouns are acceptable since breadcrumbs navigate rather than act.
              </div>
            </Section>
        </Accordion>

        {/* DATA TABLE */}
        <Accordion title="🗄 Data Table">
            <Section title="Row with trailing action button">
              <div style={{ background: "white", border: `1px solid ${tokens.colors.gray100}`, borderRadius: tokens.radii.md, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: tokens.fonts.body }}>
                  <thead>
                    <tr style={{ background: tokens.colors.gray50, borderBottom: `1px solid ${tokens.colors.gray100}` }}>
                      {["Guest", "Property", "Check-in", "Status", ""].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 12, fontWeight: 600, color: tokens.colors.gray500 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { guest: "Emma Laurent", property: "Seaside Villa", date: "12 Jul 2026", status: "Confirmed", color: "green" },
                      { guest: "Marco Bianchi", property: "Loft Central", date: "18 Jul 2026", status: "Pending", color: "yellow" },
                      { guest: "Sofia Reyes", property: "Mountain Cabin", date: "24 Jul 2026", status: "Overdue", color: "red" },
                    ].map((row, i) => (
                      <tr
                        key={row.guest}
                        style={{ borderBottom: i < 2 ? `1px solid ${tokens.colors.gray100}` : "none", cursor: "pointer" }}
                        onMouseEnter={e => e.currentTarget.style.background = tokens.colors.gray50}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "12px 16px", fontSize: 14, color: tokens.colors.dark }}>{row.guest}</td>
                        <td style={{ padding: "12px 16px", fontSize: 14, color: tokens.colors.gray600 }}>{row.property}</td>
                        <td style={{ padding: "12px 16px", fontSize: 14, color: tokens.colors.gray600 }}>{row.date}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <Badge color={row.color}>{row.status}</Badge>
                        </td>
                        <td style={{ padding: "12px 16px", textAlign: "right" }}>
                          <button style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, display: "inline-flex", color: tokens.colors.gray400 }} aria-label="View booking">
                            <Icon name="chevron_right" size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 620 }}>
                When a row has a trailing action button, cells within that row can be made clickable without breaking accessibility. Never combine a clickable row with clickable cells — pick one interaction model per table. Placing the action button at the end of the row (not inline within a cell) lets screen readers identify interactive elements reliably.
              </div>
            </Section>
        </Accordion>

        {/* SELECTION CONTROLS */}
        <Accordion title="☑️ Selection Controls">
            <Section title="Checkbox">
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
                <Checkbox label="Enabled" checked={demoChecked} onChange={() => setDemoChecked(v => !v)} />
                <Checkbox label="With description" checked={demoChecked} onChange={() => setDemoChecked(v => !v)} description="Applies to all rentals in this account" />
                <Checkbox label="Error" checked={false} error description="Select at least one option" />
                <Checkbox label="Disabled" checked={false} disabled />
              </div>
            </Section>

            <Section title="Radio">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Radio label="Monthly billing" checked={demoRadio === "monthly"} onChange={() => setDemoRadio("monthly")} description="Charged on the 1st of every month" />
                <Radio label="Yearly billing" checked={demoRadio === "yearly"} onChange={() => setDemoRadio("yearly")} description="Charged once a year, 2 months free" />
                <Radio label="Disabled option" checked={false} disabled />
              </div>
            </Section>

            <Section title="Toggle">
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
                <ToggleSwitch checked={demoToggle} onChange={() => setDemoToggle(v => !v)} label="Enable notifications" />
                <ToggleSwitch checked={false} label="Off" />
                <ToggleSwitch checked={true} disabled label="Disabled (on)" />
              </div>
            </Section>
        </Accordion>

        {/* AVATAR */}
        <Accordion title="👤 Avatar">
            <Section title="Channel avatars">
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
                {["Airbnb", "Booking.com", "Expedia", "Icon"].map(type => (
                  <div key={type} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <Avatar type={type} name="Emma Laurent" />
                    <span style={{ fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.gray400 }}>{type}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.gray500, lineHeight: 1.7, maxWidth: 560 }}>
                Channel badges (Airbnb, Booking.com, Expedia) overlay the avatar to show which OTA a guest or booking originated from. Use the plain icon avatar when no channel context applies.
              </div>
            </Section>

            <Section title="User on the left / right">
              <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
                <AvatarUserRow name="Marco Bianchi" subtext="Guest" side="left" />
                <AvatarUserRow name="Marco Bianchi" subtext="Guest" side="right" />
              </div>
            </Section>
        </Accordion>

        {/* PROGRESS BAR */}
        <Accordion title="📶 Progress Bar">
            <Section title="Horizontal">
              <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
                <ProgressBar value={30} />
                <ProgressBar value={65} />
                <ProgressBar value={100} />
              </div>
            </Section>

            <Section title="Vertical">
              <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
                <ProgressBar orientation="vertical" value={30} />
                <ProgressBar orientation="vertical" value={65} />
                <ProgressBar orientation="vertical" value={100} />
              </div>
            </Section>
        </Accordion>
      </div>
    </div>
  );
}
